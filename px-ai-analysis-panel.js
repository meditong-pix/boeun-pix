(function (global) {
  "use strict";

  var LV_NAMES = ["심플", "기본", "고강도"];
  var LV_KEYS = ["simple", "basic", "deep"];

  var CSS = [
    ".px-ai-root{--accent:#7c6cff;--accent-strong:#5b46ff;--accent-soft:rgba(124,108,255,0.16);--surface-0:#0d1525;--surface-1:#121a2b;--surface-2:#1a2438;--text-primary:#f1f5f9;--text-secondary:#cbd5e1;--text-muted:#94a3b8;--border:rgba(148,163,184,0.12);--border-strong:rgba(148,163,184,0.28);--border-accent:rgba(124,108,255,0.55);--bg-accent:var(--accent-soft);--text-accent:#c4b5fd;--text-success:#4ade80;--text-danger:#f87171;--text-warning:#fbbf24;--bg-success:rgba(74,222,128,0.12);--bg-danger:rgba(248,113,113,0.14);--bg-warning:rgba(251,191,36,0.14);--radius:10px;box-sizing:border-box;height:100%;display:flex;flex-direction:column;background:var(--surface-0);color:var(--text-primary);font-family:\"Pretendard\",-apple-system,BlinkMacSystemFont,\"Apple SD Gothic Neo\",\"Malgun Gothic\",sans-serif;}",
    ".px-ai-root *,.px-ai-root *::before,.px-ai-root *::after{box-sizing:border-box;}",
    ".px-ai-head{flex-shrink:0;padding:14px 18px 0;background:linear-gradient(180deg,rgba(124,108,255,0.08),transparent 88%);}",
    ".px-ai-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 0 12px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-title-wrap{display:flex;align-items:center;gap:10px;min-width:0;}",
    ".px-ai-title{font-size:15px;font-weight:700;letter-spacing:-0.02em;color:#f8fafc;}",
    ".px-ai-badge{font-size:10px;font-weight:700;padding:3px 8px;border-radius:99px;color:#ede9fe;background:linear-gradient(135deg,#6d5dfc,#5b46ff);box-shadow:0 6px 14px rgba(91,70,255,0.28);}",
    ".px-ai-period{font-size:12px;color:var(--text-muted);white-space:nowrap;}",
    ".px-ai-close{width:32px;height:32px;border:0.5px solid var(--border-strong);border-radius:8px;background:rgba(255,255,255,0.03);color:var(--text-secondary);cursor:pointer;font-size:16px;line-height:1;display:inline-flex;align-items:center;justify-content:center;}",
    ".px-ai-close:hover{background:rgba(255,255,255,0.08);color:#fff;}",
    ".px-ai-tabs{display:flex;gap:4px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-tab{border:none;background:transparent;font-size:13px;font-weight:600;color:var(--text-muted);padding:12px 16px 11px;cursor:pointer;font-family:inherit;border-bottom:2px solid transparent;margin-bottom:-0.5px;transition:color .15s,border-color .15s;}",
    ".px-ai-tab.on{color:#f8fafc;border-bottom-color:var(--accent);}",
    ".px-ai-scroll{flex:1;min-height:0;overflow-y:auto;padding:0 18px 20px;}",
    ".px-ai-analysis-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 0;border-bottom:0.5px solid var(--border);}",
    ".px-ai-analysis-title{font-size:13px;font-weight:600;color:var(--text-primary);}",
    ".px-ai-level-wrap{display:flex;align-items:center;gap:10px;}",
    ".px-ai-level-label{font-size:12px;color:var(--text-muted);font-weight:500;}",
    ".px-ai-htrack{width:168px;height:34px;background:rgba(15,23,42,0.9);border:0.5px solid var(--border-strong);border-radius:999px;padding:3px;position:relative;cursor:pointer;user-select:none;flex-shrink:0;}",
    ".px-ai-hthumb{position:absolute;top:3px;bottom:3px;background:linear-gradient(135deg,#6d5dfc,#5b46ff);border:none;border-radius:999px;display:flex;align-items:center;justify-content:center;gap:3px;cursor:grab;z-index:2;transition:left .2s cubic-bezier(.4,0,.2,1);box-shadow:0 6px 14px rgba(91,70,255,0.35);}",
    ".px-ai-hline{width:1.5px;height:11px;background:rgba(255,255,255,0.55);border-radius:1px;}",
    ".px-ai-hlabels{display:flex;position:absolute;inset:0;z-index:1;pointer-events:none;}",
    ".px-ai-hlbl{flex:1;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--text-muted);font-weight:500;transition:color .15s;}",
    ".px-ai-hlbl.on{color:#fff;font-weight:700;}",
    ".px-ai-sum{padding:14px 0 16px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-sum-lbl,.px-ai-sec-lbl{font-size:15px;font-weight:500;color:#f1f5f9;}",
    ".px-ai-sum-txt{font-size:13px;color:var(--text-secondary);line-height:1.75;white-space:pre-line;}",
    ".px-ai-sec{margin-top:20px;}",
    ".px-ai-sec-hd{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;}",
    ".px-ai-sec-ct{font-size:12px;color:var(--text-muted);}",
    ".px-ai-rows{border-top:0.5px solid var(--border);}",
    ".px-ai-row{display:flex;align-items:baseline;justify-content:space-between;padding:9px 0;border-bottom:0.5px solid rgba(148,163,184,0.1);}",
    ".px-ai-row:last-child{border-bottom:none;}",
    ".px-ai-rtitle{font-size:13px;color:var(--text-primary);}",
    ".px-ai-rsub{font-size:12px;color:var(--text-secondary);margin-top:2px;line-height:1.5;}",
    ".px-ai-rval{font-size:13px;font-weight:500;}",
    ".px-ai-rval.up{color:#4ade80;}",
    ".px-ai-rval.dn{color:#f87171;}",
    ".px-ai-rmeta{font-size:11.5px;color:#94a3b8;margin-top:2px;}",
    ".px-ai-pill{display:inline-block;font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:99px;margin-right:5px;vertical-align:middle;}",
    ".px-ai-pill.h{background:var(--bg-danger);color:var(--text-danger);}",
    ".px-ai-pill.m{background:var(--bg-warning);color:var(--text-warning);}",
    ".px-ai-pill.g{background:var(--bg-success);color:var(--text-success);}",
    ".px-ai-pill.l{background:var(--surface-1);color:var(--text-muted);border:0.5px solid var(--border-strong);}",
    ".px-ai-kv-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}",
    ".px-ai-kv{display:flex;flex-direction:column;padding:12px 12px;border:0.5px solid var(--border);border-radius:12px;background:rgba(255,255,255,0.03);}",
    ".px-ai-kv:nth-child(odd),.px-ai-kv:nth-child(even){padding-left:12px;padding-right:12px;border-right:0.5px solid var(--border);}",
    ".px-ai-kk{font-size:11.5px;color:var(--text-muted);margin-bottom:6px;font-weight:500;}",
    ".px-ai-kv-val{font-size:20px;font-weight:600;color:var(--text-primary);line-height:1.15;letter-spacing:-0.02em;}",
    ".px-ai-kv-val.sm{font-size:14px;padding-top:2px;}",
    ".px-ai-kd{font-size:12px;font-weight:600;margin-top:6px;}",
    ".px-ai-kd.up{color:#4ade80;}",
    ".px-ai-kd.dn{color:#f87171;}",
    ".px-ai-toplow,.px-ai-two{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:0.5px solid var(--border);}",
    ".px-ai-tl-col:first-child,.px-ai-two-col:nth-child(odd){padding-right:14px;border-right:0.5px solid var(--border);}",
    ".px-ai-tl-col:last-child,.px-ai-two-col:nth-child(even){padding-left:14px;}",
    ".px-ai-tl-hd{font-size:11.5px;font-weight:600;padding:8px 0 4px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-tl-hd.g{color:#4ade80;}",
    ".px-ai-tl-hd.dn{color:#f87171;}",
    ".px-ai-tl-row,.px-ai-sub-row{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:0.5px solid var(--border);}",
    ".px-ai-tl-row:last-child,.px-ai-sub-row:last-child{border-bottom:none;}",
    ".px-ai-tl-no{font-size:11px;color:var(--text-muted);margin-bottom:2px;}",
    ".px-ai-tl-name{font-size:12.5px;color:var(--text-primary);}",
    ".px-ai-tl-neg{font-size:11px;color:#f87171;margin-top:1px;}",
    ".px-ai-tl-score{font-size:11.5px;color:var(--text-muted);}",
    ".px-ai-two-col-hd{font-size:11.5px;font-weight:600;color:var(--text-muted);padding:8px 0 4px;}",
    ".px-ai-bar{height:8px;border-radius:99px;background:rgba(148,163,184,0.16);overflow:hidden;margin-top:6px;}",
    ".px-ai-bar > span{display:block;height:100%;background:linear-gradient(90deg,#7c6cff,#60a5fa);}",
    ".px-ai-bar.neg > span{background:linear-gradient(90deg,#f87171,#fb7185);}",
    ".px-ai-rpt-header{padding:14px 0 12px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-rpt-setup{padding:14px 0 4px;}",
    ".px-ai-rpt-desc{font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:12px;}",
    ".px-ai-rpt-level{font-size:12px;color:#a9a7b6;margin-bottom:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}",
    ".px-ai-rpt-level-note{color:#7a7887;}",
    ".px-ai-level-tag{font-size:11px;font-weight:700;padding:2px 9px;border-radius:999px;background:#2a2438;color:#c7a6f2;border:0.5px solid rgba(124,108,255,0.35);}",
    ".px-ai-rpt-blocks-lbl{font-size:11px;color:#7a7887;margin:0 0 8px;}",
    ".px-ai-rpt-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;}",
    ".px-ai-rpt-chip{cursor:pointer;font-size:11px;padding:5px 11px;border-radius:999px;border:1px solid #2d2c36;background:#201f27;color:#7a7887;user-select:none;}",
    ".px-ai-rpt-chip.on{border-color:#8b5cf6;background:#241f36;color:#c7a6f2;}",
    ".px-ai-rpt-sec{margin-bottom:16px;position:relative;}",
    ".px-ai-rpt-sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}",
    ".px-ai-rpt-sec-ttl{font-size:12px;font-weight:700;color:#fff;margin:0;}",
    ".px-ai-rpt-remove{border:none;background:none;cursor:pointer;font-size:11px;color:#7a7887;font-family:inherit;padding:0;}",
    ".px-ai-rpt-remove:hover{color:#cfcdda;}",
    ".px-ai-rpt-draft-tag{display:inline-block;font-size:9px;color:#7a7887;border:1px solid #2d2c36;border-radius:999px;padding:1px 7px;margin-bottom:6px;}",
    ".px-ai-editable-block{border:1px dashed #35334a;border-radius:8px;padding:8px 10px;outline:none;font-size:12px;color:#cfcdda;line-height:1.8;margin-bottom:10px;}",
    ".px-ai-editable-block:hover{border-color:#4a4560;}",
    ".px-ai-editable-block:focus{border-color:#8b5cf6;background:#1c1a24;}",
    ".px-ai-quote-pos{border-left:2px solid #4ade80;padding:6px 0 6px 10px;font-size:11.5px;color:#cfcdda;margin-bottom:4px;}",
    ".px-ai-quote-neg{border-left:2px solid #f87171;padding:6px 0 6px 10px;font-size:11.5px;color:#cfcdda;margin-bottom:4px;}",
    ".px-ai-type-bar-row{margin-bottom:8px;}",
    ".px-ai-type-bar-meta{display:flex;justify-content:space-between;font-size:11px;color:#cfcdda;margin-bottom:3px;}",
    ".px-ai-type-bar-track{display:flex;height:6px;border-radius:3px;overflow:hidden;}",
    ".px-ai-type-bar-pos{background:#4ade80;}",
    ".px-ai-type-bar-neg{background:#f87171;}",
    ".px-ai-rpt-kpi-tbl{width:100%;font-size:11px;border-collapse:collapse;}",
    ".px-ai-rpt-kpi-tbl td{padding:5px 0;color:#a9a7b6;border-top:1px solid #2d2c36;}",
    ".px-ai-rpt-kpi-tbl td:last-child{text-align:right;color:#fff;font-weight:600;}",
    ".px-ai-rpt-kpi-tbl tr:first-child td{border-top:none;}",
    ".px-ai-rpt-out-card{border:0.5px solid rgba(148,163,184,0.14);border-radius:14px;background:rgba(255,255,255,0.03);padding:14px 16px;margin-top:18px;}",
    ".px-ai-rpt-actions{display:flex;gap:8px;margin-top:16px;}",
    ".px-ai-rpt-action-btn{border:1px solid #2d2c36;border-radius:10px;padding:7px 12px;cursor:pointer;background:#201f27;color:#cfcdda;font-size:12px;font-family:inherit;}",
    ".px-ai-rpt-action-btn:hover{border-color:#8b5cf6;color:#ddd6fe;}",
    ".px-ai-gen{border:none;background:linear-gradient(135deg,#6d5dfc,#5b46ff);color:#fff;font-size:13px;font-weight:700;padding:11px 16px;border-radius:12px;cursor:pointer;font-family:inherit;width:100%;margin-top:14px;box-shadow:0 10px 22px rgba(91,70,255,0.28);}",
    ".px-ai-gen:hover{filter:brightness(1.05);}",
    ".px-ai-rs{margin-top:18px;}",
    ".px-ai-rs-hd{font-size:14px;font-weight:600;color:var(--text-primary);border-bottom:0.5px solid var(--border);padding-bottom:6px;margin-bottom:10px;}",
    ".px-ai-rp{font-size:13px;color:var(--text-secondary);line-height:1.85;margin-bottom:8px;white-space:pre-line;}",
    ".px-ai-rt{width:100%;border-collapse:collapse;font-size:11.5px;margin-top:6px;margin-bottom:4px;}",
    ".px-ai-rt th{text-align:left;color:var(--text-muted);font-weight:600;padding:6px 6px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-rt td{padding:7px 6px;border-bottom:0.5px solid var(--border);color:var(--text-secondary);vertical-align:top;}",
    ".px-ai-rt td:last-child,.px-ai-rt th:last-child{text-align:right;}",
    ".px-ai-rt-cap{font-size:11px;color:var(--text-muted);margin:14px 0 4px;}",
    ".px-ai-copy-bar{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;padding-top:12px;border-top:0.5px solid var(--border);}",
    ".px-ai-copy-btn{border:0.5px solid var(--border-strong);background:rgba(255,255,255,0.03);color:var(--text-secondary);font-size:12px;font-weight:600;padding:7px 12px;border-radius:10px;cursor:pointer;font-family:inherit;}",
    ".px-ai-copy-btn:hover{border-color:var(--border-accent);color:#ddd6fe;background:var(--accent-soft);}",
    ".px-ai-sum-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:14px;padding:14px 0 16px;border-bottom:0.5px solid var(--border);}",
    ".px-ai-sum-left{min-width:0;}",
    ".px-ai-sum-right{min-width:0;}",
    ".px-ai-card{border:0.5px solid rgba(148,163,184,0.14);border-radius:14px;background:rgba(255,255,255,0.03);padding:14px 14px 12px;}",
    ".px-ai-card-hd{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px;}",
    ".px-ai-card-ttl{font-size:14px;font-weight:600;color:#f1f5f9;}",
    ".px-ai-card-sub{font-size:12px;color:var(--text-muted);}",
    ".px-ai-insight-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;}",
    ".px-ai-insight-col{padding:0 12px;border-right:0.5px solid rgba(148,163,184,0.12);min-width:0;}",
    ".px-ai-insight-col:first-child{padding-left:0;}",
    ".px-ai-insight-col:last-child{padding-right:0;border-right:none;}",
    ".px-ai-insight-k{font-size:11.5px;color:var(--text-muted);margin-bottom:8px;}",
    ".px-ai-insight-v{font-size:14px;font-weight:700;color:#f8fafc;line-height:1.35;margin-bottom:8px;}",
    ".px-ai-chip{display:inline-flex;align-items:center;font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px;line-height:1.3;}",
    ".px-ai-chip.h{background:rgba(248,113,113,0.14);color:#f87171;}",
    ".px-ai-chip.m{background:rgba(251,191,36,0.14);color:#fbbf24;}",
    ".px-ai-chip.l{background:rgba(74,222,128,0.12);color:#4ade80;}",
    ".px-ai-chip.info{background:rgba(148,163,184,0.12);color:#94a3b8;}",
    ".px-ai-metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;}",
    ".px-ai-metric{padding:4px 12px;border-right:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-metric:first-child{padding-left:0;}",
    ".px-ai-metric:last-child{padding-right:0;border-right:none;}",
    ".px-ai-metric-k{font-size:11.5px;color:var(--text-muted);margin-bottom:8px;}",
    ".px-ai-metric-v{font-size:22px;font-weight:700;color:#f8fafc;letter-spacing:-0.02em;line-height:1.1;}",
    ".px-ai-metric-d{font-size:12px;font-weight:600;margin-top:8px;}",
    ".px-ai-metric-d.bad{color:#f87171;}",
    ".px-ai-metric-d.good{color:#60a5fa;}",
    ".px-ai-metric-d.neu{color:#94a3b8;}",
    ".px-ai-kw-list{border-top:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-kw-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-kw-row:last-child{border-bottom:none;}",
    ".px-ai-kw-name{font-size:13px;color:#f1f5f9;}",
    ".px-ai-kw-delta{font-size:13px;font-weight:600;}",
    ".px-ai-kw-delta.good{color:#60a5fa;}",
    ".px-ai-kw-delta.bad{color:#f87171;}",
    ".px-ai-detail-sub{font-size:12px;font-weight:600;color:#93c5fd;margin-top:4px;}",
    ".px-ai-detail-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:22px 0 12px;}",
    ".px-ai-detail-title{font-size:16px;font-weight:700;color:#f8fafc;}",
    ".px-ai-detail-desc{font-size:12px;color:var(--text-muted);text-align:right;}",
    ".px-ai-ia-list{border:0.5px solid rgba(148,163,184,0.14);border-radius:14px;background:rgba(255,255,255,0.03);overflow:hidden;}",
    ".px-ai-ia-row{display:grid;grid-template-columns:1fr 1fr;gap:0;border-bottom:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-ia-row:last-child{border-bottom:none;}",
    ".px-ai-ia-cell{padding:14px 16px;min-width:0;}",
    ".px-ai-ia-cell:first-child{border-right:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-ia-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;}",
    ".px-ai-ia-name{font-size:13px;font-weight:700;color:#f8fafc;}",
    ".px-ai-ia-desc{font-size:12px;color:var(--text-secondary);line-height:1.55;}",
    ".px-ai-split{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;}",
    ".px-ai-change-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-change-row:last-child{border-bottom:none;}",
    ".px-ai-change-name{font-size:13px;color:#f1f5f9;}",
    ".px-ai-change-d{font-size:13px;font-weight:600;}",
    ".px-ai-change-d.up{color:#f87171;}",
    ".px-ai-change-d.dn{color:#60a5fa;}",
    ".px-ai-mon-item{padding:12px 0;border-bottom:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-mon-item:last-child{border-bottom:none;}",
    ".px-ai-mon-name{font-size:13px;font-weight:700;color:#f8fafc;margin-bottom:6px;}",
    ".px-ai-mon-line{font-size:12px;color:var(--text-secondary);line-height:1.55;}",
        ".px-ai-mon-line.dim{color:var(--text-muted);}",
    ".px-ai-catkw{display:grid;grid-template-columns:1fr 1fr;gap:0;}",
    ".px-ai-catkw-col{padding:0 14px;min-width:0;}",
    ".px-ai-catkw-col:first-child{padding-left:0;border-right:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-catkw-col:last-child{padding-right:0;}",
    ".px-ai-catkw-hd{font-size:12px;font-weight:600;color:var(--text-muted);padding-bottom:8px;margin-bottom:2px;}",
    ".px-ai-body-stack{display:flex;flex-direction:column;gap:14px;padding-top:14px;}",
    "@media (max-width:820px){.px-ai-sum-row,.px-ai-split,.px-ai-ia-row{grid-template-columns:1fr;}.px-ai-ia-cell:first-child{border-right:none;border-bottom:0.5px solid rgba(148,163,184,0.12);}.px-ai-insight-grid,.px-ai-metric-grid{grid-template-columns:1fr 1fr;}.px-ai-insight-col,.px-ai-metric{border-right:none;padding:8px 0;border-bottom:0.5px solid rgba(148,163,184,0.1);}}"
  ].join("");

  var VOC_CSS = [
    ".px-ai-root.px-ai-voc{background:#17171c;color:#e7e6ee;font-family:-apple-system,BlinkMacSystemFont,\"Apple SD Gothic Neo\",\"Malgun Gothic\",sans-serif;}",
    ".px-ai-root.px-ai-voc .px-ai-head{background:transparent;padding:0 0 0;}",
    ".px-ai-root.px-ai-voc .px-ai-scroll{padding:0;}",
    ".px-ai-voc-title{font-size:17px;font-weight:700;color:#fff;margin:0 0 2px;}",
    ".px-ai-voc-sub{font-size:11px;color:#9b99a8;margin:0;}",
    ".px-ai-root.px-ai-voc .px-ai-close{border:none;background:transparent;color:#9b99a8;width:auto;height:auto;font-size:16px;padding:0;}",
    ".px-ai-root.px-ai-voc .px-ai-tabs{border-bottom:1px solid #2d2c36;gap:18px;margin-top:14px;}",
    ".px-ai-root.px-ai-voc .px-ai-tab{color:#7a7887;padding:8px 2px 9px;border-bottom:2px solid transparent;font-size:13px;}",
    ".px-ai-root.px-ai-voc .px-ai-tab.on{color:#fff;border-bottom-color:#fff;}",
    ".px-ai-voc-body{margin-top:14px;}",
    ".px-ai-voc-loading{color:#7a7887;font-size:13px;padding:30px 0;text-align:center;margin:0;}",
    ".px-ai-voc-grid{display:grid;gap:16px;}",
    ".px-ai-root.px-ai-voc .px-ai-card{background:#201f27;border:1px solid #2d2c36;border-radius:10px;padding:14px 16px;margin-bottom:12px;}",
    ".px-ai-root.px-ai-voc .px-ai-card-hd{margin-bottom:10px;}",
    ".px-ai-root.px-ai-voc .px-ai-card-ttl{font-size:12px;font-weight:700;color:#cfcdda;}",
    ".px-ai-root.px-ai-voc .px-ai-card-sub{font-size:10px;color:#7a7887;}",
    ".px-ai-voc-sum{font-size:13px;line-height:1.8;color:#dcdae6;margin:0;white-space:pre-line;}",
    ".px-ai-root.px-ai-voc .px-ai-insight-k,.px-ai-root.px-ai-voc .px-ai-metric-k{font-size:10px;color:#7a7887;}",
    ".px-ai-root.px-ai-voc .px-ai-insight-v{font-size:13px;color:#fff;}",
    ".px-ai-root.px-ai-voc .px-ai-metric-v{font-size:22px;color:#fff;}",
    ".px-ai-root.px-ai-voc .px-ai-metric-d.bad{color:#f2949c;}",
    ".px-ai-root.px-ai-voc .px-ai-metric-d.good{color:#7ea6ff;}",
    ".px-ai-root.px-ai-voc .px-ai-metric-d.neu{color:#7a7887;}",
    ".px-ai-root.px-ai-voc .px-ai-chip.h{background:#3a1f24;color:#f2a6ad;}",
    ".px-ai-root.px-ai-voc .px-ai-chip.m{background:#3a341a;color:#e8c46a;}",
    ".px-ai-root.px-ai-voc .px-ai-chip.l{background:#1f2e2a;color:#7fd6b0;}",
    ".px-ai-root.px-ai-voc .px-ai-chip.info{background:#24303e;color:#8fb4e0;}",
    ".px-ai-root.px-ai-voc .px-ai-kw-delta.good{color:#7ea6ff;}",
    ".px-ai-root.px-ai-voc .px-ai-kw-delta.bad{color:#f2949c;}",
    ".px-ai-root.px-ai-voc .px-ai-catkw-hd{font-size:10px;color:#7a7887;font-weight:400;}",
    ".px-ai-root.px-ai-voc .px-ai-kw-name{font-size:12px;color:#cfcdda;}",
    ".px-ai-root.px-ai-voc .px-ai-kw-row{border-top:1px solid #2d2c36;padding:6px 0;}",
    ".px-ai-root.px-ai-voc .px-ai-kw-row:first-child{border-top:none;}",
    ".px-ai-root.px-ai-voc .px-ai-catkw-col:last-child{border-left:1px solid #2d2c36;padding-left:14px;}",
    ".px-ai-voc-detail-sub{font-size:11px;font-weight:700;margin:10px 0 0;}",
    ".px-ai-voc-detail-sub.pos{color:#7ea6ff;}",
    ".px-ai-voc-detail-sub.neg{color:#f2949c;margin-top:16px;}",
    ".px-ai-voc-col-labels{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:6px;font-size:10px;color:#7a7887;}",
    ".px-ai-voc-ia-card{border:1px solid #2d2c36;border-radius:10px;padding:12px 14px;margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:14px;}",
    ".px-ai-voc-ia-side-r{border-left:1px solid #2d2c36;padding-left:14px;}",
    ".px-ai-voc-ia-top{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;}",
    ".px-ai-voc-ia-name{font-size:12px;font-weight:700;color:#fff;}",
    ".px-ai-voc-ia-desc{font-size:11px;color:#a9a7b6;margin:0;line-height:1.6;}",
    ".px-ai-vbadge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;}",
    ".px-ai-vbadge-high{background:#3a1f24;color:#f2a6ad;}",
    ".px-ai-vbadge-mid{background:#3a341a;color:#e8c46a;}",
    ".px-ai-vbadge-low{background:#1f2e2a;color:#7fd6b0;}",
    ".px-ai-root.px-ai-voc .px-ai-change-d.up{color:#f2949c;}",
    ".px-ai-root.px-ai-voc .px-ai-change-d.dn{color:#7ea6ff;}",
    ".px-ai-root.px-ai-voc .px-ai-change-name{font-size:12px;color:#cfcdda;}",
    ".px-ai-root.px-ai-voc .px-ai-change-row{border-top:1px solid #2d2c36;padding:6px 0;}",
    ".px-ai-root.px-ai-voc .px-ai-mon-name{font-size:12px;color:#fff;}",
    ".px-ai-root.px-ai-voc .px-ai-mon-line{font-size:11px;color:#a9a7b6;}",
    ".px-ai-root.px-ai-voc .px-ai-mon-line.dim{font-size:10px;color:#7a7887;}",
    ".px-ai-root.px-ai-voc .px-ai-mon-item{border-top:1px solid #2d2c36;padding:8px 0;}",
    ".px-ai-root.px-ai-voc .px-ai-body-stack{gap:0;padding-top:0;}"
  ].join("");

  var STRENGTH_CSS = [
    ".px-ai-str-root{font-family:-apple-system,BlinkMacSystemFont,\"Apple SD Gothic Neo\",\"Malgun Gothic\",sans-serif;color:#1f1e1c;}",
    ".px-ai-str-card{border:1.5px solid #cfcdc5;border-radius:12px;padding:14px 16px;cursor:pointer;background:#fff;transition:border-color .15s,background .15s;}",
    ".px-ai-str-card.selected{border-color:#8b5cf6;background:#F4F1FE;}",
    ".px-ai-str-title{font-size:13px;font-weight:700;margin:0 0 4px;}",
    ".px-ai-str-desc{font-size:11px;color:#898781;line-height:1.5;margin:0;}",
    ".px-ai-str-btn{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;padding:9px 16px;border-radius:8px;border:none;cursor:pointer;background:linear-gradient(135deg,#6d5bd0,#8b5cf6);color:#fff;font-family:inherit;}",
    ".px-ai-str-close{color:#898781;cursor:pointer;font-size:16px;line-height:1;}",
    ".px-ai-str-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}"
  ].join("");

  function mountPxAiStrengthPicker(host, options) {
    if (!host) return function () {};
    options = options || {};
    var selected = options.level || "basic";
    host.innerHTML =
      '<style>' + STRENGTH_CSS + '</style>' +
      '<div class="px-ai-str-root">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">' +
          '<p style="font-size:16px;font-weight:700;margin:0">AI 분석 강도 선택</p>' +
          '<span class="px-ai-str-close" data-role="close" role="button" tabindex="0">✕</span>' +
        '</div>' +
        '<p style="font-size:12px;color:#898781;margin:0 0 18px">분석 깊이를 선택하면 그에 맞는 VOC 통계 분석 결과를 보여드립니다.</p>' +
        '<div class="px-ai-str-grid">' +
          '<div class="px-ai-str-card" data-strength="simple"><p class="px-ai-str-title">심플</p><p class="px-ai-str-desc">AI 요약, AI 인사이트, 핵심 지표 변화까지 확인합니다.</p></div>' +
          '<div class="px-ai-str-card" data-strength="basic"><p class="px-ai-str-title">기본</p><p class="px-ai-str-desc">심플 + 변화 키워드 TOP3, AI 상세 판단까지 확인합니다.</p></div>' +
          '<div class="px-ai-str-card" data-strength="deep"><p class="px-ai-str-title">고강도</p><p class="px-ai-str-desc">기본 + 부정률 변화 5개, 모니터링 2개까지 상세 확인합니다.</p></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end">' +
          '<button type="button" class="px-ai-str-btn" data-role="start">분석 시작</button>' +
        '</div>' +
      '</div>';
    var cards = host.querySelectorAll("[data-strength]");
    function pick(level) {
      selected = level;
      Array.prototype.forEach.call(cards, function (c) {
        c.classList.toggle("selected", c.getAttribute("data-strength") === level);
      });
    }
    Array.prototype.forEach.call(cards, function (c) {
      c.addEventListener("click", function () { pick(c.getAttribute("data-strength")); });
    });
    pick(selected);
    host.querySelector('[data-role="start"]').addEventListener("click", function () {
      if (typeof options.onStart === "function") options.onStart(selected);
    });
    var closeBtn = host.querySelector('[data-role="close"]');
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (typeof options.onClose === "function") options.onClose();
      });
    }
    return function () { host.innerHTML = ""; };
  }

  function surveyDataset() {
    return {
      periodText: "2026.07 · 전월 대비",
      title: "환자경험평가 분석",
      sum: {
        simple: "종합점수 81.27점, 전월 대비 +6.87점.\\n고점: 간호사 경험(87.14점) / 저점: 정서적 지지(62.89점).\\n정서적 지지 집중 개선이 필요합니다.",
        basic: "2026년 7월 환자경험평가 종합점수는 81.27점으로 전월 대비 +6.87점 상승했습니다. 응답자 9명, 7개 영역 중 5개 상승·2개 하락.\\n\\n고점은 간호사 경험(87.14점), 저점은 정서적 지지(62.89점)으로 위로·공감 문항이 주요 하락 원인입니다. 6병동과 심장혈관흉부외과의 하락폭이 가장 커 집중 관리가 필요합니다.\\n\\n⚠ 응답자 9명 — 소표본으로 단독 해석 시 유의가 필요합니다.",
        deep: "2026년 7월 환자경험평가 종합점수는 81.27점으로 전월 대비 +6.87점 상승했습니다. 응답자 9명, 7개 영역 중 5개 상승·2개 하락.\\n\\n고점은 간호사 경험(87.14점), 저점은 정서적 지지(62.89점)으로 위로·공감 문항이 주요 하락 원인입니다. 6병동(57.52점, -16.81점)과 심장혈관흉부외과(-16.63점)의 하락폭이 가장 커 집중 관리가 필요합니다.\\n\\n문항별로는 문13(귀하 질환 위로·공감, 57.52점, 부정 42%)이 전체 최저이며, 부정 응답 비율이 3개월 연속 상승 중입니다. 수가 가감산 반영 항목인 정서적 지지·전반적 평가 영역의 동반 하락으로 즉각적인 개선 조치가 필요합니다.\\n\\n⚠ 응답자 9명 — 소표본으로 단독 해석 시 유의가 필요합니다."
      },
      stats: [
        { k: "종합점수", v: "81.27점", d: "+6.87점", up: true },
        { k: "응답자 수", v: "9명", d: "소표본 주의", up: false },
        { k: "고점 영역", v: "간호사 경험", d: "+12.67점", up: true },
        { k: "저점 영역", v: "정서적 지지", d: "-11.77점", up: false }
      ],
      areas: [
        { name: "간호사 경험", score: "87.14", delta: "+12.67", eval: "상위" },
        { name: "의사 경험", score: "83.42", delta: "+8.76", eval: "양호" },
        { name: "투약·치료", score: "78.98", delta: "+4.53", eval: "보통" },
        { name: "병원 환경", score: "81.56", delta: "+7.12", eval: "양호" },
        { name: "환자 권리", score: "86.31", delta: "+11.69", eval: "상위" },
        { name: "정서적 지지", score: "62.89", delta: "-11.77", eval: "⚠ 최하위" },
        { name: "전반적 평가", score: "66.67", delta: "-6.40", eval: "하락" }
      ],
      issues: [
        ["h", "심각도 높음", "정서적 지지 하락", "62.89점으로 전 영역 최하위. 위로·공감 문항이 주요 하락 원인입니다."],
        ["m", "심각도 보통", "전반적인 평가 하락", "전월 대비 하락세 지속. 입원 경험 만족도 관리가 필요합니다."],
        ["h", "심각도 높음", "6병동 점수 이상", "전 병동 최저 점수, 전월 대비 하락폭도 가장 큽니다."],
        ["h", "심각도 높음", "심장혈관흉부외과", "진료과 중 하락폭 최대. 특화 개선 대책이 필요합니다."],
        ["l", "심각도 낮음", "투약 및 치료 과정", "상대적 저점 유지. 지속 모니터링이 필요합니다."]
      ],
      actions: [
        { pri: "즉시", task: "정서적 지지 교육 강화", detail: "의료진 위로·공감 역량 교육 및 커뮤니케이션 개선 프로그램 도입", deadline: "8월 중" },
        { pri: "즉시", task: "6병동 집중 관리", detail: "하락 원인 분석 후 병동별 맞춤 서비스 개선 계획 수립", deadline: "8~9월" },
        { pri: "단기", task: "입원 경험 개선", detail: "저점 원인 분석 후 환자 중심 서비스 개선 추진", deadline: "9월" },
        { pri: "단기", task: "진료과별 점검", detail: "심장혈관흉부외과 서비스 현황 점검 및 특화 대응 마련", deadline: "8월" },
        { pri: "중기", task: "투약 설명 강화", detail: "투약·치료 과정 커뮤니케이션 표준화 프로토콜 적용", deadline: "9월" }
      ],
      top: [
        { no: "문19", name: "진료 재이용 의향", delta: "+20.0점", score: "94.50점" },
        { no: "문1", name: "의사의 예의 바른 태도", delta: "+14.8점", score: "89.00점" },
        { no: "문16", name: "안전한 병원 환경", delta: "+14.6점", score: "89.00점" }
      ],
      low: [
        { no: "문13", name: "귀하 질환 위로·공감", delta: "-16.6점", score: "57.52점", neg: "부정 42%" },
        { no: "문14", name: "의료진 공감 표현", delta: "-12.3점", score: "62.89점", neg: "부정 37%" },
        { no: "문20", name: "전반적 입원 만족도", delta: "-6.4점", score: "66.67점", neg: "부정 28%" }
      ],
      priority: [
        ["문13", "귀하 질환 위로·공감", "57.52점", "정서적 지지 핵심 문항 / 전체 평균 -23점"],
        ["문14", "의료진 공감 표현", "62.89점", "부정 응답 비율 37%"],
        ["문20", "전반적 입원 만족도", "66.67점", "종합 평가 문항 / 하락 지속 시 전체 영향"]
      ],
      drops: [
        ["h", "경보", "문13", "귀하 질환 위로·공감", "3회 연속", "-2.1 → -4.3 → -16.6점"],
        ["m", "주의", "문20", "전반적 입원 만족도", "2회 연속", "-1.8 → -6.4점"],
        ["m", "주의", "문7", "투약 부작용 설명", "2회 연속", "-0.9 → -3.2점"]
      ],
      wards: [
        { name: "6병동", score: "57.52", delta: "-16.81점", st: "위험" },
        { name: "8B병동", score: "68.30", delta: "-5.20점", st: "주의" },
        { name: "7A병동", score: "84.10", delta: "+3.40점", st: "양호" },
        { name: "ICU", score: "88.60", delta: "+1.20점", st: "양호" }
      ],
      depts: [
        { name: "심장혈관흉부외과", score: "57.52", delta: "-16.63점", st: "위험" },
        { name: "신경외과", score: "70.11", delta: "-4.10점", st: "주의" },
        { name: "소화기내과", score: "83.42", delta: "+8.76점", st: "양호" }
      ],
      monitors: [
        ["정서적 지지", "위로·공감 문항", "65점 이상 유지 · 월 1회 점검"],
        ["6병동 종합점수", "병동별 추이", "전월 대비 하락폭 5점 이내"],
        ["전반적 평가", "입원 경험 문항", "70점 이상 안정화"]
      ],
      linked: [
        { name: "정서적 지지", note: "수가 가감산 연관", delta: "-11.77점", up: false },
        { name: "투약·치료", note: "수가 가감산 연관", delta: "+4.53점", up: true },
        { name: "전반적 평가", note: "수가 가감산 연관", delta: "-6.40점", up: false }
      ],
      dist: [
        { name: "정서적 지지", neg: 42 },
        { name: "전반적 평가", neg: 28 },
        { name: "투약·치료", neg: 18 },
        { name: "의사 경험", neg: 12 }
      ],
      insight: {
        signal: { label: "주요 신호", value: "정서적 지지", chip: "우선개선 필요", tone: "h" },
        action: { label: "권장 조치", value: "위로·공감 교육 강화", chip: "우선 실행 권장", tone: "m" },
        monitor: { label: "모니터링", value: "정서적 지지 점수", chip: "65점 이상 유지 여부", tone: "info" }
      },
      metricChanges: [
        { k: "종합점수", v: "81.27점", d: "▲6.87점", tone: "good" },
        { k: "응답자 수", v: "9명", d: "소표본 주의", tone: "neu" },
        { k: "저점 영역", v: "62.89점", d: "▼11.77점", tone: "bad" },
        { k: "고점 영역", v: "87.14점", d: "▲12.67점", tone: "good" }
      ],
      positiveKeywords: [
        { name: "친절한 응대", delta: "+14.8점" },
        { name: "안전한 환경", delta: "+14.6점" },
        { name: "재이용 의향", delta: "+20.0점" }
      ],
      negativeKeywords: [
        { name: "위로·공감 부족", delta: "-16.6점" },
        { name: "입원 만족도 하락", delta: "-6.4점" },
        { name: "투약 설명 미흡", delta: "-3.2점" }
      ],
      positiveIssueActions: [
        { sev: "h", sevLabel: "개선도 높음", issue: "간호사 경험 - 예의·응대", issueDesc: "간호사 경험 영역이 고점으로 상승하며 전반 만족도에 기여합니다.", pri: "m", priLabel: "우선순위 보통", action: "우수 간호 사례 확산", actionDesc: "고득점 병동의 응대 사례를 공유해 서비스 품질을 상향 평준화하십시오." },
        { sev: "h", sevLabel: "개선도 높음", issue: "환자 권리 - 설명", issueDesc: "환자 권리 영역 점수가 크게 상승했습니다.", pri: "m", priLabel: "우선순위 보통", action: "설명 우수사례 공유", actionDesc: "권리·설명 관련 우수 스크립트를 표준 교육에 반영하십시오." },
        { sev: "m", sevLabel: "개선도 보통", issue: "의사 경험 - 태도", issueDesc: "의사 경험 점수가 양호하게 상승 중입니다.", pri: "m", priLabel: "우선순위 보통", action: "커뮤니케이션 유지", actionDesc: "현행 커뮤니케이션 교육을 유지하고 분기 점검을 이어가십시오." },
        { sev: "l", sevLabel: "개선도 낮음", issue: "병원 환경 - 안전", issueDesc: "안전한 환경 문항이 상위권을 유지합니다.", pri: "l", priLabel: "우선순위 낮음", action: "환경 관리 유지", actionDesc: "현재 환경 관리 수준을 유지하고 정기 점검을 지속하십시오." },
        { sev: "l", sevLabel: "개선도 낮음", issue: "투약·치료 - 설명", issueDesc: "투약·치료 영역은 소폭 상승했으나 상대적 저점입니다.", pri: "l", priLabel: "우선순위 낮음", action: "설명 프로토콜 유지", actionDesc: "투약 설명 표준화를 유지하며 모니터링하십시오." }
      ],
      negativeIssueActions: [
        { sev: "h", sevLabel: "심각도 높음", issue: "정서적 지지 - 위로·공감", issueDesc: "정서적 지지 62.89점으로 전 영역 최하위이며 위로·공감 문항이 하락을 견인합니다.", pri: "h", priLabel: "우선순위 높음", action: "위로·공감 교육 강화", actionDesc: "의료진 커뮤니케이션 교육을 착수하고 체크리스트를 적용하십시오." },
        { sev: "h", sevLabel: "심각도 높음", issue: "6병동 점수 이상", issueDesc: "6병동이 전 병동 최저이며 전월 대비 하락폭도 가장 큽니다.", pri: "h", priLabel: "우선순위 높음", action: "6병동 집중 관리", actionDesc: "하락 원인 인터뷰 후 병동 맞춤 개선 계획을 수립하십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "전반적 평가 하락", issueDesc: "전반적 평가 66.67점으로 하락세가 지속되고 있습니다.", pri: "m", priLabel: "우선순위 보통", action: "입원 경험 개선", actionDesc: "저점 원인 분석 후 환자 중심 서비스 개선을 추진하십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "심장혈관흉부외과", issueDesc: "진료과 중 하락폭이 최대입니다.", pri: "m", priLabel: "우선순위 보통", action: "진료과별 점검", actionDesc: "서비스 현황 점검과 특화 대응안을 마련하십시오." },
        { sev: "l", sevLabel: "심각도 낮음", issue: "투약 및 치료 과정", issueDesc: "상대적 저점이 유지되어 지속 관찰이 필요합니다.", pri: "l", priLabel: "우선순위 낮음", action: "투약 설명 강화", actionDesc: "투약·치료 과정 커뮤니케이션 표준화 프로토콜을 적용하십시오." }
      ],
      keyChanges: [
        { name: "간호사 경험", delta: "▲12.67점", up: false },
        { name: "환자 권리", delta: "▲11.69점", up: false },
        { name: "의사 경험", delta: "▲8.76점", up: false },
        { name: "전반적 평가", delta: "▼6.40점", up: true },
        { name: "정서적 지지", delta: "▼11.77점", up: true }
      ],
      changeSectionTitle: "영역 점수 변화",
      detailMonitors: [
        { name: "정서적 지지", avg: "위로·공감 문항 기준 직전 3회 추이 점검", criteria: "확인 기준: 65점 이상 · 목표: 다음 회차까지 정상 범위 복귀" },
        { name: "6병동 종합점수", avg: "전월 대비 하락폭 모니터링", criteria: "확인 기준: 하락폭 5점 이내 · 목표: 8~9월 집중 관리 후 안정화" }
      ],
      reportPrefix: "환자경험평가"
    };
  }

  function vocDataset() {
    return {
      periodText: "2026-07 기준 전월 대비 분석",
      title: "VOC AI 상세 분석",
      sum: {
        simple: "2026년 7월 VOC 종합 부정률은 43.7%로 전월 대비 1.1%p 상승했으며, 접수 건수는 8,323건으로 전월 대비 214건 늘었습니다. 부서칭찬 420건, 직원칭찬 820건으로 현장 서비스에 대한 긍정 평가도 함께 증가해, 전반적으로는 만족도 둔화와 긍정 반응 증가가 동시에 나타난 한 달이었습니다.",
        basic: "2026년 7월 VOC 종합 부정률은 43.7%로 전월 대비 1.1%p 상승했습니다. 시스템 및 서비스 유형은 '예약 절차 복잡' 언급이 9건 늘며 부정률 상승을 견인했고, 비용관련 유형도 '비용 부담' 언급 증가로 부정률이 함께 올랐습니다. 반면 인적응대관련 유형은 '친절함'(+8건) 언급 증가로 개선되었고, 서비스제공관련 유형도 '세심함'(+6건) 언급 증가로 개선세를 보였습니다. 환자안전 플래그는 12건으로 전월 대비 3건 늘어 주의가 필요합니다.",
        deep: "2026년 7월 VOC 종합 부정률은 43.7%로 전월 대비 1.1%p 상승했습니다. 시스템 및 서비스 유형은 '예약 절차 복잡' 언급 증가로 부정률이 4.2%p 상승했고, 비용관련 유형도 '비용 부담' 언급이 늘며 부정률이 올라 두 유형 모두 심각도 '높음'으로 분류되었습니다. 반면 인적응대관련 유형은 '친절함'(+8건) 언급 증가로 2.1%p 개선되었고, 서비스제공관련 유형도 '세심함'(+6건) 언급 증가로 1.8%p 개선되어 유형 간 온도차가 뚜렷했습니다. 비용관련·시스템 및 서비스 유형은 1개월 내 부정률이 각각 41.7%, 58.6% 이하로 복귀하는지 모니터링이 필요한 우선 관리 대상입니다."
      },
      stats: [
        { k: "접수된 VOC", v: "8,323건", d: "+214건", up: true },
        { k: "언급된 VOC", v: "9,120건", d: "+340건", up: true },
        { k: "평균 태그 수", v: "1.10개", d: "+0.02개", up: true },
        { k: "부서칭찬", v: "420건", d: "+18건", up: true },
        { k: "직원칭찬", v: "820건", d: "+32건", up: true }
      ],
      areas: [
        { name: "친절/응대", score: "28%", delta: "+2.1%p", eval: "긍정 우세" },
        { name: "설명/안내", score: "18%", delta: "+0.4%p", eval: "보통" },
        { name: "대기/프로세스", score: "16%", delta: "-1.2%p", eval: "개선" },
        { name: "시설/환경", score: "14%", delta: "+1.8%p", eval: "주의" },
        { name: "비용/행정", score: "12%", delta: "+2.4%p", eval: "⚠ 부정↑" },
        { name: "시스템/앱", score: "7%", delta: "+3.1%p", eval: "급증" },
        { name: "기타/미분류", score: "5%", delta: "+0.8%p", eval: "점검" }
      ],
      issues: [
        ["h", "심각도 높음", "비용관련 부정률", "비용·행정 유형 부정 응답 비중이 전월 대비 상승했습니다."],
        ["h", "심각도 높음", "시스템 이슈 급증", "앱/시스템 관련 VOC가 단기간에 증가했습니다."],
        ["m", "심각도 보통", "미분류 VOC", "키워드 미매핑 건이 남아 자동분석 정확도에 영향을 줍니다."],
        ["m", "심각도 보통", "소음 불편 지속", "병동 소음 키워드가 연속 증가 추세입니다."],
        ["l", "심각도 낮음", "주차 불편", "방문객 주차 불편 언급이 유지되고 있습니다."]
      ],
      actions: [
        { pri: "즉시", task: "비용 안내 강화", detail: "진료비·비급여 안내 스크립트 표준화", deadline: "8월 중" },
        { pri: "즉시", task: "시스템 장애 대응", detail: "앱 VOC 급증 원인 점검 및 핫픽스 일정 공유", deadline: "즉시~1주" },
        { pri: "단기", task: "소음 관리", detail: "야간 소음 모니터링 및 병동별 안내 강화", deadline: "8~9월" },
        { pri: "단기", task: "미분류 키워드 정리", detail: "미매핑 VOC 키워드 사전 업데이트", deadline: "8월" },
        { pri: "중기", task: "주차 동선 개선", detail: "방문객 주차 안내·예약 프로세스 점검", deadline: "9월" }
      ],
      top: [
        { no: "친절", name: "응대 칭찬", delta: "+42건", score: "1,120건", type: "칭찬" },
        { no: "설명", name: "안내 칭찬", delta: "+28건", score: "640건", type: "칭찬" },
        { no: "배려", name: "케어 칭찬", delta: "+19건", score: "510건", type: "칭찬" }
      ],
      low: [
        { no: "소음", name: "병동 소음", delta: "+36건", score: "120건", type: "불편", neg: "연속 증가" },
        { no: "주차", name: "주차 불편", delta: "+22건", score: "60건", type: "불편", neg: "방문객" },
        { no: "대기", name: "대기 시간", delta: "+14건", score: "88건", type: "불편", neg: "외래" }
      ],
      priority: [
        ["소음", "병동 소음", "120건", "3회 연속 증가 / 야간 불편 비중 높음"],
        ["주차", "주차 불편", "60건", "방문객 동선·안내 이슈"],
        ["비용", "비용 안내", "부정률↑", "행정 안내 누락 관련 부정 응답 증가"]
      ],
      drops: [
        ["h", "경보", "소음", "병동 소음", "3회 연속 증가", "88 → 102 → 120건"],
        ["m", "주의", "주차", "주차 불편", "2회 연속 증가", "48 → 60건"],
        ["m", "주의", "시스템", "앱 오류", "2회 연속 증가", "35 → 52건"]
      ],
      wards: [
        { name: "12병동", score: "18%", delta: "+3.2%p", st: "위험" },
        { name: "6병동", score: "15%", delta: "+2.1%p", st: "주의" },
        { name: "7A병동", score: "9%", delta: "-0.8%p", st: "양호" },
        { name: "ICU", score: "7%", delta: "-1.1%p", st: "양호" }
      ],
      depts: [
        { name: "정형외과", score: "16%", delta: "+2.4%p", st: "주의" },
        { name: "내과", score: "11%", delta: "+0.6%p", st: "보통" },
        { name: "외과", score: "8%", delta: "-0.4%p", st: "양호" }
      ],
      monitors: [
        ["소음 불편 건수", "키워드 추이", "전월 대비 증가폭 10% 이내"],
        ["비용 부정률", "유형별 분포", "부정 비율 전월 대비 하락"],
        ["미분류 VOC", "키워드 매핑", "미분류 비중 3% 이하"]
      ],
      linked: [
        { name: "칭찬", note: "유형 분포", delta: "+1.8%p", up: true, bar: 58 },
        { name: "불편", note: "유형 분포", delta: "+0.9%p", up: false, bar: 34 },
        { name: "건의/기타", note: "유형 분포", delta: "-0.4%p", up: true, bar: 8 }
      ],
      dist: [
        { name: "비용/행정", neg: 41 },
        { name: "시설/환경", neg: 36 },
        { name: "시스템/앱", neg: 33 },
        { name: "대기/프로세스", neg: 22 }
      ],
      insight: {
        signal: { label: "주요 신호", value: "시스템 및 서비스", chip: "우선개선 필요", tone: "h" },
        action: { label: "권장 조치", value: "예약 절차 개선", chip: "우선 실행 권장", tone: "m" },
        monitor: { label: "모니터링", value: "시스템 및 서비스 부정률", chip: "부정률 상승 · 60% 이하 유지 여부", tone: "info" }
      },
      metricChanges: [
        { k: "전체 부정률", v: "43.7%", d: "▲1.1%p", tone: "bad" },
        { k: "접수된 VOC 건수", v: "8,323건", d: "▲214건", tone: "neu" },
        { k: "환자안전 플래그", v: "12건", d: "▲3건", tone: "bad" },
        { k: "직원칭찬 건수", v: "820건", d: "▲32건", tone: "good" }
      ],
      positiveKeywords: [
        { name: "친절함", delta: "+8건" },
        { name: "세심함", delta: "+6건" },
        { name: "신속 응대", delta: "+5건" }
      ],
      negativeKeywords: [
        { name: "예약 절차 복잡", delta: "+9건" },
        { name: "대기시간", delta: "+7건" },
        { name: "통증 조절 부족", delta: "+6건" }
      ],
      positiveIssueActions: [
        { sev: "h", sevLabel: "개선도 높음", issue: "인적응대관련 - 친절함", issueDesc: "친절함 키워드 언급이 전월 대비 크게 증가했습니다. 인적응대관련 유형의 긍정 비율 상승에 기여합니다.", pri: "m", priLabel: "우선순위 보통", action: "우수 사례 확산", actionDesc: "친절 응대 우수 사례를 병원 전체에 공유해 서비스 품질을 상향 평준화하십시오." },
        { sev: "h", sevLabel: "개선도 높음", issue: "인적응대관련 - 세심함", issueDesc: "세심함 관련 칭찬이 증가하며 환자 체감 서비스 품질이 개선되고 있습니다.", pri: "m", priLabel: "우선순위 보통", action: "세심 케어 가이드 공유", actionDesc: "세심 응대 포인트를 병동·외래 가이드로 정리해 전파하십시오." },
        { sev: "m", sevLabel: "개선도 보통", issue: "서비스제공관련 - 신속 응대", issueDesc: "신속 응대 키워드가 증가해 대기·호출 대응 인식이 개선되었습니다.", pri: "m", priLabel: "우선순위 보통", action: "응대 SLA 유지", actionDesc: "호출·문의 응답 기준을 유지하고 우수 응대 사례를 공유하십시오." },
        { sev: "l", sevLabel: "개선도 낮음", issue: "환경관련 - 병실 청결", issueDesc: "병실 청결 키워드 언급이 증가하며 환경관련 유형의 긍정 비율이 소폭 개선되었습니다.", pri: "l", priLabel: "우선순위 낮음", action: "청결 관리 유지", actionDesc: "현재 수준의 청소 주기를 유지하고 정기 점검을 지속하십시오." },
        { sev: "l", sevLabel: "개선도 낮음", issue: "서비스제공관련 - 설명 충분", issueDesc: "설명 충분 관련 긍정 언급이 소폭 증가했습니다.", pri: "l", priLabel: "우선순위 낮음", action: "설명 스크립트 유지", actionDesc: "현행 설명 스크립트를 유지하고 분기별 점검을 이어가십시오." }
      ],
      negativeIssueActions: [
        { sev: "h", sevLabel: "심각도 높음", issue: "비용관련 - 비용 부담", issueDesc: "비용 부담 관련 부정 VOC가 전월 대비 증가했습니다. 비급여·추가비용 사전 안내 강화가 필요합니다.", pri: "h", priLabel: "우선순위 높음", action: "비용 안내 강화", actionDesc: "진료·수납 절차의 사전 안내를 강화하고 설명 체크리스트를 적용하십시오." },
        { sev: "h", sevLabel: "심각도 높음", issue: "시스템 및 서비스 - 예약 절차 복잡", issueDesc: "예약 절차 복잡 키워드와 시스템 부정률이 동반 상승했습니다.", pri: "h", priLabel: "우선순위 높음", action: "예약 절차 개선", actionDesc: "예약 동선·화면 안내를 단순화하고 오류 VOC 핫픽스 일정을 공유하십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "환경관련 - 소음", issueDesc: "소음 관련 불편이 지속되어 병동 환경 체감에 영향을 줍니다.", pri: "m", priLabel: "우선순위 보통", action: "야간 소음 관리", actionDesc: "야간 소음 안내와 병동별 점검 루틴을 강화하십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "인적응대관련 - 응대 지연", issueDesc: "응대 지연 관련 부정이 증가하며 체감 대기·호출 불만이 커졌습니다.", pri: "m", priLabel: "우선순위 보통", action: "응대 지연 개선", actionDesc: "호출 응답 기준을 재확인하고 중간 안내 문구를 표준화하십시오." },
        { sev: "l", sevLabel: "심각도 낮음", issue: "환경관련 - 주차 불편", issueDesc: "주차 불편 언급이 유지되고 있어 방문객 동선 안내가 필요합니다.", pri: "l", priLabel: "우선순위 낮음", action: "주차 안내 보강", actionDesc: "방문객 주차 안내·예약 프로세스를 점검하고 안내물을 보강하십시오." }
      ],
      keyChanges: [
        { name: "인적응대관련", delta: "▼2.1%p", up: false },
        { name: "서비스제공관련", delta: "▼1.8%p", up: false },
        { name: "환경관련", delta: "▼0.9%p", up: false },
        { name: "시스템 및 서비스", delta: "▲4.2%p", up: true },
        { name: "비용관련", delta: "▲0.6%p", up: true }
      ],
      detailMonitors: [
        { name: "비용관련 - 비용 부담", avg: "직전 6개월 평균 부정률 38.5% ± 표준편차 3.2%p", criteria: "확인 기준: 부정률이 41.7% 이하로 복귀 여부 · 목표: 1개월 내 정상 범위 복귀" },
        { name: "시스템 및 서비스 - 예약 절차", avg: "직전 6개월 평균 부정률 29.8% ± 표준편차 2.7%p", criteria: "확인 기준: 부정률 60% 이하 유지 · 목표: 예약 복잡 키워드 전월 대비 감소" }
      ],
      reportBlockDefs: [
        { key: "overview", name: "개요" },
        { key: "kpi", name: "핵심 지표" },
        { key: "dist", name: "유형별 분포" },
        { key: "keywords", name: "변화 키워드 TOP3" },
        { key: "issues", name: "주요 이슈 및 권장 조치" },
        { key: "plan", name: "개선 액션 플랜" },
        { key: "quotes", name: "원문 및 인사이트" }
      ],
      reportDefaultBlocks: {
        simple: ["overview", "kpi"],
        basic: ["overview", "kpi", "dist", "keywords", "issues"],
        deep: ["overview", "kpi", "dist", "keywords", "issues", "plan", "quotes"]
      },
      reportOverview: {
        simple: "2026년 6월 VOC 종합 부정률은 43.7%로 전월 대비 1.1%p 상승했습니다. 접수 건수는 8,323건으로 전월보다 소폭 늘었습니다.",
        basic: "2026년 6월 접수된 VOC는 8,323건이며, 종합 부정률은 43.7%로 전월 대비 1.1%p 상승했습니다. 시스템 및 서비스 유형에서 '예약 절차 복잡' 관련 언급이 늘며 부정률 상승을 견인했고, 반대로 인적응대관련·서비스제공관련 유형은 친절함·세심함 키워드를 중심으로 개선되었습니다. 부서칭찬 420건, 직원칭찬 820건으로 현장 서비스에 대한 긍정 평가도 전월 대비 늘어난 점이 함께 확인됩니다.",
        deep: "2026년 6월 한 달간 접수된 VOC는 총 8,323건으로 전월 대비 214건 증가했으며, 이 중 종합 부정률은 43.7%로 전월 대비 1.1%p 상승해 전반적인 만족도 흐름이 다소 둔화되는 모습을 보였습니다. 8개 유형 가운데 시스템 및 서비스 유형의 부정률 상승폭이 4.2%p로 가장 두드러졌으며, 이는 '예약 절차 복잡' 키워드 언급이 단기간에 집중되면서 나타난 결과로 분석됩니다. 반면 인적응대관련 유형은 '친절함' 키워드 언급 증가에 힘입어 부정률이 2.1%p 개선되었고, 서비스제공관련 유형 역시 '세심함' 키워드를 중심으로 1.4%p 개선되는 등 일부 영역에서는 뚜렷한 긍정 신호가 함께 관찰된 한 달이었습니다."
      },
      reportDrafts: {
        kpi: "이번 달 접수된 VOC 건수는 8,323건으로 전월 대비 214건 증가했으며, 실제 카테고리에 태깅된 언급 건수는 9,120건으로 접수 건수보다 많습니다. 종합 부정률은 43.7%로 전월 대비 1.1%p 상승했고, 부서칭찬은 420건(전월 대비 +18건), 직원칭찬은 820건(전월 대비 +32건)으로 현장 서비스에 대한 긍정 반응도 함께 증가했습니다.",
        dist: "8개 유형 가운데 긍정 비율이 가장 높은 유형은 인적응대관련(67%)이며, 그 뒤를 서비스제공관련(66%)이 잇고 있어 사람 중심 서비스 영역에서 안정적인 만족도를 확보하고 있는 것으로 보입니다. 반대로 부정 비율이 가장 높은 유형은 비용관련(75%)이며, 시스템 및 서비스 유형(62%)도 절반을 크게 웃도는 부정 비율을 보여 두 영역에 대한 우선적인 개선 검토가 필요합니다.",
        keywords: "긍정 키워드 중에서는 '친절함'(+8건), '세심함'(+6건), '신속 응대'(+5건) 순으로 언급이 늘었으며, 이는 대부분 간호·안내 응대 과정에서 반복적으로 나타난 표현입니다. 부정 키워드 중에서는 '예약 절차 복잡'(+9건), '대기시간'(+7건), '통증 조절 부족'(+6건) 순으로 증가폭이 컸으며, 특히 '예약 절차 복잡'은 시스템 및 서비스 유형 부정률 상승과 직접적으로 연결되는 핵심 원인으로 확인됩니다.",
        issues: "긍정 이슈로는 인적응대관련 유형의 '친절함' 언급 증가와 서비스제공관련 유형의 '세심함' 언급 증가가 두드러지며, 이는 최근 현장 응대 교육 및 서비스 개선 노력이 실제 지표 개선으로 이어지고 있음을 시사합니다. 부정 이슈로는 비용관련 유형의 '비용 부담' 언급 상승과 시스템 및 서비스 유형의 '예약 절차 복잡' 언급 급증이 심각도 '높음'으로 분류되어 우선 대응이 필요합니다.",
        plan: "가장 시급한 과제는 비용 안내 강화와 예약 시스템 개선으로, 두 과제 모두 심각도 '높음'으로 분류된 이슈에서 도출되었으며 1~2개월 내 착수를 목표로 합니다. 소음 저감 조치와 응대 인력 재배치 검토는 중간 우선순위 과제로 2개월 내 원인 분석과 개선안 마련을 병행하는 것을 권고합니다.",
        quotes: "긍정 원문에서는 간호사·의료진의 친절한 응대와 세심한 설명을 언급하는 표현이 반복적으로 나타나며, 이는 인적응대관련 유형의 긍정 비율 상승을 뒷받침하는 실제 근거로 볼 수 있습니다. 반면 개선 제안 원문에서는 예약 절차의 복잡성과 대기시간에 대한 불편이 가장 빈번하게 언급되었으며, 통증 조절이나 병동 소음처럼 입원 생활 전반의 쾌적함과 관련된 의견도 함께 나타났습니다."
      },
      typeSentiment: [
        { type: "진료 및 치료·검사관련", pos: 50, neg: 50 },
        { type: "인적응대관련", pos: 67, neg: 33 },
        { type: "서비스제공관련", pos: 66, neg: 34 },
        { type: "시스템 및 서비스", pos: 38, neg: 62 },
        { type: "환경관련", pos: 57, neg: 43 },
        { type: "비용관련", pos: 25, neg: 75 },
        { type: "기타문의", pos: 35, neg: 65 }
      ],
      actionPlanRows: [
        ["높음", "비용 안내 강화", "1개월 내"],
        ["높음", "예약 시스템 개선", "2개월 내"],
        ["보통", "소음 저감 조치", "1개월 내"],
        ["보통", "응대 인력 재배치 검토", "2개월 내"],
        ["낮음", "주차 안내 강화", "3개월 내"]
      ],
      posQuotes: [
        "간호사분들이 정말 친절하고 세심하게 챙겨주셨어요.", "회진 시 의사 선생님 설명이 이해하기 쉬웠습니다.",
        "병실이 항상 깨끗하게 관리되어 있었어요.", "호출벨을 누르면 응답이 빨랐습니다.",
        "수납 절차가 명확하게 안내되어 편했어요.", "검사 전 주의사항을 자세히 알려주셔서 좋았습니다.",
        "퇴원 후 관리 방법을 꼼꼼히 설명해 주셨어요.", "직원분들이 항상 웃으며 응대해 주셔서 감사했습니다.",
        "대기 중에도 진행 상황을 안내해 주셔서 불안하지 않았어요.", "전반적으로 신뢰가 가는 진료였습니다."
      ],
      negQuotes: [
        "예약 절차가 너무 복잡해서 혼란스러웠습니다.", "대기시간이 안내보다 훨씬 길었어요.",
        "통증 조절이 충분히 되지 않아 힘들었습니다.", "병동 소음이 심해서 잠을 설쳤어요.",
        "호출 후 응대까지 시간이 오래 걸렸습니다.", "주차 공간을 찾기 어려웠어요.",
        "수납 대기 줄이 너무 길었습니다.", "안내 표지판이 부족해 길을 헤맸어요.",
        "비용 안내가 사전에 충분하지 않았습니다.", "일부 직원분의 응대가 다소 사무적으로 느껴졌어요."
      ],
      reportPrefix: "VOC 통계"
    };
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applySnapshot(data, snap) {
    if (!snap) return data;
    var next = Object.assign({}, data);
    if (snap.periodText) next.periodText = snap.periodText;
    if (snap.pxKpiSummary || snap.kpi) {
      var k = snap.pxKpiSummary || snap.kpi;
      var stats = (next.stats || []).slice();
      if (k.avgScore != null && stats[0]) {
        stats[0] = Object.assign({}, stats[0], {
          v: Number(k.avgScore).toFixed(2) + "점",
          d: (k.changeScore > 0 ? "+" : "") + Number(k.changeScore || 0).toFixed(2) + "점",
          up: Number(k.changeScore || 0) >= 0
        });
      }
      if (k.total != null && stats[1]) {
        stats[1] = Object.assign({}, stats[1], { v: k.total + "명" });
      }
      next.stats = stats;
    }
    if (snap.pxTopBottomAnalysis) {
      var tb = snap.pxTopBottomAnalysis;
      var st = (next.stats || []).slice();
      if (tb.topDomains && tb.topDomains[0] && st[2]) {
        st[2] = Object.assign({}, st[2], { v: tb.topDomains[0].name || tb.topDomains[0] });
      }
      if (tb.bottomDomains && tb.bottomDomains[0] && st[3]) {
        st[3] = Object.assign({}, st[3], { v: tb.bottomDomains[0].name || tb.bottomDomains[0] });
      }
      next.stats = st;
    }
    if (snap.pxPeriodText) next.periodText = snap.pxPeriodText;
    return next;
  }

  function mountPxAiAnalysisPanel(host, options) {
    if (!host) return function () {};
    options = options || {};
    var variant = options.variant === "voc" ? "voc" : "survey";
    var data = applySnapshot(variant === "voc" ? vocDataset() : surveyDataset(), options.data || global.__pxAiPanelData);
    var level = options.level || "basic";
    var curLv = Math.max(0, LV_KEYS.indexOf(level));
    if (curLv < 0) curLv = 1;
    var curTab = "analysis";
    var generated = false;
    var activeBlocks = null;
    var drag = false;
    var sx = 0;
    var si = 0;
    var disposed = false;

    var hideSlider = options.hideLevelSlider || variant === "voc";
    host.innerHTML = "";
    var root = document.createElement("div");
    root.className = "px-ai-root" + (variant === "voc" ? " px-ai-voc" : "");
    var reportPaneInner = variant === "voc"
      ? '<div class="px-ai-rpt-setup" data-role="report-setup"></div>'
      : '<div class="px-ai-rpt-header">' +
          '<div class="px-ai-rpt-desc">분석 결과를 기반으로 PIX AI 분석 보고서를 생성합니다.</div>' +
          '<button type="button" class="px-ai-gen" data-role="gen">보고서 생성 ↗</button>' +
        '</div>';
    var panelHtml = variant === "voc"
      ? '<div class="px-ai-head">' +
          '<div class="px-ai-top">' +
            '<div><div class="px-ai-voc-title">' + esc(data.title || "VOC AI 상세 분석") + '</div>' +
            '<div class="px-ai-voc-sub" data-role="period"></div></div>' +
            '<button type="button" class="px-ai-close" data-role="close" aria-label="닫기">✕</button>' +
          '</div>' +
          '<div class="px-ai-tabs">' +
            '<button type="button" class="px-ai-tab on" data-tab="analysis">분석</button>' +
            '<button type="button" class="px-ai-tab" data-tab="report">보고서 작성</button>' +
          '</div>' +
        '</div>' +
        '<div class="px-ai-scroll" data-role="scroll">' +
          '<div data-pane="analysis"><div data-role="body" class="px-ai-voc-body"></div></div>' +
          '<div data-pane="report" style="display:none">' + reportPaneInner +
            '<div data-role="report-out" style="display:none"></div></div>' +
        '</div>'
      : '<div class="px-ai-head">' +
          '<div class="px-ai-top">' +
            '<div class="px-ai-title-wrap">' +
              '<span class="px-ai-badge">PIX AI</span>' +
              '<span class="px-ai-title">PIX AI 분석</span>' +
              '<span class="px-ai-period" data-role="period"></span>' +
            '</div>' +
            '<button type="button" class="px-ai-close" data-role="close" aria-label="닫기">×</button>' +
          '</div>' +
          '<div class="px-ai-tabs">' +
            '<button type="button" class="px-ai-tab on" data-tab="analysis">분석</button>' +
            '<button type="button" class="px-ai-tab" data-tab="report">보고서 작성</button>' +
          '</div>' +
        '</div>' +
        '<div class="px-ai-scroll" data-role="scroll">' +
          '<div data-pane="analysis">' +
            '<div class="px-ai-analysis-header">' +
              '<span class="px-ai-analysis-title" data-role="title"></span>' +
              '<div class="px-ai-level-wrap">' +
                '<span class="px-ai-level-label">분석 강도</span>' +
                '<div class="px-ai-htrack" data-role="track">' +
                  '<div class="px-ai-hlabels"><div class="px-ai-hlbl">심플</div><div class="px-ai-hlbl">기본</div><div class="px-ai-hlbl">고강도</div></div>' +
                  '<div class="px-ai-hthumb" data-role="thumb"><div class="px-ai-hline"></div><div class="px-ai-hline"></div><div class="px-ai-hline"></div></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="px-ai-sum"><div class="px-ai-sum-lbl">AI 요약</div><div class="px-ai-sum-txt" data-role="sum"></div></div>' +
            '<div data-role="body"></div>' +
          '</div>' +
          '<div data-pane="report" style="display:none">' + reportPaneInner +
            '<div data-role="report-out" style="display:none"></div></div>' +
        '</div>';
    root.innerHTML = '<style>' + CSS + (variant === "voc" ? VOC_CSS : "") + '</style>' + panelHtml;
    host.appendChild(root);

    var els = {
      period: root.querySelector('[data-role="period"]'),
      title: root.querySelector('[data-role="title"]'),
      sum: root.querySelector('[data-role="sum"]'),
      insight: root.querySelector('[data-role="insight"]'),
      body: root.querySelector('[data-role="body"]'),
      track: root.querySelector('[data-role="track"]'),
      thumb: root.querySelector('[data-role="thumb"]'),
      gen: root.querySelector('[data-role="gen"]'),
      reportSetup: root.querySelector('[data-role="report-setup"]'),
      reportOut: root.querySelector('[data-role="report-out"]'),
      analysisPane: root.querySelector('[data-pane="analysis"]'),
      reportPane: root.querySelector('[data-pane="report"]'),
      labels: root.querySelectorAll(".px-ai-hlbl"),
      tabs: root.querySelectorAll(".px-ai-tab"),
      close: root.querySelector('[data-role="close"]')
    };

    function pill(c, l) { return '<span class="px-ai-pill ' + c + '">' + esc(l) + "</span>"; }
    function sec(lbl, ct, inner) {
      return '<div class="px-ai-sec"><div class="px-ai-sec-hd"><span class="px-ai-sec-lbl">' + esc(lbl) + "</span>" +
        (ct ? '<span class="px-ai-sec-ct">' + esc(ct) + "</span>" : "") +
        '</div><div class="px-ai-rows">' + inner + "</div></div>";
    }
    function row(t, s, v, vc, m) {
      return '<div class="px-ai-row"><div class="px-ai-row-l"><div class="px-ai-rtitle">' + t + "</div>" +
        (s ? '<div class="px-ai-rsub">' + esc(s) + "</div>" : "") +
        "</div>" +
        (v != null && v !== "" ? '<div class="px-ai-row-r"><div class="px-ai-rval ' + (vc || "") + '">' + esc(v) + "</div>" +
          (m ? '<div class="px-ai-rmeta">' + esc(m) + "</div>" : "") + "</div>" : "") +
        "</div>";
    }
    function kvGrid() {
      var items = data.stats || [];
      if (variant === "voc") {
        return '<div class="px-ai-kv-grid">' + items.map(function (s) {
          return '<div class="px-ai-kv"><div class="px-ai-kk">' + esc(s.k) +
            '</div><div class="px-ai-kv-val' + (String(s.v).length > 8 ? " sm" : "") + '">' + esc(s.v) +
            '</div><div class="px-ai-kd ' + (s.up ? "up" : "dn") + '">' + esc(s.d) + "</div></div>";
        }).join("") + "</div>";
      }
      return '<div class="px-ai-kv-grid">' + items.map(function (s) {
        return '<div class="px-ai-kv"><div class="px-ai-kk">' + esc(s.k) + '</div><div class="px-ai-kv-val' +
          (String(s.v).length > 7 ? " sm" : "") + '">' + esc(s.v) + '</div><div class="px-ai-kd ' +
          (s.up ? "up" : "dn") + '">' + esc(s.d) + "</div></div>";
      }).join("") + "</div>";
    }
    function topLowGrid() {
      var col = function (items, cls, lbl) {
        return '<div class="px-ai-tl-col"><div class="px-ai-tl-hd ' + cls + '">' + esc(lbl) + "</div>" +
          items.map(function (t) {
            return '<div class="px-ai-tl-row"><div class="px-ai-tl-l"><div class="px-ai-tl-no">' + esc(t.no) +
              (t.type ? " · " + esc(t.type) : "") + '</div><div class="px-ai-tl-name">' + esc(t.name) +
              "</div>" + (t.neg ? '<div class="px-ai-tl-neg">' + esc(t.neg) + "</div>" : "") +
              '</div><div class="px-ai-tl-r"><div class="px-ai-rval ' + (cls === "g" ? "up" : "dn") + '">' +
              esc(t.delta) + '</div><div class="px-ai-tl-score">' + esc(t.score) + "</div></div></div>";
          }).join("") + "</div>";
      };
      var topLabel = variant === "voc" ? "키워드 TOP3" : "상위 TOP3";
      var lowLabel = variant === "voc" ? "불편 TOP3" : "하위 TOP3";
      return '<div class="px-ai-toplow">' + col(data.top, "g", topLabel) + col(data.low, "dn", lowLabel) + "</div>";
    }
    function twoCol() {
      var col = function (lbl, rows) {
        return '<div class="px-ai-two-col"><div class="px-ai-two-col-hd">' + esc(lbl) + "</div>" +
          rows.map(function (r) {
            var dn = String(r.delta).indexOf("-") === 0 || String(r.delta).indexOf("−") === 0;
            return '<div class="px-ai-sub-row"><span class="px-ai-rtitle">' + esc(r.name) +
              '</span><div class="px-ai-row-r"><div class="px-ai-rval ' + (dn ? "dn" : "up") + '">' +
              esc(r.score) + '</div><div class="px-ai-rmeta">' + esc(r.delta) + " · " + esc(r.st) +
              "</div></div></div>";
          }).join("") + "</div>";
      };
      return '<div class="px-ai-two">' + col("병동별", data.wards) + col("진료과별", data.depts) + "</div>";
    }
    function linkedSec() {
      var title = variant === "voc" ? "유형별 분포" : "환자경험평가 연계 분석";
      var inner = (data.linked || []).map(function (x) {
        var bar = typeof x.bar === "number" ? x.bar : null;
        return '<div class="px-ai-row"><div class="px-ai-row-l"><div class="px-ai-rtitle">' + esc(x.name) +
          '</div><div class="px-ai-rsub">' + esc(x.note) + "</div>" +
          (bar != null ? '<div class="px-ai-bar' + (x.up ? "" : " neg") + '"><span style="width:' + bar + '%"></span></div>' : "") +
          '</div><div class="px-ai-row-r"><div class="px-ai-rval ' + (x.up ? "up" : "dn") + '">' + esc(x.delta) +
          "</div></div></div>";
      }).join("");
      return sec(title, "", inner);
    }
    function distSec() {
      var inner = (data.dist || []).map(function (d) {
        var hot = d.neg >= 35;
        return '<div class="px-ai-row"><div class="px-ai-row-l"><div class="px-ai-rtitle">' + esc(d.name) +
          '</div><div class="px-ai-bar' + (hot ? " neg" : "") + '"><span style="width:' + d.neg +
          '%"></span></div></div><div class="px-ai-row-r"><div class="px-ai-rval ' + (hot ? "dn" : "") +
          '">부정 ' + d.neg + "%</div></div></div>";
      }).join("");
      return sec("긍정·부정 응답 분포", "부정 35%↑ 강조", inner);
    }

    function chip(tone, label) {
      return '<span class="px-ai-chip ' + (tone || "info") + '">' + esc(label) + "</span>";
    }
    function renderInsightCard() {
      var ins = data.insight || {};
      var cols = [
        ["signal", ins.signal],
        ["action", ins.action],
        ["monitor", ins.monitor]
      ];
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">AI 인사이트</span></div>' +
        '<div class="px-ai-insight-grid">' +
        cols.map(function (pair) {
          var item = pair[1] || { label: "-", value: "-", chip: "-", tone: "info" };
          return '<div class="px-ai-insight-col"><div class="px-ai-insight-k">' + esc(item.label) +
            '</div><div class="px-ai-insight-v">' + esc(item.value) + "</div>" +
            chip(item.tone, item.chip) + "</div>";
        }).join("") +
        "</div></div>";
    }
    function renderMetricChanges() {
      var items = data.metricChanges || [];
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">핵심 지표 변화</span><span class="px-ai-card-sub">' +
        items.length + "개</span></div>" +
        '<div class="px-ai-metric-grid">' +
        items.map(function (m) {
          return '<div class="px-ai-metric"><div class="px-ai-metric-k">' + esc(m.k) +
            '</div><div class="px-ai-metric-v">' + esc(m.v) +
            '</div><div class="px-ai-metric-d ' + (m.tone || "neu") + '">' + esc(m.d) +
            "</div></div>";
        }).join("") +
        "</div></div>";
    }
    function renderKeywordTop() {
      var pos = data.positiveKeywords || [];
      var neg = data.negativeKeywords || [];
      var left = pos.map(function (k, i) {
        return '<div class="px-ai-kw-row"><span class="px-ai-kw-name">' + (i + 1) + ". " + esc(k.name) +
          '</span><span class="px-ai-kw-delta good">' + esc(k.delta) + "</span></div>";
      }).join("");
      var right = neg.map(function (k, i) {
        return '<div class="px-ai-kw-row"><span class="px-ai-kw-name">' + (i + 1) + ". " + esc(k.name) +
          '</span><span class="px-ai-kw-delta bad">' + esc(k.delta) + "</span></div>";
      }).join("");
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">변화 키워드 TOP3</span><span class="px-ai-card-sub">' +
        (variant === "voc" ? "전월 대비 · 카테고리 단위 변화는 부정률 변화에서 확인" : "키워드 언급 건수 기준 · 전월 대비") +
        '</span></div>' +
        '<div class="px-ai-catkw">' +
          '<div class="px-ai-catkw-col"><div class="px-ai-catkw-hd">긍정 키워드</div>' + left + "</div>" +
          '<div class="px-ai-catkw-col"><div class="px-ai-catkw-hd">부정 키워드</div>' + right + "</div>" +
        "</div></div>";
    }
    function renderIssueActionList(pairs) {
      return (pairs || []).map(function (p) {
        return '<div class="px-ai-ia-row">' +
          '<div class="px-ai-ia-cell"><div class="px-ai-ia-top">' + chip(p.sev, p.sevLabel) +
            '<span class="px-ai-ia-name">' + esc(p.issue) + '</span></div><div class="px-ai-ia-desc">' +
            esc(p.issueDesc) + "</div></div>" +
          '<div class="px-ai-ia-cell"><div class="px-ai-ia-top">' + chip(p.pri, p.priLabel) +
            '<span class="px-ai-ia-name">' + esc(p.action) + '</span></div><div class="px-ai-ia-desc">' +
            esc(p.actionDesc) + "</div></div>" +
          "</div>";
      }).join("");
    }
    function renderDetailJudgement(lv) {
      var pos = data.positiveIssueActions || [];
      var neg = data.negativeIssueActions || data.issueActions || [];
      var html = '<div class="px-ai-detail-hd"><div><div class="px-ai-detail-title">AI 상세 판단</div>' +
        '<div class="px-ai-detail-sub">긍정 이슈 · 권장 조치 ' + pos.length + "개</div></div>" +
        '<div class="px-ai-detail-desc">이슈와 그에 대한 권장 조치를 이어서 확인합니다.</div></div>';
      if (pos.length) {
        html += '<div class="px-ai-card" style="padding-top:12px;margin-bottom:14px">' +
          '<div class="px-ai-ia-list">' + renderIssueActionList(pos) + "</div></div>";
      }
      html += '<div class="px-ai-detail-hd" style="margin-top:8px"><div><div class="px-ai-detail-title" style="font-size:14px">부정 이슈 · 권장 조치 ' +
        neg.length + "개</div></div></div>";
      html += '<div class="px-ai-card" style="padding-top:12px">' +
        '<div class="px-ai-ia-list">' + renderIssueActionList(neg) + "</div></div>";
      if (lv === "deep") {
        var changes = (data.keyChanges || []).map(function (c) {
          return '<div class="px-ai-change-row"><span class="px-ai-change-name">' + esc(c.name) +
            '</span><span class="px-ai-change-d ' + (c.up ? "up" : "dn") + '">' + esc(c.delta) +
            "</span></div>";
        }).join("");
        var mons = (data.detailMonitors || []).map(function (m) {
          return '<div class="px-ai-mon-item"><div class="px-ai-mon-name">' + esc(m.name) +
            '</div><div class="px-ai-mon-line">' + esc(m.avg) +
            '</div><div class="px-ai-mon-line dim">' + esc(m.criteria) + "</div></div>";
        }).join("");
        var changeTitle = data.changeSectionTitle || "부정률 변화";
        html += '<div class="px-ai-split">' +
          '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">' +
            esc(changeTitle) + " " + (data.keyChanges || []).length + "개</span></div>" + changes + "</div>" +
          '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">모니터링 ' +
            (data.detailMonitors || []).length + "개 · 심각도 높음 이슈 기준</span></div>" + mons + "</div>" +
          "</div>";
      }
      return html;
    }
    function sevKo(label) {
      if (!label) return "보통";
      if (label.indexOf("높음") >= 0) return "높음";
      if (label.indexOf("낮음") >= 0) return "낮음";
      return "보통";
    }
    function vocBadgeCls(key) {
      return key === "h" ? "px-ai-vbadge-high" : (key === "l" ? "px-ai-vbadge-low" : "px-ai-vbadge-mid");
    }
    function renderVocIssueCard(polarity, p) {
      var sevLabel = polarity === "pos" ? "개선도" : "심각도";
      return '<div class="px-ai-voc-ia-card">' +
        '<div class="px-ai-voc-ia-side"><div class="px-ai-voc-ia-top">' +
        '<span class="px-ai-vbadge ' + vocBadgeCls(p.sev) + '">' + sevLabel + " " + sevKo(p.sevLabel) + '</span>' +
        '<span class="px-ai-voc-ia-name">' + esc(p.issue) + '</span></div>' +
        '<p class="px-ai-voc-ia-desc">' + esc(p.issueDesc) + '</p></div>' +
        '<div class="px-ai-voc-ia-side px-ai-voc-ia-side-r"><div class="px-ai-voc-ia-top">' +
        '<span class="px-ai-vbadge ' + vocBadgeCls(p.pri) + '">우선순위 ' + sevKo(p.priLabel) + '</span>' +
        '<span class="px-ai-voc-ia-name">' + esc(p.action) + '</span></div>' +
        '<p class="px-ai-voc-ia-desc">' + esc(p.actionDesc) + '</p></div></div>';
    }
    function renderVocDetailJudgement() {
      var pos = data.positiveIssueActions || [];
      var neg = data.negativeIssueActions || [];
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">AI 상세 판단</span><span class="px-ai-card-sub">이슈와 그에 대한 권장 조치를 이어서 확인합니다.</span></div>' +
        '<p class="px-ai-voc-detail-sub pos">긍정 이슈 · 권장 조치 <span class="px-ai-card-sub">' + pos.length + "개</span></p>" +
        '<div class="px-ai-voc-col-labels"><span>이슈</span><span>권장 조치</span></div>' +
        pos.map(function (p) { return renderVocIssueCard("pos", p); }).join("") +
        '<p class="px-ai-voc-detail-sub neg">부정 이슈 · 권장 조치 <span class="px-ai-card-sub">' + neg.length + "개</span></p>" +
        '<div class="px-ai-voc-col-labels"><span>이슈</span><span>권장 조치</span></div>' +
        neg.map(function (p) { return renderVocIssueCard("neg", p); }).join("") +
        "</div>";
    }
    function renderVocChangeMonitorSplit() {
      var changes = (data.keyChanges || []).map(function (c) {
        return '<div class="px-ai-change-row"><span class="px-ai-change-name">' + esc(c.name) +
          '</span><span class="px-ai-change-d ' + (c.up ? "up" : "dn") + '">' + esc(c.delta) + "</span></div>";
      }).join("");
      var mons = (data.detailMonitors || []).map(function (m) {
        return '<div class="px-ai-mon-item"><div class="px-ai-mon-name">' + esc(m.name) +
          '</div><div class="px-ai-mon-line">' + esc(m.avg) +
          '</div><div class="px-ai-mon-line dim">' + esc(m.criteria) + "</div></div>";
      }).join("");
      var changeTitle = data.changeSectionTitle || "부정률 변화";
      return '<div class="px-ai-split" style="margin-top:0">' +
        '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">' +
          esc(changeTitle) + " " + (data.keyChanges || []).length + "개</span></div>" + changes + "</div>" +
        '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">모니터링 ' +
          (data.detailMonitors || []).length + "개 · 심각도 높음 이슈 기준</span></div>" + mons + "</div>" +
        "</div>";
    }
    function renderVocAnalysis(lv) {
      var sumText = (data.sum[lv] || "").replace(/\\n/g, "\n");
      var html = '<div class="px-ai-voc-grid" style="grid-template-columns:1fr 1.3fr">';
      html += '<div class="px-ai-card px-ai-sum-card"><div class="px-ai-card-hd">' +
        '<span class="px-ai-card-ttl">🩺 AI 요약</span><span class="px-ai-card-sub">' + esc(data.periodText) + "</span></div>" +
        '<p class="px-ai-voc-sum">' + esc(sumText) + "</p></div>";
      html += "<div>";
      html += renderInsightCard();
      html += renderMetricChanges();
      if (lv === "basic" || lv === "deep") {
        html += renderKeywordTop();
        html += renderVocDetailJudgement();
      }
      if (lv === "deep") {
        html += renderVocChangeMonitorSplit();
      }
      html += "</div></div>";
      els.body.innerHTML = html;
    }
    function renderAnalysis() {
      var lv = LV_KEYS[curLv];
      if (variant === "voc") {
        if (els.period) els.period.textContent = data.periodText;
        renderVocAnalysis(lv);
        return;
      }
      els.period.textContent = data.periodText;
      els.title.textContent = data.title;
      els.sum.textContent = (data.sum[lv] || "").replace(/\\n/g, "\n");
      var h = '<div class="px-ai-body-stack">' + renderInsightCard() + renderMetricChanges();
      if (lv !== "simple") {
        h += renderKeywordTop() + renderDetailJudgement(lv);
      }
      h += "</div>";
      els.body.innerHTML = h;
    }
    function tableKpi(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 핵심 지표 현황</div><table class=\"px-ai-rt\"><thead><tr><th>지표</th><th>값</th><th>전월 대비</th></tr></thead><tbody>" +
        (data.stats || []).map(function (s) {
          return "<tr><td>" + esc(s.k) + "</td><td>" + esc(s.v) + '</td><td style="color:' +
            (s.up ? "var(--text-success)" : "var(--text-danger)") + '">' + esc(s.d) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tableArea(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 영역별 점수</div><table class=\"px-ai-rt\"><thead><tr><th>영역</th><th>점수</th><th>전월 대비</th><th>평가</th></tr></thead><tbody>" +
        (data.areas || []).map(function (a) {
          var dn = String(a.delta).indexOf("-") === 0;
          return "<tr><td>" + esc(a.name) + "</td><td>" + esc(a.score) + (/\d$/.test(a.score) ? "점" : "") +
            '</td><td style="color:' + (dn ? "var(--text-danger)" : "var(--text-success)") + '">' +
            esc(a.delta) + "</td><td>" + esc(a.eval) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tableTopLow(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 문항/키워드 TOP3 · LOW3</div><table class=\"px-ai-rt\"><thead><tr><th>구분</th><th>항목</th><th>점수/건수</th><th>변화</th></tr></thead><tbody>" +
        (data.top || []).map(function (t) {
          return "<tr><td>상위</td><td>" + esc(t.no) + " " + esc(t.name) + "</td><td>" + esc(t.score) +
            '</td><td style="color:var(--text-success)">' + esc(t.delta) + "</td></tr>";
        }).join("") +
        (data.low || []).map(function (t) {
          return "<tr><td>하위</td><td>" + esc(t.no) + " " + esc(t.name) + "</td><td>" + esc(t.score) +
            '</td><td style="color:var(--text-danger)">' + esc(t.delta) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tableWard(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 병동 · 진료과 비교</div><table class=\"px-ai-rt\"><thead><tr><th>구분</th><th>명칭</th><th>점수</th><th>전월 대비</th><th>상태</th></tr></thead><tbody>" +
        (data.wards || []).map(function (w) {
          return "<tr><td>병동</td><td>" + esc(w.name) + "</td><td>" + esc(w.score) + '</td><td>' + esc(w.delta) +
            "</td><td>" + esc(w.st) + "</td></tr>";
        }).join("") +
        (data.depts || []).map(function (d) {
          return "<tr><td>진료과</td><td>" + esc(d.name) + "</td><td>" + esc(d.score) + "</td><td>" + esc(d.delta) +
            "</td><td>" + esc(d.st) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tablePriority(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 개선 우선순위</div><table class=\"px-ai-rt\"><thead><tr><th>순위</th><th>문항</th><th>점수</th><th>사유</th></tr></thead><tbody>" +
        (data.priority || []).map(function (p, i) {
          return "<tr><td>" + (i + 1) + "</td><td>" + esc(p[0]) + " " + esc(p[1]) +
            '</td><td style="color:var(--text-danger)">' + esc(p[2]) + "</td><td>" + esc(p[3]) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tableAction(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 개선 권고사항</div><table class=\"px-ai-rt\"><thead><tr><th>우선순위</th><th>과제</th><th>세부 내용</th><th>일정</th></tr></thead><tbody>" +
        (data.actions || []).map(function (a) {
          return "<tr><td>" + esc(a.pri) + '</td><td style="white-space:nowrap">' + esc(a.task) +
            "</td><td>" + esc(a.detail) + "</td><td>" + esc(a.deadline) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tableMonitor(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 모니터링 항목</div><table class=\"px-ai-rt\"><thead><tr><th>항목</th><th>측정 지점</th><th>목표 기준</th></tr></thead><tbody>" +
        (data.monitors || []).map(function (m) {
          return "<tr><td>" + esc(m[0]) + "</td><td>" + esc(m[1]) + "</td><td>" + esc(m[2]) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function tableMetricChanges(cap) {
      return '<div class="px-ai-rt-cap">' + cap + ". 핵심 지표 변화</div><table class=\"px-ai-rt\"><thead><tr><th>지표</th><th>값</th><th>변화</th></tr></thead><tbody>" +
        (data.metricChanges || []).map(function (m) {
          return "<tr><td>" + esc(m.k) + "</td><td>" + esc(m.v) + "</td><td>" + esc(m.d) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function reportDraftHtml(text) {
      return '<p style="margin:0">' + esc(text || "") + "</p>";
    }
    function defaultReportBlocks() {
      var defs = data.reportDefaultBlocks || {};
      var lv = LV_KEYS[curLv];
      return (defs[lv] || defs.basic || ["overview", "kpi"]).slice();
    }
    function renderReportPane() {
      if (!els.reportSetup) return;
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      var blocks = data.reportBlockDefs || [];
      var chips = blocks.map(function (b) {
        var on = activeBlocks.indexOf(b.key) > -1;
        return '<span class="px-ai-rpt-chip' + (on ? " on" : "") + '" data-block-key="' + esc(b.key) + '">' +
          (on ? "✓ " : "") + esc(b.name) + "</span>";
      }).join("");
      els.reportSetup.innerHTML =
        '<div class="px-ai-rpt-level">현재 분석 강도 <span class="px-ai-level-tag">' + esc(LV_NAMES[curLv]) + "</span>" +
        '<span class="px-ai-rpt-level-note">— 아래 블록을 눌러 보고서에 넣거나 뺄 수 있습니다.</span></div>' +
        '<p class="px-ai-rpt-blocks-lbl">포함할 블록</p>' +
        '<div class="px-ai-rpt-chips">' + chips + "</div>" +
        '<button type="button" class="px-ai-gen" data-role="gen">보고서 생성 ↗</button>';
    }
    function toggleReportBlock(key) {
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      var idx = activeBlocks.indexOf(key);
      if (idx > -1) activeBlocks.splice(idx, 1);
      else activeBlocks.push(key);
      renderReportPane();
      els.reportOut.style.display = "none";
    }
    function removeReportBlock(key) {
      var idx = activeBlocks.indexOf(key);
      if (idx > -1) activeBlocks.splice(idx, 1);
      renderReportPane();
      generateReport();
    }
    function reportSection(key, title, draftText, dataHtml) {
      return '<div class="px-ai-rpt-sec" data-rpt-block="' + esc(key) + '">' +
        '<div class="px-ai-rpt-sec-hd"><p class="px-ai-rpt-sec-ttl">' + esc(title) + '</p>' +
        '<button type="button" class="px-ai-rpt-remove" data-remove-block="' + esc(key) + '">✕ 빼기</button></div>' +
        '<span class="px-ai-rpt-draft-tag">✎ 초안 · 클릭해서 수정</span>' +
        '<div contenteditable="true" class="px-ai-editable-block">' + draftText + "</div>" +
        (dataHtml || "") +
        "</div>";
    }
    function reportKpiTableHtml() {
      var rows = [];
      (data.stats || []).forEach(function (s) { rows.push([s.k, s.v]); });
      var neg = (data.metricChanges || [])[0];
      rows.push([neg ? neg.k : "전체 부정률", neg ? neg.v : "43.7%"]);
      return '<table class="px-ai-rpt-kpi-tbl">' + rows.map(function (r) {
        return "<tr><td>" + esc(r[0]) + '</td><td>' + esc(r[1]) + "</td></tr>";
      }).join("") + "</table>";
    }
    function reportTypeDistHtml() {
      return (data.typeSentiment || []).map(function (t) {
        return '<div class="px-ai-type-bar-row"><div class="px-ai-type-bar-meta"><span>' + esc(t.type) +
          '</span><span>긍정 ' + t.pos + "% · 부정 " + t.neg + "%</span></div>" +
          '<div class="px-ai-type-bar-track"><div class="px-ai-type-bar-pos" style="width:' + t.pos +
          '%"></div><div class="px-ai-type-bar-neg" style="width:' + t.neg + '%"></div></div></div>';
      }).join("");
    }
    function reportActionPlanHtml() {
      var rows = data.actionPlanRows || [];
      return '<table class="px-ai-rpt-kpi-tbl"><thead><tr style="color:#7a7887"><td style="padding:4px 0">우선순위</td><td style="padding:4px 0">과제</td><td style="padding:4px 0;text-align:right">일정</td></tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td style="color:#cfcdda">' + esc(r[0]) + '</td><td style="color:#fff;font-weight:600">' +
            esc(r[1]) + '</td><td style="text-align:right;color:#a9a7b6">' + esc(r[2]) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function reportQuoteListHtml() {
      var pos = (data.posQuotes || []).map(function (q, i) {
        return '<div class="px-ai-quote-pos">' + (i + 1) + ". " + esc(q) + "</div>";
      }).join("");
      var neg = (data.negQuotes || []).map(function (q, i) {
        return '<div class="px-ai-quote-neg">' + (i + 1) + ". " + esc(q) + "</div>";
      }).join("");
      return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8px">' +
        '<div><p style="font-size:11px;font-weight:700;color:#7ea6ff;margin:0 0 6px">긍정 원문 (10건)</p>' + pos + "</div>" +
        '<div style="border-left:1px solid #2d2c36;padding-left:14px"><p style="font-size:11px;font-weight:700;color:#f2949c;margin:0 0 6px">개선 제안 원문 (10건)</p>' + neg + "</div></div>";
    }
    function reportIssuesEmbedHtml() {
      var changes = (data.keyChanges || []).map(function (c) {
        return '<div class="px-ai-change-row"><span class="px-ai-change-name">' + esc(c.name) +
          '</span><span class="px-ai-change-d ' + (c.up ? "up" : "dn") + '">' + esc(c.delta) + "</span></div>";
      }).join("");
      var mons = (data.detailMonitors || []).map(function (m) {
        return '<div class="px-ai-mon-item"><div class="px-ai-mon-name">' + esc(m.name) +
          '</div><div class="px-ai-mon-line">' + esc(m.avg) +
          '</div><div class="px-ai-mon-line dim">' + esc(m.criteria) + "</div></div>";
      }).join("");
      var changeTitle = data.changeSectionTitle || "부정률 변화";
      return '<div style="margin-top:10px">' +
        '<p style="font-size:11px;font-weight:700;color:#7ea6ff;margin:0 0 8px">긍정 이슈 · 권장 조치</p>' +
        '<div class="px-ai-ia-list">' + renderIssueActionList(data.positiveIssueActions || []) + "</div>" +
        '<p style="font-size:11px;font-weight:700;color:#f2949c;margin:14px 0 8px">부정 이슈 · 권장 조치</p>' +
        '<div class="px-ai-ia-list">' + renderIssueActionList(data.negativeIssueActions || []) + "</div>" +
        '<div class="px-ai-split" style="margin-top:14px">' +
        '<div class="px-ai-card" style="padding:12px"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">' +
          esc(changeTitle) + " " + (data.keyChanges || []).length + "개</span></div>" + changes + "</div>" +
        '<div class="px-ai-card" style="padding:12px"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">모니터링 ' +
          (data.detailMonitors || []).length + "개 · 심각도 높음 이슈 기준</span></div>" + mons + "</div>" +
        "</div></div>";
    }
    function overviewReportText() {
      var lv = LV_KEYS[curLv];
      var texts = data.reportOverview || {};
      return texts[lv] || texts.basic || (data.sum.basic || "").replace(/\\n/g, "\n");
    }
    function bindReportActions() {
      var copyBtn = els.reportOut.querySelector('[data-role="copy"]');
      var wordBtn = els.reportOut.querySelector('[data-role="word"]');
      if (copyBtn) {
        copyBtn.onclick = function () {
          var text = els.reportOut.innerText || "";
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              if (options.showToast) options.showToast("보고서 내용이 복사되었습니다.");
            }).catch(function () {});
          }
        };
      }
      if (wordBtn) {
        wordBtn.onclick = function () {
          if (options.showToast) options.showToast("Word 저장은 추후 연동 예정입니다.");
        };
      }
      Array.prototype.forEach.call(els.reportOut.querySelectorAll("[data-remove-block]"), function (btn) {
        btn.onclick = function () { removeReportBlock(btn.getAttribute("data-remove-block")); };
      });
    }
    function generateVocReport() {
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      var drafts = data.reportDrafts || {};
      var blockContent = {
        overview: ["개요", reportDraftHtml(overviewReportText()), ""],
        kpi: ["핵심 지표", reportDraftHtml(drafts.kpi), reportKpiTableHtml()],
        dist: ["유형별 분포", reportDraftHtml(drafts.dist), reportTypeDistHtml()],
        keywords: ["변화 키워드 TOP3", reportDraftHtml(drafts.keywords), renderKeywordTop()],
        issues: ["주요 이슈 및 권장 조치", reportDraftHtml(drafts.issues), reportIssuesEmbedHtml()],
        plan: ["개선 액션 플랜", reportDraftHtml(drafts.plan), reportActionPlanHtml()],
        quotes: ["원문 및 인사이트", reportDraftHtml(drafts.quotes), reportQuoteListHtml()]
      };
      var html = '<div class="px-ai-rpt-out-card">';
      var n = 1;
      if (!activeBlocks.length) {
        html += '<p style="font-size:12px;color:#7a7887;text-align:center;padding:20px 0">포함할 블록을 1개 이상 선택해 주세요.</p>';
      } else {
        (data.reportBlockDefs || []).forEach(function (b) {
          if (activeBlocks.indexOf(b.key) > -1) {
            var c = blockContent[b.key];
            if (c) html += reportSection(b.key, n++ + ". " + c[0], c[1], c[2]);
          }
        });
      }
      html += '<div class="px-ai-rpt-actions">' +
        '<button type="button" class="px-ai-rpt-action-btn" data-role="copy">📋 복사</button>' +
        '<button type="button" class="px-ai-rpt-action-btn" data-role="word">＋ Word 저장</button>' +
        "</div></div>";
      els.reportOut.innerHTML = html;
      els.reportOut.style.display = "block";
      generated = true;
      bindReportActions();
    }
    function reportInsightBody() {
      var ins = data.insight || {};
      return ["signal", "action", "monitor"].map(function (k) {
        var item = ins[k];
        if (!item) return "";
        return item.label + ": " + item.value + " (" + item.chip + ")";
      }).filter(Boolean).join("\n");
    }
    function reportKeywordBody() {
      var pos = (data.positiveKeywords || []).map(function (k, i) {
        return (i + 1) + ". " + k.name + " " + k.delta;
      });
      var neg = (data.negativeKeywords || []).map(function (k, i) {
        return (i + 1) + ". " + k.name + " " + k.delta;
      });
      return "【긍정 키워드】\n" + pos.join("\n") + "\n\n【부정 키워드】\n" + neg.join("\n");
    }
    function reportIssueActionsBody(pairs) {
      return (pairs || []).map(function (p, i) {
        return (i + 1) + ". [" + p.sevLabel + "] " + p.issue + "\n   " + p.issueDesc +
          "\n   → [" + p.priLabel + "] " + p.action + ": " + p.actionDesc;
      }).join("\n\n");
    }
    function reportChangesBody() {
      return (data.keyChanges || []).map(function (c) {
        return "· " + c.name + " " + c.delta;
      }).join("\n");
    }
    function reportMonitorsBody() {
      return (data.detailMonitors || []).map(function (m) {
        return "· " + m.name + "\n  " + m.avg + "\n  " + m.criteria;
      }).join("\n\n");
    }
    function reportTemplate() {
      var prefix = data.reportPrefix;
      var changeTitle = data.changeSectionTitle || "부정률 변화";
      return {
        title: prefix + " PIX AI 분석 보고서",
        sections: [
          { hd: "1. 개요", body: (data.sum.basic || data.sum.simple || "").replace(/\\n/g, "\n") },
          { hd: "2. AI 인사이트", body: reportInsightBody() },
          { hd: "3. 핵심 지표 변화", table: tableMetricChanges },
          { hd: "4. 변화 키워드 TOP3", body: reportKeywordBody() },
          { hd: "5. 긍정 이슈 · 권장 조치", body: reportIssueActionsBody(data.positiveIssueActions) },
          { hd: "6. 부정 이슈 · 권장 조치", body: reportIssueActionsBody(data.negativeIssueActions) },
          { hd: "7. " + changeTitle, body: reportChangesBody() },
          { hd: "8. 모니터링", body: reportMonitorsBody() }
        ]
      };
    }

    function generateReport() {
      if (variant === "voc") {
        generateVocReport();
        return;
      }
      var template = reportTemplate();
      var tblIdx = 1;
      var html = '<div style="margin-top:8px;font-size:14px;font-weight:600;color:var(--text-primary)">' +
        esc(template.title) + "</div>" +
        template.sections.map(function (s) {
          return '<div class="px-ai-rs"><div class="px-ai-rs-hd">' + esc(s.hd) + "</div>" +
            (s.body ? '<div class="px-ai-rp">' + esc(s.body) + "</div>" : "") +
            (s.table ? s.table(tblIdx++) : "") + "</div>";
        }).join("") +
        '<div class="px-ai-copy-bar">' +
          '<button type="button" class="px-ai-copy-btn" data-role="copy">텍스트 복사</button>' +
          '<button type="button" class="px-ai-copy-btn" data-role="word">Word 저장</button>' +
        "</div>";
      els.reportOut.innerHTML = html;
      els.reportOut.style.display = "block";
      generated = true;
      var copyBtn = els.reportOut.querySelector('[data-role="copy"]');
      var wordBtn = els.reportOut.querySelector('[data-role="word"]');
      if (copyBtn) {
        copyBtn.onclick = function () {
          var text = Array.prototype.map.call(
            els.reportOut.querySelectorAll(".px-ai-rs-hd,.px-ai-rp,.px-ai-rt-cap,.px-ai-rt td,.px-ai-rt th"),
            function (e) { return e.textContent.trim(); }
          ).filter(Boolean).join("\n");
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              if (options.showToast) options.showToast("보고서 텍스트를 복사했습니다.");
            }).catch(function () {});
          }
        };
      }
      if (wordBtn) {
        wordBtn.onclick = function () {
          if (options.showToast) options.showToast("Word 저장은 추후 연동 예정입니다.");
        };
      }
    }

    function tL(i) { return els.track ? 4 + i * ((els.track.offsetWidth - 8) / 3) : 0; }
    function tW() { return els.track ? (els.track.offsetWidth - 8) / 3 : 0; }
    function setLevel(i, animate) {
      curLv = i;
      if (els.track && els.thumb) {
        els.thumb.style.transition = animate === false ? "none" : "left .2s cubic-bezier(.4,0,.2,1)";
        els.thumb.style.left = tL(i) + "px";
        els.thumb.style.width = tW() + "px";
      }
      if (els.labels) {
        Array.prototype.forEach.call(els.labels, function (l, li) {
          l.classList.toggle("on", li === i);
        });
      }
      if (typeof options.onLevelChange === "function") options.onLevelChange(LV_KEYS[i]);
      global.__pxAiAnalysisLevel = LV_KEYS[i];
      renderAnalysis();
      if (variant === "voc") {
        activeBlocks = defaultReportBlocks();
        renderReportPane();
        if (generated) els.reportOut.style.display = "none";
      }
    }

    function beginAnalysis() {
      if (options.showLoading && variant === "voc") {
        els.body.innerHTML = '<p class="px-ai-voc-loading">VOC 데이터를 분석하고 있습니다…</p>';
        window.setTimeout(function () {
          if (disposed) return;
          renderAnalysis();
          if (els.reportSetup) renderReportPane();
        }, 700);
        return;
      }
      renderAnalysis();
      if (els.reportSetup) renderReportPane();
    }

    Array.prototype.forEach.call(els.tabs, function (tab) {
      tab.addEventListener("click", function () {
        curTab = tab.getAttribute("data-tab");
        Array.prototype.forEach.call(els.tabs, function (x) {
          x.classList.toggle("on", x === tab);
        });
        els.analysisPane.style.display = curTab === "analysis" ? "" : "none";
        els.reportPane.style.display = curTab === "report" ? "" : "none";
      });
    });
    if (els.close) {
      if (typeof options.onClose === "function") {
        els.close.addEventListener("click", function (e) {
          e.preventDefault();
          options.onClose();
        });
      } else {
        els.close.style.display = "none";
      }
    }
    if (els.gen) els.gen.addEventListener("click", generateReport);
    if (els.reportSetup) {
      renderReportPane();
      els.reportSetup.addEventListener("click", function (e) {
        var chip = e.target.closest("[data-block-key]");
        if (chip) {
          toggleReportBlock(chip.getAttribute("data-block-key"));
          return;
        }
        if (e.target.closest('[data-role="gen"]')) generateReport();
      });
    }
    if (els.track) {
      els.track.addEventListener("click", function (e) {
        if (drag) return;
        var r = els.track.getBoundingClientRect();
        setLevel(Math.min(2, Math.floor((e.clientX - r.left) / (r.width / 3))));
      });
    }
    if (els.thumb) {
      els.thumb.addEventListener("pointerdown", function (e) {
        drag = true; sx = e.clientX; si = curLv;
        els.thumb.style.transition = "none";
        els.thumb.style.cursor = "grabbing";
        e.stopPropagation(); e.preventDefault();
      });
    }
    function onMove(e) {
      if (!drag || disposed || !els.track) return;
      var step = Math.round((e.clientX - sx) / (els.track.offsetWidth / 3));
      var next = Math.max(0, Math.min(2, si + step));
      if (next !== curLv) setLevel(next, false);
    }
    function onUp() {
      if (!drag) return;
      drag = false;
      if (els.thumb) {
        els.thumb.style.cursor = "grab";
        els.thumb.style.transition = "left .2s cubic-bezier(.4,0,.2,1)";
      }
    }
    if (els.track) {
      global.addEventListener("pointermove", onMove);
      global.addEventListener("pointerup", onUp);
    }

    function onData(ev) {
      if (disposed) return;
      data = applySnapshot(variant === "voc" ? vocDataset() : surveyDataset(), (ev && ev.detail) || global.__pxAiPanelData);
      renderAnalysis();
    }
    global.addEventListener("px-ai-panel-data", onData);

    requestAnimationFrame(function () {
      if (hideSlider) {
        beginAnalysis();
      } else {
        setLevel(curLv, false);
        requestAnimationFrame(function () {
          if (els.thumb) els.thumb.style.transition = "left .2s cubic-bezier(.4,0,.2,1)";
        });
      }
    });

    return function dispose() {
      disposed = true;
      if (els.track) {
        global.removeEventListener("pointermove", onMove);
        global.removeEventListener("pointerup", onUp);
      }
      global.removeEventListener("px-ai-panel-data", onData);
      host.innerHTML = "";
    };
  }

  function registerPxAiAnalysisPanel(deps) {
    var React = deps.React;
    var useRef = deps.useRef || React.useRef;
    var useEffect = deps.useEffect || React.useEffect;
    return function PxAiAnalysisPanel(props) {
      var hostRef = useRef(null);
      useEffect(function () {
        if (!hostRef.current) return undefined;
        return mountPxAiAnalysisPanel(hostRef.current, {
          variant: props && props.variant,
          level: props && props.level,
          data: props && props.data,
          showToast: props && props.showToast,
          onLevelChange: props && props.onLevelChange,
          onClose: props && props.onClose
        });
        // level is controlled inside the mounted panel; remounting on level change would wipe report output
      }, [props && props.variant]);
      return React.createElement("div", {
        ref: hostRef,
        style: { height: "100%", width: "100%", overflow: "hidden" }
      });
    };
  }

  global.mountPxAiAnalysisPanel = mountPxAiAnalysisPanel;
  global.mountPxAiStrengthPicker = mountPxAiStrengthPicker;
  global.registerPxAiAnalysisPanel = registerPxAiAnalysisPanel;
})(typeof window !== "undefined" ? window : global);