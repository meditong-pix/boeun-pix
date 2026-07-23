    (function setupPeriodFilter() {
      var tabs = document.querySelectorAll("#periodTabs .period-tab");
      var label = document.getElementById("filterPeriodLabel");
      var select = document.getElementById("filterPeriodValue");
      var yearSelect = document.getElementById("filterYear");
      var subtitle = document.querySelector(".page-subtitle");
      var currentPeriod = "month";
      var configs = {
        month: {
          label: "월 선택",
          options: Array.from({ length: 12 }, function (_, i) { return { value: String(i + 1), text: (i + 1) + "월" }; }),
          selected: "6",
        },
        quarter: {
          label: "분기 선택",
          options: [{ value: "1", text: "1분기" }, { value: "2", text: "2분기" }, { value: "3", text: "3분기" }, { value: "4", text: "4분기" }],
          selected: "2",
        },
        half: {
          label: "반기 선택",
          options: [{ value: "1", text: "상반기" }, { value: "2", text: "하반기" }],
          selected: "1",
        },
        year: {
          label: "연도 선택",
          options: [{ value: "all", text: "연도 전체" }],
          selected: "all",
        },
      };

      function updateSubtitle() {
        if (!subtitle) return;
        var year = yearSelect.value;
        var periodText = select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : "";
        subtitle.textContent = year + "년 " + periodText + " 기준으로 주요 접수 현황과 흐름을 확인하세요.";
      }

      function applyPeriod(period) {
        currentPeriod = period;
        var config = configs[period];
        label.textContent = config.label;
        select.innerHTML = config.options.map(function (option) {
          return '<option value="' + option.value + '"' + (option.value === config.selected ? " selected" : "") + ">" + option.text + "</option>";
        }).join("");
        tabs.forEach(function (tab) {
          var active = tab.getAttribute("data-period") === period;
          tab.classList.toggle("active", active);
          tab.setAttribute("aria-selected", active);
        });
        updateSubtitle();
      }

      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () { applyPeriod(tab.getAttribute("data-period")); });
      });
      select.addEventListener("change", updateSubtitle);
      yearSelect.addEventListener("change", function () {
        if (currentPeriod === "year") applyPeriod("year");
        else updateSubtitle();
      });
    })();
  

/* ═══════════════ block ═══════════════ */

    (function setupVocAiModal() {
      var modal = document.getElementById("vocAiModal");
      var openBtn = document.getElementById("vocAiAnalyzeBtn");
      var lockedParentScroller = null;
      var lockedParentOverflow = "";
      var localOverflow = "";
      if (!modal || !openBtn) return;

      function currentPeriodText() {
        var year = document.getElementById("filterYear");
        var period = document.getElementById("filterPeriodValue");
        var yearText = year.options[year.selectedIndex] ? year.options[year.selectedIndex].text : "2026년";
        var periodText = period.options[period.selectedIndex] ? period.options[period.selectedIndex].text : "6월";
        return yearText + " " + periodText;
      }

      function positionModal() {
        var top = window.scrollY || 0;
        var height = window.innerHeight || 800;
        try {
          if (window.frameElement && window.parent) {
            var rect = window.frameElement.getBoundingClientRect();
            var visibleTop = Math.max(0, -rect.top);
            var visibleBottom = Math.min(rect.height, window.parent.innerHeight - rect.top);
            if (visibleBottom > visibleTop) {
              top = visibleTop;
              height = visibleBottom - visibleTop;
            }
          }
        } catch (_error) {}
        modal.style.top = Math.max(0, top + 12) + "px";
        modal.style.height = Math.max(280, height - 24) + "px";
      }

      function lockScroll() {
        localOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        try {
          if (!window.frameElement || !window.parent) return;
          var node = window.frameElement.parentElement;
          while (node && node !== window.parent.document.body) {
            var style = window.parent.getComputedStyle(node);
            if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
              lockedParentScroller = node;
              break;
            }
            node = node.parentElement;
          }
          if (!lockedParentScroller) lockedParentScroller = window.parent.document.documentElement;
          lockedParentOverflow = lockedParentScroller.style.overflow;
          lockedParentScroller.style.overflow = "hidden";
        } catch (_error) {
          lockedParentScroller = null;
        }
      }

      function unlockScroll() {
        document.documentElement.style.overflow = localOverflow;
        if (lockedParentScroller) {
          lockedParentScroller.style.overflow = lockedParentOverflow;
          lockedParentScroller = null;
        }
      }

      function openModal() {
        var periodText = currentPeriodText();
        document.getElementById("vocAiPeriodText").textContent = periodText + " VOC 분석";
        document.getElementById("vocAiSummaryPeriod").textContent = periodText + " VOC 요약";
        positionModal();
        lockScroll();
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
      }

      function closeModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        unlockScroll();
      }

      openBtn.addEventListener("click", openModal);
      document.getElementById("vocAiClose").addEventListener("click", closeModal);
      document.getElementById("vocAiBackdrop").addEventListener("click", closeModal);
      document.getElementById("vocAiCopy").addEventListener("click", function () {
        var button = this;
        var text = document.querySelector(".voc-ai-summary-text").innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
        button.textContent = "✓ 복사 완료";
        setTimeout(function () { button.textContent = "▣ 요약 복사"; }, 1400);
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("show")) closeModal();
      });
    })();
  

/* ═══════════════ block ═══════════════ */

    (function () {
      var TYPE_COLOR = { "좋아요": "#2a78d6", "불편": "#e24b4a", "문의": "#7f77dd", "요청": "#1baf7a", "복합": "#eda100", "미분류": "#9ca3af", "직원칭찬": "#d4a017" };
      var TYPE_BG = { "좋아요": "#DBEAFE", "불편": "#FEE2E2", "문의": "#EDE9FE", "요청": "#D1FAE5", "복합": "#FEF3C7", "미분류": "#F3F4F6", "직원칭찬": "#FEF3C7" };
      var TYPE_TO_SENTIMENT = { "좋아요": "긍정", "불편": "부정", "문의": "부정", "요청": "부정", "복합": "복합" };
      var MALE = "#2A66C7";
      var FEMALE = "#E0629A";

      var KW_TEMPLATE = {
        "좋아요": [["친절함", 110, "인적응대관련", 4.2], ["정갈함", 95, "환경관련", 2.8], ["세심함", 84, "진료 및 치료·검사관련", 1.6], ["의사 설명", 76, "진료 및 치료·검사관련", 3.4], ["시설 만족", 68, "서비스제공관련", -0.5]],
        "불편": [["대기시간", 90, "진료 및 치료·검사관련", 7.8], ["소음", 85, "환경관련", 4.6], ["응대 불친절", 60, "인적응대관련", 2.3]],
        "문의": [["검사 결과", 45, "진료 및 치료·검사관련", 1.9], ["퇴원 일정", 40, "서비스제공관련", -1.2], ["식단", 36, "서비스제공관련", 0.8]],
        "요청": [["대기시간 단축", 35, "시스템 및 서비스", 3.1], ["주차 공간", 30, "환경관련", 1.5], ["소음 개선", 20, "환경관련", -0.7]],
        "복합": [["대기 안내", 28, "시스템 및 서비스", 0.4], ["종합 의견", 22, "기타문의", -0.3], ["이용 편의", 18, "서비스제공관련", 0.6]],
      };
      var BASE_ANALYZABLE = 1100;
      var BASE_TYPE_PCT = { "좋아요": 0.365, "불편": 0.265, "문의": 0.160, "요청": 0.145, "복합": 0.065 };
      var GENDER_BIAS = {
        "전체": { "좋아요": 1.0, "불편": 1.0, "문의": 1.0, "요청": 1.0, "복합": 1.0, scale: 1.0 },
        "남": { "좋아요": 0.85, "불편": 1.18, "문의": 1.02, "요청": 1.05, "복합": 0.95, scale: 0.5 },
        "여": { "좋아요": 1.15, "불편": 0.82, "문의": 0.98, "요청": 0.95, "복합": 1.08, scale: 0.5 },
      };
      var ages = [
        { label: "20대 미만", total: 75, pct: 1, malePct: 48 },
        { label: "20대", total: 1181, pct: 13, malePct: 44 },
        { label: "30대", total: 1207, pct: 14, malePct: 49 },
        { label: "40대", total: 1351, pct: 15, malePct: 52 },
        { label: "50대", total: 1288, pct: 14, malePct: 51 },
        { label: "60대 이상", total: 3837, pct: 43, malePct: 51 },
      ];
      var maxTotal = Math.max.apply(null, ages.map(function (a) { return a.total; }));

      var ageListEl = document.getElementById("ageList");
      var ageHeaderEl = document.getElementById("ageHeader");
      var ageTotalEl = document.getElementById("ageTotal");
      var top5KeywordsEl = document.getElementById("top5Keywords");
      var trendLegendEl = document.getElementById("trendLegend");
      var trendTitleEl = document.getElementById("trendTitle");
      var trendChart = null;
      var selectedAge = "30대";
      var selectedGender = "전체";

      function fmt(n) { return Math.round(n).toLocaleString(); }

      function buildAgeList() {
        ageListEl.innerHTML = ages.map(function (a) {
          var isSel = a.label === selectedAge;
          var barPct = Math.round((a.total / maxTotal) * 100);
          var maleWidth = a.malePct;
          var femaleWidth = 100 - a.malePct;
          return (
            '<div class="voc-rag-age-row' + (isSel ? " active" : "") + '" data-age="' + a.label + '" title="' + a.label + " — 남 " + a.malePct + "% · 여 " + (100 - a.malePct) + '%">' +
            '<span class="age-lbl">' + a.label + "</span>" +
            '<span class="voc-rag-age-track">' +
            '<span class="voc-rag-age-track-inner" style="width:' + barPct + '%;">' +
            '<span class="male" style="width:' + maleWidth + '%;"></span>' +
            '<span class="female" style="width:' + femaleWidth + '%;"></span>' +
            "</span></span>" +
            '<span class="voc-rag-age-val">' + fmt(a.total) + "명 (" + a.pct + "%)</span>" +
            "</div>"
          );
        }).join("");
        ageListEl.querySelectorAll(".voc-rag-age-row").forEach(function (row) {
          row.addEventListener("click", function () {
            selectedAge = row.getAttribute("data-age");
            render();
          });
        });
      }

      function dataFor(age, gender) {
        var ageScale = age.total / 1207;
        var g = GENDER_BIAS[gender];
        var analyzable = Math.round(BASE_ANALYZABLE * ageScale * g.scale);
        var types = ["좋아요", "불편", "문의", "요청", "복합"].map(function (t) {
          var cnt = Math.round(BASE_ANALYZABLE * BASE_TYPE_PCT[t] * ageScale * g.scale * g[t]);
          var kws = KW_TEMPLATE[t].map(function (k) {
            return [k[0], Math.max(1, Math.round(k[1] * ageScale * g.scale * g[t])), k[2], k[3]];
          });
          return { type: t, sentiment: TYPE_TO_SENTIMENT[t], count: cnt, keywords: kws };
        });
        return { analyzable: analyzable, types: types };
      }

      function genTrendForType(base, seed) {
        var months = ["26-01", "26-02", "26-03", "26-04", "26-05", "26-06"];
        var n = months.length;
        var values = [];
        for (var i = 0; i < n; i++) {
          var isLast = i === n - 1;
          var v = isLast ? base : Math.round(base * (1 - 0.03 * (n - 1 - i) + 0.04 * Math.sin(seed * 1.5 + i)));
          values.push(Math.max(1, v));
        }
        return { months: months, values: values };
      }

      function render() {
        buildAgeList();
        var age = ages.filter(function (a) { return a.label === selectedAge; })[0];
        if (!age) return;
        var data = dataFor(age, selectedGender);

        ageHeaderEl.textContent = selectedAge + (selectedGender === "전체" ? "" : " · " + selectedGender) + " 응답자 기준";
        ageTotalEl.textContent = fmt(age.total * (selectedGender === "전체" ? 1 : 0.5)) + "명";

        var allKw = [];
        data.types.forEach(function (t) {
          t.keywords.forEach(function (k) {
            allKw.push({ name: k[0], count: k[1], type: t.type, sentiment: t.sentiment, category: k[2], change: k[3] });
          });
        });
        var respondentTotal = Math.round(age.total * (selectedGender === "전체" ? 1 : 0.5));
        function renderSentimentTable(sentiment, toneClass) {
          var rows = allKw.filter(function (k) { return k.sentiment === sentiment; })
            .sort(function (a, b) { return b.count - a.count; })
            .slice(0, 5);
          var rowsHtml = rows.map(function (k, i) {
            var ratio = respondentTotal ? (k.count / respondentTotal) * 100 : 0;
            var isUp = k.change > 0;
            var sign = k.change === 0 ? "－" : (isUp ? "▲" : "▼");
            var changeColor = k.change === 0 ? "var(--text-muted)" : (isUp ? "#b4392b" : "#185fa5");
            return (
              "<tr>" +
              '<td class="order">' + (i + 1) + "</td>" +
              '<td class="sentiment"><span class="voc-rag-pn-badge ' + toneClass + '">' + sentiment + "</span></td>" +
              '<td class="category" title="' + k.category + '">' + k.category + "</td>" +
              '<td class="keyword">' + k.name + "</td>" +
              '<td class="metric">' + fmt(k.count) + "건 (" + ratio.toFixed(1) + "%)</td>" +
              '<td class="change" style="color:' + changeColor + '">' + sign + Math.abs(k.change).toFixed(1) + "%</td>" +
              "</tr>"
            );
          }).join("");
          return (
            '<section class="voc-rag-pn-section">' +
            '<p class="voc-rag-pn-title ' + toneClass + '">' + sentiment + " TOP5</p>" +
            '<table class="voc-rag-pn-table"><thead><tr>' +
            '<th class="order">순서</th><th class="sentiment">' + sentiment + '</th><th class="category">카테고리</th>' +
            '<th>주요 키워드</th><th class="metric">건수 (비율)</th><th class="change">증감</th>' +
            "</tr></thead><tbody>" + rowsHtml + "</tbody></table></section>"
          );
        }
        top5KeywordsEl.innerHTML =
          '<div class="voc-rag-pn-grid">' +
          renderSentimentTable("긍정", "positive") +
          renderSentimentTable("부정", "negative") +
          "</div>";

      }

      render();
    })();
  

