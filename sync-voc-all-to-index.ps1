$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexPath = Join-Path $root "index.html"
$mocks = @(
  @{ Key = "statistics"; File = "voc-statistics-mock.html"; TemplateId = "voc-statistics-mock-src" }
  @{ Key = "settings";   File = "voc-settings-mock.html";   TemplateId = "voc-settings-mock-src" }
  @{ Key = "inbox";      File = "voc-inbox-mock.html";      TemplateId = "voc-inbox-mock-src" }
)

if (-not (Test-Path -LiteralPath $indexPath)) {
  throw "index.html not found."
}

function Escape-TemplateHtml([string]$html) {
  return $html -replace '</template>', ('</temp' + 'late>')
}

$templateBlocks = New-Object System.Collections.Generic.List[string]
$templateBlocks.Add("<!-- VOC_PAGES_BUNDLE_START -->")
$templateBlocks.Add("<!--")
$templateBlocks.Add("  VOC statistics / settings / inbox HTML (copy-friendly)")
$templateBlocks.Add("  - voc-statistics-mock.html  -> #voc-statistics-mock-src")
$templateBlocks.Add("  - voc-settings-mock.html    -> #voc-settings-mock-src")
$templateBlocks.Add("  - voc-inbox-mock.html       -> #voc-inbox-mock-src")
$templateBlocks.Add("  After editing mock files, run: .\sync-voc-all-to-index.ps1")
$templateBlocks.Add("-->")

foreach ($mock in $mocks) {
  $mockPath = Join-Path $root $mock.File
  if (-not (Test-Path -LiteralPath $mockPath)) {
    throw "File not found: $($mock.File)"
  }
  $html = [IO.File]::ReadAllText($mockPath, [Text.Encoding]::UTF8)
  $html = Escape-TemplateHtml $html
  $templateBlocks.Add("<!-- $($mock.File) -->")
  $templateBlocks.Add("<template id=""$($mock.TemplateId)"" data-voc-page=""$($mock.Key)"" data-source=""$($mock.File)"">")
  $templateBlocks.Add($html)
  $templateBlocks.Add("</template>")
}

$templateBlocks.Add("<!-- VOC_PAGES_BUNDLE_END -->")

$loaderScript = @'
<script>
/**
 * PIX VOC pages - unified embedded HTML loader (light DOM)
 * HTML source: template tags above (VOC_PAGES_BUNDLE)
 */
