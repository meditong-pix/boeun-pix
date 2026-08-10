(function registerPixAiReportArchiveData(global) {
  "use strict";

  if (global.__pixAiReportArchiveLoadTabEntries) return;

  var TAB_CONFIG = [
    {
      key: "voc",
      label: "VOC",
      variant: "voc",
      keyPrefix: "pix_voc_report_",
      reportUrl: "px-voc-executive-report.html?v=20260809-1",
      reportTitle: "VOC 분석 결과 진단 및 개선계획",
      reportSubtitle: "수원윌스기념병원 · 경영진 보고 · PIX AI",
      iframeTitle: "VOC 개선계획 경영진 보고서",
      seeds: [
        {
          storageKey: "pix_voc_report_improvement_plan",
          period: "2026 Q2 · 개선계획",
          title: "VOC 분석 결과 진단 및 개선계획"
        }
      ],
      emptyHint: "VOC 통계 화면에서 AI 분석 · 보고서 작성 후 저장하면 이 목록에 표시됩니다."
    },
    {
      key: "survey",
      label: "환자경험평가",
      variant: "survey",
      keyPrefix: "pix_survey_report_",
      reportUrl: "px-survey-executive-report.html?v=20260809-2",
      reportTitle: "환자경험평가 5차 결과 진단 및 1등급 달성 개선계획",
      reportSubtitle: "수원윌스기념병원 · 경영진 보고 · PIX AI",
      iframeTitle: "1등급 달성 경영진 보고서",
      seeds: [
        {
          storageKey: "pix_survey_report_grade1_plan",
          period: "5차 · 1등급 달성계획",
          title: "환자경험평가 5차 결과 진단 및 1등급 달성 개선계획"
        }
      ],
      emptyHint: "환자경험평가 화면에서 AI 분석 · 보고서 작성 후 저장하면 이 목록에 표시됩니다."
    }
  ];

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

  global.__pixAiReportArchiveLoadTabEntries = loadTabEntries;

  global.__pixAiReportArchiveTabConfig = function (tabKey) {
    return TAB_CONFIG.filter(function (t) { return t.key === tabKey; })[0] || null;
  };
})(typeof window !== "undefined" ? window : global);
