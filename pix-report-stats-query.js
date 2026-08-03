(function initPixReportStatsQuery(global) {
  if (global.PixReportStatsQuery) return;

  var MONTHS_6 = ["1월", "2월", "3월", "4월", "5월", "6월"];

  var SURVEY = {
    domainTrends: {
      "의사": {
        label: "의사 영역",
        months: MONTHS_6,
        scores: [82.1, 81.8, 81.5, 81.3, 81.0, 80.4]
      },
      "간호사": {
        label: "간호사 영역",
        months: MONTHS_6,
        scores: [84.2, 84.5, 84.8, 85.0, 85.2, 85.6]
      },
      "정서적 지지": {
        label: "정서적 지지",
        months: MONTHS_6,
        scores: [76.2, 75.9, 75.6, 75.4, 75.5, 74.2]
      },
      "환자권리보장": {
        label: "환자권리보장",
        months: MONTHS_6,
        scores: [78.5, 78.2, 77.9, 77.6, 78.0, 76.9]
      },
      "투약": {
        label: "투약 및 치료과정",
        months: MONTHS_6,
        scores: [83.0, 83.2, 83.5, 83.8, 84.0, 84.1]
      },
      "안전": {
        label: "환자 안전과 병원 환경",
        months: MONTHS_6,
        scores: [84.0, 84.5, 84.8, 85.0, 85.0, 85.1]
      },
      "전반": {
        label: "전반적 평가 · 타인 추천 의향",
        months: MONTHS_6,
        scores: [81.0, 81.2, 81.4, 81.5, 81.4, 81.8]
      }
    },
    areaCompare: [
      { name: "의사 영역 (Ⅱ)", current: 80.4, prior: 81.0, delta: -0.6 },
      { name: "정서적 지지 (Ⅳ)", current: 74.2, prior: 75.5, delta: -1.3 },
      { name: "환자권리보장 (Ⅵ)", current: 76.9, prior: 78.0, delta: -1.1 },
      { name: "전반적 평가 · 타인 추천 (Ⅶ)", current: 81.8, prior: 81.4, delta: 0.4 }
    ],
    deptScores: [
      { name: "재활의학과", val: 87.1, delta: 2.1 },
      { name: "내과", val: 84.2, delta: 1.2 },
      { name: "신경과", val: 81.0, delta: 0.5 },
      { name: "정형외과", val: 79.5, delta: -0.8 },
      { name: "한방과", val: 76.4, delta: -1.4 },
      { name: "호흡기내과", val: 74.6, delta: -0.9 }
    ],
    doctorScores: [
      { name: "한우진 교수", dept: "재활의학과", val: 88.2, delta: 2.0 },
      { name: "김민수 교수", dept: "내과", val: 86.4, delta: 1.4 },
      { name: "이정훈 교수", dept: "정형외과", val: 82.1, delta: 0.6 },
      { name: "장서윤 교수", dept: "호흡기내과", val: 79.5, delta: -0.7 },
      { name: "박도현 교수", dept: "신경과", val: 74.8, delta: -1.8 }
    ],
    nurseScores: [
      { name: "박나호 간호사", ward: "7A", val: 87.5, delta: 1.6 },
      { name: "김연주 간호사", ward: "8B", val: 84.3, delta: 0.9 },
      { name: "최서연 간호사", ward: "5병동", val: 81.8, delta: 0.3 },
      { name: "오지민 간호사", ward: "6병동", val: 78.6, delta: -0.5 },
      { name: "한지우 간호사", ward: "ICU", val: 73.9, delta: -2.1 }
    ]
  };

  var VOC = {
    monthlyTrend: [
      { m: "1월", pos: 7549, neg: 6969 },
      { m: "2월", pos: 11520, neg: 2880 },
      { m: "3월", pos: 7799, neg: 6915 },
      { m: "4월", pos: 7389, neg: 7388 },
      { m: "5월", pos: 7950, neg: 6504 },
      { m: "6월", pos: 7645, neg: 7056 }
    ],
    typeRows: [
      { type: "진료 및 치료·검사관련", cnt: 2410, pct: 29.0, change: -1.2 },
      { type: "인적응대관련", cnt: 1350, pct: 16.2, change: -0.9 },
      { type: "서비스제공관련", cnt: 940, pct: 11.3, change: 0.4 },
      { type: "시스템 및 서비스", cnt: 780, pct: 9.4, change: 2.1 },
      { type: "환경관련", cnt: 705, pct: 8.5, change: 1.0 },
      { type: "비용관련", cnt: 612, pct: 7.4, change: 0.6 },
      { type: "기타문의", cnt: 286, pct: 3.4, change: -0.2 }
    ],
    channels: [
      { name: "메디통 픽스(앱)", cnt: 3450, pct: 38.1, color: "#378ADD" },
      { name: "고객의견카드", cnt: 2165, pct: 23.9, color: "#0C447C" },
      { name: "전화", cnt: 1420, pct: 15.7, color: "#5a8fbf" },
      { name: "방문", cnt: 980, pct: 10.8, color: "#7a9fc4" },
      { name: "기타", cnt: 1050, pct: 11.5, color: "#a8b8cc" }
    ],
    wards: [
      { name: "3병동", negRate: 36.0, change: -2.0 },
      { name: "12병동", negRate: 34.8, change: -3.1 },
      { name: "5병동", negRate: 39.1, change: -1.1 },
      { name: "7병동", negRate: 40.1, change: 1.2 }
    ],
    depts: [
      { name: "정형외과", negCnt: 810, change: -3.8 },
      { name: "신경외과", negCnt: 3330, change: -1.5 },
      { name: "외과", negCnt: 3864, change: -2.1 },
      { name: "재활의학과", negCnt: 3125, change: 1.1 }
    ],
    doctors: [
      { name: "정형외과 원장", dept: "정형외과", negCnt: 88, change: -4.2 },
      { name: "외과 박의사", dept: "외과", negCnt: 61, change: -1.7 },
      { name: "신경외과 이의사", dept: "신경외과", negCnt: 55, change: -0.8 },
      { name: "재활의학과 최의사", dept: "재활의학과", negCnt: 49, change: 1.4 },
      { name: "내과 김의사", dept: "내과", negCnt: 67, change: 2.8 }
    ]
  };

  var DOMAIN_KEYS = [
    { key: "의사", words: ["의사영역", "의사 영역", "의사", "doctor"] },
    { key: "간호사", words: ["간호사영역", "간호사 영역", "간호사", "간호"] },
    { key: "정서적 지지", words: ["정서적지지", "정서적 지지", "정서"] },
    { key: "환자권리보장", words: ["환자권리", "환자권리보장", "권리보장"] },
    { key: "투약", words: ["투약", "치료과정", "투약 및 치료"] },
    { key: "안전", words: ["환자안전", "병원환경", "안전과 병원"] },
    { key: "전반", words: ["전반적", "타인추천", "추천의향", "전반"] }
  ];

  function detectReportKind() {
    var titleEl = document.querySelector(".doc-title");
    var t = titleEl ? titleEl.textContent : "";
    if (/VOC/i.test(t)) return "voc";
    return "survey";
  }

  function normalizeQuery(q) {
    return String(q || "").replace(/\s+/g, " ").trim();
  }

  function normKey(q) {
    return normalizeQuery(q).toLowerCase().replace(/\s/g, "");
  }

  function includesAny(text, words) {
    var n = normKey(text);
    for (var i = 0; i < words.length; i++) {
      if (n.indexOf(normKey(words[i])) >= 0) return true;
    }
    return false;
  }

  function wantsTrend(q) {
    return /6개월|월별|추이|트렌드|변화|흐름/.test(q);
  }

  function wantsTable(q) {
    return /표|table|목록|현황/.test(q) && !/차트|그래프|막대/.test(q);
  }

  function wantsChart(q) {
    return /차트|그래프|막대|추이|트렌드|6개월|월별/.test(q);
  }

  function findDomainKey(q) {
    for (var i = 0; i < DOMAIN_KEYS.length; i++) {
      if (includesAny(q, DOMAIN_KEYS[i].words)) return DOMAIN_KEYS[i].key;
    }
    return null;
  }

  function fmtDelta(n, unit) {
    unit = unit || "점";
    var cls = n >= 0 ? "tag-good" : "tag-bad";
    var sign = n >= 0 ? "▲" : "▼";
    return '<span class="' + cls + '">' + sign + Math.abs(n).toFixed(1) + unit + "</span>";
  }

  function barRow(name, val, maxVal, color) {
    var pct = maxVal ? (val / maxVal * 100).toFixed(1) : val;
    return '<div class="bar-row">' +
      '<div class="bar-name">' + name + "</div>" +
      '<div class="bar-track"><div class="bar-fill" style="width:' + pct + "%;background:" + color + '"></div></div>' +
      '<div class="bar-val">' + (typeof val === "number" && val <= 100 ? val.toFixed(1) + "점" : val) + "</div>" +
    "</div>";
  }

  function buildTrendChartBlock(title, rows, cap, maxVal) {
    maxVal = maxVal || 100;
    var block = document.createElement("div");
    block.className = "chart-block";
    block.setAttribute("data-rpt-user-added", "1");
    block.setAttribute("data-rpt-from-stats", "1");
    var bars = rows.map(function (r) {
      var color = r.color || "#0C447C";
      return barRow(r.name, r.val, maxVal, color);
    }).join("");
    block.innerHTML =
      '<p class="chart-title">' + title + "</p>" +
      '<div class="rpt-custom-bars">' + bars + "</div>" +
      '<p class="cap" style="margin-top:8px">' + (cap || "※ 통계 화면 목업 데이터 기준") + "</p>";
    return block;
  }

  function buildTrendTable(title, headers, bodyRows, cap) {
    var table = document.createElement("table");
    table.className = "report-table";
    table.setAttribute("data-rpt-user-added", "1");
    table.setAttribute("data-rpt-from-stats", "1");
    var head = "<tr>" + headers.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr>";
    var body = bodyRows.map(function (row) {
      return "<tr>" + row.map(function (cell, i) {
        var cls = i === 0 ? ' class="rowlabel"' : "";
        return "<td" + cls + ">" + cell + "</td>";
      }).join("") + "</tr>";
    }).join("");
    table.innerHTML = head + body;
    var capEl = document.createElement("p");
    capEl.className = "cap";
    capEl.textContent = cap || "※ 통계 화면 목업 데이터 기준";
    return { table: table, cap: capEl, title: title };
  }

  function buildDualLineChartBlock(title, series, cap) {
    var block = document.createElement("div");
    block.className = "chart-block";
    block.setAttribute("data-rpt-user-added", "1");
    block.setAttribute("data-rpt-from-stats", "1");
    var w = 680, h = 160, padL = 40, padR = 14, padT = 16, padB = 26;
    var allVals = [];
    series.forEach(function (s) {
      s.values.forEach(function (v) { allVals.push(v); });
    });
    var vMax = Math.ceil(Math.max.apply(null, allVals) / 1000) * 1000 || 1000;
    var stepX = (w - padL - padR) / (series[0].values.length - 1);
    function xy(i, v) {
      return [padL + stepX * i, padT + (h - padT - padB) * (1 - v / vMax)];
    }
    var svgParts = [];
    for (var g = 0; g <= vMax; g += Math.max(2000, Math.round(vMax / 4))) {
      var gy = xy(0, g)[1];
      svgParts.push('<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="#e1e0d9"/>');
    }
    series.forEach(function (s) {
      var pts = s.values.map(function (v, i) { return xy(i, v); });
      var path = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ");
      svgParts.push('<path d="' + path + '" fill="none" stroke="' + s.color + '" stroke-width="2.2"/>');
      pts.forEach(function (p, i) {
        svgParts.push('<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3" fill="' + s.color + '"/>');
      });
    });
    series[0].labels.forEach(function (lbl, i) {
      var x = xy(i, 0)[0];
      svgParts.push('<text x="' + x + '" y="' + (h - 8) + '" font-size="10" text-anchor="middle" fill="#898781">' + lbl + "</text>");
    });
    block.innerHTML =
      '<p class="chart-title">' + title + "</p>" +
      '<div class="line-chart-wrap"><svg viewBox="0 0 ' + w + " " + h + '">' + svgParts.join("") + "</svg></div>" +
      '<div class="legend-row" style="display:flex;gap:12px;margin-top:6px;font-size:10.5px">' +
        series.map(function (s) {
          return '<span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + s.color + ';margin-right:4px"></span>' + s.label + "</span>";
        }).join("") +
      "</div>" +
      '<p class="cap" style="margin-top:8px">' + (cap || "※ 통계 화면 목업 데이터 기준") + "</p>";
    return block;
  }

  function resolveSurveyQuery(q) {
    var domainKey = findDomainKey(q);
    var asTable = wantsTable(q) || (!wantsChart(q) && /비교|현황/.test(q) && !wantsTrend(q));

    if (domainKey && wantsTrend(q)) {
      var trend = SURVEY.domainTrends[domainKey];
      if (!trend) return null;
      if (asTable) {
        var rows = trend.months.map(function (m, i) {
          return [m, trend.scores[i].toFixed(2) + "점"];
        });
        var built = buildTrendTable(
          trend.label + " 점수 6개월 추이",
          ["월", "점수"],
          rows,
          "※ 환자경험평가 통계 목업 · " + trend.label + " 월별 종합점수"
        );
        return { kind: "table", title: built.title, table: built.table, cap: built.cap };
      }
      var barRows = trend.months.map(function (m, i) {
        return { name: m, val: trend.scores[i] };
      });
      return {
        kind: "chart",
        node: buildTrendChartBlock(
          trend.label + " 점수 6개월 추이",
          barRows,
          "※ 환자경험평가 통계 목업 · " + trend.label + " 월별 종합점수"
        )
      };
    }

    if (/영역|domain/.test(q) && (/비교|현황|표/.test(q) || asTable)) {
      var areaRows = SURVEY.areaCompare.map(function (a) {
        return [a.name, a.current.toFixed(2) + "점", a.prior.toFixed(2) + "점", fmtDelta(a.delta)];
      });
      var areaBuilt = buildTrendTable(
        "영역별 점수 현황 (전월 대비)",
        ["영역", "이번 달", "전월", "변화"],
        areaRows,
        "※ 전월 대비 변화가 확인된 영역 (통계 목업)"
      );
      return { kind: "table", title: areaBuilt.title, table: areaBuilt.table, cap: areaBuilt.cap };
    }

    if (/진료과|과별/.test(q)) {
      if (asTable) {
        var dRows = SURVEY.deptScores.map(function (d) {
          return [d.name, d.val.toFixed(1) + "점", fmtDelta(d.delta)];
        });
        var dBuilt = buildTrendTable("진료과별 종합점수", ["진료과", "종합점수", "전월 대비"], dRows);
        return { kind: "table", title: dBuilt.title, table: dBuilt.table, cap: dBuilt.cap };
      }
      var maxD = Math.max.apply(null, SURVEY.deptScores.map(function (d) { return d.val; }));
      return {
        kind: "chart",
        node: buildTrendChartBlock(
          "진료과별 종합점수 비교",
          SURVEY.deptScores.map(function (d) {
            return { name: d.name, val: d.val, color: d.delta >= 0 ? "#0C447C" : "#791F1F" };
          }),
          "※ 환자경험평가 통계 목업 · 진료과별 종합점수",
          maxD
        )
      };
    }

    if (/담당의|교수|의사별/.test(q)) {
      var docRows = SURVEY.doctorScores.map(function (d) {
        return [d.name, d.dept, d.val.toFixed(1) + "점", fmtDelta(d.delta)];
      });
      var docBuilt = buildTrendTable("담당의별 종합점수", ["담당의", "진료과", "종합점수", "전월 대비"], docRows);
      return { kind: "table", title: docBuilt.title, table: docBuilt.table, cap: docBuilt.cap };
    }

    if (/간호사/.test(q) && /표|현황|점수/.test(q)) {
      var nRows = SURVEY.nurseScores.map(function (d) {
        return [d.name, d.ward, d.val.toFixed(1) + "점", fmtDelta(d.delta)];
      });
      var nBuilt = buildTrendTable("간호사별 종합점수", ["간호사", "담당 병동", "종합점수", "전월 대비"], nRows);
      return { kind: "table", title: nBuilt.title, table: nBuilt.table, cap: nBuilt.cap };
    }

    if (domainKey) {
      var snap = SURVEY.domainTrends[domainKey];
      var last = snap.scores[snap.scores.length - 1];
      var prev = snap.scores[snap.scores.length - 2];
      var built2 = buildTrendTable(
        snap.label + " 최근 점수",
        ["항목", "6월", "5월", "변화"],
        [[snap.label, last.toFixed(2) + "점", prev.toFixed(2) + "점", fmtDelta(last - prev)]]
      );
      return { kind: "table", title: built2.title, table: built2.table, cap: built2.cap };
    }

    return null;
  }

  function resolveVocQuery(q) {
    var asTable = wantsTable(q) && !wantsChart(q);

    if (/월별|6개월|추이|긍정|부정|트렌드/.test(q)) {
      if (asTable) {
        var rows = VOC.monthlyTrend.map(function (r) {
          return [r.m, r.pos.toLocaleString() + "건", r.neg.toLocaleString() + "건"];
        });
        var built = buildTrendTable(
          "월별 긍·부정 언급 추이",
          ["월", "긍정", "부정"],
          rows,
          "※ VOC 통계 목업 · 1~6월 긍·부정 언급 건수"
        );
        return { kind: "table", title: built.title, table: built.table, cap: built.cap };
      }
      return {
        kind: "chart",
        node: buildDualLineChartBlock(
          "월별 긍·부정 언급 추이 (1~6월)",
          [
            { label: "긍정", color: "#1baf7a", labels: VOC.monthlyTrend.map(function (r) { return r.m; }), values: VOC.monthlyTrend.map(function (r) { return r.pos; }) },
            { label: "부정", color: "#e24b4a", labels: VOC.monthlyTrend.map(function (r) { return r.m; }), values: VOC.monthlyTrend.map(function (r) { return r.neg; }) }
          ],
          "※ VOC 통계 목업 · 1~6월 긍·부정 언급 건수"
        )
      };
    }

    if (/유형|카테고리/.test(q)) {
      var tRows = VOC.typeRows.map(function (r) {
        var chCls = r.change <= 0 ? "tag-good" : "tag-bad";
        var chSign = r.change <= 0 ? "▼" : "▲";
        return [r.type, r.cnt.toLocaleString() + "건", r.pct + "%", '<span class="' + chCls + '">' + chSign + Math.abs(r.change) + "%p</span>"];
      });
      var tBuilt = buildTrendTable("유형별 VOC 현황", ["유형", "건수", "비중", "전월대비 부정률"], tRows);
      return { kind: "table", title: tBuilt.title, table: tBuilt.table, cap: tBuilt.cap };
    }

    if (/채널/.test(q)) {
      if (asTable) {
        var cRows = VOC.channels.map(function (c) {
          return [c.name, c.cnt.toLocaleString() + "건", c.pct + "%"];
        });
        var cBuilt = buildTrendTable("채널별 접수 현황", ["채널", "건수", "비중"], cRows);
        return { kind: "table", title: cBuilt.title, table: cBuilt.table, cap: cBuilt.cap };
      }
      var maxC = Math.max.apply(null, VOC.channels.map(function (c) { return c.cnt; }));
      return {
        kind: "chart",
        node: buildTrendChartBlock(
          "채널별 접수 현황",
          VOC.channels.map(function (c) {
            return { name: c.name, val: c.cnt, color: c.color };
          }),
          "※ VOC 통계 목업 · 채널별 접수 건수",
          maxC
        )
      };
    }

    if (/병동/.test(q)) {
      var wRows = VOC.wards.map(function (w) {
        return [w.name, w.negRate + "%", fmtDelta(w.change, "%p")];
      });
      var wBuilt = buildTrendTable("병동별 부정률 현황", ["병동", "부정 비율", "부정률 변화"], wRows);
      return { kind: "table", title: wBuilt.title, table: wBuilt.table, cap: wBuilt.cap };
    }

    if (/진료과|과별/.test(q)) {
      var dRows = VOC.depts.map(function (d) {
        return [d.name, d.negCnt.toLocaleString() + "건", fmtDelta(d.change, "%p")];
      });
      var dBuilt = buildTrendTable("진료과별 VOC 현황", ["진료과", "부정 건수", "부정률 변화"], dRows);
      return { kind: "table", title: dBuilt.title, table: dBuilt.table, cap: dBuilt.cap };
    }

    if (/의사/.test(q)) {
      var docRows = VOC.doctors.map(function (d) {
        return [d.name, d.dept, d.negCnt + "건", fmtDelta(d.change, "%p")];
      });
      var docBuilt = buildTrendTable("의사별 VOC 현황", ["의사", "진료과", "부정 건수", "부정률 변화"], docRows);
      return { kind: "table", title: docBuilt.title, table: docBuilt.table, cap: docBuilt.cap };
    }

    return null;
  }

  function tryParentBridge(query) {
    try {
      if (global.parent && global.parent !== global && typeof global.parent.__pixResolveReportStatsQuery === "function") {
        return global.parent.__pixResolveReportStatsQuery(query, detectReportKind());
      }
    } catch (_err) {}
    return null;
  }

  function resolveQuery(queryText) {
    var q = normalizeQuery(queryText);
    if (!q) {
      return { ok: false, message: "불러올 내용을 입력해 주세요." };
    }

    var bridged = tryParentBridge(q);
    if (bridged && bridged.ok) return bridged;

    var kind = detectReportKind();
    var result = kind === "voc" ? resolveVocQuery(q) : resolveSurveyQuery(q);

    if (!result) {
      return {
        ok: false,
        message: "통계에서 일치하는 데이터를 찾지 못했습니다. 예: \"의사영역 점수 6개월 추이\", \"진료과별 종합점수\", \"VOC 월별 긍부정 추이\""
      };
    }

    return { ok: true, result: result, query: q, source: "mock" };
  }

  function getSuggestions() {
    var kind = detectReportKind();
    if (kind === "voc") {
      return [
        "VOC 월별 긍부정 6개월 추이",
        "유형별 VOC 현황 표",
        "채널별 접수 현황",
        "병동별 부정률 표",
        "진료과별 VOC 현황"
      ];
    }
    return [
      "의사영역 점수 6개월 추이",
      "정서적 지지 6개월 추이",
      "영역별 점수 현황 표",
      "진료과별 종합점수",
      "담당의별 종합점수 표"
    ];
  }

  global.PixReportStatsQuery = {
    resolveQuery: resolveQuery,
    detectReportKind: detectReportKind,
    getSuggestions: getSuggestions,
    SURVEY: SURVEY,
    VOC: VOC
  };
})(typeof window !== "undefined" ? window : global);