(function (global) {
  "use strict";

  var VOC_TEMPLATE_IDS = {
    statistics: "voc-statistics-mock-src",
    settings: "voc-settings-mock-src",
    inbox: "voc-inbox-mock-src"
  };

  function readVocEmbeddedHtml(key) {
    var id = VOC_TEMPLATE_IDS[key];
    if (!id) return "";
    var el = document.getElementById(id);
    return el ? el.innerHTML : "";
  }

  /* ---- VOC light-DOM render helpers (shared: full-app + index.html + ps1) ---- */
  var VOC_EMBED_CLASS = "voc-embed-root";
  var VOC_EMBED_SCOPE = "." + VOC_EMBED_CLASS;

  function scopeVocSelectorText(selectorText) {
    if (!selectorText) return VOC_EMBED_SCOPE;
    var parts = selectorText.split(",");
    var out = [];
    var roots = ["body", "html", ":root"];
    for (var i = 0; i < parts.length; i++) {
      var s = parts[i].replace(/^\s+|\s+$/g, "");
      if (!s) continue;
      if (s === "body" || s === "html" || s === ":root") {
        out.push(VOC_EMBED_SCOPE);
        continue;
      }
      if (s === "*") {
        out.push(VOC_EMBED_SCOPE + " *");
        continue;
      }
      if (s.charAt(0) === "*") {
        out.push(VOC_EMBED_SCOPE + " " + s);
        continue;
      }
      var replaced = null;
      for (var r = 0; r < roots.length; r++) {
        var token = roots[r];
        if (s.indexOf(token) === 0) {
          var rest = s.slice(token.length);
          var nc = rest.charAt(0);
          if (rest === "" || nc === " " || nc === "." || nc === "#" || nc === ":" ||
              nc === "[" || nc === ">" || nc === "+" || nc === "~") {
            replaced = VOC_EMBED_SCOPE + rest;
            break;
          }
        }
      }
      out.push(replaced !== null ? replaced : VOC_EMBED_SCOPE + " " + s);
    }
    return out.join(", ");
  }

  function scopeVocRuleList(rules) {
    var out = [];
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      var type = rule.type;
      if (type === 1) {
        out.push(scopeVocSelectorText(rule.selectorText) + " { " + rule.style.cssText + " }");
      } else if (type === 4) {
        var cond = rule.conditionText || (rule.media && rule.media.mediaText) || "all";
        out.push("@media " + cond + " { " + scopeVocRuleList(rule.cssRules) + " }");
      } else if (type === 12) {
        out.push("@supports " + rule.conditionText + " { " + scopeVocRuleList(rule.cssRules) + " }");
      } else if (type === 7) {
        out.push(rule.cssText);
      } else if (rule.cssText) {
        out.push(rule.cssText);
      }
    }
    return out.join("\n");
  }

  function scopeVocCss(cssText) {
    if (!cssText) return "";
    var probe = document.createElement("style");
    probe.textContent = cssText;
    (document.head || document.documentElement).appendChild(probe);
    var scoped = "";
    try {
      scoped = scopeVocRuleList(probe.sheet.cssRules);
    } catch (_error) {
      scoped = "";
    }
    if (probe.parentNode) probe.parentNode.removeChild(probe);
    return scoped;
  }

  function runVocEmbedScripts(host, doc) {
    var nodes = doc.querySelectorAll("script");
    var externals = [];
    var inlines = [];
    for (var i = 0; i < nodes.length; i++) {
      var src = nodes[i].getAttribute("src");
      if (src) {
        if (externals.indexOf(src) === -1) externals.push(src);
      } else {
        var code = nodes[i].textContent || "";
        if (code.replace(/^\s+|\s+$/g, "")) inlines.push(code);
      }
    }
    function runInlines() {
      for (var j = 0; j < inlines.length; j++) {
        try {
          var el = document.createElement("script");
          el.textContent = inlines[j];
          host.appendChild(el);
        } catch (error) {
          try { console.error("[voc-embed] inline script failed", error); } catch (_e) {}
        }
      }
    }
    var idx = 0;
    function loadNext() {
      if (idx >= externals.length) { runInlines(); return; }
      var src = externals[idx++];
      if (/chart/i.test(src) && window.Chart) { loadNext(); return; }
      var s = document.createElement("script");
      s.src = src;
      s.onload = loadNext;
      s.onerror = function () {
        try { console.warn("[voc-embed] failed to load " + src); } catch (_e) {}
        loadNext();
      };
      (document.head || document.documentElement).appendChild(s);
    }
    loadNext();
  }

  function mountVocLightDom(host, html) {
    if (!host || host.__vocMounted) return;
    host.__vocMounted = true;
    var doc;
    try {
      doc = new DOMParser().parseFromString(html || "", "text/html");
    } catch (_error) {
      return;
    }
    if (!doc || !doc.body) return;
    var styles = doc.querySelectorAll("style");
    for (var i = 0; i < styles.length; i++) {
      var scoped = scopeVocCss(styles[i].textContent || "");
      if (scoped) {
        var styleEl = document.createElement("style");
        styleEl.setAttribute("data-voc-embed", "1");
        styleEl.textContent = scoped;
        host.appendChild(styleEl);
      }
    }
    var bodyClone = document.importNode(doc.body, true);
    var deadScripts = bodyClone.querySelectorAll("script");
    for (var d = 0; d < deadScripts.length; d++) {
      if (deadScripts[d].parentNode) deadScripts[d].parentNode.removeChild(deadScripts[d]);
    }
    while (bodyClone.firstChild) {
      host.appendChild(bodyClone.firstChild);
    }
    runVocEmbedScripts(host, doc);
  }

  function createVocLightDomPage(deps, config) {
    var React = deps.React;
    var useRef = deps.useRef || React.useRef;
    var useEffect = deps.useEffect || React.useEffect;

    return function VocLightDomPage() {
      var hostRef = useRef(null);

      useEffect(function () {
        mountVocLightDom(hostRef.current, readVocEmbeddedHtml(config.templateKey));
      }, []);

      return React.createElement("div", {
        ref: hostRef,
        className: "voc-embed-root animate-fadeIn",
        style: { width: "100%" }
      });
    };
  }

  function registerVocPixStatisticsPage(deps) {
    return createVocLightDomPage(deps, { title: "VOC \uD1B5\uACC4", templateKey: "statistics" });
  }

  function registerVocPixSettingsPage(deps) {
    return createVocLightDomPage(deps, { title: "VOC \uC124\uC815", templateKey: "settings" });
  }

  function registerVocPixInboxPage(deps) {
    return createVocLightDomPage(deps, { title: "VOC \uC811\uC218 \uBAA9\uB85D", templateKey: "inbox" });
  }

  global.registerVocPixStatisticsPage = registerVocPixStatisticsPage;
  global.registerVocPixSettingsPage = registerVocPixSettingsPage;
  global.registerVocPixInboxPage = registerVocPixInboxPage;
})(typeof window !== "undefined" ? window : global);
</script>
'@

$bundle = ($templateBlocks -join "`r`n") + "`r`n" + $loaderScript

$index = [IO.File]::ReadAllText($indexPath, [Text.Encoding]::UTF8)

$bundlePattern = '(?s)<!-- VOC_PAGES_BUNDLE_START -->.*?<!-- VOC_PAGES_BUNDLE_END -->\s*<script>\s*/\*\*\s*\r?\n \* PIX VOC pages - unified embedded HTML loader.*?</script>'
$legacyPattern = '(?s)<script>\s*/\*\*\s*\r?\n \* PIX VOC statistics - embedded voc-statistics-mock\.html loader.*?</script>\s*<script>\s*/\*\*\s*\r?\n \* PIX VOC settings - embedded voc-settings-mock\.html loader.*?</script>\s*<script>\s*/\*\*\s*\r?\n \* PIX VOC settings - embedded voc-inbox-mock\.html loader.*?</script>'

if ([Text.RegularExpressions.Regex]::IsMatch($index, $bundlePattern)) {
  $updated = [Text.RegularExpressions.Regex]::Replace($index, $bundlePattern, $bundle, 1)
} elseif ([Text.RegularExpressions.Regex]::IsMatch($index, $legacyPattern)) {
  $updated = [Text.RegularExpressions.Regex]::Replace($index, $legacyPattern, $bundle, 1)
} else {
  throw "VOC pages bundle or legacy loader not found in index.html."
}

$utf8WithoutBom = New-Object Text.UTF8Encoding($false)
[IO.File]::WriteAllText($indexPath, $updated, $utf8WithoutBom)

Write-Output "VOC pages (statistics, settings, inbox) merged into index.html as copyable template HTML."
