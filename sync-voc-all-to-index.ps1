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
 * PIX VOC pages - unified embedded HTML loader
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

  function createVocIframePage(deps, config) {
    var React = deps.React;
    var useRef = deps.useRef || React.useRef;

    return function VocIframePage() {
      var frameRef = useRef(null);
      var embeddedHtml = readVocEmbeddedHtml(config.templateKey);

      function handleLoad() {
        var frame = frameRef.current;
        if (!frame) return;
        function resizeFrame() {
          try {
            var doc = frame.contentDocument;
            if (!doc) return;
            var lastElement = doc.body && doc.body.lastElementChild;
            var lastBottom = lastElement ? lastElement.getBoundingClientRect().bottom : 0;
            var minHeight = config.minHeight || 900;
            var height = Math.max(
              doc.documentElement ? doc.documentElement.scrollHeight : 0,
              doc.documentElement ? doc.documentElement.offsetHeight : 0,
              doc.body ? doc.body.scrollHeight : 0,
              doc.body ? doc.body.offsetHeight : 0,
              lastBottom + 24,
              minHeight
            );
            frame.style.height = Math.ceil(height + 8) + "px";
          } catch (_error) {}
        }
        resizeFrame();
        if (frame.__vocResizeObserver) frame.__vocResizeObserver.disconnect();
        try {
          frame.__vocResizeObserver = new ResizeObserver(resizeFrame);
          frame.__vocResizeObserver.observe(frame.contentDocument.documentElement);
          if (frame.contentDocument.body) frame.__vocResizeObserver.observe(frame.contentDocument.body);
        } catch (_error) {}
        if (frame.__vocMutationObserver) frame.__vocMutationObserver.disconnect();
        try {
          frame.__vocMutationObserver = new MutationObserver(resizeFrame);
          frame.__vocMutationObserver.observe(frame.contentDocument.body, { childList: true, subtree: true, attributes: true });
        } catch (_error) {}
        global.setTimeout(resizeFrame, 250);
        global.setTimeout(resizeFrame, 1000);
        global.setTimeout(resizeFrame, 2500);
      }

      return React.createElement(
        "div",
        { className: "h-full w-full flex flex-col min-h-0 animate-fadeIn" },
        React.createElement("iframe", {
          ref: frameRef,
          title: config.title,
          srcDoc: embeddedHtml,
          className: "block w-full border-0 bg-transparent rounded-xl",
          scrolling: "auto",
          style: {
            minHeight: String(config.minHeight || 900) + "px",
            height: String(config.minHeight || 900) + "px",
            width: "100%",
            flex: "0 0 auto"
          },
          onLoad: handleLoad
        })
      );
    };
  }

  function registerVocPixStatisticsPage(deps) {
    return createVocIframePage(deps, {
      title: "VOC \uD1B5\uACC4",
      templateKey: "statistics",
      minHeight: 5600
    });
  }

  function registerVocPixSettingsPage(deps) {
    return createVocIframePage(deps, {
      title: "VOC \uC124\uC815",
      templateKey: "settings",
      minHeight: 900
    });
  }

  function registerVocPixInboxPage(deps) {
    return createVocIframePage(deps, {
      title: "VOC \uC811\uC218 \uBAA9\uB85D",
      templateKey: "inbox",
      minHeight: 1200
    });
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
