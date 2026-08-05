(function registerSurveyGradeTrendChart(global) {
  "use strict";
  var React = global.React;
  if (!React || global.SurveyGradeTrendChart) return;

  var Y_MIN = 74;
  var Y_MAX = 91;
  var PLOT_H = 188;

  var GRADE_LINES = [
    { label: "1등급 90점", y: 90, dash: true },
    { label: "2등급 85점", y: 85, dash: true },
    { label: "3등급 80점", y: 80, dash: true },
    { label: "4등급 75점", y: 75, dash: true }
  ];

  var GRADE5_LABEL = "5등급 (75점 미만)";

  var BANDS = [
    { top: 90, bottom: 91, color: "rgba(52,150,120,0.14)" },
    { top: 85, bottom: 90, color: "rgba(12,68,124,0.10)" },
    { top: 80, bottom: 85, color: "rgba(198,169,98,0.14)" },
    { top: 75, bottom: 80, color: "rgba(255,255,255,0)" },
    { top: 74, bottom: 75, color: "rgba(155,77,77,0.10)" }
  ];

  var MONTHS = [
    { month: "1월", score: 81.5, grade: 3, gradeLabel: "3등급" },
    { month: "2월", score: 83.2, grade: 3, gradeLabel: "3등급" },
    { month: "3월", score: 79.8, grade: 4, gradeLabel: "4등급" },
    { month: "4월", score: 86.4, grade: 2, gradeLabel: "2등급" },
    { month: "5월", score: 80.9, grade: 3, gradeLabel: "3등급" },
    { month: "6월", score: 80.2, grade: 3, gradeLabel: "3등급", current: true }
  ];

  function yPct(score) {
    return ((score - Y_MIN) / (Y_MAX - Y_MIN)) * 100;
  }

  function bandStyle(top, bottom) {
    var topPct = 100 - yPct(top);
    var bottomPct = 100 - yPct(bottom);
    return { top: topPct + "%", height: (bottomPct - topPct) + "%" };
  }

  function barColor(item) {
    if (item.current) return "#9B4D4D";
    if (item.grade === 4) return "#B8860B";
    return "#0C447C";
  }

  function gradeTextClass(item) {
    if (item.current) return "text-[11px] font-black text-[#9B4D4D]";
    if (item.grade === 2) return "text-[11px] font-black text-emerald-600";
    if (item.grade === 4) return "text-[11px] font-black text-amber-700";
    return "text-[11px] font-bold text-gray-500";
  }

  var LEGEND = [
    { color: "#34A853", label: "2등급" },
    { color: "#0C447C", label: "3등급" },
    { color: "#B8860B", label: "4등급" },
    { color: "#9B4D4D", label: "이번 달(6월)" }
  ];

  function renderPlotArea() {
    return React.createElement(
      "div",
      { className: "relative flex-1 min-w-0", style: { height: PLOT_H + "px" } },
      BANDS.map(function (b, i) {
        var st = bandStyle(b.top, b.bottom);
        return React.createElement("div", {
          key: "band-" + i,
          className: "absolute left-0 right-0",
          style: { top: st.top, height: st.height, background: b.color }
        });
      }),
      GRADE_LINES.filter(function (l) { return l.dash; }).map(function (line) {
        return React.createElement("div", {
          key: "line-" + line.label,
          className: "absolute left-0 right-0 border-t border-dashed border-gray-300/80 pointer-events-none",
          style: { bottom: yPct(line.y) + "%" }
        });
      }),
      React.createElement(
        "div",
        { className: "absolute inset-0 flex items-end justify-between gap-1 px-1" },
        MONTHS.map(function (item) {
          var h = yPct(item.score);
          return React.createElement(
            "div",
            {
              key: item.month,
              className: "flex-1 flex flex-col items-center justify-end h-full min-w-0"
            },
            React.createElement(
              "span",
              { className: "text-[10px] font-black text-gray-700 tabular-nums mb-0.5" },
              item.score.toFixed(1)
            ),
            React.createElement("div", {
              className: "w-[58%] max-w-[48px] rounded-t-md",
              style: { height: h + "%", minHeight: "6px", background: barColor(item) }
            })
          );
        })
      )
    );
  }

  function renderYLabels() {
    return React.createElement(
      "div",
      { className: "relative shrink-0 w-[88px]", style: { height: PLOT_H + "px" } },
      GRADE_LINES.map(function (line) {
        return React.createElement(
          "div",
          {
            key: "lbl-" + line.label,
            className: "absolute left-0 text-[9.5px] font-bold text-gray-400 whitespace-nowrap leading-none",
            style: {
              bottom: yPct(line.y) + "%",
              transform: "translateY(50%)"
            }
          },
          line.label
        );
      }),
      React.createElement(
        "div",
        {
          className: "absolute left-0 bottom-0 text-[9.5px] font-bold text-gray-400 whitespace-nowrap leading-none",
          style: { transform: "translateY(50%)" }
        },
        GRADE5_LABEL
      )
    );
  }

  function resolveSurveyGrade(score) {
    var n = Number(score);
    if (!isFinite(n)) return { grade: 0, label: "-" };
    if (n >= 90) return { grade: 1, label: "1등급" };
    if (n >= 85) return { grade: 2, label: "2등급" };
    if (n >= 80) return { grade: 3, label: "3등급" };
    if (n >= 75) return { grade: 4, label: "4등급" };
    return { grade: 5, label: "5등급" };
  }

  function surveyGradeBadgeClass(grade) {
    if (grade === 1) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (grade === 2) return "text-blue-700 bg-blue-50 border-blue-200";
    if (grade === 3) return "text-amber-800 bg-amber-50 border-amber-200";
    if (grade === 4) return "text-orange-800 bg-orange-50 border-orange-200";
    return "text-rose-700 bg-rose-50 border-rose-200";
  }

  global.resolveSurveyGrade = resolveSurveyGrade;
  global.surveyGradeBadgeClass = surveyGradeBadgeClass;

  function SurveyGradeTrendChart() {
    return React.createElement(
      "div",
      { className: "bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4" },
      React.createElement(
        "p",
        { className: "text-[11px] text-gray-400 mt-0 mb-3" },
        "1~6월 · 영역평균 기준 종합점수"
      ),
      React.createElement(
        "div",
        { className: "flex gap-2 items-start" },
        renderYLabels(),
        renderPlotArea()
      ),
      React.createElement(
        "div",
        { className: "flex justify-between gap-1 px-1 mt-1 pl-[96px]" },
        MONTHS.map(function (item) {
          return React.createElement(
            "div",
            { key: "xl-" + item.month, className: "flex-1 text-center min-w-0" },
            React.createElement("p", { className: "text-[11px] font-bold text-gray-600" }, item.month),
            React.createElement("p", { className: gradeTextClass(item) }, item.gradeLabel)
          );
        })
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-2 border-t border-gray-100" },
        LEGEND.map(function (item) {
          return React.createElement(
            "span",
            { key: item.label, className: "inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500" },
            React.createElement("span", {
              className: "w-2.5 h-2.5 rounded-sm shrink-0",
              style: { background: item.color }
            }),
            item.label
          );
        })
      ),
      React.createElement(
        "p",
        { className: "text-[10px] text-gray-400 leading-relaxed mt-2 mb-0" },
        "※ 등급 구간 점선: 1등급 90점 · 2등급 85점 · 3등급 80점 · 4등급 75점 · 75점 미만 5등급. 6월(80.20점)은 실제 데이터이며, 1~5월은 목업 예시입니다. 4월(86.4)에 2등급 진입 후 5·6월에 3등급 하단으로 재하락한 흐름입니다."
      )
    );
  }

  global.SurveyGradeTrendChart = SurveyGradeTrendChart;
})(typeof window !== "undefined" ? window : globalThis);
