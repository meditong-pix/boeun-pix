(function registerPixAiReportArchiveModule(global) {

  if (global.registerPixAiReportArchivePage) return;



  var TAB_CONFIG = [

    {

      key: "voc",

      label: "VOC",

      variant: "voc",

      keyPrefix: "pix_voc_report_",

      reportUrl: "voc-analysis-report.html",

      reportTitle: "2026년 6월 VOC 분석보고서",

      reportSubtitle: "내부 보고 · 임원 보고용 · PIX AI 환자경험관리",

      iframeTitle: "VOC 분석보고서",

      seeds: [

        {

          storageKey: "pix_voc_report_2026_06",

          period: "2026년 6월",

          title: "2026년 6월 VOC 분석보고서"

        }

      ],

      emptyHint: "VOC 통계 화면에서 AI 분석 · 보고서 작성 후 저장하면 이 목록에 표시됩니다."

    },

    {

      key: "survey",

      label: "환자경험평가",

      variant: "survey",

      keyPrefix: "pix_survey_report_",

      reportUrl: "px-survey-analysis-report.html",

      reportTitle: "2026년 6월 환자경험평가 분석보고서",

      reportSubtitle: "내부 보고 · 임원 보고용 · PIX AI 환자경험관리",

      iframeTitle: "환자경험평가 분석보고서",

      seeds: [

        {

          storageKey: "pix_survey_report_2026_06",

          period: "2026년 6월",

          title: "2026년 6월 환자경험평가 분석보고서"

        }

      ],

      emptyHint: "환자경험평가 화면에서 AI 분석 · 보고서 작성 후 저장하면 이 목록에 표시됩니다."

    }

  ];



  var DETAIL_TABS = [

    { key: "report", label: "보고서" },

    { key: "stats", label: "통계" },

    { key: "analysis", label: "AI 분석" }

  ];

  var ARCHIVE_STATS_FILTER_HIDE_CSS = ".voc-filter-panel{display:none!important;}";



  function formatSavedTime(iso) {

    if (!iso) return "-";

    try {

      var d = new Date(iso);

      if (Number.isNaN(d.getTime())) return "-";

      var p = function (n) { return String(n).padStart(2, "0"); };

      return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());

    } catch (_e) {

      return "-";

    }

  }



  function readStorageEntry(storageKey) {

    try {

      var raw = global.localStorage && global.localStorage.getItem(storageKey);

      if (!raw) return null;

      var parsed = JSON.parse(raw);

      if (!parsed || !parsed.html) return null;

      var html = parsed.html;

      if (typeof global.__pixSanitizeSavedReportHtml === "function") {

        html = global.__pixSanitizeSavedReportHtml(html);

      }

      return {

        storageKey: storageKey,

        status: parsed.status === "draft" ? "draft" : "saved",

        savedAt: parsed.savedAt || "",

        html: html,

        statsSnapshot: parsed.statsSnapshot || null,

        analysisSnapshot: parsed.analysisSnapshot || null

      };

    } catch (_e) {

      return null;

    }

  }



  function extractEntryYear(entry) {
    if (entry.statsSnapshot && entry.statsSnapshot.meta && entry.statsSnapshot.meta.year) {
      return String(entry.statsSnapshot.meta.year).replace(/년$/, "") + "년";
    }
    var m = String(entry.period || entry.storageKey || "").match(/(\d{4})/);
    return m ? m[1] + "년" : "-";
  }

  function extractAnalysisPeriod(entry) {
    if (entry.statsSnapshot && entry.statsSnapshot.meta) {
      var meta = entry.statsSnapshot.meta;
      if (meta.year && meta.bucket) return String(meta.year).replace(/년$/, "") + "년 " + meta.bucket;
      if (meta.basis) {
        var bm = String(meta.basis).match(/(\d{4}년\s*\d{1,2}월)/);
        if (bm) return bm[1];
      }
    }
    return entry.period || "-";
  }



  function discoverKeys(prefix) {

    var keys = [];

    try {

      if (!global.localStorage) return keys;

      for (var i = 0; i < global.localStorage.length; i += 1) {

        var k = global.localStorage.key(i);

        if (k && k.indexOf(prefix) === 0) keys.push(k);

      }

    } catch (_e) {}

    return keys.sort().reverse();

  }



  function loadTabEntries(tab) {

    var cfg = TAB_CONFIG.filter(function (t) { return t.key === tab; })[0];

    if (!cfg) return [];

    var metaByKey = {};

    (cfg.seeds || []).forEach(function (seed) {

      metaByKey[seed.storageKey] = seed;

    });

    discoverKeys(cfg.keyPrefix).forEach(function (key) {

      if (!metaByKey[key]) {

        var period = key.replace(cfg.keyPrefix, "").replace(/_/g, "-");

        metaByKey[key] = {

          storageKey: key,

          period: period,

          title: cfg.label + " 분석보고서 (" + period + ")"

        };

      }

    });

    return Object.keys(metaByKey).map(function (key) {

      var meta = metaByKey[key];

      var stored = readStorageEntry(key);

      return {

        storageKey: key,

        period: meta.period,

        title: meta.title,

        status: stored ? stored.status : null,

        savedAt: stored ? stored.savedAt : "",

        html: stored ? stored.html : "",

        statsSnapshot: stored ? stored.statsSnapshot : null,

        analysisSnapshot: stored ? stored.analysisSnapshot : null,

        hasData: !!stored,

        year: extractEntryYear({ period: meta.period, storageKey: key, statsSnapshot: stored ? stored.statsSnapshot : null }),

        analysisPeriod: extractAnalysisPeriod({ period: meta.period, storageKey: key, statsSnapshot: stored ? stored.statsSnapshot : null })

      };

    }).sort(function (a, b) {

      if (a.hasData !== b.hasData) return a.hasData ? -1 : 1;

      return String(b.storageKey).localeCompare(String(a.storageKey));

    });

  }



  function buildSnapshotDoc(snapshot, kind) {
    if (typeof global.__pixBuildArchiveSnapshotDoc === "function") {
      var doc = global.__pixBuildArchiveSnapshotDoc(snapshot, kind);
      if (kind === "stats" && doc.indexOf("voc-filter-panel{display:none") === -1) {
        doc = doc.replace("</head>", "<style>" + ARCHIVE_STATS_FILTER_HIDE_CSS + "</style></head>");
      }
      return doc;
    }

    return snapshot && snapshot.html ? snapshot.html : "";

  }



  function registerPixAiReportArchivePage(deps) {

    var React = deps.React;

    var useState = deps.useState;

    var useMemo = deps.useMemo;

    var useEffect = deps.useEffect;

    var useRef = deps.useRef;

    var ReactDOM = deps.ReactDOM;



    function snapshotBanner(text) {

      return text

        ? React.createElement(

            "div",

            { className: "px-4 py-2 bg-blue-50 border-b border-blue-100 text-[11px] text-blue-800 font-medium shrink-0" },

            text

          )

        : null;

    }



    function statusBadge(status) {

      if (status === "saved") {

        return React.createElement("span", {

          className: "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black text-emerald-700"

        }, "저장됨");

      }

      if (status === "draft") {

        return React.createElement("span", {

          className: "inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-black text-amber-800"

        }, "임시저장");

      }

      return React.createElement("span", {

        className: "inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-black text-gray-400"

      }, "미작성");

    }



    function portal(node) {

      if (!node) return null;

      if (ReactDOM && typeof ReactDOM.createPortal === "function") {

        return ReactDOM.createPortal(node, document.body);

      }

      return node;

    }



    function ArchiveDetailModal(props) {

      var entry = props.entry;

      var tabCfg = props.tabCfg;

      var showToast = props.showToast;

      var onClose = props.onClose;

      var initialTab = props.initialTab;

      var detailTabState = useState("report");

      var detailTab = detailTabState[0];

      var setDetailTab = detailTabState[1];

      var statsHostRef = useRef(null);

      var analysisHostRef = useRef(null);

      var statsCleanupRef = useRef(null);

      var analysisCleanupRef = useRef(null);



      var hasStatsSnapshot = !!(entry.statsSnapshot && entry.statsSnapshot.html);

      var hasAnalysisSnapshot = !!(entry.analysisSnapshot && entry.analysisSnapshot.html);



      useEffect(function () {

        setDetailTab(initialTab || "report");

      }, [entry.storageKey, tabCfg.key, initialTab]);



      useEffect(function () {

        if (detailTab !== "stats" || !statsHostRef.current || hasStatsSnapshot) return undefined;

        var host = statsHostRef.current;

        host.innerHTML = "";

        if (tabCfg.key === "voc" && typeof global.__pixMountVocStatisticsEmbed === "function") {

          global.__pixMountVocStatisticsEmbed(host);

          var hideStyle = host.querySelector("[data-pix-archive-stats-hide]");

          if (!hideStyle) {

            hideStyle = document.createElement("style");

            hideStyle.setAttribute("data-pix-archive-stats-hide", "1");

            hideStyle.textContent = ARCHIVE_STATS_FILTER_HIDE_CSS;

            host.insertBefore(hideStyle, host.firstChild);

          }

          statsCleanupRef.current = function () { host.innerHTML = ""; };

        } else if (tabCfg.key === "survey" && typeof global.__pixSurveyStatsEmbedRenderer === "function") {

          statsCleanupRef.current = global.__pixSurveyStatsEmbedRenderer(host, showToast) || function () { host.innerHTML = ""; };

        }

        return function () {

          if (statsCleanupRef.current) statsCleanupRef.current();

          statsCleanupRef.current = null;

        };

      }, [detailTab, entry.storageKey, tabCfg.key, showToast, hasStatsSnapshot]);



      useEffect(function () {

        if (detailTab !== "analysis" || !analysisHostRef.current || hasAnalysisSnapshot) return undefined;

        if (typeof global.mountPxAiAnalysisPanel !== "function") return undefined;

        var host = analysisHostRef.current;

        host.innerHTML = "";

        analysisCleanupRef.current = global.mountPxAiAnalysisPanel(host, {

          variant: tabCfg.variant,

          embedInArchive: true,

          showCompletedAnalysis: true,

          level: (entry.analysisSnapshot && entry.analysisSnapshot.level) || "deep",

          hideLevelSlider: true,

          reportStorageKey: entry.storageKey

        });

        return function () {

          if (analysisCleanupRef.current) analysisCleanupRef.current();

          analysisCleanupRef.current = null;

          host.innerHTML = "";

        };

      }, [detailTab, entry.storageKey, tabCfg.variant, hasAnalysisSnapshot]);



      var statsSnapshotLabel = "";

      if (hasStatsSnapshot && entry.statsSnapshot.meta) {

        var m = entry.statsSnapshot.meta;

        statsSnapshotLabel = "저장 시점 통계 · " + (m.basis || (m.year && m.bucket ? m.year + " " + m.bucket : entry.period));

      }



      var analysisSnapshotLabel = "";

      if (hasAnalysisSnapshot) {

        var a = entry.analysisSnapshot;

        analysisSnapshotLabel = "저장 시점 AI 분석 · " + (a.levelLabel || a.level || "분석") +

          (a.periodText ? " · " + a.periodText : "");

      }



      var reportSrcDoc = entry.hasData
        ? (typeof global.__pixSanitizeSavedReportHtml === "function"
            ? global.__pixSanitizeSavedReportHtml(entry.html)
            : entry.html)
        : null;



      return portal(

        React.createElement(

          "div",

          { className: "fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4" },

          React.createElement("div", {

            className: "absolute inset-0 bg-black/45",

            onClick: onClose

          }),

          React.createElement(

            "div",

            {

              className: "relative w-full max-w-[1180px] h-[92vh] max-h-[92vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden",

              onClick: function (e) { e.stopPropagation(); }

            },

            React.createElement(

              "div",

              { className: "px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white shrink-0" },

              React.createElement(

                "div",

                { className: "flex flex-wrap items-start justify-between gap-3" },

                React.createElement(

                  "div",

                  { className: "min-w-0" },

                  React.createElement(

                    "div",

                    { className: "flex flex-wrap items-center gap-2 mb-1" },

                    statusBadge(entry.status),

                    React.createElement("span", {

                      className: "inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-black text-blue-700"

                    }, tabCfg.label)

                  ),

                  React.createElement("p", { className: "text-sm font-black text-gray-900 m-0 truncate" }, entry.title),

                  React.createElement(

                    "p",

                    { className: "text-[11px] text-gray-500 m-0 mt-1" },

                    entry.period + " · " +

                      (entry.hasData

                        ? formatSavedTime(entry.savedAt) + " · " + (entry.status === "draft" ? "임시저장" : "저장됨")

                        : "저장 전")

                  )

                ),

                React.createElement(

                  "button",

                  {

                    type: "button",

                    onClick: onClose,

                    className: "w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 text-sm font-bold shrink-0"

                  },

                  "✕"

                )

              ),

              React.createElement(

                "div",

                { className: "flex gap-2 mt-3" },

                DETAIL_TABS.map(function (t) {

                  var on = detailTab === t.key;

                  return React.createElement(

                    "button",

                    {

                      key: t.key,

                      type: "button",

                      onClick: function () { setDetailTab(t.key); },

                      className: "px-4 py-2 rounded-lg text-xs font-black transition-all " +

                        (on ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50")

                    },

                    t.label

                  );

                })

              )

            ),

            React.createElement(

              "div",

              { className: "flex-1 min-h-0 overflow-hidden bg-gray-50 flex flex-col" },

              detailTab === "stats"

                ? hasStatsSnapshot

                  ? React.createElement(

                      React.Fragment,

                      null,

                      snapshotBanner(statsSnapshotLabel),

                      tabCfg.key === "survey"

                        ? React.createElement("iframe", {

                            title: "저장된 통계 스냅샷",

                            className: "w-full flex-1 min-h-0 border-0 bg-white",

                            srcDoc: buildSnapshotDoc(entry.statsSnapshot, "stats")

                          })

                        : React.createElement("iframe", {

                            title: "저장된 통계 스냅샷",

                            className: "w-full flex-1 min-h-0 border-0 bg-white",

                            srcDoc: buildSnapshotDoc(entry.statsSnapshot, "stats")

                          })

                    )

                  : React.createElement(

                      React.Fragment,

                      null,

                      snapshotBanner(entry.hasData ? "저장 시점 통계 스냅샷이 없습니다. 현재 기본 통계 화면을 표시합니다." : null),

                      React.createElement("div", {

                        ref: statsHostRef,

                        className: "w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white px-1 pb-4" +

                          (tabCfg.key === "voc" ? " voc-embed-root" : "")

                      })

                    )

                : null,

              detailTab === "analysis"

                ? hasAnalysisSnapshot

                  ? React.createElement(

                      React.Fragment,

                      null,

                      snapshotBanner(analysisSnapshotLabel),

                      React.createElement("iframe", {

                        title: "저장된 AI 분석 스냅샷",

                        className: "w-full flex-1 min-h-0 border-0",

                        style: { background: "#17171c" },

                        srcDoc: buildSnapshotDoc(entry.analysisSnapshot, "analysis")

                      })

                    )

                  : React.createElement(

                      React.Fragment,

                      null,

                      snapshotBanner(entry.hasData ? "저장 시점 AI 분석 스냅샷이 없습니다. 기본 분석 화면을 표시합니다." : null),

                      React.createElement("div", {

                        ref: analysisHostRef,

                        className: "w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden",

                        style: { background: "#17171c" }

                      })

                    )

                : null,

              detailTab === "report"

                ? React.createElement(

                    "div",

                    { className: "w-full h-full flex flex-col bg-[#eae8e2]" },

                    !entry.hasData

                      ? React.createElement(

                          "div",

                          { className: "px-4 py-2 bg-amber-50 border-b border-amber-100 text-[11px] text-amber-800 font-medium shrink-0" },

                          "저장된 보고서가 없습니다. 아래는 보고서 템플릿 미리보기입니다."

                        )

                      : null,

                    React.createElement(

                      "div",

                      { className: "px-4 py-2 border-b border-[#cfcdc5] bg-[#f5f4f0] shrink-0" },

                      React.createElement("p", { className: "text-sm font-black text-[#1f1e1c] m-0" }, tabCfg.reportTitle),

                      React.createElement("p", { className: "text-[11px] text-[#898781] m-0 mt-0.5" }, tabCfg.reportSubtitle)

                    ),

                    React.createElement("iframe", {

                      title: tabCfg.iframeTitle,

                      className: "w-full flex-1 min-h-0 border-0 bg-[#eae8e2]",

                      src: reportSrcDoc ? undefined : tabCfg.reportUrl,

                      srcDoc: reportSrcDoc || undefined,

                      sandbox: reportSrcDoc ? "allow-same-origin" : undefined

                    })

                  )

                : null

            )

          )

        )

      );

    }



    return function PixAiReportArchivePage(props) {

      var showToast = props && props.showToast;

      var tabState = useState("voc");

      var tab = tabState[0];

      var setTab = tabState[1];

      var refreshState = useState(0);

      var refresh = refreshState[0];

      var bumpRefresh = refreshState[1];

      var selectedState = useState(null);

      var selectedKey = selectedState[0];

      var setSelectedKey = selectedState[1];

      var modalInitialTabState = useState(null);

      var modalInitialTab = modalInitialTabState[0];

      var setModalInitialTab = modalInitialTabState[1];



      useEffect(function () {

        function onPersisted() { bumpRefresh(function (n) { return n + 1; }); }

        global.addEventListener("pix-report-persisted", onPersisted);

        return function () { global.removeEventListener("pix-report-persisted", onPersisted); };

      }, []);



      var entries = useMemo(function () {

        return loadTabEntries(tab);

      }, [tab, refresh]);



      var selected = useMemo(function () {

        if (!selectedKey) return null;

        return entries.filter(function (e) { return e.storageKey === selectedKey; })[0] || null;

      }, [entries, selectedKey]);



      var activeTabCfg = TAB_CONFIG.filter(function (t) { return t.key === tab; })[0];



      function openEntry(entry) {

        if (!entry) return;

        setModalInitialTab(null);

        setSelectedKey(entry.storageKey);

      }



      function editEntry(entry, ev) {

        if (ev && ev.stopPropagation) ev.stopPropagation();

        if (!entry) return;

        setModalInitialTab("report");

        setSelectedKey(entry.storageKey);

      }



      function removeEntry(entry, ev) {

        if (ev && ev.stopPropagation) ev.stopPropagation();

        if (!entry || !entry.hasData) return;

        if (!global.confirm("저장된 보고서를 삭제할까요?")) return;

        try {

          global.localStorage.removeItem(entry.storageKey);

          bumpRefresh(function (n) { return n + 1; });

          if (selectedKey === entry.storageKey) setSelectedKey(null);

          if (showToast) showToast("보고서를 삭제했습니다.");

        } catch (_e) {

          if (showToast) showToast("삭제에 실패했습니다.");

        }

      }



      return React.createElement(

        "div",

        { className: "w-full h-full flex flex-col animate-fadeIn min-h-0" },

        React.createElement(

          "div",

          { className: "bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden" },

          React.createElement(

            "div",

            { className: "px-4 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3" },

            React.createElement(

              "div",

              { className: "flex flex-wrap gap-2" },

              TAB_CONFIG.map(function (t) {

                var on = tab === t.key;

                return React.createElement(

                  "button",

                  {

                    key: t.key,

                    type: "button",

                    onClick: function () { setTab(t.key); setSelectedKey(null); },

                    className: "px-4 py-2 rounded-lg text-xs font-black transition-all " +

                      (on

                        ? "bg-blue-600 text-white shadow-sm"

                        : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100")

                  },

                  t.label

                );

              })

            ),

            React.createElement(

              "p",

              { className: "text-[11px] text-gray-500 m-0" },

              "행을 클릭하면 저장 시점의 통계 · AI 분석 · 보고서를 모달에서 확인할 수 있습니다."

            )

          ),

          React.createElement(

            "div",

            { className: "overflow-x-auto" },

            React.createElement(

              "table",

              { className: "w-full text-left text-xs" },

              React.createElement(

                "thead",

                null,

                React.createElement(

                  "tr",

                  { className: "border-b border-gray-100 bg-gray-50 text-[10px] font-black uppercase tracking-wide text-gray-500" },

                  React.createElement("th", { className: "px-3 py-3 font-black w-12 text-center" }, "번호"),
                  React.createElement("th", { className: "px-3 py-3 font-black w-20" }, "년도"),
                  React.createElement("th", { className: "px-4 py-3 font-black" }, "보고서"),
                  React.createElement("th", { className: "px-4 py-3 font-black w-28" }, "분석기간"),
                  React.createElement("th", { className: "px-3 py-3 font-black w-24" }, "상태"),
                  React.createElement("th", { className: "px-3 py-3 font-black w-36" }, "등록일"),
                  React.createElement("th", { className: "px-3 py-3 font-black w-28 text-right" }, "관리")

                )

              ),

              React.createElement(

                "tbody",

                null,

                entries.length

                  ? entries.map(function (entry, index) {

                    var rowOn = selectedKey === entry.storageKey;

                    return React.createElement(

                      "tr",

                      {

                        key: entry.storageKey,

                        onClick: function () { openEntry(entry); },

                        className: "border-b border-gray-50 cursor-pointer transition-colors hover:bg-blue-50/40 " +

                          (rowOn ? "bg-blue-50/70 ring-1 ring-inset ring-blue-200" : "")

                      },

                      React.createElement("td", { className: "px-3 py-3 text-center text-gray-500 tabular-nums font-bold" }, index + 1),

                      React.createElement("td", { className: "px-3 py-3 font-bold text-gray-800 whitespace-nowrap" }, entry.year),

                      React.createElement("td", { className: "px-4 py-3 text-gray-700" }, entry.title),

                      React.createElement("td", { className: "px-4 py-3 text-gray-600 whitespace-nowrap" }, entry.analysisPeriod),

                      React.createElement("td", { className: "px-3 py-3" }, statusBadge(entry.status)),

                      React.createElement(

                        "td",

                        { className: "px-3 py-3 text-gray-500 tabular-nums whitespace-nowrap" },

                        entry.hasData ? formatSavedTime(entry.savedAt) : "-"

                      ),

                      React.createElement(

                        "td",

                        { className: "px-3 py-3 text-right whitespace-nowrap" },

                        React.createElement(

                          "span",

                          { className: "inline-flex gap-1.5" },

                          React.createElement(

                            "button",

                            {

                              type: "button",

                              onClick: function (ev) { editEntry(entry, ev); },

                              className: "px-2.5 py-1 rounded-md border border-blue-200 bg-white text-[11px] font-bold text-blue-700 hover:bg-blue-50"

                            },

                            "수정"

                          ),

                          entry.hasData

                            ? React.createElement(

                                "button",

                                {

                                  type: "button",

                                  onClick: function (ev) { removeEntry(entry, ev); },

                                  className: "px-2.5 py-1 rounded-md border border-gray-200 bg-white text-[11px] font-bold text-gray-500 hover:bg-gray-50"

                                },

                                "삭제"

                              )

                            : null

                        )

                      )

                    );

                  })

                  : React.createElement(

                      "tr",

                      null,

                      React.createElement(

                        "td",

                        { colSpan: 7, className: "px-4 py-10 text-center text-sm text-gray-400" },

                        "등록된 보고서가 없습니다."

                      )

                    )

              )

            )

          ),

          React.createElement(

            "div",

            { className: "px-4 py-3 border-t border-gray-100 bg-gray-50/70" },

            React.createElement("p", { className: "text-[11px] text-gray-500 m-0 leading-relaxed" }, activeTabCfg ? activeTabCfg.emptyHint : "")

          )

        ),

        selected && activeTabCfg

          ? React.createElement(ArchiveDetailModal, {

              entry: selected,

              tabCfg: activeTabCfg,

              showToast: showToast,

              initialTab: modalInitialTab,

              onClose: function () { setSelectedKey(null); setModalInitialTab(null); }

            })

          : null

      );

    };

  }



  global.registerPixAiReportArchivePage = registerPixAiReportArchivePage;

  global.__pixAiReportArchiveLoadTabEntries = loadTabEntries;

})(typeof window !== "undefined" ? window : global);