/* ═══════════════ block ═══════════════ */

    const tc = "#898781";
    const gc = "rgba(0,0,0,0.06)";
    const base = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: tc, font: { size: 11 } } },
        y: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 } } },
      },
    };
    const baseH = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gc }, ticks: { color: tc, font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { color: tc, font: { size: 11 } } },
      },
    };

    var WARD_ANALYSIS = [
      { name: "12병동", total: 16210, totalMoM: 5.6, like: 7555, bad: 4506, inq: 1621, req: 1264, mix: 1086, unc: 178, keyword: "간호사 응대" },
      { name: "3병동", total: 15322, totalMoM: 2.4, like: 7139, bad: 4260, inq: 1532, req: 1195, mix: 1027, unc: 169, keyword: "의사 설명" },
      { name: "내과 중환자실", total: 14622, totalMoM: -1.2, like: 6812, bad: 4065, inq: 1462, req: 1140, mix: 980, unc: 163, keyword: "환자 확인" },
      { name: "5병동", total: 14230, totalMoM: 0.9, like: 6628, bad: 3956, inq: 1423, req: 1110, mix: 953, unc: 160, keyword: "친절도" },
      { name: "7병동", total: 13680, totalMoM: -0.4, like: 6375, bad: 3803, inq: 1368, req: 1067, mix: 916, unc: 151, keyword: "병실 청결" },
    ];
    var WARD_SCORE_DATA = [
      { name: "12병동", count: 14946, positiveRate: 65.2, change: 3.1, negativeCount: 5196 },
      { name: "3병동", count: 14126, positiveRate: 64.0, change: 2.0, negativeCount: 5086 },
      { name: "내과 중환자실", count: 13479, positiveRate: 61.9, change: -0.5, negativeCount: 5133 },
      { name: "5병동", count: 13117, positiveRate: 60.9, change: 1.1, negativeCount: 5128 },
      { name: "7병동", count: 12613, positiveRate: 59.9, change: -1.2, negativeCount: 5054 },
    ];
    var DIM_SPLIT_TYPES = [
      { key: "like", label: "좋아요", color: "#2a78d6" },
      { key: "bad", label: "불편", color: "#e24b4a" },
      { key: "inq", label: "문의", color: "#7f77dd" },
      { key: "req", label: "요청", color: "#1baf7a" },
      { key: "mix", label: "복합", color: "#eda100" },
    ];
    var DEPT_ANALYSIS = [
      { name: "외과", total: 13900, totalMoM: 2.1, like: 6472, bad: 3864, inq: 1390, req: 1084, mix: 931, unc: 159, keyword: "진료 태도" },
      { name: "정형외과", total: 13271, totalMoM: 3.8, like: 9800, bad: 810, inq: 1100, req: 850, mix: 623, unc: 88, keyword: "검사 안내" },
      { name: "내과", total: 12770, totalMoM: -0.6, like: 5952, bad: 3550, inq: 1277, req: 996, mix: 855, unc: 140, keyword: "대기시간" },
      { name: "신경외과", total: 11980, totalMoM: 1.5, like: 5583, bad: 3330, inq: 1198, req: 934, mix: 803, unc: 132, keyword: "수술 설명" },
      { name: "재활의학과", total: 11240, totalMoM: -1.1, like: 5238, bad: 3125, inq: 1124, req: 877, mix: 753, unc: 123, keyword: "치료 안내" },
    ];
    var DIM_EXPAND_TYPE_COLOR = { "좋아요": "#2a78d6", "불편": "#e24b4a", "문의": "#7f77dd", "요청": "#1baf7a", "복합": "#eda100", "미분류": "#9ca3af", "직원칭찬": "#d4a017" };
    var DIM_EXPAND_TYPE_BG = { "좋아요": "#DBEAFE", "불편": "#FEE2E2", "문의": "#EDE9FE", "요청": "#D1FAE5", "복합": "#FEF3C7", "미분류": "#F3F4F6", "직원칭찬": "#FEF3C7" };
    var DIM_TYPE_KEY_MAP = { "좋아요": "like", "불편": "bad", "문의": "inq", "요청": "req", "복합": "mix" };
    var DIM_TREND_MODES = [
      { key: "emotion", label: "좋아요·불편·복합", types: ["좋아요", "불편", "복합"] },
      { key: "ask_req", label: "문의·요청", types: ["문의", "요청"] },
      { key: "all", label: "전체보기", types: ["좋아요", "불편", "문의", "요청", "복합"] },
    ];
    var WARD_KW_DATA = {
      "12병동": {
        positive: [["친절함", 142], ["의사 설명", 97], ["병실 청결", 71], ["세심함", 58], ["치료 결과", 49]],
        negative: [["대기시간", 118], ["회진 시간", 84], ["소음", 62], ["설명 부족", 47], ["응대 지연", 33]]
      },
      "3병동": {
        positive: [["간호사 응대", 136], ["친절함", 112], ["병실 청결", 88], ["의사 설명", 74], ["세심함", 61]],
        negative: [["대기시간", 109], ["소음", 79], ["회진 시간", 66], ["응대 지연", 51], ["설명 부족", 38]]
      },
      "내과 중환자실": {
        positive: [["간호사 응대", 128], ["친절함", 101], ["환자 확인", 85], ["세심함", 69], ["투약 안내", 54]],
        negative: [["응대 속도", 121], ["대기시간", 93], ["소음", 71], ["설명 부족", 55], ["회진 시간", 42]]
      },
      "5병동": {
        positive: [["친절도", 131], ["간호사 응대", 108], ["병실 청결", 82], ["의사 설명", 67], ["세심함", 53]],
        negative: [["대기시간", 102], ["소음", 76], ["면회 안내", 61], ["응대 지연", 48], ["설명 부족", 35]]
      },
      "7병동": {
        positive: [["병실 청결", 124], ["간호사 응대", 99], ["친절함", 81], ["의사 설명", 63], ["세심함", 50]],
        negative: [["소음", 97], ["대기시간", 83], ["식사 안내", 68], ["응대 지연", 52], ["시설 요청", 39]]
      },
    };
    var DEPT_KW_DATA = {
      "외과": [
        ["진료 태도", "좋아요", 2200], ["친절함", "좋아요", 1683], ["세심함", "좋아요", 1165],
        ["대기시간", "불편", 950], ["배려", "좋아요", 841],
      ],
      "정형외과": [
        ["검사 안내", "좋아요", 2600], ["친절함", "좋아요", 2150], ["세심함", "좋아요", 1780],
        ["배려", "좋아요", 1320], ["응대", "좋아요", 980],
      ],
      "내과": [
        ["대기시간", "불편", 1450], ["친절함", "좋아요", 1200], ["소음", "불편", 890],
        ["검사 결과", "문의", 760], ["응대 불친절", "불편", 610],
      ],
      "신경외과": [
        ["수술 설명", "문의", 1380], ["진료 태도", "좋아요", 1160], ["대기시간", "불편", 840],
        ["검사 안내", "문의", 690], ["예약 변경", "요청", 540],
      ],
      "재활의학과": [
        ["치료 안내", "좋아요", 1290], ["치료사 친절", "좋아요", 1080], ["대기시간", "불편", 760],
        ["운동 방법", "문의", 640], ["일정 변경", "요청", 490],
      ],
    };
    var DOCTOR_KW_DATA = {
      "정형외과 원장": [
        ["친절함", "좋아요", 95], ["세심함", "좋아요", 72], ["회진 설명", "좋아요", 58],
        ["대기시간", "불편", 42], ["검사 안내", "문의", 28],
      ],
      "내과 김의사": [
        ["회진 설명", "좋아요", 68], ["친절함", "좋아요", 55], ["설명력", "좋아요", 44],
        ["대기시간", "불편", 38], ["검사 결과", "문의", 22],
      ],
      "외과 박의사": [
        ["수술 설명", "좋아요", 62], ["진료 태도", "좋아요", 49], ["세심함", "좋아요", 36],
        ["대기시간", "불편", 31], ["회복 안내", "문의", 19],
      ],
      "신경외과 이의사": [
        ["검사 설명", "좋아요", 58], ["친절함", "좋아요", 45], ["수술 안내", "문의", 34],
        ["대기시간", "불편", 27], ["예약 요청", "요청", 16],
      ],
      "재활의학과 최의사": [
        ["치료 설명", "좋아요", 53], ["세심함", "좋아요", 41], ["운동 안내", "문의", 30],
        ["대기시간", "불편", 24], ["일정 요청", "요청", 14],
      ],
    };
    var dimExpandState = {
      ward: { openName: null, viewMode: "chart", trendMode: "emotion", barChart: null, trendChart: null },
      dept: { openName: null, viewMode: "chart", trendMode: "emotion", barChart: null, trendChart: null },
      doctor: { openName: null, viewMode: "chart", trendMode: "emotion", barChart: null, trendChart: null },
    };
    var DOCTOR_ANALYSIS = [
      { name: "정형외과 원장", total: 317, totalMoM: 4.2, like: 141, bad: 88, inq: 32, req: 25, mix: 21, unc: 10, keyword: "친절함" },
      { name: "내과 김의사", total: 240, totalMoM: -2.8, like: 107, bad: 67, inq: 24, req: 19, mix: 19, unc: 4, keyword: "회진 설명" },
      { name: "외과 박의사", total: 218, totalMoM: 1.7, like: 97, bad: 61, inq: 22, req: 17, mix: 14, unc: 7, keyword: "수술 설명" },
      { name: "신경외과 이의사", total: 196, totalMoM: 0.8, like: 87, bad: 55, inq: 20, req: 15, mix: 13, unc: 6, keyword: "검사 설명" },
      { name: "재활의학과 최의사", total: 174, totalMoM: -1.4, like: 78, bad: 49, inq: 17, req: 14, mix: 11, unc: 5, keyword: "치료 설명" },
    ];
    // 병동별 구조와 동일한 표/차트를 진료과·의사에도 쓰기 위한 파생 데이터
    function deriveScoreData(analysis) {
      return analysis.map(function (r) {
        var count = r.like + r.bad + r.inq + r.req + r.mix;
        var pos = (r.like + r.bad) ? Math.round((r.like / (r.like + r.bad)) * 1000) / 10 : 0;
        return { name: r.name, count: count, positiveRate: pos, change: r.totalMoM, negativeCount: r.bad };
      }).sort(function (a, b) { return b.count - a.count; });
    }
    var DEPT_SCORE_DATA = deriveScoreData(DEPT_ANALYSIS);
    var DOCTOR_SCORE_DATA = deriveScoreData(DOCTOR_ANALYSIS);

    function dimSplitAnalyzableTotal(row) {
      return row.like + row.bad + row.inq + row.req + row.mix;
    }

    function dimSplitPct(count, total) {
      if (!total) return "0.0";
      return ((count / total) * 100).toFixed(1);
    }

    function dimSplitChangeHtml(change) {
      var cls = change > 0 ? "up" : (change < 0 ? "down" : "flat");
      var sign = change > 0 ? "▲" : (change < 0 ? "▼" : "－");
      return '<div class="dim-split-change ' + cls + '">' + sign + " " + Math.abs(change).toFixed(1) + "%</div>";
    }

    function renderDimSplitLegend(legendElId) {
      document.getElementById(legendElId).innerHTML =
        '<span class="dim-split-legend-item"><span class="dim-split-legend-dot" style="background:#6366f1;"></span>접수 건수</span>';
    }

    function dimGenTrend(base, seed) {
      var months = ["26-01", "26-02", "26-03", "26-04", "26-05", "26-06"];
      var values = [];
      for (var i = 0; i < months.length; i++) {
        var isLast = i === months.length - 1;
        var v = isLast ? base : Math.round(base * (1 - 0.03 * (months.length - 1 - i) + 0.04 * Math.sin(seed * 1.5 + i)));
        values.push(Math.max(1, v));
      }
      return { months: months, values: values };
    }

    function dimPlainTypeCell(row, typeKey, typeMeta) {
      var analyzableTotal = dimSplitAnalyzableTotal(row);
      var count = row[typeKey];
      return (
        '<td class="col-type">' +
        '<div class="dim-split-type-pct" style="color:' + typeMeta.color + ';">' + dimSplitPct(count, analyzableTotal) + "%</div>" +
        '<div class="dim-split-type-cnt">(' + count.toLocaleString() + ")</div>" +
        "</td>"
      );
    }

    function renderDimExpandPanel(opts, state, row) {
      var panel = document.getElementById(opts.expandPanelId);
      var kwTitle = document.getElementById(opts.expandKwTitleId);
      var kwList = document.getElementById(opts.expandKwListId);
      var trendTitle = document.getElementById(opts.expandTrendTitleId);
      var modeTabs = document.getElementById(opts.trendModeTabsId);
      var trendLegend = document.getElementById(opts.trendLegendId);
      if (!panel || !row) return;
      var isWard = opts.viewKey === "ward";

      var keywords = opts.kwData[row.name] || [];
      var maxKw = 1;

      if (isWard) {
        var posList = (keywords && keywords.positive) ? keywords.positive : [];
        var negList = (keywords && keywords.negative) ? keywords.negative : [];
        function renderWardKwCard(title, list, color) {
          var max = Math.max.apply(null, list.map(function (k) { return k[1]; }).concat([1]));
          var total = list.reduce(function (sum, k) { return sum + k[1]; }, 0);
          return (
            '<div class="ward-kw-pn-card">' +
            '<div class="ward-kw-pn-head">' +
            '<span class="ward-kw-pn-title"><i class="ward-kw-pn-dot" style="background:' + color + ';"></i>' + title + "</span>" +
            '<span class="ward-kw-pn-total">' + total.toLocaleString() + "건</span>" +
            "</div>" +
            list.map(function (k, i) {
              var width = Math.round((k[1] / max) * 100);
              return (
                '<div class="ward-kw-pn-row">' +
                '<span class="ward-kw-pn-rank">' + (i + 1) + "</span>" +
                '<span class="ward-kw-pn-name" title="' + k[0] + '">' + k[0] + "</span>" +
                '<span class="ward-kw-pn-bar-track"><span class="ward-kw-pn-bar-fill" style="width:' + width + "%;background:" + color + ';"></span></span>' +
                '<span class="ward-kw-pn-count">' + k[1].toLocaleString() + "건</span>" +
                "</div>"
              );
            }).join("") +
            "</div>"
          );
        }
        kwTitle.style.display = "none";
        kwList.innerHTML =
          '<div class="ward-kw-pn-stack">' +
          renderWardKwCard("긍정 TOP5", posList, "#1baf7a") +
          renderWardKwCard("부정 TOP5", negList, "#e24b4a") +
          "</div>";
      } else {
        kwTitle.style.display = "";
        maxKw = keywords.length ? Math.max.apply(null, keywords.map(function (k) { return k[2]; })) : 1;
        kwTitle.innerHTML = row.name + ' 가장 많이 언급된 키워드 TOP5 <span class="muted">(유형 무관)</span>';
        kwList.innerHTML = keywords.map(function (k, i) {
          var pct = Math.round((k[2] / maxKw) * 100);
          return (
            '<div class="voc-rag-kw-row">' +
            '<span class="voc-rag-kw-rank">' + (i + 1) + "</span>" +
            '<span class="voc-rag-kw-name">' + k[0] + "</span>" +
            '<span class="voc-rag-kw-type" style="background:' + DIM_EXPAND_TYPE_BG[k[1]] + ";color:" + DIM_EXPAND_TYPE_COLOR[k[1]] + ';">' + k[1] + "</span>" +
            '<span class="voc-rag-kw-bar"><span class="voc-rag-kw-bar-fill" style="width:' + pct + "%;background:" + DIM_EXPAND_TYPE_COLOR[k[1]] + ';"></span></span>' +
            '<span class="voc-rag-kw-cnt">' + k[2].toLocaleString() + "건</span>" +
            "</div>"
          );
        }).join("");
      }

      var mode = isWard
        ? { types: ["긍정", "부정"] }
        : DIM_TREND_MODES.filter(function (m) { return m.key === state.trendMode; })[0] || DIM_TREND_MODES[0];
      trendTitle.innerHTML = (isWard ? "월별 추이" : "직전 6개월 추이") + ' <span class="muted">(' + mode.types.join(" · ") + ")</span>";

      modeTabs.innerHTML = isWard ? "" : DIM_TREND_MODES.map(function (m) {
        var isSel = m.key === state.trendMode;
        return (
          '<button type="button" class="voc-rag-trend-mode-tab' + (isSel ? " active" : "") + '" data-mode="' + m.key + '" role="tab" aria-selected="' + isSel + '">' + m.label + "</button>"
        );
      }).join("");
      modeTabs.querySelectorAll(".voc-rag-trend-mode-tab").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          state.trendMode = btn.getAttribute("data-mode");
          renderDimExpandPanel(opts, state, row);
        });
      });

      trendLegend.innerHTML = mode.types.map(function (t) {
        var color = t === "긍정" ? "#1baf7a" : (t === "부정" ? "#e24b4a" : DIM_EXPAND_TYPE_COLOR[t]);
        return '<span><i style="background:' + color + ';"></i>' + t + "</span>";
      }).join("");

      var seedBase = opts.rows.findIndex(function (d) { return d.name === row.name; }) + 1;
      var datasets = mode.types.map(function (tname, i) {
        var typeKey = DIM_TYPE_KEY_MAP[tname];
        var base = isWard
          ? (tname === "긍정" ? row.like : row.bad + row.inq + row.req + row.mix)
          : (row[typeKey] || 100);
        var color = tname === "긍정" ? "#1baf7a" : (tname === "부정" ? "#e24b4a" : DIM_EXPAND_TYPE_COLOR[tname]);
        var trend = dimGenTrend(base, seedBase + i * 5);
        return {
          label: tname,
          data: trend.values,
          borderColor: color,
          backgroundColor: isWard ? (tname === "긍정" ? "rgba(27,175,122,.12)" : "rgba(226,75,74,.12)") : color,
          fill: isWard,
          tension: 0.35,
          pointRadius: isWard ? 4 : 3,
          borderWidth: 2,
          months: trend.months,
        };
      });

      var ctx = document.getElementById(opts.trendChartId);
      if (ctx) {
        if (state.trendChart) state.trendChart.destroy();
        state.trendChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: datasets[0].months,
            datasets: datasets.map(function (d) {
              return {
                label: d.label,
                data: d.data,
                borderColor: d.borderColor,
                backgroundColor: d.backgroundColor,
                fill: d.fill,
                tension: d.tension,
                pointRadius: d.pointRadius,
                borderWidth: d.borderWidth,
              };
            }),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: "#898781", font: { size: 11 } }, grid: { display: false } },
              y: { beginAtZero: false, ticks: { color: "#898781", font: { size: 11 } }, grid: { color: "#e1e0d9" } },
            },
          },
        });
      }

      panel.classList.add("show");
    }

    function renderDimExpandSplitView(opts, state) {
      var rows = opts.rows.slice().sort(function (a, b) { return dimSplitAnalyzableTotal(b) - dimSplitAnalyzableTotal(a); });
      opts.rows = rows;
      var groupTotal = rows.reduce(function (sum, row) { return sum + dimSplitAnalyzableTotal(row); }, 0);

      document.getElementById(opts.countElId).textContent = "· 총 " + rows.length + "개";
      renderDimSplitLegend(opts.legendElId);

      function applyViewMode() {
        var chartView = document.getElementById(opts.chartViewId);
        var tableView = document.getElementById(opts.tableViewId);
        if (chartView) chartView.classList.toggle("active", state.viewMode === "chart");
        if (tableView) tableView.classList.toggle("active", state.viewMode === "table");
        document.querySelectorAll('[data-dim-view="' + opts.viewKey + '"]').forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-view") === state.viewMode);
          btn.setAttribute("aria-selected", btn.getAttribute("data-view") === state.viewMode);
          btn.onclick = function () {
            state.viewMode = btn.getAttribute("data-view");
            applyViewMode();
            if (state.viewMode === "chart" && state.barChart) state.barChart.resize();
          };
        });
      }
      applyViewMode();

      var panel = document.getElementById(opts.expandPanelId);
      if (panel && (!state.openName || !rows.some(function (r) { return r.name === state.openName; }))) {
        panel.classList.remove("show");
        state.openName = null;
      }

      document.getElementById(opts.bodyElId).innerHTML = rows.map(function (r, i) {
        var count = dimSplitAnalyzableTotal(r);
        var ratio = groupTotal ? (count / groupTotal) * 100 : 0;
        return (
          "<tr>" +
          "<td>" + (i + 1) + "</td>" +
          '<td><span class="group-score-name">' + r.name + '</span><div class="dim-split-kw">대표 키워드 · ' + r.keyword + "</div></td>" +
          '<td><span class="group-score-value">' + count.toLocaleString() + '</span><div class="dim-split-kw">' + ratio.toFixed(1) + "%</div></td>" +
          "<td>" + dimSplitChangeHtml(r.totalMoM) + "</td>" +
          "</tr>"
        );
      }).join("");

      if (state.barChart) state.barChart.destroy();
      state.barChart = new Chart(document.getElementById(opts.chartElId), {
        type: "bar",
        data: {
          labels: rows.map(function (r) { return r.name; }),
          datasets: [{
            label: "접수 건수",
            data: rows.map(function (r) { return dimSplitAnalyzableTotal(r); }),
            backgroundColor: "#6366f1",
            borderRadius: 6,
            maxBarThickness: 34,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  var row = rows[ctx.dataIndex];
                  var count = dimSplitAnalyzableTotal(row);
                  var ratio = groupTotal ? (count / groupTotal) * 100 : 0;
                  return " 접수: " + count.toLocaleString() + "건 (" + ratio.toFixed(1) + "%) · 전월 대비 " + (row.totalMoM > 0 ? "+" : "") + row.totalMoM.toFixed(1) + "%";
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#52514e", font: { size: 10 }, maxRotation: 0, minRotation: 0,
                callback: function (_value, index) {
                  var label = rows[index].name;
                  return label.length > 6 ? label.slice(0, 6) + "…" : label;
                },
              },
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              ticks: { color: "#898781", font: { size: 10 }, callback: function (value) { return value.toLocaleString(); } },
              grid: { color: "#e1e0d9" },
            },
          },
        },
      });
    }

    var WARD_EXPAND_OPTS = {
      rows: WARD_ANALYSIS,
      viewKey: "ward",
      chartViewId: "wardChartView",
      tableViewId: "wardTableView",
      countElId: "wardSplitCount",
      legendElId: "wardSplitLegend",
      bodyElId: "wardAnalysisBody",
      chartElId: "c5",
      expandPanelId: "wardExpandPanel",
      expandKwTitleId: "wardExpandKwTitle",
      expandKwListId: "wardExpandKwList",
      expandTrendTitleId: "wardExpandTrendTitle",
      trendModeTabsId: "wardTrendModeTabs",
      trendLegendId: "wardTrendLegend",
      trendChartId: "wardTrendChart",
      kwData: WARD_KW_DATA,
    };
    var DEPT_EXPAND_OPTS = {
      rows: DEPT_ANALYSIS,
      viewKey: "dept",
      chartViewId: "deptChartView",
      tableViewId: "deptTableView",
      countElId: "deptSplitCount",
      legendElId: "deptSplitLegend",
      bodyElId: "deptAnalysisBody",
      chartElId: "c6",
      expandPanelId: "deptExpandPanel",
      expandKwTitleId: "deptExpandKwTitle",
      expandKwListId: "deptExpandKwList",
      expandTrendTitleId: "deptExpandTrendTitle",
      trendModeTabsId: "deptTrendModeTabs",
      trendLegendId: "deptTrendLegend",
      trendChartId: "deptTrendChart",
      kwData: DEPT_KW_DATA,
    };
    var DOCTOR_EXPAND_OPTS = {
      rows: DOCTOR_ANALYSIS,
      viewKey: "doctor",
      chartViewId: "doctorChartView",
      tableViewId: "doctorTableView",
      countElId: "doctorSplitCount",
      legendElId: "doctorSplitLegend",
      bodyElId: "doctorAnalysisBody",
      chartElId: "c7",
      expandPanelId: "doctorExpandPanel",
      expandKwTitleId: "doctorExpandKwTitle",
      expandKwListId: "doctorExpandKwList",
      expandTrendTitleId: "doctorExpandTrendTitle",
      trendModeTabsId: "doctorTrendModeTabs",
      trendLegendId: "doctorTrendLegend",
      trendChartId: "doctorTrendChart",
      kwData: DOCTOR_KW_DATA,
    };

    renderDimExpandSplitView(WARD_EXPAND_OPTS, dimExpandState.ward);
    renderDimExpandSplitView(DEPT_EXPAND_OPTS, dimExpandState.dept);
    renderDimExpandSplitView(DOCTOR_EXPAND_OPTS, dimExpandState.doctor);

    function renderDimScoreLayout(cfg) {
      var countEl = document.getElementById(cfg.countElId);
      var summaryEl = document.getElementById(cfg.legendElId);
      var bodyEl = document.getElementById(cfg.bodyElId);
      var chartEl = document.getElementById(cfg.chartElId);
      if (!summaryEl || !bodyEl || !chartEl) return;
      var data = cfg.scoreData;
      if (countEl) countEl.textContent = cfg.countText;

      var rates = data.map(function (d) { return d.positiveRate; });
      var avg = rates.length ? rates.reduce(function (a, b) { return a + b; }, 0) / rates.length : 0;
      var best = data.slice().sort(function (a, b) { return b.positiveRate - a.positiveRate; })[0];
      var lowest = data.slice().sort(function (a, b) { return a.positiveRate - b.positiveRate; })[0];
      summaryEl.innerHTML =
        '<span class="ward-score-average">- - - 평균 <b>' + avg.toFixed(1) + '%</b></span>' +
        '<span class="ward-score-badge best">최고 <b>' + best.name + ' ' + best.positiveRate.toFixed(1) + '%</b></span>' +
        '<span class="ward-score-badge lowest">최저 <b>' + lowest.name + ' ' + lowest.positiveRate.toFixed(1) + '%</b></span>';

      bodyEl.innerHTML = data.map(function (row) {
        var isUp = row.change > 0;
        var changeColor = isUp ? "#B4392B" : "#185FA5";
        return (
          '<tr data-score-name="' + row.name + '" tabindex="0" style="cursor:pointer">' +
          "<td>" + row.name + "</td>" +
          "<td>" + row.count.toLocaleString() + "</td>" +
          '<td class="positive-rate">' + row.positiveRate.toFixed(1) + "%</td>" +
          '<td style="color:' + changeColor + ';">' + (isUp ? "+" : "") + row.change.toFixed(1) + "%p</td>" +
          '<td class="negative-count">' + row.negativeCount.toLocaleString() + "</td>" +
          "</tr>"
        );
      }).join("");

      bodyEl.querySelectorAll("tr[data-score-name]").forEach(function (rowEl) {
        function open() {
          var name = rowEl.getAttribute("data-score-name");
          if (typeof cfg.detailFn === "function") cfg.detailFn(name);
        }
        rowEl.addEventListener("click", open);
        rowEl.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
        });
      });

      if (cfg.state.barChart) cfg.state.barChart.destroy();
      cfg.state.barChart = new Chart(chartEl, {
        type: "bar",
        data: {
          labels: data.map(function (d) { return d.name; }),
          datasets: [{
            label: "긍정",
            data: data.map(function (d) { return d.positiveRate; }),
            backgroundColor: "#1baf7a",
            borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 },
            maxBarThickness: 42, stack: "sentiment"
          }, {
            label: "부정",
            data: data.map(function (d) { return Math.round((100 - d.positiveRate) * 10) / 10; }),
            backgroundColor: "#e24b4a",
            borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
            maxBarThickness: 42, stack: "sentiment"
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          onClick: function (_evt, elements) {
            if (!elements.length) return;
            var d = data[elements[0].index];
            if (d && typeof cfg.detailFn === "function") cfg.detailFn(d.name);
          },
          plugins: {
            legend: { display: true, position: "top", align: "end", labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 8, color: "#52514e", font: { size: 11 } } },
            tooltip: { callbacks: { label: function (ctx) { return " " + ctx.dataset.label + ": " + Number(ctx.parsed.y).toFixed(1) + "%"; } } }
          },
          scales: {
            x: { stacked: true, ticks: { color: "#898781", font: { size: 10 } }, grid: { display: false } },
            y: { stacked: true, min: 0, max: 100, ticks: { color: "#898781", callback: function (value) { return value + "%"; } }, grid: { color: "#e1e0d9" } }
          }
        }
      });
    }

    renderDimScoreLayout({
      scoreData: WARD_SCORE_DATA, countElId: "wardSplitCount", countText: "· 총 5개 병동",
      legendElId: "wardSplitLegend", bodyElId: "wardAnalysisBody", chartElId: "c5",
      state: dimExpandState.ward,
      detailFn: function (name) { if (typeof window.openWardVocDetail === "function") window.openWardVocDetail(name); }
    });
    renderDimScoreLayout({
      scoreData: DEPT_SCORE_DATA, countElId: "deptSplitCount", countText: "· 총 " + DEPT_SCORE_DATA.length + "개 진료과",
      legendElId: "deptSplitLegend", bodyElId: "deptAnalysisBody", chartElId: "c6",
      state: dimExpandState.dept,
      detailFn: function (name) { if (typeof window.openGroupVocDetail === "function") window.openGroupVocDetail("dept", name); }
    });
    renderDimScoreLayout({
      scoreData: DOCTOR_SCORE_DATA, countElId: "doctorSplitCount", countText: "· 총 " + DOCTOR_SCORE_DATA.length + "개",
      legendElId: "doctorSplitLegend", bodyElId: "doctorAnalysisBody", chartElId: "c7",
      state: dimExpandState.doctor,
      detailFn: function (name) { if (typeof window.openGroupVocDetail === "function") window.openGroupVocDetail("doctor", name); }
    });

    (function setupGroupDetailModal() {
      var modal = document.getElementById("groupDetailModal");
      if (!modal) return;
      var titleEl = document.getElementById("groupDetailTitle");
      var subEl = document.getElementById("groupDetailSub");
      var bodyEl = document.getElementById("groupDetailBody");
      var chartView = document.getElementById("groupDetailChartView");
      var tableView = document.getElementById("groupDetailTableView");
      var itemModal = document.getElementById("groupItemModal");
      var itemTitleEl = document.getElementById("groupItemTitle");
      var itemSubEl = document.getElementById("groupItemSub");
      var itemBodyEl = document.getElementById("groupItemBody");
      var itemPanel = null;
      var itemPanelHome = null;
      var detailChart = null;
      var currentKey = "ward";
      var currentSort = "countDesc";
      var currentView = "table";
      var itemOpenedDirectly = false;
      var lockedParentScroller = null;
      var lockedParentOverflow = "";
      var localOverflow = "";
      var configs = {
        ward: { label: "병동별", itemLabel: "병동", rows: WARD_ANALYSIS, state: dimExpandState.ward, opts: WARD_EXPAND_OPTS },
        dept: { label: "진료과별", itemLabel: "진료과", rows: DEPT_ANALYSIS, state: dimExpandState.dept, opts: DEPT_EXPAND_OPTS },
        doctor: { label: "의사별", itemLabel: "담당의사", rows: DOCTOR_ANALYSIS, state: dimExpandState.doctor, opts: DOCTOR_EXPAND_OPTS },
      };

      function sortedRows() {
        var rows = configs[currentKey].rows.slice();
        var sorters = {
          countDesc: function (a, b) { return dimSplitAnalyzableTotal(b) - dimSplitAnalyzableTotal(a); },
          countAsc: function (a, b) { return dimSplitAnalyzableTotal(a) - dimSplitAnalyzableTotal(b); },
          changeDesc: function (a, b) { return b.totalMoM - a.totalMoM; },
          changeAsc: function (a, b) { return a.totalMoM - b.totalMoM; },
        };
        return rows.sort(sorters[currentSort] || sorters.countDesc);
      }

      function monthChangeHtml(change) {
        var cls = change > 0 ? "up" : (change < 0 ? "down" : "flat");
        var sign = change > 0 ? "▲" : (change < 0 ? "▼" : "－");
        return '<span class="dim-split-change ' + cls + '">' + sign + " " + (change > 0 ? "+" : "") + change.toFixed(1) + "%</span>";
      }

      function openRowDetail(row, options) {
        var config = configs[currentKey];
        config.state.openName = row.name;
        var panel = document.getElementById(config.opts.expandPanelId);
        if (!panel || !itemModal || !itemBodyEl) return;
        var direct = !!(options && options.direct);
        itemOpenedDirectly = direct;
        itemPanel = panel;
        itemPanelHome = panel.parentElement;
        itemBodyEl.appendChild(panel);
        itemTitleEl.textContent = currentKey === "ward"
          ? row.name + " VOC 월별 추이"
          : config.label + " · " + row.name + " 상세 분석";
        if (itemSubEl) {
          itemSubEl.textContent = currentKey === "ward"
            ? "병동 기준 최근 6개월 긍정/부정 흐름입니다."
            : "유형별 대표 키워드 TOP5와 최근 6개월 추이";
        }
        renderDimExpandPanel(config.opts, config.state, row);
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        if (direct) {
          positionModalInVisibleArea();
          lockPageScroll();
          itemModal.style.top = modal.style.top;
          itemModal.style.height = modal.style.height;
        } else {
          itemModal.style.top = modal.style.top;
          itemModal.style.height = modal.style.height;
        }
        itemModal.classList.add("show");
        itemModal.setAttribute("aria-hidden", "false");
      }

      function openWardDetailByName(name) {
        currentKey = "ward";
        var row = WARD_ANALYSIS.find(function (r) { return r.name === name; });
        if (!row) return;
        openRowDetail(row, { direct: true });
      }

      function closeItemModal() {
        if (!itemModal || !itemModal.classList.contains("show")) return;
        itemModal.classList.remove("show");
        itemModal.setAttribute("aria-hidden", "true");
        if (itemPanel) {
          itemPanel.classList.remove("show");
          if (itemPanelHome) itemPanelHome.appendChild(itemPanel);
        }
        configs[currentKey].state.openName = null;
        itemPanel = null;
        itemPanelHome = null;
        if (itemOpenedDirectly) {
          itemOpenedDirectly = false;
          unlockPageScroll();
          return;
        }
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
      }

      window.openWardVocDetail = openWardDetailByName;
      window.openGroupVocDetail = function (key, name) { if (configs[key]) openModal(key); };

      function renderTable(rows) {
        var groupTotal = rows.reduce(function (sum, row) { return sum + dimSplitAnalyzableTotal(row); }, 0);
        bodyEl.innerHTML = rows.map(function (row, index) {
          var count = dimSplitAnalyzableTotal(row);
          var ratio = groupTotal ? (count / groupTotal) * 100 : 0;
          return (
            '<tr data-detail-name="' + row.name + '" tabindex="0">' +
            '<td><span class="group-detail-rank">' + (index + 1) + "</span></td>" +
            '<td><span class="group-score-name">' + row.name + '</span><div class="dim-split-kw">대표 키워드 · ' + row.keyword + "</div></td>" +
            '<td><span class="group-detail-score">' + count.toLocaleString() + '</span><div class="dim-split-kw">' + ratio.toFixed(1) + "%</div></td>" +
            "<td>" + monthChangeHtml(row.totalMoM) + "</td>" +
            '<td><span class="group-detail-response">' + row.keyword + "</span></td>" +
            '<td><button type="button" class="group-detail-open" data-detail-name="' + row.name + '" aria-label="' + row.name + ' 상세 열기">›</button></td>' +
            "</tr>"
          );
        }).join("");
        bodyEl.querySelectorAll("tr[data-detail-name]").forEach(function (tr) {
          function openSelectedRow() {
            var row = configs[currentKey].rows.find(function (r) { return r.name === tr.getAttribute("data-detail-name"); });
            if (row) openRowDetail(row);
          }
          tr.addEventListener("click", openSelectedRow);
          tr.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openSelectedRow();
            }
          });
        });
      }

      function renderChart(rows) {
        var ctx = document.getElementById("groupDetailChart");
        if (!ctx) return;
        var groupTotal = rows.reduce(function (sum, row) { return sum + dimSplitAnalyzableTotal(row); }, 0);
        if (detailChart) detailChart.destroy();
        detailChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: rows.map(function (r) { return r.name; }),
            datasets: [{
              label: "접수 건수",
              data: rows.map(function (r) { return dimSplitAnalyzableTotal(r); }),
              backgroundColor: "#6366f1",
              borderRadius: 7,
              maxBarThickness: 54,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: function (_evt, elements) {
              if (elements.length) openRowDetail(rows[elements[0].index]);
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (ctx) {
                    var count = dimSplitAnalyzableTotal(rows[ctx.dataIndex]);
                    var ratio = groupTotal ? (count / groupTotal) * 100 : 0;
                    return " 접수: " + count.toLocaleString() + "건 (" + ratio.toFixed(1) + "%)";
                  },
                },
              },
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: "#52514e", font: { size: 11 } } },
              y: { beginAtZero: true, ticks: { color: "#898781", callback: function (value) { return value.toLocaleString(); } }, grid: { color: "#e1e0d9" } },
            },
          },
        });
      }

      function applyDetailView(rows) {
        chartView.classList.toggle("active", currentView === "chart");
        tableView.classList.toggle("active", currentView === "table");
        document.querySelectorAll("[data-detail-view]").forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-detail-view") === currentView);
        });
        if (currentView === "chart") renderChart(rows);
      }

      function renderModal() {
        var config = configs[currentKey];
        var rows = sortedRows();
        titleEl.textContent = config.label + " VOC 현황 전체";
        subEl.textContent = "전체 " + rows.length + "개 " + config.itemLabel + "의 접수 건수(비율)와 전월 대비 현황을 확인합니다.";
        renderTable(rows);
        applyDetailView(rows);
      }

      function positionModalInVisibleArea() {
        var top = window.scrollY || 0;
        var height = window.innerHeight || 800;
        try {
          if (window.frameElement && window.parent) {
            var frameRect = window.frameElement.getBoundingClientRect();
            var parentHeight = window.parent.innerHeight;
            var visibleTop = Math.max(0, -frameRect.top);
            var visibleBottom = Math.min(frameRect.height, parentHeight - frameRect.top);
            if (visibleBottom > visibleTop) {
              top = visibleTop;
              height = visibleBottom - visibleTop;
            }
          }
        } catch (_error) {
          top = window.scrollY || 0;
          height = window.innerHeight || 800;
        }
        modal.style.top = Math.max(0, top + 12) + "px";
        modal.style.height = Math.max(280, height - 24) + "px";
      }

      function lockPageScroll() {
        localOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        try {
          if (!window.frameElement || !window.parent) return;
          var node = window.frameElement.parentElement;
          while (node && node !== window.parent.document.body) {
            var style = window.parent.getComputedStyle(node);
            if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
              lockedParentScroller = node;
              break;
            }
            node = node.parentElement;
          }
          if (!lockedParentScroller) lockedParentScroller = window.parent.document.documentElement;
          lockedParentOverflow = lockedParentScroller.style.overflow;
          lockedParentScroller.style.overflow = "hidden";
        } catch (_error) {
          lockedParentScroller = null;
        }
      }

      function unlockPageScroll() {
        document.documentElement.style.overflow = localOverflow;
        if (lockedParentScroller) {
          lockedParentScroller.style.overflow = lockedParentOverflow;
          lockedParentScroller = null;
        }
      }

      function openModal(key) {
        currentKey = key;
        currentSort = "countDesc";
        currentView = "table";
        positionModalInVisibleArea();
        lockPageScroll();
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.querySelectorAll(".group-detail-filter").forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-sort") === currentSort);
        });
        renderModal();
      }

      function closeModal() {
        if (itemModal && itemModal.classList.contains("show")) {
          itemModal.classList.remove("show");
          itemModal.setAttribute("aria-hidden", "true");
          if (itemPanel) {
            itemPanel.classList.remove("show");
            if (itemPanelHome) itemPanelHome.appendChild(itemPanel);
          }
          itemPanel = null;
          itemPanelHome = null;
        }
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        unlockPageScroll();
      }

      document.querySelectorAll("[data-group-detail]").forEach(function (btn) {
        btn.addEventListener("click", function () { openModal(btn.getAttribute("data-group-detail")); });
      });
      document.querySelectorAll(".group-detail-filter").forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentSort = btn.getAttribute("data-sort");
          document.querySelectorAll(".group-detail-filter").forEach(function (b) { b.classList.toggle("active", b === btn); });
          renderModal();
        });
      });
      document.querySelectorAll("[data-detail-view]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentView = btn.getAttribute("data-detail-view");
          applyDetailView(sortedRows());
        });
      });
      document.getElementById("groupDetailClose").addEventListener("click", closeModal);
      document.getElementById("groupDetailBackdrop").addEventListener("click", closeModal);
      document.getElementById("groupItemClose").addEventListener("click", closeItemModal);
      document.getElementById("groupItemBackdrop").addEventListener("click", closeItemModal);
      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        if (itemModal && itemModal.classList.contains("show")) closeItemModal();
        else if (modal.classList.contains("show")) closeModal();
      });
    })();

    var CHANNEL_ANALYSIS = [
      { name: "메디통 픽스(앱)", count: 3450, cls: "app", color: "#2a78d6", change: 2.4 },
      { name: "고객의견카드", count: 2166, cls: "card", color: "#1baf7a", change: -0.6 },
      { name: "직접 전화", count: 1289, cls: "phone", color: "#eda100", change: 1.1 },
      { name: "카카오톡·채널톡", count: 988, cls: "kakao", color: "#db2777", change: 0.8 },
      { name: "홈페이지", count: 626, cls: "web", color: "#7f77dd", change: -0.3 },
      { name: "현장 상담", count: 380, cls: "field", color: "#0891b2", change: -1.2 },
      { name: "기타", count: 166, cls: "etc", color: "#9ca3af", change: 0 },
    ];
    var CLASSIFY_SHARE = [
      {
        name: "좋아요", keyword: "친절함", count: 4110, change: 1.2, color: "#2a78d6",
        keywords: [["친절함", 612], ["의사 설명", 480], ["치료 결과", 355]],
        quotes: [
          ["의사 설명 부분이 특히 좋았습니다. 안내가 친절하고 이해하기 쉬웠어요.", "채널: 직접입력 · 성별: 여성 · 연령대: 40대 · 병동: 3병동 · 진료과: 정형외과 · 담당의사: 김OO · 일시: 2026.06.28 09:12"],
          ["치료 결과에 만족합니다. 설명도 자세해서 믿음이 갔어요.", "채널: 메디통 픽스(앱) · 성별: 남성 · 연령대: 50대 · 병동: 7병동 · 진료과: 내과 · 담당의사: 이OO · 일시: 2026.06.27 14:35"],
          ["진료 태도가 친절했고 설명도 명확했습니다.", "채널: 직접입력 · 성별: 여성 · 연령대: 30대 · 병동: 3병동 · 진료과: 신경과 · 담당의사: 박OO · 일시: 2026.06.26 11:08"],
          ["간호사분들이 바쁜 와중에도 친절하게 응대해 주셨습니다.", "채널: 고객의견카드 · 성별: 여성 · 연령대: 50대 · 병동: 5병동 · 진료과: 정형외과 · 담당의사: 최OO · 일시: 2026.06.16 16:42"],
          ["직원분들이 항상 밝게 인사해 주셔서 좋았습니다.", "채널: 직접입력 · 성별: 남성 · 연령대: 60대 이상 · 병동: 3병동 · 진료과: 내과 · 담당의사: 김OO · 일시: 2026.06.14 10:21"],
        ],
      },
      {
        name: "불편", keyword: "대기시간", count: 2569, change: -0.8, color: "#e24b4a",
        keywords: [["대기시간", 401], ["회진 시간", 288], ["치료 속도", 190]],
        quotes: [
          ["회진 및 대기 시간이 불규칙하여 하루 종일 기다려야 했습니다.", "채널: 직접 전화 · 성별: 여성 · 연령대: 60대 이상 · 병동: 3병동 · 진료과: 내과 · 담당의사: 김OO · 일시: 2026.06.28 15:10"],
          ["수술 당일 대기 시간이 공지된 것보다 훨씬 길었습니다.", "채널: 고객의견카드 · 성별: 남성 · 연령대: 50대 · 병동: 12병동 · 진료과: 외과 · 담당의사: 한OO · 일시: 2026.06.24 08:55"],
          ["회진 시간이 매번 달라서 예측하기 어렵습니다.", "채널: 홈페이지 · 성별: 여성 · 연령대: 40대 · 병동: 3병동 · 진료과: 신경과 · 담당의사: 박OO · 일시: 2026.06.18 18:03"],
          ["검사 결과에 대한 항목별 설명이 부족했습니다.", "채널: 직접입력 · 성별: 남성 · 연령대: 30대 · 병동: 5병동 · 진료과: 정형외과 · 담당의사: 최OO · 일시: 2026.06.12 13:47"],
          ["치료 진행이 예상보다 늦어 답답했습니다.", "채널: 직접입력 · 성별: 여성 · 연령대: 50대 · 병동: 5병동 · 진료과: 내과 · 담당의사: 이OO · 일시: 2026.06.11 10:32"],
        ],
      },
      {
        name: "문의", keyword: "의사 설명", count: 925, change: 0.4, color: "#7f77dd",
        keywords: [["퇴원 절차", 142], ["처방", 118], ["회진", 96]],
        quotes: [
          ["퇴원 절차가 어떻게 되는지 궁금합니다.", "채널: 직접입력 · 성별: 여성 · 연령대: 40대 · 병동: 5병동 · 진료과: 내과 · 담당의사: 이OO · 일시: 2026.06.24 09:40"],
          ["처방 관련해서 문의드립니다.", "채널: 메디통 픽스(앱) · 성별: 남성 · 연령대: 60대 이상 · 병동: 3병동 · 진료과: 내과 · 담당의사: 김OO · 일시: 2026.06.20 17:15"],
          ["회진 시간이 정해져 있는지 궁금합니다.", "채널: 직접입력 · 성별: 여성 · 연령대: 50대 · 병동: 12병동 · 진료과: 외과 · 담당의사: 한OO · 일시: 2026.06.15 12:08"],
          ["검사 결과는 언제 나오는지 궁금합니다.", "채널: 고객의견카드 · 성별: 남성 · 연령대: 30대 · 병동: 7병동 · 진료과: 신경과 · 담당의사: 박OO · 일시: 2026.06.10 11:25"],
          ["보험 서류는 어떻게 받는지 궁금합니다.", "채널: 직접입력 · 성별: 여성 · 연령대: 40대 · 병동: 5병동 · 진료과: 정형외과 · 담당의사: 최OO · 일시: 2026.06.07 14:50"],
        ],
      },
      {
        name: "요청", keyword: "시설 개선", count: 719, change: 0.6, color: "#1baf7a",
        keywords: [["시설 개선", 128], ["의료진 소통", 104], ["통증 관리", 89]],
        quotes: [
          ["의료진과 소통할 수 있는 시간을 늘려주세요.", "채널: 홈페이지 · 성별: 여성 · 연령대: 50대 · 병동: 5병동 · 진료과: 내과 · 담당의사: 이OO · 일시: 2026.06.22 16:18"],
          ["통증 관리를 좀 더 세심하게 챙겨주세요.", "채널: 직접입력 · 성별: 남성 · 연령대: 60대 이상 · 병동: 12병동 · 진료과: 외과 · 담당의사: 한OO · 일시: 2026.06.19 09:05"],
          ["치료 계획을 미리 자세히 알려주세요.", "채널: 메디통 픽스(앱) · 성별: 여성 · 연령대: 40대 · 병동: 3병동 · 진료과: 신경과 · 담당의사: 박OO · 일시: 2026.06.14 13:22"],
          ["편의시설이 좀 더 있었으면 좋겠습니다.", "채널: 홈페이지 · 성별: 남성 · 연령대: 30대 · 병동: 7병동 · 진료과: 정형외과 · 담당의사: 최OO · 일시: 2026.06.09 19:11"],
          ["회진 시 질문할 시간을 더 주세요.", "채널: 고객의견카드 · 성별: 여성 · 연령대: 50대 · 병동: 7병동 · 진료과: 내과 · 담당의사: 김OO · 일시: 2026.06.08 10:46"],
        ],
      },
      { name: "복합", keyword: "응대·대기", count: 616, change: -0.4, color: "#eda100" },
    ];

    function shareChangeHtml(change) {
      if (change == null || change === 0) {
        return '<span class="share-chg flat">－</span>';
      }
      var cls = change > 0 ? "up" : "down";
      var sign = change > 0 ? "▲" : "▼";
      return '<span class="share-chg ' + cls + '">' + sign + Math.abs(change).toFixed(1) + "%</span>";
    }

    function renderShareLegendItem(item, opts) {
      opts = opts || {};
      var showChange = opts.showChange !== false;
      var changeHtml = showChange && item.change != null ? shareChangeHtml(item.change) : "";
      return (
        '<div class="voc-classify-legend-item">' +
        '<span class="name"><i style="background:' + item.color + '"></i>' + item.name + "</span>" +
        '<div class="track"><div class="fill" style="width:' + item.pct + "%;background:" + item.color + '"></div></div>' +
        '<span class="cnt">' + item.count.toLocaleString() + "건</span>" +
        '<span class="pct"><span class="share-pct-wrap"><span class="share-pct">' + item.pct.toFixed(1) + "%</span>" + changeHtml + "</span></span>" +
        "</div>"
      );
    }

    var VOC_CATEGORY_TYPE_ROWS = [
      { name: "진료 및 치료·검사관련", count: 2410, positive: 1200, change: -1.2, positiveQuotes: ["의사 설명 부분이 특히 좋았습니다.", "검사 안내가 명확해서 편했습니다."], negativeQuotes: ["회진 시간이 일정하지 않았습니다.", "검사 결과 설명이 부족했습니다."] },
      { name: "인적응대관련", count: 1350, positive: 900, change: -0.9, positiveQuotes: ["간호사분들이 친절하게 응대해 주셨습니다.", "직원분들이 밝게 인사해 주셨습니다."], negativeQuotes: ["콜벨 응답이 늦었습니다.", "질문할 시간이 부족했습니다."] },
      { name: "서비스제공관련", count: 940, positive: 620, change: 0.4, positiveQuotes: ["식사 서비스가 정갈했습니다."], negativeQuotes: ["식단이 다양하지 않았습니다."] },
      { name: "시스템 및 서비스", count: 780, positive: 300, change: 2.1, positiveQuotes: ["예약 시스템이 편리했습니다."], negativeQuotes: ["앱 접수 절차가 복잡했습니다."] },
      { name: "환경관련", count: 705, positive: 400, change: 1.0, positiveQuotes: ["병실이 항상 깨끗했습니다."], negativeQuotes: ["복도 소음이 심했습니다."] },
      { name: "비용관련", count: 612, positive: 150, change: 0.6, positiveQuotes: ["수납 절차가 명확했습니다."], negativeQuotes: ["예상보다 비용 부담이 컸습니다."] },
      { name: "기타문의", count: 286, positive: 100, change: -0.2, positiveQuotes: ["전반적으로 만족스러웠습니다."], negativeQuotes: ["문의 답변이 늦었습니다."] },
      { name: "미분류", count: 180, positive: null, change: -5, positiveQuotes: [], negativeQuotes: [] }
    ];
    var vocCategoryOpen = null;

    function renderVocCategoryTypes() {
      var list = document.getElementById("vocTypeSummaryList");
      if (!list) return;
      var maxCount = Math.max.apply(null, VOC_CATEGORY_TYPE_ROWS.map(function (item) { return item.count; }));
      var rowsHtml = VOC_CATEGORY_TYPE_ROWS.map(function (item, index) {
        var isOpen = vocCategoryOpen === item.name;
        var isUp = item.change > 0;
        var changeColor = isUp ? "#b4392b" : "#185fa5";
        var sign = isUp ? "▲" : (item.change < 0 ? "▼" : "－");
        var changeText = item.name === "미분류" ? sign + Math.abs(item.change) + "건" : sign + Math.abs(item.change).toFixed(1) + "%p";
        var width = Math.round((item.count / maxCount) * 100);
        var barHtml;
        if (item.positive == null) {
          barHtml = '<div class="voc-type-sentiment-bar unclassified" style="width:' + width + '%"></div><div class="voc-type-sentiment-meta">감정 미확인</div>';
        } else {
          var positivePct = Math.round((item.positive / item.count) * 100);
          var negativePct = 100 - positivePct;
          barHtml = '<div class="voc-type-sentiment-bar" style="width:' + width + '%"><span class="positive" style="width:' + positivePct + '%"></span><span class="negative" style="width:' + negativePct + '%"></span></div>' +
            '<div class="voc-type-sentiment-meta">긍정 ' + positivePct + '% · 부정 ' + negativePct + '%<button type="button" class="voc-type-quotes-toggle" data-voc-category="' + item.name + '" aria-expanded="' + isOpen + '">' + (isOpen ? "원문 접기 ▲" : "원문 보기 ▾") + "</button></div>";
        }
        var html = '<tr><td class="rank">' + (index + 1) + '</td><td class="type">' + item.name + '</td><td>' + barHtml + '</td><td class="num">' + item.count.toLocaleString() + '</td><td class="num" style="color:' + changeColor + '">' + changeText + '</td></tr>';
        if (isOpen) {
          html += '<tr><td colspan="5" class="voc-type-quotes-cell"><div class="voc-type-quotes-grid"><div><p class="voc-type-quotes-heading positive">긍정 원문</p>' +
            item.positiveQuotes.map(function (q) { return '<div class="voc-type-quote">"' + q + '"</div>'; }).join("") +
            '</div><div><p class="voc-type-quotes-heading negative">부정 원문</p>' +
            item.negativeQuotes.map(function (q) { return '<div class="voc-type-quote">"' + q + '"</div>'; }).join("") +
            "</div></div></td></tr>";
        }
        return html;
      }).join("");
      list.innerHTML = '<table class="voc-type-table"><thead><tr><th class="rank">순위</th><th class="type">유형</th><th>비중 · 긍부정 비율</th><th class="num">건수</th><th class="num">증감</th></tr></thead><tbody>' + rowsHtml + "</tbody></table>";
      list.querySelectorAll("[data-voc-category]").forEach(function (button) {
        button.addEventListener("click", function () {
          var name = button.getAttribute("data-voc-category");
          vocCategoryOpen = vocCategoryOpen === name ? null : name;
          renderVocCategoryTypes();
        });
      });
    }

    renderVocCategoryTypes();

    var classifyTotal = CLASSIFY_SHARE.reduce(function (s, r) { return s + r.count; }, 0);
    var channelTotal = CHANNEL_ANALYSIS.reduce(function (s, r) { return s + r.count; }, 0);
    var unclassifiedTotal = 0;
    var staffPraiseTotal = 126;
    CLASSIFY_SHARE.forEach(function (r) {
      r.pct = (r.count / classifyTotal) * 100;
    });
    if (classifyTotal + unclassifiedTotal + staffPraiseTotal !== channelTotal) {
      console.warn("전체 VOC 구성 합계와 채널 합계가 일치하지 않습니다.", classifyTotal + unclassifiedTotal + staffPraiseTotal, channelTotal);
    }

    document.getElementById("vocClassifyLegend").innerHTML = CLASSIFY_SHARE.map(function (r) {
      return (
        '<div class="simple-pie-legend">' +
        '<i style="background:' + r.color + '"></i>' +
        "<span>" + r.name + "</span>" +
        "</div>"
      );
    }).join("");
    document.getElementById("vocClassifyBody").innerHTML = CLASSIFY_SHARE.map(function (r, i) {
      return (
        "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        '<td><span class="table-type-label"><i style="background:' + r.color + '"></i>' + r.name + "</span></td>" +
        '<td><span class="type-keyword" title="' + r.keyword + '">' + r.keyword + "</span></td>" +
        '<td class="num" style="font-weight:700;">' + r.count.toLocaleString() + "</td>" +
        '<td class="num"><span class="share-pct">' + r.pct.toFixed(1) + "%</span></td>" +
        '<td class="num">' + shareChangeHtml(r.change) + "</td>" +
        "</tr>"
      );
    }).join("");
    document.getElementById("vocClassifyFoot").innerHTML =
      "<tr>" +
      '<td colspan="3" style="font-weight:800;">합계</td>' +
      '<td class="num" style="font-weight:800;">' + classifyTotal.toLocaleString() + "</td>" +
      '<td class="num" colspan="2" style="font-weight:800;">100.0%</td>' +
      "</tr>";
    var vocKpiTotalEl = document.getElementById("vocKpiTotal");
    var vocKpiAnalyzableEl = document.getElementById("vocKpiAnalyzable");
    if (vocKpiTotalEl) vocKpiTotalEl.textContent = channelTotal.toLocaleString() + "건";
    if (vocKpiAnalyzableEl) vocKpiAnalyzableEl.textContent = classifyTotal.toLocaleString() + "건";
    document.getElementById("vocClassifyDonutTotal").textContent = classifyTotal.toLocaleString() + "건";

    var channelSorted = CHANNEL_ANALYSIS.slice().sort(function (a, b) { return b.count - a.count; });

    document.getElementById("vocChannelBody").innerHTML = channelSorted.map(function (r, i) {
      var pct = ((r.count / channelTotal) * 100).toFixed(1);
      return (
        "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        '<td><span class="voc-channel-badge ' + r.cls + '">' + r.name + "</span></td>" +
        '<td class="num" style="font-weight:700;">' + r.count.toLocaleString() + "</td>" +
        '<td class="num"><span class="share-pct">' + pct + "%</span></td>" +
        '<td class="num">' + shareChangeHtml(r.change) + "</td>" +
        "</tr>"
      );
    }).join("");

    document.getElementById("vocChannelFoot").innerHTML =
      "<tr>" +
      '<td colspan="2" style="font-weight:800;">합계</td>' +
      '<td class="num" style="font-weight:800;">' + channelTotal.toLocaleString() + "</td>" +
      '<td class="num" colspan="2" style="font-weight:800;">100.0%</td>' +
      "</tr>";

    var channelDonutTotalEl = document.getElementById("vocChannelDonutTotal");
    if (channelDonutTotalEl) channelDonutTotalEl.textContent = channelTotal.toLocaleString() + "건";

    document.getElementById("vocChannelLegend").innerHTML = channelSorted.map(function (r) {
      return (
        '<div class="simple-pie-legend">' +
        '<i style="background:' + r.color + '"></i>' +
        "<span>" + r.name + "</span>" +
        "</div>"
      );
    }).join("");

    new Chart(document.getElementById("vocChannelDonut"), {
      type: "doughnut",
      data: {
        labels: channelSorted.map(function (r) { return r.name; }),
        datasets: [{
          data: channelSorted.map(function (r) { return r.count; }),
          backgroundColor: channelSorted.map(function (r) { return r.color; }),
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var pct = ((ctx.parsed / channelTotal) * 100).toFixed(1);
                return " " + ctx.parsed.toLocaleString() + "건 (" + pct + "%)";
              },
            },
          },
        },
      },
    });

    var classifyColors = {
      like: "#2a78d6",
      bad: "#e24b4a",
      mix: "#eda100",
      inq: "#7f77dd",
      req: "#1baf7a",
      staff: "#d4a017",
      unc: "#9ca3af",
    };

    var catFootnoteEl = document.getElementById("catFootnote");
    if (catFootnoteEl) {
      catFootnoteEl.textContent =
        "카테고리·키워드 합계는 전체 VOC 건수와 별도로 집계되어 일치하지 않을 수 있습니다. VOC 1건에 언급된 키워드·문구가 여러 개면 각각 카운트되기 때문입니다. 매칭되지 않은 키워드·문구는 미태깅으로 분류되며, VOC 접수 목록에서 수동으로 분류할 수 있습니다.";
    }

    var ckExcelBtn = document.getElementById("ckExcelBtn");
    if (ckExcelBtn) {
      ckExcelBtn.addEventListener("click", function () {
        alert("카테고리·키워드 분석 엑셀 파일을 다운로드합니다. (Mock)");
      });
    }

    var CK_PURPLE = "#534AB7";
    var CK_PURPLE_LIGHT = ["#CECBF6", "#AFA9EC", "#DAD8FA", "#EEEDFE", "#C2BEEF", "#B8B3ED", "#E0DEF9"];
    var CK_TYPE_COLOR = { "좋아요": "#2a78d6", "불편": "#e24b4a", "문의": "#7f77dd", "요청": "#1baf7a", "복합": "#eda100", "미분류": "#9ca3af", "직원칭찬": "#d4a017" };
    var CK_TYPE_BG = { "좋아요": "#DBEAFE", "불편": "#FEE2E2", "문의": "#EDE9FE", "요청": "#D1FAE5", "복합": "#FEF3C7", "미분류": "#F3F4F6", "직원칭찬": "#FEF3C7" };

    /* kw: 유형별 TOP5. 각 항목 [키워드명, 건수, 전월대비 증감%] */
    var CK_CATEGORIES = [
      { name: "진료/치료", count: 2339, share: 25.8, change: "-",
        kw: {
          "좋아요": [["치료 결과", 97, 2.1], ["회복 경과", 61, 1.4], ["진료 신뢰", 44, 0.8], ["설명 이해도", 33, 0.5], ["수술 만족", 27, 1.9]],
          "불편": [["대기시간", 110, -5.2], ["진료 태도", 74, -3.6], ["진료 지연", 52, -2.9], ["소통 부족", 38, -1.1], ["재진 안내", 24, -0.7]],
          "문의": [["의사 설명", 132, 8.4], ["검사 안내", 89, 4.0], ["처방 문의", 58, 2.6], ["진료 일정", 41, 1.3], ["결과 확인", 30, 0.9]],
          "요청": [["진료과 변경", 36, 3.0], ["재진 예약", 28, 1.7], ["소견서 발급", 22, 1.0], ["진료 시간 조정", 18, 0.6], ["담당의 지정", 14, 0.4]]
        } },
      { name: "간호/원무", count: 1940, share: 21.4, change: "-",
        kw: {
          "좋아요": [["간호사 응대", 101, 3.3], ["처치 친절", 58, 1.6], ["회진 설명", 42, 1.0], ["콜벨 응답", 31, 0.7], ["원무 안내", 25, 0.5]],
          "불편": [["응답 속도", 68, -2.8], ["콜벨 지연", 45, -2.0], ["교대 인수인계", 27, -0.9], ["대기 안내 부족", 21, -0.6], ["소음", 17, -0.4]],
          "문의": [["접수 절차", 84, 1.9], ["입퇴원 안내", 53, 1.1], ["보험 서류", 37, 0.8], ["면회 규정", 29, 0.5], ["병실 배정", 22, 0.3]],
          "요청": [["수납", 52, 6.0], ["예약 변경", 47, 2.4], ["병실 이동", 33, 1.5], ["보호자 등록", 26, 0.9], ["진단서 발급", 19, 0.5]]
        } },
      { name: "시설/환경", count: 1686, share: 18.6, change: "▲2",
        kw: {
          "좋아요": [["병실 청결", 88, 1.2], ["편의시설 만족", 39, 0.9], ["채광·환기", 26, 0.4], ["소음 관리", 18, 0.2], ["휴게공간", 14, 0.1]],
          "불편": [["주차", 71, -6.0], ["화장실 청결", 63, -4.1], ["실내 온도", 41, -1.8], ["엘리베이터 대기", 29, -1.0], ["안내표지 부족", 20, -0.6]],
          "문의": [["시설 환경", 58, 0.8], ["편의시설 위치", 34, 0.5], ["주차 요금", 25, 0.3], ["와이파이", 19, 0.2], ["매점 운영시간", 12, 0.1]],
          "요청": [["편의시설", 44, 3.5], ["주차공간 확대", 30, 1.6], ["휴게실 개선", 21, 0.9], ["냉난방 조정", 16, 0.5], ["안내표지 보완", 11, 0.3]]
        } },
      { name: "직원서비스", count: 1287, share: 14.2, change: "-",
        kw: {
          "좋아요": [["친절도", 118, 5.0], ["응대 태도", 49, 0.6], ["배려", 38, 1.0], ["세심한 안내", 27, 0.6], ["신속 응대", 21, 0.4]],
          "불편": [["의사소통", 55, -1.5], ["불친절 응대", 31, -0.9], ["설명 불충분", 24, -0.6], ["호출 무응답", 17, -0.4], ["태도 불량", 12, -0.3]],
          "문의": [["설명", 66, 2.2], ["담당자 확인", 35, 0.9], ["절차 안내", 24, 0.5], ["연락처 문의", 16, 0.3], ["교육 자료", 10, 0.1]],
          "요청": [["재교육 요청", 20, 1.1], ["담당자 배정", 15, 0.7], ["응대 개선", 12, 0.5], ["안내문 보완", 9, 0.3], ["피드백 반영", 7, 0.2]]
        } },
      { name: "기타", count: 888, share: 9.8, change: "-",
        kw: {
          "좋아요": [["병원 추천", 42, 2.9], ["재방문 의사", 35, 1.1], ["브랜드 신뢰", 24, 0.3], ["전반적 만족", 18, 0.5], ["직원 전반 친절", 13, 0.2]],
          "불편": [["절차 복잡", 22, -1.0], ["안내 미흡", 16, -0.6], ["비용 부담", 12, -0.4], ["소통 채널 부족", 8, -0.2], ["대기 전반", 6, -0.1]],
          "문의": [["병원 이미지", 28, -0.5], ["운영 정책 문의", 17, 0.3], ["행사·프로그램", 11, 0.2], ["기타 문의", 7, 0.1], ["연계 서비스", 5, 0.1]],
          "요청": [["시스템 이용", 31, 4.2], ["앱 기능 요청", 19, 1.2], ["안내 채널 확대", 13, 0.6], ["설문 개선", 9, 0.3], ["기타 건의", 6, 0.2]]
        } },
      { name: "안전사고", count: 671, share: 7.4, change: "-",
        kw: {
          "좋아요": [["신속 조치", 12, 0.5], ["안전 관리 신뢰", 8, 0.2], ["예방 안내 만족", 5, 0.1], ["직원 대응력", 4, 0.1], ["재발 방지 설명", 3, 0.1]],
          "불편": [["낙상", 19, -1.0], ["투약 오류", 14, -2.3], ["대응 지연", 9, -0.6], ["안전장치 미흡", 6, -0.3], ["보호자 미통지", 4, -0.2]],
          "문의": [["환자 확인", 11, 0.4], ["의료기기 안전", 9, 0.1], ["사고 경위 확인", 6, 0.2], ["보상 절차 문의", 4, 0.1], ["재발 방지 문의", 3, 0.1]],
          "요청": [["억제대 관리", 7, 0.6], ["안전바 설치 요청", 5, 0.3], ["야간 순회 강화", 4, 0.2], ["낙상 예방 교육", 3, 0.1], ["보호자 상주 요청", 2, 0.1]]
        } },
      { name: "감염관리", count: 435, share: 4.8, change: "-",
        kw: {
          "좋아요": [["위생관리 신뢰", 7, 0.2], ["방역 안내 만족", 5, 0.1], ["소독 관리", 4, 0.1], ["마스크 착용 안내", 3, 0.1], ["손 위생 캠페인", 2, 0.1]],
          "불편": [["위생관리", 13, -0.8], ["격리 절차 불편", 8, -0.4], ["방문 제한 불만", 6, -0.3], ["소독 냄새", 4, -0.2], ["안내 미흡", 3, -0.1]],
          "문의": [["격리 조치", 8, 0.2], ["감염 의심 증상 대응", 6, 0.1], ["면회 제한 문의", 5, 0.1], ["소독 주기 문의", 3, 0.1], ["백신 접종 안내", 2, 0.1]],
          "요청": [["손 위생", 10, 0.5], ["방역 수칙 안내", 5, 0.3], ["소독 강화 요청", 4, 0.2], ["안내문 부착 요청", 3, 0.1], ["보호구 비치 요청", 2, 0.1]]
        } },
    ];

    var CK_OVERALL_KW = {
      "좋아요": [["친절도", 118, 5.0], ["간호사 응대", 101, 3.3], ["치료 결과", 97, 2.1], ["병실 청결", 88, 1.2], ["병원 추천", 42, 2.9]],
      "불편": [["대기시간", 110, -5.2], ["주차", 71, -6.0], ["진료 태도", 74, -3.6], ["화장실 청결", 63, -4.1], ["응답 속도", 68, -2.8]],
      "문의": [["의사 설명", 132, 8.4], ["검사 안내", 89, 4.0], ["접수 절차", 84, 1.9], ["설명", 66, 2.2], ["시설 환경", 58, 0.8]],
      "요청": [["수납", 52, 6.0], ["예약 변경", 47, 2.4], ["편의시설", 44, 3.5], ["시스템 이용", 31, 4.2], ["병실 이동", 33, 1.5]]
    };

    var ckSelected = "1위 진료/치료";
    var ckOpenKey = null;
    var ckDonutChart = null;
    var ckTrendChart = null;

    function ckFmt1(n) { return (Math.round(n * 10) / 10).toFixed(1); }

    function ckIsSelected(catName) {
      return ckSelected === "전체" ? false : ckSelected.indexOf(catName) > -1;
    }

    function ckCurrentKeywords() {
      if (ckSelected === "전체") return CK_OVERALL_KW;
      var cat = CK_CATEGORIES.filter(function (c) { return ckSelected.indexOf(c.name) > -1; })[0];
      return cat ? cat.kw : CK_OVERALL_KW;
    }

    function ckGenTrend(base, seed) {
      var months = ["26-01", "26-02", "26-03", "26-04", "26-05", "26-06"];
      var rows = [];
      for (var i = 0; i < months.length; i++) {
        var isLast = i === months.length - 1;
        var v = isLast ? base : Math.round(base * (1 - 0.04 * (months.length - 1 - i) + 0.05 * Math.sin(seed * 1.6 + i)));
        rows.push({ month: months[i], value: Math.max(1, v) });
      }
      for (var j = 1; j < rows.length; j++) {
        rows[j].change = ((rows[j].value - rows[j - 1].value) / rows[j - 1].value * 100);
      }
      rows[0].change = null;
      return rows;
    }

    function ckRenderShareTable() {
      document.getElementById("ckCatShareBody").innerHTML = CK_CATEGORIES.map(function (c, i) {
        var isSel = ckIsSelected(c.name);
        var changeCls = c.change.indexOf("▲") > -1 ? "ck-change-up" : "ck-change-flat";
        return (
          '<tr class="ck-cat-row' + (isSel ? " active" : "") + '" data-cat="' + (i + 1) + '위 ' + c.name + '">' +
          '<td style="font-weight:500;">' + (i + 1) + "</td>" +
          '<td class="name">' + c.name + "</td>" +
          '<td class="col-count">' + c.count.toLocaleString() + "건</td>" +
          '<td class="col-pct">' + ckFmt1(c.share) + "%</td>" +
          '<td class="col-change ' + changeCls + '">' + c.change + "</td>" +
          "</tr>"
        );
      }).join("");
    }

    function ckBindTableRows() {
      document.querySelectorAll("#ckCatShareBody .ck-cat-row").forEach(function (row) {
        row.addEventListener("click", function () {
          ckSelected = row.getAttribute("data-cat");
          ckOpenKey = null;
          ckRenderAll();
        });
      });
    }

    function ckRenderChips() {
      var chips = [{ key: "전체", label: "전체" }].concat(
        CK_CATEGORIES.map(function (c, i) { return { key: (i + 1) + "위 " + c.name, label: (i + 1) + "위 " + c.name }; })
      );
      document.getElementById("ckCatChips").innerHTML = chips.map(function (chip) {
        var active = ckSelected === chip.key;
        return '<button type="button" class="ck-chip' + (active ? " active" : "") + '" data-cat="' + chip.key + '">' + chip.label + "</button>";
      }).join("");

      document.querySelectorAll("#ckCatChips .ck-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          ckSelected = btn.getAttribute("data-cat");
          ckOpenKey = null;
          ckRenderAll();
        });
      });
    }

    function ckRenderDonut() {
      var ctx = document.getElementById("ckCatDonut");
      if (!ctx) return;
      var labels = CK_CATEGORIES.map(function (c) { return c.name; });
      var values = CK_CATEGORIES.map(function (c) { return c.share; });
      var colors = CK_CATEGORIES.map(function (c, i) {
        return ckIsSelected(c.name) ? CK_PURPLE : CK_PURPLE_LIGHT[i % CK_PURPLE_LIGHT.length];
      });
      if (ckDonutChart) ckDonutChart.destroy();
      ckDonutChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [{ data: values, backgroundColor: colors, borderColor: "#fcfcfb", borderWidth: 2 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "62%",
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  var category = CK_CATEGORIES[ctx.dataIndex];
                  return ctx.label + ": " + category.count.toLocaleString() + "건 (" + ckFmt1(ctx.parsed) + "%)";
                },
              },
            },
          },
        },
      });
    }

    var CK_TYPE_ORDER = ["좋아요", "불편", "문의", "요청"];

    function ckRenderTrendBlock(container, name, cnt, seed) {
      var trend = ckGenTrend(cnt, seed);
      var detail = document.createElement("div");
      detail.className = "ck-kw-trend";
      detail.innerHTML =
        '<p class="ck-kw-trend-title">' + name + " 6개월 추이</p>" +
        '<div class="ck-kw-trend-inner">' +
        '<div class="ck-kw-trend-chart"><canvas id="ckKwTrendChart"></canvas></div>' +
        '<table class="ck-kw-trend-tbl">' +
        "<thead><tr><td>월</td><td class=\"cnt-cell\">건수</td></tr></thead><tbody>" +
        trend.map(function (t, ti) {
          var isSel = ti === trend.length - 1;
          var pctStr = t.change === null ? "" :
            ' <span style="color:' + (t.change > 0 ? "#B4392B" : "#185FA5") + ';">(' +
            (t.change > 0 ? "+" : "") + t.change.toFixed(1) + "%)</span>";
          return (
            '<tr class="' + (isSel ? "sel" : "") + '">' +
            '<td style="font-weight:' + (isSel ? "600" : "400") + ';">' + t.month + "</td>" +
            '<td class="cnt-cell">' + t.value + "건" + pctStr + "</td>" +
            "</tr>"
          );
        }).join("") +
        "</tbody></table></div>";
      container.appendChild(detail);

      setTimeout(function () {
        var trendCtx = document.getElementById("ckKwTrendChart");
        if (!trendCtx) return;
        if (ckTrendChart) ckTrendChart.destroy();
        ckTrendChart = new Chart(trendCtx, {
          type: "line",
          data: {
            labels: trend.map(function (t) { return t.month; }),
            datasets: [{
              data: trend.map(function (t) { return t.value; }),
              borderColor: CK_PURPLE,
              backgroundColor: CK_PURPLE,
              tension: 0.3,
              pointRadius: 3,
              borderWidth: 2,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: "#898781", font: { size: 10 }, maxRotation: 45 }, grid: { display: false } },
              y: { beginAtZero: false, ticks: { color: "#898781", font: { size: 11 } }, grid: { color: "#e1e0d9" } },
            },
          },
        });
      }, 0);
    }

    function ckRenderKeywords() {
      var grouped = ckCurrentKeywords();
      var titleEl = document.getElementById("ckKwPanelTitle");
      var gridEl = document.getElementById("ckKwGrid");
      if (!titleEl || !gridEl) return;

      titleEl.textContent = (ckSelected === "전체" ? "전체" : ckSelected.replace(/^\d+위 /, "")) + " 유형별 키워드 TOP5";
      gridEl.innerHTML = "";

      CK_TYPE_ORDER.forEach(function (type) {
        var list = grouped[type] || [];
        var maxCnt = Math.max.apply(null, list.map(function (k) { return k[1]; }).concat([1]));
        var totalCnt = list.reduce(function (s, k) { return s + k[1]; }, 0);

        var card = document.createElement("div");
        card.className = "ck-kw-card";
        card.innerHTML =
          '<div class="ck-kw-card-head">' +
          '<span class="ck-kw-card-title"><span class="ck-kw-card-badge" style="background:' + CK_TYPE_COLOR[type] + ';"></span>' + type + " TOP5</span>" +
          '<span class="ck-kw-card-total">' + totalCnt.toLocaleString() + "건</span>" +
          "</div>";
        var bodyEl = document.createElement("div");
        card.appendChild(bodyEl);
        gridEl.appendChild(card);

        list.forEach(function (kw, idx) {
          var name = kw[0], cnt = kw[1], change = kw[2];
          var pct = Math.round((cnt / maxCnt) * 100);
          var isUp = change > 0, isFlat = change === 0;
          var changeColor = isFlat ? "var(--text-muted)" : (isUp ? "#B4392B" : "#185FA5");
          var sign = isFlat ? "－" : (isUp ? "▲" : "▼");
          var openKey = type + "::" + name;
          var isOpen = ckOpenKey === openKey;

          var block = document.createElement("div");
          block.className = "ck-kw-block";
          block.innerHTML =
            '<div class="ck-kw-row">' +
            '<span class="ck-kw-rank">' + (idx + 1) + "</span>" +
            '<span class="ck-kw-name">' + name + "</span>" +
            '<span class="ck-kw-bar-wrap"><span class="ck-kw-bar" style="width:' + pct + "%;background:" + CK_TYPE_COLOR[type] + ';"></span></span>' +
            '<span class="ck-kw-cnt">' + cnt + "건</span>" +
            '<span class="ck-kw-change" style="color:' + changeColor + ';">' + sign + " " + Math.abs(change).toFixed(1) + "%</span>" +
            '<span class="ck-kw-toggle">' + (isOpen ? "▲" : "▾") + "</span>" +
            "</div>";

          block.addEventListener("click", function () {
            ckOpenKey = isOpen ? null : openKey;
            ckRenderKeywords();
          });
          bodyEl.appendChild(block);

          if (isOpen) ckRenderTrendBlock(bodyEl, name, cnt, idx + 1);
        });

        var listLink = document.createElement("div");
        listLink.className = "ck-kw-list-link";
        listLink.innerHTML = 'VOC 접수 목록에서 &quot;' + type + '&quot; 보기 <i class="ti ti-external-link" aria-hidden="true"></i>';
        listLink.addEventListener("click", function () {
          alert("VOC 접수 목록 화면으로 이동하여 '" + type + "' 유형으로 필터가 적용됩니다. (목업 동작)");
        });
        bodyEl.appendChild(listLink);
      });
    }

    function ckRenderAll() {
      ckRenderChips();
      ckRenderShareTable();
      ckRenderDonut();
      ckRenderKeywords();
      ckBindTableRows();
    }

    ckRenderAll();

    var CK_REALIGNED_CATEGORIES = [
      {
        name: "진료 및 치료·검사관련", count: 2410, share: 29.0, positiveTotal: 1200, negativeTotal: 1210,
        positive: [["의사 설명", 164], ["치료 결과", 144], ["진료 태도", 124], ["검사 안내", 105], ["진료 과정 설명", 85]],
        negative: [["치료 속도", 129], ["전문성", 113], ["상담 시간", 98], ["수술 설명", 82], ["검사 결과 설명", 67]]
      },
      {
        name: "인적응대관련", count: 1350, share: 16.2, positiveTotal: 812, negativeTotal: 538,
        positive: [["직원 친절", 151], ["간호사 응대", 136], ["배려", 112], ["설명력", 94], ["공감", 78]],
        negative: [["응대 태도", 96], ["소통 부족", 82], ["호출 응답", 69], ["경청 부족", 55], ["보호자 응대", 43]]
      },
      {
        name: "서비스제공관련", count: 940, share: 11.3, positiveTotal: 541, negativeTotal: 399,
        positive: [["식사 만족", 108], ["침구 상태", 92], ["배식 서비스", 76], ["환의 상태", 61], ["린넨 교체", 48]],
        negative: [["식사 품질", 87], ["배식 시간", 71], ["침구 교체", 58], ["환의 부족", 46], ["세탁 상태", 35]]
      },
      {
        name: "시스템 및 서비스", count: 780, share: 9.4, positiveTotal: 436, negativeTotal: 344,
        positive: [["앱 사용성", 91], ["알림 서비스", 78], ["정보 제공", 65], ["모바일 서비스", 54], ["홈페이지", 42]],
        negative: [["시스템 오류", 84], ["앱 로그인", 69], ["알림 부족", 57], ["정보 부족", 44], ["기능 불편", 36]]
      },
      {
        name: "환경관련", count: 705, share: 8.5, positiveTotal: 402, negativeTotal: 303,
        positive: [["병실 청결", 96], ["시설 환경", 81], ["편의시설", 67], ["병실 온도", 51], ["휴게공간", 39]],
        negative: [["주차", 75], ["화장실 청결", 63], ["소음", 52], ["냉난방", 41], ["엘리베이터", 32]]
      },
      {
        name: "비용관련", count: 612, share: 7.4, positiveTotal: 318, negativeTotal: 294,
        positive: [["보험 안내", 72], ["진료비 설명", 61], ["청구 정확성", 54], ["비급여 안내", 43], ["환불 처리", 35]],
        negative: [["진료비 부담", 68], ["비급여 설명", 59], ["청구 오류", 48], ["보험 처리", 39], ["환불 지연", 31]]
      },
      {
        name: "기타문의", count: 286, share: 3.4, positiveTotal: 157, negativeTotal: 129,
        positive: [["병원 추천", 41], ["재방문 의사", 35], ["병원 이미지", 29], ["전반적 만족", 24], ["정보 제공", 18]],
        negative: [["기타 문의", 34], ["이용 불편", 29], ["개선 요청", 24], ["정책 문의", 19], ["오류 신고", 15]]
      }
    ];
    var ckRealignedSelected = CK_REALIGNED_CATEGORIES[0].name;

    function ckRealignedRowsHtml(list, color) {
      var max = Math.max.apply(null, list.map(function (row) { return row[1]; }).concat([1]));
      return list.map(function (row, index) {
        var width = Math.round((row[1] / max) * 100);
        return (
          '<div class="ck-realigned-keyword-row">' +
          '<span class="rank">' + (index + 1) + "</span>" +
          '<span class="name" title="' + row[0] + '">' + row[0] + "</span>" +
          '<span class="bar-track"><span class="bar-fill" style="width:' + width + "%;background:" + color + ';"></span></span>' +
          '<span class="count">' + row[1].toLocaleString() + "건</span>" +
          "</div>"
        );
      }).join("");
    }

    function ckRealignedOverall(sentiment) {
      var merged = [];
      CK_REALIGNED_CATEGORIES.forEach(function (category) {
        category[sentiment].forEach(function (row) { merged.push(row); });
      });
      return merged.sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5);
    }

    function ckRealignedRenderDonut() {
      var ctx = document.getElementById("ckCatDonut");
      if (!ctx) return;
      var palette = ["#534AB7", "#7F77DD", "#9B94E8", "#B8B3ED", "#CECBF6", "#AFA9EC", "#DAD8FA"];
      var colors = CK_REALIGNED_CATEGORIES.map(function (category, index) {
        if (ckRealignedSelected === "전체") return palette[index];
        return category.name === ckRealignedSelected ? "#534AB7" : "#E5E2F8";
      });
      if (ckDonutChart) ckDonutChart.destroy();
      ckDonutChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: CK_REALIGNED_CATEGORIES.map(function (category) { return category.name; }),
          datasets: [{
            data: CK_REALIGNED_CATEGORIES.map(function (category) { return category.count; }),
            backgroundColor: colors,
            borderColor: "#ffffff",
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "64%",
          plugins: { legend: { display: false } }
        }
      });
    }

    function ckRealignedRender() {
      var selected = CK_REALIGNED_CATEGORIES.filter(function (category) {
        return category.name === ckRealignedSelected;
      })[0] || null;
      var chips = [{ name: "전체", label: "전체" }].concat(
        CK_REALIGNED_CATEGORIES.map(function (category, index) {
          return { name: category.name, label: (index + 1) + "위 " + category.name };
        })
      );

      document.getElementById("ckCatChips").innerHTML = chips.map(function (chip) {
        var active = ckRealignedSelected === chip.name;
        return '<button type="button" class="ck-chip' + (active ? " active" : "") + '" data-real-cat="' + chip.name + '" role="tab" aria-selected="' + active + '">' + chip.label + "</button>";
      }).join("");

      document.getElementById("ckCatShareBody").innerHTML = CK_REALIGNED_CATEGORIES.map(function (category, index) {
        var active = ckRealignedSelected === category.name;
        return (
          '<tr class="' + (active ? "active" : "") + '" data-real-cat="' + category.name + '">' +
          '<td class="rank">' + (index + 1) + "</td>" +
          '<td class="category">' + category.name + "</td>" +
          '<td class="metric">' + category.count.toLocaleString() + "건</td>" +
          '<td class="metric">' + category.share.toFixed(1) + "%</td>" +
          "</tr>"
        );
      }).join("");

      ckRealignedRenderDonut();

      var positive = selected ? selected.positive : ckRealignedOverall("positive");
      var negative = selected ? selected.negative : ckRealignedOverall("negative");
      var positiveTotal = selected
        ? selected.positiveTotal
        : CK_REALIGNED_CATEGORIES.reduce(function (sum, category) { return sum + category.positiveTotal; }, 0);
      var negativeTotal = selected
        ? selected.negativeTotal
        : CK_REALIGNED_CATEGORIES.reduce(function (sum, category) { return sum + category.negativeTotal; }, 0);
      var title = selected ? selected.name : "전체";

      document.getElementById("ckKwPanelTitle").textContent = title + " 긍부정 키워드 TOP5";
      document.getElementById("ckKwGrid").innerHTML =
        '<div class="ck-sentiment-card">' +
          '<div class="ck-sentiment-card-head">' +
            '<span class="ck-sentiment-card-title"><i class="ck-sentiment-dot" style="background:#1baf7a"></i>긍정 TOP5</span>' +
            '<span class="ck-sentiment-total">' + positiveTotal.toLocaleString() + "건</span>" +
          "</div>" +
          ckRealignedRowsHtml(positive, "#1baf7a") +
        "</div>" +
        '<div class="ck-sentiment-card">' +
          '<div class="ck-sentiment-card-head">' +
            '<span class="ck-sentiment-card-title"><i class="ck-sentiment-dot" style="background:#e24b4a"></i>부정 TOP5</span>' +
            '<span class="ck-sentiment-total">' + negativeTotal.toLocaleString() + "건</span>" +
          "</div>" +
          ckRealignedRowsHtml(negative, "#e24b4a") +
        "</div>";

      document.querySelectorAll("[data-real-cat]").forEach(function (element) {
        element.addEventListener("click", function () {
          ckRealignedSelected = element.getAttribute("data-real-cat");
          ckRealignedRender();
        });
      });
    }

    ckRealignedRender();

    new Chart(document.getElementById("vocClassifyDonut"), {
      type: "doughnut",
      data: {
        labels: CLASSIFY_SHARE.map(function (c) { return c.name; }),
        datasets: [{
          data: CLASSIFY_SHARE.map(function (c) { return c.count; }),
          backgroundColor: CLASSIFY_SHARE.map(function (c) { return c.color; }),
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: { legend: { display: false } },
      },
    });

    var ratioMonths = ["1월", "2월", "3월", "4월", "5월", "6월"];
    var ratioTotal = [14967, 14845, 15169, 15234, 14901, 15156];
    var ratioPositive = [52, 51, 53, 50, 55, 52];
    var ratioNegative = ratioPositive.map(function (value) { return 100 - value; });

    var vocTrendLineOnTop = {
      id: "vocTrendLineOnTop",
      afterDatasetsDraw: function (chart) {
        var lineIndex = chart.data.datasets.findIndex(function (d) { return d.type === "line"; });
        if (lineIndex < 0) return;
        var meta = chart.getDatasetMeta(lineIndex);
        if (meta.hidden || !meta.controller) return;
        meta.controller.draw();
      },
    };

    new Chart(document.getElementById("vocClassifyTrend"), {
      data: {
        labels: ratioMonths,
        datasets: [
          {
            type: "line",
            label: "접수 건수",
            data: ratioTotal,
            borderColor: "#1f3864",
            backgroundColor: "#1f3864",
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 6,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#1f3864",
            pointBorderWidth: 2,
            tension: 0.25,
            yAxisID: "yCount",
            order: 100,
            clip: false,
          },
          { type: "bar", label: "긍정", data: ratioPositive, backgroundColor: "#1baf7a", stack: "ratio", borderRadius: 0, yAxisID: "y", order: 0 },
          { type: "bar", label: "부정", data: ratioNegative, backgroundColor: "#e24b4a", stack: "ratio", borderRadius: { topLeft: 3, topRight: 3 }, yAxisID: "y", order: 0 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        datasets: {
          bar: { order: 0 },
          line: { order: 100 },
        },
        elements: {
          line: { borderWidth: 2.5 },
          point: { radius: 5, hoverRadius: 6 },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            itemSort: function (a, b) {
              if (a.dataset.type === "line") return -1;
              if (b.dataset.type === "line") return 1;
              return 0;
            },
            callbacks: {
              label: function (ctx) {
                if (ctx.dataset.type === "line") {
                  return " " + ctx.dataset.label + ": " + ctx.parsed.y.toLocaleString() + "건";
                }
                return " " + ctx.dataset.label + ": " + ctx.parsed.y.toFixed(1) + "%";
              },
            },
          },
        },
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { color: tc, font: { size: 11 } } },
          y: {
            stacked: true,
            position: "left",
            min: 0,
            max: 100,
            grid: { color: gc },
            ticks: {
              color: tc,
              font: { size: 11 },
              stepSize: 20,
              callback: function (v) { return v + "%"; },
            },
          },
          yCount: {
            position: "right",
            min: 14700,
            max: 15400,
            grid: { drawOnChartArea: false },
            ticks: {
              color: "#1f3864",
              font: { size: 11, weight: "600" },
              callback: function (v) { return v.toLocaleString(); },
            },
          },
        },
      },
      plugins: [vocTrendLineOnTop],
    });

    var monthTopData = [
      { label: "1월", positive: [["진료 및 치료·검사관련", 2200], ["인적응대관련", 1500], ["서비스제공관련", 690]], negative: [["진료 및 치료·검사관련", 2010], ["인적응대관련", 880], ["환경관련", 610]] },
      { label: "2월", positive: [["진료 및 치료·검사관련", 2180], ["인적응대관련", 1460], ["서비스제공관련", 670]], negative: [["진료 및 치료·검사관련", 2000], ["인적응대관련", 830], ["시스템 및 서비스", 590]] },
      { label: "3월", positive: [["진료 및 치료·검사관련", 2290], ["인적응대관련", 1580], ["서비스제공관련", 740]], negative: [["진료 및 치료·검사관련", 2050], ["인적응대관련", 830], ["환경관련", 620]] },
      { label: "4월", positive: [["진료 및 치료·검사관련", 2310], ["인적응대관련", 1600], ["서비스제공관련", 760]], negative: [["진료 및 치료·검사관련", 2080], ["인적응대관련", 870], ["환경관련", 640]] },
      { label: "5월", positive: [["진료 및 치료·검사관련", 2240], ["인적응대관련", 1540], ["서비스제공관련", 710]], negative: [["진료 및 치료·검사관련", 2020], ["인적응대관련", 840], ["비용관련", 580]] },
      { label: "6월", positive: [["진료 및 치료·검사관련", 2360], ["인적응대관련", 1610], ["서비스제공관련", 780]], negative: [["진료 및 치료·검사관련", 2040], ["인적응대관련", 840], ["환경관련", 650]] }
    ];
    var monthTopEl = document.getElementById("vocMonthTopCards");
    if (monthTopEl) {
      monthTopEl.innerHTML = monthTopData.map(function (month) {
        function rows(items) {
          return items.map(function (item) {
            return '<div class="voc-month-top-row"><span class="cat" title="' + item[0] + '">' + item[0] + '</span><span class="cnt">' + item[1].toLocaleString() + "</span></div>";
          }).join("");
        }
        return '<div class="voc-month-top-card"><p class="voc-month-top-title">' + month.label + '</p><div class="voc-month-top-section"><p class="voc-month-top-section-title positive">긍정 TOP3</p>' + rows(month.positive) + '</div><div class="voc-month-top-section"><p class="voc-month-top-section-title negative">불편 TOP3</p>' + rows(month.negative) + "</div></div>";
      }).join("");
    }

    var staffPraiseChartEl = document.getElementById("c8");
    if (staffPraiseChartEl) new Chart(staffPraiseChartEl, {
      type: "doughnut",
      data: {
        labels: ["3층 병동", "원무과", "5층 병동", "간호팀"],
        datasets: [{ data: [66, 30, 23, 7], backgroundColor: ["#2a78d6", "#1baf7a", "#eda100", "#4a3aa7"], borderWidth: 2, borderColor: "#fff" }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              padding: 12,
              color: "#4b5563",
              font: { size: 11 },
              generateLabels: function (chart) {
                var labels = chart.data.labels;
                var dataset = chart.data.datasets[0];
                return labels.map(function (label, index) {
                  return {
                    text: label + "  " + dataset.data[index].toLocaleString() + "건",
                    fillStyle: dataset.backgroundColor[index],
                    strokeStyle: dataset.backgroundColor[index],
                    lineWidth: 0,
                    hidden: false,
                    index: index,
                  };
                });
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return " " + ctx.label + ": " + ctx.parsed.toLocaleString() + "건";
              },
            },
          },
        },
      },
    });
  