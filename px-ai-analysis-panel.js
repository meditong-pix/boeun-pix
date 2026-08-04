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
    ".px-ai-analysis-setup{padding:0 0 6px;}",
    ".px-ai-analysis-steps{display:flex;align-items:center;gap:8px;margin-bottom:14px;font-size:12px;}",
    ".px-ai-analysis-step{color:#7a7887;font-weight:600;}",
    ".px-ai-analysis-step.on{color:#c7a6f2;}",
    ".px-ai-analysis-step-sep{color:#5a5868;font-size:11px;}",
    ".px-ai-rpt-desc{font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:12px;}",
    ".px-ai-rpt-level{font-size:12px;color:#a9a7b6;margin-bottom:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}",
    ".px-ai-rpt-level-note{color:#7a7887;}",
    ".px-ai-level-tag{font-size:11px;font-weight:700;padding:2px 9px;border-radius:999px;background:#2a2438;color:#c7a6f2;border:0.5px solid rgba(124,108,255,0.35);}",
    ".px-ai-rpt-blocks-lbl{font-size:11px;color:#7a7887;margin:0 0 8px;}",
    ".px-ai-rpt-group-lbl{font-size:11px;font-weight:700;color:#cfcdda;margin:16px 0 8px;}",
    ".px-ai-rpt-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;}",
    ".px-ai-rpt-chip{cursor:pointer;font-size:11px;padding:5px 11px;border-radius:999px;border:1px solid #2d2c36;background:#201f27;color:#7a7887;user-select:none;}",
    ".px-ai-rpt-chip.on{border-color:#8b5cf6;background:#241f36;color:#c7a6f2;}",
    ".px-ai-rpt-chip-fixed{cursor:default;opacity:0.92;border-color:#3d3a4a;background:#1a1922;color:#a9a7b6;}",
    ".px-ai-rpt-chip-fixed.on{border-color:#5b5570;background:#1f1e28;color:#cfcdda;}",
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
    ".px-ai-voc-quotes-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}",
    ".px-ai-voc-quotes-col-hd{font-size:11px;font-weight:700;margin:0 0 8px;}",
    ".px-ai-voc-quotes-col-hd.pos{color:#7ea6ff;}",
    ".px-ai-voc-quotes-col-hd.neg{color:#f2949c;}",
    ".px-ai-voc-quotes-scroll{max-height:360px;overflow:auto;padding-right:4px;}",
    ".px-ai-voc-quote-item{border:1px solid #2d2c36;border-radius:8px;padding:10px 12px;background:#17161d;margin-bottom:8px;}",
    ".px-ai-voc-quote-item:last-child{margin-bottom:0;}",
    ".px-ai-voc-quote-item.pos{border-left:3px solid #7ea6ff;}",
    ".px-ai-voc-quote-item.neg{border-left:3px solid #f2949c;}",
    ".px-ai-voc-quote-text{font-size:12px;line-height:1.65;color:#e7e6ee;margin:0;}",
    ".px-ai-voc-quote-meta{font-size:10px;color:#7a7887;margin:6px 0 0;line-height:1.45;}",
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
    ".px-ai-panel-actions{flex-shrink:0;padding:12px 26px 16px;border-top:1px solid #2d2c36;margin-top:0;background:#17171c;}",
    ".px-ai-rpt-action-btn{border:1px solid #2d2c36;border-radius:10px;padding:7px 12px;cursor:pointer;background:#201f27;color:#cfcdda;font-size:12px;font-family:inherit;}",
    ".px-ai-rpt-action-btn:hover{border-color:#8b5cf6;color:#ddd6fe;}",
    ".px-ai-rpt-action-primary{border-color:#8b5cf6;background:linear-gradient(135deg,#6d5dfc,#5b46ff);color:#fff;font-weight:700;box-shadow:0 8px 18px rgba(91,70,255,0.24);}",
    ".px-ai-rpt-action-primary:hover{border-color:#a78bfa;color:#fff;filter:brightness(1.05);}",
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
    ".px-ai-mon-stats{font-size:12px;color:var(--text-secondary);line-height:1.55;margin-bottom:4px;}",
    ".px-ai-mon-reason{font-size:12px;color:var(--text-muted);line-height:1.55;}",
    ".px-ai-mon-quotes{margin-top:10px;padding-top:8px;border-top:1px dashed rgba(148,163,184,0.18);}",
    ".px-ai-mon-quotes-hd{font-size:10px;font-weight:700;color:#7a7887;margin:0 0 6px;}",
    ".px-ai-mon-quotes .px-ai-voc-quote-item{padding:8px 10px;margin-bottom:6px;}",
    ".px-ai-mon-quotes .px-ai-voc-quote-item:last-child{margin-bottom:0;}",
    ".px-ai-mon-quotes .px-ai-voc-quote-text{font-size:11px;}",
    ".px-ai-catkw{display:grid;grid-template-columns:1fr 1fr;gap:0;}",
    ".px-ai-catkw-col{padding:0 14px;min-width:0;}",
    ".px-ai-catkw-col:first-child{padding-left:0;border-right:0.5px solid rgba(148,163,184,0.12);}",
    ".px-ai-catkw-col:last-child{padding-right:0;}",
    ".px-ai-catkw-hd{font-size:12px;font-weight:600;color:var(--text-muted);padding-bottom:8px;margin-bottom:2px;}",
    ".px-ai-body-stack{display:flex;flex-direction:column;gap:14px;padding-top:14px;}",
    "@media (max-width:820px){.px-ai-sum-row,.px-ai-split,.px-ai-ia-row{grid-template-columns:1fr;}.px-ai-ia-cell:first-child{border-right:none;border-bottom:0.5px solid rgba(148,163,184,0.12);}.px-ai-insight-grid,.px-ai-metric-grid{grid-template-columns:1fr 1fr;}.px-ai-insight-col,.px-ai-metric{border-right:none;padding:8px 0;border-bottom:0.5px solid rgba(148,163,184,0.1);}}"
  ].join("");

  var VOC_CSS = [
    ".px-ai-root.px-ai-voc{background:#17171c;color:#e7e6ee;font-family:-apple-system,BlinkMacSystemFont,\"Apple SD Gothic Neo\",\"Malgun Gothic\",sans-serif;overflow:visible;}",
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
    ".px-ai-voc-layout{display:flex;flex-direction:column;gap:14px;}",
    ".px-ai-sum-card-top{margin-bottom:0;}",
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
    ".px-ai-voc-detail-sub.monitor{color:#cfcdda;margin-top:16px;}",
    ".px-ai-voc-col-labels{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:6px;font-size:10px;color:#7a7887;}",
    ".px-ai-voc-ia-card{border:1px solid #2d2c36;border-radius:10px;padding:12px 14px;margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:14px;}",
    ".px-ai-voc-ia-side-r{border-left:1px solid #2d2c36;padding-left:14px;}",
    ".px-ai-voc-ia-top{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;}",
    ".px-ai-voc-ia-name{font-size:12px;font-weight:700;color:#fff;}",
    ".px-ai-voc-ia-desc{font-size:11px;color:#a9a7b6;margin:0;line-height:1.6;}",
    ".px-ai-ia-matrix{border:1px solid #2d2c36;border-radius:12px;padding:14px 14px 12px;background:#12151c;}",
    ".px-ai-ia-matrix-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;}",
    ".px-ai-ia-matrix-title{font-size:13px;font-weight:800;color:#fff;line-height:1.35;}",
    ".px-ai-ia-matrix-desc{font-size:10px;color:#7a7887;margin-top:4px;line-height:1.5;}",
    ".px-ai-ia-matrix-meta{font-size:10px;color:#7a7887;white-space:nowrap;flex-shrink:0;padding-top:2px;}",
    ".px-ai-ia-matrix-cols{display:grid;grid-template-columns:46px 1fr 1fr;gap:8px;margin-bottom:8px;}",
    ".px-ai-ia-matrix-col-hd{text-align:center;font-size:11px;font-weight:800;border-radius:8px;padding:7px 8px;line-height:1.2;}",
    ".px-ai-ia-matrix-col-hd.pos{background:rgba(126,166,255,.12);color:#7ea6ff;border:1px solid rgba(126,166,255,.22);}",
    ".px-ai-ia-matrix-col-hd.neg{background:rgba(242,148,156,.1);color:#f2949c;border:1px solid rgba(242,148,156,.22);}",
    ".px-ai-ia-matrix-row{display:grid;grid-template-columns:46px 1fr 1fr;gap:8px;align-items:stretch;margin-bottom:8px;}",
    ".px-ai-ia-matrix-row:last-child{margin-bottom:0;}",
    ".px-ai-ia-matrix-row-label{display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:10px;font-weight:800;line-height:1.25;text-align:center;padding:6px 4px;min-height:100%;}",
    ".px-ai-ia-matrix-row-label.h{background:#3d375e;color:#c7b8ff;}",
    ".px-ai-ia-matrix-row-label.m{background:#3a341a;color:#e8c46a;}",
    ".px-ai-ia-matrix-row-label.l{background:#2a2d34;color:#9b99a8;}",
    ".px-ai-ia-matrix-cell{display:flex;flex-direction:column;gap:6px;min-height:100%;}",
    ".px-ai-ia-matrix-chip{display:block;width:100%;border:1px solid #2d2c36;border-radius:8px;background:#17161d;padding:9px 10px;text-align:left;cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s;}",
    ".px-ai-ia-matrix-chip:hover{border-color:#4a4560;background:#1c1a24;}",
    ".px-ai-ia-matrix-chip:focus{outline:2px solid rgba(126,166,255,.35);outline-offset:1px;}",
    ".px-ai-ia-matrix-chip-issue{display:block;font-size:11px;font-weight:800;color:#fff;line-height:1.45;margin-bottom:4px;}",
    ".px-ai-ia-matrix-chip-act{display:block;font-size:10px;font-weight:700;line-height:1.45;}",
    ".px-ai-ia-matrix-chip.pos .px-ai-ia-matrix-chip-act{color:#7ea6ff;}",
    ".px-ai-ia-matrix-chip.neg .px-ai-ia-matrix-chip-act{color:#f2949c;}",
    ".px-ai-ia-matrix-empty{font-size:10px;color:#5f5e66;padding:10px 8px;border:1px dashed #2d2c36;border-radius:8px;background:rgba(23,22,29,.55);text-align:center;line-height:1.45;}",
    ".px-ai-ia-matrix-foot{margin-top:12px;padding-top:10px;border-top:1px dashed #2d2c36;font-size:9.5px;color:#7a7887;line-height:1.55;}",
    ".px-ai-ia-matrix-monitor{margin-top:14px;padding-top:12px;border-top:1px dashed #2d2c36;}",
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
    ".px-ai-root.px-ai-voc .px-ai-mon-stats{font-size:11px;color:#a9a7b6;}",
    ".px-ai-root.px-ai-voc .px-ai-mon-reason{font-size:10px;color:#7a7887;}",
    ".px-ai-root.px-ai-voc .px-ai-mon-item{border-top:1px solid #2d2c36;padding:8px 0;}",
    ".px-ai-root.px-ai-voc .px-ai-body-stack{gap:0;padding-top:0;}",
    ".px-ai-matrix-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}",
    ".px-ai-matrix-quad{border:1px solid #2d2c36;border-radius:10px;padding:12px;}",
    ".px-ai-matrix-quad-desc{font-size:10px;color:#7a7887;margin:2px 0 10px;}",
    ".px-ai-matrix-card{background:#17161d;border:1px solid #2d2c36;border-radius:8px;padding:10px 12px;margin-bottom:8px;}",
    ".px-ai-matrix-card-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;gap:8px;}",
    ".px-ai-matrix-card-name{font-size:12px;font-weight:700;color:#fff;}",
    ".px-ai-matrix-card-score{font-size:12px;color:#dcdae6;}",
    ".px-ai-matrix-tags{display:flex;flex-wrap:wrap;gap:5px;font-size:10px;}",
    ".px-ai-matrix-tag{border-radius:999px;padding:1px 7px;}",
    ".px-ai-matrix-tag.org{background:#24303e;color:#8fb4e0;}",
    ".px-ai-matrix-tag.kw{background:#2a2438;color:#c7a6f2;}",
    ".px-ai-matrix-tag.warn{background:#3a341a;color:#e8c46a;}",
    ".px-ai-matrix-warn{background:#2a2418;border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:11px;color:#e8c46a;}",
    ".px-ai-matrix-warn.sample{background:#2a1f24;color:#f2a6ad;}",
    ".px-ai-matrix-empty{font-size:11px;color:#7a7887;padding:6px 0;margin:0;}",
    ".px-ai-vbadge-neutral{background:#24303e;color:#8fb4e0;}",
    ".px-ai-split.embedded{margin-top:16px;}",
    ".px-ai-area-bar-row{margin-bottom:8px;}",
    ".px-ai-area-bar-meta{display:flex;justify-content:space-between;font-size:11px;color:#cfcdda;margin-bottom:3px;}",
    ".px-ai-area-bar-track{height:6px;border-radius:3px;background:#2d2c36;overflow:hidden;}",
    ".px-ai-area-bar-fill{height:100%;}",
    ".px-ai-survey-grade-strip{display:grid;grid-template-columns:0.82fr 0.82fr 1.38fr 0.82fr 0.82fr;gap:6px;margin:8px 0 10px;align-items:stretch;}",
    ".px-ai-survey-grade-box{border:1px solid #2d2c36;border-radius:10px;padding:8px 4px;text-align:center;background:#17161d;min-height:52px;display:flex;flex-direction:column;justify-content:center;}",
    ".px-ai-survey-grade-box.on{border:1.5px solid #f2949c;background:#3a1f24;min-height:64px;padding:10px 6px;}",
    ".px-ai-survey-grade-lbl{font-size:9.5px;font-weight:800;color:#7a7887;}",
    ".px-ai-survey-grade-box.on .px-ai-survey-grade-lbl{color:#f2949c;font-size:10.5px;}",
    ".px-ai-survey-grade-range{font-size:10px;font-weight:800;color:#cfcdda;margin-top:3px;}",
    ".px-ai-survey-grade-box.on .px-ai-survey-grade-range{color:#f2949c;font-size:11px;font-weight:800;margin-top:4px;}",
    ".px-ai-survey-upper-grade{border:1px solid rgba(126,166,255,.42);background:rgba(126,166,255,.07);border-radius:10px;padding:8px 10px;margin-bottom:8px;}",
    ".px-ai-survey-upper-grade-title{font-size:10px;font-weight:700;color:#7ea6ff;margin-bottom:8px;}",
    ".px-ai-survey-upper-grade-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}",
    ".px-ai-survey-upper-grade-item{background:rgba(23,22,29,.55);border:1px solid rgba(126,166,255,.22);border-radius:8px;padding:8px 9px;}",
    ".px-ai-survey-upper-grade-item-k{font-size:10px;font-weight:800;color:#a9a7b6;margin-bottom:3px;}",
    ".px-ai-survey-upper-grade-item-v{font-size:17px;font-weight:800;color:#7ea6ff;line-height:1.1;letter-spacing:-0.02em;}",
    ".px-ai-survey-upper-grade-item-v .unit{font-size:11px;font-weight:800;margin-left:1px;}",
    ".px-ai-survey-upper-grade-item-d{font-size:9px;font-weight:700;color:#7a7887;margin-top:4px;line-height:1.35;}",
    ".px-ai-survey-upper-grade-track-wrap{margin-top:8px;padding-bottom:14px;}",
    ".px-ai-survey-next-grade-track{position:relative;height:5px;border-radius:999px;background:#2d2c36;overflow:visible;}",
    ".px-ai-survey-next-grade-fill{position:absolute;left:0;top:0;bottom:0;border-radius:999px;background:linear-gradient(90deg,rgba(242,148,156,.55),rgba(126,166,255,.45));}",
    ".px-ai-survey-next-grade-thumb{position:absolute;top:50%;width:10px;height:10px;border-radius:50%;background:#f2949c;border:2px solid #17161d;transform:translate(-50%,-50%);box-shadow:0 0 0 1px rgba(242,148,156,.35);}",
    ".px-ai-survey-next-grade-labels{display:flex;justify-content:space-between;font-size:9px;font-weight:800;margin-top:5px;}",
    ".px-ai-survey-next-grade-labels .cur{color:#f2949c;}",
    ".px-ai-survey-next-grade-labels .tgt{color:#7ea6ff;}",
    ".px-ai-survey-demotion-warn{border:1px solid rgba(242,148,156,.45);background:rgba(58,31,36,.55);border-radius:8px;padding:7px 10px;font-size:10px;font-weight:700;color:#e8b4b8;line-height:1.45;margin-bottom:10px;}",
    ".px-ai-survey-demotion-warn .hot{color:#f2949c;font-weight:800;}",
    ".px-ai-grade-sum{font-size:11px;color:#a9a7b6;line-height:1.65;margin-top:8px;}",
    ".px-ai-grade-sum .hl{color:#f2949c;font-weight:800;}",
    ".px-ai-survey-footnote{font-size:9.5px;color:#7a7887;line-height:1.5;margin-top:8px;padding-top:8px;border-top:1px dashed #2d2c36;}",
    ".px-ai-survey-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0 10px;}",
    ".px-ai-survey-mini-card{background:#17161d;border:1px solid #2d2c36;border-radius:10px;padding:12px 11px;}",
    ".px-ai-survey-mini-k{font-size:10.5px;font-weight:700;color:#a9a7b6;margin-bottom:6px;}",
    ".px-ai-survey-mini-v{font-size:18px;font-weight:800;color:#fff;line-height:1.2;letter-spacing:-0.02em;}",
    ".px-ai-survey-mini-v .is-accent{color:#7ea6ff;}",
    ".px-ai-survey-mini-v.is-accent{color:#7ea6ff;}",
    ".px-ai-survey-mini-d{font-size:10px;font-weight:700;margin-top:5px;color:#7a7887;}",
    ".px-ai-survey-bed-row{display:flex;gap:6px;margin-bottom:10px;}",
    ".px-ai-survey-bed-chip{flex:1;text-align:center;border:1px solid #2d2c36;border-radius:8px;padding:7px 3px;background:#17161d;}",
    ".px-ai-survey-bed-chip.on{border:1.5px solid #f2949c;background:#3a1f24;}",
    ".px-ai-survey-bed-chip-lbl{font-size:9.5px;color:#7a7887;}",
    ".px-ai-survey-bed-chip.on .px-ai-survey-bed-chip-lbl{color:#f2949c;font-weight:700;}",
    ".px-ai-survey-bed-chip-v{font-size:11px;font-weight:800;color:#fff;margin-top:3px;}",
    ".px-ai-survey-bed-chip.on .px-ai-survey-bed-chip-v{color:#f2949c;}",
    ".px-ai-survey-bed-chip-n{font-size:8.5px;color:#7a7887;margin-top:1px;}",
    ".px-ai-survey-gap-tbl{width:100%;border-collapse:collapse;font-size:10.5px;}",
    ".px-ai-survey-gap-tbl th,.px-ai-survey-gap-tbl td{padding:6px 3px;border-bottom:1px solid #1c2338;}",
    ".px-ai-survey-gap-tbl th{text-align:right;color:#7a7887;font-weight:800;}",
    ".px-ai-survey-gap-tbl th:first-child,.px-ai-survey-gap-tbl td:first-child{text-align:left;}",
    ".px-ai-survey-gap-tbl td{color:#cfcdda;}",
    ".px-ai-survey-priority-card{background:#17161d;border:1px solid #2d2c36;border-radius:10px;padding:10px;margin-bottom:8px;}",
    ".px-ai-survey-priority-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;}",
    ".px-ai-survey-priority-title{font-size:12px;font-weight:800;color:#fff;}",
    ".px-ai-survey-rank-row{display:flex;align-items:center;gap:8px;font-size:11.5px;margin-bottom:4px;}",
    ".px-ai-survey-rank-lbl{flex:1;color:#a9a7b6;font-weight:700;}",
    ".px-ai-survey-rank-val{font-weight:800;color:#fff;}",
    ".px-ai-survey-rank-val.hot{color:#f2949c;}",
    ".px-ai-survey-quartile-wrap{margin-top:12px;padding-top:10px;border-top:1px dashed #2d2c36;}",
    ".px-ai-grade-pos-card{background:#17161d;border:1px solid #2d2c36;border-radius:12px;padding:12px;margin-top:10px;}",
    ".px-ai-grade-pos-card-hd{font-size:11px;font-weight:800;color:#a9a7b6;margin-bottom:10px;}",
    ".px-ai-grade-pos-summary{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;align-items:stretch;}",
    ".px-ai-grade-pos-block{border-radius:10px;padding:10px 11px;border:1px solid #2d2c36;background:#201f27;min-width:0;height:100%;}",
    ".px-ai-grade-pos-block.is-primary{border-color:rgba(242,148,156,.45);background:rgba(58,31,36,.35);}",
    ".px-ai-grade-pos-block.is-secondary{border-color:rgba(126,166,255,.35);background:rgba(30,36,58,.45);}",
    ".px-ai-grade-pos-tag{display:inline-block;font-size:9px;font-weight:800;color:#7a7887;background:#2a2933;border-radius:999px;padding:2px 7px;margin-bottom:6px;letter-spacing:.02em;}",
    ".px-ai-grade-pos-block.is-primary .px-ai-grade-pos-tag{color:#f2949c;background:rgba(242,148,156,.15);}",
    ".px-ai-grade-pos-block.is-secondary .px-ai-grade-pos-tag{color:#7ea6ff;background:rgba(126,166,255,.12);}",
    ".px-ai-grade-pos-headline{font-size:14px;font-weight:800;color:#fff;line-height:1.35;letter-spacing:-0.02em;}",
    ".px-ai-grade-pos-block.is-primary .px-ai-grade-pos-headline{color:#ffd0d4;}",
    ".px-ai-grade-pos-sub{font-size:10.5px;font-weight:700;color:#a9a7b6;margin-top:4px;line-height:1.45;}",
    ".px-ai-grade-pos-dir{font-size:10px;font-weight:700;color:#9b99a8;margin-top:5px;line-height:1.45;padding-top:5px;border-top:1px dashed rgba(242,148,156,.25);}",
    ".px-ai-quartile-bar-wrap{position:relative;padding-top:42px;padding-bottom:4px;}",
    ".px-ai-survey-quartile-bar{position:relative;height:28px;border-radius:8px;overflow:visible;display:flex;margin-top:0;border:1px solid rgba(45,44,54,.9);}",
    ".px-ai-survey-quartile-seg{flex:1;border-radius:0;position:relative;min-width:0;}",
    ".px-ai-survey-quartile-seg:first-child{border-radius:7px 0 0 7px;}",
    ".px-ai-survey-quartile-seg:last-child{border-radius:0 7px 7px 0;}",
    ".px-ai-survey-quartile-marker{position:absolute;top:-4px;bottom:-4px;width:3px;background:#f2949c;z-index:3;box-shadow:0 0 8px rgba(242,148,156,.55);}",
    ".px-ai-survey-quartile-marker-dot{position:absolute;top:50%;left:50%;width:12px;height:12px;border-radius:50%;background:#f2949c;border:2px solid #17161d;transform:translate(-50%,-50%);z-index:4;box-shadow:0 0 0 2px rgba(242,148,156,.35);}",
    ".px-ai-survey-quartile-marker-lbl{position:absolute;top:-38px;font-size:10px;font-weight:800;color:#f2949c;white-space:nowrap;line-height:1.3;z-index:5;background:rgba(58,31,36,.92);border:1px solid rgba(242,148,156,.45);border-radius:6px;padding:3px 6px;}",
    ".px-ai-survey-quartile-marker-lbl.is-edge-left{transform:none;text-align:left;}",
    ".px-ai-survey-quartile-marker-lbl.is-edge-right{transform:none;text-align:right;}",
    ".px-ai-survey-quartile-marker-lbl.is-center{transform:translateX(-50%);}",
    ".px-ai-survey-quartile-marker-lbl .sub{display:block;font-size:8.5px;font-weight:700;color:#e8b4b8;margin-top:1px;text-align:center;}",
    ".px-ai-survey-quartile-ticks{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;margin-top:10px;}",
    ".px-ai-survey-quartile-tick{text-align:center;font-size:9px;line-height:1.35;min-width:0;padding:0 1px;}",
    ".px-ai-survey-quartile-tick .lbl{display:block;font-weight:800;color:#cfcdda;word-break:keep-all;overflow-wrap:break-word;}",
    ".px-ai-survey-quartile-tick .score{display:block;font-weight:800;color:#f2949c;margin-top:2px;font-size:9.5px;}",
    ".px-ai-survey-quartile-tick .stat{display:block;font-weight:700;color:#7a7887;margin-top:1px;font-size:8px;}",
    ".px-ai-grade-current-only{margin-top:12px;}",
    ".px-ai-grade-metric.is-single{width:100%;}",
    ".px-ai-grade-metric{background:#201f27;border:1px solid #2d2c36;border-radius:10px;padding:9px 10px;min-width:0;}",
    ".px-ai-grade-metric.is-status{border-color:rgba(242,148,156,.38);background:rgba(58,31,36,.28);}",
    ".px-ai-grade-metric.is-goal{border-color:#2d2c36;background:#201f27;}",
    ".px-ai-grade-metric-k{font-size:10px;font-weight:700;color:#a9a7b6;line-height:1.4;margin-bottom:5px;}",
    ".px-ai-grade-metric-v{font-size:16px;font-weight:800;color:#fff;line-height:1.2;letter-spacing:-0.02em;}",
    ".px-ai-grade-metric.is-status .px-ai-grade-metric-v{color:#f2949c;}",
    ".px-ai-grade-metric.is-goal .px-ai-grade-metric-v{color:#7ea6ff;}",
    ".px-ai-grade-metric-d{font-size:8.5px;font-weight:600;color:#7a7887;margin-top:5px;line-height:1.45;}",
    ".px-ai-grade-stats-details{margin-top:10px;border:1px solid #2d2c36;border-radius:8px;background:#201f27;overflow:hidden;}",
    ".px-ai-grade-stats-details summary{cursor:pointer;font-size:10px;font-weight:800;color:#8fb4e0;padding:9px 11px;list-style:none;user-select:none;}",
    ".px-ai-grade-stats-details summary::-webkit-details-marker{display:none;}",
    ".px-ai-grade-stats-details summary::after{content:'▾';float:right;color:#7a7887;font-size:11px;}",
    ".px-ai-grade-stats-details[open] summary::after{transform:rotate(180deg);display:inline-block;}",
    ".px-ai-grade-stats-details-body{padding:0 11px 10px;font-size:10px;color:#9b99a8;line-height:1.6;}",
    ".px-ai-grade-stats-details-body p{margin:0 0 6px;}",
    ".px-ai-grade-stats-details-body p:last-child{margin-bottom:0;}",
    "@media (max-width:520px){.px-ai-grade-pos-summary{grid-template-columns:1fr;}.px-ai-survey-quartile-tick .lbl{font-size:8.5px;}.px-ai-grade-pos-headline{font-size:13px;}}",
    ".px-ai-breadcrumb{font-size:12px;font-weight:700;color:#9b99a8;margin:4px 0 14px;}",
    ".px-ai-top-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}",
    ".px-ai-report-head-btn{border:1px solid #8b5cf6;background:rgba(139,92,246,.12);color:#ddd6fe;font-size:12px;font-weight:700;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:inherit;white-space:nowrap;}",
    ".px-ai-report-head-btn:hover{background:rgba(139,92,246,.22);color:#fff;}",
    ".px-ai-inner-tabs{display:flex;align-items:flex-end;gap:14px;border-bottom:1px solid #2d2c36;margin:0 0 12px;flex-wrap:wrap;}",
    ".px-ai-inner-tab{border:none;background:transparent;font-size:13px;color:#7a7887;padding:8px 2px 9px;cursor:pointer;border-bottom:2px solid transparent;font-family:inherit;white-space:nowrap;}",
    ".px-ai-inner-tab.on{color:#fff;font-weight:700;border-bottom-color:#fff;}",
    ".px-ai-inner-tab-report.on{color:#ddd6fe;border-bottom-color:#8b5cf6;}",
    ".px-ai-saved-report-tabs{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap;}",
    ".px-ai-saved-rpt-wrap{display:flex;flex-direction:column;gap:8px;height:100%;min-height:420px;}",
    ".px-ai-saved-rpt-meta{font-size:11px;color:#9b99a8;font-weight:600;}",
    ".px-ai-saved-rpt-frame{flex:1;width:100%;min-height:360px;border:1px solid #2d2c36;border-radius:10px;background:#fff;}",
    ".px-ai-history-head-btn{border:1px solid #2d2c36;background:#201f27;color:#cfcdda;font-size:12px;font-weight:700;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:inherit;white-space:nowrap;}",
    ".px-ai-history-head-btn:hover{border-color:#8b5cf6;color:#fff;background:#241f36;}",
    ".px-ai-history-head-btn.on{border-color:#8b5cf6;color:#ddd6fe;background:rgba(139,92,246,.14);}",
    ".px-ai-history-back{border:none;background:transparent;color:#8fb4e0;font-size:12px;font-weight:700;padding:8px 2px;cursor:pointer;font-family:inherit;}",
    ".px-ai-history-back:hover{color:#fff;}",
    ".px-ai-history-filters{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px;}",
    ".px-ai-history-filter{border:1px solid #2d2c36;background:#201f27;color:#cfcdda;font-size:12px;font-weight:700;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:inherit;}",
    ".px-ai-history-filter.on{border-color:#8b5cf6;background:rgba(139,92,246,.16);color:#fff;}",
    ".px-ai-history-item-kind{display:inline-flex;align-items:center;border-radius:999px;padding:1px 8px;font-size:10px;font-weight:700;margin-right:6px;background:#24303e;color:#8fb4e0;}",
    ".px-ai-history-item-kind.survey{background:#2a2438;color:#c7a6f2;}",
    ".px-ai-history-list{display:flex;flex-direction:column;gap:16px;padding-bottom:8px;}",
    ".px-ai-history-day{font-size:11px;font-weight:800;color:#9b99a8;letter-spacing:.04em;margin:0 0 6px;}",
    ".px-ai-history-items{display:flex;flex-direction:column;gap:8px;}",
    ".px-ai-history-item{border:1px solid #2d2c36;border-radius:10px;background:#201f27;padding:12px 14px;text-align:left;font-family:inherit;width:100%;transition:border-color .15s,background .15s;}",
    ".px-ai-history-item:hover{border-color:#4a4560;background:#24232c;}",
    ".px-ai-history-item.on{border-color:#8b5cf6;background:#241f36;}",
    ".px-ai-history-item-main{border:0;background:transparent;padding:0;text-align:left;cursor:pointer;width:100%;font-family:inherit;color:inherit;}",
    ".px-ai-history-item-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;}",
    ".px-ai-history-dl-btn{border:1px solid #3a3848;background:#17171c;color:#cfcdda;font-size:10px;font-weight:700;padding:5px 10px;border-radius:6px;cursor:pointer;font-family:inherit;line-height:1.2;}",
    ".px-ai-history-dl-btn:hover:not(:disabled){border-color:#8b5cf6;background:rgba(139,92,246,.12);color:#fff;}",
    ".px-ai-history-dl-btn:disabled{opacity:.42;cursor:not-allowed;}",
    ".px-ai-history-item-title{font-size:13px;font-weight:700;color:#fff;margin:0 0 4px;}",
    ".px-ai-history-item-meta{font-size:11px;color:#7a7887;margin:0;line-height:1.5;}",
    ".px-ai-history-item-badge{display:inline-flex;align-items:center;border-radius:999px;padding:1px 8px;font-size:10px;font-weight:700;margin-right:6px;}",
    ".px-ai-history-item-badge.saved{background:rgba(74,222,128,.12);color:#7fd6b0;}",
    ".px-ai-history-item-badge.draft{background:rgba(251,191,36,.12);color:#e8c46a;}",
    ".px-ai-history-item-badge.empty{background:#2d2c36;color:#7a7887;}",
    ".px-ai-history-empty{font-size:12px;color:#7a7887;line-height:1.6;padding:12px 0;margin:0;}",
    ".px-ai-history-detail-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px;}",
    ".px-ai-history-detail-actions{display:flex;justify-content:flex-end;margin:0 0 10px;}",
    ".px-ai-history-detail-tab{border:1px solid #2d2c36;background:#201f27;color:#cfcdda;font-size:12px;font-weight:700;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:inherit;}",
    ".px-ai-history-detail-tab.on{border-color:#8b5cf6;background:rgba(139,92,246,.16);color:#fff;}",
    ".px-ai-history-detail-banner{font-size:11px;color:#9b99a8;background:#201f27;border:1px solid #2d2c36;border-radius:8px;padding:8px 10px;margin:0 0 10px;line-height:1.5;}",
    ".px-ai-history-detail-frame{flex:1;width:100%;min-height:360px;border:1px solid #2d2c36;border-radius:10px;background:#fff;}",
    ".px-ai-history-detail-host{flex:1;min-height:360px;border:1px solid #2d2c36;border-radius:10px;background:#17171c;overflow:auto;}",
    ".px-ai-history-report-head{border:1px solid #2d2c36;border-radius:10px;background:#201f27;padding:10px 12px;margin:0 0 10px;}",
    ".px-ai-history-report-title{font-size:13px;font-weight:800;color:#fff;margin:0 0 4px;}",
    ".px-ai-history-report-sub{font-size:11px;color:#9b99a8;margin:0;line-height:1.5;}",
    ".px-ai-setup-chip-base{font-size:12px;padding:8px 14px;border-radius:999px;border:1px solid #2d2c36;background:#201f27;color:#7a7887;}",
    ".px-ai-setup-chip{font-size:12px;padding:8px 14px;border-radius:999px;border:1px solid #2d2c36;background:#201f27;color:#cfcdda;cursor:pointer;}",
    ".px-ai-strength-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px;}",
    ".px-ai-strength-card{border:1px solid #2d2c36;border-radius:10px;padding:12px 14px;cursor:pointer;background:#201f27;transition:border-color .15s,background .15s;}",
    ".px-ai-strength-card.on{border-color:#8b5cf6;background:#241f36;}",
    ".px-ai-strength-title{font-size:13px;font-weight:700;color:#fff;margin:0 0 6px;}",
    ".px-ai-strength-desc{font-size:11px;color:#7a7887;line-height:1.55;margin:0;}",
    "@media (max-width:820px){.px-ai-strength-grid{grid-template-columns:1fr;}}",
    ".px-ai-gen-inline{width:auto;margin-top:0;}",
    ".px-ai-preset-btn{cursor:pointer;font-size:11px;font-weight:700;padding:6px 12px;border-radius:8px;border:1px solid #2d2c36;background:#201f27;color:#cfcdda;}",
    ".px-ai-link-btn{cursor:pointer;font-size:11px;color:#8fb4e0;}",
    ".px-ai-link-btn.muted{color:#7a7887;}",
    ".px-ai-rpt-section-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #35334a;}",
    ".px-ai-rpt-section-ttl{font-size:14px;font-weight:800;color:#fff;margin:0;}",
    ".px-ai-import-btn{cursor:pointer;font-size:11px;font-weight:700;color:#8fb4e0;border:1px solid #2d2c36;border-radius:8px;padding:5px 10px;background:transparent;font-family:inherit;}",
    ".px-ai-import-item{border:1px dashed #4a4560;border-radius:8px;padding:10px 12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;}",
    ".px-ai-import-overlay{position:fixed;inset:0;z-index:600;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:24px 16px;}",
    ".px-ai-import-dialog{background:#17171c;border:1px solid #2d2c36;border-radius:14px;padding:1.5rem 1.75rem;max-width:420px;width:100%;}",
    ".px-ai-import-pick{cursor:pointer;padding:10px 12px;border:1px solid #2d2c36;border-radius:8px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;}",
    ".px-ai-import-pick:hover{border-color:#4a4560;}",
    ".px-ai-rpt-builder{display:block;margin-top:4px;}",
    ".px-ai-rpt-doc-wrap{margin-top:4px;padding-bottom:12px;}",
    ".px-ai-rpt-doc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #2d2c36;}",
    ".px-ai-rpt-doc-head-exec{display:block;border-bottom:none;padding-bottom:0;margin-bottom:24px;}",
    ".px-ai-rpt-doc-badge{font-size:11px;color:#9b99a8;margin:0 0 6px;}",
    ".px-ai-rpt-doc-title{font-size:15px;font-weight:800;color:#fff;margin:0;}",
    ".px-ai-rpt-doc-head-exec .px-ai-rpt-doc-title{font-size:22px;margin-bottom:4px;}",
    ".px-ai-rpt-doc-author{font-size:12px;font-style:italic;color:#9b99a8;margin:0 0 16px;}",
    ".px-ai-rpt-overview-box{border-left:3px solid #8b5cf6;background:#201f27;border:1px solid #2d2c36;border-left-width:3px;border-radius:8px;padding:14px 16px;font-size:13px;line-height:1.75;color:#dcdae6;margin-bottom:4px;}",
    ".px-ai-rpt-exec-tbl{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px;}",
    ".px-ai-rpt-exec-tbl th{background:#1f1e1c;color:#fff;font-weight:700;padding:10px 12px;text-align:center;border:1px solid #2d2c36;}",
    ".px-ai-rpt-exec-tbl td{padding:10px 12px;text-align:center;border:1px solid #2d2c36;color:#cfcdda;}",
    ".px-ai-rpt-exec-tbl td:first-child{text-align:left;font-weight:600;color:#fff;}",
    ".px-ai-rpt-exec-tbl .good{color:#7ea6ff;font-weight:700;}",
    ".px-ai-rpt-exec-tbl .bad{color:#f2949c;font-weight:700;}",
    ".px-ai-rpt-exec-tbl .neu{color:#8fb4e0;font-weight:700;}",
    ".px-ai-rpt-status-intro{font-size:13px;line-height:1.7;color:#dcdae6;margin:0 0 12px;}",
    ".px-ai-rpt-status-narr{font-size:13px;line-height:1.75;color:#dcdae6;margin:16px 0 0;}",
    ".px-ai-rpt-bullet-list{margin:8px 0 0;padding-left:18px;color:#dcdae6;font-size:12px;line-height:1.8;}",
    ".px-ai-rpt-bullet-list li{margin-bottom:6px;}",
    ".px-ai-rpt-feature-quote{font-style:italic;color:#9b99a8;font-size:12px;line-height:1.7;margin:8px 0 8px 16px;padding-left:12px;border-left:2px solid #35334a;}",
    ".px-ai-rpt-risk-row{margin:8px 0;font-size:12px;line-height:1.7;color:#dcdae6;padding-left:12px;}",
    ".px-ai-rpt-risk-k{font-weight:700;margin-right:6px;}",
    ".px-ai-rpt-risk-k.good{color:#7ea6ff;}",
    ".px-ai-rpt-risk-k.neu{color:#9b99a8;}",
    ".px-ai-rpt-risk-k.bad{color:#f2949c;}",
    ".px-ai-rpt-opt-block{margin:14px 0 10px;}",
    ".px-ai-rpt-opt-title{font-size:13px;font-weight:700;color:#fff;margin:0 0 4px;}",
    ".px-ai-rpt-opt-title span{color:#8fb4e0;margin-right:8px;}",
    ".px-ai-rpt-opt-desc{font-size:11px;color:#9b99a8;line-height:1.65;margin:0 0 0 16px;}",
    ".px-ai-rpt-rec-box{border-left:3px solid #8b5cf6;background:#201f27;border:1px solid #2d2c36;border-left-width:3px;border-radius:8px;padding:14px 16px;font-size:13px;font-weight:700;line-height:1.7;color:#fff;margin-top:8px;}",
    ".px-ai-rpt-doc-info{width:100%;border-collapse:collapse;font-size:11px;margin:12px 0 20px;}",
    ".px-ai-rpt-doc-info td{border-top:1px solid #2d2c36;border-bottom:1px solid #2d2c36;padding:7px 10px;color:#cfcdda;}",
    ".px-ai-rpt-doc-info td.lbl{width:72px;background:#201f27;font-weight:700;color:#9b99a8;border-right:1px solid #35334a;}",
    ".px-ai-rpt-kpi-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:12px;}",
    ".px-ai-rpt-kpi-box{border:1px solid #2d2c36;border-radius:8px;padding:9px 8px;background:#201f27;}",
    ".px-ai-rpt-kpi-box .kl{font-size:10px;color:#9b99a8;margin-bottom:3px;}",
    ".px-ai-rpt-kpi-box .kv{font-size:15px;font-weight:800;color:#fff;}",
    ".px-ai-rpt-kpi-box .kd{font-size:10px;font-weight:700;margin-top:2px;color:#9b99a8;}",
    ".px-ai-rpt-kpi-box .kd.good{color:#7ea6ff;}",
    ".px-ai-rpt-exec-tbl td.rowlabel{text-align:left;font-weight:700;background:#201f27;color:#fff;}",
    ".px-ai-rpt-cap{font-size:10px;color:#9b99a8;margin:-4px 0 14px;line-height:1.55;}",
    ".px-ai-rpt-chart-block{border:1px solid #2d2c36;border-radius:8px;padding:13px 14px 10px;margin-bottom:14px;background:#201f27;}",
    ".px-ai-rpt-chart-title{font-size:11px;font-weight:700;color:#cfcdda;margin:0 0 10px;}",
    ".px-ai-rpt-bar-row{display:flex;align-items:center;gap:8px;margin-bottom:6px;}",
    ".px-ai-rpt-bar-name{width:120px;font-size:10px;color:#9b99a8;flex-shrink:0;}",
    ".px-ai-rpt-bar-track{flex:1;background:#17171c;border-radius:3px;height:12px;overflow:hidden;}",
    ".px-ai-rpt-bar-fill{height:100%;border-radius:3px;}",
    ".px-ai-rpt-bar-val{width:72px;font-size:10px;text-align:right;font-weight:700;color:#cfcdda;flex-shrink:0;}",
    ".px-ai-rpt-kw-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}",
    ".px-ai-rpt-kw-hd{font-size:11px;font-weight:700;margin:0 0 8px;}",
    ".px-ai-rpt-kw-hd.pos{color:#7ea6ff;}",
    ".px-ai-rpt-kw-hd.neg{color:#f2949c;}",
    ".px-ai-rpt-trend-legend{display:flex;gap:14px;font-size:10px;color:#9b99a8;margin-top:8px;}",
    ".px-ai-rpt-trend-legend span{display:inline-flex;align-items:center;gap:5px;}",
    ".px-ai-rpt-trend-dot{width:9px;height:9px;border-radius:2px;display:inline-block;}",
    ".px-ai-rpt-body-intro{font-size:12px;line-height:1.75;color:#dcdae6;margin:0 0 12px;}",
    ".px-ai-rpt-flag-card{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;}",
    ".px-ai-rpt-flag-tag{flex-shrink:0;font-size:10px;font-weight:800;padding:5px 10px;border-radius:999px;background:#3a1f24;color:#f2a6ad;}",
    ".px-ai-rpt-flag-tag.purple{background:#2a2438;color:#c7a6f2;}",
    ".px-ai-rpt-flag-body{font-size:12px;color:#dcdae6;line-height:1.6;}",
    ".px-ai-rpt-flag-cnt{font-weight:800;color:#fff;}",
    ".px-ai-rpt-quote-box{border-left:3px solid #35334a;padding:4px 0 4px 12px;margin-bottom:8px;font-size:12px;font-style:italic;color:#9b99a8;}",
    ".px-ai-rpt-quote-meta{font-size:10px;color:#7a7887;font-style:normal;margin-left:6px;}",
    ".px-ai-rpt-risk-badge-row{display:flex;gap:10px;margin-bottom:8px;align-items:flex-start;}",
    ".px-ai-rpt-risk-badge{flex-shrink:0;width:92px;text-align:center;font-size:10px;font-weight:800;padding:6px 0;border-radius:4px;color:#fff;}",
    ".px-ai-rpt-risk-badge.low{background:#0C447C;}",
    ".px-ai-rpt-risk-badge.mid{background:#A67A1E;}",
    ".px-ai-rpt-risk-badge.high{background:#791F1F;}",
    ".px-ai-rpt-opt-rec{display:inline-block;font-size:9px;font-weight:800;color:#fff;background:#0C447C;padding:2px 6px;border-radius:3px;margin-left:6px;}",
    ".px-ai-rpt-tl-week{font-weight:800;color:#8fb4e0;}",
    ".px-ai-rpt-doc-footer{margin-top:28px;padding-top:12px;border-top:1px solid #2d2c36;font-size:9px;color:#7a7887;display:flex;justify-content:space-between;}",
    "@media (max-width:820px){.px-ai-rpt-kpi-strip{grid-template-columns:repeat(2,1fr);}.px-ai-rpt-kw-grid{grid-template-columns:1fr;}}",
    ".px-ai-rpt-doc-section{margin-bottom:28px;}",
    ".px-ai-rpt-doc-section:last-child{margin-bottom:0;}",
    ".px-ai-root.px-ai-voc .px-ai-rpt-section-ttl{font-size:15px;font-weight:800;}",
    ".px-ai-root.px-ai-voc .px-ai-rpt-sec{margin-bottom:14px;}",
    ".px-ai-root.px-ai-voc .px-ai-rpt-sec:last-child{margin-bottom:0;}",
    "[data-role=\"report-out\"]{margin-top:16px;}",
    ".px-ai-rpt-builder-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}",
    ".px-ai-rpt-builder-title{font-size:14px;font-weight:700;color:#1f1e1c;margin:0;}",
    ".px-ai-rpt-builder-note{font-size:11px;color:#898781;margin:0 0 12px;line-height:1.5;}",
    ".px-ai-rpt-row{border:1px solid #cfcdc5;border-radius:10px;padding:12px 14px;margin-bottom:10px;background:#fff;}",
    ".px-ai-rpt-row-title{font-size:13px;font-weight:700;color:#1f1e1c;margin:0 0 4px;}",
    ".px-ai-rpt-row-desc{font-size:11px;color:#898781;margin:0 0 10px;line-height:1.5;}",
    ".px-ai-rpt-row-opts{display:flex;flex-wrap:wrap;gap:12px;}",
    ".px-ai-rpt-opt{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#5f5e5a;cursor:pointer;user-select:none;}",
    ".px-ai-rpt-opt input{accent-color:#8b5cf6;width:14px;height:14px;}",
    ".px-ai-rpt-opt.on{color:#1f1e1c;font-weight:600;}",
    ".px-ai-rpt-builder-actions{margin-top:14px;padding-top:12px;border-top:1px solid #cfcdc5;}",
    ".px-ai-rpt-builder-actions .px-ai-gen{width:100%;margin-top:0;}",
    ".px-ai-rpt-preview-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #2d2c36;}",
    ".px-ai-rpt-preview-title{font-size:15px;font-weight:800;color:#fff;margin:0;}",
    ".px-ai-rpt-preview-sum{background:#201f27;border:1px solid #2d2c36;border-radius:10px;padding:14px;margin-bottom:12px;}",
    ".px-ai-rpt-preview-sum-hd{font-size:12px;font-weight:700;color:#cfcdda;margin:0 0 10px;}",
    ".px-ai-rpt-sum-part{margin-bottom:10px;}",
    ".px-ai-rpt-sum-part:last-child{margin-bottom:0;}",
    ".px-ai-rpt-sum-k{font-size:10px;font-weight:700;color:#8b5cf6;margin:0 0 4px;letter-spacing:.02em;}",
    ".px-ai-rpt-sum-v{font-size:12px;color:#dcdae6;line-height:1.7;margin:0;}",
    ".px-ai-rpt-preview-block{background:#201f27;border:1px solid #2d2c36;border-radius:10px;padding:12px 14px;margin-bottom:10px;}",
    ".px-ai-rpt-preview-block-hd{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;gap:8px;}",
    ".px-ai-rpt-preview-block-ttl{font-size:12px;font-weight:700;color:#fff;margin:0;}",
    ".px-ai-rpt-preview-block-tag{font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;}",
    ".px-ai-rpt-preview-block-tag.ai{background:#2a2438;color:#c7a6f2;}",
    ".px-ai-rpt-preview-block-tag.stat{background:#24303e;color:#8fb4e0;}",
    ".px-ai-rpt-sw-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;}",
    ".px-ai-rpt-sw{font-size:11px;line-height:1.6;border-radius:8px;padding:8px 10px;}",
    ".px-ai-rpt-sw.pos{background:rgba(74,222,128,0.08);border-left:2px solid #4ade80;color:#cfcdda;}",
    ".px-ai-rpt-sw.neg{background:rgba(248,113,113,0.08);border-left:2px solid #f87171;color:#cfcdda;}",
    ".px-ai-rpt-sw-k{font-size:10px;font-weight:700;margin:0 0 4px;}",
    ".px-ai-rpt-sw-k.pos{color:#7ea6ff;}",
    ".px-ai-rpt-sw-k.neg{color:#f2949c;}",
    "@media (max-width:900px){.px-ai-rpt-doc-wrap{max-height:none;}}",
    ".px-ai-archive-embed{height:100%;min-height:100%;display:flex;flex-direction:column;box-sizing:border-box;}",
    ".px-ai-archive-embed .px-ai-scroll{flex:1 1 auto;min-height:0;overflow:auto;padding:12px 14px 18px;}"
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

  var STRENGTH_META = {
    voc: {
      subtitle: "분석 깊이를 선택하면 그에 맞는 VOC 통계 분석 결과를 보여드립니다.",
      cards: {
        simple: "AI 요약 · AI 인사이트 · 핵심 지표 변화 · 변화 키워드 TOP3",
        basic: "심플 + 상승(긍정) · 권장 조치 5개, 하락(부정) · 권장 조치 5개",
        deep: "기본 + 긍정·부정 이슈 매트릭스 · 모니터링"
      }
    },
    survey: {
      subtitle: "분석 깊이를 선택하면 그에 맞는 환자경험평가 분석 결과를 보여드립니다.",
      cards: {
        simple: "AI 요약 · AI 인사이트 · 핵심 지표 · 등급 분석",
        basic: "심플 + 병상수별 분석 · 영역별 격차",
        deep: "기본 + 2등급 진입 우선순위 · 영역 진단 매트릭스 · 모니터링"
      }
    }
  };

  function mountPxAiStrengthPicker(host, options) {
    if (!host) return function () {};
    options = options || {};
    var variant = options.variant === "survey" ? "survey" : "voc";
    var meta = STRENGTH_META[variant] || STRENGTH_META.voc;
    var selected = options.level || "basic";
    host.innerHTML =
      '<style>' + STRENGTH_CSS + '</style>' +
      '<div class="px-ai-str-root">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">' +
          '<p style="font-size:16px;font-weight:700;margin:0">AI 분석 강도 선택</p>' +
          '<span class="px-ai-str-close" data-role="close" role="button" tabindex="0">✕</span>' +
        '</div>' +
        '<p style="font-size:12px;color:#898781;margin:0 0 18px">' + esc(meta.subtitle) + '</p>' +
        '<div class="px-ai-str-grid">' +
          '<div class="px-ai-str-card" data-strength="simple"><p class="px-ai-str-title">심플</p><p class="px-ai-str-desc">' + esc(meta.cards.simple) + '</p></div>' +
          '<div class="px-ai-str-card" data-strength="basic"><p class="px-ai-str-title">기본</p><p class="px-ai-str-desc">' + esc(meta.cards.basic) + '</p></div>' +
          '<div class="px-ai-str-card" data-strength="deep"><p class="px-ai-str-title">고강도</p><p class="px-ai-str-desc">' + esc(meta.cards.deep) + '</p></div>' +
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
      periodText: "2025년 5차 환자경험평가 · 전월 대비",
      periodShort: "2025년 5차 · 전월 대비",
      title: "환자경험평가 AI 상세 분석",
      sum: {
        simple: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승하며 전반적인 개선세를 보였습니다. 반면, 정서적 지지 영역은 62.89점으로 7개 평가 영역 중 가장 낮은 점수를 기록했으며, 전월 대비 11.77점 하락하여 주요 개선 과제로 확인되었습니다. 특히 '위로와 공감' 문항(62.89점)의 하락이 해당 영역의 점수 감소를 주도하였으며, 심각도는 '높음'으로 분류되었습니다. 또한 전반적인 평가 영역도 71.11점으로 전월 대비 1.96점 하락하였습니다.",
        basic: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승하며 전반적인 개선세를 보였습니다. 반면, 정서적 지지 영역은 62.89점으로 7개 평가 영역 중 가장 낮은 점수를 기록했으며, 전월 대비 11.77점 하락하여 주요 개선 과제로 확인되었습니다. 특히 '위로와 공감' 문항(62.89점)의 하락이 해당 영역의 점수 감소를 주도하였으며, 심각도는 '높음'으로 분류되었습니다. 또한 전반적인 평가 영역도 71.11점으로 전월 대비 1.96점 하락하였습니다.\n\n조직별 분석에서는 6병동과 심장혈관흉부외과가 각각 57.52점으로 가장 낮은 점수를 기록했으며, 전월 대비 하락폭 또한 16.81점으로 가장 크게 나타나 우선적인 개선이 필요한 대상으로 분석되었습니다.\n\n반면 입원 중 간호사(+12.67점), 환자권리보장(+11.69점), 입원 중 의사(+8.76점), 환자안전과 병원 환경(+7.12점) 영역은 전반적인 상승세를 보였으며, 문19(재문의, +20.0점), 문1(예의, +14.8점), 문16(안전, +14.6점) 문항의 개선이 이러한 결과를 견인하였습니다.\n\n종합적으로 정서적 지지 영역과 6병동, 심장혈관흉부외과는 우선 관리 대상으로 판단되며, 향후 1개월간 개선 여부를 지속적으로 모니터링하고 원인 분석 및 개선 활동을 병행할 것을 권고합니다.",
        deep: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승하며 전반적인 개선세를 보였습니다. 반면, 정서적 지지 영역은 62.89점으로 7개 평가 영역 중 가장 낮은 점수를 기록했으며, 전월 대비 11.77점 하락하여 주요 개선 과제로 확인되었습니다. 특히 '위로와 공감' 문항(62.89점)의 하락이 해당 영역의 점수 감소를 주도하였으며, 심각도는 '높음'으로 분류되었습니다. 또한 전반적인 평가 영역도 71.11점으로 전월 대비 1.96점 하락하였습니다.\n\n조직별 분석에서는 6병동과 심장혈관흉부외과가 각각 57.52점으로 가장 낮은 점수를 기록했으며, 전월 대비 하락폭 또한 16.81점으로 가장 크게 나타나 우선적인 개선이 필요한 대상으로 분석되었습니다.\n\n반면 입원 중 간호사(+12.67점), 환자권리보장(+11.69점), 입원 중 의사(+8.76점), 환자안전과 병원 환경(+7.12점) 영역은 전반적인 상승세를 보였으며, 문19(재문의, +20.0점), 문1(예의, +14.8점), 문16(안전, +14.6점) 문항의 개선이 이러한 결과를 견인하였습니다.\n\n종합적으로 정서적 지지 영역과 6병동, 심장혈관흉부외과는 우선 관리 대상으로 판단되며, 향후 1개월간 개선 여부를 지속적으로 모니터링하고 원인 분석 및 개선 활동을 병행할 것을 권고합니다."
      },
      pxAreas: [
        { name: "정서적 지지", score: 62.89, change: -11.77, lowPct: 22, org: "간호부 · 의료진 공통", weight: 18 },
        { name: "전반적인 평가", score: 71.11, change: -1.96, lowPct: 11, org: "QI팀", weight: 15 },
        { name: "입원 중 간호사", score: 87.14, change: 12.67, lowPct: 0, org: "간호부", weight: 20 },
        { name: "환자권리보장", score: 86.31, change: 11.69, lowPct: 0, org: "QI팀 · 환자안전팀", weight: 12 },
        { name: "입원 중 의사", score: 83.42, change: 8.76, lowPct: 0, org: "진료과 · 전공의 교육", weight: 15 },
        { name: "환자안전과 병원 환경", score: 81.56, change: 7.12, lowPct: 0, org: "시설관리팀 · QI팀", weight: 10 },
        { name: "투약 및 치료 과정", score: 78.98, change: 4.53, lowPct: 11, org: "약제팀 · 주치의", weight: 12 }
      ],
      pxRespondentCount: 9,
      pxLowTierThreshold: 75,
      pxSampleMin: 30,
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
        signal: { label: "주요 이슈", value: "정서적 지지", chip: "우선개선 필요", tone: "h" },
        action: { label: "잠재 이슈", value: "정서적 지지 강화", chip: "우선 실행 권장", tone: "m" },
        monitor: { label: "의료진 위로", value: "공감 문항", chip: "점수 상승·65세 이상 유지 여부", tone: "info" }
      },
      metricChanges: [
        { k: "종합점수", v: "81.27점", d: "▲6.9점", tone: "good" },
        { k: "응답자 수", v: "9명", d: "전월 대비 감소", tone: "neu" },
        { k: "추천의향", v: "66.67점", d: "▲6.4점", tone: "good" },
        { k: "종합만족", v: "75.56점", d: "▲2.5점", tone: "good" }
      ],
      gradeAnalysis: {
        subtitle: "5차(2025) 실제 결과 · 360개 기관",
        grades: [
          { label: "1등급", range: "90점 ↑" },
          { label: "2등급", range: "85~90" },
          { label: "3등급", range: "80.20점", current: true },
          { label: "4등급", range: "75~80" },
          { label: "5등급", range: "75점 ↓" }
        ],
        upperGrades: {
          title: "상위등급까지 남은 점수",
          currentLabel: "80.20점",
          items: [
            { grade: "1등급", gap: "9.80", thresholdNote: "1등급 최저 90.00점", targetLabel: "90.00점", progressLeft: "1.9%" },
            { grade: "2등급", gap: "4.96", thresholdNote: "2등급 최저 85.16점", targetLabel: "85.16점", progressLeft: "3.7%" }
          ],
          nearestTargetLabel: "85.16점"
        },
        demotionWarning: {
          gap: "0.21",
          text: "4등급 강등까지 단 0.21점 — 하락 시 즉시 강등 위험"
        },
        summaryHtml: "종합점수 <span class=\"hl\">80.20점</span>으로 <span class=\"hl\">3등급</span>이며, 5차 환자경험평가 결과 기준 총 360개 기관 중 하위 <span class=\"hl\">99위</span>에 해당합니다.",
        summary: "종합점수 80.20점으로 3등급이며, 5차 환자경험평가 결과 기준으로 총 360개 기관 중 하위 99위에 해당합니다.",
        positionSummary: {
          gradeScope: {
            tag: "3등급 내 기준",
            headline: "3등급 127개 기관 중 하위 6.3%",
            subline: "3등급 내에서도 최하위권에 가까운 위치입니다.",
            directionNote: "3등급 내 하위 6.3%로, 같은 등급 기관 중 점수가 낮은 편입니다. (점수가 높을수록 좋은 평가)"
          },
          overallScope: {
            tag: "전체 기준",
            headline: "360개 기관 중 하위 99위",
            subline: "전체 기관 대비 상위 72.8%"
          }
        },
        metricsSource: {
          currentScore: 80.20,
          gradePercentile: 6.3,
          gradeLabel: "3등급",
          q1Score: 81.10,
          medianScore: 82.39,
          grade2MinScore: 85.16
        },
        quartileTitle: "3등급(127개 기관) 내 위치",
        quartileMarker: { left: "3.8%", label: "우리 병원", sublabel: "80.20점" },
        quartileLabels: [
          { label: "최하위", score: "80.01", stat: "최소" },
          { label: "상위 25% 경계", score: "81.10", stat: "Q1" },
          { label: "중앙", score: "82.39", stat: "중앙값" },
          { label: "상위 25%", score: "83.51", stat: "Q3" },
          { label: "최상위", score: "84.99", stat: "최대" }
        ],
        statisticsDetails: {
          summary: "3등급 25퍼센타일(81.10점)보다 낮아 하위 25% 구간에 위치합니다.",
          items: [
            "127개 기관 중 백분위 6.3(하위 6.3%) — 등급 명칭 대비 실질 위치는 최하위권",
            "Q1(81.10) · 중앙값(82.39) · Q3(83.51) · 최소(80.01) · 최대(84.99)",
            "Z-score · 표준편차 등 심화 통계는 원본 평가 데이터 연동 시 제공"
          ]
        },
        quartileNote: "3등급 25퍼센타일(81.10점)보다 낮아 0~25퍼센타일 구간(하위 25%)에 위치합니다. 127개 기관 중 백분위 6.3(하위 6.3%)로, 등급 명칭 대비 실질 위치는 최하위권에 해당합니다.",
        footnote: "※ 등급 제외 기준: 응답 표본 수 미충족 기관은 등급 부여 대상에서 제외"
      },
      bedAnalysis: {
        subtitle: "구성 예시 · 병상수 데이터 미보유",
        intro: "병상수 구간별로 나누어 유사 규모 병원 대비 우리 병원의 위치를 확인합니다.",
        segments: [
          { label: "100병상 미만", score: "76.50점", count: "90개" },
          { label: "100~299병상·우리", score: "79.80점", count: "150개", current: true },
          { label: "300~499병상", score: "84.20점", count: "80개" },
          { label: "500병상 이상", score: "87.10점", count: "40개" }
        ],
        cards: [
          { label: "100~299병상 그룹 내 순위", value: "71위 /150", note: "상위 47% · 그룹 중위권", tone: "good" },
          { label: "그룹 평균 대비", value: "+0.40점", note: "79.80점 대비 소폭 상회", tone: "good" }
        ],
        summary: "전체 등급 기준으로는 3등급 내 최하위권(하위 9위)이지만, 동일 병상수(100~299병상) 그룹 안에서는 중위권(150개 중 71위)으로 확인됩니다. 병상 규모가 큰 병원일수록 평균 점수가 높은 경향(300~499병상 84.20점, 500병상 이상 87.10점)이 있어, 규모 차이를 감안하면 우리 병원의 상대적 위치는 전체 등급 순위보다 나은 편입니다. 다만 병상 규모가 낮은 점수의 원인은 아니므로, 개선 과제(환자권리보장·정서적 지지 등)는 규모와 무관하게 동일하게 적용됩니다.",
        footnote: "※ 업로드된 5차 실제 데이터에는 병상수 항목이 없어 위 구간별 기관 수·평균·순위는 구성 예시입니다. 병상수 데이터가 확보되면 실제 값으로 교체가 필요합니다."
      },
      areaGapAnalysis: {
        intro: "전체 유효 360개 기관 평균 및 소속 3등급(127개) 평균 대비 우리 병원 영역별 격차입니다. 격차가 큰 순으로 정렬했습니다.",
        rows: [
          { area: "환자권리보장", ours: "76.90", allGap: "▼6.99", gradeGap: "▼5.25", allTone: "bad", gradeTone: "bad" },
          { area: "전반적 평가", ours: "81.50", allGap: "▼4.83", gradeGap: "▼3.57", allTone: "bad", gradeTone: "bad" },
          { area: "정서적 지지", ours: "74.20", allGap: "▼4.62", gradeGap: "▼2.78", allTone: "bad", gradeTone: "bad" },
          { area: "의사 영역", ours: "80.40", allGap: "▼3.68", gradeGap: "▼2.30", allTone: "warn", gradeTone: "warn" },
          { area: "투약 및 치료과정", ours: "79.80", allGap: "▼3.06", gradeGap: "▼1.32", allTone: "warn", gradeTone: "warn" },
          { area: "간호사 영역", ours: "83.50", allGap: "▼2.50", gradeGap: "▼1.02", allTone: "warn", gradeTone: "warn" },
          { area: "환자안전·환경", ours: "85.10", allGap: "▼0.42", gradeGap: "▲1.35", allTone: "warn", gradeTone: "good" }
        ],
        summary: "환자권리보장이 전체 평균 대비 6.99점, 3등급 평균 대비 5.25점 모두 가장 크게 뒤처집니다. 환자 안전과 병원 환경은 전체 평균에는 소폭(-0.42점) 못 미치지만, 소속 3등급 안에서는 유일하게 평균을 넘어서는(+1.35점) 강점 영역입니다.",
        footnote: "※ 전체 평균 83.89~86.33점(영역별) · 3등급(127개) 평균 76.98~85.07점(영역별)은 5차(2025) 실제 업로드 데이터 기준(병원명 비식별)."
      },
      gradePriority: {
        intro: "2등급(85.16점) 평균 대비 영역별 격차가 큰 순으로 정렬하고, 각 영역에 속한 문항 점수까지 내려가 원인을 짚었습니다.",
        areas: [
          {
            title: "① 환자권리보장",
            pill: "2등급까지 ▼10.20",
            pillTone: "h",
            items: [
              { label: "문19 · 불만 제기 용이성", score: "68.4점", hot: true },
              { label: "문21 · 수치감 배려", score: "77.4점" },
              { label: "문20 · 치료 결정 참여", score: "79.5점" },
              { label: "문18 · 공평한 대우", score: "82.3점" }
            ],
            note: "문19가 5개월 연속 하락 중인 최저 문항 — 최우선 개선 대상"
          },
          {
            title: "② 전반적 평가",
            pill: "2등급까지 ▼8.96",
            pillTone: "h",
            items: [
              { label: "문22 · 전반적 만족", score: "81.2점" },
              { label: "문23 · 타인 추천 의향", score: "81.8점" }
            ],
            note: "두 문항 모두 고르게 낮아, 개별 문항보다 전반적 경험 만족도 자체를 끌어올려야 하는 영역"
          },
          {
            title: "③ 정서적 지지",
            pill: "2등급까지 ▼8.33",
            pillTone: "h",
            items: [{ label: "문14 · 위로와 공감", score: "74.2점", hot: true }],
            note: "단일 문항으로 구성된 영역이라, 문14 점수가 곧 영역 점수 — 개선 시 영향이 즉시 반영됨"
          },
          {
            title: "④ 의사 영역",
            pill: "2등급까지 ▼6.66",
            pillTone: "m",
            items: [
              { label: "문8 · 회진시간 정보제공", score: "74.5점", hot: true },
              { label: "문7 · 만날 기회", score: "82.1점" },
              { label: "문6 · 경청", score: "82.0점" },
              { label: "문5 · 존중/예의", score: "83.0점" }
            ],
            note: "문8이 VOC의 \"회진시간 안내 부족\" 언급 급증과 동일한 이슈로 확인됨"
          }
        ],
        summary: "2등급 진입을 위해 최우선으로 채워야 할 문항은 문19(불만 제기 용이성)와 문8(회진시간 정보제공)입니다. 두 문항 모두 각 영역 내 최저점이면서 동시에 5개월 연속 하락·VOC 연계 신호라는 별도의 위험 신호를 겸하고 있어, 다른 문항보다 개선 시급성이 높습니다."
      },
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
        { sev: "h", sevLabel: "개선도 높음", issue: "입원 중 간호사", issueDesc: "87.14점으로 전월 대비 12.67점 상승해 7개 영역 중 상승폭이 가장 큽니다.", pri: "m", priLabel: "우선순위 보통", action: "우수 간호 사례 확산", actionDesc: "간호 응대 우수 사례를 전 병동에 공유해 상승세를 이어가십시오." },
        { sev: "h", sevLabel: "개선도 높음", issue: "환자권리보장", issueDesc: "86.31점으로 전월 대비 11.69점 상승했습니다.", pri: "m", priLabel: "우선순위 보통", action: "환자권리 교육 지속", actionDesc: "현재의 환자권리 안내 방식을 유지하고 정기 교육을 지속하십시오." },
        { sev: "m", sevLabel: "개선도 보통", issue: "입원 중 의사", issueDesc: "83.42점으로 전월 대비 8.76점 상승했습니다.", pri: "l", priLabel: "우선순위 낮음", action: "의사 설명 방식 공유", actionDesc: "우수한 설명 사례를 표준화해 전 진료과에 공유하십시오." },
        { sev: "m", sevLabel: "개선도 보통", issue: "환자안전과 병원 환경", issueDesc: "81.56점으로 전월 대비 7.12점 상승했습니다.", pri: "l", priLabel: "우선순위 낮음", action: "안전 관리 체계 유지", actionDesc: "현재의 안전 점검 체계를 유지하십시오." },
        { sev: "l", sevLabel: "개선도 낮음", issue: "투약 및 치료 과정(상승)", issueDesc: "78.98점으로 전월 대비 4.53점 상승했으나, 절대 점수는 7개 영역 중 5위로 상대적으로 낮습니다.", pri: "l", priLabel: "우선순위 낮음", action: "설명 커뮤니케이션 강화", actionDesc: "투약 및 치료 과정에 대한 환자 이해도를 높이기 위한 커뮤니케이션을 강화하십시오." }
      ],
      negativeIssueActions: [
        { sev: "h", sevLabel: "심각도 높음", issue: "정서적 지지", issueDesc: "62.89점으로 7개 영역 중 최하위이며, 전월 대비 -11.77점 하락. '위로와 공감' 문항 62.89점이 견인합니다.", pri: "h", priLabel: "우선순위 높음", action: "정서적 지지 강화", actionDesc: "의료진의 위로와 공감 능력 향상을 위한 교육을 실시해 환자 만족도를 개선하십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "전반적인 평가", issueDesc: "71.11점으로 7개 영역 중 6위, 전월 대비 -1.96점 하락. 입원 경험 평가 문항 66.67점이 하락을 견인합니다.", pri: "m", priLabel: "우선순위 보통", action: "입원 경험 개선", actionDesc: "입원 경험 평가 점수가 낮은 원인을 분석하여 환자 중심 서비스 개선을 추진하십시오." },
        { sev: "h", sevLabel: "심각도 높음", issue: "병동별 이상값", issueDesc: "6병동 점수 57.52점으로 최저, 전월 대비 -16.81점 하락폭 최대입니다.", pri: "h", priLabel: "우선순위 높음", action: "6병동 집중 관리", actionDesc: "6병동의 낮은 점수와 큰 하락폭을 원인별로 분석하여 맞춤형 개선책을 마련하십시오." },
        { sev: "h", sevLabel: "심각도 높음", issue: "진료과별 이상값", issueDesc: "심장혈관흉부외과 점수 57.52점으로 최저, 전월 대비 -16.63점 하락폭 최대입니다.", pri: "h", priLabel: "우선순위 높음", action: "심장혈관흉부외과 관리 강화", actionDesc: "심장혈관흉부외과의 환자경험 점수 개선을 위한 진료과별 특화 대책을 수립하십시오." },
        { sev: "l", sevLabel: "심각도 낮음", issue: "투약 및 치료 과정(절대 수준)", issueDesc: "78.98점으로 7개 영역 중 5위이며 상대적으로 낮은 점수입니다.", pri: "l", priLabel: "우선순위 낮음", action: "투약 및 치료 과정 설명 강화", actionDesc: "투약 및 치료 과정에 대한 환자 이해도를 높이기 위한 커뮤니케이션을 강화하십시오." }
      ],
      keyChanges: [
        { name: "정서적 지지", delta: "▼11.77점", up: true },
        { name: "전반적인 평가", delta: "▼1.96점", up: true },
        { name: "입원 중 간호사", delta: "▲12.67점", up: false },
        { name: "환자권리보장", delta: "▲11.69점", up: false },
        { name: "입원 중 의사", delta: "▲8.76점", up: false },
        { name: "환자안전과 병원 환경", delta: "▲7.12점", up: false },
        { name: "투약 및 치료 과정", delta: "▲4.53점", up: false }
      ],
      changeSectionTitle: "영역별 점수 변화",
      detailMonitors: [
        { name: "정서적 지지", avg: "의료진 위로 및 공감 문항", criteria: "확인 기준: 직전 6개월 평균 대비 65점 이상 복귀 여부 · 목표: 1개월 내 점수 상승" },
        { name: "6병동", avg: "병동 종합점수", criteria: "확인 기준: 전월 대비 하락폭 5점 이내 · 목표: 하락폭 최소화" },
        { name: "심장혈관흉부외과", avg: "진료과 종합점수", criteria: "확인 기준: 전월 대비 하락폭 5점 이내 · 목표: 하락폭 최소화" }
      ],
      reportBlockDefs: [
        { key: "overview", name: "개요" },
        { key: "status", name: "현황" },
        { key: "statBrief", name: "전체 현황" },
        { key: "grade", name: "등급 분석" },
        { key: "beds", name: "병상수별 분석" },
        { key: "gap", name: "영역별 격차" },
        { key: "matrix", name: "영역 진단 매트릭스" },
        { key: "gradePriority", name: "2등급 진입 우선순위" },
        { key: "improvement", name: "개선 과제 및 권고" }
      ],
      reportDefaultBlocks: {
        simple: ["overview", "status", "grade"],
        basic: ["overview", "status", "grade", "beds", "gap"],
        deep: ["overview", "status", "grade", "beds", "gap", "matrix", "gradePriority", "improvement"]
      },
      analysisBlockDefs: [
        { key: "matrix", name: "영역 진단 매트릭스" },
        { key: "areas", name: "변화 영역 TOP3" },
        { key: "actions", name: "권장 조치" },
        { key: "changes", name: "영역별 점수 변화" },
        { key: "monitor", name: "모니터링" }
      ],
      analysisDefaultBlocks: ["matrix"],
      reportStatsBlockDefs: [
        { key: "stat_overview", name: "전체 현황" },
        { key: "stat_area", name: "영역·문항 분석" },
        { key: "stat_org", name: "조직별 분석" },
        { key: "stat_priority", name: "개선 우선순위" }
      ],
      reportStatsDefaultBlocks: ["stat_overview", "stat_area"],
      reportStatsDrafts: {
        stat_overview: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승했습니다. 응답자는 9명이며, 전반적 만족 66.67점·타인 추천 의향 75.56점으로 핵심 지표 간 방향성이 엇갈렸습니다.",
        stat_area: "7개 평가 영역 중 입원 중 간호사(87.14점)가 가장 높고 정서적 지지(62.89점)가 가장 낮습니다. 문19 재문의(+20.0점)와 문21 위로와 공감(-15.0점)이 문항 변화폭 TOP에 해당합니다.",
        stat_org: "병동별로는 6병동(57.52점, ▼16.81점)이 최저이며, 진료과별로는 심장혈관흉부외과(57.52점, ▼16.63점)가 하락폭이 가장 컸습니다.",
        stat_priority: "저점 영역 TOP3는 정서적 지지·전반적인 평가·투약 및 치료 과정이며, 저점 문항 TOP3는 위로와 공감·입원 경험 평가·통증 관리 관련 문항입니다."
      },
      surveyOrgWards: [
        { name: "6병동", score: "57.52", delta: "-16.81" },
        { name: "51병동", score: "78.40", delta: "+4.20" },
        { name: "52병동", score: "82.15", delta: "+2.85" }
      ],
      surveyOrgDepts: [
        { name: "심장혈관흉부외과", score: "57.52", delta: "-16.63" },
        { name: "내과", score: "84.20", delta: "+3.10" },
        { name: "정형외과", score: "79.88", delta: "+1.45" }
      ],
      reportOverview: {
        simple: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승하며 전반적인 개선세를 보였습니다. 반면, 정서적 지지 영역은 62.89점으로 7개 평가 영역 중 가장 낮은 점수를 기록했으며, 전월 대비 11.77점 하락하여 주요 개선 과제로 확인되었습니다. 특히 '위로와 공감' 문항(62.89점)의 하락이 해당 영역의 점수 감소를 주도하였으며, 심각도는 '높음'으로 분류되었습니다. 또한 전반적인 평가 영역도 71.11점으로 전월 대비 1.96점 하락하였습니다.",
        basic: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승하며 전반적인 개선세를 보였습니다. 반면, 정서적 지지 영역은 62.89점으로 7개 평가 영역 중 가장 낮은 점수를 기록했으며, 전월 대비 11.77점 하락하여 주요 개선 과제로 확인되었습니다. 특히 '위로와 공감' 문항(62.89점)의 하락이 해당 영역의 점수 감소를 주도하였으며, 심각도는 '높음'으로 분류되었습니다. 또한 전반적인 평가 영역도 71.11점으로 전월 대비 1.96점 하락하였습니다.\n\n조직별 분석에서는 6병동과 심장혈관흉부외과가 각각 57.52점으로 가장 낮은 점수를 기록했으며, 전월 대비 하락폭 또한 16.81점으로 가장 크게 나타나 우선적인 개선이 필요한 대상으로 분석되었습니다.\n\n반면 입원 중 간호사(+12.67점), 환자권리보장(+11.69점), 입원 중 의사(+8.76점), 환자안전과 병원 환경(+7.12점) 영역은 전반적인 상승세를 보였으며, 문19(재문의, +20.0점), 문1(예의, +14.8점), 문16(안전, +14.6점) 문항의 개선이 이러한 결과를 견인하였습니다.\n\n종합적으로 정서적 지지 영역과 6병동, 심장혈관흉부외과는 우선 관리 대상으로 판단되며, 향후 1개월간 개선 여부를 지속적으로 모니터링하고 원인 분석 및 개선 활동을 병행할 것을 권고합니다.",
        deep: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승하며 전반적인 개선세를 보였습니다. 반면, 정서적 지지 영역은 62.89점으로 7개 평가 영역 중 가장 낮은 점수를 기록했으며, 전월 대비 11.77점 하락하여 주요 개선 과제로 확인되었습니다. 특히 '위로와 공감' 문항(62.89점)의 하락이 해당 영역의 점수 감소를 주도하였으며, 심각도는 '높음'으로 분류되었습니다. 또한 전반적인 평가 영역도 71.11점으로 전월 대비 1.96점 하락하였습니다.\n\n조직별 분석에서는 6병동과 심장혈관흉부외과가 각각 57.52점으로 가장 낮은 점수를 기록했으며, 전월 대비 하락폭 또한 16.81점으로 가장 크게 나타나 우선적인 개선이 필요한 대상으로 분석되었습니다.\n\n반면 입원 중 간호사(+12.67점), 환자권리보장(+11.69점), 입원 중 의사(+8.76점), 환자안전과 병원 환경(+7.12점) 영역은 전반적인 상승세를 보였으며, 문19(재문의, +20.0점), 문1(예의, +14.8점), 문16(안전, +14.6점) 문항의 개선이 이러한 결과를 견인하였습니다.\n\n종합적으로 정서적 지지 영역과 6병동, 심장혈관흉부외과는 우선 관리 대상으로 판단되며, 향후 1개월간 개선 여부를 지속적으로 모니터링하고 원인 분석 및 개선 활동을 병행할 것을 권고합니다."
      },
      reportDrafts: {
        overview: "본 보고서는 2025년 5차 환자경험평가 응답 결과를 대상으로, 통계 현황과 AI 분석(등급·영역·격차)을 바탕으로 경영진·실무 부서 내부 보고용으로 작성되었습니다.\n\n2025년 5차 종합점수는 81.27점으로 전월 대비 6.87점 상승하였음. 다만 정서적 지지(62.89점, ▼11.77점) · 전반적인 평가(71.11점, ▼1.96점) 2개 영역은 동시에 하락하였고, 6병동(57.52점) · 심장혈관흉부외과(57.52점)에서 조직 단위 하락폭이 가장 컸음. 아래 Ⅱ. 현황 · Ⅲ. 분석에서 세부 내용을 다룸.",
        status: "환자경험평가는 7개 영역(간호사·의사·투약 및 치료·정서적 지지·환자안전·환자권리·전반적 평가) 23개 문항으로 구성됨. 전월 대비 점수 변화가 확인된 영역은 아래 표와 같음.\n\n종합점수는 상승하였으나, 정서적 지지·전반적인 평가 영역의 하락이 일부 상승 영역의 개선분을 상쇄한 결과로 해석됨. 병동·진료과별 점수는 하단 표·차트를 참고할 것.\n\n응답자 9명으로 표본이 작아(권장 30명 미만), 영역·문항별 변화 해석 시 소수 응답의 영향을 감안해야 함.",
        statBrief: "2025년 5차 종합점수 81.27점(▲6.87점), 응답 9명. 정서적 지지(62.89점, ▼11.77점) · 전반적인 평가(71.11점, ▼1.96점) 하락, 6병동 · 심장혈관흉부외과 조직 하락폭 최대.",
        grade: "종합점수 80.20점 기준 3등급(360개 기관 중 하위 99위)이며, 2등급 진입까지 4.96점 · 4등급 강등까지 0.21점 차이임. 3등급 내 백분위 6.3%(하위 6.3%)로, 등급 명칭 대비 실질 위치는 최하위권에 해당함. 2등급 진입을 위해서는 정서적 지지·환자권리보장 영역의 구조적 개선이 선행되어야 함.",
        beds: "동일 병상수(100~299병상) 그룹 150개 기관 중 71위(상위 47%)로, 전체 등급 순위보다 상대적 위치는 나은 편임. 병상 규모 자체가 점수 하락의 직접 원인은 아니므로, 정서적 지지·환자권리보장 등 개선 과제는 규모와 무관하게 동일하게 적용함.",
        gap: "환자권리보장이 전체 평균 대비 6.99점 · 3등급 평균 대비 5.25점 모두 가장 크게 뒤처짐. 환자 안전과 병원 환경은 3등급 내에서만 유일하게 평균을 넘어서는 강점 영역(+1.35점)임. 정서적 지지·전반적인 평가는 전체·3등급 평균 모두 하회하여 우선 개선 대상으로 분류함.",
        matrix: "75점 기준 4분면 진단 결과, 정서적 지지 · 전반적인 평가 2개 영역이 '긴급 대응' 구간에 해당함. 두 영역 모두 절대 점수가 낮고 전월 대비 하락 중이므로, 1개월 내 원인 점검 및 현장 대응을 권고함.",
        gradePriority: "2등급 진입을 위해 최우선으로 채워야 할 문항은 문19(불만 제기 용이성, 68.4점)과 문8(회진시간 정보제공, 74.5점)임. 두 문항 모두 5개월 연속 하락 추세이며, 환자권리보장·의사 영역 하락과 연계되어 개선 시급성이 가장 높음.",
        improvement: "정서적 지지 강화, 6병동 · 심장혈관흉부외과 집중 관리, 환자권리보장(문19) 개선을 1개월 내 최우선 과제로 추진할 것을 건의함. 문19 · 문8은 환자경험평가와 VOC 지표가 동시에 악화 신호를 보내는 교차 확인 대상임.",
        kpi: "종합점수는 81.27점으로 전월 대비 6.87점 상승했으며, 종합평가는 66.67점(-6.4점), 추천의향은 75.56점(+2.5점)으로 지표 간 방향성이 엇갈렸습니다.",
        dist: "7개 영역 중 입원 중 간호사(87.14점)가 가장 높고, 정서적 지지(62.89점)가 가장 낮아 영역 간 24점 이상의 점수 격차가 존재합니다.",
        areas: "상승 영역은 입원 중 간호사(+12.67점)가 1위였고, 변화 문항은 문19 재문의(+20.0점)가 가장 큰 폭으로 상승했습니다.",
        issues: "정서적 지지·6병동·심장혈관흉부외과는 심각도 '높음'으로 분류되어 우선 대응이 필요합니다.",
        plan: "정서적 지지 강화, 6병동·심장혈관흉부외과 집중 관리를 1개월 내 착수할 최우선 과제로 건의함."
      },
      reportMeta: {
        title: "2025년 5차 환자경험평가 분석보고서",
        footerNote: "메디통 픽스 AI · 내부 보고 문서 (환자경험평가 통계 목업 기준)",
        docInfo: {
          author: "진보은 주임",
          date: "2025. 08. 01.",
          period: "2025년 5차",
          subject: "2025년(5차) 환자경험평가 · 전월 대비"
        }
      },
      reportImportableItems: {
        "개요": [
          { src: "통계 페이지", name: "종합점수 · 응답률 KPI" },
          { src: "통계 페이지", name: "주요 영역 점수 카드" }
        ],
        "현황": [
          { src: "통계 페이지", name: "영역별 점수 표" },
          { src: "통계 페이지", name: "영역별 점수 차트" },
          { src: "통계 페이지", name: "병동·진료과별 점수" }
        ],
        "분석": [
          { src: "AI 분석", name: "등급 분석" },
          { src: "AI 분석", name: "병상수별 분석" },
          { src: "AI 분석", name: "영역별 격차" },
          { src: "AI 분석", name: "영역 진단 매트릭스" },
          { src: "AI 분석", name: "2등급 진입 우선순위" },
          { src: "AI 분석", name: "개선 과제 및 권고" }
        ]
      },
      actionPlanRows: [
        ["높음", "정서적 지지 강화", "1개월 내"],
        ["높음", "6병동 집중 관리", "1개월 내"],
        ["높음", "심장혈관흉부외과 관리 강화", "1개월 내"],
        ["보통", "입원 경험 개선", "2개월 내"],
        ["낮음", "투약 및 치료 과정 설명 강화", "3개월 내"]
      ],
      reportPrefix: "환자경험평가",
      summaryStructured: {
        conclusion: "2025년 5차 환자경험평가 종합점수는 81.27점으로 전월 대비 6.87점 상승했습니다.",
        cause: "정서적 지지(-11.77점)와 전반적인 평가(-1.96점) 하락이 견인했으며, '위로와 공감' 문항이 핵심 원인입니다.",
        impact: "6병동·심장혈관흉부외과에서 조직 단위 하락폭이 확대되어, 전체 평균 상승에도 취약 구간이 존재합니다.",
        recommendation: "정서적 지지 강화와 6병동·심장혈관흉부외과 집중 관리를 1개월 내 착수하고 모니터링을 유지하십시오."
      }
    };
  }

  function vocDataset() {
    return {
      periodText: "2026-06 기준 전월 대비",
      periodShort: "2026-06 기준 전월 대비",
      title: "VOC AI 상세 분석",
      sum: {
        simple: "6월 VOC는 총 8,323건 접수(▲214건)되었고, 대부분 유형에서 부정률이 개선되었으나 시스템 및 서비스·환경관련 유형은 악화되었습니다.",
        basic: "6월 VOC는 총 8,323건 접수, 언급 9,120건입니다. 시스템 및 서비스(▲2.1%p)·환경관련(▲1.0%p) 유형 부정률이 악화되었고, 환자안전 플래그 12건(▲3건)으로 늘었습니다.",
        deep: "6월 VOC는 총 8,323건 접수(▲214건), 언급 9,120건 · 평균 태그 1.10개입니다. 시스템 및 서비스(▲2.1%p)·환경관련(▲1.0%p) 유형이 악화되었고, 7병동·내과 중환자실·내과 김의사 그룹에서 부정률이 올랐습니다. 환자안전 플래그 12건(▲3건) 전수 검토가 필요합니다."
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
        { k: "접수된 VOC", v: "8,323건", d: "▲214건", tone: "neu" },
        { k: "환자안전 플래그", v: "12건", d: "▲3건", tone: "bad" },
        { k: "시스템 및 서비스", v: "▲2.1%p", d: "부정률 악화", tone: "bad" },
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
        { sev: "m", sevLabel: "개선도 보통", issue: "서비스제공관련 - 세심함", issueDesc: "세심함 키워드 언급이 증가하며 서비스제공관련 유형의 긍정 비율이 개선되었습니다.", pri: "l", priLabel: "우선순위 낮음", action: "긍정 피드백 공유", actionDesc: "관련 부서에 긍정 피드백을 공유해 동기를 부여하십시오." },
        { sev: "m", sevLabel: "개선도 보통", issue: "진료/치료·검사관련 - 의사 설명", issueDesc: "의사 설명 키워드 언급이 증가하며 진료/치료·검사관련 유형의 신뢰도가 개선되었습니다.", pri: "l", priLabel: "우선순위 낮음", action: "설명 매뉴얼 공유", actionDesc: "우수한 설명 사례를 표준 매뉴얼로 정리해 전 진료과에 공유하십시오." },
        { sev: "l", sevLabel: "개선도 낮음", issue: "환경관련 - 병실 청결", issueDesc: "병실 청결 키워드 언급이 증가하며 환경관련 유형의 긍정 비율이 소폭 개선되었습니다.", pri: "l", priLabel: "우선순위 낮음", action: "청결 관리 유지", actionDesc: "현재 수준의 청소 주기를 유지하고 정기 점검을 지속하십시오." },
        { sev: "h", sevLabel: "개선도 높음", issue: "12병동 - 긍정 비율 상승", issueDesc: "12병동의 긍정 비율이 전월 대비 3.1%p 상승해 전체 병동 중 가장 높습니다.", pri: "m", priLabel: "우선순위 보통", action: "우수 병동 사례 공유", actionDesc: "12병동의 운영 방식을 분석해 타 병동에 확산하십시오." }
      ],
      negativeIssueActions: [
        { sev: "h", sevLabel: "심각도 높음", issue: "비용관련 - 비용 부담", issueDesc: "비용관련 유형 부정 응답 비중이 전월 대비 상승했습니다. '비용 부담' 키워드가 상승을 견인합니다.", pri: "h", priLabel: "우선순위 높음", action: "비용 안내 강화", actionDesc: "진료비·수납 절차에 대한 사전 안내를 강화해 비용 부담 관련 부정 언급을 줄이십시오." },
        { sev: "h", sevLabel: "심각도 높음", issue: "시스템 및 서비스 - 예약 절차 복잡", issueDesc: "시스템 및 서비스 관련 VOC가 단기간에 증가했습니다. '예약 절차 복잡' 키워드가 이를 견인합니다.", pri: "h", priLabel: "우선순위 높음", action: "예약 시스템 개선", actionDesc: "예약 절차 간소화 및 안내 강화를 통해 시스템 및 서비스 유형의 부정률을 낮추십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "환경관련 - 소음", issueDesc: "병동 소음 키워드가 연속 증가 추세입니다.", pri: "m", priLabel: "우선순위 보통", action: "소음 저감 조치", actionDesc: "해당 병동의 소음원을 점검하고 정숙 시간대 안내를 강화하십시오." },
        { sev: "m", sevLabel: "심각도 보통", issue: "인적응대관련 - 응대 지연", issueDesc: "응대 지연 키워드 언급이 증가하며 일부 병동에서 부정 응답이 늘고 있습니다.", pri: "m", priLabel: "우선순위 보통", action: "응대 인력 재배치 검토", actionDesc: "응대 지연이 잦은 시간대·병동을 파악해 인력 배치를 조정하십시오." },
        { sev: "l", sevLabel: "심각도 낮음", issue: "환경관련 - 주차", issueDesc: "방문객 주차 불편 언급이 유지되고 있습니다.", pri: "l", priLabel: "우선순위 낮음", action: "주차 안내 강화", actionDesc: "방문객 대상 주차 공간 안내와 혼잡 시간대 대체 동선 안내를 보완하십시오." }
      ],
      keyChanges: [
        { name: "인적응대관련", delta: "▼2.1%p", up: false },
        { name: "서비스제공관련", delta: "▼1.8%p", up: false },
        { name: "환경관련", delta: "▼0.9%p", up: false },
        { name: "시스템 및 서비스", delta: "▲4.2%p", up: true },
        { name: "비용관련", delta: "▲0.6%p", up: true }
      ],
      detailMonitors: [
        {
          category: "비용관련",
          keyword: "비용 부담",
          avgNegRate: 38.5,
          stdDev: 3.2,
          reason: "지난달보다 '진료비·수납이 부담스럽다'는 불만이 눈에 띄게 늘었습니다. 평소(최근 6개월)보다도 많이 나온 수준이라, 원무·수납 창구의 비용 안내를 우선 점검해 보시는 것이 좋습니다.",
          quotes: [
            { text: "비용 안내가 사전에 충분하지 않았습니다.", meta: "원무 · 비용", channel: "앱", date: "2026-06-23" },
            { text: "수납 대기 줄이 너무 길었습니다.", meta: "원무 · 비용", channel: "방문", date: "2026-06-17" },
            { text: "진료비가 예상보다 많이 나와 부담이 컸습니다.", meta: "원무 · 비용", channel: "앱", date: "2026-06-21" }
          ]
        },
        {
          category: "시스템 및 서비스",
          keyword: "예약 절차 복잡",
          avgNegRate: 54.1,
          stdDev: 4.5,
          reason: "'예약·접수 절차가 복잡하다'는 불만이 한꺼번에 늘었습니다. 앱·전화·방문 예약 안내가 실제로 어렵지 않은지, 예약센터·원무 쪽에서 확인이 필요합니다.",
          quotes: [
            { text: "예약 절차가 너무 복잡해서 혼란스러웠습니다.", meta: "외래 · 시스템/서비스", channel: "앱", date: "2026-06-02" },
            { text: "앱에서 예약 변경 방법을 찾기 어려웠어요.", meta: "외래 · 시스템/서비스", channel: "앱", date: "2026-06-09" },
            { text: "전화 예약할 때 안내가 여러 번 바뀌어 헷갈렸습니다.", meta: "외래 · 시스템/서비스", channel: "전화", date: "2026-06-16" }
          ]
        }
      ],
      reportBlockDefs: [
        { key: "overview", name: "개요" },
        { key: "kpi", name: "핵심 지표" },
        { key: "dist", name: "유형별 분포" },
        { key: "matrix", name: "유형 진단 매트릭스" },
        { key: "keywords", name: "변화 키워드 TOP3" },
        { key: "issues", name: "주요 이슈 및 권장 조치" },
        { key: "plan", name: "개선 액션 플랜" },
        { key: "monitor", name: "모니터링" }
      ],
      reportDefaultBlocks: {
        simple: ["overview", "kpi"],
        basic: ["overview", "kpi", "dist", "keywords", "issues"],
        deep: ["overview", "kpi", "dist", "matrix", "keywords", "issues", "plan", "monitor"]
      },
      reportSectionOrder: ["개요", "현황 — 무엇이 달라졌나", "분석 — 어디서 달라졌나", "이슈 및 평가", "결론 및 제언", "모니터링 계획"],
      reportSectionMap: {
        overview: "개요",
        status: "현황 — 무엇이 달라졌나",
        kpi: "현황 — 무엇이 달라졌나",
        statusNarrative: "현황 — 무엇이 달라졌나",
        dist: "현황 — 무엇이 달라졌나",
        analysisOrg: "분석 — 어디서 달라졌나",
        analysis: "분석 — 어디서 달라졌나",
        matrix: "분석 — 어디서 달라졌나",
        keywords: "분석 — 어디서 달라졌나",
        issuesEval: "이슈 및 평가",
        quotes: "이슈 및 평가",
        riskScenarios: "이슈 및 평가",
        issues: "이슈 및 평가",
        conclusionOpts: "결론 및 제언",
        options: "결론 및 제언",
        recommendation: "결론 및 제언",
        plan: "결론 및 제언",
        monitorPlan: "모니터링 계획",
        monitor: "모니터링 계획"
      },
      reportImportableItems: {
        "개요": [{ src: "통계 페이지", name: "전체 VOC 현황 헤드라인 카드" }],
        "현황": [
          { src: "통계 페이지", name: "유형별 접수 현황 카드" },
          { src: "통계 페이지", name: "채널별 접수 도넛 차트" },
          { src: "통계 페이지", name: "월별 추이 라인 차트" }
        ],
        "분석": [
          { src: "통계 페이지", name: "병동별 VOC 현황 표" },
          { src: "통계 페이지", name: "진료과별 VOC 현황 표" },
          { src: "AI 분석", name: "유형 진단 매트릭스" },
          { src: "AI 분석", name: "변화 키워드 TOP3" },
          { src: "AI 분석", name: "주요 이슈 및 권장 조치" }
        ]
      },
      reportPresets: {
        exec: { label: "경영진 보고용", blocks: ["kpi", "matrix"] },
        team: { label: "실무 회의용", blocks: ["matrix", "issues", "plan"] },
        full: { label: "전체 상세", blocks: ["kpi", "dist", "matrix", "keywords", "issues", "plan", "monitor"] }
      },
      analysisBlockDefs: [
        { key: "matrix", name: "유형 진단 매트릭스" },
        { key: "keywords", name: "변화 키워드 TOP3" },
        { key: "actions", name: "권장 조치" },
        { key: "dist", name: "유형별 분포" },
        { key: "monitor", name: "모니터링" }
      ],
      analysisDefaultBlocks: ["matrix"],
      reportStatsBlockDefs: [
        { key: "stat_overview", name: "전체 VOC 현황" },
        { key: "stat_type", name: "유형별 접수 현황" },
        { key: "stat_trend", name: "VOC 월별 추이" },
        { key: "stat_channel", name: "채널별 접수" },
        { key: "stat_praise", name: "칭찬 현황" },
        { key: "stat_demographic", name: "응답자 구성" },
        { key: "stat_category", name: "카테고리·키워드" },
        { key: "stat_group", name: "그룹별 VOC" }
      ],
      reportStatsDefaultBlocks: ["stat_overview", "stat_type"],
      reportStatsDrafts: {
        stat_overview: "2026년 7월 접수된 VOC는 8,323건(▲214건), 언급된 VOC는 9,120건(▲340건)입니다. 평균 태그 수 1.10개, 부서칭찬 420건, 직원칭찬 820건으로 접수 규모와 칭찬 흐름이 함께 증가했습니다.",
        stat_type: "유형별로는 인적응대관련(67% 긍정)과 서비스제공관련(66% 긍정)이 상대적으로 양호하고, 비용관련(75% 부정)과 시스템 및 서비스(62% 부정) 유형의 부정 비중이 높습니다.",
        stat_trend: "최근 6개월 긍정·부정 건수 추이를 보면 2월 긍정 건수가 11,520건으로 가장 높았고, 6월에는 긍정 7,645건·부정 7,056건으로 격차가 좁혀졌습니다.",
        stat_channel: "채널별 접수 비중은 메디통 픽스(앱) 38.1%, 고객의견카드 23.9%, 직접 전화 14.2% 순입니다. 앱 채널 접수가 전월 대비 가장 크게 증가했습니다.",
        stat_praise: "부서칭찬은 간호부(142건), 원무팀(98건) 순으로 집중되었고, 직원칭찬은 간호사 A(28건), 간호사 B(22건) 등 현장 응대 직군 중심으로 나타났습니다.",
        stat_demographic: "응답자 성별은 남 50%·여 50%로 균형을 이루며, 연령대는 40대(24%)·50대(22%) 비중이 가장 높습니다.",
        stat_category: "진료 및 치료·검사관련 카테고리에서 긍정 TOP5는 '친절함', '설명', '신속 응대' 순이며, 부정 TOP5는 '예약 절차 복잡', '대기시간', '통증 조절 부족' 순입니다.",
        stat_group: "병동별로는 12병동 부정률 18%로 주의가 필요하고, 진료과별로는 정형외과(+2.4%p) 하락폭이 두드러집니다."
      },
      vocMonthlyTrend: [
        { month: "1월", pos: "7,549", neg: "6,969" },
        { month: "2월", pos: "11,520", neg: "2,880" },
        { month: "3월", pos: "7,799", neg: "6,915" },
        { month: "4월", pos: "7,389", neg: "7,388" },
        { month: "5월", pos: "7,950", neg: "6,504" },
        { month: "6월", pos: "7,645", neg: "7,056" }
      ],
      vocChannels: [
        { name: "메디통 픽스(앱)", count: "3,454건", pct: "38.1%", delta: "+5.2%p" },
        { name: "고객의견카드", count: "2,167건", pct: "23.9%", delta: "+1.1%p" },
        { name: "직접 전화", count: "1,287건", pct: "14.2%", delta: "-0.4%p" },
        { name: "기타", count: "2,157건", pct: "23.8%", delta: "+0.3%p" }
      ],
      vocPraiseDepts: [
        { name: "간호부", count: "142건", delta: "+8건" },
        { name: "원무팀", count: "98건", delta: "+5건" },
        { name: "영양팀", count: "64건", delta: "+3건" }
      ],
      vocPraiseStaff: [
        { name: "간호사 A", count: "28건", delta: "+4건" },
        { name: "간호사 B", count: "22건", delta: "+3건" },
        { name: "원무 김OO", count: "18건", delta: "+2건" }
      ],
      reportMeta: {
        badge: "내부 보고 · 임원 보고용 · PIX AI 환자경험관리",
        title: "2026년 6월 VOC 분석보고서",
        author: "",
        docInfo: {
          author: "진보은 주임",
          date: "2026. 07. 03.",
          period: "2026년 6월",
          subject: "2026년 6월 접수 VOC (8,323건)"
        },
        footerNote: "메디통 픽스 AI · 내부 보고 문서 (VOC 통계 목업 기준)"
      },
      reportDoc: {
        overviewHeadlineHtml: "6월 VOC는 총 8,323건 접수(전월 대비 ▲214건)되었고, 언급 기준 9,120건 · VOC 1건당 평균 1.10개 유형이 태깅되었습니다.<br>대부분 유형에서 부정률이 개선되었으나, <b>시스템 및 서비스(▲2.1%p)</b>와 <b>환경관련(▲1.0%p)</b> 유형은 부정률이 악화되었고, 환자안전 관련 VOC도 12건(▲3건)으로 늘어 별도 확인이 필요합니다.",
        typeRows: [
          ["진료 및 치료·검사관련", "2,410건", "29.0%", "▼1.2%p", "good"],
          ["인적응대관련", "1,350건", "16.2%", "▼0.9%p", "good"],
          ["서비스제공관련", "940건", "11.3%", "▲0.4%p", "bad"],
          ["시스템 및 서비스", "780건", "9.4%", "▲2.1%p", "bad"],
          ["환경관련", "705건", "8.5%", "▲1.0%p", "bad"],
          ["비용관련", "612건", "7.4%", "▲0.6%p", "bad"],
          ["기타문의", "286건", "3.4%", "▼0.2%p", "good"],
          ["미분류", "42건", "-", "▼3건", "good"]
        ],
        typeCaption: "※ 하나의 VOC에 여러 유형이 함께 태깅될 수 있어 합계는 접수 건수(8,323건)보다 많습니다. 미분류는 비중 대신 건수 증감만 표기합니다.",
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
        kwCaption: "※ 7개 유형별 키워드 TOP5 데이터를 동일 키워드 기준으로 합산한 결과입니다.",
        channels: [
          { name: "메디통 픽스(앱)", cnt: 3450, pct: 38.1, color: "#378ADD" },
          { name: "고객의견카드", cnt: 2166, pct: 23.9, color: "#1baf7a" },
          { name: "직접 전화", cnt: 1289, pct: 14.2, color: "#e8a33d" },
          { name: "카카오톡·채널톡", cnt: 988, pct: 10.9, color: "#e0559a" },
          { name: "홈페이지", cnt: 626, pct: 6.9, color: "#8f7fe0" },
          { name: "현장 상담", cnt: 380, pct: 4.2, color: "#3aa0a0" },
          { name: "기타", cnt: 166, pct: 1.8, color: "#b7b3a8" }
        ],
        channelTotal: "9,065건",
        analysisIntro: "병동·진료과·의사 그룹별 부정률 변화(전월 대비)를 확인한 결과, 정형외과와 정형외과 원장의 개선폭이 가장 크고, 7병동·내과 중환자실·내과·내과 김의사는 부정률이 악화되었습니다.",
        wardRows: [
          ["3병동", "36.0%", "▼2.0%p", "good"],
          ["12병동", "34.8%", "▼3.1%p", "good"],
          ["5병동", "39.1%", "▼1.1%p", "good"],
          ["내과 중환자실", "38.1%", "▲0.5%p", "bad"],
          ["7병동", "40.1%", "▲1.2%p", "bad"]
        ],
        deptRows: [
          ["정형외과", "810건", "▼3.8%p", "good"],
          ["신경외과", "3,330건", "▼1.5%p", "good"],
          ["외과", "3,864건", "▼2.1%p", "good"],
          ["재활의학과", "3,125건", "▲1.1%p", "bad"],
          ["내과", "3,550건", "▲0.6%p", "bad"]
        ],
        doctorRows: [
          ["정형외과 원장", "정형외과", "88건", "▼4.2%p", "good"],
          ["외과 박의사", "외과", "61건", "▼1.7%p", "good"],
          ["신경외과 이의사", "신경외과", "55건", "▼0.8%p", "good"],
          ["재활의학과 최의사", "재활의학과", "49건", "▲1.4%p", "bad"],
          ["내과 김의사", "내과", "67건", "▲2.8%p", "bad"]
        ],
        orgCaption: "※ 진료과·의사 표는 부정 건수 상위 그룹 기준이며, 부정률 변화는 전월 대비 긍정 비율 변화(%p)의 부호를 반전한 값입니다.",
        flags: [
          { tag: "환자안전", cls: "", cnt: "12건", delta: "▲3건", desc: " — AI가 자유 텍스트에서 감지한 플래그입니다." },
          { tag: "감염관리", cls: "purple", cnt: "5건", delta: "▼1건", desc: "" }
        ],
        quotesIntro: "실제 접수된 VOC 원문 중 이번 달 흐름을 보여주는 사례입니다.",
        quotes: [
          { text: "환자가 침대에서 낙상할 뻔했습니다. 안전바가 없었어요.", meta: "3병동 · 환자안전" },
          { text: "손 소독제가 비치되어 있지 않았습니다.", meta: "7병동 · 감염관리" },
          { text: "회진 설명이 친절했습니다.", meta: "내과 · 직원칭찬(김의사)" }
        ],
        risksIntro: "리스크는 다음과 같이 진단됩니다.",
        risks: [
          { badge: "국지적", cls: "low", desc: "현재는 7병동·내과 중환자실 등 일부 그룹에 한정된 부정률 악화이며, 전체 8종 유형 중 6종은 개선 추세입니다." },
          { badge: "확산 우려", cls: "mid", desc: "시스템 및 서비스(▲2.1%p), 환경관련(▲1.0%p) 유형 부정률 상승이 이어지면 다른 병동·진료과로 번질 가능성이 있습니다." },
          { badge: "환자안전 영향", cls: "high", desc: "환자안전 플래그가 3건 늘어난 만큼, 방치 시 환자경험평가 환자안전 관련 문항 점수와 수가 가감산에 부정적 영향을 줄 수 있습니다." }
        ],
        optionRows: [
          { id: "A", content: "환자안전 플래그 12건 전수 검토 및 재발방지 대책 수립", duration: "1주 내", priority: "높음", priorityCls: "bad", recommend: true },
          { id: "B", content: "시스템 및 서비스 · 환경관련 유형 원인 점검 (관련 부서 합동)", duration: "2주", priority: "중간", priorityCls: "", recommend: false },
          { id: "C", content: "7병동 · 내과 중환자실 · 내과 대상 부정률 악화 원인 모니터링 강화", duration: "2~3주", priority: "중간", priorityCls: "", recommend: false }
        ],
        recommendationHtml: "환자안전과 직결된 <b>옵션 A</b>를 최우선 과제로 추진할 것을 건의함.",
        monitorRows: [
          { week: "7월 1주차", content: "환자안전 플래그 12건 재발방지 조치 이행 여부 확인" },
          { week: "7월 2주차", content: "시스템·환경관련 유형 부정률 재점검" },
          { week: "7월 말", content: "7병동 · 내과 중환자실 · 내과 부정률 재평가" }
        ]
      },
      reportOverview: {
        simple: "6월 VOC는 총 8,323건 접수(▲214건)되었고, 대부분 유형에서 부정률이 개선되었으나 시스템 및 서비스·환경관련 유형은 악화되었습니다.",
        basic: "6월 VOC는 총 8,323건 접수, 언급 9,120건입니다. 시스템 및 서비스(▲2.1%p)·환경관련(▲1.0%p) 유형 부정률이 악화되었고, 환자안전 플래그 12건(▲3건)으로 늘었습니다.",
        deep: "6월 VOC는 총 8,323건 접수(▲214건), 언급 9,120건 · 평균 태그 1.10개입니다. 시스템 및 서비스(▲2.1%p)·환경관련(▲1.0%p) 유형이 악화되었고, 7병동·내과 중환자실·내과 김의사 그룹에서 부정률이 올랐습니다. 정형외과·정형외과 원장은 개선폭이 가장 컸으며, 환자안전 플래그 12건(▲3건) 전수 검토가 필요합니다."
      },
      reportDrafts: {
        overview: "6월 VOC는 총 8,323건 접수(전월 대비 ▲214건)되었고, 언급 기준 9,120건 · VOC 1건당 평균 1.10개 유형이 태깅되었습니다. 대부분 유형에서 부정률이 개선되었으나, 시스템 및 서비스(▲2.1%p)와 환경관련(▲1.0%p) 유형은 부정률이 악화되었고, 환자안전 관련 VOC도 12건(▲3건)으로 늘어 별도 확인이 필요합니다. 아래 Ⅱ. 현황 · Ⅲ. 분석에서 세부 내용을 다룹니다.",
        status: "8개 VOC 유형 가운데 6종은 전월 대비 부정률이 개선되었고, 진료 및 치료·검사관련(▼1.2%p) · 인적응대관련(▼0.9%p)에서 두드러집니다. 반면 시스템 및 서비스(▲2.1%p) · 환경관련(▲1.0%p) · 비용관련(▲0.6%p)은 악화 추세입니다.\n\n접수 채널·유형별 분포·월별 추이는 아래 표·차트를 참고할 것. 긍정 키워드는 '친절함' · '세심함', 부정 키워드는 '비용 부담' · '예약 절차 복잡'이 상위를 차지하였음.",
        analysisOrg: "병동·진료과·의사 그룹별 부정률 변화(전월 대비)를 확인한 결과, 정형외과와 정형외과 원장의 개선폭이 가장 크고, 7병동 · 내과 중환자실 · 내과 · 내과 김의사는 부정률이 악화되었습니다. 아래 조직별 표는 확인이 필요한 그룹과 개선 그룹을 함께 제시한 것임.",
        issuesEval: "실제 접수된 VOC 원문 중 이번 달 흐름을 보여주는 사례입니다.\n\n리스크는 다음과 같이 진단됩니다. 현재는 7병동·내과 중환자실 등 일부 그룹에 한정된 부정률 악화이며, 시스템·환경관련 유형 부정률 상승이 이어지면 확산 우려가 있습니다. 환자안전 플래그 증가는 환자경험평가·수가 가감산에 부정적 영향을 줄 수 있습니다.",
        conclusionOpts: "아래 세 가지 대응 옵션 중 환자안전과 직결된 옵션 A를 최우선 과제로 추진할 것을 건의함.",
        kpi: "주요 지표는 전월 대비 다음과 같이 변화했습니다.",
        statusNarrative: "개선은 인적응대관련 유형에서 뚜렷하게 나타났으며, 3병동·5병동 두 곳이 전체 개선분의 과반을 차지합니다. 반면 7병동은 부정률이 전월 대비 3.2%p 상승해 유일하게 악화된 병동입니다.",
        analysis: "",
        dist: "8개 유형 가운데 긍정 비율이 가장 높은 유형은 인적응대관련(67%)이며, 그 뒤를 서비스제공관련(66%)이 잇고 있어 사람 중심 서비스 영역에서 안정적인 만족도를 확보하고 있는 것으로 보입니다. 반대로 부정 비율이 가장 높은 유형은 비용관련(75%)이며, 시스템 및 서비스 유형(62%)도 절반을 크게 웃도는 부정 비율을 보여 두 영역에 대한 우선적인 개선 검토가 필요합니다.",
        matrix: "부정률 50%를 기준으로 절대 수준과 변화 방향을 함께 보면, 시스템 및 서비스·비용관련 2개 유형이 부정률도 높고 계속 악화되고 있어 '긴급 대응' 구간에 속합니다. 진료 및 치료·검사관련·기타문의는 부정률은 높지만 개선 추세라 '개선 중' 구간에, 인적응대관련·서비스제공관련은 부정률도 낮고 계속 좋아지고 있어 '우수 사례' 구간에 속합니다. 환경관련은 아직 부정률은 낮지만 소음 키워드 중심으로 악화되고 있어 '주의 관찰'이 필요합니다.",
        keywords: "긍정 키워드 중에서는 '친절함'(+8건), '세심함'(+6건), '신속 응대'(+5건) 순으로 언급이 늘었으며, 이는 대부분 간호·안내 응대 과정에서 반복적으로 나타난 표현입니다. 부정 키워드 중에서는 '예약 절차 복잡'(+9건), '대기시간'(+7건), '통증 조절 부족'(+6건) 순으로 증가폭이 컸으며, 특히 '예약 절차 복잡'은 시스템 및 서비스 유형 부정률 상승과 직접적으로 연결되는 핵심 원인으로 확인됩니다.",
        issues: "긍정 이슈로는 인적응대관련 유형의 '친절함' 언급 증가와 서비스제공관련 유형의 '세심함' 언급 증가가 두드러지며, 이는 최근 현장 응대 교육 및 서비스 개선 노력이 실제 지표 개선으로 이어지고 있음을 시사합니다. 부정 이슈로는 비용관련 유형의 '비용 부담' 언급 상승과 시스템 및 서비스 유형의 '예약 절차 복잡' 언급 급증이 심각도 '높음'으로 분류되어 우선 대응이 필요합니다.",
        plan: "가장 시급한 과제는 비용 안내 강화와 예약 시스템 개선으로, 두 과제 모두 심각도 '높음'으로 분류된 이슈에서 도출되었으며 1~2개월 내 착수를 목표로 합니다. 소음 저감 조치와 응대 인력 재배치 검토는 중간 우선순위 과제로 2개월 내 원인 분석과 개선안 마련을 병행하는 것을 권고합니다.",
        quotes: "환자 VOC 원문 중 이번 달 흐름을 가장 잘 보여주는 표현입니다.",
        riskScenarios: "리스크 시나리오는 다음과 같이 진단됩니다.",
        options: "아래 세 가지 대응 옵션 중 하나를 선택해 주시기 바랍니다.",
        recommendation: "환자안전과 직결된 옵션 A(전수 검토 및 재발방지 대책 수립)를 최우선 과제로 추진할 것을 건의함. 옵션 B·C는 옵션 A 시행 이후 순차 추진을 검토하되, 필요 시 병행 추진도 가능할 것으로 판단됨.",
        monitorPlan: "• 7월 1주차: 환자안전 플래그 12건 재발방지 조치 이행 여부 확인\n• 7월 2주차: 시스템·환경관련 유형 부정률 재점검\n• 7월 말: 7병동 · 내과 중환자실 · 내과 부정률 재평가",
        monitor: "8월 1주차 시스템 및 서비스 VOC 중간 점검, 8월 3주차 12병동 재평가, 8월 말 전체 지표 재집계."
      },
      typeSentiment: [
        { type: "시스템 및 서비스", cnt: 780, negChange: 4.2, pos: 38, neg: 62, org: "IT팀 · 예약센터", topKw: "예약 절차 복잡", kwShare: 43 },
        { type: "비용관련", cnt: 612, negChange: 2.0, pos: 25, neg: 75, org: "원무팀 · 보험팀", topKw: "비용 부담", kwShare: 38 },
        { type: "진료 및 치료·검사관련", cnt: 2410, negChange: -0.3, pos: 50, neg: 50, org: "진료과 · 의료진", topKw: "대기시간", kwShare: 25 },
        { type: "기타문의", cnt: 286, negChange: -0.5, pos: 35, neg: 65, org: "고객지원팀", topKw: "기타 불만", kwShare: 22 },
        { type: "환경관련", cnt: 705, negChange: 1.5, pos: 57, neg: 43, org: "시설관리팀", topKw: "소음", kwShare: 31 },
        { type: "인적응대관련", cnt: 1350, negChange: -2.1, pos: 67, neg: 33, org: "간호부 · 원무팀", topKw: "친절함(긍정)", kwShare: 29 },
        { type: "서비스제공관련", cnt: 940, negChange: -1.8, pos: 66, neg: 34, org: "원무행정팀 · 영양팀", topKw: "세심함(긍정)", kwShare: 27 },
        { type: "미분류", cnt: 180, negChange: null, pos: null, neg: null, org: "AI운영팀(키워드 사전 관리)", topKw: null, kwShare: null }
      ],
      vocNegTierThreshold: 50,
      vocVolumeMin: 300,
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
      vocQuoteSamples: {
        intro: "실제 접수된 VOC 원문 중 이번 달 흐름을 보여주는 사례입니다.",
        positive: [
          { text: "간호사분들이 정말 친절하고 세심하게 챙겨주셨어요.", meta: "12병동 · 인적응대", channel: "앱", date: "2026-06-03" },
          { text: "회진 시 의사 선생님 설명이 이해하기 쉬웠습니다.", meta: "내과 · 진료/치료", channel: "전화", date: "2026-06-07" },
          { text: "병실이 항상 깨끗하게 관리되어 있었어요.", meta: "51병동 · 환경", channel: "앱", date: "2026-06-11" },
          { text: "호출벨을 누르면 응답이 빨랐습니다.", meta: "52병동 · 서비스제공", channel: "앱", date: "2026-06-14" },
          { text: "수납 절차가 명확하게 안내되어 편했어요.", meta: "원무 · 비용", channel: "방문", date: "2026-06-18" },
          { text: "검사 전 주의사항을 자세히 알려주셔서 좋았습니다.", meta: "영상의학 · 검사", channel: "앱", date: "2026-06-20" },
          { text: "퇴원 후 관리 방법을 꼼꼼히 설명해 주셨어요.", meta: "내과 · 퇴원안내", channel: "앱", date: "2026-06-22" },
          { text: "직원분들이 항상 웃으며 응대해 주셔서 감사했습니다.", meta: "12병동 · 직원칭찬", channel: "앱", date: "2026-06-24" },
          { text: "대기 중에도 진행 상황을 안내해 주셔서 불안하지 않았어요.", meta: "외래 · 대기", channel: "전화", date: "2026-06-26" },
          { text: "전반적으로 신뢰가 가는 진료였습니다.", meta: "정형외과 · 전반평가", channel: "앱", date: "2026-06-28" }
        ],
        negative: [
          { text: "예약 절차가 너무 복잡해서 혼란스러웠습니다.", meta: "외래 · 시스템/서비스", channel: "앱", date: "2026-06-02" },
          { text: "대기시간이 안내보다 훨씬 길었어요.", meta: "외래 · 대기", channel: "앱", date: "2026-06-05" },
          { text: "통증 조절이 충분히 되지 않아 힘들었습니다.", meta: "6병동 · 진료/치료", channel: "전화", date: "2026-06-08" },
          { text: "병동 소음이 심해서 잠을 설쳤어요.", meta: "7병동 · 환경", channel: "앱", date: "2026-06-10" },
          { text: "호출 후 응대까지 시간이 오래 걸렸습니다.", meta: "51병동 · 인적응대", channel: "앱", date: "2026-06-13" },
          { text: "주차 공간을 찾기 어려웠어요.", meta: "방문 · 환경", channel: "방문", date: "2026-06-15" },
          { text: "수납 대기 줄이 너무 길었습니다.", meta: "원무 · 비용", channel: "방문", date: "2026-06-17" },
          { text: "안내 표지판이 부족해 길을 헤맸어요.", meta: "본관 · 환경", channel: "앱", date: "2026-06-19" },
          { text: "비용 안내가 사전에 충분하지 않았습니다.", meta: "원무 · 비용", channel: "앱", date: "2026-06-23" },
          { text: "일부 직원분의 응대가 다소 사무적으로 느껴졌어요.", meta: "외래 · 인적응대", channel: "앱", date: "2026-06-27" }
        ]
      },
      reportPrefix: "VOC 통계",
      reportKpiRows: [
        ["접수된 VOC 건수", "8,323건"],
        ["언급된 VOC 건수", "9,120건"],
        ["평균 태그 수", "1.10개"],
        ["부서칭찬 건수", "420건"],
        ["직원칭찬 건수", "820건"],
        ["전체 부정률", "43.7%"]
      ],
      summaryStructured: {
        conclusion: "6월 VOC는 총 8,323건 접수(▲214건)되었고, 대부분 유형에서 부정률이 개선되었습니다.",
        cause: "시스템 및 서비스(▲2.1%p)·환경관련(▲1.0%p) 유형 부정률 악화와 환자안전 플래그 12건(▲3건) 증가가 주요 이슈입니다.",
        impact: "7병동·내과 중환자실·내과·내과 김의사 그룹에서 부정률이 악화되어, 국지적이나 환자안전과 연계된 리스크가 있습니다.",
        recommendation: "환자안전 플래그 12건 전수 검토(옵션 A)를 1주 내 착수하고, 시스템·환경관련 유형 원인 점검을 병행하십시오."
      }
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
    var panelOpenMode = options.openMode === "reportDirect" ? "reportDirect" : "analysis";
    var hideSlider = options.hideLevelSlider !== false && (options.hideLevelSlider || variant === "voc" || variant === "survey");
    var level = options.level || "basic";
    if (panelOpenMode === "reportDirect") level = options.level || "deep";
    var curLv = Math.max(0, LV_KEYS.indexOf(level));
    if (curLv < 0) curLv = 1;
    var curTab = "analysis";
    var generated = false;
    var activeBlocks = null;
    var activeAnalysisBlocks = null;
    var appliedAnalysisBlocks = null;
    var analysisPhase = "strength";
    var importedItems = {};
    var removedReportBlocks = {};
    var reportSectionSel = null;
    var drag = false;
    var sx = 0;
    var si = 0;
    var disposed = false;
    var savedReportEntry = null;
    var selectedHistoryEntry = null;
    var historyFilter = "all";
    var mainViewTab = "analysis";
    host.innerHTML = "";
    var root = document.createElement("div");
    var useDarkModal = variant === "voc" || variant === "survey";
    root.className = "px-ai-root" + (useDarkModal ? " px-ai-voc" : "");
    var reportPaneInner = useDarkModal
      ? ""
      : '<div data-role="report-setup">' +
          '<div class="px-ai-rpt-header">' +
            '<div class="px-ai-rpt-desc">분석 결과를 기반으로 PIX AI 분석 보고서를 생성합니다.</div>' +
            '<button type="button" class="px-ai-gen" data-role="gen">보고서 생성 ↗</button>' +
          '</div></div>';
    var analysisBodyHtml = useDarkModal
      ? '<div data-role="body" class="px-ai-voc-body"></div>'
      : '<div data-role="body" class="px-ai-voc-body"></div>';
    var panelHtml = useDarkModal
      ? '<div class="px-ai-head">' +
          '<div class="px-ai-top">' +
            '<div><div class="px-ai-voc-title">' + esc(data.title || (variant === "voc" ? "VOC AI 상세 분석" : "환자경험평가 AI 상세 분석")) + '</div>' +
            '<div class="px-ai-voc-sub" data-role="period"></div></div>' +
            '<div class="px-ai-top-actions">' +
              '<button type="button" class="px-ai-history-head-btn" data-role="history-btn">보고서 이력확인</button>' +
              '<button type="button" class="px-ai-report-head-btn" data-role="report-btn" style="display:none">보고서 작성 ↗</button>' +
              '<button type="button" class="px-ai-close" data-role="close" aria-label="닫기">✕</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p class="px-ai-breadcrumb" data-role="breadcrumb"></p>' +
        '<div class="px-ai-inner-tabs" data-role="inner-tabs">' +
          '<button type="button" class="px-ai-inner-tab on" data-tab="analysis" data-role="analysis-tab">AI 분석</button>' +
          '<div class="px-ai-saved-report-tabs" data-role="saved-report-tabs"></div>' +
        '</div>' +
        '<div class="px-ai-scroll" data-role="scroll">' +
          '<div data-pane="analysis">' + analysisBodyHtml + '</div>' +
          '<div data-role="history-pane" style="display:none"></div>' +
          '<div data-role="saved-report-pane" style="display:none"></div>' +
          '<div data-pane="report" style="display:none">' +
            '<div class="px-ai-rpt-doc-wrap" data-role="report-doc"></div>' +
            '<div data-role="report-out" style="display:none"></div></div>' +
        '</div>' +
        '<div class="px-ai-import-overlay" data-role="import-overlay" style="display:none">' +
          '<div class="px-ai-import-dialog">' +
            '<div style="display:flex;justify-content:flex-end;margin-bottom:-8px">' +
              '<button type="button" class="px-ai-close" data-role="import-close">✕</button>' +
            '</div>' +
            '<div data-role="import-body"></div>' +
          '</div>' +
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
    root.innerHTML = '<style>' + CSS + (useDarkModal ? VOC_CSS : "") + '</style>' + panelHtml;
    host.appendChild(root);

    var els = {
      period: root.querySelector('[data-role="period"]'),
      breadcrumb: root.querySelector('[data-role="breadcrumb"]'),
      innerTabs: root.querySelector('[data-role="inner-tabs"]'),
      analysisTabBtn: root.querySelector('[data-role="analysis-tab"]'),
      title: root.querySelector('[data-role="title"]'),
      sum: root.querySelector('[data-role="sum"]'),
      insight: root.querySelector('[data-role="insight"]'),
      body: root.querySelector('[data-role="body"]'),
      track: root.querySelector('[data-role="track"]'),
      thumb: root.querySelector('[data-role="thumb"]'),
      gen: root.querySelector('[data-role="gen"]'),
      reportSetup: root.querySelector('[data-role="report-setup"]'),
      reportDoc: root.querySelector('[data-role="report-doc"]'),
      reportOut: root.querySelector('[data-role="report-out"]'),
      analysisPane: root.querySelector('[data-pane="analysis"]'),
      reportPane: root.querySelector('[data-pane="report"]'),
      importOverlay: root.querySelector('[data-role="import-overlay"]'),
      importBody: root.querySelector('[data-role="import-body"]'),
      importClose: root.querySelector('[data-role="import-close"]'),
      labels: root.querySelectorAll(".px-ai-hlbl"),
      tabs: root.querySelectorAll(".px-ai-tab"),
      innerTabBtns: root.querySelectorAll(".px-ai-inner-tab"),
      reportBtn: root.querySelector('[data-role="report-btn"]'),
      savedReportTabs: root.querySelector('[data-role="saved-report-tabs"]'),
      savedReportPane: root.querySelector('[data-role="saved-report-pane"]'),
      historyBtn: root.querySelector('[data-role="history-btn"]'),
      historyPane: root.querySelector('[data-role="history-pane"]'),
      close: root.querySelector('[data-role="close"]')
    };

    if (options.embedInArchive) {
      var archiveHead = root.querySelector(".px-ai-head");
      if (archiveHead) archiveHead.style.display = "none";
      if (els.innerTabs) els.innerTabs.style.display = "none";
      if (els.breadcrumb) els.breadcrumb.style.display = "none";
      if (els.close) els.close.style.display = "none";
      if (els.reportBtn) els.reportBtn.style.display = "none";
      if (els.historyBtn) els.historyBtn.style.display = "none";
      root.classList.add("px-ai-archive-embed");
      var archiveScroll = root.querySelector('[data-role="scroll"]');
      if (archiveScroll) {
        archiveScroll.style.maxHeight = "none";
        archiveScroll.style.height = "100%";
      }
    }

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
      var title = variant === "survey" ? "핵심 지표" : "핵심 지표 변화";
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">' + esc(title) + '</span><span class="px-ai-card-sub">' +
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
        (variant === "voc" ? "전월 대비 · 카테고리 단위 변화 기준" : "전월 대비 · 상승·하락 포함 절대 변화폭 기준") +
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
      var html = '<div class="px-ai-card" style="margin-bottom:14px">' +
        renderIssueActionMatrix(pos, neg, { variant: variant }) + "</div>";
      if (lv === "deep") {
        var changes = (data.keyChanges || []).map(function (c) {
          return '<div class="px-ai-change-row"><span class="px-ai-change-name">' + esc(c.name) +
            '</span><span class="px-ai-change-d ' + (c.up ? "up" : "dn") + '">' + esc(c.delta) +
            "</span></div>";
        }).join("");
        var changeTitle = data.changeSectionTitle || "부정률 변화";
        html += '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">' +
          esc(changeTitle) + " " + (data.keyChanges || []).length + "개</span></div>" + changes + "</div>";
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
    function formatIssueMatrixLabel(issue) {
      return esc(String(issue || "").replace(/\s*-\s*/g, " · "));
    }
    function groupIssueActionsBySev(items) {
      var groups = { h: [], m: [], l: [] };
      (items || []).forEach(function (p) {
        var key = p.sev === "h" || p.sev === "l" ? p.sev : "m";
        groups[key].push(p);
      });
      return groups;
    }
    function renderIssueMatrixChip(polarity, item) {
      var tip = [item.issueDesc, item.actionDesc].filter(Boolean).join(" — ");
      return '<button type="button" class="px-ai-ia-matrix-chip ' + polarity + '"' +
        (tip ? ' title="' + esc(tip) + '"' : "") + ">" +
        '<span class="px-ai-ia-matrix-chip-issue">' + formatIssueMatrixLabel(item.issue) + "</span>" +
        '<span class="px-ai-ia-matrix-chip-act">→ ' + esc(item.action) + "</span></button>";
    }
    function renderIssueMatrixCell(polarity, items) {
      if (!items || !items.length) {
        return '<div class="px-ai-ia-matrix-empty">해당 이슈 없음</div>';
      }
      return items.map(function (p) { return renderIssueMatrixChip(polarity, p); }).join("");
    }
    function renderIssueActionMatrix(pos, neg, opts) {
      opts = opts || {};
      var isSurvey = opts.variant === "survey";
      var title = isSurvey ? "상승·하락 영역 매트릭스" : "긍정·부정 이슈 매트릭스";
      var desc = isSurvey
        ? "개선도·하락 심각도 기준으로 정렬했습니다. 칩을 눌러 상세 조치를 확인하세요."
        : "개선도·심각도 기준으로 정렬했습니다. 칩을 눌러 상세 조치를 확인하세요.";
      var posCol = isSurvey ? "상승 영역" : "긍정 이슈";
      var negCol = isSurvey ? "하락 영역" : "부정 이슈";
      var foot = isSurvey
        ? "※ 행은 상승 영역의 개선도, 하락 영역의 심각도 기준입니다. 조치의 우선순위는 칩 색상(파랑=권장, 빨강=시급)으로 구분됩니다."
        : "※ 행은 긍정 이슈의 개선도, 부정 이슈의 심각도 기준입니다. 조치의 우선순위는 칩 색상(파랑=권장, 빨강=시급)으로 구분됩니다.";
      var total = (pos || []).length + (neg || []).length;
      var posGroups = groupIssueActionsBySev(pos);
      var negGroups = groupIssueActionsBySev(neg);
      var rows = [
        { key: "h", label: "높음", cls: "h" },
        { key: "m", label: "보통", cls: "m" },
        { key: "l", label: "낮음", cls: "l" }
      ];
      var body = rows.map(function (row) {
        return '<div class="px-ai-ia-matrix-row">' +
          '<div class="px-ai-ia-matrix-row-label ' + row.cls + '">' + row.label + "</div>" +
          '<div class="px-ai-ia-matrix-cell">' + renderIssueMatrixCell("pos", posGroups[row.key]) + "</div>" +
          '<div class="px-ai-ia-matrix-cell">' + renderIssueMatrixCell("neg", negGroups[row.key]) + "</div>" +
          "</div>";
      }).join("");
      return '<div class="px-ai-ia-matrix">' +
        '<div class="px-ai-ia-matrix-hd">' +
          "<div>" +
            '<div class="px-ai-ia-matrix-title">' + title + "</div>" +
            '<div class="px-ai-ia-matrix-desc">' + desc + "</div>" +
          "</div>" +
          '<div class="px-ai-ia-matrix-meta">' + total + "개 이슈 · 권장조치 포함</div>" +
        "</div>" +
        '<div class="px-ai-ia-matrix-cols">' +
          "<div></div>" +
          '<div class="px-ai-ia-matrix-col-hd pos">' + posCol + "</div>" +
          '<div class="px-ai-ia-matrix-col-hd neg">' + negCol + "</div>" +
        "</div>" +
        body +
        '<div class="px-ai-ia-matrix-foot">' + foot + "</div>" +
        "</div>";
    }
    function renderVocDetailJudgement(includeFooter, posLimit, negLimit) {
      var pos = data.positiveIssueActions || [];
      var neg = data.negativeIssueActions || [];
      if (typeof posLimit === "number") pos = pos.slice(0, posLimit);
      if (typeof negLimit === "number") neg = neg.slice(0, negLimit);
      var html = '<div class="px-ai-card">' +
        renderIssueActionMatrix(pos, neg, { variant: variant });
      if (includeFooter) {
        html += renderDetailMonitorsFooter();
      }
      html += "</div>";
      return html;
    }
    function monitorItemTitle(m) {
      if (m.category && m.keyword) return m.category + " - " + m.keyword;
      return m.name || "";
    }
    function monitorItemStats(m) {
      if (m.avgNegRate != null && m.stdDev != null) {
        return "최근 6개월 평균 불만 비율 " + Number(m.avgNegRate).toFixed(1) +
          "% (보통 ±" + Number(m.stdDev).toFixed(1) + "%p 범위)";
      }
      return m.avg || "";
    }
    function monitorItemReason(m) {
      return m.reason || m.criteria || "";
    }
    function renderMonitorQuoteItem(item) {
      var q = typeof item === "string" ? { text: item, meta: "", channel: "", date: "" } : item;
      var metaParts = [q.meta, q.channel, q.date].filter(Boolean);
      return '<div class="px-ai-voc-quote-item neg">' +
        '<p class="px-ai-voc-quote-text">"' + esc(q.text || "") + '"</p>' +
        (metaParts.length ? '<p class="px-ai-voc-quote-meta">' + esc(metaParts.join(" · ")) + "</p>" : "") +
        "</div>";
    }
    function renderMonitorQuotes(m) {
      var quotes = (m.quotes || []).slice(0, 3);
      if (!quotes.length) return "";
      return '<div class="px-ai-mon-quotes"><p class="px-ai-mon-quotes-hd">관련 VOC 원문</p>' +
        quotes.map(renderMonitorQuoteItem).join("") + "</div>";
    }
    function renderMonitorItem(m) {
      return '<div class="px-ai-mon-item"><div class="px-ai-mon-name">' + esc(monitorItemTitle(m)) +
        '</div><div class="px-ai-mon-stats">' + esc(monitorItemStats(m)) +
        '</div><div class="px-ai-mon-reason">' + esc(monitorItemReason(m)) + "</div>" +
        renderMonitorQuotes(m) + "</div>";
    }
    function monitorItemPlainText(m) {
      var text = monitorItemTitle(m) + "\n" + monitorItemStats(m) + "\n" + monitorItemReason(m);
      var quotes = (m.quotes || []).slice(0, 3);
      if (quotes.length) {
        text += "\n관련 VOC 원문:";
        quotes.forEach(function (q) {
          var item = typeof q === "string" ? { text: q } : q;
          text += '\n  "' + (item.text || "") + '"';
        });
      }
      return text;
    }
    function renderDetailMonitorsFooter() {
      var monCount = (data.detailMonitors || []).length;
      var mons = (data.detailMonitors || []).map(renderMonitorItem).join("");
      return '<div class="px-ai-ia-matrix-monitor">' +
        '<p class="px-ai-voc-detail-sub monitor">모니터링 <span class="px-ai-card-sub">' +
        monCount + "개 · 심각도 높음 이슈 기준</span></p>" + mons + "</div>";
    }
    function categoryCardHtml(t, volMin) {
      var cls = t.negChange <= 0 ? "good" : "bad";
      var sign = t.negChange > 0 ? "▲" : "▼";
      var lowVolume = t.cnt < volMin;
      var tagParts = [];
      if (t.topKw) {
        tagParts.push('<span class="px-ai-matrix-tag kw">최다 키워드 \'' + esc(t.topKw) + "' " + t.kwShare + "%</span>");
      }
      if (lowVolume) {
        tagParts.push('<span class="px-ai-matrix-tag warn">건수 ' + t.cnt.toLocaleString() + "건 · 표본 적음</span>");
      }
      var tags = tagParts.length ? '<div class="px-ai-matrix-tags">' + tagParts.join("") + "</div>" : "";
      return '<div class="px-ai-matrix-card">' +
        '<div class="px-ai-matrix-card-top"><span class="px-ai-matrix-card-name">' + esc(t.type) + '</span>' +
        '<span class="px-ai-matrix-card-score">부정 ' + t.neg + '% <span class="px-ai-kw-delta ' + cls + '">' + sign + Math.abs(t.negChange).toFixed(1) + '%p</span></span></div>' +
        tags + "</div>";
    }
    function matrixQuadrant(title, desc, badgeCls, rows, volMin, emptyText) {
      var body = rows.length
        ? rows.map(function (t) { return categoryCardHtml(t, volMin); }).join("")
        : '<p class="px-ai-matrix-empty">' + esc(emptyText || "해당하는 유형이 없습니다.") + "</p>";
      return '<div class="px-ai-matrix-quad"><span class="px-ai-vbadge ' + badgeCls + '">' + esc(title) + '</span>' +
        '<p class="px-ai-matrix-quad-desc">' + esc(desc) + "</p>" + body + "</div>";
    }
    function renderCategoryMatrix() {
      var threshold = data.vocNegTierThreshold || 50;
      var volMin = data.vocVolumeMin || 300;
      var rows = data.typeSentiment || [];
      var scored = rows.filter(function (t) { return t.neg !== null; });
      var highNeg = scored.filter(function (t) { return t.neg >= threshold; });
      var lowNeg = scored.filter(function (t) { return t.neg < threshold; });
      var urgent = highNeg.filter(function (t) { return t.negChange > 0; });
      var watch = lowNeg.filter(function (t) { return t.negChange > 0; });
      var improving = highNeg.filter(function (t) { return t.negChange <= 0; });
      var excellent = lowNeg.filter(function (t) { return t.negChange <= 0; });
      var unclassified = rows.filter(function (t) { return t.neg === null; })[0];
      var uncBanner = unclassified
        ? '<div class="px-ai-matrix-warn">⚠ 미분류 ' + unclassified.cnt.toLocaleString() + "건은 감정 판정이 되지 않아 매트릭스에서 제외했습니다.</div>"
        : "";
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">유형 진단 매트릭스</span><span class="px-ai-card-sub">부정률(' + threshold + '% 기준) × 변화 방향</span></div>' +
        uncBanner +
        '<div class="px-ai-matrix-grid">' +
        matrixQuadrant("긴급 대응", "부정률 높음 + 악화 중 — 즉시 원인 분석 및 조치가 필요합니다.", "px-ai-vbadge-high", urgent, volMin) +
        matrixQuadrant("주의 관찰", "부정률 낮음 + 악화 중 — 아직 위험 수준은 아니나 방향 전환 필요.", "px-ai-vbadge-mid", watch, volMin) +
        matrixQuadrant("개선 중", "부정률 높음 + 개선 중 — 방향은 맞으나 계속 지켜봐야 함.", "px-ai-vbadge-low", improving, volMin) +
        matrixQuadrant("우수 사례", "부정률 낮음 + 개선 중 — 우수 사례로 확산할 대상.", "px-ai-vbadge-neutral", excellent, volMin) +
        "</div></div>";
    }
    function areaCardHtml(a) {
      var cls = a.change >= 0 ? "good" : "bad";
      var sign = a.change >= 0 ? "▲" : "▼";
      var tags = a.lowPct > 0
        ? '<div class="px-ai-matrix-tags"><span class="px-ai-matrix-tag warn">저점 응답 ' + a.lowPct + "%</span></div>"
        : "";
      return '<div class="px-ai-matrix-card">' +
        '<div class="px-ai-matrix-card-top"><span class="px-ai-matrix-card-name">' + esc(a.name) + '</span>' +
        '<span class="px-ai-matrix-card-score">' + a.score.toFixed(2) + '점 <span class="px-ai-kw-delta ' + cls + '">' + sign + Math.abs(a.change).toFixed(2) + "</span></span></div>" +
        tags + "</div>";
    }
    function renderSurveyAreaMatrix() {
      var areas = data.pxAreas || [];
      var threshold = data.pxLowTierThreshold || 75;
      var sampleMin = data.pxSampleMin || 30;
      var count = data.pxRespondentCount || 0;
      var lowTier = areas.filter(function (a) { return a.score < threshold; });
      var highTier = areas.filter(function (a) { return a.score >= threshold; });
      var urgent = lowTier.filter(function (a) { return a.change < 0; });
      var watch = highTier.filter(function (a) { return a.change < 0; });
      var improving = lowTier.filter(function (a) { return a.change >= 0; });
      var excellent = highTier.filter(function (a) { return a.change >= 0; });
      var sampleWarning = count < sampleMin
        ? '<div class="px-ai-matrix-warn sample">⚠ 이번 달 응답자 수는 ' + count + "명으로, 권장 최소 표본(" + sampleMin + "명) 미만입니다. 소수 응답의 영향이 클 수 있어 변화 해석에 주의가 필요합니다.</div>"
        : "";
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">영역 진단 매트릭스</span><span class="px-ai-card-sub">절대 점수(' + threshold + '점 기준) × 변화 방향</span></div>' +
        sampleWarning +
        '<div class="px-ai-matrix-grid">' +
        '<div class="px-ai-matrix-quad"><span class="px-ai-vbadge px-ai-vbadge-high">긴급 대응</span><p class="px-ai-matrix-quad-desc">낮은 점수 + 하락 중 — 즉시 원인 분석 및 조치가 필요합니다.</p>' +
        (urgent.length ? urgent.map(areaCardHtml).join("") : '<p class="px-ai-matrix-empty">해당하는 영역이 없습니다.</p>') + "</div>" +
        '<div class="px-ai-matrix-quad"><span class="px-ai-vbadge px-ai-vbadge-mid">주의 관찰</span><p class="px-ai-matrix-quad-desc">높은 점수 + 하락 중 — 아직 위험 수준은 아니나 방향 전환 필요.</p>' +
        (watch.length ? watch.map(areaCardHtml).join("") : '<p class="px-ai-matrix-empty">해당하는 영역이 없습니다.</p>') + "</div>" +
        '<div class="px-ai-matrix-quad"><span class="px-ai-vbadge px-ai-vbadge-low">개선 중</span><p class="px-ai-matrix-quad-desc">낮은 점수 + 상승 중 — 방향은 맞으나 계속 지켜봐야 함.</p>' +
        (improving.length ? improving.map(areaCardHtml).join("") : '<p class="px-ai-matrix-empty">해당하는 영역이 없습니다.</p>') + "</div>" +
        '<div class="px-ai-matrix-quad"><span class="px-ai-vbadge px-ai-vbadge-neutral">우수 사례</span><p class="px-ai-matrix-quad-desc">높은 점수 + 상승 중 — 우수 사례로 확산할 대상.</p>' +
        (excellent.length ? excellent.map(areaCardHtml).join("") : '<p class="px-ai-matrix-empty">해당하는 영역이 없습니다.</p>') + "</div>" +
        "</div></div>";
    }
    function surveyGapToneCls(tone) {
      if (tone === "bad") return "bad";
      if (tone === "good") return "good";
      if (tone === "warn") return "neu";
      return "neu";
    }
    function quartileMarkerStyle(left) {
      var pct = parseFloat(String(left || "50"));
      if (isNaN(pct)) pct = 50;
      if (pct < 14) return { pos: "left:" + pct + "%", cls: "is-edge-left" };
      if (pct > 86) return { pos: "right:" + (100 - pct) + "%", cls: "is-edge-right" };
      return { pos: "left:" + pct + "%", cls: "is-center" };
    }
    function renderGradeCurrentPosition(src) {
      if (!src) return "";
      var gradeLabel = src.gradeLabel || "3등급";
      var pct = src.gradePercentile;
      return '<div class="px-ai-grade-current-only">' +
        '<div class="px-ai-grade-metric is-status is-single">' +
          '<div class="px-ai-grade-metric-k">' + esc(gradeLabel + " 내 현재 위치") + "</div>" +
          '<div class="px-ai-grade-metric-v">하위 ' + esc(String(pct)) + "%</div>" +
          '<div class="px-ai-grade-metric-d">동일한 ' + esc(gradeLabel) + " 기관 중 점수가 낮은 구간에 위치합니다.</div>" +
        "</div></div>";
    }
    function renderGradePositionSummary(ps) {
      if (!ps) return "";
      var grade = ps.gradeScope || {};
      var overall = ps.overallScope || {};
      return '<div class="px-ai-grade-pos-summary">' +
        '<div class="px-ai-grade-pos-block is-primary">' +
          '<span class="px-ai-grade-pos-tag">' + esc(grade.tag || "3등급 내 기준") + "</span>" +
          '<div class="px-ai-grade-pos-headline">' + esc(grade.headline || "") + "</div>" +
          (grade.subline ? '<div class="px-ai-grade-pos-sub">' + esc(grade.subline) + "</div>" : "") +
          (grade.directionNote ? '<div class="px-ai-grade-pos-dir">' + esc(grade.directionNote) + "</div>" : "") +
        "</div>" +
        '<div class="px-ai-grade-pos-block is-secondary">' +
          '<span class="px-ai-grade-pos-tag">' + esc(overall.tag || "전체 기준") + "</span>" +
          '<div class="px-ai-grade-pos-headline">' + esc(overall.headline || "") + "</div>" +
          (overall.subline ? '<div class="px-ai-grade-pos-sub">' + esc(overall.subline) + "</div>" : "") +
        "</div></div>";
    }
    function renderQuartilePositionBar(g) {
      if (!g) return "";
      var qMarker = g.quartileMarker || { left: "50%", label: "" };
      var qMarkerPos = quartileMarkerStyle(qMarker.left);
      var segColors = [
        "rgba(242,148,156,.32)",
        "rgba(232,196,106,.24)",
        "rgba(126,166,255,.18)",
        "rgba(127,214,176,.18)"
      ];
      var segHtml = segColors.map(function (color) {
        return '<div class="px-ai-survey-quartile-seg" style="background:' + color + '"></div>';
      }).join("");
      var tickHtml = (g.quartileLabels || []).map(function (tick) {
        if (typeof tick === "string") {
          return '<div class="px-ai-survey-quartile-tick"><span class="lbl">' + esc(tick) + "</span></div>";
        }
        return '<div class="px-ai-survey-quartile-tick">' +
          '<span class="lbl">' + esc(tick.label) + "</span>" +
          (tick.score ? '<span class="score">' + esc(tick.score) + "</span>" : "") +
          (tick.stat ? '<span class="stat">' + esc(tick.stat) + "</span>" : "") +
        "</div>";
      }).join("");
      var markerLbl = qMarker.label
        ? esc(qMarker.label) + (qMarker.sublabel ? '<span class="sub">' + esc(qMarker.sublabel) + "</span>" : "")
        : "";
      return '<div class="px-ai-quartile-bar-wrap">' +
        '<div class="px-ai-survey-quartile-bar">' + segHtml +
          '<div class="px-ai-survey-quartile-marker" style="left:' + esc(qMarker.left) + '">' +
            '<div class="px-ai-survey-quartile-marker-dot"></div>' +
          "</div>" +
          (markerLbl ? '<div class="px-ai-survey-quartile-marker-lbl ' + qMarkerPos.cls + '" style="' + qMarkerPos.pos + '">' + markerLbl + "</div>" : "") +
        "</div>" +
        '<div class="px-ai-survey-quartile-ticks">' + tickHtml + "</div>" +
      "</div>";
    }
    function renderStatisticsDetails(sd, fallbackNote) {
      if (!sd && !fallbackNote) return "";
      var body = "";
      if (sd && sd.summary) body += "<p>" + esc(sd.summary) + "</p>";
      (sd && sd.items ? sd.items : []).forEach(function (line) {
        body += "<p>" + esc(line) + "</p>";
      });
      if (!body && fallbackNote) body = "<p>" + esc(fallbackNote) + "</p>";
      if (!body) return "";
      return '<details class="px-ai-grade-stats-details">' +
        '<summary>통계 상세 보기</summary>' +
        '<div class="px-ai-grade-stats-details-body">' + body + "</div></details>";
    }
    function renderGradePositionSection(g) {
      if (!g) return "";
      return '<div class="px-ai-grade-pos-card">' +
        '<div class="px-ai-grade-pos-card-hd">' + esc(g.quartileTitle || "3등급 내 위치") + "</div>" +
        renderGradePositionSummary(g.positionSummary) +
        renderQuartilePositionBar(g) +
        renderGradeCurrentPosition(g.metricsSource) +
        renderStatisticsDetails(g.statisticsDetails, g.quartileNote) +
      "</div>";
    }
    function renderSurveyUpperGradePanel(ug) {
      if (!ug) return "";
      var items = (ug.items || []).map(function (item) {
        return '<div class="px-ai-survey-upper-grade-item">' +
          '<div class="px-ai-survey-upper-grade-item-k">' + esc(item.grade) + "</div>" +
          '<div class="px-ai-survey-upper-grade-item-v">' + esc(item.gap || "") + '<span class="unit">점</span></div>' +
          '<div class="px-ai-survey-upper-grade-item-d">' + esc(item.thresholdNote || "") + "</div></div>";
      }).join("");
      var nearest = (ug.items || []).find(function (item) { return item.grade === (ug.progressGrade || "2등급"); }) ||
        (ug.items || [])[0];
      var progress = nearest && nearest.progressLeft ? nearest.progressLeft : "0%";
      var trackHtml = nearest
        ? '<div class="px-ai-survey-upper-grade-track-wrap px-ai-survey-next-grade-track-wrap">' +
            '<div class="px-ai-survey-next-grade-track">' +
              '<div class="px-ai-survey-next-grade-fill" style="width:' + esc(progress) + '"></div>' +
              '<div class="px-ai-survey-next-grade-thumb" style="left:' + esc(progress) + '"></div>' +
            "</div>" +
            '<div class="px-ai-survey-next-grade-labels">' +
              '<span class="cur">현재 ' + esc(ug.currentLabel || "") + "</span>" +
              '<span class="tgt">목표 ' + esc(nearest.targetLabel || ug.nearestTargetLabel || "") + "</span>" +
            "</div></div>"
        : "";
      return '<div class="px-ai-survey-upper-grade">' +
        '<div class="px-ai-survey-upper-grade-title">' + esc(ug.title || "상위등급까지 남은 점수") + "</div>" +
        '<div class="px-ai-survey-upper-grade-grid">' + items + "</div>" +
        trackHtml + "</div>";
    }
    function renderSurveyGradeDemotionWarn(w) {
      if (!w) return "";
      var gap = esc(w.gap || "");
      var text = w.text || "";
      var html = text.replace(gap + "점", '<span class="hot">' + gap + "점</span>");
      if (html === text && gap) html = text.replace(gap, '<span class="hot">' + gap + "</span>");
      return '<div class="px-ai-survey-demotion-warn">' + html + "</div>";
    }
    function renderSurveyGradeAnalysis() {
      var g = data.gradeAnalysis;
      if (!g) return "";
      var grades = (g.grades || []).map(function (item) {
        return '<div class="px-ai-survey-grade-box' + (item.current ? " on" : "") + '">' +
          '<div class="px-ai-survey-grade-lbl">' + esc(item.label) + '</div>' +
          '<div class="px-ai-survey-grade-range">' + esc(item.range) + "</div></div>";
      }).join("");
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">등급 분석</span><span class="px-ai-card-sub">' +
          esc(g.subtitle || "") + "</span></div>" +
        '<div class="px-ai-survey-grade-strip">' + grades + "</div>" +
        renderSurveyUpperGradePanel(g.upperGrades) +
        renderSurveyGradeDemotionWarn(g.demotionWarning) +
        (g.footnote ? '<p class="px-ai-survey-footnote" style="margin-top:0;padding-top:0;border-top:none">' + esc(g.footnote) + "</p>" : "") +
        '<div class="px-ai-survey-quartile-wrap">' + renderGradePositionSection(g) + "</div></div>";
    }
    function renderSurveyBedAnalysis() {
      var b = data.bedAnalysis;
      if (!b) return "";
      var segments = (b.segments || []).map(function (seg) {
        return '<div class="px-ai-survey-bed-chip' + (seg.current ? " on" : "") + '">' +
          '<div class="px-ai-survey-bed-chip-lbl">' + esc(seg.label) + '</div>' +
          '<div class="px-ai-survey-bed-chip-v">' + esc(seg.score) + '</div>' +
          '<div class="px-ai-survey-bed-chip-n">' + esc(seg.count) + "</div></div>";
      }).join("");
      var cards = (b.cards || []).map(function (c) {
        return '<div class="px-ai-survey-mini-card"><div class="px-ai-survey-mini-k">' + esc(c.label) +
          '</div><div class="px-ai-survey-mini-v' + (c.tone === "good" ? '" style="color:#7ea6ff"' : '"') + ">" +
          esc(c.value) + '</div><div class="px-ai-survey-mini-d">' + esc(c.note) + "</div></div>";
      }).join("");
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">병상수별 분석</span><span class="px-ai-card-sub">' +
          esc(b.subtitle || "") + "</span></div>" +
        '<p class="px-ai-voc-sum" style="margin-bottom:10px">' + esc(b.intro || "") + "</p>" +
        '<div class="px-ai-survey-bed-row">' + segments + "</div>" +
        '<div class="px-ai-survey-mini-grid" style="margin-bottom:10px">' + cards + "</div>" +
        '<p class="px-ai-voc-sum">' + esc(b.summary || "") + "</p>" +
        (b.footnote ? '<p class="px-ai-survey-footnote">' + esc(b.footnote) + "</p>" : "") +
        "</div>";
    }
    function renderSurveyAreaGapAnalysis() {
      var g = data.areaGapAnalysis;
      if (!g) return "";
      var rows = (g.rows || []).map(function (row) {
        return "<tr><td>" + esc(row.area) + '</td><td style="text-align:right">' + esc(row.ours) +
          '</td><td style="text-align:right" class="px-ai-metric-d ' + surveyGapToneCls(row.allTone) + '">' + esc(row.allGap) +
          '</td><td style="text-align:right" class="px-ai-metric-d ' + surveyGapToneCls(row.gradeTone) + '">' + esc(row.gradeGap) +
          "</td></tr>";
      }).join("");
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">영역별 격차 (전체 평균 · 3등급 평균 대비)</span></div>' +
        '<p class="px-ai-voc-sum" style="margin-bottom:10px">' + esc(g.intro || "") + "</p>" +
        '<table class="px-ai-survey-gap-tbl"><tr><th>영역</th><th>우리</th><th>전체평균 격차</th><th>3등급평균 격차</th></tr>' +
          rows + "</table>" +
        '<p class="px-ai-voc-sum" style="margin-top:10px">' + esc(g.summary || "") + "</p>" +
        (g.footnote ? '<p class="px-ai-survey-footnote">' + esc(g.footnote) + "</p>" : "") +
        "</div>";
    }
    function renderSurveyGradePriority() {
      var p = data.gradePriority;
      if (!p) return "";
      var areas = (p.areas || []).map(function (area) {
        var items = (area.items || []).map(function (item) {
          return '<div class="px-ai-survey-rank-row"><span class="px-ai-survey-rank-lbl">' + esc(item.label) +
            '</span><span class="px-ai-survey-rank-val' + (item.hot ? " hot" : "") + '">' + esc(item.score) + "</span></div>";
        }).join("");
        return '<div class="px-ai-survey-priority-card">' +
          '<div class="px-ai-survey-priority-head"><span class="px-ai-survey-priority-title">' + esc(area.title) +
            '</span><span class="px-ai-vbadge ' + (area.pillTone === "m" ? "px-ai-vbadge-mid" : "px-ai-vbadge-high") + '">' +
            esc(area.pill) + "</span></div>" + items +
          (area.note ? '<p style="font-size:10.5px;color:#7a7887;margin:6px 0 0">' + esc(area.note) + "</p>" : "") +
          "</div>";
      }).join("");
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">2등급 진입을 위한 영역·문항 우선순위</span></div>' +
        '<p class="px-ai-voc-sum" style="margin-bottom:10px">' + esc(p.intro || "") + "</p>" +
        areas +
        '<p class="px-ai-voc-sum" style="margin-top:10px;padding-top:10px;border-top:1px dashed #2d2c36">' + esc(p.summary || "") + "</p>" +
        "</div>";
    }
    function renderSurveyTopAreas() {
      var areas = (data.pxAreas || []).slice().sort(function (a, b) {
        return Math.abs(b.change) - Math.abs(a.change);
      }).slice(0, 3);
      var questions = [
        { name: "문19 재문의", change: 20.0 },
        { name: "문21 위로와 공감", change: -15.0 },
        { name: "문1 예의", change: 14.8 }
      ];
      function listHtml(items, isArea) {
        return items.map(function (item, i) {
          var ch = isArea ? item.change : item.change;
          var isUp = ch >= 0;
          var cls = isUp ? "good" : "bad";
          var sign = isUp ? "▲" : "▼";
          var label = isArea ? item.name : item.name;
          return '<div class="px-ai-kw-row' + (i > 0 ? " bordered" : "") + '"><span class="px-ai-kw-name">' + (i + 1) + ". " + esc(label) +
            '</span><span class="px-ai-kw-delta ' + cls + '">' + sign + Math.abs(ch).toFixed(1) + "점</span></div>";
        }).join("");
      }
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">변화 영역 및 문항 TOP3</span><span class="px-ai-card-sub">전월 대비 · 상승·하락 포함 절대 변화폭 기준</span></div>' +
        '<div class="px-ai-catkw">' +
        '<div class="px-ai-catkw-col"><div class="px-ai-catkw-hd">변화 영역</div>' + listHtml(areas, true) + "</div>" +
        '<div class="px-ai-catkw-col"><div class="px-ai-catkw-hd">변화 문항</div>' + listHtml(questions, false) + "</div>" +
        "</div></div>";
    }
    function reportAreaBarHtml() {
      return (data.pxAreas || []).map(function (a) {
        var color = a.change >= 0 ? "#4ade80" : "#f87171";
        return '<div class="px-ai-area-bar-row"><div class="px-ai-area-bar-meta"><span>' + esc(a.name) + "</span><span>" +
          a.score.toFixed(2) + "점 (" + (a.change >= 0 ? "▲" : "▼") + Math.abs(a.change).toFixed(2) + ")</span></div>" +
          '<div class="px-ai-area-bar-track"><div class="px-ai-area-bar-fill" style="width:' + a.score + "%;background:" + color + '"></div></div></div>';
      }).join("");
    }
    function renderVocChangeMonitorSplit(embedded) {
      var changes = (data.keyChanges || []).map(function (c) {
        return '<div class="px-ai-change-row"><span class="px-ai-change-name">' + esc(c.name) +
          '</span><span class="px-ai-change-d ' + (c.up ? "up" : "dn") + '">' + esc(c.delta) + "</span></div>";
      }).join("");
      var mons = (data.detailMonitors || []).map(renderMonitorItem).join("");
      var changeTitle = data.changeSectionTitle || "부정률 변화";
      var monCount = (data.detailMonitors || []).length;
      var split = '<div class="px-ai-split' + (embedded ? " embedded" : "") + '">' +
        '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">' +
          esc(changeTitle) + " " + (data.keyChanges || []).length + "개</span></div>" + changes + "</div>" +
        '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">모니터링 ' +
          monCount + "개 · 심각도 높음 이슈 기준</span></div>" + mons + "</div>" +
        "</div>";
      return embedded ? split : split;
    }
    function renderChangesCard() {
      var changes = (data.keyChanges || []).map(function (c) {
        return '<div class="px-ai-change-row"><span class="px-ai-change-name">' + esc(c.name) +
          '</span><span class="px-ai-change-d ' + (c.up ? "up" : "dn") + '">' + esc(c.delta) + "</span></div>";
      }).join("");
      var changeTitle = data.changeSectionTitle || "부정률 변화";
      return '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">' +
        esc(changeTitle) + " " + (data.keyChanges || []).length + "개</span></div>" + changes + "</div>";
    }
    function renderMonitorCard() {
      var monCount = (data.detailMonitors || []).length;
      var mons = (data.detailMonitors || []).map(renderMonitorItem).join("");
      return '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">모니터링 ' +
        monCount + "개 · 심각도 높음 이슈 기준</span></div>" + mons + "</div>";
    }
    function summaryForLevel(lvKey) {
      if (data.sum && data.sum[lvKey]) return (data.sum[lvKey] || "").replace(/\\n/g, "\n");
      var texts = data.reportOverview || {};
      return (texts[lvKey] || texts.basic || deepSummaryText()).replace(/\\n/g, "\n");
    }
    function blocksForLevel(lv) {
      if (variant === "survey") {
        if (lv === "simple") return ["grade"];
        if (lv === "basic") return ["grade", "beds", "gap"];
        return ["grade", "beds", "gap", "gradePriority", "matrix"];
      }
      if (lv === "simple") return ["keywords"];
      if (lv === "basic") return ["keywords", "actions", "dist"];
      return ["keywords", "actions", "dist"];
    }
    function resolveAnalysisBlocks() {
      var lv = LV_KEYS[curLv];
      return appliedAnalysisBlocks || blocksForLevel(lv);
    }
    function deepSummaryText() {
      if (data.sum && data.sum.deep) {
        return (data.sum.deep || "").replace(/\\n/g, "\n");
      }
      var texts = data.reportOverview || {};
      return (texts.deep || texts.basic || "").replace(/\\n/g, "\n");
    }
    function renderChipBasedAnalysis() {
      var lv = LV_KEYS[curLv];
      var optional = resolveAnalysisBlocks();
      var sumText = summaryForLevel(lv);
      var periodSub = esc(data.periodShort || data.periodText || "");
      var rightHtml = renderInsightCard() + renderMetricChanges();
      if (variant === "voc") {
        if (lv === "simple") {
          rightHtml += renderKeywordTop();
        } else {
          if (optional.indexOf("dist") > -1) rightHtml += renderDistCard();
          if (optional.indexOf("keywords") > -1) rightHtml += renderKeywordTop();
          if (lv === "basic" || lv === "deep") {
            if (optional.indexOf("actions") > -1) {
              rightHtml += renderVocDetailJudgement(lv === "deep", lv === "basic" ? 5 : undefined, lv === "basic" ? 5 : undefined);
            }
          }
        }
      } else if (variant === "survey") {
        if (optional.indexOf("areas") > -1) rightHtml += renderSurveyTopAreas();
        if (optional.indexOf("grade") > -1) rightHtml += renderSurveyGradeAnalysis();
        if (optional.indexOf("beds") > -1) rightHtml += renderSurveyBedAnalysis();
        if (optional.indexOf("gap") > -1) rightHtml += renderSurveyAreaGapAnalysis();
        if (optional.indexOf("gradePriority") > -1) rightHtml += renderSurveyGradePriority();
        if (optional.indexOf("matrix") > -1) rightHtml += renderSurveyAreaMatrix();
        if (lv === "deep" && optional.indexOf("actions") > -1) {
          rightHtml += renderVocDetailJudgement(true);
        }
        if (lv === "deep") {
          if (optional.indexOf("changes") > -1) rightHtml += renderChangesCard();
        }
      }
      els.body.innerHTML =
        '<div class="px-ai-voc-layout">' +
          '<div class="px-ai-card px-ai-sum-card px-ai-sum-card-top"><div class="px-ai-card-hd">' +
          '<span class="px-ai-card-ttl">🩺 AI 요약</span><span class="px-ai-card-sub">' + periodSub +
          ' · <span class="px-ai-level-tag">' + esc(LV_NAMES[curLv]) + "</span></span></div>" +
          '<p class="px-ai-voc-sum">' + esc(sumText) + "</p></div>" +
          '<div class="px-ai-voc-grid-body">' + rightHtml + "</div>" +
        "</div>";
    }
    function renderAnalysis() {
      var lv = LV_KEYS[curLv];
      if (variant === "voc" || variant === "survey") {
        if (els.period) els.period.textContent = data.periodText;
        if (analysisPhase === "ready") renderChipBasedAnalysis();
        else if (analysisPhase === "strength") renderStep2Strength();
        return;
      }
      els.period.textContent = data.periodText;
      els.title.textContent = data.title;
      els.sum.textContent = (data.sum[lv] || "").replace(/\\n/g, "\n");
      var h = '<div class="px-ai-body-stack">' + renderInsightCard() + renderMetricChanges() + renderKeywordTop();
      if (lv === "basic" || lv === "deep") {
        h += renderDetailJudgement(lv);
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
    function defaultAnalysisBlocks() {
      return (data.analysisDefaultBlocks || []).slice();
    }
    var ANALYSIS_BASE_BLOCKS = [
      { key: "summary", name: "AI 요약" },
      { key: "insight", name: "AI 인사이트" },
      { key: "kpi", name: "핵심 지표" }
    ];
    function renderDistCard() {
      return '<div class="px-ai-card"><div class="px-ai-card-hd"><span class="px-ai-card-ttl">유형별 분포</span></div>' +
        reportTypeDistHtml() + "</div>";
    }
    function formatSavedReportTime(iso) {
      if (!iso) return "";
      try {
        var d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "";
        var p = function (n) { return String(n).padStart(2, "0"); };
        return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
      } catch (_e) {
        return "";
      }
    }
    function savedReportTabLabel(status) {
      return status === "draft" ? "보고서 · 임시저장" : "보고서 · 저장됨";
    }
    function loadSavedReportFromStorage() {
      savedReportEntry = null;
      if (!options.reportStorageKey) return;
      try {
        var raw = global.localStorage && global.localStorage.getItem(options.reportStorageKey);
        if (!raw) return;
        var parsed = JSON.parse(raw);
        if (!parsed || !parsed.html) return;
        savedReportEntry = {
          storageKey: options.reportStorageKey,
          status: parsed.status === "draft" ? "draft" : "saved",
          savedAt: parsed.savedAt || "",
          html: parsed.html
        };
      } catch (_e) {}
    }
    function applySavedReportEntry(entry) {
      if (!entry || !entry.html) return;
      savedReportEntry = {
        storageKey: entry.storageKey || options.reportStorageKey,
        status: entry.status === "draft" ? "draft" : "saved",
        savedAt: entry.savedAt || new Date().toISOString(),
        html: entry.html
      };
      renderSavedReportTabs();
    }
    function renderSavedReportTabs() {
      if (!useDarkModal || !els.savedReportTabs) return;
      if (!savedReportEntry) {
        els.savedReportTabs.innerHTML = "";
        if (mainViewTab === "saved") switchMainViewTab("analysis");
        return;
      }
      var on = mainViewTab === "saved";
      els.savedReportTabs.innerHTML =
        '<button type="button" class="px-ai-inner-tab px-ai-inner-tab-report' + (on ? " on" : "") + '" data-tab="saved">' +
          esc(savedReportTabLabel(savedReportEntry.status)) +
        "</button>";
      var btn = els.savedReportTabs.querySelector("[data-tab=\"saved\"]");
      if (btn) {
        btn.addEventListener("click", function () {
          switchMainViewTab("saved");
        });
      }
    }
    function formatHistoryDayLabel(dayKey) {
      if (!dayKey) return "보고서";
      if (String(dayKey).indexOf("mock:") === 0) return String(dayKey).slice(5);
      try {
        var d = new Date(dayKey + "T00:00:00");
        if (Number.isNaN(d.getTime())) return dayKey;
        var wd = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
        return dayKey.replace(/-/g, ".") + " (" + wd + ")";
      } catch (_e) {
        return dayKey;
      }
    }
    function entryHistoryVariant(entry) {
      return resolvePixHistoryEntryVariant(entry, variant);
    }
    function annotateHistoryEntries(list, kind) {
      return (list || []).map(function (entry) {
        return Object.assign({}, entry, { historyVariant: kind });
      });
    }
    function sortHistoryEntries(entries) {
      return (entries || []).slice().sort(function (a, b) {
        if (a.hasData !== b.hasData) return a.hasData ? -1 : 1;
        return String(b.storageKey).localeCompare(String(a.storageKey));
      });
    }
    function loadReportHistoryEntries(filterKey) {
      var key = filterKey || historyFilter;
      if (typeof global.__pixAiReportArchiveLoadTabEntries !== "function") return [];
      if (key === "voc") return sortHistoryEntries(annotateHistoryEntries(global.__pixAiReportArchiveLoadTabEntries("voc"), "voc"));
      if (key === "survey") return sortHistoryEntries(annotateHistoryEntries(global.__pixAiReportArchiveLoadTabEntries("survey"), "survey"));
      return sortHistoryEntries(
        annotateHistoryEntries(global.__pixAiReportArchiveLoadTabEntries("voc"), "voc").concat(
          annotateHistoryEntries(global.__pixAiReportArchiveLoadTabEntries("survey"), "survey")
        )
      );
    }
    function getHistoryTabCfg(entry) {
      var tabKey = entry ? entryHistoryVariant(entry) : (historyFilter === "survey" ? "survey" : historyFilter === "voc" ? "voc" : variant);
      if (tabKey === "all") tabKey = variant;
      if (typeof global.__pixAiReportArchiveTabConfig === "function") {
        return global.__pixAiReportArchiveTabConfig(tabKey === "voc" ? "voc" : "survey");
      }
      return null;
    }
    function historyKindBadge(entry) {
      var kind = entryHistoryVariant(entry);
      if (kind === "voc") return '<span class="px-ai-history-item-kind">VOC</span>';
      if (kind === "survey") return '<span class="px-ai-history-item-kind survey">환자경험평가</span>';
      return "";
    }
    function groupHistoryEntriesByDate(entries) {
      var mockGroups = {};
      var dateGroups = {};
      (entries || []).forEach(function (entry) {
        if (entry.savedAt) {
          var day = String(entry.savedAt).slice(0, 10);
          if (!dateGroups[day]) dateGroups[day] = [];
          dateGroups[day].push(entry);
          return;
        }
        var periodKey = entry.analysisPeriod || entry.period || entry.title || entry.storageKey;
        if (!mockGroups[periodKey]) mockGroups[periodKey] = [];
        mockGroups[periodKey].push(entry);
      });
      var groups = Object.keys(mockGroups).sort(function (a, b) { return b.localeCompare(a); }).map(function (periodKey) {
        return {
          day: "mock:" + periodKey,
          items: mockGroups[periodKey].slice().sort(function (a, b) {
            return String(b.storageKey).localeCompare(String(a.storageKey));
          })
        };
      });
      Object.keys(dateGroups).sort(function (a, b) { return b.localeCompare(a); }).forEach(function (day) {
        groups.push({
          day: day,
          items: dateGroups[day].slice().sort(function (a, b) {
            return String(b.savedAt || b.storageKey).localeCompare(String(a.savedAt || a.storageKey));
          })
        });
      });
      return groups;
    }
    function historyStatusBadge(status, hasData) {
      if (!hasData) return '<span class="px-ai-history-item-badge empty">미작성</span>';
      if (status === "draft") return '<span class="px-ai-history-item-badge draft">임시저장</span>';
      return '<span class="px-ai-history-item-badge saved">저장됨</span>';
    }
    function dispatchHistorySelected(entry) {
      try {
        global.dispatchEvent(new CustomEvent("pix-report-history-selected", {
          detail: {
            panelVariant: variant,
            variant: entryHistoryVariant(entry),
            entry: entry
          }
        }));
      } catch (_e) {}
    }
    function closeHistoryReportModal() {
      try {
        global.dispatchEvent(new CustomEvent("pix-history-report-close", {
          detail: { panelVariant: variant }
        }));
      } catch (_e) {}
    }
    function openHistoryReportModal(entry) {
      if (!entry) return;
      try {
        global.dispatchEvent(new CustomEvent("pix-history-report-open", {
          detail: {
            panelVariant: variant,
            variant: entryHistoryVariant(entry),
            entry: entry
          }
        }));
      } catch (_e) {}
    }
    function dispatchHistoryCleared() {
      closeHistoryReportModal();
      try {
        global.dispatchEvent(new CustomEvent("pix-report-history-cleared", {
          detail: { panelVariant: variant }
        }));
      } catch (_e) {}
    }
    function renderHistoryFilterBar() {
      return '<div class="px-ai-history-filters">' +
        [
          { key: "all", label: "전체" },
          { key: "voc", label: "VOC" },
          { key: "survey", label: "환자경험평가" }
        ].map(function (item) {
          return '<button type="button" class="px-ai-history-filter' + (historyFilter === item.key ? " on" : "") +
            '" data-history-filter="' + item.key + '">' + item.label + "</button>";
        }).join("") +
      "</div>";
    }
    function renderHistoryList() {
      if (!els.historyPane) return;
      var entries = loadReportHistoryEntries();
      var groups = groupHistoryEntriesByDate(entries);
      if (!groups.length) {
        els.historyPane.innerHTML =
          renderHistoryFilterBar() +
          '<p class="px-ai-history-empty">등록된 보고서가 없습니다.<br>AI 분석 후 보고서를 저장하면 일자별로 이 목록에 표시됩니다.</p>';
        bindHistoryFilterClicks();
        return;
      }
      els.historyPane.innerHTML =
        renderHistoryFilterBar() +
        '<div class="px-ai-history-list">' +
          groups.map(function (group) {
            return '<section class="px-ai-history-group">' +
              '<p class="px-ai-history-day">' + esc(formatHistoryDayLabel(group.day)) + "</p>" +
              '<div class="px-ai-history-items">' +
                group.items.map(function (entry) {
                  var on = selectedHistoryEntry && selectedHistoryEntry.storageKey === entry.storageKey;
                  var time = entry.hasData && entry.savedAt
                    ? formatSavedReportTime(entry.savedAt).slice(11)
                    : (entry.hasData ? "-" : "미작성");
                  var meta = entry.hasData
                    ? esc(time) + " · " + esc(entry.analysisPeriod || entry.period || "-")
                    : esc(entry.year || "-") + " · " + esc(entry.analysisPeriod || entry.period || "-") + " · 등록일 -";
                  return '<div class="px-ai-history-item' + (on ? " on" : "") + '">' +
                    '<button type="button" class="px-ai-history-item-main" data-history-key="' + esc(entry.storageKey) + '">' +
                      '<p class="px-ai-history-item-title">' +
                        (historyFilter === "all" ? historyKindBadge(entry) : "") +
                        historyStatusBadge(entry.status, entry.hasData) +
                        esc(entry.title || entry.period) +
                      "</p>" +
                      '<p class="px-ai-history-item-meta">' + meta + "</p>" +
                    "</button>" +
                    '<div class="px-ai-history-item-actions">' +
                      '<button type="button" class="px-ai-history-dl-btn" data-history-dl="report" data-history-key="' + esc(entry.storageKey) + '"' +
                        (entry.hasData ? "" : " disabled") + ">보고서 ↓</button>" +
                      '<button type="button" class="px-ai-history-dl-btn" data-history-dl="stats" data-history-key="' + esc(entry.storageKey) + '">통계 ↓</button>' +
                      '<button type="button" class="px-ai-history-dl-btn" data-history-dl="analysis" data-history-key="' + esc(entry.storageKey) + '">분석 ↓</button>' +
                    "</div>" +
                  "</div>";
                }).join("") +
              "</div></section>";
          }).join("") +
        "</div>";
      bindHistoryFilterClicks();
      bindHistoryDownloadClicks();
      Array.prototype.forEach.call(els.historyPane.querySelectorAll(".px-ai-history-item-main[data-history-key]"), function (btn) {
        btn.addEventListener("click", function () {
          selectHistoryEntry(btn.getAttribute("data-history-key"));
        });
      });
    }
    function findHistoryEntryByKey(storageKey) {
      return loadReportHistoryEntries("all").filter(function (item) {
        return item.storageKey === storageKey;
      })[0] || null;
    }
    function bindHistoryDownloadClicks() {
      if (!els.historyPane) return;
      Array.prototype.forEach.call(els.historyPane.querySelectorAll("[data-history-dl]"), function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (btn.disabled) return;
          var key = btn.getAttribute("data-history-key");
          var kind = btn.getAttribute("data-history-dl");
          var entry = findHistoryEntryByKey(key);
          if (!entry) return;
          if (kind === "report") {
            if (typeof global.__pixDownloadHistoryReport === "function") {
              global.__pixDownloadHistoryReport(entry, options.showToast);
            }
            return;
          }
          if (typeof global.__pixDownloadHistorySnapshotPage === "function") {
            global.__pixDownloadHistorySnapshotPage(entry, kind, options.showToast);
          }
        });
      });
    }
    function bindHistoryFilterClicks() {
      if (!els.historyPane) return;
      Array.prototype.forEach.call(els.historyPane.querySelectorAll("[data-history-filter]"), function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          var next = btn.getAttribute("data-history-filter") || "all";
          if (next === historyFilter) return;
          historyFilter = next;
          selectedHistoryEntry = null;
          dispatchHistoryCleared();
          renderHistoryList();
        });
      });
    }
    function restoreLiveAnalysisPane() {
      if (!els.body || !useDarkModal) return;
      if (analysisPhase === "ready") {
        renderChipBasedAnalysis();
        if (els.reportDoc) renderReportPane();
        updateReportButton(true);
      } else if (analysisPhase === "strength") {
        renderStep2Strength();
        updateReportButton(false);
      } else if (analysisPhase === "loading") {
        var loadingText = variant === "voc"
          ? "VOC 데이터를 분석하고 있습니다…"
          : "환자경험평가 데이터를 분석하고 있습니다…";
        els.body.innerHTML = '<p class="px-ai-voc-loading">' + loadingText + "</p>";
        updateReportButton(false);
      }
    }
    function applyHistoryAnalysisToMainPane(entry) {
      if (!els.body || !entry) return;
      if (entry.analysisSnapshot && entry.analysisSnapshot.html) {
        els.body.innerHTML =
          '<iframe class="px-ai-history-detail-frame" style="min-height:420px;width:100%;border:0;border-radius:10px;background:#17171c" title="저장된 AI 분석"></iframe>';
        var frame = els.body.querySelector("iframe");
        if (frame && typeof global.__pixBuildArchiveSnapshotDoc === "function") {
          frame.srcdoc = global.__pixBuildArchiveSnapshotDoc(entry.analysisSnapshot, "analysis");
        }
        return;
      }
      var levelKey = (entry.analysisSnapshot && entry.analysisSnapshot.level) || "deep";
      var idx = LV_KEYS.indexOf(levelKey);
      if (idx >= 0) curLv = idx;
      global.__pxAiAnalysisLevel = LV_KEYS[curLv];
      analysisPhase = "ready";
      appliedAnalysisBlocks = blocksForLevel(LV_KEYS[curLv]);
      activeAnalysisBlocks = appliedAnalysisBlocks ? appliedAnalysisBlocks.slice() : null;
      renderChipBasedAnalysis();
      if (els.reportDoc) renderReportPane();
      updateReportButton(true);
    }
    function selectHistoryEntry(storageKey) {
      var entries = loadReportHistoryEntries("all");
      var entry = entries.filter(function (item) { return item.storageKey === storageKey; })[0];
      if (!entry) return;
      selectedHistoryEntry = entry;
      if (entry.hasData) {
        applySavedReportEntry({
          storageKey: entry.storageKey,
          status: entry.status,
          savedAt: entry.savedAt,
          html: entry.html
        });
      }
      if (els.period) {
        els.period.textContent = entry.analysisPeriod || entry.period || data.periodText || "";
      }
      dispatchHistorySelected(entry);
      applyHistoryAnalysisToMainPane(entry);
      openHistoryReportModal(entry);
      switchMainViewTab("analysis", { preserveHistorySelection: true });
    }
    function renderSavedReportPane() {
      if (!els.savedReportPane || !savedReportEntry) return;
      var statusLabel = savedReportEntry.status === "draft" ? "임시저장" : "저장됨";
      var when = formatSavedReportTime(savedReportEntry.savedAt);
      els.savedReportPane.innerHTML =
        '<div class="px-ai-saved-rpt-wrap">' +
          '<div class="px-ai-saved-rpt-meta">' + esc(statusLabel) + (when ? " · " + esc(when) : "") + "</div>" +
          '<iframe class="px-ai-saved-rpt-frame" title="저장된 보고서 미리보기" sandbox="allow-same-origin allow-scripts"></iframe>' +
        "</div>";
      var frame = els.savedReportPane.querySelector("iframe");
      if (frame) frame.srcdoc = sanitizeSavedReportHtml(savedReportEntry.html);
    }
    function switchMainViewTab(tab, tabOpts) {
      tabOpts = tabOpts || {};
      if (!useDarkModal) return;
      if (tab === "saved" && !savedReportEntry) tab = "analysis";
      mainViewTab = tab;
      if (els.historyBtn) els.historyBtn.classList.toggle("on", mainViewTab === "history");
      if (els.analysisTabBtn) {
        els.analysisTabBtn.classList.toggle("on", mainViewTab === "analysis");
        els.analysisTabBtn.style.display = mainViewTab === "history" ? "none" : "";
      }
      if (els.innerTabs && els.savedReportTabs) {
        els.savedReportTabs.style.display = mainViewTab === "history" ? "none" : "";
      }
      if (els.breadcrumb) {
        els.breadcrumb.style.display = mainViewTab === "history" ? "none" : "";
      }
      if (els.analysisPane) els.analysisPane.style.display = mainViewTab === "analysis" ? "" : "none";
      if (els.historyPane) {
        els.historyPane.style.display = mainViewTab === "history" ? "" : "none";
        if (mainViewTab === "history") renderHistoryList();
      }
      if (els.savedReportPane) {
        els.savedReportPane.style.display = mainViewTab === "saved" ? "" : "none";
        if (mainViewTab === "saved") renderSavedReportPane();
      }
      if (mainViewTab === "analysis") {
        if (selectedHistoryEntry && tabOpts.preserveHistorySelection) {
          // keep history-applied analysis in the main pane
        } else if (selectedHistoryEntry) {
          selectedHistoryEntry = null;
          dispatchHistoryCleared();
          restoreLiveAnalysisPane();
        } else {
          restoreLiveAnalysisPane();
        }
      }
      renderSavedReportTabs();
    }
    function onReportPersisted(ev) {
      if (disposed || !useDarkModal) return;
      var detail = ev && ev.detail;
      if (!detail || !detail.html) return;
      if (options.reportStorageKey && detail.storageKey !== options.reportStorageKey) return;
      applySavedReportEntry(detail);
      switchMainViewTab("saved");
    }
    function updateBreadcrumb() {
      if (!els.breadcrumb) return;
      els.breadcrumb.textContent = "AI 분석 후 보고서를 작성할 수 있습니다.";
    }
    function updateReportButton(show) {
      if (!els.reportBtn) return;
      els.reportBtn.style.display = show ? "" : "none";
    }
    function openExternalReportDrawer() {
      if (typeof options.onOpenReport === "function") {
        options.onOpenReport();
        return;
      }
      if (variant === "voc" && typeof window.openVocAiReportModal === "function") {
        window.openVocAiReportModal();
      } else if (variant === "survey" && typeof window.openPxSurveyAiReportModal === "function") {
        window.openPxSurveyAiReportModal();
      }
    }
    function syncInnerTabVisibility() {
      updateReportButton(analysisPhase === "ready");
    }
    function updateInnerTabs(show) {
      updateReportButton(show);
    }
    function renderStep2Strength() {
      if (!els.body || !useDarkModal) return;
      analysisPhase = "strength";
      updateBreadcrumb();
      updateInnerTabs(false);
      var meta = STRENGTH_META[variant] || STRENGTH_META.voc;
      var cards = LV_KEYS.map(function (key, i) {
        var on = i === curLv;
        return '<div class="px-ai-strength-card' + (on ? " on" : "") + '" data-strength="' + key + '">' +
          '<p class="px-ai-strength-title">' + esc(LV_NAMES[i]) + "</p>" +
          '<p class="px-ai-strength-desc">' + esc(meta.cards[key]) + "</p></div>";
      }).join("");
      els.body.innerHTML =
        '<p class="px-ai-rpt-blocks-lbl" style="margin-top:0;color:#9b99a8">분석 강도</p>' +
        '<p style="font-size:12px;color:#7a7887;margin:0 0 14px">' + esc(meta.subtitle) + "</p>" +
        '<div class="px-ai-strength-grid">' + cards + "</div>" +
        '<button type="button" class="px-ai-gen px-ai-gen-inline" data-role="request-analysis">분석 시작 ↗</button>';
    }
    function pickStrength(key) {
      var idx = LV_KEYS.indexOf(key);
      if (idx >= 0) curLv = idx;
      global.__pxAiAnalysisLevel = LV_KEYS[curLv];
      if (analysisPhase === "strength") renderStep2Strength();
      else if (analysisPhase === "ready") {
        appliedAnalysisBlocks = blocksForLevel(LV_KEYS[curLv]);
        renderChipBasedAnalysis();
        renderReportPane();
      }
    }
    function requestAnalysis() {
      if (disposed) return;
      appliedAnalysisBlocks = blocksForLevel(LV_KEYS[curLv]);
      removedReportBlocks = {};
      importedItems = {};
      analysisPhase = "loading";
      updateBreadcrumb();
      updateReportButton(false);
      switchToTab("analysis");
      var loadingText = variant === "voc"
        ? "VOC 데이터를 분석하고 있습니다…"
        : "환자경험평가 데이터를 분석하고 있습니다…";
      els.body.innerHTML = '<p class="px-ai-voc-loading">' + loadingText + "</p>";
      window.setTimeout(function () {
        if (disposed) return;
        analysisPhase = "ready";
        renderChipBasedAnalysis();
        renderReportPane();
        updateReportButton(true);
        switchToTab("analysis");
      }, 700);
    }
    function defaultReportBlocks() {
      var defs = data.reportDefaultBlocks || {};
      var lv = LV_KEYS[curLv];
      return (defs[lv] || defs.basic || ["overview", "kpi"]).slice();
    }
    function reportBlockChipsHtml(blocks) {
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      return (blocks || []).map(function (b) {
        var on = activeBlocks.indexOf(b.key) > -1;
        return '<span class="px-ai-rpt-chip' + (on ? " on" : "") + '" data-block-key="' + esc(b.key) + '">' +
          (on ? "✓ " : "") + esc(b.name) + "</span>";
      }).join("");
    }
    function appendSelectedReportBlocks(html, nRef, defs, blockContent) {
      var out = html;
      (defs || []).forEach(function (b) {
        if (activeBlocks.indexOf(b.key) > -1) {
          var c = blockContent[b.key];
          if (c) out += reportSection(b.key, nRef.n++ + ". " + c[0], c[1], c[2]);
        }
      });
      return out;
    }
    function reportStatTableHtml(rows) {
      return '<table class="px-ai-rpt-kpi-tbl">' + (rows || []).map(function (r) {
        return "<tr><td>" + esc(r[0]) + '</td><td>' + esc(r[1]) +
          (r[2] != null ? '</td><td style="text-align:right">' + esc(r[2]) : "") + "</td></tr>";
      }).join("") + "</table>";
    }
    function reportVocStatTrendHtml() {
      var rows = (data.vocMonthlyTrend || []).map(function (m) {
        return [m.month, "긍정 " + m.pos + " · 부정 " + m.neg];
      });
      return reportStatTableHtml(rows);
    }
    function reportVocStatChannelHtml() {
      var rows = (data.vocChannels || []).map(function (c) {
        return [c.name, c.count + " (" + c.pct + ")", c.delta];
      });
      return reportStatTableHtml(rows);
    }
    function reportVocStatPraiseHtml() {
      var deptRows = (data.vocPraiseDepts || []).map(function (d) {
        return ["부서 · " + d.name, d.count, d.delta];
      });
      var staffRows = (data.vocPraiseStaff || []).map(function (s) {
        return ["직원 · " + s.name, s.count, s.delta];
      });
      return reportStatTableHtml(deptRows.concat(staffRows));
    }
    function reportVocStatDemographicHtml() {
      return '<p style="font-size:12px;color:#cfcdda;margin:0 0 8px">성별: 남 50% · 여 50%</p>' +
        reportStatTableHtml([
          ["20대 미만", "8%"], ["30대", "18%"], ["40대", "24%"],
          ["50대", "22%"], ["60대", "16%"], ["70대 이상", "12%"]
        ]);
    }
    function reportVocStatCategoryHtml() {
      var pos = (data.positiveKeywords || []).slice(0, 5).map(function (k, i) {
        return [(i + 1) + ". " + k.name, k.delta];
      });
      var neg = (data.negativeKeywords || []).slice(0, 5).map(function (k, i) {
        return [(i + 1) + ". " + k.name, k.delta];
      });
      return '<p style="font-size:11px;font-weight:700;color:#7ea6ff;margin:0 0 6px">긍정 TOP5</p>' +
        reportStatTableHtml(pos) +
        '<p style="font-size:11px;font-weight:700;color:#f2949c;margin:14px 0 6px">부정 TOP5</p>' +
        reportStatTableHtml(neg);
    }
    function reportVocStatGroupHtml() {
      var wardRows = (data.wards || []).map(function (w) {
        return ["병동 · " + w.name, w.score, w.delta + " · " + w.st];
      });
      var deptRows = (data.depts || []).map(function (d) {
        return ["진료과 · " + d.name, d.score, d.delta + " · " + d.st];
      });
      return reportStatTableHtml(wardRows.concat(deptRows));
    }
    function reportSurveyStatOverviewHtml() {
      return reportSurveyKpiTableHtml();
    }
    function reportSurveyStatAreaHtml() {
      return reportAreaBarHtml() +
        reportStatTableHtml((data.areas || []).map(function (a) {
          return [a.name, a.score + (/\d$/.test(a.score) ? "점" : ""), a.delta + " · " + a.eval];
        }));
    }
    function reportSurveyStatOrgHtml() {
      var wardRows = (data.surveyOrgWards || []).map(function (w) {
        return ["병동 · " + w.name, w.score + "점", w.delta + "점"];
      });
      var deptRows = (data.surveyOrgDepts || []).map(function (d) {
        return ["진료과 · " + d.name, d.score + "점", d.delta + "점"];
      });
      return reportStatTableHtml(wardRows.concat(deptRows));
    }
    function reportSurveyStatPriorityHtml() {
      var areaRows = (data.priority || []).map(function (p, i) {
        return ["영역 " + (i + 1), p[0] + " " + p[1], p[2]];
      });
      var qRows = (data.low || []).slice(0, 3).map(function (t, i) {
        return ["문항 " + (i + 1), t.no + " " + t.name, t.delta];
      });
      return '<p style="font-size:11px;font-weight:700;color:#f2949c;margin:0 0 6px">저점 영역·문항</p>' +
        reportStatTableHtml(areaRows.concat(qRows));
    }
    function renderSurveyOverviewKpiHtml() {
      var metrics = data.metricChanges || [];
      var kpiStrip = metrics.length
        ? '<div class="px-ai-rpt-kpi-strip" style="grid-template-columns:repeat(' + Math.min(4, metrics.length) + ',1fr)">' +
          metrics.map(function (m) {
            return '<div class="px-ai-rpt-kpi-box"><div class="kl">' + esc(m.k) + '</div><div class="kv">' + esc(m.v) +
              '</div><div class="kd' + (m.tone === "good" ? " good" : m.tone === "bad" ? " bad" : "") + '">' + esc(m.d) + "</div></div>";
          }).join("") + "</div>"
        : "";
      var declining = (data.pxAreas || []).filter(function (a) { return a.change < 0; });
      var rising = (data.pxAreas || []).filter(function (a) { return a.change >= 0; }).sort(function (a, b) {
        return b.change - a.change;
      });
      var focusAreas = declining.concat(rising.slice(0, Math.max(0, 3 - declining.length))).slice(0, 3);
      var focusStrip = focusAreas.length
        ? '<div class="px-ai-rpt-kpi-strip" style="grid-template-columns:repeat(' + focusAreas.length + ',1fr);margin-top:8px">' +
          focusAreas.map(function (a) {
            var good = a.change >= 0;
            return '<div class="px-ai-rpt-kpi-box"><div class="kl">' + esc(a.name) + '</div><div class="kv">' +
              a.score.toFixed(2) + '점</div><div class="kd' + (good ? " good" : " bad") + '">' +
              (good ? "▲" : "▼") + Math.abs(a.change).toFixed(2) + "점</div></div>";
          }).join("") + "</div>"
        : "";
      return kpiStrip + focusStrip;
    }
    function renderSurveyStatusDetailHtml() {
      var areaTable = '<table class="px-ai-rpt-exec-tbl"><thead><tr><th>영역</th><th>점수</th><th>전월 대비</th></tr></thead><tbody>' +
        (data.pxAreas || []).map(function (a) {
          var tone = a.change >= 0 ? "good" : "bad";
          var sign = a.change >= 0 ? "▲" : "▼";
          return '<tr><td class="rowlabel">' + esc(a.name) + "</td><td>" + a.score.toFixed(2) +
            '점</td><td class="' + tone + '">' + sign + Math.abs(a.change).toFixed(2) + "점</td></tr>";
        }).join("") + "</tbody></table>";
      return areaTable +
        '<div class="px-ai-rpt-chart-block" style="margin-top:12px"><p class="px-ai-rpt-chart-title">영역별 점수 현황</p>' +
        reportAreaBarHtml() + "</div>" +
        '<p class="px-ai-rpt-chart-title" style="margin-top:14px">병동 · 진료과별 점수</p>' +
        reportSurveyStatOrgHtml();
    }
    function renderSurveyStatBriefingHtml() {
      return renderSurveyOverviewKpiHtml() + renderSurveyStatusDetailHtml();
    }
    function renderSurveyImprovementHtml() {
      var pos = (data.positiveIssueActions || []).slice(0, 3);
      var neg = (data.negativeIssueActions || []).slice(0, 5);
      var issueHtml = (pos.length || neg.length)
        ? renderIssueActionMatrix(pos, neg, { variant: "survey" })
        : "";
      return issueHtml + reportActionPlanHtml();
    }
    function getReportBuilderSections() {
      if (data.reportBuilderSections) return data.reportBuilderSections;
      if (variant === "survey") {
        return [
          { key: "overview", title: "개요", desc: "보고 목적 · 핵심 요약", aiBlock: "overview", statBlock: null, defaultAi: true, defaultStat: false },
          { key: "status", title: "현황", desc: "통계 기반 전체 현황", aiBlock: "status", statBlock: "statBrief", defaultAi: true, defaultStat: true },
          { key: "grade", title: "등급 분석", desc: "5등급 · 백분위 · 2등급 격차", aiBlock: "grade", statBlock: null, defaultAi: true, defaultStat: false },
          { key: "beds", title: "병상수별 분석", desc: "규모별 그룹 비교", aiBlock: "beds", statBlock: null, defaultAi: true, defaultStat: false },
          { key: "gap", title: "영역별 격차", desc: "전체·3등급 평균 대비", aiBlock: "gap", statBlock: null, defaultAi: true, defaultStat: false },
          { key: "matrix", title: "영역 진단 매트릭스", desc: "75점 기준 4분면 진단", aiBlock: "matrix", statBlock: null, defaultAi: true, defaultStat: false },
          { key: "gradePriority", title: "2등급 진입 우선순위", desc: "영역·문항별 격차", aiBlock: "gradePriority", statBlock: "stat_priority", defaultAi: true, defaultStat: false },
          { key: "improvement", title: "개선 과제 및 권고", desc: "우선순위 · 실행 일정", aiBlock: "improvement", statBlock: null, defaultAi: true, defaultStat: false }
        ];
      }
      return [
        { key: "overview", title: "종합 AI 요약", desc: "결론 · 원인 · 영향 범위 · 권고", aiBlock: "overview", statBlock: null, defaultAi: true, defaultStat: false },
        { key: "kpi", title: "핵심 지표", desc: "접수 · 부정률 · 칭찬 현황", aiBlock: "kpi", statBlock: "stat_overview", defaultAi: true, defaultStat: true },
        { key: "dist", title: "유형별 분포", desc: "8개 유형 긍·부정 비율", aiBlock: "dist", statBlock: "stat_type", defaultAi: true, defaultStat: true },
        { key: "matrix", title: "유형 진단 매트릭스", desc: "부정률 50% 기준 4분면", aiBlock: "matrix", statBlock: null, defaultAi: true, defaultStat: false },
        { key: "keywords", title: "변화 키워드 TOP3", desc: "긍·부정 키워드 변화", aiBlock: "keywords", statBlock: "stat_category", defaultAi: true, defaultStat: false },
        { key: "issues", title: "주요 이슈 및 권장 조치", desc: "심각도 · 우선순위 매칭", aiBlock: "issues", statBlock: "stat_group", defaultAi: true, defaultStat: true },
        { key: "plan", title: "개선 액션 플랜", desc: "우선순위별 실행 과제", aiBlock: "plan", statBlock: null, defaultAi: false, defaultStat: false },
        { key: "monitor", title: "모니터링", desc: "고심각도 이슈 추적", aiBlock: "monitor", statBlock: null, defaultAi: true, defaultStat: false }
      ];
    }
    function defaultReportSectionSel() {
      var sel = {};
      getReportBuilderSections().forEach(function (s) {
        sel[s.key] = { ai: !!s.defaultAi, stat: !!s.defaultStat };
      });
      return sel;
    }
    function syncActiveBlocksFromSelection() {
      var blocks = [];
      var seen = {};
      getReportBuilderSections().forEach(function (s) {
        var st = (reportSectionSel || {})[s.key] || {};
        if (st.ai && s.aiBlock && s.aiBlock !== "area" && !seen[s.aiBlock]) {
          blocks.push(s.aiBlock);
          seen[s.aiBlock] = true;
        }
        if (st.stat && s.statBlock && !seen[s.statBlock]) {
          blocks.push(s.statBlock);
          seen[s.statBlock] = true;
        }
      });
      if (variant === "voc" && blocks.indexOf("overview") === -1) blocks.unshift("overview");
      activeBlocks = blocks.length ? blocks : defaultReportBlocks();
    }
    function renderStructuredSummaryHtml() {
      var s = data.summaryStructured || {};
      var labels = { conclusion: "결론", cause: "원인", impact: "영향 범위", recommendation: "권고" };
      return '<div class="px-ai-rpt-preview-sum">' +
        '<p class="px-ai-rpt-preview-sum-hd">AI 요약</p>' +
        ["conclusion", "cause", "impact", "recommendation"].map(function (k) {
          return '<div class="px-ai-rpt-sum-part"><p class="px-ai-rpt-sum-k">' + labels[k] +
            '</p><p class="px-ai-rpt-sum-v">' + esc(s[k] || "") + "</p></div>";
        }).join("") +
        "</div>";
    }
    function renderAreaPreviewBlock(section, mode) {
      var a = section.area;
      if (!a) return "";
      var up = a.change >= 0;
      var deltaCls = up ? "good" : "bad";
      var sign = up ? "▲" : "▼";
      var barColor = up ? "#4ade80" : "#f87171";
      var posText = up
        ? a.name + " 영역이 " + a.score.toFixed(2) + "점으로 전월 대비 +" + Math.abs(a.change).toFixed(2) + "점 상승했습니다. " + a.org + " 협업 성과가 두드러집니다."
        : "";
      var negText = !up
        ? a.name + " 영역이 " + a.score.toFixed(2) + "점으로 전월 대비 -" + Math.abs(a.change).toFixed(2) + "점 하락했습니다. " + a.org + " 중심 원인 분석이 필요합니다."
        : "";
      var body = mode === "stat"
        ? '<div class="px-ai-area-bar-row"><div class="px-ai-area-bar-meta"><span>' + esc(a.name) +
          "</span><span>" + a.score.toFixed(2) + "점 " + sign + Math.abs(a.change).toFixed(2) + "</span></div>" +
          '<div class="px-ai-area-bar-track"><div class="px-ai-area-bar-fill" style="width:' + a.score +
          "%;background:" + barColor + '"></div></div></div>'
        : '<div class="px-ai-rpt-sw-grid">' +
          (posText ? '<div class="px-ai-rpt-sw pos"><p class="px-ai-rpt-sw-k pos">강점</p>' + esc(posText) + "</div>" : "") +
          (negText ? '<div class="px-ai-rpt-sw neg"><p class="px-ai-rpt-sw-k neg">약점</p>' + esc(negText) + "</div>" : "") +
          "</div>";
      return '<div class="px-ai-rpt-preview-block">' +
        '<div class="px-ai-rpt-preview-block-hd"><p class="px-ai-rpt-preview-block-ttl">' + esc(section.title) +
        '</p><span class="px-ai-rpt-preview-block-tag ' + (mode === "stat" ? "stat" : "ai") + '">' +
        (mode === "stat" ? "통계" : "AI 상세분석") + "</span></div>" + body + "</div>";
    }
    function renderSectionPreviewBlock(section, mode) {
      if (section.area) return renderAreaPreviewBlock(section, mode);
      var tag = mode === "stat" ? "stat" : "ai";
      var drafts = data.reportDrafts || {};
      var statsDrafts = data.reportStatsDrafts || {};
      var aiEmbed = {
        overview: variant === "survey" ? renderSurveyOverviewKpiHtml() : "",
        status: variant === "survey" ? renderSurveyStatusDetailHtml() : "",
        statBrief: variant === "survey" ? renderSurveyStatBriefingHtml() : "",
        grade: variant === "survey" ? renderSurveyGradeAnalysis() : "",
        beds: variant === "survey" ? renderSurveyBedAnalysis() : "",
        gap: variant === "survey" ? renderSurveyAreaGapAnalysis() : "",
        gradePriority: variant === "survey" ? renderSurveyGradePriority() : "",
        improvement: variant === "survey" ? renderSurveyImprovementHtml() : "",
        kpi: reportSurveyKpiTableHtml(),
        dist: reportTypeDistHtml(),
        matrix: variant === "voc" ? renderCategoryMatrix() : renderSurveyAreaMatrix(),
        keywords: renderKeywordTop(),
        areas: renderSurveyTopAreas(),
        issues: reportIssuesEmbedHtml(),
        plan: reportActionPlanHtml(),
        monitor: renderMonitorCard()
      };
      var statEmbed = {
        stat_overview: reportKpiTableHtml(),
        stat_type: reportTypeDistHtml(),
        stat_area: reportAreaBarHtml(),
        stat_org: reportSurveyStatOrgHtml(),
        stat_priority: reportSurveyStatPriorityHtml(),
        stat_category: reportVocStatCategoryHtml(),
        stat_group: reportVocStatGroupHtml()
      };
      var blockKey = mode === "stat" ? section.statBlock : section.aiBlock;
      if (!blockKey) return "";
      var text = mode === "stat" ? (statsDrafts[blockKey] || "") : (drafts[blockKey] || overviewReportText());
      if (blockKey === "overview") text = overviewReportText();
      var embed = mode === "stat" ? (statEmbed[blockKey] || "") : (aiEmbed[blockKey] || "");
      if (variant === "survey" && blockKey === "kpi" && mode === "ai") embed = reportSurveyKpiTableHtml();
      return '<div class="px-ai-rpt-preview-block">' +
        '<div class="px-ai-rpt-preview-block-hd"><p class="px-ai-rpt-preview-block-ttl">' + esc(section.title) +
        '</p><span class="px-ai-rpt-preview-block-tag ' + tag + '">' + (mode === "stat" ? "통계" : "AI 상세분석") + "</span></div>" +
        '<p class="px-ai-rpt-sum-v" style="margin:0 0 8px">' + esc(text) + "</p>" + embed + "</div>";
    }
    function renderReportPreview() {
      if (!els.reportRight) return;
      if (analysisPhase !== "ready") {
        els.reportRight.innerHTML = '<p style="font-size:12px;color:#7a7887;padding:40px 0;text-align:center">AI 분석 결과를 먼저 생성해 주세요.</p>';
        return;
      }
      var html = '<div class="px-ai-rpt-preview-head">' +
        '<p class="px-ai-rpt-preview-title">AI Insight Report</p>' +
        '<span class="px-ai-level-tag">' + esc(LV_NAMES[curLv]) + "</span></div>" +
        renderStructuredSummaryHtml();
      var hasKpi = false;
      getReportBuilderSections().forEach(function (s) {
        var st = (reportSectionSel || {})[s.key] || {};
        if (st.ai && s.key === "kpi") hasKpi = true;
        if (st.stat && s.key === "kpi") hasKpi = true;
      });
      if (hasKpi) html += '<div style="margin-bottom:12px">' + renderMetricChanges() + "</div>";
      getReportBuilderSections().forEach(function (s) {
        var st = (reportSectionSel || {})[s.key] || {};
        if (s.key === "overview") return;
        if (st.ai) html += renderSectionPreviewBlock(s, "ai");
        if (st.stat) html += renderSectionPreviewBlock(s, "stat");
      });
      if (html.indexOf("px-ai-rpt-preview-block") === -1 && html.indexOf("px-ai-metric") === -1) {
        html += '<p style="font-size:12px;color:#7a7887;padding:20px 0;text-align:center">좌측에서 AI 상세분석 또는 통계를 선택하면 미리보기가 표시됩니다.</p>';
      }
      els.reportRight.innerHTML = html;
    }
    function getReportDocumentStructure() {
      if (variant === "survey") {
        return [
          { num: 1, title: "개요", importSection: "개요", blocks: [{ key: "overview", label: "" }] },
          { num: 2, title: "현황", importSection: "현황", blocks: [{ key: "status", label: "" }] },
          { num: 3, title: "분석", importSection: "분석", blocks: [
            { key: "grade", label: "등급 분석" },
            { key: "beds", label: "병상수별 분석" },
            { key: "gap", label: "영역별 격차" },
            { key: "matrix", label: "영역 진단 매트릭스" },
            { key: "gradePriority", label: "2등급 진입 우선순위" },
            { key: "improvement", label: "개선 과제 및 권고" }
          ]}
        ];
      }
      return [
        { num: 1, title: "개요", importSection: "개요", blocks: [{ key: "overview", label: "" }] },
        { num: 2, title: "현황", importSection: "현황", blocks: [{ key: "status", label: "" }] },
        { num: 3, title: "분석", importSection: "분석", blocks: [
          { key: "analysisOrg", label: "조직별 분석" },
          { key: "matrix", label: "유형 진단 매트릭스" },
          { key: "keywords", label: "변화 키워드 TOP3" },
          { key: "issues", label: "주요 이슈 및 권장 조치" },
          { key: "plan", label: "개선 액션 플랜" },
          { key: "monitor", label: "모니터링" }
        ]}
      ];
    }
    function getReportBlockDraft(key) {
      var drafts = data.reportDrafts || {};
      if (key === "overview") {
        return drafts.overview || overviewReportText();
      }
      if (key === "conclusion") {
        var s = data.summaryStructured || {};
        return [
          "결론: " + (s.conclusion || ""),
          "원인: " + (s.cause || ""),
          "영향 범위: " + (s.impact || ""),
          "권고: " + (s.recommendation || "")
        ].join("\n\n");
      }
      if (key === "analysis") {
        var bullets = data.reportAnalysisBullets || [];
        if (bullets.length) return bullets.map(function (b) { return "• " + b; }).join("\n");
        return drafts.analysis || "";
      }
      if (key === "recommendation") {
        return data.reportExecRecommendation || drafts.recommendation || "";
      }
      if (key === "status") {
        if (variant === "survey") return drafts.status || drafts.statBrief || "";
        return drafts.status || drafts.statusNarrative || "";
      }
      if (key === "analysisOrg") {
        return drafts.analysisOrg || reportDocData().analysisIntro || "";
      }
      if (key === "issuesEval") {
        if (drafts.issuesEval) return drafts.issuesEval;
        var docIssues = reportDocData();
        return [docIssues.quotesIntro, docIssues.risksIntro].filter(Boolean).join("\n\n");
      }
      if (key === "conclusionOpts") {
        if (drafts.conclusionOpts) return drafts.conclusionOpts;
        var recHtml = reportDocData().recommendationHtml || "";
        return recHtml.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || drafts.recommendation || "";
      }
      if (key === "monitorPlan") {
        var planBullets = data.reportMonitorBullets || [];
        if (planBullets.length) return planBullets.map(function (b) { return "• " + b; }).join("\n");
        if (drafts.monitorPlan) return drafts.monitorPlan;
        var monRows = reportDocData().monitorRows || [];
        if (monRows.length) {
          return monRows.map(function (r) { return "• " + r.week + ": " + r.content; }).join("\n");
        }
        return drafts.monitor || "";
      }
      if (key === "monitor" && !drafts.monitor) {
        return (data.detailMonitors || []).map(monitorItemPlainText).join("\n\n");
      }
      return drafts[key] || "";
    }
    function reportDocData() {
      return data.reportDoc || {};
    }
    function renderReportBarRows(rows, colorKey) {
      var max = Math.max.apply(null, rows.map(function (r) { return r.cnt; }));
      return rows.map(function (r) {
        var pct = max ? (r.cnt / max * 100).toFixed(1) : 0;
        var color = r[colorKey] || "#8fb4e0";
        return '<div class="px-ai-rpt-bar-row">' +
          '<div class="px-ai-rpt-bar-name">' + esc(r.name) + "</div>" +
          '<div class="px-ai-rpt-bar-track"><div class="px-ai-rpt-bar-fill" style="width:' + pct + "%;background:" + color + '"></div></div>' +
          '<div class="px-ai-rpt-bar-val">' + r.cnt.toLocaleString() + "건" + (r.pct != null ? " (" + r.pct + "%)" : "") + "</div></div>";
      }).join("");
    }
    function renderReportTrendChart(trend) {
      if (!trend || !trend.length) return "";
      var max = Math.max.apply(null, trend.map(function (t) {
        return Math.max(Number(String(t.pos).replace(/,/g, "")), Number(String(t.neg).replace(/,/g, "")));
      }));
      return '<div style="display:grid;grid-template-columns:repeat(' + trend.length + ',1fr);gap:6px;align-items:end;height:100px;margin-top:4px">' +
        trend.map(function (t) {
          var pos = Number(String(t.pos).replace(/,/g, ""));
          var neg = Number(String(t.neg).replace(/,/g, ""));
          var ph = max ? Math.round(pos / max * 88) : 0;
          var nh = max ? Math.round(neg / max * 88) : 0;
          return '<div style="text-align:center;font-size:9px;color:#9b99a8">' +
            '<div style="display:flex;gap:2px;align-items:flex-end;justify-content:center;height:88px;margin-bottom:4px">' +
            '<div style="width:10px;height:' + ph + 'px;background:#1baf7a;border-radius:2px 2px 0 0"></div>' +
            '<div style="width:10px;height:' + nh + 'px;background:#e24b4a;border-radius:2px 2px 0 0"></div></div>' +
            esc(t.month) + "</div>";
        }).join("") + "</div>";
    }
    function renderDocInfoTableHtml() {
      var info = (data.reportMeta || {}).docInfo;
      if (!info) return "";
      return '<table class="px-ai-rpt-doc-info"><tr>' +
        '<td class="lbl">작성자</td><td>' + esc(info.author || "") + '</td>' +
        '<td class="lbl">작성일</td><td style="border-right:none">' + esc(info.date) + "</td></tr><tr>" +
        '<td class="lbl">분석 기간</td><td>' + esc(info.period || "") + '</td>' +
        '<td class="lbl">분석대상</td><td style="border-right:none">' + esc(info.subject) + "</td></tr></table>";
    }
    function renderOverviewSectionHtml() {
      return '<div class="px-ai-rpt-kpi-strip">' + (data.stats || []).map(function (s) {
        var good = s.k === "부서칭찬" || s.k === "직원칭찬";
        return '<div class="px-ai-rpt-kpi-box"><div class="kl">' + esc(s.k) + '</div><div class="kv"' +
          (good ? ' style="color:#7ea6ff"' : "") + ">" + esc(s.v) + '</div><div class="kd' +
          (good ? " good" : "") + '">' + esc(s.d) + "</div></div>";
      }).join("") + "</div>";
    }
    function renderStatusSectionHtml() {
      var doc = reportDocData();
      var typeRows = doc.typeRows || [];
      var table = '<table class="px-ai-rpt-exec-tbl"><thead><tr>' +
        ["유형", "건수", "비중", "전월대비 부정률"].map(function (h) { return "<th>" + h + "</th>"; }).join("") +
        "</tr></thead><tbody>" + typeRows.map(function (r) {
          return '<tr><td class="rowlabel">' + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) +
            '</td><td class="' + esc(r[4] || "neu") + '">' + esc(r[3]) + "</td></tr>";
        }).join("") + "</tbody></table>";
      var kwBlock = '<div class="px-ai-rpt-chart-block"><p class="px-ai-rpt-chart-title">가장 많이 언급된 키워드 TOP5 (전체 카테고리 합산)</p>' +
        '<div class="px-ai-rpt-kw-grid"><div><p class="px-ai-rpt-kw-hd pos">긍정 키워드</p>' +
        (doc.kwPos || []).map(function (r) {
          var max = Math.max.apply(null, (doc.kwPos || []).map(function (x) { return x.cnt; }));
          var pct = max ? (r.cnt / max * 100).toFixed(1) : 0;
          return '<div class="px-ai-rpt-bar-row"><div class="px-ai-rpt-bar-name">' + esc(r.name) +
            '</div><div class="px-ai-rpt-bar-track"><div class="px-ai-rpt-bar-fill" style="width:' + pct +
            '%;background:#0C447C"></div></div><div class="px-ai-rpt-bar-val">' + r.cnt + "건</div></div>";
        }).join("") +
        '</div><div><p class="px-ai-rpt-kw-hd neg">부정 키워드</p>' +
        (doc.kwNeg || []).map(function (r) {
          var max = Math.max.apply(null, (doc.kwNeg || []).map(function (x) { return x.cnt; }));
          var pct = max ? (r.cnt / max * 100).toFixed(1) : 0;
          return '<div class="px-ai-rpt-bar-row"><div class="px-ai-rpt-bar-name">' + esc(r.name) +
            '</div><div class="px-ai-rpt-bar-track"><div class="px-ai-rpt-bar-fill" style="width:' + pct +
            '%;background:#791F1F"></div></div><div class="px-ai-rpt-bar-val">' + r.cnt + "건</div></div>";
        }).join("") + "</div></div>" +
        (doc.kwCaption ? '<p class="px-ai-rpt-cap" style="margin-top:10px">' + esc(doc.kwCaption) + "</p>" : "") + "</div>";
      var chBlock = '<div class="px-ai-rpt-chart-block"><p class="px-ai-rpt-chart-title">채널별 접수 현황 (총 ' +
        esc(doc.channelTotal || "") + ")</p>" + renderReportBarRows(doc.channels || [], "color") + "</div>";
      var trendBlock = '<div class="px-ai-rpt-chart-block"><p class="px-ai-rpt-chart-title">월별 긍·부정 언급 추이 (1~6월)</p>' +
        renderReportTrendChart(data.vocMonthlyTrend || []) +
        '<div class="px-ai-rpt-trend-legend"><span><span class="px-ai-rpt-trend-dot" style="background:#1baf7a"></span>긍정</span>' +
        '<span><span class="px-ai-rpt-trend-dot" style="background:#e24b4a"></span>부정</span></div></div>';
      return table + (doc.typeCaption ? '<p class="px-ai-rpt-cap">' + esc(doc.typeCaption) + "</p>" : "") + kwBlock + chBlock + trendBlock;
    }
    function renderOrgTableSimple(headers, rows) {
      return '<table class="px-ai-rpt-exec-tbl" style="margin-bottom:12px"><thead><tr>' +
        headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        rows.map(function (r) {
          var tone = r[r.length - 1];
          var change = r[r.length - 2];
          var cells = r.slice(0, -2);
          return "<tr>" + cells.map(function (cell, i) {
            return '<td' + (i === 0 ? ' class="rowlabel"' : "") + ">" + esc(cell) + "</td>";
          }).join("") + '<td class="' + esc(tone) + '">' + esc(change) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function renderAnalysisOrgSectionHtml() {
      var doc = reportDocData();
      return renderOrgTableSimple(["병동", "부정 비율", "부정률 변화"], doc.wardRows || []) +
        renderOrgTableSimple(["진료과", "부정 건수", "부정률 변화"], doc.deptRows || []) +
        renderOrgTableSimple(["의사", "진료과", "부정 건수", "부정률 변화"], doc.doctorRows || []) +
        (doc.orgCaption ? '<p class="px-ai-rpt-cap">' + esc(doc.orgCaption) + "</p>" : "");
    }
    function renderIssuesEvalSectionHtml() {
      var doc = reportDocData();
      var flags = (doc.flags || []).map(function (f) {
        return '<div class="px-ai-rpt-flag-card"><span class="px-ai-rpt-flag-tag' +
          (f.cls ? " " + f.cls : "") + '">' + esc(f.tag) + '</span><div class="px-ai-rpt-flag-body"><span class="px-ai-rpt-flag-cnt">' +
          esc(f.cnt) + "</span> (전월 대비 " + esc(f.delta) + ")" + esc(f.desc) + "</div></div>";
      }).join("");
      var quotes = (doc.quotes || []).map(function (q) {
          return '<div class="px-ai-rpt-quote-box">"' + esc(q.text) + '" <span class="px-ai-rpt-quote-meta">' + esc(q.meta) + "</span></div>";
        }).join("");
      var risks = (doc.risks || []).map(function (r) {
          return '<div class="px-ai-rpt-risk-badge-row"><div class="px-ai-rpt-risk-badge ' + esc(r.cls) + '">' +
            esc(r.badge) + '</div><div class="px-ai-rpt-body-intro" style="margin:0;padding-top:4px">' + esc(r.desc) + "</div></div>";
        }).join("");
      return flags + quotes + risks;
    }
    function renderConclusionSectionHtml() {
      var doc = reportDocData();
      var rows = doc.optionRows || [];
      var table = '<table class="px-ai-rpt-exec-tbl"><thead><tr>' +
        ["옵션", "내용", "소요기간", "우선순위"].map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
        "</tr></thead><tbody>" + rows.map(function (r) {
          return "<tr><td class=\"rowlabel\">" + esc(r.id) + '</td><td style="text-align:left">' + esc(r.content) +
            (r.recommend ? '<span class="px-ai-rpt-opt-rec">권고</span>' : "") + "</td><td>" + esc(r.duration) +
            '</td><td' + (r.priorityCls ? ' class="' + r.priorityCls + '"' : "") + ">" + esc(r.priority) + "</td></tr>";
        }).join("") + "</tbody></table>";
      return table;
    }
    function renderMonitorTableHtml() {
      var doc = reportDocData();
      var rows = doc.monitorRows || [];
      return '<table class="px-ai-rpt-exec-tbl"><thead><tr><th style="width:110px">시기</th><th>내용</th></tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td class="px-ai-rpt-tl-week">' + esc(r.week) + '</td><td style="text-align:left">' + esc(r.content) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    function reportFeaturedQuotesHtml() {
      var quotes = data.reportFeaturedQuotes || [];
      return quotes.map(function (q) {
        return '<p class="px-ai-rpt-feature-quote">“' + esc(q) + "”</p>";
      }).join("");
    }
    function reportRiskScenariosHtml() {
      return (data.reportRiskScenarios || []).map(function (r) {
        return '<div class="px-ai-rpt-risk-row"><span class="px-ai-rpt-risk-k ' + esc(r.tone || "neu") + '">' +
          esc(r.label) + "  </span>" + esc(r.text) + "</div>";
      }).join("");
    }
    function reportOptionsHtml() {
      return (data.reportOptions || []).map(function (o) {
        return '<div class="px-ai-rpt-opt-block">' +
          '<p class="px-ai-rpt-opt-title"><span>옵션 ' + esc(o.id) + "</span>" + esc(o.title) + "</p>" +
          '<p class="px-ai-rpt-opt-desc">' + esc(o.desc) + "</p></div>";
      }).join("");
    }
    function getReportBlockEmbed(key) {
      switch (key) {
        case "statBrief": return variant === "survey" ? renderSurveyStatBriefingHtml() : "";
        case "grade": return variant === "survey" ? renderSurveyGradeAnalysis() : "";
        case "beds": return variant === "survey" ? renderSurveyBedAnalysis() : "";
        case "gap": return variant === "survey" ? renderSurveyAreaGapAnalysis() : "";
        case "gradePriority": return variant === "survey" ? renderSurveyGradePriority() : "";
        case "improvement": return variant === "survey" ? renderSurveyImprovementHtml() : "";
        case "overview":
          if (variant === "survey") return renderSurveyOverviewKpiHtml();
          if (variant === "voc" && data.reportDoc) return renderOverviewSectionHtml();
          return "";
        case "status":
          if (variant === "survey") return renderSurveyStatusDetailHtml();
          return variant === "voc" ? renderStatusSectionHtml() : "";
        case "analysisOrg": return variant === "voc" ? renderAnalysisOrgSectionHtml() : "";
        case "issuesEval": return variant === "voc" ? renderIssuesEvalSectionHtml() : "";
        case "conclusionOpts": return variant === "voc" ? renderConclusionSectionHtml() : "";
        case "monitorPlan": return variant === "voc" ? renderMonitorTableHtml() : "";
        case "kpi": return variant === "survey" ? reportSurveyKpiTableHtml() : reportKpiTableHtml();
        case "dist": return variant === "survey" ? reportAreaBarHtml() : reportTypeDistHtml();
        case "matrix": return variant === "voc" ? renderCategoryMatrix() : renderSurveyAreaMatrix();
        case "keywords": return renderKeywordTop();
        case "quotes": return variant === "voc" && data.reportFeaturedQuotes ? reportFeaturedQuotesHtml() : reportQuoteListHtml();
        case "issues": return reportIssuesEmbedHtml(false);
        case "plan": return reportActionPlanHtml();
        case "monitor": return renderMonitorCard();
        case "areas": return renderSurveyTopAreas();
        case "analysis":
          return variant === "voc" && (data.reportAnalysisBullets || []).length
            ? '<ul class="px-ai-rpt-bullet-list">' + (data.reportAnalysisBullets || []).map(function (b) {
              return "<li>" + esc(b) + "</li>";
            }).join("") + "</ul>"
            : "";
        case "riskScenarios": return reportRiskScenariosHtml();
        case "options": return reportOptionsHtml();
        case "recommendation":
          return variant === "voc" && data.reportExecRecommendation
            ? '<div class="px-ai-rpt-rec-box">' + esc(data.reportExecRecommendation) + "</div>"
            : "";
        case "conclusion": return "";
        case "statusNarrative": return "";
        default: return "";
      }
    }
    function renderReportSubBlock(key, label) {
      if (removedReportBlocks[key]) return "";
      var draftText = getReportBlockDraft(key);
      var embed = getReportBlockEmbed(key);
      var draft = draftText ? esc(draftText).replace(/\n/g, "<br>") : "";
      var titlePart = label ? '<p class="px-ai-rpt-sec-ttl">' + esc(label) + "</p>" : "";
      var head = '<div class="px-ai-rpt-sec-hd"' + (label ? "" : ' style="justify-content:flex-end"') + ">" +
        titlePart +
        '<button type="button" class="px-ai-rpt-remove" data-remove-block="' + esc(key) + '">✕ 빼기</button></div>' +
        (draft ? '<span class="px-ai-rpt-draft-tag">✎ 초안 · 클릭해서 수정</span>' : "");
      return '<div class="px-ai-rpt-sec" data-rpt-block="' + esc(key) + '">' + head +
        (embed || "") +
        (draft ? '<div contenteditable="true" class="px-ai-editable-block">' + draft + "</div>" : "") +
        "</div>";
    }
    function bindReportDocActions() {
      if (!els.reportDoc) return;
      Array.prototype.forEach.call(els.reportDoc.querySelectorAll("[data-remove-block]"), function (btn) {
        btn.onclick = function () { removeReportSubBlock(btn.getAttribute("data-remove-block")); };
      });
      Array.prototype.forEach.call(els.reportDoc.querySelectorAll("[data-open-import]"), function (btn) {
        btn.onclick = function () { openImportPicker(btn.getAttribute("data-open-import")); };
      });
      Array.prototype.forEach.call(els.reportDoc.querySelectorAll("[data-remove-import]"), function (btn) {
        btn.onclick = function () {
          removeImportedItem(btn.getAttribute("data-import-section"), Number(btn.getAttribute("data-import-idx")));
        };
      });
      bindReportFmtButtons(els.reportDoc);
    }
    function renderFullReportDocument() {
      if (!els.reportDoc) return;
      if (analysisPhase !== "ready") {
        els.reportDoc.innerHTML = '<p style="font-size:12px;color:#7a7887;padding:40px 0;text-align:center">AI 분석 결과를 먼저 생성해 주세요.</p>';
        return;
      }
      var body = getReportDocumentStructure().map(function (sec) {
        var blocks = sec.blocks.map(function (b) {
          return renderReportSubBlock(b.key, b.label);
        }).join("");
        var imports = (importedItems[sec.importSection] || []).map(function (item, idx) {
          return '<div class="px-ai-import-item">' +
            '<span style="font-size:12px;color:#c7a6f2">📎 ' + esc(item.src) + " · " + esc(item.name) + "</span>" +
            '<button type="button" class="px-ai-rpt-remove" data-import-section="' + esc(sec.importSection) +
            '" data-import-idx="' + idx + '">✕ 빼기</button></div>';
        }).join("");
        if (!blocks && !imports) return "";
        return '<div class="px-ai-rpt-doc-section">' +
          '<div class="px-ai-rpt-section-hd">' +
          '<p class="px-ai-rpt-section-ttl">' + sec.num + ". " + esc(sec.title) + "</p>" +
          '<button type="button" class="px-ai-import-btn" data-open-import="' + esc(sec.importSection) + '">↩ 불러오기</button>' +
          "</div>" + blocks + imports + "</div>";
      }).join("");
      var meta = data.reportMeta || {};
      var headHtml = meta.title
        ? '<div class="px-ai-rpt-doc-head px-ai-rpt-doc-head-exec">' +
          (meta.badge ? '<p class="px-ai-rpt-doc-badge">' + esc(meta.badge) + "</p>" : "") +
          '<p class="px-ai-rpt-doc-title" style="text-align:center">' + esc(meta.title) + "</p>" +
          renderDocInfoTableHtml() +
          "</div>"
        : '<div class="px-ai-rpt-doc-head">' +
          '<p class="px-ai-rpt-doc-title">AI Insight Report</p>' +
          '<span class="px-ai-level-tag">' + esc(LV_NAMES[curLv]) + "</span></div>";
      var footer = meta.footerNote
        ? '<div class="px-ai-rpt-doc-footer"><span>' + esc(meta.footerNote) + '</span><span>1 / 1</span></div>'
        : "";
      els.reportDoc.innerHTML = headHtml + body + footer + appendReportFmtButtons("");
      bindReportDocActions();
    }
    function removeReportSubBlock(key) {
      removedReportBlocks[key] = true;
      renderFullReportDocument();
    }
    function renderReportBuilderLeft() {
      if (!els.reportLeft) return;
      if (!reportSectionSel) reportSectionSel = defaultReportSectionSel();
      var rows = getReportBuilderSections().map(function (s) {
        var st = reportSectionSel[s.key] || { ai: false, stat: false };
        var aiOpt = s.aiBlock
          ? '<label class="px-ai-rpt-opt' + (st.ai ? " on" : "") + '">' +
            '<input type="checkbox" data-section-key="' + esc(s.key) + '" data-section-type="ai"' + (st.ai ? " checked" : "") + "> AI 상세분석</label>"
          : "";
        var statOpt = s.statBlock
          ? '<label class="px-ai-rpt-opt' + (st.stat ? " on" : "") + '">' +
            '<input type="checkbox" data-section-key="' + esc(s.key) + '" data-section-type="stat"' + (st.stat ? " checked" : "") + "> 통계</label>"
          : "";
        return '<div class="px-ai-rpt-row">' +
          '<p class="px-ai-rpt-row-title">' + esc(s.title) + "</p>" +
          (s.desc ? '<p class="px-ai-rpt-row-desc">' + esc(s.desc) + "</p>" : "") +
          '<div class="px-ai-rpt-row-opts">' + aiOpt + statOpt + "</div></div>";
      }).join("");
      els.reportLeft.innerHTML =
        '<div class="px-ai-rpt-builder-head">' +
          '<p class="px-ai-rpt-builder-title">보고서 구성</p>' +
          '<span class="px-ai-level-tag">' + esc(LV_NAMES[curLv]) + "</span>" +
        "</div>" +
        '<p class="px-ai-rpt-builder-note">각 항목마다 AI 상세분석과 통계를 선택해 보고서에 포함할 수 있습니다. 우측에서 실시간 미리보기를 확인하세요.</p>' +
        rows +
        '<div class="px-ai-rpt-builder-actions">' +
          '<button type="button" class="px-ai-gen" data-role="gen">보고서 작성 ↗</button>' +
        "</div>";
    }
    function renderReportPane() {
      if (useDarkModal) {
        renderFullReportDocument();
        return;
      }
      if (!els.reportSetup) return;
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      var header = '<div class="px-ai-rpt-level">현재 분석 강도 <span class="px-ai-level-tag">' + esc(LV_NAMES[curLv]) + "</span>" +
        '<span class="px-ai-rpt-level-note">— 아래 블록을 눌러 보고서에 넣거나 뺄 수 있습니다.</span></div>';
      var aiBlocks = data.reportBlockDefs || [];
      var statsBlocks = data.reportStatsBlockDefs || [];
      els.reportSetup.innerHTML = header +
        '<p class="px-ai-rpt-group-lbl" style="margin-top:0">AI 상세 분석</p>' +
        '<div class="px-ai-rpt-chips">' + reportBlockChipsHtml(aiBlocks) + "</div>" +
        (statsBlocks.length
          ? '<p class="px-ai-rpt-group-lbl">통계</p>' +
            '<div class="px-ai-rpt-chips">' + reportBlockChipsHtml(statsBlocks) + "</div>"
          : "") +
        '<button type="button" class="px-ai-gen" data-role="gen">보고서 생성 ↗</button>';
    }
    function setReportSection(key, type, on) {
      if (!reportSectionSel) reportSectionSel = defaultReportSectionSel();
      if (!reportSectionSel[key]) reportSectionSel[key] = { ai: false, stat: false };
      reportSectionSel[key][type] = !!on;
      syncActiveBlocksFromSelection();
      renderReportBuilderLeft();
      renderReportPreview();
      if (els.reportOut) els.reportOut.style.display = "none";
      generated = false;
    }
    function toggleReportSection(key, type) {
      if (!reportSectionSel) reportSectionSel = defaultReportSectionSel();
      var cur = !!(reportSectionSel[key] && reportSectionSel[key][type]);
      setReportSection(key, type, !cur);
    }
    function applyReportPreset(key) {
      var presets = data.reportPresets || {};
      if (!presets[key]) return;
      reportSectionSel = defaultReportSectionSel();
      getReportBuilderSections().forEach(function (s) {
        if (presets[key].blocks.indexOf(s.aiBlock) > -1 && s.aiBlock) reportSectionSel[s.key].ai = true;
        if (presets[key].blocks.indexOf(s.statBlock) > -1 && s.statBlock) reportSectionSel[s.key].stat = true;
      });
      syncActiveBlocksFromSelection();
      renderReportPane();
      if (els.reportOut) els.reportOut.style.display = "none";
      generated = false;
    }
    function selectAllReportBlocks() {
      reportSectionSel = defaultReportSectionSel();
      getReportBuilderSections().forEach(function (s) {
        reportSectionSel[s.key].ai = !!s.aiBlock;
        reportSectionSel[s.key].stat = !!s.statBlock;
      });
      syncActiveBlocksFromSelection();
      renderReportPane();
      if (els.reportOut) els.reportOut.style.display = "none";
      generated = false;
    }
    function clearAllReportBlocks() {
      reportSectionSel = defaultReportSectionSel();
      getReportBuilderSections().forEach(function (s) {
        reportSectionSel[s.key] = { ai: s.key === "overview", stat: false };
      });
      syncActiveBlocksFromSelection();
      renderReportPane();
      if (els.reportOut) els.reportOut.style.display = "none";
      generated = false;
    }
    function toggleReportBlock(key) {
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      var idx = activeBlocks.indexOf(key);
      if (idx > -1) activeBlocks.splice(idx, 1);
      else activeBlocks.push(key);
      renderReportPane();
      els.reportOut.style.display = "none";
      generated = false;
    }
    function removeReportBlock(key) {
      if (useDarkModal) {
        removeReportSubBlock(key);
        return;
      }
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
      var rows = data.reportKpiRows;
      if (!rows || !rows.length) {
        rows = [];
        (data.stats || []).forEach(function (s) { rows.push([s.k, s.v]); });
        var neg = (data.metricChanges || [])[0];
        rows.push([neg ? neg.k : "전체 부정률", neg ? neg.v : "43.7%"]);
      }
      return '<table class="px-ai-rpt-kpi-tbl">' + rows.map(function (r) {
        return "<tr><td>" + esc(r[0]) + '</td><td>' + esc(r[1]) + "</td></tr>";
      }).join("") + "</table>";
    }
    function reportTypeDistHtml() {
      return (data.typeSentiment || []).filter(function (t) { return t.pos !== null; }).map(function (t) {
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
    function normalizeVocQuote(item) {
      if (typeof item === "string") return { text: item, meta: "", channel: "", date: "" };
      return {
        text: item.text || "",
        meta: item.meta || "",
        channel: item.channel || "",
        date: item.date || ""
      };
    }
    function renderVocQuoteItem(item, polarity) {
      var q = normalizeVocQuote(item);
      var metaParts = [q.meta, q.channel, q.date].filter(Boolean);
      return '<div class="px-ai-voc-quote-item ' + polarity + '">' +
        '<p class="px-ai-voc-quote-text">"' + esc(q.text) + '"</p>' +
        (metaParts.length ? '<p class="px-ai-voc-quote-meta">' + esc(metaParts.join(" · ")) + "</p>" : "") +
        "</div>";
    }
    function getVocQuoteLists(limitPos, limitNeg) {
      var samples = data.vocQuoteSamples || {};
      var posAll = samples.positive || (data.posQuotes || []).map(function (t) { return { text: t }; });
      var negAll = samples.negative || (data.negQuotes || []).map(function (t) { return { text: t }; });
      return {
        intro: samples.intro || (data.reportDoc && data.reportDoc.quotesIntro) ||
          "실제 접수된 VOC 원문 중 이번 달 흐름을 보여주는 사례입니다.",
        positive: typeof limitPos === "number" ? posAll.slice(0, limitPos) : posAll,
        negative: typeof limitNeg === "number" ? negAll.slice(0, limitNeg) : negAll,
        totalPos: posAll.length,
        totalNeg: negAll.length
      };
    }
    function renderVocQuotesContent(limitPos, limitNeg) {
      var lists = getVocQuoteLists(limitPos, limitNeg);
      var scrollCls = (typeof limitPos !== "number" && typeof limitNeg !== "number") ? "px-ai-voc-quotes-scroll" : "";
      var posHtml = lists.positive.map(function (q) { return renderVocQuoteItem(q, "pos"); }).join("");
      var negHtml = lists.negative.map(function (q) { return renderVocQuoteItem(q, "neg"); }).join("");
      var posLabel = "긍정 원문 (" + lists.positive.length + "건" +
        (lists.positive.length < lists.totalPos ? " / 전체 " + lists.totalPos + "건" : "") + ")";
      var negLabel = "부정·개선 원문 (" + lists.negative.length + "건" +
        (lists.negative.length < lists.totalNeg ? " / 전체 " + lists.totalNeg + "건" : "") + ")";
      return '<div class="px-ai-voc-quotes-grid">' +
          '<div><p class="px-ai-voc-quotes-col-hd pos">' + posLabel + '</p><div' +
            (scrollCls ? ' class="' + scrollCls + '"' : "") + ">" + posHtml + "</div></div>" +
          '<div style="border-left:1px solid #2d2c36;padding-left:14px">' +
            '<p class="px-ai-voc-quotes-col-hd neg">' + negLabel + '</p><div' +
            (scrollCls ? ' class="' + scrollCls + '"' : "") + ">" + negHtml + "</div></div>" +
        "</div>";
    }
    function renderVocQuotesPanel(limitPos, limitNeg) {
      var lists = getVocQuoteLists(limitPos, limitNeg);
      return '<div class="px-ai-card">' +
        '<div class="px-ai-card-hd"><span class="px-ai-card-ttl">VOC 원문 확인</span>' +
        '<span class="px-ai-card-sub">' + esc(lists.intro) + "</span></div>" +
        renderVocQuotesContent(limitPos, limitNeg) +
        "</div>";
    }
    function reportQuoteListHtml() {
      var lists = getVocQuoteLists();
      return '<div style="margin-top:8px">' +
        '<p style="font-size:12px;font-weight:700;color:#cfcdda;margin:0 0 4px">VOC 원문 확인</p>' +
        '<p style="font-size:10px;color:#7a7887;margin:0 0 10px">' + esc(lists.intro) + "</p>" +
        renderVocQuotesContent() +
        "</div>";
    }
    function reportIssuesEmbedHtml(includeMonitorFooter) {
      var html = '<div style="margin-top:10px">' +
        renderIssueActionMatrix(data.positiveIssueActions || [], data.negativeIssueActions || [], { variant: variant });
      if (includeMonitorFooter !== false) html += renderDetailMonitorsFooter();
      return html + "</div>";
    }
    function overviewReportText() {
      if (useDarkModal) return deepSummaryText();
      var lv = LV_KEYS[curLv];
      if (data.sum && data.sum[lv]) {
        return (data.sum[lv] || "").replace(/\\n/g, "\n");
      }
      var texts = data.reportOverview || {};
      return texts[lv] || texts.basic || (data.sum.basic || "").replace(/\\n/g, "\n");
    }
    function appendReportFmtButtons(html) {
      return html +
        '<div class="px-ai-rpt-actions">' +
        '<button type="button" class="px-ai-rpt-action-btn" data-role="copy">📋 복사</button>' +
        '<button type="button" class="px-ai-rpt-action-btn" data-role="word">＋ Word 저장</button>' +
        "</div>";
    }
    function bindReportFmtButtons(container) {
      var root = container || (els.reportOut && els.reportOut.style.display !== "none" ? els.reportOut : els.reportDoc);
      if (!root) return;
      var copyBtn = root.querySelector('[data-role="copy"]');
      var wordBtn = root.querySelector('[data-role="word"]');
      if (copyBtn) {
        copyBtn.onclick = function () {
          var text = root.innerText || "";
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
    }
    function bindReportActions() {
      if (els.reportOut) {
        Array.prototype.forEach.call(els.reportOut.querySelectorAll("[data-remove-block]"), function (btn) {
          btn.onclick = function () { removeReportBlock(btn.getAttribute("data-remove-block")); };
        });
        Array.prototype.forEach.call(els.reportOut.querySelectorAll("[data-open-import]"), function (btn) {
          btn.onclick = function () { openImportPicker(btn.getAttribute("data-open-import")); };
        });
        Array.prototype.forEach.call(els.reportOut.querySelectorAll("[data-remove-import]"), function (btn) {
          btn.onclick = function () {
            removeImportedItem(btn.getAttribute("data-import-section"), Number(btn.getAttribute("data-import-idx")));
          };
        });
      }
      bindReportFmtButtons();
    }
    function openImportPicker(sectionName) {
      if (!els.importOverlay || !els.importBody) return;
      var items = (data.reportImportableItems || {})[sectionName] || [];
      var list = items.map(function (item, idx) {
        return '<div class="px-ai-import-pick" data-import-section="' + esc(sectionName) + '" data-import-idx="' + idx + '">' +
          '<div><p style="font-size:12px;font-weight:700;color:#fff;margin:0 0 2px">' + esc(item.name) + '</p>' +
          '<p style="font-size:10px;color:#7a7887;margin:0">' + esc(item.src) + "</p></div>" +
          '<span style="font-size:11px;color:#8fb4e0">추가</span></div>';
      }).join("");
      els.importBody.innerHTML =
        '<p style="font-size:15px;font-weight:700;color:#fff;margin:0 0 4px">' + esc(sectionName) + " — 불러오기</p>" +
        '<p style="font-size:11px;color:#7a7887;margin:0 0 14px">통계 페이지·상세분석 페이지의 표/차트를 이 섹션에 추가합니다.</p>' +
        (list || '<p style="font-size:12px;color:#7a7887">불러올 수 있는 항목이 없습니다.</p>');
      els.importOverlay.style.display = "flex";
    }
    function closeImportPicker() {
      if (els.importOverlay) els.importOverlay.style.display = "none";
    }
    function importItem(sectionName, idx) {
      var pool = (data.reportImportableItems || {})[sectionName] || [];
      if (!pool[idx]) return;
      if (!importedItems[sectionName]) importedItems[sectionName] = [];
      importedItems[sectionName].push(pool[idx]);
      closeImportPicker();
      if (useDarkModal) renderFullReportDocument();
      else generateReport();
    }
    function removeImportedItem(sectionName, idx) {
      if (!importedItems[sectionName]) return;
      importedItems[sectionName].splice(idx, 1);
      if (useDarkModal) renderFullReportDocument();
      else generateReport();
    }
    function switchToTab(tab) {
      if (useDarkModal) {
        if (tab === "saved") {
          switchMainViewTab("saved");
          return;
        }
        if (tab === "report" && analysisPhase === "ready") {
          openExternalReportDrawer();
          return;
        }
        switchMainViewTab("analysis");
        return;
      }
      curTab = tab;
      if (curTab === "report" && analysisPhase !== "ready") {
        curTab = "analysis";
      }
      if (els.innerTabBtns) {
        Array.prototype.forEach.call(els.innerTabBtns, function (btn) {
          btn.classList.toggle("on", btn.getAttribute("data-tab") === curTab);
        });
      }
      if (els.analysisPane) els.analysisPane.style.display = curTab === "analysis" ? "" : "none";
      if (els.reportPane) els.reportPane.style.display = curTab === "report" ? "" : "none";
      if (curTab === "report" && analysisPhase === "ready") renderReportPane();
    }
    function vocReportBlockContent() {
      var drafts = data.reportDrafts || {};
      var statsDrafts = data.reportStatsDrafts || {};
      return {
        overview: ["개요", reportDraftHtml(overviewReportText()), renderOverviewSectionHtml()],
        status: ["현황", reportDraftHtml(getReportBlockDraft("status")), renderStatusSectionHtml()],
        analysisOrg: ["조직별 분석", reportDraftHtml(getReportBlockDraft("analysisOrg")), renderAnalysisOrgSectionHtml()],
        kpi: ["핵심 지표", reportDraftHtml(drafts.kpi), reportKpiTableHtml()],
        dist: ["유형별 분포", reportDraftHtml(drafts.dist), reportTypeDistHtml()],
        matrix: ["유형 진단 매트릭스", reportDraftHtml(drafts.matrix || ""), renderCategoryMatrix()],
        keywords: ["변화 키워드 TOP3", reportDraftHtml(drafts.keywords), renderKeywordTop()],
        issues: ["주요 이슈 및 권장 조치", reportDraftHtml(drafts.issues), reportIssuesEmbedHtml()],
        plan: ["개선 액션 플랜", reportDraftHtml(drafts.plan), reportActionPlanHtml()],
        monitor: ["모니터링", reportDraftHtml(drafts.monitor || ""), renderMonitorCard()],
        stat_overview: ["전체 VOC 현황", reportDraftHtml(statsDrafts.stat_overview), reportKpiTableHtml()],
        stat_type: ["유형별 접수 현황", reportDraftHtml(statsDrafts.stat_type), reportTypeDistHtml()],
        stat_trend: ["VOC 월별 추이", reportDraftHtml(statsDrafts.stat_trend), reportVocStatTrendHtml()],
        stat_channel: ["채널별 접수", reportDraftHtml(statsDrafts.stat_channel), reportVocStatChannelHtml()],
        stat_praise: ["칭찬 현황", reportDraftHtml(statsDrafts.stat_praise), reportVocStatPraiseHtml()],
        stat_demographic: ["응답자 구성", reportDraftHtml(statsDrafts.stat_demographic), reportVocStatDemographicHtml()],
        stat_category: ["카테고리·키워드", reportDraftHtml(statsDrafts.stat_category), reportVocStatCategoryHtml()],
        stat_group: ["그룹별 VOC", reportDraftHtml(statsDrafts.stat_group), reportVocStatGroupHtml()]
      };
    }
    function generateVocReport() {
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      if (activeBlocks.indexOf("overview") === -1) activeBlocks.unshift("overview");
      var blockContent = vocReportBlockContent();
      var html = '<div class="px-ai-rpt-out-card">';
      if (!activeBlocks.length) {
        html += '<p style="font-size:12px;color:#7a7887;text-align:center;padding:20px 0">포함할 블록을 1개 이상 선택해 주세요.</p>';
      } else if (useDarkModal) {
        var nRef = { n: 1 };
        html = appendSelectedReportBlocks(html, nRef, data.reportBlockDefs, blockContent);
        html = appendSelectedReportBlocks(html, nRef, data.reportStatsBlockDefs, blockContent);
      } else {
        var sectionOrder = data.reportSectionOrder || [];
        var sectionMap = data.reportSectionMap || {};
        var n = 1;
        sectionOrder.forEach(function (sectionName) {
          var keysInSection = (data.reportBlockDefs || []).filter(function (b) {
            return sectionMap[b.key] === sectionName && activeBlocks.indexOf(b.key) > -1;
          });
          var imports = importedItems[sectionName] || [];
          if (!keysInSection.length && !imports.length) return;
          html += '<div style="margin-bottom:22px">' +
            '<div class="px-ai-rpt-section-hd">' +
            '<p class="px-ai-rpt-section-ttl">' + n++ + ". " + esc(sectionName) + "</p>" +
            '<button type="button" class="px-ai-import-btn" data-open-import="' + esc(sectionName) + '">⤵ 불러오기</button>' +
            "</div>";
          keysInSection.forEach(function (b) {
            var c = blockContent[b.key];
            if (c) html += reportSection(b.key, c[0], c[1], c[2]);
          });
          imports.forEach(function (item, idx) {
            html += '<div class="px-ai-import-item">' +
              '<span style="font-size:12px;color:#c7a6f2">📎 ' + esc(item.src) + " · " + esc(item.name) + "</span>" +
              '<button type="button" class="px-ai-rpt-remove" data-import-section="' +
              esc(sectionName) + '" data-import-idx="' + idx + '">✕ 빼기</button></div>';
          });
          html += "</div>";
        });
      }
      html = appendReportFmtButtons(html) + "</div>";
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
        return "· " + monitorItemPlainText(m).replace(/\n/g, "\n  ");
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

    function reportSurveyKpiTableHtml() {
      var rows = [
        ["종합점수", "81.27점"],
        ["응답자 수", "9명"],
        ["종합평가", "66.67점"],
        ["추천의향", "75.56점"]
      ];
      return '<table class="px-ai-rpt-kpi-tbl">' + rows.map(function (r) {
        return "<tr><td>" + esc(r[0]) + '</td><td>' + esc(r[1]) + "</td></tr>";
      }).join("") + "</table>";
    }
    function generateSurveyReport() {
      if (!activeBlocks) activeBlocks = defaultReportBlocks();
      var drafts = data.reportDrafts || {};
      var statsDrafts = data.reportStatsDrafts || {};
      var blockContent = {
        overview: ["개요", reportDraftHtml(drafts.overview || overviewReportText()), renderSurveyOverviewKpiHtml()],
        status: ["현황", reportDraftHtml(drafts.status || drafts.statBrief), renderSurveyStatusDetailHtml()],
        statBrief: ["전체 현황", reportDraftHtml(drafts.statBrief || drafts.status), renderSurveyStatBriefingHtml()],
        grade: ["등급 분석", reportDraftHtml(drafts.grade), renderSurveyGradeAnalysis()],
        beds: ["병상수별 분석", reportDraftHtml(drafts.beds), renderSurveyBedAnalysis()],
        gap: ["영역별 격차", reportDraftHtml(drafts.gap), renderSurveyAreaGapAnalysis()],
        matrix: ["영역 진단 매트릭스", reportDraftHtml(drafts.matrix), renderSurveyAreaMatrix()],
        gradePriority: ["2등급 진입 우선순위", reportDraftHtml(drafts.gradePriority), renderSurveyGradePriority()],
        improvement: ["개선 과제 및 권고", reportDraftHtml(drafts.improvement), renderSurveyImprovementHtml()],
        kpi: ["핵심 지표", reportDraftHtml(drafts.kpi), reportSurveyKpiTableHtml()],
        dist: ["영역별 분포", reportDraftHtml(drafts.dist), reportAreaBarHtml()],
        areas: ["변화 영역 및 문항 TOP3", reportDraftHtml(drafts.areas), renderSurveyTopAreas()],
        issues: ["주요 이슈 및 권장 조치", reportDraftHtml(drafts.issues), reportIssuesEmbedHtml()],
        plan: ["개선 액션 플랜", reportDraftHtml(drafts.plan), reportActionPlanHtml()],
        stat_overview: ["전체 현황", reportDraftHtml(statsDrafts.stat_overview), reportSurveyStatOverviewHtml()],
        stat_area: ["영역·문항 분석", reportDraftHtml(statsDrafts.stat_area), reportSurveyStatAreaHtml()],
        stat_org: ["조직별 분석", reportDraftHtml(statsDrafts.stat_org), reportSurveyStatOrgHtml()],
        stat_priority: ["개선 우선순위", reportDraftHtml(statsDrafts.stat_priority), reportSurveyStatPriorityHtml()]
      };
      var html = '<div class="px-ai-rpt-out-card">';
      var nRef = { n: 1 };
      if (!activeBlocks.length) {
        html += '<p style="font-size:12px;color:#7a7887;text-align:center;padding:20px 0">포함할 블록을 1개 이상 선택해 주세요.</p>';
      } else {
        html = appendSelectedReportBlocks(html, nRef, data.reportBlockDefs, blockContent);
        html = appendSelectedReportBlocks(html, nRef, data.reportStatsBlockDefs, blockContent);
      }
      html = appendReportFmtButtons(html) + "</div>";
      els.reportOut.innerHTML = html;
      els.reportOut.style.display = "block";
      generated = true;
      bindReportActions();
    }

    function generateReport() {
      if (useDarkModal) syncActiveBlocksFromSelection();
      if (variant === "voc") {
        generateVocReport();
        return;
      }
      if (variant === "survey") {
        generateSurveyReport();
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
      if (variant === "voc" || variant === "survey") {
        reportSectionSel = null;
        activeBlocks = defaultReportBlocks();
        renderReportPane();
        if (generated) {
          els.reportOut.style.display = "none";
          generated = false;
        }
      }
    }

    function beginReportDirect() {
      if (useDarkModal) {
        appliedAnalysisBlocks = blocksForLevel("deep");
        activeAnalysisBlocks = appliedAnalysisBlocks.slice();
        reportSectionSel = null;
        importedItems = {};
        removedReportBlocks = {};
        if (els.period) els.period.textContent = data.periodText;
        if (els.breadcrumb) els.breadcrumb.style.display = "none";
        updateReportButton(false);
        analysisPhase = "loading";
        switchToTab("analysis");
        var directLoadingText = variant === "voc"
          ? "VOC 데이터를 분석하고 있습니다…"
          : "환자경험평가 데이터를 분석하고 있습니다…";
        if (els.body) els.body.innerHTML = '<p class="px-ai-voc-loading">' + directLoadingText + "</p>";
        renderReportPane();
        window.setTimeout(function () {
          if (disposed) return;
          analysisPhase = "ready";
          renderChipBasedAnalysis();
          renderReportPane();
          updateReportButton(true);
          switchToTab("analysis");
        }, 700);
        return;
      }
      if (els.reportSetup || els.reportDoc) renderReportPane();
      analysisPhase = "ready";
      renderAnalysis();
      switchToTab("report");
    }
    function beginAnalysis() {
      if (useDarkModal) {
        if (els.breadcrumb) els.breadcrumb.style.display = "";
        analysisPhase = "strength";
        appliedAnalysisBlocks = null;
        reportSectionSel = null;
        importedItems = {};
        removedReportBlocks = {};
        if (els.period) els.period.textContent = data.periodText;
        renderStep2Strength();
        if (els.reportDoc) renderReportPane();
        updateReportButton(false);
        switchToTab("analysis");
        return;
      }
      if (options.showLoading && (variant === "voc" || variant === "survey")) {
        var loadingText = variant === "voc"
          ? "VOC 데이터를 분석하고 있습니다…"
          : "환자경험평가 데이터를 분석하고 있습니다…";
        els.body.innerHTML = '<p class="px-ai-voc-loading">' + loadingText + "</p>";
        window.setTimeout(function () {
          if (disposed) return;
          renderAnalysis();
          if (els.reportSetup || els.reportDoc) renderReportPane();
        }, 700);
        return;
      }
      renderAnalysis();
      if (els.reportSetup) renderReportPane();
    }

    if (useDarkModal && els.analysisTabBtn) {
      els.analysisTabBtn.addEventListener("click", function () {
        switchMainViewTab("analysis");
      });
    } else if (!useDarkModal) {
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
    }
    if (els.reportBtn) {
      els.reportBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (analysisPhase !== "ready") return;
        if (variant === "survey" && els.reportDoc) renderFullReportDocument();
        openExternalReportDrawer();
      });
    }
    if (els.historyBtn) {
      els.historyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (mainViewTab === "history") {
          selectedHistoryEntry = null;
          dispatchHistoryCleared();
          switchMainViewTab("analysis");
          return;
        }
        switchMainViewTab("history");
      });
    }
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
    if (els.reportDoc && useDarkModal) {
      renderReportPane();
    }
    if (els.reportSetup && !useDarkModal) {
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
    if (els.body && useDarkModal) {
      els.body.addEventListener("click", function (e) {
        var strengthCard = e.target.closest("[data-strength]");
        if (strengthCard) {
          pickStrength(strengthCard.getAttribute("data-strength"));
          return;
        }
        if (e.target.closest('[data-role="request-analysis"]')) requestAnalysis();
      });
    }
    if (els.importClose) {
      els.importClose.addEventListener("click", closeImportPicker);
    }
    if (els.importBody) {
      els.importBody.addEventListener("click", function (e) {
        var pick = e.target.closest(".px-ai-import-pick");
        if (pick) {
          importItem(pick.getAttribute("data-import-section"), Number(pick.getAttribute("data-import-idx")));
        }
      });
    }
    if (els.importOverlay) {
      els.importOverlay.addEventListener("click", function (e) {
        if (e.target === els.importOverlay) closeImportPicker();
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
    loadSavedReportFromStorage();
    renderSavedReportTabs();
    global.addEventListener("pix-report-persisted", onReportPersisted);

    function beginCompletedAnalysisView(levelKey) {
      var idx = LV_KEYS.indexOf(levelKey || options.level || "basic");
      if (idx < 0) idx = 1;
      curLv = idx;
      global.__pxAiAnalysisLevel = LV_KEYS[curLv];
      analysisPhase = "ready";
      appliedAnalysisBlocks = blocksForLevel(LV_KEYS[curLv]);
      activeAnalysisBlocks = appliedAnalysisBlocks ? appliedAnalysisBlocks.slice() : null;
      if (els.breadcrumb) els.breadcrumb.style.display = "none";
      if (els.period) els.period.textContent = data.periodText;
      renderChipBasedAnalysis();
      if (els.reportDoc) renderReportPane();
      updateReportButton(true);
      switchToTab("analysis");
    }

    if (options.embedInArchive && options.replaySnapshot && options.replaySnapshot.html) {
      host.innerHTML = options.replaySnapshot.html;
      return function dispose() {
        disposed = true;
        host.innerHTML = "";
      };
    }

    requestAnimationFrame(function () {
      if (options.embedInArchive && options.showCompletedAnalysis) {
        beginCompletedAnalysisView(options.level || (options.replaySnapshot && options.replaySnapshot.level));
        return;
      }
      if (hideSlider) {
        if (options.openMode === "reportDirect") beginReportDirect();
        else beginAnalysis();
      } else {
        setLevel(curLv, false);
        requestAnimationFrame(function () {
          if (els.thumb) els.thumb.style.transition = "left .2s cubic-bezier(.4,0,.2,1)";
        });
      }
    });

    function captureAnalysisSnapshot() {
      if (analysisPhase !== "ready") return null;
      var clone = root.cloneNode(true);
      clone.querySelectorAll("script").forEach(function (s) { s.remove(); });
      clone.querySelectorAll('[data-role="close"]').forEach(function (el) { el.remove(); });
      clone.querySelectorAll(".px-ai-report-head-btn").forEach(function (el) { el.remove(); });
      return {
        variant: variant,
        level: LV_KEYS[curLv],
        levelLabel: LV_NAMES[curLv],
        periodText: data.periodText || "",
        title: data.title || "",
        capturedAt: new Date().toISOString(),
        html: clone.outerHTML
      };
    }

    function buildReportSrcDoc() {
      if (disposed || analysisPhase !== "ready" || variant !== "survey") return null;
      renderFullReportDocument();
      if (!els.reportDoc) return null;
      var clone = els.reportDoc.cloneNode(true);
      clone.querySelectorAll(".px-ai-rpt-actions, [data-remove-block], .px-ai-import-btn, .px-ai-rpt-remove, .px-ai-rpt-draft-tag").forEach(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      clone.querySelectorAll("[contenteditable]").forEach(function (el) {
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
      });
      var meta = data.reportMeta || {};
      return "<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
        "<title>" + esc(meta.title || "환자경험평가 분석보고서") + "</title>" +
        "<style>" + CSS + VOC_CSS + "</style></head>" +
        "<body style=\"margin:0;background:#17171c;padding:20px 16px 40px;font-family:'Malgun Gothic',sans-serif\">" +
        clone.innerHTML + "</body></html>";
    }

    var captureKeys = [];
    if (options.reportStorageKey) captureKeys.push(options.reportStorageKey);
    captureKeys.push("variant:" + variant);
    global.__pixAnalysisPanelCaptures = global.__pixAnalysisPanelCaptures || {};
    captureKeys.forEach(function (key) {
      global.__pixAnalysisPanelCaptures[key] = captureAnalysisSnapshot;
    });
    if (variant === "survey") {
      global.__pixBuildSurveyReportSrcDoc = buildReportSrcDoc;
    }

    return function dispose() {
      disposed = true;
      if (variant === "survey" && global.__pixBuildSurveyReportSrcDoc === buildReportSrcDoc) {
        try { delete global.__pixBuildSurveyReportSrcDoc; } catch (_e) {}
      }
      dispatchHistoryCleared();
      captureKeys.forEach(function (key) {
        if (global.__pixAnalysisPanelCaptures && global.__pixAnalysisPanelCaptures[key] === captureAnalysisSnapshot) {
          delete global.__pixAnalysisPanelCaptures[key];
        }
      });
      if (els.track) {
        global.removeEventListener("pointermove", onMove);
        global.removeEventListener("pointerup", onUp);
      }
      global.removeEventListener("px-ai-panel-data", onData);
      global.removeEventListener("pix-report-persisted", onReportPersisted);
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
        style: { width: "100%" }
      });
    };
  }

  function registerPxSurveyAnalyticsSection(deps) {
    return registerPixAiStatisticsShell(deps, {
      variant: "survey",
      storageKey: "pix_survey_report_2026_06",
      reportUrl: "px-survey-analysis-report.html",
      reportTitle: "2026\uB144 6\uC6D4 \uD658\uC790\uACBD\uD5D8\uD3C9\uAC00 \uBD84\uC11D\uBCF4\uACE0\uC11C",
      reportSubtitle: "\uB0B4\uBD80 \uBCF4\uACE0 \u00B7 \uC784\uC6D0 \uBCF4\uACE0\uC6A9 \u00B7 PIX AI \uD658\uC790\uACBD\uD5D8\uAD00\uB9AC",
      iframeTitle: "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00 \uBD84\uC11D\uBCF4\uACE0\uC11C",
      reportLabel: "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00 \uBCF4\uACE0\uC11C",
      wordFilename: "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00_\uBD84\uC11D\uBCF4\uACE0\uC11C_2026-06.doc"
    });
  }

  function collectReportIframeHtml(iframe) {
    try {
      var doc = iframe && (iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document));
      if (!doc || !doc.documentElement) return "";
      return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
    } catch (_error) {
      return "";
    }
  }

  function collectReportExportHtml(iframe) {
    try {
      var doc = iframe && (iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document));
      if (!doc || !doc.documentElement) return "";
      var clone = doc.documentElement.cloneNode(true);
      var removeSelectors = [
        ".rpt-block-toolbar", ".rpt-sec-delete", ".rpt-sec-add-row",
        "[data-rpt-stats-toolbar]", "[data-rpt-add-menu]", ".rpt-stats-dialog-backdrop",
        ".rpt-stat-remove", ".rpt-wysiwyg-mock", "[data-rpt-wysiwyg-mock]",
        ".rpt-wysiwyg-toolbar", ".rpt-wysiwyg-tabs"
      ];
      removeSelectors.forEach(function (sel) {
        Array.prototype.forEach.call(clone.querySelectorAll(sel), function (el) {
          if (el.parentNode) el.parentNode.removeChild(el);
        });
      });
      Array.prototype.forEach.call(clone.querySelectorAll(".rpt-layout-block, [data-rpt-stat-block]"), function (wrap) {
        var parent = wrap.parentNode;
        if (!parent) return;
        while (wrap.firstChild) {
          var child = wrap.firstChild;
          if (child.nodeType === 1 && child.classList && child.classList.contains("rpt-stat-remove")) {
            wrap.removeChild(child);
            continue;
          }
          parent.insertBefore(child, wrap);
        }
        parent.removeChild(wrap);
      });
      Array.prototype.forEach.call(clone.querySelectorAll("[contenteditable]"), function (el) {
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
      });
      Array.prototype.forEach.call(clone.querySelectorAll(".rpt-gap"), function (el) {
        if (!String(el.textContent || "").trim()) {
          if (el.parentNode) el.parentNode.removeChild(el);
        }
      });
      Array.prototype.forEach.call(clone.querySelectorAll("script"), function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      return "<!DOCTYPE html>\n" + clone.outerHTML;
    } catch (_error) {
      return collectReportIframeHtml(iframe);
    }
  }

  function openReportPrintWindow(html, showToast, pdfHint) {
    if (!html) {
      notifyReportAction("보고서 내용을 불러오지 못했습니다.", showToast);
      return false;
    }
    try {
      var printWin = global.open("", "_blank", "noopener,noreferrer");
      if (!printWin) throw new Error("popup blocked");
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      printWin.focus();
      setTimeout(function () {
        printWin.print();
        if (pdfHint) notifyReportAction("인쇄 창에서 'PDF로 저장'을 선택해 주세요.", showToast);
      }, 350);
      return true;
    } catch (_error) {
      notifyReportAction("인쇄/PDF 창을 열 수 없습니다.", showToast);
      return false;
    }
  }

  function notifyReportAction(message, showToast) {
    if (typeof showToast === "function") showToast(message);
    else if (typeof global.alert === "function") global.alert(message);
  }

  function downloadReportBlob(filename, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  function notifyReportPersisted(detail) {
    try {
      global.dispatchEvent(new CustomEvent("pix-report-persisted", { detail: detail }));
    } catch (_e) {}
  }

  function replaceCanvasesWithImages(root) {
    if (!root) return;
    root.querySelectorAll("canvas").forEach(function (canvas) {
      try {
        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        img.alt = canvas.getAttribute("aria-label") || "chart";
        img.className = canvas.className || "";
        img.style.cssText = canvas.style.cssText || "max-width:100%;height:auto;display:block;";
        if (canvas.parentNode) canvas.parentNode.replaceChild(img, canvas);
      } catch (_e) {}
    });
  }

  function captureVocStatsSnapshot() {
    var host = document.querySelector(".voc-embed-root");
    if (!host || !host.innerHTML.trim()) return null;
    var yearEl = host.querySelector("#vocYearSelect");
    var bucketEl = host.querySelector("#vocBucketSelect");
    var basisEl = host.querySelector("#vocOverviewBasis");
    var periodBtn = host.querySelector(".voc-filter-chip.active[data-period]");
    var clone = host.cloneNode(true);
    clone.querySelectorAll("script").forEach(function (s) { s.remove(); });
    clone.querySelectorAll(".voc-filter-panel").forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    replaceCanvasesWithImages(clone);
    return {
      variant: "voc",
      meta: {
        year: yearEl ? yearEl.value : "",
        bucket: bucketEl ? bucketEl.value : "",
        period: periodBtn ? periodBtn.getAttribute("data-period") : "",
        basis: basisEl ? String(basisEl.textContent || "").trim() : ""
      },
      styles: "",
      html: clone.outerHTML,
      capturedAt: new Date().toISOString()
    };
  }

  function captureSurveyStatsSnapshot() {
    var host = document.querySelector("[data-pix-survey-stats-root]");
    if (!host || !host.innerHTML.trim()) return null;
    var clone = host.cloneNode(true);
    clone.querySelectorAll("script").forEach(function (s) { s.remove(); });
    replaceCanvasesWithImages(clone);
    return {
      variant: "survey",
      meta: {},
      html: clone.innerHTML,
      capturedAt: new Date().toISOString()
    };
  }

  global.__pixCaptureReportStatsSnapshot = function (variant) {
    if (variant === "voc") return captureVocStatsSnapshot();
    if (variant === "survey") return captureSurveyStatsSnapshot();
    return null;
  };

  global.__pixCaptureReportAnalysisSnapshot = function (storageKey, variant) {
    var caps = global.__pixAnalysisPanelCaptures || {};
    var fn = (storageKey && caps[storageKey]) || (variant && caps["variant:" + variant]);
    if (typeof fn === "function") return fn();
    return null;
  };

  global.__pixApplyStatsSnapshotToHost = function (host, snapshot, variant, showToast) {
    if (!host) return;
    host.innerHTML = "";
    if (!snapshot || !snapshot.html) {
      if (variant === "voc" && typeof global.__pixMountVocStatisticsEmbed === "function") {
        host.className = "voc-embed-root animate-fadeIn";
        host.style.width = "100%";
        global.__pixMountVocStatisticsEmbed(host);
      } else if (variant === "survey" && typeof global.__pixSurveyStatsEmbedRenderer === "function") {
        host.className = "flex flex-col h-full animate-fadeIn font-sans";
        global.__pixSurveyStatsEmbedRenderer(host, showToast);
      }
      return;
    }
    var doc = typeof global.__pixBuildArchiveSnapshotDoc === "function"
      ? global.__pixBuildArchiveSnapshotDoc(snapshot, "stats")
      : snapshot.html;
    host.className = variant === "voc"
      ? "voc-embed-root animate-fadeIn"
      : "flex flex-col h-full animate-fadeIn font-sans";
    host.style.width = "100%";
    var iframe = document.createElement("iframe");
    iframe.title = "통계 스냅샷";
    iframe.srcdoc = doc;
    iframe.style.cssText = "width:100%;min-height:720px;border:0;display:block;background:#fff;";
    host.appendChild(iframe);
  };

  global.__pixBuildArchiveSnapshotDoc = function (snapshot, kind) {
    if (!snapshot || !snapshot.html) return "";
    if (kind === "analysis") {
      return "<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>" +
        "<style>html,body{margin:0;padding:0;min-height:100%;background:#17171c;overflow:auto;}</style></head><body>" +
        snapshot.html + "</body></html>";
    }
    var styles = snapshot.styles || "";
    if (snapshot.variant === "survey") {
      return "<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>" +
        "<script src=\"https://cdn.tailwindcss.com\"></script>" +
        "<style>html,body{margin:0;padding:0;background:#f8fafc;}</style></head><body>" +
        snapshot.html + "</body></html>";
    }
    if (snapshot.html.indexOf("<style") >= 0) {
      return "<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>" +
        "<style>html,body{margin:0;padding:0;background:#f8fafc;} .voc-filter-panel{display:none!important;}</style></head><body>" +
        snapshot.html + "</body></html>";
    }
    return "<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>" +
      "<style>html,body{margin:0;padding:0;background:#f8fafc;} .voc-archive-snapshot-root{padding:8px 12px 24px;} .voc-filter-panel{display:none!important;}</style></head><body>" +
      "<div class=\"voc-archive-snapshot-root voc-embed-root\">" + snapshot.html + "</div></body></html>";
  };

  var SAVED_REPORT_HIDE_CSS =
    ".rpt-wysiwyg-mock,[data-rpt-wysiwyg-mock],.rpt-wysiwyg-toolbar,.rpt-wysiwyg-tabs{display:none!important;}";

  function sanitizeSavedReportHtml(html) {
    if (!html) return html;
    try {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var removeSelectors = [
        ".rpt-wysiwyg-mock", "[data-rpt-wysiwyg-mock]",
        ".rpt-wysiwyg-toolbar", ".rpt-wysiwyg-tabs",
        ".rpt-block-toolbar", ".rpt-sec-delete", ".rpt-sec-add-row",
        "[data-rpt-stats-toolbar]", "[data-rpt-add-menu]", ".rpt-stats-dialog-backdrop",
        ".rpt-stat-remove", "script"
      ];
      removeSelectors.forEach(function (sel) {
        Array.prototype.forEach.call(doc.querySelectorAll(sel), function (el) {
          if (el.parentNode) el.parentNode.removeChild(el);
        });
      });
      Array.prototype.forEach.call(doc.querySelectorAll("[contenteditable]"), function (el) {
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
      });
      var hideStyle = doc.createElement("style");
      hideStyle.setAttribute("data-pix-saved-report-hide", "1");
      hideStyle.textContent = SAVED_REPORT_HIDE_CSS;
      if (doc.head) doc.head.appendChild(hideStyle);
      return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
    } catch (_e) {
      return html;
    }
  }

  function buildPersistedReportBundle(storageKey, iframe, status) {
    var html = collectReportExportHtml(iframe);
    if (!html) return null;
    var variant = storageKey.indexOf("pix_voc_") === 0 ? "voc" : "survey";
    var statsSnapshot = typeof global.__pixCaptureReportStatsSnapshot === "function"
      ? global.__pixCaptureReportStatsSnapshot(variant)
      : null;
    var analysisSnapshot = typeof global.__pixCaptureReportAnalysisSnapshot === "function"
      ? global.__pixCaptureReportAnalysisSnapshot(storageKey, variant)
      : null;
    return {
      savedAt: new Date().toISOString(),
      status: status,
      html: html,
      statsSnapshot: statsSnapshot,
      analysisSnapshot: analysisSnapshot
    };
  }

  global.pixReportDocActions = {
    collectHtml: collectReportIframeHtml,
    collectExportHtml: collectReportExportHtml,
    save: function (storageKey, iframe, label, showToast) {
      var bundle = buildPersistedReportBundle(storageKey, iframe, "saved");
      if (!bundle) {
        notifyReportAction("보고서 내용을 불러오지 못했습니다.", showToast);
        return false;
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(bundle));
        notifyReportAction((label || "보고서") + "를 저장했습니다.", showToast);
        notifyReportPersisted({
          storageKey: storageKey,
          status: "saved",
          savedAt: bundle.savedAt,
          label: label,
          html: bundle.html,
          statsSnapshot: bundle.statsSnapshot,
          analysisSnapshot: bundle.analysisSnapshot
        });
        return true;
      } catch (_error) {
        notifyReportAction("저장에 실패했습니다.", showToast);
        return false;
      }
    },
    draft: function (storageKey, iframe, label, showToast) {
      var bundle = buildPersistedReportBundle(storageKey, iframe, "draft");
      if (!bundle) {
        notifyReportAction("보고서 내용을 불러오지 못했습니다.", showToast);
        return false;
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(bundle));
        notifyReportAction((label || "보고서") + "를 임시저장했습니다.", showToast);
        notifyReportPersisted({
          storageKey: storageKey,
          status: "draft",
          savedAt: bundle.savedAt,
          label: label,
          html: bundle.html,
          statsSnapshot: bundle.statsSnapshot,
          analysisSnapshot: bundle.analysisSnapshot
        });
        return true;
      } catch (_error) {
        notifyReportAction("임시저장에 실패했습니다.", showToast);
        return false;
      }
    },
    word: function (filename, iframe, showToast) {
      var html = collectReportExportHtml(iframe);
      if (!html) {
        notifyReportAction("보고서 내용을 불러오지 못했습니다.", showToast);
        return false;
      }
      var source = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
        html.replace(/^<!DOCTYPE html>\s*/i, "") + "</html>";
      downloadReportBlob(filename || "report.doc", new Blob(["\ufeff", source], { type: "application/msword" }));
      notifyReportAction("워드 파일 다운로드를 시작했습니다.", showToast);
      return true;
    },
    pdf: function (iframe, showToast) {
      var html = collectReportExportHtml(iframe);
      return openReportPrintWindow(html, showToast, true);
    },
    print: function (iframe, showToast) {
      var html = collectReportExportHtml(iframe);
      if (openReportPrintWindow(html, showToast, false)) {
        notifyReportAction("인쇄 미리보기를 엽니다.", showToast);
        return true;
      }
      return false;
    }
  };

  var PIX_REPORT_GEN_MS = 2800;
  var PIX_AI_SPLIT_PANEL_WIDTH = 780;

  var pixAiModalBridge = {
    handlers: {},
    pending: {}
  };

  function pixAiModalBridgeKey(variant, mode) {
    return String(variant || "") + ":" + String(mode || "");
  }

  function registerPixAiModalHandler(variant, mode, fn) {
    var key = pixAiModalBridgeKey(variant, mode);
    if (typeof fn === "function") {
      pixAiModalBridge.handlers[key] = fn;
    } else {
      try { delete pixAiModalBridge.handlers[key]; } catch (_e) {}
    }
    if (pixAiModalBridge.pending[key] && typeof fn === "function") {
      pixAiModalBridge.pending[key] = false;
      fn();
    }
  }

  function dispatchPixAiModal(variant, mode) {
    var key = pixAiModalBridgeKey(variant, mode);
    var handler = pixAiModalBridge.handlers[key];
    if (typeof handler === "function") {
      handler();
      return true;
    }
    pixAiModalBridge.pending[key] = true;
    try {
      global.dispatchEvent(new CustomEvent("pix-ai-modal-request", {
        detail: { variant: variant, mode: mode }
      }));
    } catch (_e) {}
    return false;
  }

  function installPixAiModalGlobals() {
    global.openPxSurveyAiModal = function () {
      dispatchPixAiModal("survey", "analysis");
    };
    global.openPxSurveyAiReportModal = function () {
      dispatchPixAiModal("survey", "report");
    };
    global.openVocAiModal = function () {
      dispatchPixAiModal("voc", "analysis");
    };
    global.openVocAiReportModal = function () {
      dispatchPixAiModal("voc", "report");
    };
  }

  installPixAiModalGlobals();
  global.__pixAiModalBridge = pixAiModalBridge;
  global.registerPixAiModalHandler = registerPixAiModalHandler;

  function flushPixAiModalPending() {
    var keys = Object.keys(pixAiModalBridge.pending);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!pixAiModalBridge.pending[key]) continue;
      var handler = pixAiModalBridge.handlers[key];
      if (typeof handler === "function") {
        pixAiModalBridge.pending[key] = false;
        handler();
      }
    }
  }

  function installPixAiModalBridgeListeners() {
    if (global.__pixAiModalBridgeListenersInstalled) return;
    global.__pixAiModalBridgeListenersInstalled = true;

    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var btn = t.closest(".voc-filter-action, [data-pix-ai-open]");
      if (!btn) return;
      var variant = btn.getAttribute("data-pix-ai-open") || "voc";
      var mode = btn.getAttribute("data-pix-ai-mode") || "analysis";
      dispatchPixAiModal(variant, mode);
    }, true);

    var flushAttempts = 0;
    var flushTimer = global.setInterval(function () {
      flushPixAiModalPending();
      flushAttempts += 1;
      if (flushAttempts > 50) global.clearInterval(flushTimer);
    }, 200);
  }

  installPixAiModalBridgeListeners();

  function ensurePixAiSplitCss() {
    if (document.getElementById("pix-ai-split-css")) return;
    var style = document.createElement("style");
    style.id = "pix-ai-split-css";
    style.textContent =
      ".pix-ai-stats-shell{display:flex;width:100%;min-width:0;box-sizing:border-box;}" +
      ".pix-ai-stats-shell.is-open{height:calc(100vh - 140px);min-height:640px;overflow:hidden;}" +
      ".pix-ai-stats-shell-pane{min-height:0;min-width:0;box-sizing:border-box;}" +
      ".pix-ai-stats-shell-pane.stats{flex:1 1 auto;overflow:auto;}" +
      ".pix-ai-split-pane{flex:0 0 " + PIX_AI_SPLIT_PANEL_WIDTH + "px;width:" + PIX_AI_SPLIT_PANEL_WIDTH + "px;max-width:min(50vw,920px);min-width:560px;}";
    document.head.appendChild(style);
  }

  function ensurePixReportDrawerCss() {
    if (document.getElementById("pix-report-drawer-css")) return;
    var drawerStyle = document.createElement("style");
    drawerStyle.id = "pix-report-drawer-css";
    drawerStyle.textContent =
      "@keyframes pixReportSpin{to{transform:rotate(360deg)}}" +
      ".pix-report-wing-stack{position:absolute;right:0;top:50%;transform:translate(100%,-50%);display:flex;flex-direction:column;gap:10px;z-index:12;padding-left:2px;}" +
      ".pix-report-wing-btn{border:1px solid #0C447C;background:#fff;color:#0C447C;border-radius:0 12px 12px 0;padding:14px 10px;font-size:11px;font-weight:800;line-height:1.45;cursor:pointer;font-family:inherit;box-shadow:4px 4px 14px rgba(0,0,0,.14);white-space:pre-line;text-align:center;min-width:52px;transition:background .15s,color .15s;}" +
      ".pix-report-wing-btn:hover{background:#0C447C;color:#fff;}";
    document.head.appendChild(drawerStyle);
  }

  function renderPixReportSideWings(React, wings) {
    if (!wings || !wings.length) return null;
    return React.createElement(
      "div",
      { className: "pix-report-wing-stack" },
      wings.map(function (wing, idx) {
        return React.createElement(
          "button",
          {
            key: wing.key || String(idx),
            type: "button",
            className: "pix-report-wing-btn",
            onClick: wing.onClick,
            title: wing.title || wing.label
          },
          wing.label
        );
      })
    );
  }

  function enablePixReportIframeEdit(iframe, onDone) {
    if (!iframe) {
      if (typeof onDone === "function") onDone(false);
      return;
    }
    var attempts = 0;
    var maxAttempts = 80;
    var loadBound = false;
    function finish(enabled) {
      if (typeof onDone === "function") onDone(!!enabled);
    }
    function tryEnable() {
      attempts += 1;
      var enabled = false;
      try {
        var win = iframe.contentWindow;
        var doc = win && win.document;
        if (doc && (doc.readyState === "complete" || doc.readyState === "interactive") &&
            win.PixReportLayoutEdit && typeof win.PixReportLayoutEdit.enable === "function") {
          if (!win.PixReportLayoutEdit.isEditMode()) win.PixReportLayoutEdit.enable();
          enabled = win.PixReportLayoutEdit.isEditMode();
        }
      } catch (_directErr) {}
      if (!enabled) {
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({ type: "pix-report-enable-edit" }, "*");
          }
        } catch (_postErr) {}
        try {
          var winAfter = iframe.contentWindow;
          enabled = !!(winAfter && winAfter.PixReportLayoutEdit && winAfter.PixReportLayoutEdit.isEditMode());
        } catch (_checkErr) {}
      }
      if (enabled) {
        finish(true);
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryEnable, 100);
        return;
      }
      finish(false);
    }
    function bindLoadRetry() {
      if (loadBound) return;
      loadBound = true;
      iframe.addEventListener("load", function onFrameLoad() {
        iframe.removeEventListener("load", onFrameLoad);
        attempts = 0;
        tryEnable();
      });
    }
    try {
      var initialDoc = iframe.contentDocument;
      if (!initialDoc || initialDoc.readyState === "loading") bindLoadRetry();
    } catch (_loadErr) {
      bindLoadRetry();
    }
    tryEnable();
  }

  function PixReportDrawerView(props) {
    var React = props.React;
    var opts = props.opts;
    var useState = React.useState;
    var useEffect = React.useEffect;
    var useRef = React.useRef;
    var drawerBodyRef = useRef(null);
    var pendingEditRef = useRef(false);
    var phaseState = useState("generating");
    var phase = phaseState[0];
    var setPhase = phaseState[1];
    var editState = useState(false);
    var editing = editState[0];
    var setEditing = editState[1];

    function resolveReportIframe() {
      if (drawerBodyRef.current) {
        var localFrame = drawerBodyRef.current.querySelector("iframe[data-pix-report-frame]");
        if (localFrame) return localFrame;
      }
      return opts.iframeRef && opts.iframeRef.current ? opts.iframeRef.current : null;
    }

    function beginReportEdit() {
      pendingEditRef.current = true;
      enablePixReportIframeEdit(resolveReportIframe(), function (enabled) {
        if (enabled) {
          pendingEditRef.current = false;
          return;
        }
        pendingEditRef.current = false;
        setEditing(false);
      });
    }

    function handleEditClick() {
      setEditing(true);
    }

    function handleIframeLoad() {
      if (!pendingEditRef.current && !editing) return;
      beginReportEdit();
    }

    useEffect(function () {
      if (!opts.open) {
        pendingEditRef.current = false;
        setEditing(false);
      }
    }, [opts.open]);

    useEffect(function () {
      pendingEditRef.current = false;
      setEditing(false);
      if (opts.skipGeneration || opts.reportSrcDoc) {
        setPhase("ready");
        return undefined;
      }
      setPhase("generating");
      var timer = setTimeout(function () { setPhase("ready"); }, PIX_REPORT_GEN_MS);
      return function () { clearTimeout(timer); };
    }, [opts.open, opts.reportUrl, opts.reportSrcDoc, opts.skipGeneration]);

    useEffect(function () {
      if (phase !== "ready" || !editing) return undefined;
      beginReportEdit();
      return undefined;
    }, [phase, editing]);

    var closeBtnStyle = {
      border: "1px solid #cfcdc5",
      background: "#fff",
      borderRadius: "8px",
      width: "34px",
      height: "34px",
      cursor: "pointer",
      fontSize: "16px",
      color: "#5f5e5a",
      lineHeight: 1
    };

    var showSplash = phase === "generating";
    var isModal = opts.layout === "modal";
    var hasSideWings = !!(opts.sideWings && opts.sideWings.length);

    var panelInner = React.createElement(
      "div",
      {
        className: isModal
          ? "relative z-10 w-full max-w-[960px] h-[92vh] max-h-[92vh] overflow-hidden rounded-[14px] shadow-2xl border border-[#cfcdc5] flex flex-col pointer-events-auto"
          : "absolute top-0 right-0 z-10 h-full w-full max-w-[900px] shadow-2xl animate-drawerSlideIn overflow-hidden border-l border-[#cfcdc5] pointer-events-auto",
        style: isModal
          ? {
            background: "#eae8e2",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box"
          }
          : {
            background: "#eae8e2",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box"
          },
        onClick: function (e) { e.stopPropagation(); }
      },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "12px 16px",
              borderBottom: "1px solid #cfcdc5",
              background: "#f5f4f0",
              flexShrink: 0
            }
          },
          React.createElement(
            "div",
            null,
            React.createElement("p", {
              style: { margin: 0, fontSize: "14px", fontWeight: 800, color: "#1f1e1c" }
            }, opts.title),
            opts.subtitle
              ? React.createElement("p", {
                style: { margin: "2px 0 0", fontSize: "11px", color: "#898781" }
              }, opts.subtitle)
              : null
          ),
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "8px" } },
            phase === "ready" && !editing
              ? React.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: handleEditClick,
                    style: {
                      border: "1px solid #0C447C",
                      background: "#fff",
                      color: "#0C447C",
                      borderRadius: "8px",
                      padding: "7px 12px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }
                  },
                  "\u270E \uC218\uC815"
                )
              : null,
            editing
              ? React.createElement("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0C447C",
                  padding: "5px 10px",
                  background: "rgba(12,68,124,.08)",
                  borderRadius: "6px"
                }
              }, "\uD3B8\uC9D1 \uC911")
              : null,
            React.createElement(
              "button",
              {
                type: "button",
                "aria-label": "\uB2EB\uAE30",
                onClick: opts.onClose,
                style: closeBtnStyle
              },
              "\u2715"
            )
          )
        ),
        React.createElement(
          "div",
          {
            ref: drawerBodyRef,
            style: {
              position: "relative",
              flex: "1 1 auto",
              minHeight: isModal ? "480px" : 0,
              display: "flex",
              flexDirection: "column"
            }
          },
          React.createElement("iframe", {
            ref: opts.iframeRef,
            "data-pix-report-frame": "1",
            src: opts.reportSrcDoc ? undefined : opts.reportUrl,
            srcDoc: opts.reportSrcDoc || undefined,
            sandbox: opts.reportSrcDoc ? "allow-same-origin allow-scripts" : undefined,
            title: opts.iframeTitle || opts.title,
            onLoad: handleIframeLoad,
            style: {
              width: "100%",
              flex: "1 1 auto",
              minHeight: 0,
              border: 0,
              background: "#eae8e2",
              display: "block",
              visibility: showSplash ? "hidden" : "visible"
            }
          }),
          showSplash
            ? React.createElement(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#eae8e2",
                    zIndex: 2
                  }
                },
                React.createElement(
                  "div",
                  { style: { textAlign: "center", padding: "24px", maxWidth: "320px" } },
                  React.createElement("div", {
                    style: {
                      width: "44px",
                      height: "44px",
                      border: "3px solid #cfcdc5",
                      borderTopColor: "#0C447C",
                      borderRadius: "50%",
                      margin: "0 auto 16px",
                      animation: "pixReportSpin 0.9s linear infinite"
                    }
                  }),
                  React.createElement("p", {
                    style: { margin: 0, fontSize: "15px", fontWeight: 800, color: "#1f1e1c" }
                  }, "AI\uAC00 \uBCF4\uACE0\uC11C\uB97C \uC0DD\uC131 \uC911\uC785\uB2C8\uB2E4"),
                  React.createElement("p", {
                    style: { margin: "8px 0 0", fontSize: "12px", lineHeight: 1.6, color: "#898781" }
                  }, "\uD1B5\uACC4 \uB370\uC774\uD130\uB97C \uBD84\uC11D\uD574 \uBCF4\uACE0\uC11C \uCD08\uC548\uC744 \uC791\uC131\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.")
                )
              )
            : null
        ),
        phase === "ready" ? opts.footer || null : null
      );

    var panelNode = hasSideWings
      ? React.createElement(
          "div",
          {
            className: isModal ? "relative w-full max-w-[960px]" : "relative h-full w-full max-w-[900px] pointer-events-auto",
            style: { overflow: "visible" },
            onClick: function (e) { e.stopPropagation(); }
          },
          panelInner,
          renderPixReportSideWings(React, opts.sideWings)
        )
      : panelInner;

    return React.createElement(
      "div",
      {
        className: "fixed inset-0 z-[130] " + (isModal ? "flex items-center justify-center p-2 sm:p-3" : ""),
        style: hasSideWings && isModal ? { overflow: "visible" } : undefined
      },
      React.createElement("div", {
        className: "absolute inset-0 bg-black/45",
        onClick: opts.onClose
      }),
      panelNode
    );
  }

  function createPixReportIframeDrawer(React, opts) {
    if (!opts || !opts.open) return null;
    ensurePixReportDrawerCss();
    return React.createElement(PixReportDrawerView, { React: React, opts: Object.assign({ layout: "drawer" }, opts) });
  }

  function createPixReportIframeModal(React, opts) {
    if (!opts || !opts.open) return null;
    ensurePixReportDrawerCss();
    return React.createElement(PixReportDrawerView, { React: React, opts: Object.assign({ layout: "modal" }, opts) });
  }

  function createPixAiAnalysisDrawer(React, opts) {
    if (!opts || !opts.open) return null;
    if (opts.layout === "split") {
      ensurePixAiSplitCss();
      return React.createElement(
        "div",
        {
          className: "pix-ai-split-pane flex flex-col shrink-0 min-h-0 overflow-hidden border-l border-[#2d2c36] shadow-2xl",
          style: {
            background: "#17171c",
            color: "#e7e6ee",
            boxSizing: "border-box"
          }
        },
        React.createElement(
          "div",
          {
            style: {
              flex: "1 1 auto",
              minHeight: 0,
              overflow: "auto",
              padding: "22px 22px 18px",
              display: "flex",
              flexDirection: "column"
            }
          },
          opts.children
        )
      );
    }
    return React.createElement(
      "div",
      { className: "fixed inset-0 z-[120]" },
      React.createElement("div", {
        className: "absolute inset-0 bg-black/35",
        onClick: opts.onClose
      }),
      React.createElement(
        "div",
        {
          className: "absolute top-0 right-0 h-full w-full max-w-[640px] shadow-2xl overflow-hidden border-l border-[#2d2c36] flex flex-col",
          style: { background: "#17171c", color: "#e7e6ee", boxSizing: "border-box" },
          onClick: function (e) { e.stopPropagation(); }
        },
        React.createElement(
          "div",
          { style: { flex: "1 1 auto", minHeight: 0, overflow: "auto", padding: "22px 22px 18px" } },
          opts.children
        )
      )
    );
  }

  function resolvePixHistoryEntryVariant(entry, fallback) {
    if (!entry) return fallback || "voc";
    if (entry.historyVariant) return entry.historyVariant;
    if (entry.storageKey && entry.storageKey.indexOf("pix_voc_") === 0) return "voc";
    if (entry.storageKey && entry.storageKey.indexOf("pix_survey_") === 0) return "survey";
    return fallback || "voc";
  }

  function resolvePixHistoryModalCfg(entry, panelCfg) {
    var entryVariant = resolvePixHistoryEntryVariant(entry, panelCfg.variant);
    var tabCfg = typeof global.__pixAiReportArchiveTabConfig === "function"
      ? global.__pixAiReportArchiveTabConfig(entryVariant)
      : null;
    if (!tabCfg) return panelCfg;
    var exportCfg = entryVariant === "voc"
      ? {
        reportLabel: "VOC \uBCF4\uACE0\uC11C",
        wordFilename: "VOC_\uBD84\uC11D\uBCF4\uACE0\uC11C_2026-06.doc"
      }
      : {
        reportLabel: "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00 \uBCF4\uACE0\uC11C",
        wordFilename: "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00_\uBD84\uC11D\uBCF4\uACE0\uC11C_2026-06.doc"
      };
    return Object.assign({}, panelCfg, exportCfg, {
      reportUrl: tabCfg.reportUrl,
      reportTitle: tabCfg.reportTitle,
      reportSubtitle: tabCfg.reportSubtitle,
      iframeTitle: tabCfg.iframeTitle
    });
  }

  global.__pixDownloadHistorySnapshotPage = function (entry, kind, showToast) {
    if (!entry) return;
    var entryVariant = resolvePixHistoryEntryVariant(entry, "voc");
    var snapshot = kind === "stats" ? entry.statsSnapshot : entry.analysisSnapshot;
    if ((!snapshot || !snapshot.html) && kind === "stats" && typeof global.__pixCaptureReportStatsSnapshot === "function") {
      snapshot = global.__pixCaptureReportStatsSnapshot(entryVariant);
    }
    if ((!snapshot || !snapshot.html) && kind === "analysis" && typeof global.__pixCaptureReportAnalysisSnapshot === "function") {
      snapshot = global.__pixCaptureReportAnalysisSnapshot(entry.storageKey, entryVariant);
    }
    if (!snapshot || !snapshot.html) {
      notifyReportAction(
        kind === "stats" ? "다운로드할 통계 페이지가 없습니다." : "다운로드할 AI 분석 페이지가 없습니다.",
        showToast
      );
      return;
    }
    var doc = typeof global.__pixBuildArchiveSnapshotDoc === "function"
      ? global.__pixBuildArchiveSnapshotDoc(snapshot, kind)
      : snapshot.html;
    var period = String(entry.analysisPeriod || entry.period || entry.year || "report").replace(/\s+/g, "_");
    var prefix = entryVariant === "voc" ? "VOC" : "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00";
    var filename = kind === "stats"
      ? prefix + "_\uD1B5\uACC4_" + period + ".html"
      : prefix + "_AI\uBD84\uC11D_" + period + ".html";
    downloadReportBlob(filename, new Blob([doc], { type: "text/html;charset=utf-8" }));
    notifyReportAction((kind === "stats" ? "\uD1B5\uACC4" : "AI \uBD84\uC11D") + " \uD398\uC774\uC9C0\uB97C \uB2E4\uC6B4\uB85C\uB4DC\uD588\uC2B5\uB2C8\uB2E4.", showToast);
  };

  global.__pixDownloadHistoryReport = function (entry, showToast) {
    if (!entry) return;
    if (!entry.hasData || !entry.html) {
      notifyReportAction("\uB2E4\uC6B4\uB85C\uB4DC\uD560 \uBCF4\uACE0\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", showToast);
      return;
    }
    var entryVariant = resolvePixHistoryEntryVariant(entry, "voc");
    var html = typeof global.__pixSanitizeSavedReportHtml === "function"
      ? global.__pixSanitizeSavedReportHtml(entry.html)
      : entry.html;
    var period = String(entry.analysisPeriod || entry.period || entry.year || "report").replace(/\s+/g, "_");
    var prefix = entryVariant === "voc" ? "VOC" : "\uD658\uC790\uACBD\uD5D8\uD3C9\uAC00";
    var filename = prefix + "_\uBCF4\uACE0\uC11C_" + period + ".html";
    downloadReportBlob(filename, new Blob([html], { type: "text/html;charset=utf-8" }));
    notifyReportAction("\uBCF4\uACE0\uC11C\uB97C \uB2E4\uC6B4\uB85C\uB4DC\uD588\uC2B5\uB2C8\uB2E4.", showToast);
  };

  function registerPixAiStatisticsShell(deps, cfg) {
    var React = deps.React;
    var useState = deps.useState || React.useState;
    var useRef = deps.useRef || React.useRef;
    var useEffect = deps.useEffect || React.useEffect;
    var ReactDOM = deps.ReactDOM;
    cfg = cfg || {};
    return function PixAiStatisticsShell(props) {
      var _open = useState(false);
      var open = _open[0];
      var setOpen = _open[1];
      var _reportOpen = useState(false);
      var reportOpen = _reportOpen[0];
      var setReportOpen = _reportOpen[1];
      var _historyReportOpen = useState(false);
      var historyReportOpen = _historyReportOpen[0];
      var setHistoryReportOpen = _historyReportOpen[1];
      var _historyReportEntry = useState(null);
      var historyReportEntry = _historyReportEntry[0];
      var setHistoryReportEntry = _historyReportEntry[1];
      var _reportSrcDoc = useState(null);
      var reportSrcDoc = _reportSrcDoc[0];
      var setReportSrcDoc = _reportSrcDoc[1];
      var panelRef = useRef(null);
      var reportFrameRef = useRef(null);
      var historyReportFrameRef = useRef(null);
      var statsHostRef = useRef(null);
      var openModeRef = useRef("analysis");
      var openGlobal = cfg.variant === "voc" ? "openVocAiModal" : "openPxSurveyAiModal";
      var openReportGlobal = cfg.variant === "voc" ? "openVocAiReportModal" : "openPxSurveyAiReportModal";
      useEffect(function () {
        function onHistorySelected(ev) {
          var detail = ev && ev.detail;
          if (!detail || detail.panelVariant !== cfg.variant || !statsHostRef.current) return;
          var entry = detail.entry || {};
          var entryVariant = detail.variant || resolvePixHistoryEntryVariant(entry, cfg.variant);
          if (typeof global.__pixApplyStatsSnapshotToHost === "function") {
            global.__pixApplyStatsSnapshotToHost(statsHostRef.current, entry.statsSnapshot || null, entryVariant, props.showToast);
          }
        }
        function onHistoryCleared(ev) {
          var detail = ev && ev.detail;
          if (!detail || detail.panelVariant !== cfg.variant || !statsHostRef.current) return;
          if (typeof global.__pixApplyStatsSnapshotToHost === "function") {
            global.__pixApplyStatsSnapshotToHost(statsHostRef.current, null, cfg.variant, props.showToast);
          }
        }
        global.addEventListener("pix-report-history-selected", onHistorySelected);
        global.addEventListener("pix-report-history-cleared", onHistoryCleared);
        return function () {
          global.removeEventListener("pix-report-history-selected", onHistorySelected);
          global.removeEventListener("pix-report-history-cleared", onHistoryCleared);
        };
      }, [props.showToast]);
      useEffect(function () {
        function onHistoryReportOpen(ev) {
          var detail = ev && ev.detail;
          if (!detail || detail.panelVariant !== cfg.variant || !detail.entry) return;
          setHistoryReportEntry(detail.entry);
          setHistoryReportOpen(true);
        }
        function onHistoryReportClose(ev) {
          var detail = ev && ev.detail;
          if (!detail || detail.panelVariant !== cfg.variant) return;
          setHistoryReportOpen(false);
          setHistoryReportEntry(null);
        }
        global.addEventListener("pix-history-report-open", onHistoryReportOpen);
        global.addEventListener("pix-history-report-close", onHistoryReportClose);
        return function () {
          global.removeEventListener("pix-history-report-open", onHistoryReportOpen);
          global.removeEventListener("pix-history-report-close", onHistoryReportClose);
        };
      }, []);
      useEffect(function () {
        function openAnalysisModal() {
          openModeRef.current = "analysis";
          setReportOpen(false);
          setOpen(true);
        }
        function openReportModal() {
          setReportSrcDoc(null);
          setReportOpen(true);
        }
        registerPixAiModalHandler(cfg.variant, "analysis", openAnalysisModal);
        registerPixAiModalHandler(cfg.variant, "report", openReportModal);
        function onModalRequest(ev) {
          var detail = ev && ev.detail;
          if (!detail || detail.variant !== cfg.variant) return;
          if (detail.mode === "report") openReportModal();
          else openAnalysisModal();
        }
        global.addEventListener("pix-ai-modal-request", onModalRequest);
        var removeDocClick = null;
        if (cfg.variant === "voc") {
          function onClick(e) {
            var t = e.target;
            if (!t || !t.closest) return;
            var btn = t.closest(".voc-filter-action");
            if (!btn) return;
            e.preventDefault();
            openAnalysisModal();
          }
          document.addEventListener("click", onClick, true);
          removeDocClick = function () { document.removeEventListener("click", onClick, true); };
        }
        return function () {
          if (removeDocClick) removeDocClick();
          global.removeEventListener("pix-ai-modal-request", onModalRequest);
          registerPixAiModalHandler(cfg.variant, "analysis", null);
          registerPixAiModalHandler(cfg.variant, "report", null);
        };
      }, []);
      useEffect(function () {
        if (!open || !panelRef.current || typeof global.mountPxAiAnalysisPanel !== "function") return undefined;
        return global.mountPxAiAnalysisPanel(panelRef.current, {
          variant: cfg.variant,
          level: "basic",
          hideLevelSlider: true,
          showLoading: true,
          openMode: openModeRef.current,
          showToast: props.showToast,
          reportStorageKey: cfg.storageKey,
          onClose: function () {
            setOpen(false);
            setReportOpen(false);
            setHistoryReportOpen(false);
            setHistoryReportEntry(null);
          },
          onOpenReport: function () {
            setReportSrcDoc(null);
            setReportOpen(true);
          }
        });
      }, [open, props.showToast]);
      var actions = global.pixReportDocActions || {};
      var reportFooter = typeof global.createPixReportModalFooter === "function"
        ? global.createPixReportModalFooter(React, {
          onDraft: function () { actions.draft && actions.draft(cfg.storageKey, reportFrameRef.current, cfg.reportLabel, props.showToast); },
          onSave: function () { actions.save && actions.save(cfg.storageKey, reportFrameRef.current, cfg.reportLabel, props.showToast); },
          onWord: function () { actions.word && actions.word(cfg.wordFilename, reportFrameRef.current, props.showToast); },
          onPdf: function () { actions.pdf && actions.pdf(reportFrameRef.current, props.showToast); },
          onPrint: function () { actions.print && actions.print(reportFrameRef.current, props.showToast); }
        })
        : null;
      var aiDrawer = typeof global.createPixAiAnalysisDrawer === "function"
        ? global.createPixAiAnalysisDrawer(React, {
          layout: "split",
          open: open,
          onClose: function () {
            setOpen(false);
            setReportOpen(false);
            setHistoryReportOpen(false);
            setHistoryReportEntry(null);
          },
          children: React.createElement("div", {
            ref: panelRef,
            style: { width: "100%", height: "100%", minHeight: 0, flex: "1 1 auto" }
          })
        })
        : null;
      var historyEntry = historyReportEntry || {};
      var historyModalCfg = resolvePixHistoryModalCfg(historyEntry, cfg);
      var historyReportSrcDoc = historyEntry.hasData && historyEntry.html && typeof global.__pixSanitizeSavedReportHtml === "function"
        ? global.__pixSanitizeSavedReportHtml(historyEntry.html)
        : (historyEntry.hasData && historyEntry.html ? historyEntry.html : null);
      var historyStorageKey = historyEntry.storageKey || historyModalCfg.storageKey;
      var historyReportFooter = historyEntry.hasData && typeof global.createPixReportModalFooter === "function"
        ? global.createPixReportModalFooter(React, {
          onDraft: function () { actions.draft && actions.draft(historyStorageKey, historyReportFrameRef.current, historyModalCfg.reportLabel, props.showToast); },
          onSave: function () { actions.save && actions.save(historyStorageKey, historyReportFrameRef.current, historyModalCfg.reportLabel, props.showToast); },
          onWord: function () { actions.word && actions.word(historyModalCfg.wordFilename, historyReportFrameRef.current, props.showToast); },
          onPdf: function () { actions.pdf && actions.pdf(historyReportFrameRef.current, props.showToast); },
          onPrint: function () { actions.print && actions.print(historyReportFrameRef.current, props.showToast); }
        })
        : null;
      var historyReportModal = typeof global.createPixReportIframeModal === "function"
        ? global.createPixReportIframeModal(React, {
          open: historyReportOpen,
          onClose: function () { setHistoryReportOpen(false); setHistoryReportEntry(null); },
          title: historyEntry.title || historyModalCfg.reportTitle,
          subtitle: historyEntry.hasData
            ? historyModalCfg.reportSubtitle
            : (historyModalCfg.reportSubtitle + " · 템플릿 미리보기"),
          reportUrl: historyReportSrcDoc ? undefined : historyModalCfg.reportUrl,
          reportSrcDoc: historyReportSrcDoc || undefined,
          skipGeneration: true,
          iframeTitle: historyModalCfg.iframeTitle,
          iframeRef: historyReportFrameRef,
          footer: historyReportFooter,
          sideWings: [
            {
              key: "stats-download",
              label: "통계 페이지\n다운받기",
              title: "통계 페이지 HTML 다운로드",
              onClick: function () {
                if (typeof global.__pixDownloadHistorySnapshotPage === "function") {
                  global.__pixDownloadHistorySnapshotPage(historyEntry, "stats", props.showToast);
                }
              }
            },
            {
              key: "analysis-download",
              label: "분석 페이지\n다운받기",
              title: "AI 분석 페이지 HTML 다운로드",
              onClick: function () {
                if (typeof global.__pixDownloadHistorySnapshotPage === "function") {
                  global.__pixDownloadHistorySnapshotPage(historyEntry, "analysis", props.showToast);
                }
              }
            }
          ]
        })
        : null;
      var reportModal = typeof global.createPixReportIframeModal === "function"
        ? global.createPixReportIframeModal(React, {
          open: reportOpen,
          onClose: function () { setReportOpen(false); setReportSrcDoc(null); },
          title: cfg.reportTitle,
          subtitle: cfg.reportSubtitle,
          reportUrl: reportSrcDoc ? undefined : cfg.reportUrl,
          reportSrcDoc: reportSrcDoc || undefined,
          skipGeneration: !!reportSrcDoc || !!cfg.reportUrl,
          iframeTitle: cfg.iframeTitle,
          iframeRef: reportFrameRef,
          footer: reportFooter
        })
        : null;
      function portalize(node) {
        if (!node) return null;
        return typeof ReactDOM !== "undefined" && ReactDOM.createPortal
          ? ReactDOM.createPortal(node, document.body)
          : node;
      }
      ensurePixAiSplitCss();
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          {
            className: "pix-ai-stats-shell" + (open ? " is-open" : ""),
            style: open ? undefined : { width: "100%" }
          },
          React.createElement(
            "div",
            {
              ref: statsHostRef,
              className: "pix-ai-stats-shell-pane stats",
              style: { width: "100%" }
            },
            props.children
          ),
          open ? aiDrawer : null
        ),
        portalize(reportModal),
        portalize(historyReportModal)
      );
    };
  }

  function createReportModalFooter(React, opts) {
    opts = opts || {};
    var useState = React.useState;
    var useEffect = React.useEffect;

    function btn(label, onClick, primary, extraStyle) {
      return React.createElement(
        "button",
        {
          type: "button",
          onClick: onClick,
          style: Object.assign({
            border: primary ? "1px solid #0C447C" : "1px solid #cfcdc5",
            background: primary ? "#0C447C" : "#fff",
            color: primary ? "#fff" : "#1f1e1c",
            borderRadius: "8px",
            padding: "8px 14px",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            lineHeight: 1.2
          }, extraStyle || {})
        },
        label
      );
    }

    function ReportFooter() {
      var menuState = useState(false);
      var menuOpen = menuState[0];
      var setMenuOpen = menuState[1];

      useEffect(function () {
        if (!menuOpen) return undefined;
        function onDocClick() { setMenuOpen(false); }
        document.addEventListener("click", onDocClick);
        return function () { document.removeEventListener("click", onDocClick); };
      }, [menuOpen]);

      function menuItem(label, onClick) {
        return React.createElement(
          "button",
          {
            type: "button",
            onClick: function (e) {
              e.stopPropagation();
              setMenuOpen(false);
              if (onClick) onClick();
            },
            style: {
              display: "block",
              width: "100%",
              border: 0,
              background: "transparent",
              textAlign: "left",
              padding: "8px 12px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              color: "#1f1e1c"
            },
            onMouseEnter: function (e) { e.currentTarget.style.background = "rgba(12,68,124,.08)"; },
            onMouseLeave: function (e) { e.currentTarget.style.background = "transparent"; }
          },
          label
        );
      }

      return React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
            padding: "12px 16px",
            borderTop: "1px solid #cfcdc5",
            background: "#f5f4f0",
            flexShrink: 0
          }
        },
        React.createElement(
          "div",
          { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
          btn("임시저장", opts.onDraft),
          btn("저장", opts.onSave, true)
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" } },
          React.createElement(
            "div",
            { style: { position: "relative" } },
            btn("다운로드 ▾", function (e) {
              e.stopPropagation();
              setMenuOpen(function (v) { return !v; });
            }),
            menuOpen
              ? React.createElement(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      right: 0,
                      bottom: "calc(100% + 6px)",
                      minWidth: "132px",
                      background: "#fff",
                      border: "1px solid #cfcdc5",
                      borderRadius: "8px",
                      boxShadow: "0 8px 20px rgba(0,0,0,.12)",
                      overflow: "hidden",
                      zIndex: 40
                    },
                    onClick: function (e) { e.stopPropagation(); }
                  },
                  menuItem("워드 (.doc)", opts.onWord),
                  menuItem("PDF (.pdf)", opts.onPdf)
                )
              : null
          ),
          btn("인쇄", opts.onPrint)
        )
      );
    }

    return React.createElement(ReportFooter);
  }

  global.createPixReportIframeDrawer = createPixReportIframeDrawer;
  global.createPixReportIframeModal = createPixReportIframeModal;
  global.createPixAiAnalysisDrawer = createPixAiAnalysisDrawer;
  global.registerPixAiStatisticsShell = registerPixAiStatisticsShell;
  global.createPixReportModalFooter = createReportModalFooter;
  global.enablePixReportIframeEdit = enablePixReportIframeEdit;

  global.mountPxAiAnalysisPanel = mountPxAiAnalysisPanel;
  global.__pixSanitizeSavedReportHtml = sanitizeSavedReportHtml;
  global.mountPxAiStrengthPicker = mountPxAiStrengthPicker;
  global.registerPxAiAnalysisPanel = registerPxAiAnalysisPanel;
  global.registerPxSurveyAnalyticsSection = registerPxSurveyAnalyticsSection;
})(typeof window !== "undefined" ? window : global);