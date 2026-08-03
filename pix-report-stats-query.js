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
    ],
    kwPos: [
      { name: "친절함", cnt: 320 },
      { name: "세심함 · 시설 만족", cnt: 210 },
      { name: "신속 응대", cnt: 165 },
      { name: "의사 설명", cnt: 164 },
      { name: "식사 만족 · 병실 청결", cnt: 150 }
    ],
    kwNeg: [
      { name: "비용 부담", cnt: 210 },
      { name: "예약 절차 복잡", cnt: 180 },
      { name: "응대 지연", cnt: 140 },
      { name: "앱 오류", cnt: 130 },
      { name: "치료 속도", cnt: 129 }
    ],
    flags: [
      { tag: "환자안전", cnt: "12건", delta: "▲3건", desc: " — AI가 자유 텍스트에서 감지한 플래그입니다." },
      { tag: "감염관리", cnt: "5건", delta: "▼1건", desc: "" }
    ],
    quotes: [
      { text: "환자가 침대에서 낙상할 뻔했습니다. 안전바가 없었어요.", meta: "3병동 · 환자안전" },
      { text: "손 소독제가 비치되어 있지 않았습니다.", meta: "7병동 · 감염관리" },
      { text: "회진 설명이 친절했습니다.", meta: "내과 · 직원칭찬(김의사)" }
    ],
    typeTrend: {
      "시스템 및 서비스": [720, 745, 780],
      "환경관련": [680, 690, 705]
    }
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

  function buildTextBlock(text, className) {
    var el = document.createElement(className === "headline" ? "div" : "p");
    el.className = className || "body";
    el.setAttribute("data-rpt-user-added", "1");
    el.setAttribute("data-rpt-from-stats", "1");
    el.textContent = text;
    return { kind: "node", node: el };
  }

  function buildQuoteBlock(text, meta) {
    var el = document.createElement("div");
    el.className = "quote-box";
    el.setAttribute("data-rpt-user-added", "1");
    el.setAttribute("data-rpt-from-stats", "1");
    el.innerHTML = '"' + text + '" <span class="quote-meta">' + (meta || "") + "</span>";
    return { kind: "node", node: el };
  }

  function buildVocKpiStrip() {
    var items = [
      { label: "접수된 VOC", val: "8,323건", delta: "▲214건", accent: false },
      { label: "언급된 VOC", val: "9,120건", delta: "▲340건", accent: false },
      { label: "평균 태그 수", val: "1.10개", delta: "▲0.02개", accent: false },
      { label: "부서칭찬", val: "420건", delta: "▲18건", accent: true },
      { label: "직원칭찬", val: "820건", delta: "▲32건", accent: true }
    ];
    var strip = document.createElement("div");
    strip.className = "kpi-strip";
    strip.setAttribute("data-rpt-user-added", "1");
    strip.setAttribute("data-rpt-from-stats", "1");
    strip.style.marginBottom = "16px";
    strip.innerHTML = items.map(function (it) {
      return '<div class="kpi-box"><div class="kpi-label">' + it.label + '</div><div class="kpi-val"' +
        (it.accent ? ' style="color:#0C447C"' : "") + ">" + it.val + '</div><div class="kpi-delta"' +
        (it.accent ? ' style="color:#0C447C"' : "") + ">" + it.delta + "</div></div>";
    }).join("");
    return { kind: "node", node: strip };
  }

  function buildKwBarRows(data, color) {
    var max = Math.max.apply(null, data.map(function (d) { return d.cnt; }));
    return data.map(function (d) {
      var pct = max ? (d.cnt / max * 100).toFixed(1) : 0;
      return '<div class="bar-row">' +
        '<div class="bar-name" style="width:120px">' + d.name + "</div>" +
        '<div class="bar-track"><div class="bar-fill" style="width:' + pct + "%;background:" + color + '"></div></div>' +
        '<div class="bar-val" style="width:50px">' + d.cnt + "건</div></div>";
    }).join("");
  }

  function buildVocKeywordChart() {
    var block = document.createElement("div");
    block.className = "chart-block";
    block.setAttribute("data-rpt-user-added", "1");
    block.setAttribute("data-rpt-from-stats", "1");
    block.innerHTML =
      '<p class="chart-title">주요 언급 키워드 TOP5 (전체 카테고리 합산)</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
        '<div><p style="font-size:11px;font-weight:700;color:#0C447C;margin:0 0 8px">긍정 키워드</p>' +
        buildKwBarRows(VOC.kwPos, "#0C447C") + "</div>" +
        '<div><p style="font-size:11px;font-weight:700;color:#791F1F;margin:0 0 8px">부정 키워드</p>' +
        buildKwBarRows(VOC.kwNeg, "#791F1F") + "</div></div>" +
      '<p class="cap" style="margin-top:10px">※ 7개 유형별 키워드 TOP5 데이터를 동일 키워드 기준으로 합산한 결과임.</p>';
    return { kind: "node", node: block };
  }

  function buildVocFlagsBlock() {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-rpt-user-added", "1");
    wrap.setAttribute("data-rpt-from-stats", "1");
    wrap.innerHTML = (VOC.flags || []).map(function (f) {
      return '<div class="flag-card"><span class="flag-tag">' + f.tag + '</span><div class="flag-body">' +
        '<span class="flag-cnt">' + f.cnt + "</span> (전월 대비 " + f.delta + ")" + (f.desc || "") + "</div></div>";
    }).join("");
    return { kind: "node", node: wrap };
  }

  function buildVocQuotesBlock() {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-rpt-user-added", "1");
    wrap.setAttribute("data-rpt-from-stats", "1");
    (VOC.quotes || []).forEach(function (q) {
      wrap.appendChild(buildQuoteBlock(q.text, q.meta).node);
    });
    return { kind: "node", node: wrap };
  }

  function renderSparklineSvg(values, color) {
    var w = 300, h = 60, pad = 10;
    var vMin = Math.min.apply(null, values) - 15;
    var vMax = Math.max.apply(null, values) + 15;
    var stepX = (w - pad * 2) / (values.length - 1);
    function xy(i, v) {
      return [pad + stepX * i, pad + (h - pad * 2) * (1 - (v - vMin) / (vMax - vMin))];
    }
    var pts = values.map(function (v, i) { return xy(i, v); });
    var pathD = pts.map(function (p, i) {
      return (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1);
    }).join(" ");
    var dots = pts.map(function (p, i) {
      return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="' + color + '"/>' +
        '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] - 8).toFixed(1) + '" font-size="10" text-anchor="middle" fill="' + color + '" font-weight="700">' + values[i] + "</text>";
    }).join("");
    return '<svg viewBox="0 0 ' + w + " " + h + '" style="width:100%;height:auto;display:block">' +
      '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="2.2"/>' + dots + "</svg>";
  }

  function buildVocTypeTrendChart() {
    var sys = VOC.typeTrend["시스템 및 서비스"];
    var env = VOC.typeTrend["환경관련"];
    var block = document.createElement("div");
    block.className = "chart-block";
    block.setAttribute("data-rpt-user-added", "1");
    block.setAttribute("data-rpt-from-stats", "1");
    block.innerHTML =
      '<p class="chart-title">최근 3개월 현황</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:10px">' +
        '<div><p style="font-size:11px;font-weight:700;margin:0 0 6px">시스템 및 서비스 (언급 건수)</p>' +
        renderSparklineSvg(sys, "#791F1F") +
        '<p style="font-size:11px;color:#791F1F;font-weight:700;margin:4px 0 0">' + sys.join(" → ") + "건 (3개월 연속 증가, 상승폭 확대)</p></div>" +
        '<div><p style="font-size:11px;font-weight:700;margin:0 0 6px">환경관련 (언급 건수)</p>' +
        renderSparklineSvg(env, "#791F1F") +
        '<p style="font-size:11px;color:#791F1F;font-weight:700;margin:4px 0 0">' + env.join(" → ") + "건 (3개월 연속 증가)</p></div></div>" +
      '<p class="cap" style="margin-top:6px">※ trend 값은 목업 데이터의 최근 3개 시점(카테고리별 누적 언급 건수) 기준임.</p>';
    return { kind: "node", node: block };
  }

  function buildSurveyOverviewTable() {
    var rows = [
      ["종합점수", "82.42점", "▲1.20점"],
      ["응답률", "38.60%", "▲4.50%p"],
      ["타인 추천 의향", "81.80점", "▲0.40점"],
      ["의사 영역", "80.40점", "▼0.60점"],
      ["환자권리보장", "76.90점", "▼1.10점"]
    ];
    var built = buildTrendTable("전체 현황 (핵심 지표)", ["지표", "6월", "전월 대비"], rows, "※ 환자경험평가 통계 목업 · 전체 현황");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function buildVocOverviewTable() {
    var rows = [
      ["접수 VOC", "8,323건", "▲214건"],
      ["언급 VOC", "9,120건", "▲340건"],
      ["평균 태그 수", "1.10개", "▲0.02개"],
      ["부서칭찬", "420건", "▲18건"],
      ["직원칭찬", "820건", "▲32건"]
    ];
    var built = buildTrendTable("전체 VOC 현황", ["항목", "6월", "전월 대비"], rows, "※ VOC 통계 목업 · 전체 현황");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function buildSurveyPlanTable() {
    var rows = [
      ["높음", "문19·환자권리보장 영역 개선", "2주"],
      ["중간", "회진시간 안내 프로세스 개선", "2주"],
      ["중간", "신경과·ICU 하락 원인 모니터링", "2~3주"]
    ];
    var built = buildTrendTable("개선 액션 플랜", ["우선순위", "과제", "소요"], rows, "※ AI 분석 데이터 · 개선 액션 플랜");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function buildVocPlanTable() {
    var rows = [
      ["높음", "환자안전 플래그 12건 전수 검토", "1주"],
      ["중간", "시스템·환경관련 유형 원인 점검", "2주"],
      ["중간", "7병동·재활의학과 모니터링", "2~3주"]
    ];
    var built = buildTrendTable("개선 액션 플랜", ["우선순위", "과제", "소요"], rows, "※ AI 분석 데이터 · 개선 액션 플랜");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function buildVocPraiseTable() {
    var rows = [
      ["간호부", "142건", "▲12건"],
      ["원무팀", "98건", "▲8건"],
      ["진료과", "86건", "▲5건"]
    ];
    var built = buildTrendTable("칭찬 현황 (부서)", ["부서", "건수", "전월 대비"], rows, "※ VOC 통계 목업 · 칭찬 현황");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function buildVocDemographicTable() {
    var rows = [
      ["남", "50%", "-"],
      ["여", "50%", "-"],
      ["40대", "24%", "최다"],
      ["50대", "22%", "-"]
    ];
    var built = buildTrendTable("응답자 구성", ["구분", "비중", "비고"], rows, "※ VOC 통계 목업 · 응답자 구성");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function buildVocCategoryTable() {
    var rows = [
      ["친절함", "긍정 TOP1", "진료·치료"],
      ["설명", "긍정 TOP2", "진료·치료"],
      ["예약 절차 복잡", "부정 TOP1", "시스템·서비스"],
      ["대기시간", "부정 TOP2", "환경관련"]
    ];
    var built = buildTrendTable("카테고리·키워드", ["키워드", "구분", "유형"], rows, "※ VOC 통계 목업 · 카테고리·키워드");
    return { kind: "table", title: built.title, table: built.table, cap: built.cap };
  }

  function resolveSpecialQuery(q) {
    var kind = detectReportKind();
    if (q === "__stat:overview") {
      return kind === "voc" ? buildVocOverviewTable() : buildSurveyOverviewTable();
    }
    if (q === "__stat:kpi") return buildVocKpiStrip();
    if (q === "__stat:keywords") return buildVocKeywordChart();
    if (q === "__stat:type_trend") return buildVocTypeTrendChart();
    if (q === "__stat:praise") return buildVocPraiseTable();
    if (q === "__stat:demographic") return buildVocDemographicTable();
    if (q === "__stat:category") return buildVocCategoryTable();

    if (kind === "survey") {
      if (q === "__ai:overview") {
        return buildTextBlock(
          "6월 종합점수 82.42점으로 전월 대비 1.20점 상승. 환자권리보장·의사 영역·정서적 지지 3개 영역이 동시 하락했으며, 문19(68.4점)가 5개월 연속 하락 추세입니다.",
          "body"
        );
      }
      if (q === "__ai:kpi") return buildSurveyOverviewTable();
      if (q === "__ai:dist") {
        var bars = Object.keys(SURVEY.domainTrends).map(function (key) {
          var d = SURVEY.domainTrends[key];
          var last = d.scores[d.scores.length - 1];
          return { name: d.label, val: last, color: last >= 80 ? "#0C447C" : "#791F1F" };
        });
        return { kind: "chart", node: buildTrendChartBlock("영역별 종합점수 분포", bars, "※ AI 분석 데이터 · 영역별 분포", 100) };
      }
      if (q === "__ai:matrix") {
        return resolveSurveyQuery("영역별 점수 현황 표");
      }
      if (q === "__ai:areas") {
        var aRows = SURVEY.areaCompare.map(function (a) {
          return [a.name, a.current.toFixed(2) + "점", fmtDelta(a.delta)];
        });
        var aBuilt = buildTrendTable("변화 영역 TOP", ["영역", "점수", "전월 대비"], aRows, "※ AI 분석 데이터 · 변화 영역");
        return { kind: "table", title: aBuilt.title, table: aBuilt.table, cap: aBuilt.cap };
      }
      if (q === "__ai:issues") {
        return buildTextBlock(
          "문19(불만 제기 용이성) 68.4점·5개월 연속 하락, VOC 회진시간 안내 부족 언급 급증, 환자권리보장 영역 지속 하락이 주요 이슈로 확인되었습니다.",
          "body"
        );
      }
      if (q === "__ai:plan") return buildSurveyPlanTable();
    }

    if (kind === "voc") {
      if (q === "__ai:overview") {
        return buildTextBlock(
          "6월 VOC 8,323건(▲214건) 접수. 대부분 유형은 개선 추세이나 시스템·서비스(▲2.1%p)·환경관련(▲1.0%p) 부정률 악화, 환자안전 플래그 12건(▲3건) 증가가 확인되었습니다.",
          "body"
        );
      }
      if (q === "__ai:kpi") return buildVocOverviewTable();
      if (q === "__ai:matrix") {
        return resolveVocQuery("유형별 VOC 현황 표");
      }
      if (q === "__ai:keywords") {
        return buildTextBlock(
          "변화 키워드 TOP3: ① 회진시간 안내 ② 대기시간 ③ 예약 절차 — 시스템·서비스 유형 부정률 상승과 함께 언급이 집중되었습니다.",
          "body"
        );
      }
      if (q === "__ai:issues") {
        return buildTextBlock(
          "환자안전 플래그 12건(▲3건), 시스템·환경관련 유형 부정률 악화, 7병동·재활의학과 그룹 부정률 상승이 주요 이슈입니다.",
          "body"
        );
      }
      if (q === "__ai:plan") return buildVocPlanTable();
      if (q === "__ai:monitor") {
        return buildTextBlock(
          "7월 1주차 환자안전 재발방지 이행 확인, 2주차 시스템·환경관련 부정률 재점검, 7월 말 7병동·재활의학과 재평가.",
          "body"
        );
      }
      if (q === "__ai:quotes") return buildVocQuotesBlock();
      if (q === "__ai:flags") return buildVocFlagsBlock();
    }

    return null;
  }

  var SURVEY_STAT_CATALOG = [
    { id: "stat_overview", label: "전체 현황", query: "__stat:overview" },
    { id: "stat_area_trend", label: "의사영역 6개월 추이", query: "의사영역 점수 6개월 추이" },
    { id: "stat_emotion_trend", label: "정서적 지지 6개월 추이", query: "정서적 지지 6개월 추이" },
    { id: "stat_rights_trend", label: "환자권리보장 6개월 추이", query: "환자권리보장 6개월 추이" },
    { id: "stat_area_table", label: "영역별 점수 현황", query: "영역별 점수 현황 표" },
    { id: "stat_dept", label: "진료과별 종합점수", query: "진료과별 종합점수" },
    { id: "stat_doctor", label: "담당의별 종합점수", query: "담당의별 종합점수 표" },
    { id: "stat_nurse", label: "간호사별 종합점수", query: "간호사별 종합점수 표" }
  ];

  var SURVEY_AI_CATALOG = [
    { id: "ai_overview", label: "개요", query: "__ai:overview" },
    { id: "ai_kpi", label: "핵심 지표", query: "__ai:kpi" },
    { id: "ai_dist", label: "영역별 분포", query: "__ai:dist" },
    { id: "ai_matrix", label: "영역 진단 매트릭스", query: "__ai:matrix" },
    { id: "ai_areas", label: "변화 영역 TOP3", query: "__ai:areas" },
    { id: "ai_issues", label: "주요 이슈", query: "__ai:issues" },
    { id: "ai_plan", label: "개선 액션 플랜", query: "__ai:plan" }
  ];

  var VOC_STAT_CATALOG = [
    { id: "stat_kpi", label: "핵심 KPI", query: "__stat:kpi" },
    { id: "stat_overview", label: "전체 VOC 현황", query: "__stat:overview" },
    { id: "stat_type", label: "유형별 접수 현황", query: "유형별 VOC 현황 표" },
    { id: "stat_keywords", label: "키워드 TOP5", query: "__stat:keywords" },
    { id: "stat_trend", label: "VOC 월별 추이", query: "VOC 월별 긍부정 6개월 추이" },
    { id: "stat_channel", label: "채널별 접수", query: "채널별 접수 현황" },
    { id: "stat_type_trend", label: "유형 3개월 추이", query: "__stat:type_trend" },
    { id: "stat_praise", label: "칭찬 현황", query: "__stat:praise" },
    { id: "stat_demographic", label: "응답자 구성", query: "__stat:demographic" },
    { id: "stat_category", label: "카테고리·키워드", query: "__stat:category" },
    { id: "stat_group_ward", label: "병동별 부정률", query: "병동별 부정률 표" },
    { id: "stat_group_dept", label: "진료과별 VOC", query: "진료과별 VOC 현황" },
    { id: "stat_group_doctor", label: "의사별 VOC", query: "의사별 VOC 현황" }
  ];

  var VOC_AI_CATALOG = [
    { id: "ai_overview", label: "개요", query: "__ai:overview" },
    { id: "ai_kpi", label: "핵심 지표", query: "__ai:kpi" },
    { id: "ai_dist", label: "유형별 분포", query: "유형별 VOC 현황 표" },
    { id: "ai_matrix", label: "유형 진단 매트릭스", query: "__ai:matrix" },
    { id: "ai_keywords", label: "변화 키워드 TOP3", query: "__ai:keywords" },
    { id: "ai_flags", label: "환자안전 플래그", query: "__ai:flags" },
    { id: "ai_issues", label: "주요 이슈", query: "__ai:issues" },
    { id: "ai_quotes", label: "원문 및 인사이트", query: "__ai:quotes" },
    { id: "ai_plan", label: "개선 액션 플랜", query: "__ai:plan" },
    { id: "ai_monitor", label: "모니터링", query: "__ai:monitor" }
  ];

  function getImportCatalog() {
    if (detectReportKind() === "voc") {
      return {
        groups: [
          { key: "stats", title: "전체 통계", items: VOC_STAT_CATALOG },
          { key: "ai", title: "AI 분석 데이터", items: VOC_AI_CATALOG }
        ]
      };
    }
    return {
      groups: [
        { key: "stats", title: "전체 통계", items: SURVEY_STAT_CATALOG },
        { key: "ai", title: "AI 분석 데이터", items: SURVEY_AI_CATALOG }
      ]
    };
  }

  function findCatalogItem(itemId) {
    var catalog = getImportCatalog();
    var found = null;
    catalog.groups.forEach(function (group) {
      group.items.forEach(function (item) {
        if (item.id === itemId) found = item;
      });
    });
    return found;
  }

  function resolveCatalogItem(itemId) {
    var item = findCatalogItem(itemId);
    if (!item) {
      return { ok: false, message: "선택한 항목을 찾을 수 없습니다." };
    }
    return resolveQuery(item.query);
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
      return { ok: false, message: "불러올 항목을 선택해 주세요." };
    }

    if (q.indexOf("__") === 0) {
      var special = resolveSpecialQuery(q);
      if (special) {
        return { ok: true, result: special, query: q, source: "catalog" };
      }
      return { ok: false, message: "선택한 항목을 불러올 수 없습니다." };
    }

    var bridged = tryParentBridge(q);
    if (bridged && bridged.ok) return bridged;

    var kind = detectReportKind();
    var result = kind === "voc" ? resolveVocQuery(q) : resolveSurveyQuery(q);

    if (!result) {
      return {
        ok: false,
        message: "통계에서 일치하는 데이터를 찾지 못했습니다."
      };
    }

    return { ok: true, result: result, query: q, source: "mock" };
  }

  function getSuggestions() {
    var catalog = getImportCatalog();
    var out = [];
    catalog.groups.forEach(function (group) {
      group.items.forEach(function (item) {
        out.push(item.label);
      });
    });
    return out;
  }

  global.PixReportStatsQuery = {
    resolveQuery: resolveQuery,
    resolveCatalogItem: resolveCatalogItem,
    getImportCatalog: getImportCatalog,
    detectReportKind: detectReportKind,
    getSuggestions: getSuggestions,
    SURVEY: SURVEY,
    VOC: VOC
  };
})(typeof window !== "undefined" ? window : global);
