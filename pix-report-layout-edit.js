(function enablePixReportLayoutEdit(global) {
  var root = document.querySelector(".doc");
  if (!root) return;
  if (global.__pixReportLayoutEditInit) return;
  global.__pixReportLayoutEditInit = true;
  global.__pixReportDeferTextEdit = true;

  var STYLE_ID = "pix-report-layout-edit-css";
  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      ".rpt-layout-block{position:relative;margin:0 0 2px;padding:4px 0 4px 58px;border-radius:6px;transition:background .15s;}",
      ".rpt-layout-block:hover{background:rgba(12,68,124,.04);}",
      ".rpt-layout-block.rpt-dragging{opacity:.5;background:rgba(12,68,124,.08);}",
      ".rpt-layout-block.rpt-drop-target{outline:2px dashed rgba(12,68,124,.45);outline-offset:2px;}",
      ".rpt-block-toolbar{position:absolute;left:2px;top:6px;display:flex;gap:4px;z-index:5;}",
      ".rpt-block-handle,.rpt-block-add,.rpt-block-remove{width:24px;height:24px;border:1px solid #cfcdc5;border-radius:5px;background:#f5f4f0;color:#898781;",
      "font-size:12px;line-height:22px;text-align:center;cursor:pointer;padding:0;user-select:none;-webkit-user-select:none;}",
      ".rpt-block-handle{cursor:grab;font-size:11px;letter-spacing:-1px;}",
      ".rpt-block-handle:active{cursor:grabbing;}",
      ".rpt-block-add{color:#0C447C;font-weight:800;font-size:15px;line-height:20px;}",
      ".rpt-block-add:hover,.rpt-block-remove:hover{background:#e8e6df;}",
      ".rpt-block-remove{color:#791F1F;font-size:14px;line-height:20px;}",
      ".rpt-block-handle:focus,.rpt-block-add:focus,.rpt-block-remove:focus{outline:2px solid rgba(12,68,124,.35);}",
      ".rpt-gap{min-height:1em;margin:0;padding:0;border:0;outline:none;}",
      ".rpt-gap:empty{min-height:.85em;}",
      ".rpt-gap:focus{background:rgba(12,68,124,.05);outline:1px dashed rgba(12,68,124,.35);outline-offset:1px;}",
      ".rpt-drop-line{height:3px;margin:2px 0;background:#0C447C;border-radius:2px;pointer-events:none;}",
      ".rpt-add-menu{position:absolute;left:0;top:calc(100% + 4px);z-index:30;min-width:168px;padding:4px;border:1px solid #cfcdc5;border-radius:6px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);}",
      ".rpt-add-menu button{display:block;width:100%;border:0;background:transparent;text-align:left;font-size:11.5px;padding:7px 10px;border-radius:4px;cursor:pointer;color:#333;}",
      ".rpt-add-menu button:hover{background:rgba(12,68,124,.08);color:#0C447C;}",
      ".rpt-sec-add-row{margin:6px 0 10px;padding-left:2px;position:relative;}",
      ".rpt-sec-add-btn{border:1px dashed #cfcdc5;border-radius:5px;background:#faf9f6;color:#0C447C;font-size:11px;padding:5px 12px;cursor:pointer;}",
      ".rpt-sec-add-btn:hover{background:rgba(12,68,124,.06);border-color:rgba(12,68,124,.35);}",
      ".rpt-add-menu .rpt-add-stats{border-top:1px solid #eceae4;margin-top:4px;padding-top:4px;font-weight:700;color:#0C447C;}",
      ".rpt-stats-dialog-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.28);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;}",
      ".rpt-stats-dialog{width:min(520px,100%);background:#fff;border:1px solid #cfcdc5;border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,.18);padding:16px 16px 14px;max-height:min(80vh,640px);overflow:auto;}",
      ".rpt-stats-dialog h3{margin:0 0 6px;font-size:14px;color:#0C447C;}",
      ".rpt-stats-dialog p{margin:0 0 12px;font-size:11px;color:#898781;line-height:1.5;}",
      ".rpt-stats-groups{display:flex;flex-direction:column;gap:14px;margin-bottom:10px;}",
      ".rpt-stats-group-title{font-size:11px;font-weight:700;color:#555;margin:0 0 8px;letter-spacing:-.01em;}",
      ".rpt-stats-badges{display:flex;flex-wrap:wrap;gap:6px;}",
      ".rpt-stats-badge{border:1px solid #e3e1da;background:#faf9f6;border-radius:999px;padding:5px 11px;font-size:11px;cursor:pointer;color:#444;font-family:inherit;line-height:1.3;transition:border-color .12s,background .12s,color .12s;}",
      ".rpt-stats-badge:hover{border-color:#0C447C;background:rgba(12,68,124,.06);color:#0C447C;}",
      ".rpt-stats-badge.ai{border-color:#d4e3f2;background:#f4f8fc;color:#0C447C;}",
      ".rpt-stats-badge.ai:hover{border-color:#0C447C;background:rgba(12,68,124,.1);}",
      ".rpt-stats-badge:disabled{opacity:.55;cursor:wait;}",
      ".rpt-stats-msg{font-size:11px;min-height:16px;margin-bottom:8px;}",
      ".rpt-stats-msg.err{color:#791F1F;}",
      ".rpt-stats-msg.ok{color:#0C447C;}",
      ".rpt-stats-actions{display:flex;justify-content:flex-end;gap:8px;}",
      ".rpt-stats-actions button{border-radius:6px;padding:7px 14px;font-size:12px;cursor:pointer;}",
      ".rpt-stats-cancel{border:1px solid #cfcdc5;background:#f5f4f0;color:#555;}",
      ".rpt-stats-submit{border:0;background:#0C447C;color:#fff;font-weight:700;}",
      ".rpt-add-menu .rpt-add-divider{border-top:1px solid #eceae4;margin:4px 0;pointer-events:none;height:0;padding:0;}",
      ".rpt-layout-block > .rpt-text-block{margin:0;}",
      ".rpt-layout-block > .rpt-text-block .body,.rpt-layout-block > .rpt-text-block .headline,.rpt-layout-block > .rpt-text-block .quote-box{margin-bottom:0;}",
      ".sec[data-rpt-user-added]{position:relative;}",
      ".rpt-sec-delete{position:absolute;top:0;right:0;border:1px solid #e8c4c4;border-radius:5px;background:#fdf8f8;color:#791F1F;font-size:10.5px;padding:3px 8px;cursor:pointer;z-index:4;}",
      ".rpt-sec-delete:hover{background:#f5e8e8;}",
      ".rpt-add-menu .rpt-add-section{font-weight:700;color:#0C447C;}",
      ".rpt-stats-toolbar{position:sticky;top:0;z-index:10;display:flex;justify-content:flex-end;padding:8px 0 10px;margin:0 0 12px;border-bottom:1px dashed #cfcdc5;background:#eae8e2;}",
      ".rpt-stats-toolbar-btn{border:1px dashed #0C447C;border-radius:6px;background:#f7f9fc;color:#0C447C;font-size:12px;font-weight:700;padding:7px 14px;cursor:pointer;font-family:inherit;}",
      ".rpt-stats-toolbar-btn:hover{background:rgba(12,68,124,.08);}",
      ".rpt-stat-block{position:relative;margin:0 0 12px;padding:2px;border:1px dashed transparent;border-radius:6px;transition:border-color .15s,background .15s;}",
      ".doc.rpt-editor-surface .rpt-stat-block:hover{border-color:rgba(12,68,124,.28);background:rgba(12,68,124,.02);}",
      ".rpt-stat-remove{position:absolute;top:6px;right:6px;width:22px;height:22px;border:1px solid #e8c4c4;border-radius:4px;background:#fdf8f8;color:#791F1F;font-size:16px;line-height:18px;font-weight:700;cursor:pointer;padding:0;z-index:6;box-shadow:0 1px 3px rgba(0,0,0,.08);}",
      ".rpt-stat-remove:hover{background:#f5e8e8;border-color:#d8a0a0;}",
      "body.rpt-editor-mode{background:#d8d6d0!important;padding:28px 16px 48px!important;}",
      ".doc.rpt-editor-surface{box-shadow:0 1px 0 #fff inset,0 2px 6px rgba(0,0,0,.06),0 16px 48px rgba(0,0,0,.1)!important;border:1px solid #c8c6c0!important;outline:1px solid rgba(255,255,255,.65);cursor:text;}",
      ".doc.rpt-editor-surface [contenteditable=\"true\"]{cursor:text;border-radius:2px;transition:background .12s ease,outline-color .12s ease;}",
      ".doc.rpt-editor-surface [contenteditable=\"true\"]:hover{background:rgba(12,68,124,.04)!important;outline:none!important;}",
      ".doc.rpt-editor-surface [contenteditable=\"true\"]:focus{outline:2px solid rgba(12,68,124,.32)!important;outline-offset:1px;background:rgba(12,68,124,.06)!important;}",
      ".doc.rpt-preview-mode .rpt-stats-toolbar,.doc.rpt-preview-mode .rpt-stat-remove,.doc.rpt-preview-mode .rpt-block-toolbar,.doc.rpt-preview-mode .rpt-sec-add-row,.doc.rpt-preview-mode .rpt-sec-delete{display:none!important;}",
      ".doc:not(.rpt-preview-mode) .rpt-block-toolbar,.doc:not(.rpt-preview-mode) .rpt-sec-add-row,.doc:not(.rpt-preview-mode) .rpt-sec-delete{display:none!important;}",
      ".doc.rpt-preview-mode [contenteditable=\"true\"]{cursor:default;}",
      ".doc.rpt-preview-mode [contenteditable=\"true\"]:hover,.doc.rpt-preview-mode [contenteditable=\"true\"]:focus{background:transparent!important;outline:none!important;}",
      ".doc.rpt-preview-mode.rpt-editor-surface,.doc.rpt-preview-mode{box-shadow:0 2px 14px rgba(0,0,0,.08)!important;border:none!important;outline:none!important;cursor:default;}",
      ".rpt-wysiwyg-mock{margin:0 0 22px;border:1px solid #b8c4d0;font-family:\"Malgun Gothic\",Gulim,sans-serif;user-select:none;-webkit-user-select:none;}",
      ".rpt-wysiwyg-toolbar{background:linear-gradient(180deg,#f2f5f9 0%,#d9e2eb 100%);border-bottom:1px solid #b8c4d0;padding:1px 2px 0;}",
      ".rpt-wysiwyg-row{display:flex;align-items:center;flex-wrap:wrap;min-height:27px;padding:1px 0;}",
      ".rpt-wysiwyg-row+.rpt-wysiwyg-row{border-top:1px solid #c5ced8;}",
      ".rpt-wysiwyg-grp{display:flex;align-items:center;gap:1px;padding:0 4px;border-right:1px solid #c5ced8;flex-shrink:0;}",
      ".rpt-wysiwyg-grp:last-child{border-right:none;}",
      ".rpt-wysiwyg-btn{border:1px solid transparent;background:transparent;min-width:22px;height:22px;font-size:11px;line-height:1;cursor:default;padding:0 3px;color:#2a2a2a;display:inline-flex;align-items:center;justify-content:center;border-radius:2px;font-family:inherit;}",
      ".rpt-wysiwyg-btn.w{font-weight:700;}",
      ".rpt-wysiwyg-btn.i{font-style:italic;font-family:Georgia,serif;}",
      ".rpt-wysiwyg-btn.u{text-decoration:underline;}",
      ".rpt-wysiwyg-btn.s{text-decoration:line-through;}",
      ".rpt-wysiwyg-select{border:1px solid #aab8c8;background:#fff;font-size:11px;height:22px;padding:0 4px;margin:0 1px;color:#333;pointer-events:none;font-family:inherit;}",
      ".rpt-wysiwyg-color{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:22px;height:22px;font-size:12px;font-weight:700;line-height:1;}",
      ".rpt-wysiwyg-color-bar{width:14px;height:3px;margin-top:1px;border-radius:1px;}",
      ".rpt-wysiwyg-tabs{display:flex;background:#eef1f5;border-top:1px solid #b8c4d0;font-size:11px;}",
      ".rpt-wysiwyg-tab{padding:5px 16px;border-right:1px solid #c5ced8;color:#666;cursor:default;}",
      ".rpt-wysiwyg-tab.on{background:#fff;color:#1f1e1c;font-weight:700;position:relative;}",
      ".rpt-wysiwyg-tab.on::after{content:\"\";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:#fff;}",
      "@media print{.rpt-wysiwyg-mock{display:none!important;}}"
    ].join("");
    document.head.appendChild(style);
  }

  var dragBlock = null;
  var dropLine = null;
  var openMenu = null;
  var statsDialog = null;
  var statsDialogContext = null;
  var editInitialized = false;
  var editActive = false;
  var docClickBound = false;

  var ROMAN_LABELS = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];

  function romanLabel(index) {
    if (index >= 0 && index < ROMAN_LABELS.length) return ROMAN_LABELS[index] + ".";
    return String(index + 1) + ".";
  }

  function getSections() {
    return Array.prototype.filter.call(root.children, function (node) {
      return node.classList && node.classList.contains("sec");
    });
  }

  function renumberSections() {
    getSections().forEach(function (sec, i) {
      var num = sec.querySelector(".sec-title .num");
      if (num) num.textContent = romanLabel(i);
    });
  }

  var TEXT_EDIT_SELECTOR = [
    ".doc-title", ".doc-info-table td",
    ".sec-title", ".sub-title", "p", "li", ".headline",
    ".kl", ".kv", ".kd", ".kpi-label", ".kpi-val", ".kpi-delta",
    "table.report-table th", "table.report-table td",
    ".cap", ".chart-title", ".bl", ".bv", ".bar-name", ".bar-val",
    ".gl", ".gv",
    ".risk-badge", ".risk-desc", ".flag-tag", ".flag-body",
    ".quote-box", ".quote-meta",
    ".oc-name", ".oc-desc", ".oc-prio", ".tl-dot", ".tl-text",
    ".footer-note span"
  ].join(",");

  function applyTextEdit(scope) {
    var base = scope || root;
    Array.prototype.forEach.call(base.querySelectorAll(TEXT_EDIT_SELECTOR), function (el) {
      if (el.closest(".line-chart-wrap") || el.closest(".spark-wrap") || el.closest("svg") || el.closest(".bar-track") || el.closest(".quart-track")) return;
      if (el.closest(".rpt-block-toolbar") || el.closest(".rpt-add-menu") || el.closest(".rpt-sec-add-row")) return;
      if (el.closest(".rpt-stat-remove")) return;
      if (el.closest(".rpt-stat-remove")) return;
      if (el.getAttribute("contenteditable") === "true") return;
      el.setAttribute("contenteditable", "true");
      el.setAttribute("spellcheck", "false");
    });
  }

  function createGap() {
    var gap = document.createElement("p");
    gap.className = "rpt-gap";
    gap.setAttribute("contenteditable", "true");
    gap.setAttribute("spellcheck", "false");
    gap.setAttribute("data-rpt-gap", "1");
    gap.innerHTML = "<br>";
    return gap;
  }

  function barRowHtml(name, pct, color) {
    return '<div class="bar-row">' +
      '<div class="bar-name">' + name + '</div>' +
      '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
      '<div class="bar-val">' + pct + '%</div>' +
    '</div>';
  }

  function kpiBoxHtml() {
    return '<div class="kpi-box"><div class="kpi-label">지표명</div><div class="kpi-val">-</div><div class="kpi-delta">-</div></div>';
  }

  function defaultKpiCols() {
    var strip = root.querySelector(".kpi-strip");
    if (!strip) return 3;
    var n = strip.querySelectorAll(".kpi-box").length;
    return n >= 4 ? 5 : 3;
  }

  function createTextBlock(variant) {
    var block = document.createElement("div");
    block.className = "rpt-text-block";
    block.setAttribute("data-rpt-user-added", "1");

    if (variant === "text-headline") {
      var headline = document.createElement("div");
      headline.className = "headline";
      headline.textContent = "강조할 내용을 입력하세요.";
      block.appendChild(headline);
    } else if (variant === "text-quote") {
      var quote = document.createElement("div");
      quote.className = "quote-box";
      quote.innerHTML = '"인용 내용을 입력하세요." <span class="quote-meta">출처 · 분류</span>';
      block.appendChild(quote);
    } else if (variant === "text-list") {
      var ul = document.createElement("ul");
      ul.className = "plain";
      ul.innerHTML = "<li>항목 1</li><li>항목 2</li><li>항목 3</li>";
      block.appendChild(ul);
    } else if (variant === "text-cap") {
      var cap = document.createElement("p");
      cap.className = "cap";
      cap.textContent = "※ 각주·캡션을 입력하세요.";
      block.appendChild(cap);
    } else {
      var body = document.createElement("p");
      body.className = "body";
      body.textContent = "추가할 본문을 입력하세요.";
      block.appendChild(body);
    }

    return block;
  }

  function createBlockContent(type) {
    if (type === "text-body" || type === "text-headline" || type === "text-quote" || type === "text-list" || type === "text-cap") {
      var textBlock = createTextBlock(type);
      return { primary: textBlock, fragment: textBlock };
    }
    if (type === "table") {
      var table = document.createElement("table");
      table.className = "report-table";
      table.setAttribute("data-rpt-user-added", "1");
      table.innerHTML =
        '<tr><th style="width:30%">항목</th><th>값 1</th><th>값 2</th><th>비고</th></tr>' +
        '<tr><td class="rowlabel">항목 1</td><td>-</td><td>-</td><td>-</td></tr>' +
        '<tr><td class="rowlabel">항목 2</td><td>-</td><td>-</td><td>-</td></tr>' +
        '<tr><td class="rowlabel">항목 3</td><td>-</td><td>-</td><td>-</td></tr>';
      var cap = document.createElement("p");
      cap.className = "cap";
      cap.textContent = "※ 표 캡션을 입력하세요.";
      var holder = document.createDocumentFragment();
      holder.appendChild(table);
      holder.appendChild(cap);
      return { primary: table, fragment: holder };
    }
    if (type === "chart") {
      var block = document.createElement("div");
      block.className = "chart-block";
      block.setAttribute("data-rpt-user-added", "1");
      block.innerHTML =
        '<p class="chart-title">차트 제목</p>' +
        '<div class="rpt-custom-bars">' +
          barRowHtml("항목 1", 72, "#0C447C") +
          barRowHtml("항목 2", 55, "#0C447C") +
          barRowHtml("항목 3", 38, "#791F1F") +
        '</div>' +
        '<p class="cap" style="margin-top:8px">※ 차트 캡션을 입력하세요.</p>';
      return { primary: block, fragment: block };
    }
    var cols = defaultKpiCols();
    var strip = document.createElement("div");
    strip.className = "kpi-strip";
    strip.setAttribute("data-rpt-user-added", "1");
    strip.style.marginBottom = "16px";
    strip.style.gridTemplateColumns = "repeat(" + cols + ",1fr)";
    var boxes = "";
    for (var i = 0; i < cols; i++) boxes += kpiBoxHtml();
    strip.innerHTML = boxes;
    return { primary: strip, fragment: strip };
  }

  function closeAddMenu() {
    if (openMenu && openMenu.parentNode) openMenu.parentNode.removeChild(openMenu);
    openMenu = null;
  }

  function closeStatsDialog() {
    if (statsDialog && statsDialog.parentNode) statsDialog.parentNode.removeChild(statsDialog);
    statsDialog = null;
    statsDialogContext = null;
  }

  function insertFromStatsResult(sec, afterNode, payload) {
    var result = payload.result;
    var insertBefore = afterNode ? afterNode.nextSibling : null;

    if (result.kind === "table") {
      if (insertBefore) {
        sec.insertBefore(result.table, insertBefore);
        if (result.cap) sec.insertBefore(result.cap, insertBefore);
      } else {
        sec.appendChild(result.table);
        if (result.cap) sec.appendChild(result.cap);
      }
    } else if (result.node) {
      if (insertBefore) sec.insertBefore(result.node, insertBefore);
      else sec.appendChild(result.node);
    }

    applyTextEdit(sec);
    decorateRemovableBlocks(sec);
    var focusEl = sec.querySelector(".chart-title, table.report-table th, .body");
    if (focusEl) focusEl.focus();
  }

  function insertFromStatsResultBefore(sec, beforeNode, payload) {
    var result = payload.result;
    if (result.kind === "table") {
      sec.insertBefore(result.table, beforeNode);
      if (result.cap) sec.insertBefore(result.cap, beforeNode);
    } else if (result.node) {
      sec.insertBefore(result.node, beforeNode);
    }
    applyTextEdit(sec);
  }

  function seedStatSlots() {
    if (!global.PixReportStatsQuery) return;
    var slots = Array.prototype.slice.call(root.querySelectorAll(".rpt-stat-slot[data-rpt-seed]:not([data-rpt-seeded])"));
    slots.forEach(function (slot) {
      var id = slot.getAttribute("data-rpt-seed");
      if (!id) return;
      var payload = global.PixReportStatsQuery.resolveCatalogItem(id);
      if (!payload.ok) return;
      var sec = slot.closest(".sec") || root;
      insertFromStatsResultBefore(sec, slot, payload);
      slot.setAttribute("data-rpt-seeded", "1");
      if (slot.parentNode) slot.parentNode.removeChild(slot);
    });
    if (slots.length) decorateRemovableBlocks(root);
  }

  function collectStatGroup(el) {
    var nodes = [el];
    if (el.tagName === "TABLE" && el.classList.contains("report-table")) {
      var next = el.nextElementSibling;
      if (next && next.matches && next.matches("p.cap")) nodes.push(next);
    }
    return nodes;
  }

  function createStatRemoveBtn(wrap) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rpt-stat-remove";
    btn.setAttribute("contenteditable", "false");
    btn.setAttribute("aria-label", "표·차트 삭제");
    btn.title = "표·차트 삭제";
    btn.textContent = "−";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!window.confirm("이 표·차트를 삭제할까요?")) return;
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    });
    return btn;
  }

  function wrapRemovableStat(el) {
    if (el.closest("[data-rpt-stat-block]")) return null;
    var nodes = collectStatGroup(el);
    if (!nodes[0] || !nodes[0].parentNode) return null;
    var wrap = document.createElement("div");
    wrap.className = "rpt-stat-block";
    wrap.setAttribute("data-rpt-stat-block", "1");
    wrap.setAttribute("contenteditable", "false");
    var parent = nodes[0].parentNode;
    parent.insertBefore(wrap, nodes[0]);
    nodes.forEach(function (n) {
      if (n.parentNode) wrap.appendChild(n);
    });
    wrap.appendChild(createStatRemoveBtn(wrap));
    return wrap;
  }

  function decorateRemovableBlocks(scope) {
    var base = scope || root;
    var seen = [];
    base.querySelectorAll("table.report-table, .chart-block, .kpi-strip").forEach(function (el) {
      if (el.closest("[data-rpt-stat-block]")) return;
      if (seen.indexOf(el) > -1) return;
      seen.push(el);
      wrapRemovableStat(el);
    });
  }

  function stripStatBlockChrome() {
    Array.prototype.slice.call(root.querySelectorAll("[data-rpt-stat-block]")).forEach(function (wrap) {
      var parent = wrap.parentNode;
      if (!parent) return;
      Array.prototype.slice.call(wrap.childNodes).forEach(function (child) {
        if (child.nodeType === 1 && child.classList && child.classList.contains("rpt-stat-remove")) return;
        parent.insertBefore(child, wrap);
      });
      parent.removeChild(wrap);
    });
  }

  function getTargetSectionForStats() {
    var sel = window.getSelection();
    if (sel && sel.anchorNode) {
      var node = sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement;
      if (node && node.closest) {
        var activeSec = node.closest(".sec");
        if (activeSec) return activeSec;
      }
    }
    var secs = getSections();
    return secs.length ? secs[secs.length - 1] : root;
  }

  function stripLayoutChrome() {
    root.querySelectorAll(".rpt-block-toolbar, .rpt-sec-add-row, .rpt-sec-delete").forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    root.querySelectorAll(".rpt-gap").forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    Array.prototype.slice.call(root.querySelectorAll(".rpt-layout-block")).forEach(function (wrap) {
      var parent = wrap.parentNode;
      if (!parent) return;
      Array.prototype.slice.call(wrap.childNodes).forEach(function (child) {
        if (child.nodeType === 1 && child.classList && child.classList.contains("rpt-block-toolbar")) return;
        parent.insertBefore(child, wrap);
      });
      parent.removeChild(wrap);
    });
  }

  function buildWysiwygMockHtml() {
    function btn(label, cls) {
      return '<button type="button" class="rpt-wysiwyg-btn' + (cls ? " " + cls : "") + '" tabindex="-1">' + label + "</button>";
    }
    function grp(inner) { return '<div class="rpt-wysiwyg-grp">' + inner + "</div>"; }
    function sel(val, w) {
      return '<select class="rpt-wysiwyg-select" disabled style="width:' + w + 'px" tabindex="-1"><option>' + val + "</option></select>";
    }
    function colorBtn(letter, bar) {
      return '<span class="rpt-wysiwyg-color">' + letter + '<span class="rpt-wysiwyg-color-bar" style="background:' + bar + '"></span></span>';
    }
    var row1 = grp(btn("🗎") + btn("💾") + btn("🖨") + btn("🔍")) +
      grp(btn("↶") + btn("↷")) +
      grp(btn("✂") + btn("📋") + btn("📄")) +
      grp(btn("T") + btn("☰") + btn("Ω") + btn("—") + btn("🌐") + btn("📅")) +
      grp(btn("☺") + btn("▦") + btn("🖼") + btn("🎬")) +
      grp(btn("⊞") + btn("⊟") + btn("⊠") + btn("▤") + btn("▥") + btn("▦")) +
      grp(btn("&", "w") + btn("🔧") + btn("⛶") + btn("D5", "w"));
    var row2 = grp(sel("기본 서식", 76) + sel("굴림", 58) + sel("12pt", 46) + sel("1.2", 36)) +
      grp(btn("B", "w") + btn("I", "i") + btn("U", "u") + btn("A", "s") +
        btn("x²") + btn("x₂") + btn("⌫") + btn("🔗")) +
      grp(colorBtn("A", "#e24b4a") + colorBtn("▮", "#f4e04d")) +
      grp(btn("1.") + btn("•") + btn("≡") + btn("≡") + btn("≡") + btn("≡") + btn("⇤") + btn("⇥"));
    return '<div class="rpt-wysiwyg-toolbar">' +
      '<div class="rpt-wysiwyg-row">' + row1 + "</div>" +
      '<div class="rpt-wysiwyg-row">' + row2 + "</div></div>" +
      '<div class="rpt-wysiwyg-tabs">' +
      '<span class="rpt-wysiwyg-tab on">디자인</span>' +
      '<span class="rpt-wysiwyg-tab">HTML</span>' +
      '<span class="rpt-wysiwyg-tab">미리 보기</span>' +
      '<span class="rpt-wysiwyg-tab">TEXT</span></div>';
  }

  function ensureWysiwygMock() {
    if (root.querySelector("[data-rpt-wysiwyg-mock]")) return;
    var firstSec = root.querySelector(".sec");
    if (!firstSec || !firstSec.parentNode) return;
    var wrap = document.createElement("div");
    wrap.className = "rpt-wysiwyg-mock";
    wrap.setAttribute("data-rpt-wysiwyg-mock", "1");
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = buildWysiwygMockHtml();
    firstSec.parentNode.insertBefore(wrap, firstSec);
  }

  function ensureStatsToolbar(show) {
    var bar = root.querySelector("[data-rpt-stats-toolbar]");
    if (!show) {
      if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
      return;
    }
    if (bar) return;
    bar = document.createElement("div");
    bar.className = "rpt-stats-toolbar";
    bar.setAttribute("data-rpt-stats-toolbar", "1");
    bar.setAttribute("contenteditable", "false");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rpt-stats-toolbar-btn";
    btn.textContent = "통계에서 불러오기…";
    btn.setAttribute("contenteditable", "false");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openStatsDialog(getTargetSectionForStats(), null);
    });
    bar.appendChild(btn);
    var anchor = root.querySelector(".doc-info-table") || root.querySelector(".doc-title") || root.firstChild;
    if (anchor && anchor.nextSibling) root.insertBefore(bar, anchor.nextSibling);
    else if (anchor) anchor.parentNode.insertBefore(bar, anchor.nextSibling);
    else root.insertBefore(bar, root.firstChild);
  }

  function openStatsDialog(sec, afterNode) {
    closeAddMenu();
    closeStatsDialog();
    if (!global.PixReportStatsQuery) {
      window.alert("통계 불러오기 모듈이 로드되지 않았습니다.");
      return;
    }
    statsDialogContext = { sec: sec, afterNode: afterNode };
    var catalog = global.PixReportStatsQuery.getImportCatalog();
    var backdrop = document.createElement("div");
    backdrop.className = "rpt-stats-dialog-backdrop";
    backdrop.setAttribute("data-rpt-stats-dialog", "1");
    backdrop.innerHTML =
      '<div class="rpt-stats-dialog" role="dialog" aria-label="통계에서 불러오기">' +
        "<h3>통계에서 불러오기</h3>" +
        "<p>항목을 클릭하면 보고서에 표·차트·분석 내용이 추가됩니다.</p>" +
        '<div class="rpt-stats-groups">' +
          catalog.groups.map(function (group) {
            return (
              '<section class="rpt-stats-group" data-rpt-stats-group="' + group.key + '">' +
                '<div class="rpt-stats-group-title">' + group.title + "</div>" +
                '<div class="rpt-stats-badges">' +
                  group.items.map(function (item) {
                    var aiClass = group.key === "ai" ? " ai" : "";
                    return (
                      '<button type="button" class="rpt-stats-badge' + aiClass + '" data-rpt-catalog-id="' + item.id + '">' +
                        item.label +
                      "</button>"
                    );
                  }).join("") +
                "</div>" +
              "</section>"
            );
          }).join("") +
        "</div>" +
        '<div class="rpt-stats-msg"></div>' +
        '<div class="rpt-stats-actions">' +
          '<button type="button" class="rpt-stats-cancel">닫기</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(backdrop);
    statsDialog = backdrop;
    var msg = backdrop.querySelector(".rpt-stats-msg");

    function importItem(itemId, btn) {
      if (btn) btn.disabled = true;
      var resolved = global.PixReportStatsQuery.resolveCatalogItem(itemId);
      if (!resolved.ok) {
        msg.className = "rpt-stats-msg err";
        msg.textContent = resolved.message;
        if (btn) btn.disabled = false;
        return;
      }
      insertFromStatsResult(statsDialogContext.sec, statsDialogContext.afterNode, resolved);
      closeStatsDialog();
    }

    backdrop.querySelector(".rpt-stats-cancel").addEventListener("click", closeStatsDialog);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeStatsDialog();
    });
    backdrop.querySelector(".rpt-stats-dialog").addEventListener("click", function (e) {
      e.stopPropagation();
    });
    backdrop.querySelectorAll("[data-rpt-catalog-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        importItem(btn.getAttribute("data-rpt-catalog-id"), btn);
      });
    });
    backdrop.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeStatsDialog();
    });
  }

  function showAddMenu(anchor, sec, insertAfterNode) {
    closeAddMenu();
    var menu = document.createElement("div");
    menu.className = "rpt-add-menu";
    menu.setAttribute("data-rpt-add-menu", "1");
    menu.innerHTML =
      '<button type="button" data-rpt-add-type="section" class="rpt-add-section">섹션(영역) 추가</button>' +
      '<button type="button" data-rpt-add-type="stats" class="rpt-add-stats">통계에서 불러오기…</button>' +
      '<button type="button" data-rpt-add-type="table">빈 표 추가</button>' +
      '<button type="button" data-rpt-add-type="chart">빈 막대 차트 추가</button>' +
      '<button type="button" data-rpt-add-type="kpi">KPI 요약 추가</button>' +
      '<div class="rpt-add-divider" aria-hidden="true"></div>' +
      '<button type="button" data-rpt-add-type="text-body">본문 추가</button>' +
      '<button type="button" data-rpt-add-type="text-headline">강조 박스 추가</button>' +
      '<button type="button" data-rpt-add-type="text-quote">인용문 추가</button>' +
      '<button type="button" data-rpt-add-type="text-list">글머리 목록 추가</button>' +
      '<button type="button" data-rpt-add-type="text-cap">각주·캡션 추가</button>';
    anchor.appendChild(menu);
    openMenu = menu;
    menu.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-rpt-add-type]");
      if (!btn) return;
      e.stopPropagation();
      var type = btn.getAttribute("data-rpt-add-type");
      closeAddMenu();
      if (type === "stats") openStatsDialog(sec, insertAfterNode);
      else if (type === "section") insertSectionAfter(sec);
      else insertBlock(sec, insertAfterNode, type);
    });
  }

  function ensureSectionDeleteBtn(sec) {
    if (sec.getAttribute("data-rpt-user-added") !== "1") return;
    if (sec.querySelector(".rpt-sec-delete")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rpt-sec-delete";
    btn.setAttribute("contenteditable", "false");
    btn.textContent = "× 섹션 삭제";
    btn.title = "추가한 섹션 삭제";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!window.confirm("추가한 섹션(영역)을 삭제할까요?")) return;
      sec.parentNode.removeChild(sec);
      renumberSections();
    });
    sec.appendChild(btn);
  }

  function createSectionElement() {
    var sec = document.createElement("div");
    sec.className = "sec";
    sec.setAttribute("data-rpt-user-added", "1");

    var title = document.createElement("p");
    title.className = "sec-title";
    title.innerHTML = '<span class="num">?</span>추가 섹션';

    var bodyWrap = createTextBlock("text-body");

    sec.appendChild(title);
    sec.appendChild(bodyWrap);
    return sec;
  }

  function insertSectionAfter(afterSec) {
    closeAddMenu();
    closeStatsDialog();
    var sec = createSectionElement();
    ensureSectionDeleteBtn(sec);

    var anchor = afterSec ? afterSec.nextSibling : root.querySelector(".footer-note");
    if (!anchor && afterSec) anchor = null;
    root.insertBefore(sec, anchor || null);

    renumberSections();
    initSection(sec);
    applyTextEdit(sec);

    var titleText = sec.querySelector(".sec-title");
    if (titleText) {
      titleText.focus();
      try {
        var range = document.createRange();
        range.selectNodeContents(titleText);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (_err) {}
    }
  }

  function bindSectionEvents(sec) {
    if (sec.getAttribute("data-rpt-sec-bound") === "1") return;
    sec.setAttribute("data-rpt-sec-bound", "1");
    sec.addEventListener("dragover", function (e) {
      if (!dragBlock || dragBlock.parentNode !== sec) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      sec.classList.add("rpt-drop-target");
      showDropLine(sec, e.clientY);
    });
    sec.addEventListener("dragleave", function (e) {
      if (e.currentTarget.contains(e.relatedTarget)) return;
      sec.classList.remove("rpt-drop-target");
      clearDropLine();
    });
    sec.addEventListener("drop", function (e) {
      e.preventDefault();
      if (!dragBlock || dragBlock.parentNode !== sec) return;
      var result = getDropIndex(sec, e.clientY);
      clearDropLine();
      sec.classList.remove("rpt-drop-target");
      if (result.idx >= result.items.length) {
        var addRow = sec.querySelector("[data-rpt-sec-add]");
        if (addRow) sec.insertBefore(dragBlock, addRow);
        else sec.appendChild(dragBlock);
      } else {
        sec.insertBefore(dragBlock, result.items[result.idx]);
      }
    });
  }

  function initSection(sec) {
    normalizeSection(sec);
    bindSectionEvents(sec);
    ensureSectionDeleteBtn(sec);
  }

  function insertBlock(sec, afterNode, type) {
    var insertBefore = afterNode
      ? afterNode.nextSibling
      : sec.querySelector("[data-rpt-sec-add]");

    sec.insertBefore(createGap(), insertBefore);

    var created = createBlockContent(type);
    var wrap;

    if (type === "table") {
      var table = created.primary;
      var cap = created.fragment.querySelector("p.cap");
      sec.insertBefore(table, insertBefore);
      if (cap) sec.insertBefore(cap, insertBefore);
      wrap = wrapMovable(table);
      if (wrap && cap && cap.parentNode === sec) wrap.appendChild(cap);
    } else {
      sec.insertBefore(created.primary, insertBefore);
      wrap = wrapMovable(created.primary);
    }

    applyTextEdit(wrap || sec);

    if (wrap) {
      var focusEl = wrap.querySelector(".body, .headline, .quote-box, ul.plain li, .cap, .chart-title, table.report-table th, .kpi-label");
      if (focusEl) focusEl.focus();
    }
  }

  function createToolbar(wrap, contentEl) {
    var toolbar = document.createElement("div");
    toolbar.className = "rpt-block-toolbar";
    toolbar.setAttribute("contenteditable", "false");

    var handle = document.createElement("button");
    handle.type = "button";
    handle.className = "rpt-block-handle";
    handle.setAttribute("aria-label", "블록 이동");
    handle.title = "드래그하여 위치 이동";
    handle.textContent = "⋮⋮";
    handle.setAttribute("contenteditable", "false");
    handle.draggable = true;

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "rpt-block-add";
    addBtn.setAttribute("aria-label", "추가");
    addBtn.title = "아래에 표·차트·본문·섹션 추가";
    addBtn.textContent = "+";
    addBtn.setAttribute("contenteditable", "false");

    toolbar.appendChild(handle);
    toolbar.appendChild(addBtn);

    if (contentEl && contentEl.getAttribute("data-rpt-user-added") === "1") {
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "rpt-block-remove";
      removeBtn.setAttribute("aria-label", "블록 삭제");
      removeBtn.title = "추가한 블록 삭제";
      removeBtn.textContent = "×";
      removeBtn.setAttribute("contenteditable", "false");
      removeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm("추가한 블록을 삭제할까요?")) return;
        var prev = wrap.previousElementSibling;
        if (prev && prev.getAttribute("data-rpt-gap") === "1") prev.parentNode.removeChild(prev);
        wrap.parentNode.removeChild(wrap);
      });
      toolbar.appendChild(removeBtn);
    }

    addBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var sec = wrap.closest(".sec");
      if (!sec) return;
      if (openMenu && openMenu.parentNode === toolbar) {
        closeAddMenu();
        return;
      }
      showAddMenu(toolbar, sec, wrap);
    });

    bindBlockDrag(wrap, handle);
    return toolbar;
  }

  function wrapMovable(el) {
    if (!el || el.closest(".rpt-layout-block") || el.closest(".doc-info-table")) return null;
    var wrap = document.createElement("div");
    wrap.className = "rpt-layout-block";
    wrap.setAttribute("data-rpt-block", "1");
    var toolbar = createToolbar(wrap, el);
    var parent = el.parentNode;
    if (!parent) return null;
    parent.insertBefore(wrap, el);
    wrap.appendChild(toolbar);
    wrap.appendChild(el);
    if (el.tagName === "TABLE") {
      var next = wrap.nextElementSibling;
      if (next && next.matches("p.cap")) wrap.appendChild(next);
    }
    return wrap;
  }

  function ensureGapBefore(node) {
    if (!node || node.classList.contains("sec-title")) return;
    if (node.getAttribute("data-rpt-sec-add") === "1") return;
    var prev = node.previousElementSibling;
    if (prev && prev.getAttribute("data-rpt-gap") === "1") return;
    if (prev && prev.classList.contains("sec-title")) return;
    node.parentNode.insertBefore(createGap(), node);
  }

  function ensureSectionAddRow(sec) {
    if (sec.querySelector("[data-rpt-sec-add]")) return;
    var row = document.createElement("div");
    row.className = "rpt-sec-add-row";
    row.setAttribute("data-rpt-sec-add", "1");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rpt-sec-add-btn";
    btn.textContent = "＋ 추가";
    btn.title = "섹션·표·차트·본문 추가";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (openMenu && openMenu.parentNode === row) {
        closeAddMenu();
        return;
      }
      showAddMenu(row, sec, null);
    });
    row.appendChild(btn);
    sec.appendChild(row);
  }

  function normalizeSection(sec) {
    sec.querySelectorAll("table.report-table, .chart-block, .kpi-strip, .rpt-text-block").forEach(function (el) {
      wrapMovable(el);
    });
    Array.prototype.forEach.call(sec.children, function (child) {
      if (child.classList.contains("sec-title")) return;
      ensureGapBefore(child);
    });
    ensureSectionAddRow(sec);
  }

  function secDropTargets(sec) {
    return Array.prototype.filter.call(sec.children, function (child) {
      return !child.classList.contains("sec-title") &&
        child.getAttribute("data-rpt-drop-line") !== "1" &&
        child.getAttribute("data-rpt-sec-add") !== "1";
    });
  }

  function getDropIndex(sec, clientY) {
    var items = secDropTargets(sec).filter(function (n) {
      return n !== dragBlock;
    });
    var idx = items.length;
    for (var i = 0; i < items.length; i++) {
      var rect = items[i].getBoundingClientRect();
      var mid = rect.top + rect.height / 2;
      if (clientY < mid) {
        idx = i;
        break;
      }
    }
    return { idx: idx, items: items };
  }

  function showDropLine(sec, clientY) {
    if (!dropLine) {
      dropLine = document.createElement("div");
      dropLine.className = "rpt-drop-line";
      dropLine.setAttribute("data-rpt-drop-line", "1");
    }
    var result = getDropIndex(sec, clientY);
    dropLine.remove();
    if (result.idx >= result.items.length) {
      var addRow = sec.querySelector("[data-rpt-sec-add]");
      if (addRow) sec.insertBefore(dropLine, addRow);
      else sec.appendChild(dropLine);
    } else {
      sec.insertBefore(dropLine, result.items[result.idx]);
    }
  }

  function clearDropLine() {
    if (dropLine && dropLine.parentNode) dropLine.parentNode.removeChild(dropLine);
  }

  function bindBlockDrag(wrap, handle) {
    handle.addEventListener("dragstart", function (e) {
      dragBlock = wrap;
      wrap.classList.add("rpt-dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", "block"); } catch (_err) {}
    });
    handle.addEventListener("dragend", function () {
      wrap.classList.remove("rpt-dragging");
      dragBlock = null;
      clearDropLine();
      root.querySelectorAll(".rpt-drop-target").forEach(function (n) {
        n.classList.remove("rpt-drop-target");
      });
    });
  }

  function stripTextEdit(scope) {
    var base = scope || root;
    Array.prototype.forEach.call(base.querySelectorAll("[contenteditable]"), function (el) {
      el.removeAttribute("contenteditable");
      el.removeAttribute("spellcheck");
    });
  }

  function bindEditListeners() {
    if (!docClickBound) {
      docClickBound = true;
      document.addEventListener("click", function (e) {
        if (!editActive) return;
        if (e.target.closest("[data-rpt-stats-toolbar]")) return;
        if (e.target.closest("[data-rpt-stats-dialog]")) return;
        closeAddMenu();
      });
    }
  }

  function enableEditMode() {
    root.classList.remove("rpt-preview-mode");
    if (!editInitialized) {
      editInitialized = true;
      bindEditListeners();
    }
    stripLayoutChrome();
    editActive = true;
    document.body.classList.add("rpt-editor-mode");
    root.classList.add("rpt-editor-surface");
    ensureStatsToolbar(true);
    seedStatSlots();
    decorateRemovableBlocks(root);
    applyTextEdit(root);
    if (typeof global.__pixReportEnableTextEdit === "function") global.__pixReportEnableTextEdit();
  }

  function disableEditMode() {
    editActive = false;
    root.classList.add("rpt-preview-mode");
    document.body.classList.remove("rpt-editor-mode");
    root.classList.remove("rpt-editor-surface");
    closeAddMenu();
    closeStatsDialog();
    ensureStatsToolbar(false);
    stripStatBlockChrome();
    stripTextEdit(root);
  }

  root.classList.add("rpt-preview-mode");

  global.PixReportLayoutEdit = {
    enable: enableEditMode,
    disable: disableEditMode,
    isEditMode: function () { return editActive; },
    seedStatSlots: seedStatSlots
  };
  global.__pixReportApplyTextEdit = applyTextEdit;

  if (global.PixReportStatsQuery) seedStatSlots();
  ensureWysiwygMock();

  window.addEventListener("message", function (e) {
    if (!e.data || e.data.type !== "pix-report-enable-edit") return;
    enableEditMode();
  });
})(typeof window !== "undefined" ? window : global);
