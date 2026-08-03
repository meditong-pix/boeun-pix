(function enablePixReportLayoutEdit(global) {
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
      ".rpt-stats-dialog{width:min(420px,100%);background:#fff;border:1px solid #cfcdc5;border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,.18);padding:16px 16px 14px;}",
      ".rpt-stats-dialog h3{margin:0 0 6px;font-size:14px;color:#0C447C;}",
      ".rpt-stats-dialog p{margin:0 0 10px;font-size:11px;color:#898781;line-height:1.5;}",
      ".rpt-stats-dialog input{width:100%;box-sizing:border-box;border:1px solid #cfcdc5;border-radius:6px;padding:8px 10px;font-size:12.5px;margin-bottom:8px;}",
      ".rpt-stats-suggest{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}",
      ".rpt-stats-suggest button{border:1px solid #e3e1da;background:#faf9f6;border-radius:999px;padding:4px 9px;font-size:10.5px;cursor:pointer;color:#555;}",
      ".rpt-stats-suggest button:hover{border-color:#0C447C;color:#0C447C;}",
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
      ".doc.rpt-preview-mode .rpt-block-toolbar,.doc.rpt-preview-mode .rpt-sec-add-row,.doc.rpt-preview-mode .rpt-sec-delete{display:none!important;}",
      ".doc.rpt-preview-mode [contenteditable=\"true\"]{cursor:default;}",
      ".doc.rpt-preview-mode [contenteditable=\"true\"]:hover,.doc.rpt-preview-mode [contenteditable=\"true\"]:focus{background:transparent;outline:none;}"
    ].join("");
    document.head.appendChild(style);
  }

  var root = document.querySelector(".doc");
  if (!root) return;

  var dragBlock = null;
  var dropLine = null;
  var openMenu = null;
  var statsDialog = null;
  var statsDialogContext = null;
  var editInitialized = false;
  var editActive = false;
  var docClickBound = false;
  var gapKeyBound = false;

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
    ".sec-title", "p", "ul.plain li", ".headline",
    ".kpi-label", ".kpi-val", ".kpi-delta",
    "table.report-table th", "table.report-table td",
    ".cap", ".chart-title", ".bar-name", ".bar-val",
    ".risk-badge", ".risk-desc", ".flag-tag", ".flag-body",
    ".quote-box", ".quote-meta", ".footer-note span"
  ].join(",");

  function applyTextEdit(scope) {
    var base = scope || root;
    Array.prototype.forEach.call(base.querySelectorAll(TEXT_EDIT_SELECTOR), function (el) {
      if (el.closest(".line-chart-wrap") || el.closest("svg") || el.closest(".bar-track")) return;
      if (el.closest(".rpt-block-toolbar") || el.closest(".rpt-add-menu") || el.closest(".rpt-sec-add-row")) return;
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
    var insertBefore = afterNode
      ? afterNode.nextSibling
      : sec.querySelector("[data-rpt-sec-add]");
    sec.insertBefore(createGap(), insertBefore);
    var wrap;

    if (result.kind === "table") {
      sec.insertBefore(result.table, insertBefore);
      if (result.cap) sec.insertBefore(result.cap, insertBefore);
      wrap = wrapMovable(result.table);
      if (wrap && result.cap && result.cap.parentNode === sec) wrap.appendChild(result.cap);
    } else if (result.node) {
      sec.insertBefore(result.node, insertBefore);
      wrap = wrapMovable(result.node);
    }

    applyTextEdit(wrap || sec);
    if (wrap) {
      var focusEl = wrap.querySelector(".chart-title, table.report-table th");
      if (focusEl) focusEl.focus();
    }
  }

  function openStatsDialog(sec, afterNode) {
    closeAddMenu();
    closeStatsDialog();
    if (!global.PixReportStatsQuery) {
      window.alert("통계 불러오기 모듈이 로드되지 않았습니다.");
      return;
    }
    statsDialogContext = { sec: sec, afterNode: afterNode };
    var backdrop = document.createElement("div");
    backdrop.className = "rpt-stats-dialog-backdrop";
    backdrop.setAttribute("data-rpt-stats-dialog", "1");
    var suggestions = global.PixReportStatsQuery.getSuggestions();
    backdrop.innerHTML =
      '<div class="rpt-stats-dialog" role="dialog" aria-label="통계에서 불러오기">' +
        "<h3>통계에서 불러오기</h3>" +
        "<p>통계 화면 목업 데이터에서 표·차트를 생성합니다. 원하는 내용을 입력하세요.</p>" +
        '<input type="text" class="rpt-stats-input" placeholder="예: 의사영역 점수 6개월 추이" />' +
        '<div class="rpt-stats-suggest">' +
          suggestions.map(function (s) {
            return '<button type="button" data-rpt-suggest="' + s.replace(/"/g, "&quot;") + '">' + s + "</button>";
          }).join("") +
        "</div>" +
        '<div class="rpt-stats-msg"></div>' +
        '<div class="rpt-stats-actions">' +
          '<button type="button" class="rpt-stats-cancel">취소</button>' +
          '<button type="button" class="rpt-stats-submit">불러오기</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(backdrop);
    statsDialog = backdrop;
    var input = backdrop.querySelector(".rpt-stats-input");
    var msg = backdrop.querySelector(".rpt-stats-msg");

    function runSubmit() {
      var resolved = global.PixReportStatsQuery.resolveQuery(input.value);
      if (!resolved.ok) {
        msg.className = "rpt-stats-msg err";
        msg.textContent = resolved.message;
        return;
      }
      insertFromStatsResult(statsDialogContext.sec, statsDialogContext.afterNode, resolved);
      closeStatsDialog();
    }

    backdrop.querySelector(".rpt-stats-cancel").addEventListener("click", closeStatsDialog);
    backdrop.querySelector(".rpt-stats-submit").addEventListener("click", runSubmit);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeStatsDialog();
    });
    backdrop.querySelector(".rpt-stats-dialog").addEventListener("click", function (e) {
      e.stopPropagation();
    });
    backdrop.querySelectorAll("[data-rpt-suggest]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        input.value = btn.getAttribute("data-rpt-suggest");
        input.focus();
      });
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        runSubmit();
      }
      if (e.key === "Escape") closeStatsDialog();
    });
    input.focus();
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
        if (e.target.closest("[data-rpt-add-menu]") || e.target.closest(".rpt-block-add") || e.target.closest(".rpt-sec-add-btn")) return;
        if (e.target.closest(".rpt-sec-delete")) return;
        if (e.target.closest("[data-rpt-stats-dialog]")) return;
        closeAddMenu();
      });
    }
    if (!gapKeyBound) {
      gapKeyBound = true;
      root.addEventListener("keydown", function (e) {
        if (!editActive) return;
        if (e.key !== "Enter" || e.shiftKey) return;
        var gap = e.target.closest("[data-rpt-gap]");
        if (!gap) return;
        e.preventDefault();
        document.execCommand("insertLineBreak");
      });
    }
  }

  function enableEditMode() {
    root.classList.remove("rpt-preview-mode");
    if (!editInitialized) {
      editInitialized = true;
      root.querySelectorAll(".sec").forEach(initSection);
      renumberSections();
      bindEditListeners();
    }
    editActive = true;
    applyTextEdit(root);
    if (typeof global.__pixReportEnableTextEdit === "function") global.__pixReportEnableTextEdit();
  }

  function disableEditMode() {
    editActive = false;
    root.classList.add("rpt-preview-mode");
    closeAddMenu();
    closeStatsDialog();
    stripTextEdit(root);
  }

  root.classList.add("rpt-preview-mode");

  global.PixReportLayoutEdit = {
    enable: enableEditMode,
    disable: disableEditMode,
    isEditMode: function () { return editActive; }
  };
  global.__pixReportApplyTextEdit = applyTextEdit;

  window.addEventListener("message", function (e) {
    if (!e.data || e.data.type !== "pix-report-enable-edit") return;
    enableEditMode();
  });
})(typeof window !== "undefined" ? window : global);
