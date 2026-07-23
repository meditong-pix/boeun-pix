
      (function () {
        if (window.__VOC_INBOX_RESTORE_V2__) return;
        window.__VOC_INBOX_RESTORE_V2__ = true;

        const CHANNEL_STYLE = {
          "메디통 픽스(앱)": "bg-blue-50 text-blue-700 border-blue-200",
          "고객의견카드": "bg-emerald-50 text-emerald-700 border-emerald-200",
          "직접 전화": "bg-amber-50 text-amber-700 border-amber-200",
          "카카오톡·채널톡": "bg-pink-50 text-pink-700 border-pink-200",
          "홈페이지": "bg-slate-50 text-slate-700 border-slate-200",
          "현장 상담": "bg-indigo-50 text-indigo-700 border-indigo-200",
          "기타 만족도 조사": "bg-violet-50 text-violet-700 border-violet-200",
          "기타": "bg-gray-50 text-gray-700 border-gray-200",
        };
        const getVocTaxonomyClassification = (text) => {
          try {
            if (window.__vocKeywordTaxonomyApi && typeof window.__vocKeywordTaxonomyApi.classify === "function") {
              return window.__vocKeywordTaxonomyApi.classify(text);
            }
          } catch (e) {}
          return { category: "기타", keywords: [] };
        };

        const UPLOAD_ACCEPT = ".xlsx,.xls,.csv";
        const UPLOAD_TEMPLATE_NAME = "VOC업로드양식_통합.csv";
        const UPLOAD_TEMPLATE_HEADER =
          "channel,content,voc_type_raw,received_at,patient_name,patient_ward,patient_age_group,staff_name,staff_dept";
        const UPLOAD_TEMPLATE_SAMPLES = [
          ["카카오톡", "회진 설명이 친절했습니다.", "인적응대관련", "2026-07-01 09:30", "김OO", "51병동", "40대", "", ""],
          ["전화", "대기 안내가 부족했습니다.", "", "2026-07-01 10:15", "", "52병동", "30대", "", ""],
        ];

        const mockClassifyUploadRows = () => {
          const channels = ["카카오톡", "전화", "현장접수", "고객의견카드", "이메일"];
          const taxonomy =
            window.__vocKeywordTaxonomyApi && typeof window.__vocKeywordTaxonomyApi.getAll === "function"
              ? window.__vocKeywordTaxonomyApi.getAll()
              : [{ category: "기타", keywords: ["기타 의견"] }];
          const rows = [];
          for (let i = 0; i < 10; i++) {
            const ch = channels[i % channels.length];
            const isStaffPraise = i === 2 || i === 5;
            const isUnclassified = i === 8;
            const isNegativeStaff = i === 7;
            const taxonomyGroup = taxonomy[i % taxonomy.length];
            const matchedKeyword = taxonomyGroup.keywords[i % taxonomyGroup.keywords.length];
            rows.push({
              id: mkVocId() + "-" + i,
              channel: ch,
              receivedAt: nowText(),
              type: isStaffPraise && !isNegativeStaff ? "칭찬" : isUnclassified ? "미분류" : "불편",
              classification: isUnclassified
                ? "미분류"
                : isStaffPraise && !isNegativeStaff
                ? "직원칭찬"
                : "병원생활",
              category: taxonomyGroup.category,
              keywords: [matchedKeyword],
              wardDept: `${["51병동", "52병동", "6A병동"][i % 3]} / ${["내과", "외과", "정형외과"][i % 3]}`,
              patientName: i % 4 === 0 ? "" : "익명",
              summary: `[${ch}] ${matchedKeyword} 관련 ${isUnclassified ? "미분류 보관" : isStaffPraise ? "직원 칭찬" : "VOC 접수"} (${i + 1})`,
              staffName: isStaffPraise && !isNegativeStaff ? "김간호" : "",
            });
          }
          return rows;
        };

        const summarizeUploadRows = (rows) => {
          const hospitalLife = rows.filter((r) => r.classification === "병원생활").length;
          const staffPraise = rows.filter((r) => r.classification === "직원칭찬").length;
          const unclassified = rows.filter((r) => r.classification === "미분류").length;
          const success = hospitalLife + staffPraise;
          const error = 0;
          return {
            total: rows.length,
            hospitalLife,
            staffPraise,
            unclassified,
            error,
            success,
          };
        };

        const nowText = () => {
          const d = new Date();
          const p = (n) => String(n).padStart(2, "0");
          return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
        };
        const nowInput = () => {
          const d = new Date();
          const p = (n) => String(n).padStart(2, "0");
          return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
        };
        const mkVocId = () => (typeof mkId === "function" ? mkId("VOC") : `VOC-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`);

        const getEnabledManualChannels = () => {
          try {
            if (window.__vocChannelsApi && typeof window.__vocChannelsApi.getEnabledManual === "function") {
              const rows = window.__vocChannelsApi.getEnabledManual();
              if (Array.isArray(rows) && rows.length) return rows;
            }
          } catch (e) {}
          return ["고객의견카드", "직접 전화", "카카오톡·채널톡", "홈페이지", "현장 상담", "기타 만족도 조사", "기타"];
        };

        const buildRows = () => [
          { id: "VOC-240701", receiptNo: "VOC-240701", receivedAt: "2026-07-01 09:12", registeredAt: "2026-07-01 09:12", ward: "51병동", deptDoctor: "내과/김의사", patient: "김OO", channel: "메디통 픽스(앱)", type: "칭찬", summary: "회진 설명이 친절했습니다.", status: "접수", attachments: [] },
          { id: "VOC-240702", receiptNo: "VOC-240702", receivedAt: "2026-07-01 10:01", registeredAt: "2026-07-01 10:01", ward: "52병동", deptDoctor: "외과/이의사", patient: "이OO", channel: "고객의견카드", type: "불편", summary: "대기 안내가 부족했습니다.", status: "처리중", attachments: [] },
          { id: "VOC-240703", receiptNo: "VOC-240703", receivedAt: "2026-07-01 10:25", registeredAt: "2026-07-01 10:25", ward: "6A병동", deptDoctor: "정형외과/박의사", patient: "박OO", channel: "직접 전화", type: "칭찬", summary: "간호 응대가 세심했습니다.", status: "완료", attachments: [] },
          { id: "VOC-240704", receiptNo: "VOC-240704", receivedAt: "2026-07-01 11:44", registeredAt: "2026-07-01 11:44", ward: "7A병동", deptDoctor: "신경과/정의사", patient: "정OO", channel: "카카오톡·채널톡", type: "불편", summary: "병실 소음이 큽니다.", status: "처리중", attachments: [] },
          { id: "VOC-240705", receiptNo: "VOC-240705", receivedAt: "2026-07-01 12:20", registeredAt: "2026-07-01 12:20", ward: "5C병동", deptDoctor: "내과/최의사", patient: "최OO", channel: "홈페이지", type: "복합", summary: "앱 안내는 좋았지만 수납 대기가 길었습니다.", status: "접수", attachments: [] },
          { id: "VOC-240706", receiptNo: "VOC-240706", receivedAt: "2026-07-01 13:08", registeredAt: "2026-07-01 13:08", ward: "51병동", deptDoctor: "내과/김의사", patient: "익명", channel: "전화", type: "미분류", summary: "그냥 그랬어요", status: "미분류", unclassifiedReason: "감정판단불가", unclassifiedAction: "원문 확인 후 담당자가 좋아요/불편/복합 중 직접 선택", manualReviewed: false, attachments: [] },
          { id: "VOC-240707", receiptNo: "VOC-240707", receivedAt: "2026-07-01 14:25", registeredAt: "2026-07-01 14:25", ward: "5병동", deptDoctor: "내과/김의사", patient: "익명", channel: "고객의견카드", type: "미분류", summary: "간호사 응대도 친절하고 병실 환경도 쾌적한데 응답 속도가 너무 느려요", status: "미분류", unclassifiedReason: "유형 판정 신뢰도 미달", unclassifiedAction: "긍정·불편 내용이 함께 포함되어 있어 담당자가 유형을 직접 선택", manualReviewed: false, attachments: [] },
        ].map((row) => {
          const classified = getVocTaxonomyClassification(row.summary);
          return { ...row, category: classified.category, keywords: classified.keywords };
        });

        const UNCLASSIFIED_REASON_ACTION = {
          감정판단불가: "원문 확인 후 담당자가 좋아요/불편/복합 중 직접 선택",
          직원특정불가: "병원생활 좋아요로 반영하거나 직원명을 수동 입력 후 직원칭찬으로 편입",
          유형매핑실패: "매핑 테이블 규칙을 확인하고 적절한 유형으로 재분류",
          내용부족: "원문 보완 요청 또는 미분류 유지",
          병원생활직원혼재: "주요 의도 기준으로 확정하거나 분리 등록 검토",
        };

        const VocRegisterModalV2 = ({ open, onClose, onSubmit, onBulkSubmit, showToast }) => {
          const channels = getEnabledManualChannels();
          const PATIENT_NAME_OPTIONS = ["홍길동", "김민수", "이서연", "박지훈", "최유진"];
          const REG_NO_OPTIONS = ["20261234", "20260102", "20260315", "20260420", "20260518"];
          const RELATION_OPTIONS = ["본인", "가족", "기타"];
          const GENDER_OPTIONS = ["남", "여"];
          const PHONE_OPTIONS = ["010-1234-5678", "010-2345-6789", "010-3456-7890", "010-4567-8901", "010-5678-9012"];
          const WARD_OPTIONS = ["5병동", "51병동", "52병동", "6A병동", "7A병동"];
          const DEPT_OPTIONS = ["내과", "외과", "정형외과", "신경과", "심장내과"];
          const DOCTOR_OPTIONS = ["김의사", "이의사", "박의사", "정의사", "최의사"];
          const [tab, setTab] = React.useState("direct");
          const [channel, setChannel] = React.useState(channels[0] || "고객의견카드");
          const [staffDept, setStaffDept] = React.useState(DEPT_OPTIONS[0]);
          const [staffName, setStaffName] = React.useState("");
          const [patientName, setPatientName] = React.useState(PATIENT_NAME_OPTIONS[0]);
          const [patientRegNo, setPatientRegNo] = React.useState(REG_NO_OPTIONS[0]);
          const [patientRelation, setPatientRelation] = React.useState(RELATION_OPTIONS[0]);
          const [patientGender, setPatientGender] = React.useState(GENDER_OPTIONS[0]);
          const [patientBirth, setPatientBirth] = React.useState("1990-01-01");
          const [patientPhone, setPatientPhone] = React.useState(PHONE_OPTIONS[0]);
          const [ward, setWard] = React.useState(WARD_OPTIONS[0]);
          const [dept, setDept] = React.useState(DEPT_OPTIONS[0]);
          const [doctor, setDoctor] = React.useState(DOCTOR_OPTIONS[0]);
          const [isAnonymous, setIsAnonymous] = React.useState(false);
          const [receivedAt, setReceivedAt] = React.useState(nowInput());
          const [content, setContent] = React.useState("");
          const [history, setHistory] = React.useState([]);
          const [loading, setLoading] = React.useState(false);
          const [uploadSummary, setUploadSummary] = React.useState("");

          if (!open) return null;

          const submitDirect = () => {
            const txt = String(content || "").trim();
            if (!channel || !receivedAt || !txt) {
              showToast && showToast("채널/접수일시/원문 내용을 확인해 주세요.");
              return;
            }
            onSubmit &&
              onSubmit({
                channel,
                patientName: isAnonymous ? "익명" : patientName || "신규 등록",
                patientRegNo: isAnonymous ? "-" : patientRegNo,
                patientRelation,
                patientGender,
                patientBirth,
                patientPhone,
                receivedAt: String(receivedAt).replace("T", " "),
                type: "미분류",
                wardDept: `${ward} / ${dept} / ${doctor}`,
                staffDept: String(staffDept || "").trim(),
                staffName: String(staffName || "").trim(),
                summary: txt,
              });
            onClose && onClose();
          };

          const onDownload = () => {
            const lines = [UPLOAD_TEMPLATE_HEADER].concat(
              UPLOAD_TEMPLATE_SAMPLES.map((row) =>
                row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
              )
            );
            const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = UPLOAD_TEMPLATE_NAME;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast && showToast("엑셀 양식을 다운로드했습니다.");
          };

          const onUpload = (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            setLoading(true);
            setUploadSummary("");
            const id = mkVocId();
            setTimeout(() => {
              const classifiedRows = mockClassifyUploadRows();
              const stats = summarizeUploadRows(classifiedRows);
              const item = {
                id,
                fileName: file.name,
                uploadedAt: nowText().slice(5),
                totalCount: stats.total,
                hospitalLifeCount: stats.hospitalLife,
                staffPraiseCount: stats.staffPraise,
                unclassifiedCount: stats.unclassified,
                errorCount: stats.error,
                successCount: stats.success,
                status: stats.error > 0 ? "오류일부" : "완료",
              };
              setHistory((prev) => [item, ...prev]);
              setLoading(false);
              const summary = `성공 ${stats.success}건 (병원생활 ${stats.hospitalLife}건 / 직원칭찬 ${stats.staffPraise}건) · 미분류 ${stats.unclassified}건 · 오류 ${stats.error}건`;
              setUploadSummary(summary);
              showToast && showToast(summary);
              if (onBulkSubmit) {
                onBulkSubmit(
                  classifiedRows.map((row) => ({
                    id: row.id,
                    channel: row.channel,
                    receivedAt: row.receivedAt,
                    type: row.type,
                    classification: row.classification,
                    category: row.category,
                    keywords: row.keywords,
                    wardDept: row.wardDept,
                    patientName: row.patientName || "익명",
                    staffName: row.staffName,
                    summary: row.summary,
                  }))
                );
              }
              if (e.target) e.target.value = "";
            }, 1200);
          };

          const directBody = React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "채널"), React.createElement("select", { value: channel, onChange: (e) => setChannel(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold" }, channels.map((c) => React.createElement("option", { key: c, value: c }, c)))),
            React.createElement(
              "div",
              null,
              React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "직원 정보"),
              React.createElement(
                "div",
                { className: "grid grid-cols-1 md:grid-cols-2 gap-2" },
                React.createElement(
                  "select",
                  { value: staffDept, onChange: (e) => setStaffDept(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" },
                  DEPT_OPTIONS.map((o) => React.createElement("option", { key: "staff-dept-" + o, value: o }, o))
                ),
                React.createElement("input", { value: staffName, onChange: (e) => setStaffName(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold", placeholder: "직원명 (선택 입력)" })
              )
            ),
            React.createElement(
              "div",
              { className: "rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-2" },
              React.createElement("div", { className: "flex items-center justify-between" }, React.createElement("p", { className: "text-[12px] font-black text-gray-700" }, "환자 정보"), React.createElement("label", { className: "inline-flex items-center gap-1.5 text-[12px] font-black text-gray-600 cursor-pointer" }, React.createElement("input", { type: "checkbox", className: "accent-emerald-600", checked: isAnonymous, onChange: (e) => setIsAnonymous(e.target.checked) }), "익명")),
              React.createElement(
                React.Fragment,
                null,
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2" }, React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "이름"), React.createElement("select", { value: patientName, onChange: (e) => setPatientName(e.target.value), disabled: isAnonymous, className: `w-full border rounded-lg px-3 py-2 text-[13px] font-bold bg-white ${isAnonymous ? "border-gray-100 text-gray-400 bg-gray-100 cursor-not-allowed" : "border-gray-200"}` }, PATIENT_NAME_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o)))), React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "등록번호"), React.createElement("select", { value: patientRegNo, onChange: (e) => setPatientRegNo(e.target.value), disabled: isAnonymous, className: `w-full border rounded-lg px-3 py-2 text-[13px] font-bold bg-white ${isAnonymous ? "border-gray-100 text-gray-400 bg-gray-100 cursor-not-allowed" : "border-gray-200"}` }, REG_NO_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o)))), React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "환자와의 관계"), React.createElement("select", { value: patientRelation, onChange: (e) => setPatientRelation(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" }, RELATION_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o))))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2" }, React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "성별"), React.createElement("select", { value: patientGender, onChange: (e) => setPatientGender(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" }, GENDER_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o)))), React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "생년월일"), React.createElement("input", { type: "date", value: patientBirth, onChange: (e) => setPatientBirth(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" })), React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "휴대폰 번호"), React.createElement("select", { value: patientPhone, onChange: (e) => setPatientPhone(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" }, PHONE_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o))))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2" }, React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "병동"), React.createElement("select", { value: ward, onChange: (e) => setWard(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" }, WARD_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o)))), React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "진료과"), React.createElement("select", { value: dept, onChange: (e) => setDept(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" }, DEPT_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o)))), React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "담당의사"), React.createElement("select", { value: doctor, onChange: (e) => setDoctor(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold bg-white" }, DOCTOR_OPTIONS.map((o) => React.createElement("option", { key: o, value: o }, o))))),
                isAnonymous
                  ? React.createElement("p", { className: "text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2" }, "익명 선택 시 이름/등록번호만 비활성화됩니다.")
                  : null
              )
            ),
            React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "접수일시"), React.createElement("input", { type: "datetime-local", value: receivedAt, onChange: (e) => setReceivedAt(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold" })),
            React.createElement("div", null, React.createElement("p", { className: "text-[12px] font-black text-gray-600 mb-1" }, "원문 내용"), React.createElement("textarea", { rows: 4, value: content, onChange: (e) => setContent(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold", placeholder: "파일 첨부 없이 직접 입력도 가능합니다." })),
            React.createElement("div", { className: "flex justify-end" }, React.createElement("button", { type: "button", onClick: submitDirect, className: "px-4 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-black hover:bg-blue-700" }, "등록"))
          );

          const fileBody = React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement(
              "div",
              { className: "flex items-center justify-end" },
              React.createElement(
                "button",
                {
                  type: "button",
                  onClick: onDownload,
                  className: "px-3 py-2 rounded-lg border border-gray-200 bg-white text-[12px] font-black text-gray-700 hover:bg-gray-50",
                },
                "엑셀 양식 다운로드"
              )
            ),
            React.createElement(
              "div",
              { className: "rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 space-y-2" },
              React.createElement("input", {
                type: "file",
                accept: UPLOAD_ACCEPT,
                onChange: onUpload,
                className: "block w-full text-[12px]",
              }),
              React.createElement(
                "p",
                { className: "text-[11px] font-bold text-gray-500 leading-relaxed" },
                "카카오톡, 전화, 현장접수 등 여러 채널이 섞인 파일도 한 번에 업로드할 수 있습니다. 채널은 엑셀의 channel 컬럼에서 행 단위로 읽어 AI가 자동 분류합니다."
              ),
              loading
                ? React.createElement("p", { className: "text-[11px] font-black text-blue-700" }, "파일 분석 및 AI 분류 중...")
                : null,
              uploadSummary
                ? React.createElement(
                    "p",
                    { className: "text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2" },
                    uploadSummary
                  )
                : null
            ),
            React.createElement(
              "div",
              { className: "rounded-xl border border-gray-200 overflow-hidden" },
              React.createElement(
                "div",
                { className: "px-3 py-2 bg-gray-50 text-[12px] font-black text-gray-700" },
                "업로드 내역"
              ),
              React.createElement(
                "table",
                { className: "w-full text-[11px]" },
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    { className: "bg-gray-50 text-gray-500" },
                    ["파일명", "업로드 일시", "건수(전체/병원생활/직원칭찬/미분류)", "상태"].map((h) =>
                      React.createElement("th", { key: h, className: "px-3 py-2 text-left font-black" }, h)
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  history.length
                    ? history.map((h) =>
                        React.createElement(
                          "tr",
                          { key: h.id, className: "border-t border-gray-100" },
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-700" }, h.fileName),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-600" }, h.uploadedAt),
                          React.createElement(
                            "td",
                            { className: "px-3 py-2 font-black text-gray-700 whitespace-nowrap" },
                            `${h.totalCount} (${h.hospitalLifeCount}/${h.staffPraiseCount}/${h.unclassifiedCount})`
                          ),
                          React.createElement(
                            "td",
                            {
                              className: `px-3 py-2 font-black ${
                                h.status === "완료"
                                  ? "text-emerald-600"
                                  : h.status === "오류일부"
                                  ? "text-rose-600"
                                  : "text-blue-600"
                              }`,
                            },
                            h.status
                          )
                        )
                      )
                    : React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "td",
                          { colSpan: 4, className: "px-3 py-5 text-center text-gray-400 font-bold" },
                          "업로드 내역이 없습니다."
                        )
                      )
                )
              )
            )
          );

          return React.createElement(
            "div",
            { className: "fixed inset-0 z-[160] flex items-center justify-center p-4" },
            React.createElement("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm animate-backdropIn", onClick: onClose }),
            React.createElement(
              "div",
              { className: "relative w-full max-w-3xl max-h-[86vh] rounded-2xl border border-gray-200 bg-white shadow-2xl animate-modalIn flex flex-col" },
              React.createElement("div", { className: "px-5 py-3.5 border-b border-gray-100 flex items-center justify-between" }, React.createElement("p", { className: "text-[15px] font-black text-gray-800" }, "VOC 등록"), React.createElement("button", { type: "button", onClick: onClose, className: "text-[12px] font-black text-gray-500" }, "닫기")),
              React.createElement("div", { className: "p-5 overflow-y-auto space-y-3" }, React.createElement("div", { className: "inline-flex border-b border-gray-200" }, React.createElement("button", { type: "button", onClick: () => setTab("direct"), className: `px-3 py-2 text-[12px] font-black ${tab === "direct" ? "text-blue-700 border-b-2 border-blue-600" : "text-gray-400"}` }, "직접 입력"), React.createElement("button", { type: "button", onClick: () => setTab("file"), className: `px-3 py-2 text-[12px] font-black ${tab === "file" ? "text-blue-700 border-b-2 border-blue-600" : "text-gray-400"}` }, "파일 업로드")), tab === "direct" ? directBody : fileBody)
            )
          );
        };

        const VocInboxPageV2Restore = ({ showToast }) => {
          const [rows, setRows] = React.useState(() => buildRows());
          const [registerOpen, setRegisterOpen] = React.useState(false);
          const [nameQuery, setNameQuery] = React.useState("");
          const [typeFilter, setTypeFilter] = React.useState("전체 유형");
          const [wardFilter, setWardFilter] = React.useState("전체 병동");
          const [channelFilter, setChannelFilter] = React.useState("전체 채널");
          const [deptFilter, setDeptFilter] = React.useState("전체 진료과");
          const [doctorFilter, setDoctorFilter] = React.useState("전체 담당의사");
          const [categoryFilter, setCategoryFilter] = React.useState("전체 카테고리");
          const [keywordQuery, setKeywordQuery] = React.useState("");
          const [datePreset, setDatePreset] = React.useState("전체 기간");
          const [dateFrom, setDateFrom] = React.useState("");
          const [dateTo, setDateTo] = React.useState("");
          const [expandedRowId, setExpandedRowId] = React.useState(null);
          const VOC_DISPLAY_TYPES = ["긍정", "부정", "미분류"];
          const toDisplayType = (t) => ({ 칭찬: "긍정", 불편: "부정", 복합: "부정", 미분류: "미분류" }[t] || "미분류");
          const fromDisplayType = (t) => ({ 긍정: "칭찬", 부정: "불편", 미분류: "미분류" }[t] || "미분류");
          const typeSelectClass = (displayType) =>
            "rounded-full border-none px-2.5 py-0.5 text-[10px] font-black cursor-pointer appearance-none pr-6 " +
            (displayType === "긍정"
              ? "bg-emerald-50 text-emerald-700"
              : displayType === "부정"
              ? "bg-rose-50 text-rose-700"
              : "bg-amber-50 text-amber-700");
          const onChangeRowType = (rowId, displayType) => {
            const nextType = fromDisplayType(displayType);
            setRows((prev) =>
              prev.map((row) =>
                row.id === rowId ? { ...row, type: nextType, status: nextType === "미분류" ? "미분류" : "접수" } : row
              )
            );
          };
          const channels = React.useMemo(() => ["전체 채널"].concat(getEnabledManualChannels().concat(["메디통 픽스(앱)"])), [rows.length]);
          const typeOptions = React.useMemo(
            () =>
              ["전체 유형"].concat(
                Array.from(new Set(rows.map((r) => r.type).filter(Boolean))).sort(function (a, b) {
                  var order = { 칭찬: 1, 불편: 2, 복합: 3, 미분류: 4 };
                  return (order[a] || 99) - (order[b] || 99);
                })
              ),
            [rows]
          );
          const wards = React.useMemo(() => ["전체 병동"].concat(Array.from(new Set(rows.map((r) => r.ward)))), [rows]);
          const categoryOptions = React.useMemo(
            () => [
              "전체 카테고리",
              ...((window.__vocKeywordTaxonomyApi && window.__vocKeywordTaxonomyApi.getBase
                ? window.__vocKeywordTaxonomyApi.getBase()
                : []
              ).map((group) => group.category)),
            ],
            []
          );
          const parseDeptDoctor = (value) => {
            const parts = String(value || "")
              .split("/")
              .map((x) => x.trim())
              .filter(Boolean);
            if (parts.length >= 3) return { dept: parts[1], doctor: parts[2] };
            if (parts.length >= 2) return { dept: parts[0], doctor: parts[1] };
            return { dept: "", doctor: "" };
          };
          const deptOptions = React.useMemo(
            () =>
              ["전체 진료과"].concat(
                Array.from(
                  new Set(
                    rows
                      .map((r) => parseDeptDoctor(r.deptDoctor).dept)
                      .filter(Boolean)
                  )
                )
              ),
            [rows]
          );
          const doctorOptions = React.useMemo(
            () =>
              ["전체 담당의사"].concat(
                Array.from(
                  new Set(
                    rows
                      .map((r) => parseDeptDoctor(r.deptDoctor).doctor)
                      .filter(Boolean)
                  )
                )
              ),
            [rows]
          );
          const formatDateInput = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          const applyDatePreset = (preset) => {
            setDatePreset(preset);
            if (preset === "전체 기간") {
              setDateFrom("");
              setDateTo("");
              return;
            }
            const end = new Date();
            const start = new Date(end);
            if (preset === "오늘") {
              setDateFrom(formatDateInput(start));
              setDateTo(formatDateInput(end));
              return;
            }
            if (preset === "최근 7일") start.setDate(start.getDate() - 6);
            if (preset === "최근 30일") start.setDate(start.getDate() - 29);
            if (preset === "이번 달") start.setDate(1);
            setDateFrom(formatDateInput(start));
            setDateTo(formatDateInput(end));
          };
          const filtered = React.useMemo(() => {
            const q = String(nameQuery || "").trim().toLowerCase();
            const keywordQ = String(keywordQuery || "").trim().toLowerCase();
            return rows
              .filter((r) => {
                const receivedDate = String(r.receivedAt || "").slice(0, 10);
                if ((dateFrom || dateTo) && !/^\d{4}-\d{2}-\d{2}$/.test(receivedDate)) return false;
                if (dateFrom && receivedDate < dateFrom) return false;
                if (dateTo && receivedDate > dateTo) return false;
                return true;
              })
              .filter((r) => typeFilter === "전체 유형" || r.type === typeFilter)
              .filter((r) => wardFilter === "전체 병동" || r.ward === wardFilter)
              .filter((r) => channelFilter === "전체 채널" || r.channel === channelFilter)
              .filter((r) => {
                const parsed = parseDeptDoctor(r.deptDoctor);
                return deptFilter === "전체 진료과" || parsed.dept === deptFilter;
              })
              .filter((r) => {
                const parsed = parseDeptDoctor(r.deptDoctor);
                return doctorFilter === "전체 담당의사" || parsed.doctor === doctorFilter;
              })
              .filter((r) => categoryFilter === "전체 카테고리" || r.category === categoryFilter)
              .filter(
                (r) =>
                  !keywordQ ||
                  String(r.category || "").toLowerCase().includes(keywordQ) ||
                  (Array.isArray(r.keywords) && r.keywords.some((keyword) => String(keyword).toLowerCase().includes(keywordQ))) ||
                  String(r.summary || "").toLowerCase().includes(keywordQ)
              )
              .filter((r) => !q || String(r.patient || "").toLowerCase().includes(q))
              .slice()
              .sort(function (a, b) {
                var typeOrder = { 칭찬: 1, 불편: 2, 복합: 3, 미분류: 4 };
                var typeDiff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
                if (typeFilter === "전체 유형" && typeDiff !== 0) return typeDiff;
                return new Date(b.receivedAt || 0).getTime() - new Date(a.receivedAt || 0).getTime();
              });
          }, [rows, typeFilter, wardFilter, channelFilter, deptFilter, doctorFilter, categoryFilter, keywordQuery, nameQuery, dateFrom, dateTo]);
          const extractKeywords = (text) => {
            const source = String(text || "")
              .replace(/[.,/#!$%^&*;:{}=\-_`~()?\[\]"'<>|]/g, " ")
              .split(/\s+/)
              .map((w) => w.trim())
              .filter((w) => w && w.length >= 2);
            const uniq = [];
            source.forEach((w) => {
              if (!uniq.includes(w)) uniq.push(w);
            });
            return uniq.slice(0, 6);
          };
          const getExpandedDetail = (row) => {
            const words = extractKeywords(row.summary);
            if (row.type === "칭찬") {
              return { praiseItems: words.length ? words : ["응대 친절", "설명 만족"], complaintItems: [] };
            }
            if (row.type === "불편") {
              return { praiseItems: [], complaintItems: words.length ? words : ["대기 불편", "안내 부족"] };
            }
            if (row.type === "복합") {
              const praiseItems = words.slice(0, Math.max(1, Math.ceil(words.length / 2)));
              const complaintItems = words.slice(Math.max(1, Math.ceil(words.length / 2)));
              return {
                praiseItems: praiseItems.length ? praiseItems : ["친절 응대"],
                complaintItems: complaintItems.length ? complaintItems : ["대기 불편"],
              };
            }
            return { praiseItems: [], complaintItems: [] };
          };

          const onDirectSubmit = (payload) => {
            const rid = mkVocId();
            const allowedTypes = ["칭찬", "불편", "복합", "미분류"];
            const type = allowedTypes.includes(payload.type) ? payload.type : "칭찬";
            const status = type === "미분류" ? "미분류" : "접수";
            const classified = getVocTaxonomyClassification(payload.summary);
            setRows((prev) => [{ id: rid, receiptNo: rid, receivedAt: payload.receivedAt || nowText(), registeredAt: nowText(), ward: (payload.wardDept || "-").split("/")[0]?.trim() || "미지정", deptDoctor: payload.wardDept || "-", patient: payload.patientName || "신규 등록", channel: payload.channel || "고객의견카드", type, category: classified.category, keywords: classified.keywords, summary: payload.summary || "-", status, entrySource: "direct", attachments: payload.attachments || [] }, ...prev]);
            showToast && showToast("VOC가 등록되었습니다.");
          };
          const onBulkSubmit = (items) => {
            if (!Array.isArray(items) || !items.length) return;
            const mapped = items.map((it, i) => ({
              id: it.id || `${mkVocId()}-${i}`,
              receiptNo: it.id || `${mkVocId()}-${i}`,
              receivedAt: it.receivedAt || nowText(),
              registeredAt: nowText(),
              ward: (it.wardDept || "-").split("/")[0]?.trim() || "미지정",
              deptDoctor: it.wardDept || "-",
              patient: !String(it.patientName || "").trim() ? "익명" : it.patientName,
              channel: it.channel || "기타",
              category: it.category || getVocTaxonomyClassification(it.summary).category,
              keywords:
                Array.isArray(it.keywords) && it.keywords.length
                  ? it.keywords
                  : getVocTaxonomyClassification(it.summary).keywords,
              type:
                it.classification === "미분류"
                  ? "미분류"
                  : ["칭찬", "불편", "복합", "미분류"].includes(it.type)
                  ? it.type
                  : "불편",
              summary: it.summary || "-",
              status: it.classification === "미분류" ? "미분류" : "접수",
              entrySource: "file",
              unclassifiedReason: it.classification === "미분류" ? (it.unclassifiedReason || "유형매핑실패") : "",
              unclassifiedAction:
                it.classification === "미분류"
                  ? it.unclassifiedAction || UNCLASSIFIED_REASON_ACTION[it.unclassifiedReason || "유형매핑실패"] || "담당자 확인 후 직접 분류"
                  : "",
              manualReviewed: false,
              attachments: [],
            }));
            setRows((prev) => mapped.concat(prev));
            showToast && showToast(`파일 업로드 ${items.length}건이 접수 목록에 반영되었습니다.`);
          };

          return React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement(
              "div",
              { className: "rounded-xl border border-gray-200 bg-white p-4" },
              React.createElement(
                "div",
                { className: "flex flex-wrap items-center justify-between gap-2" },
                React.createElement("p", { className: "text-[15px] font-black text-gray-800" }, "VOC 접수 목록"),
                React.createElement(
                  "div",
                  { className: "flex flex-wrap items-center gap-2" },
                  React.createElement("button", { type: "button", onClick: () => setRegisterOpen(true), className: "px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-black hover:bg-blue-700" }, "+ VOC 등록")
                )
              ),
              React.createElement(
                "p",
                { className: "mt-3 text-[12px] font-bold leading-relaxed text-gray-500" },
                "VOC 유형 드롭다운에서 선택하면 AI가 분류한 긍정/부정/미분류를 바로 수정할 수 있습니다."
              ),
              React.createElement(
                "div",
                { className: "mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-8 gap-2" },
                React.createElement("select", { value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white", "aria-label": "VOC 유형" }, typeOptions.map((t) => React.createElement("option", { key: t, value: t }, t))),
                React.createElement("select", { value: channelFilter, onChange: (e) => setChannelFilter(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white" }, channels.map((c) => React.createElement("option", { key: c, value: c }, c))),
                React.createElement("select", { value: wardFilter, onChange: (e) => setWardFilter(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white" }, wards.map((w) => React.createElement("option", { key: w, value: w }, w))),
                React.createElement("select", { value: deptFilter, onChange: (e) => setDeptFilter(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white" }, deptOptions.map((d) => React.createElement("option", { key: d, value: d }, d))),
                React.createElement("select", { value: doctorFilter, onChange: (e) => setDoctorFilter(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white" }, doctorOptions.map((d) => React.createElement("option", { key: d, value: d }, d))),
                React.createElement("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white" }, categoryOptions.map((category) => React.createElement("option", { key: category, value: category }, category))),
                React.createElement("input", { value: keywordQuery, onChange: (e) => setKeywordQuery(e.target.value), placeholder: "카테고리·키워드 검색", className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold text-gray-700" }),
                React.createElement("input", { value: nameQuery, onChange: (e) => setNameQuery(e.target.value), placeholder: "이름 검색", className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold text-gray-700" })
              ),
              React.createElement(
                "div",
                { className: "mt-2 flex flex-wrap items-center gap-2" },
                React.createElement("span", { className: "text-[12px] font-black text-gray-600" }, "접수 기간"),
                React.createElement(
                  "select",
                  { value: datePreset, onChange: (e) => applyDatePreset(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-black text-gray-700 bg-white" },
                  ["전체 기간", "오늘", "최근 7일", "최근 30일", "이번 달", "직접 설정"].map((option) => React.createElement("option", { key: option, value: option }, option))
                ),
                React.createElement("input", {
                  type: "date",
                  value: dateFrom,
                  max: dateTo || undefined,
                  onChange: (e) => {
                    setDatePreset("직접 설정");
                    setDateFrom(e.target.value);
                  },
                  className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold text-gray-700 bg-white",
                  "aria-label": "접수 시작일",
                }),
                React.createElement("span", { className: "text-[12px] font-bold text-gray-400" }, "~"),
                React.createElement("input", {
                  type: "date",
                  value: dateTo,
                  min: dateFrom || undefined,
                  onChange: (e) => {
                    setDatePreset("직접 설정");
                    setDateTo(e.target.value);
                  },
                  className: "border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold text-gray-700 bg-white",
                  "aria-label": "접수 종료일",
                }),
                dateFrom || dateTo
                  ? React.createElement("button", { type: "button", onClick: () => applyDatePreset("전체 기간"), className: "px-3 py-2 rounded-lg border border-gray-200 bg-white text-[11px] font-black text-gray-500 hover:bg-gray-50" }, "기간 초기화")
                  : null,
                React.createElement("span", { className: "ml-auto text-[11px] font-bold text-gray-400" }, `조회 ${filtered.length.toLocaleString()}건`)
              )
            ),
            React.createElement(
              "div",
              { className: "rounded-xl border border-gray-200 bg-white overflow-auto" },
              React.createElement(
                "table",
                { className: "w-full text-[12px] min-w-[1320px]" },
                React.createElement(
                  "thead",
                  null,
                  React.createElement("tr", { className: "bg-gray-50 text-gray-600" }, ["번호", "환자", "병동", "진료과/담당의사", "유입채널", "VOC 유형(AI 분석)", "카테고리/키워드(AI 분석)", "접수 내용", "첨부", "접수일시", "등록일시"].map((h) => React.createElement("th", { key: h, className: "px-3 py-2 text-left font-black whitespace-nowrap" }, h)))
                ),
                React.createElement(
                  "tbody",
                  null,
                  filtered.length
                    ? filtered.map((r, i) =>
                        React.createElement(
                          React.Fragment,
                          { key: r.id },
                          React.createElement(
                            "tr",
                            {
                              className:
                                "border-t border-gray-100 cursor-pointer " +
                                (expandedRowId === r.id ? "bg-blue-50/30" : "hover:bg-gray-50"),
                              onClick: () => setExpandedRowId(expandedRowId === r.id ? null : r.id),
                            },
                          React.createElement("td", { className: "px-3 py-2 font-black text-gray-700 whitespace-nowrap" }, String(265000 + filtered.length - i)),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-700 whitespace-nowrap" }, r.patient || "-"),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-700 whitespace-nowrap" }, r.ward),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-700 whitespace-nowrap" }, r.deptDoctor),
                          React.createElement("td", { className: "px-3 py-2" }, React.createElement("span", { className: `inline-flex px-2 py-0.5 rounded-full border text-[10px] font-black ${CHANNEL_STYLE[r.channel] || CHANNEL_STYLE["기타"]}` }, r.channel || "기타")),
                          React.createElement(
                            "td",
                            { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement(
                              "select",
                              {
                                value: toDisplayType(r.type),
                                onClick: (e) => e.stopPropagation(),
                                onChange: (e) => onChangeRowType(r.id, e.target.value),
                                className: typeSelectClass(toDisplayType(r.type)),
                                "aria-label": "VOC 유형 수동 분류",
                              },
                              VOC_DISPLAY_TYPES.map((t) => React.createElement("option", { key: r.id + "-type-" + t, value: t }, t))
                            )
                          ),
                          React.createElement(
                            "td",
                            { className: "px-3 py-2 min-w-[190px]" },
                            React.createElement("p", { className: "text-[11px] font-black text-gray-700" }, r.category || "기타"),
                            (Array.isArray(r.keywords) && r.keywords.length ? r.keywords.slice(0, 3) : ["키워드 없음"]).map((keyword) =>
                              React.createElement("p", { key: r.id + "-" + keyword, className: "text-[11px] font-bold text-gray-500 leading-snug" }, keyword)
                            )
                          ),
                          React.createElement(
                            "td",
                            { className: "px-3 py-2 font-bold text-gray-700 max-w-[320px]" },
                            React.createElement(
                              "div",
                              { className: "flex items-center gap-1.5 min-w-0" },
                              r.entrySource === "direct"
                                ? React.createElement(
                                    "span",
                                    { className: "inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-black text-blue-700 shrink-0" },
                                    "✍ 직접입력"
                                  )
                                : null,
                              React.createElement(
                                "span",
                                { className: "truncate", title: r.summary },
                                r.summary
                              )
                            )
                          ),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-500 whitespace-nowrap" }, Array.isArray(r.attachments) && r.attachments.length ? `${r.attachments.length}건` : "없음"),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-600 whitespace-nowrap" }, r.receivedAt),
                          React.createElement("td", { className: "px-3 py-2 font-bold text-gray-600 whitespace-nowrap" }, r.registeredAt || r.receivedAt)
                          ),
                          expandedRowId === r.id
                            ? React.createElement(
                                "tr",
                                { className: "border-t border-blue-100 bg-blue-50/10" },
                                React.createElement(
                                  "td",
                                  { colSpan: 11, className: "px-0 py-0" },
                                  React.createElement(
                                    "div",
                                    { className: "grid grid-cols-1 md:grid-cols-[180px_1fr] border-t border-blue-100" },
                                    React.createElement(
                                      "div",
                                      { className: "p-3 border-r border-blue-100 bg-gray-50/70" },
                                      React.createElement("p", { className: "text-[12px] font-black text-gray-700 mb-2" }, "첨부 파일"),
                                      React.createElement(
                                        "p",
                                        { className: "text-[11px] font-black text-gray-500 mb-2" },
                                        Array.isArray(r.attachments) ? r.attachments.length : 0,
                                        "개"
                                      ),
                                      Array.isArray(r.attachments) && r.attachments.length
                                        ? React.createElement(
                                            "ul",
                                            { className: "space-y-1" },
                                            r.attachments.map((a, idx) =>
                                              React.createElement("li", { key: "att-" + r.id + "-" + idx, className: "text-[11px] font-bold text-gray-600 truncate" }, String(a))
                                            )
                                          )
                                        : React.createElement("p", { className: "text-[11px] font-bold text-gray-400" }, "첨부된 파일이 없습니다.")
                                    ),
                                    React.createElement(
                                      "div",
                                      { className: "p-3 space-y-2" },
                                      React.createElement("p", { className: "text-[12px] font-black text-gray-700" }, "접수 내용"),
                                      React.createElement(
                                        "div",
                                        { className: "rounded-lg border border-emerald-100 bg-emerald-50/50 p-2" },
                                        React.createElement(
                                          "p",
                                          { className: "text-[11px] font-black text-emerald-700 mb-1" },
                                          "칭찬해요 ",
                                          getExpandedDetail(r).praiseItems.length,
                                          "개"
                                        ),
                                        getExpandedDetail(r).praiseItems.length
                                          ? React.createElement(
                                              "div",
                                              { className: "flex flex-wrap gap-1" },
                                              getExpandedDetail(r).praiseItems.map((k, idx) =>
                                                React.createElement("span", { key: "praise-" + r.id + "-" + idx, className: "inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700" }, k)
                                              )
                                            )
                                          : React.createElement("p", { className: "text-[11px] font-bold text-gray-400" }, "없음")
                                      ),
                                      React.createElement(
                                        "div",
                                        { className: "rounded-lg border border-rose-100 bg-rose-50/40 p-2" },
                                        React.createElement(
                                          "p",
                                          { className: "text-[11px] font-black text-rose-700 mb-1" },
                                          "불편해요 ",
                                          getExpandedDetail(r).complaintItems.length,
                                          "개"
                                        ),
                                        getExpandedDetail(r).complaintItems.length
                                          ? React.createElement(
                                              "div",
                                              { className: "flex flex-wrap gap-1" },
                                              getExpandedDetail(r).complaintItems.map((k, idx) =>
                                                React.createElement("span", { key: "complaint-" + r.id + "-" + idx, className: "inline-flex rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-700" }, k)
                                              )
                                            )
                                          : React.createElement("p", { className: "text-[11px] font-bold text-gray-400" }, "없음")
                                      ),
                                      React.createElement(
                                        "div",
                                        null,
                                        React.createElement("p", { className: "text-[11px] font-black text-gray-500 mb-1" }, "직접 입력 내용"),
                                        React.createElement("p", { className: "text-[12px] font-bold text-gray-700 leading-relaxed" }, r.summary || "-")
                                      )
                                    )
                                  )
                                )
                              )
                            : null
                        )
                      )
                    : React.createElement("tr", null, React.createElement("td", { colSpan: 11, className: "px-3 py-10 text-center text-gray-400 font-bold" }, "조건에 맞는 VOC가 없습니다."))
                )
              )
            ),
            React.createElement(VocRegisterModalV2, { open: registerOpen, onClose: () => setRegisterOpen(false), onSubmit: onDirectSubmit, onBulkSubmit: onBulkSubmit, showToast: showToast })
          );
        };

        const originalVocInboxPage = typeof VocInboxPage === "function" ? VocInboxPage : null;
        if (originalVocInboxPage && !window.__VOC_INBOX_RESTORE_PATCHED_CREATE__) {
          const raw = React.createElement;
          React.createElement = function (type, props, ...children) {
            if (type === originalVocInboxPage) return raw(VocInboxPageV2Restore, props || {}, ...children);
            return raw(type, props, ...children);
          };
          window.__VOC_INBOX_RESTORE_PATCHED_CREATE__ = true;
        }
      })();
    