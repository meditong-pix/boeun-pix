
      (function () {
        if (window.__VOC_SETTINGS_PATCH_V1__) return;
        window.__VOC_SETTINGS_PATCH_V1__ = true;

        const VOC_RECLASSIFIED_TAXONOMY = [
          { category: "진료/치료", keywords: ["의사 설명", "치료 결과", "진료 태도", "검사 안내", "진료 과정 설명", "치료 속도", "전문성", "상담 시간", "수술 설명", "검사 결과 설명", "진료 신뢰도", "처방", "회진", "진료 연계", "응급 대응", "의료진 소통", "통증 관리", "치료 계획", "진료 정확성", "의료진 배려", "퇴원 설명", "재활 치료", "검사 진행", "의사 응대", "치료 효과", "전반적 진료"] },
          { category: "간호/처치", keywords: ["간호사 응대", "응답 속도", "콜벨 응답", "복약 안내", "간호 전문성", "검사 준비 안내", "설명 이해도", "전반적 간호서비스", "상처 처치", "욕창/자세 관리", "위생 케어"] },
          { category: "안전", keywords: ["환자 안전", "시설 보안", "낙상", "투약 안전", "오진/진단 위해", "시술/수술 안전", "검사 결과 정확성(안전)", "의료장비 안전", "호출벨 안전 대응", "처방 안전", "수혈 안전", "이물질/잔류물"] },
          { category: "감염관리", keywords: ["감염관리", "위생 상태", "원내 감염", "소독/멸균 관리", "격리 수칙 준수", "손 위생"] },
          { category: "행정/절차", keywords: ["대기시간", "진료 일정", "재진 안내", "검사 대기", "접수 절차", "수납", "예약 변경", "서류 발급", "안내", "전화 응대", "처리 속도", "입원 안내", "퇴원 안내", "검사 일정 안내", "원무 응대", "문의 응답", "민원 처리", "서류 안내", "예약 안내", "병동 안내", "병실 배정", "입원 절차", "퇴원 절차", "업무 정확성", "병원 정책"] },
          { category: "직원응대", keywords: ["친절도", "의사소통", "설명", "응대 태도", "배려", "문제 해결", "미소 응대", "전문성", "도움 제공", "신뢰감", "공감", "경청", "보호자 배려", "적극성", "서비스 마인드", "문의 응답", "요청 반영", "책임감", "협조성", "존중", "친근감", "환자 중심 서비스", "소통 만족도", "불안 해소", "세심함", "설명력", "응대 일관성", "해결 노력", "인사 태도", "전반적 서비스", "직원 응대(전체)", "보호자 응대", "프라이버시"] },
          { category: "서비스제공", keywords: ["식사", "침구 상태", "환의 상태", "배식 서비스", "세탁/린넨 교체"] },
          { category: "시설/환경", keywords: ["병실 청결", "화장실 청결", "시설 환경", "편의시설", "주차", "위치 안내", "병원 동선", "소음", "공기 환경", "냉난방", "샤워실", "병실 온도", "병실 조명", "엘리베이터", "휴게공간", "안내표지", "장애인 시설", "정수기", "주차공간", "접근성", "대기공간", "시설 현대화", "병동 환경", "전반적 환경"] },
          { category: "비용/보상", keywords: ["보험 안내", "진료비", "청구 정확성", "비급여 안내", "보상 처리", "환불 처리"] },
          { category: "기타", keywords: ["병원 추천", "재방문 의사", "병원 이미지", "브랜드 신뢰", "시스템 이용", "앱 사용성", "홈페이지", "정보 제공", "AI 안내", "모바일 서비스", "알림 서비스", "설문 참여", "VOC 접수", "진료 외 서비스", "의료 서비스", "개선 요청", "기능 요청", "오류 신고", "정보 부족", "이용 불편", "시스템 오류", "칭찬", "감사", "건의", "기타 의견", "전반적 만족도", "기타 불만"] },
        ];
        const VOC_CUSTOM_KEYWORDS_STORAGE_KEY = "pix_voc_custom_keywords_v1";
        const VOC_KEYWORDS_EVENT = "pix:voc-keywords-updated";

        function readCustomVocKeywords() {
          try {
            const parsed = JSON.parse(window.localStorage.getItem(VOC_CUSTOM_KEYWORDS_STORAGE_KEY) || "[]");
            return Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            return [];
          }
        }
        function writeCustomVocKeywords(next) {
          try {
            window.localStorage.setItem(VOC_CUSTOM_KEYWORDS_STORAGE_KEY, JSON.stringify(next));
            window.dispatchEvent(new CustomEvent(VOC_KEYWORDS_EVENT, { detail: next }));
          } catch (e) {}
        }
        function getAllVocTaxonomy() {
          const custom = readCustomVocKeywords();
          return VOC_RECLASSIFIED_TAXONOMY.map((group) => ({
            category: group.category,
            keywords: group.keywords.concat(
              custom.filter((item) => item.category === group.category).map((item) => item.keyword)
            ),
          }));
        }
        function getDefaultVocMobilePhrases(keyword) {
          const label = String(keyword || "").trim();
          return {
            positiveText: label ? `${label}에 만족했어요` : "",
            negativeText: label ? `${label}에 불편함이 있었어요` : "",
          };
        }
        const VOC_BASE_MOBILE_PHRASE_OVERRIDES = {
          "진료/치료::의사 설명": { positiveText: "의사 설명이 충분했어요", negativeText: "의사 설명이 부족했어요" },
          "진료/치료::치료 결과": { positiveText: "치료 결과에 만족해요", negativeText: "치료 결과가 기대에 못 미쳤어요" },
          "진료/치료::진료 태도": { positiveText: "진료 태도가 친절했어요", negativeText: "진료 태도가 불친절했어요" },
        };
        function getBaseVocMobilePhrases(category, keyword) {
          return VOC_BASE_MOBILE_PHRASE_OVERRIDES[`${category}::${keyword}`] || getDefaultVocMobilePhrases(keyword);
        }
        function classifyVocTextByTaxonomy(text) {
          const source = String(text || "").replace(/\s+/g, " ").toLowerCase();
          const matches = [];
          getAllVocTaxonomy().forEach((group) => {
            group.keywords.forEach((keyword) => {
              if (source.includes(String(keyword).toLowerCase())) {
                matches.push({ category: group.category, keyword });
              }
            });
          });
          matches.sort((a, b) => b.keyword.length - a.keyword.length);
          const primary = matches[0] || null;
          return {
            category: primary ? primary.category : "기타",
            keywords: Array.from(new Set(matches.map((item) => item.keyword))).slice(0, 5),
          };
        }
        window.__vocKeywordTaxonomyApi = {
          getBase: () => VOC_RECLASSIFIED_TAXONOMY.map((group) => ({ ...group, keywords: group.keywords.slice() })),
          getAll: getAllVocTaxonomy,
          getCustom: readCustomVocKeywords,
          classify: classifyVocTextByTaxonomy,
          getMobileOptions: () => {
            const custom = readCustomVocKeywords();
            return VOC_RECLASSIFIED_TAXONOMY.flatMap((group) => {
              const baseOptions = group.keywords.map((keyword) => ({
                category: group.category,
                keyword,
                source: "base",
                ...getBaseVocMobilePhrases(group.category, keyword),
              }));
              const customOptions = custom
                .filter((item) => item.category === group.category)
                .map((item) => ({
                  ...item,
                  source: "hospital",
                  ...getDefaultVocMobilePhrases(item.keyword),
                  positiveText: item.positiveText || getDefaultVocMobilePhrases(item.keyword).positiveText,
                  negativeText: item.negativeText || getDefaultVocMobilePhrases(item.keyword).negativeText,
                }));
              return baseOptions.concat(customOptions);
            });
          },
        };

        const VOC_CHANNEL_STORAGE_KEY = "pix_voc_channels_v1";
        const DEFAULT_VOC_CHANNELS = [
          { id: "app", name: "메디통 픽스(앱)", desc: "앱 내 VOC는 자동 등록·자동 분석되어 통계에 반영됩니다.", icon: "Smartphone", on: true, locked: true, custom: false },
          { id: "card", name: "고객의견카드", desc: "종이로 접수된 의견을 담당자가 직접 입력합니다.", icon: "NotebookText", on: true, locked: false, custom: false },
          { id: "phone", name: "직접 전화", desc: "전화로 접수된 내용을 담당자가 직접 입력합니다.", icon: "Phone", on: true, locked: false, custom: false },
          { id: "kakao", name: "카카오톡·채널톡", desc: "메신저 상담 내용을 담당자가 직접 입력합니다.", icon: "MessageCircle", on: false, locked: false, custom: false },
          { id: "web", name: "홈페이지", desc: "홈페이지 게시판 접수 내용을 담당자가 직접 입력합니다.", icon: "Globe", on: false, locked: false, custom: false },
          { id: "visit", name: "현장 상담", desc: "대면 상담 내용을 담당자가 직접 입력합니다.", icon: "Users", on: true, locked: false, custom: false },
          { id: "survey", name: "기타 만족도 조사", desc: "별도 만족도 조사 결과를 담당자가 직접 입력합니다.", icon: "ClipboardList", on: false, locked: false, custom: false },
          { id: "etc", name: "기타", desc: "위 채널에 해당하지 않는 접수 내용을 직접 입력합니다.", icon: "MoreHorizontal", on: false, locked: false, custom: false },
        ];
        const VOC_CHANNELS_EVENT = "pix:voc-channels-updated";

        function readVocChannels() {
          try {
            const raw = window.localStorage.getItem(VOC_CHANNEL_STORAGE_KEY);
            if (!raw) return DEFAULT_VOC_CHANNELS.slice();
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_VOC_CHANNELS.slice();
          } catch (e) {
            return DEFAULT_VOC_CHANNELS.slice();
          }
        }
        function writeVocChannels(next) {
          try {
            window.localStorage.setItem(VOC_CHANNEL_STORAGE_KEY, JSON.stringify(next));
          } catch (e) {}
          try {
            window.dispatchEvent(new CustomEvent(VOC_CHANNELS_EVENT, { detail: next }));
          } catch (e) {}
        }
        function useVocChannels() {
          const [channels, setChannelsState] = React.useState(() => readVocChannels());
          React.useEffect(() => {
            const onStorage = (e) => {
              if (!e || e.key === VOC_CHANNEL_STORAGE_KEY) setChannelsState(readVocChannels());
            };
            const onCustom = () => setChannelsState(readVocChannels());
            window.addEventListener("storage", onStorage);
            window.addEventListener(VOC_CHANNELS_EVENT, onCustom);
            return () => {
              window.removeEventListener("storage", onStorage);
              window.removeEventListener(VOC_CHANNELS_EVENT, onCustom);
            };
          }, []);
          const setChannels = React.useCallback((updater) => {
            setChannelsState((prev) => {
              const next = typeof updater === "function" ? updater(prev) : updater;
              const normalized = Array.isArray(next) ? next : prev;
              writeVocChannels(normalized);
              return normalized;
            });
          }, []);
          return [channels, setChannels];
        }

        window.__vocChannelsApi = {
          getAll: readVocChannels,
          getEnabledManual: function () {
            return readVocChannels().filter((c) => c.on && c.id !== "app").map((c) => c.name);
          },
          subscribe: function (handler) {
            const fn = () => handler && handler(readVocChannels());
            window.addEventListener(VOC_CHANNELS_EVENT, fn);
            return () => window.removeEventListener(VOC_CHANNELS_EVENT, fn);
          },
        };

        const VocChannelSettingsPanel = ({ showToast }) => {
          const [channels, setChannels] = useVocChannels();
          const [adding, setAdding] = React.useState(false);
          const [name, setName] = React.useState("");
          const [desc, setDesc] = React.useState("");
          const usedCount = channels.filter((c) => c.on).length;
          const unusedCount = channels.length - usedCount;

          const onToggle = (id, on) => {
            setChannels((prev) => prev.map((c) => (c.id === id ? { ...c, on } : c)));
          };
          const onAdd = () => {
            const n = String(name || "").trim();
            if (!n) {
              showToast && showToast("채널명을 입력해 주세요.");
              return;
            }
            if (channels.some((c) => c.name === n)) {
              showToast && showToast("이미 존재하는 채널명입니다.");
              return;
            }
            const id = typeof mkId === "function" ? mkId("CH") : `CH-${Date.now().toString(36)}`;
            setChannels((prev) =>
              prev.concat({
                id,
                name: n,
                desc: String(desc || "").trim() || "병원에서 추가한 채널입니다.",
                icon: "Flag",
                on: true,
                locked: false,
                custom: true,
              })
            );
            setAdding(false);
            setName("");
            setDesc("");
          };
          const onDelete = (id) => setChannels((prev) => prev.filter((c) => c.id !== id));

          return React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement("p", { className: "text-[12px] font-bold text-gray-600" }, "사용할 VOC 채널을 선택하세요. 병원에서 사용하는 채널을 직접 추가할 수도 있습니다."),
            React.createElement(
              "div",
              { className: "rounded-xl border border-gray-200 bg-white p-3" },
              React.createElement("div", { className: "flex justify-end mb-2" }, React.createElement("button", { type: "button", onClick: () => setAdding((v) => !v), className: "px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-black hover:bg-blue-700" }, "+ 채널 추가")),
              adding
                ? React.createElement(
                    "div",
                    { className: "mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2" },
                    React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold bg-white", placeholder: "채널명" }),
                    React.createElement("input", { value: desc, onChange: (e) => setDesc(e.target.value), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold bg-white", placeholder: "설명 (선택)" }),
                    React.createElement("div", { className: "flex justify-end gap-2" }, React.createElement("button", { type: "button", onClick: onAdd, className: "px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-black" }, "추가"), React.createElement("button", { type: "button", onClick: () => { setAdding(false); setName(''); setDesc(''); }, className: "px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-black text-gray-600 bg-white" }, "취소"))
                  )
                : null,
              React.createElement(
                "div",
                { className: "space-y-2" },
                channels.map((c) =>
                  React.createElement(
                    "div",
                    { key: c.id, className: "rounded-lg border border-gray-200 p-3 flex items-start gap-3" },
                    React.createElement("div", { className: "w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center" }, typeof Icon === "function" ? React.createElement(Icon, { name: c.icon || "Circle", size: 14 }) : "•"),
                    React.createElement("div", { className: "flex-1 min-w-0" }, React.createElement("div", { className: "flex items-center gap-2 flex-wrap" }, React.createElement("p", { className: "text-[13px] font-black text-gray-800" }, c.name), c.locked ? React.createElement("span", { className: "inline-flex px-2 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-black" }, "항상 사용") : null, c.custom ? React.createElement("span", { className: "inline-flex px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] font-black" }, "병원 추가") : null), React.createElement("p", { className: "text-[11px] font-bold text-gray-500 mt-0.5" }, c.desc || "-")),
                    React.createElement("div", { className: "flex items-center gap-2 shrink-0" }, React.createElement("label", { className: `inline-flex items-center gap-1.5 text-[11px] font-black ${c.locked ? "text-gray-400" : "text-gray-700"}` }, React.createElement("input", { type: "checkbox", className: "accent-blue-600", checked: !!c.on, disabled: !!c.locked, onChange: (e) => onToggle(c.id, e.target.checked) }), c.on ? "사용" : "미사용"), c.custom ? React.createElement("button", { type: "button", onClick: () => onDelete(c.id), className: "px-2 py-1 rounded border border-rose-200 bg-rose-50 text-rose-700 text-[10px] font-black" }, "삭제") : null)
                  )
                )
              ),
              React.createElement("p", { className: "mt-2 text-[11px] font-black text-gray-500" }, `사용 중 ${usedCount}개 · 미사용 ${unusedCount}개`)
            )
          );
        };

        const VocKeywordTaxonomyPanel = ({ showToast }) => {
          const [customKeywords, setCustomKeywords] = React.useState(() => readCustomVocKeywords());
          const [selectedCategory, setSelectedCategory] = React.useState(VOC_RECLASSIFIED_TAXONOMY[0].category);
          const [keywordDraft, setKeywordDraft] = React.useState("");
          const [positiveDraft, setPositiveDraft] = React.useState("");
          const [negativeDraft, setNegativeDraft] = React.useState("");
          const [selectedBaseKeywords, setSelectedBaseKeywords] = React.useState({});
          const [addModalOpen, setAddModalOpen] = React.useState(false);
          const [search, setSearch] = React.useState("");
          React.useEffect(() => {
            const refresh = () => setCustomKeywords(readCustomVocKeywords());
            window.addEventListener("storage", refresh);
            window.addEventListener(VOC_KEYWORDS_EVENT, refresh);
            return () => {
              window.removeEventListener("storage", refresh);
              window.removeEventListener(VOC_KEYWORDS_EVENT, refresh);
            };
          }, []);
          const selectedBase =
            VOC_RECLASSIFIED_TAXONOMY.find((group) => group.category === selectedCategory) ||
            VOC_RECLASSIFIED_TAXONOMY[0];
          const selectedCustom = customKeywords.filter((item) => item.category === selectedCategory);
          const normalizedSearch = String(search || "").trim().toLowerCase();
          const visibleBase = selectedBase.keywords.filter(
            (keyword) => !normalizedSearch || keyword.toLowerCase().includes(normalizedSearch)
          );
          const visibleCustom = selectedCustom.filter(
            (item) => !normalizedSearch || item.keyword.toLowerCase().includes(normalizedSearch)
          );
          const totalBase = VOC_RECLASSIFIED_TAXONOMY.reduce((sum, group) => sum + group.keywords.length, 0);
          const categorySelectedKeywords = selectedBaseKeywords[selectedCategory] || [];
          const resetAddDraft = () => {
            setKeywordDraft("");
            setPositiveDraft("");
            setNegativeDraft("");
          };
          const openAddModal = () => {
            resetAddDraft();
            setAddModalOpen(true);
          };
          const closeAddModal = () => {
            setAddModalOpen(false);
            resetAddDraft();
          };
          const onChangeKeywordDraft = (value) => {
            const nextKeyword = String(value || "");
            const phrases = getDefaultVocMobilePhrases(nextKeyword);
            setKeywordDraft(nextKeyword);
            setPositiveDraft(phrases.positiveText);
            setNegativeDraft(phrases.negativeText);
          };
          const toggleBaseKeyword = (keyword) => {
            setSelectedBaseKeywords((prev) => {
              const current = prev[selectedCategory] || [];
              const nextList = current.includes(keyword)
                ? current.filter((item) => item !== keyword)
                : current.concat(keyword);
              return { ...prev, [selectedCategory]: nextList };
            });
          };
          const onAddKeyword = () => {
            const keyword = String(keywordDraft || "").trim();
            if (!keyword) {
              showToast && showToast("추가할 키워드를 입력해 주세요.");
              return;
            }
            const duplicate = getAllVocTaxonomy()
              .find((group) => group.category === selectedCategory)
              ?.keywords.some((item) => item.toLowerCase() === keyword.toLowerCase());
            if (duplicate) {
              showToast && showToast("선택한 카테고리에 이미 등록된 키워드입니다.");
              return;
            }
            const positiveText = String(positiveDraft || "").trim();
            const negativeText = String(negativeDraft || "").trim();
            if (!positiveText || !negativeText) {
              showToast && showToast("모바일에 표시할 긍정·부정 문구를 모두 입력해 주세요.");
              return;
            }
            const next = customKeywords.concat({
              id: `VOC-KW-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
              category: selectedCategory,
              keyword,
              positiveText,
              negativeText,
              createdAt: new Date().toISOString(),
            });
            writeCustomVocKeywords(next);
            setCustomKeywords(next);
            closeAddModal();
            showToast && showToast(`${selectedCategory}에 "${keyword}" 키워드가 추가되었습니다.`);
          };
          const onDeleteCustomKeyword = (id) => {
            const next = customKeywords.filter((item) => item.id !== id);
            writeCustomVocKeywords(next);
            setCustomKeywords(next);
            showToast && showToast("병원 추가 키워드가 삭제되었습니다.");
          };
          const previewKeyword = String(keywordDraft || "").trim() || "키워드명";
          return React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement(
              "div",
              { className: "rounded-xl border border-blue-100 bg-blue-50 px-4 py-3" },
              React.createElement("p", { className: "text-[12px] font-black text-blue-800" }, "메디통 VOC 표준 분류 · 2026.07.19"),
              React.createElement(
                "p",
                { className: "mt-1 text-[11px] font-bold leading-relaxed text-blue-700" },
                `기본 카테고리 ${VOC_RECLASSIFIED_TAXONOMY.length}개와 키워드 ${totalBase}개가 제공됩니다. 기본 키워드는 클릭으로 선택/비선택할 수 있고, 병원은 기존 카테고리에 키워드만 추가할 수 있습니다.`
              )
            ),
            React.createElement(
              "div",
              { className: "rounded-xl border border-gray-200 bg-white p-4" },
              React.createElement(
                "div",
                {
                  className: "mb-4 flex flex-wrap gap-2 border-b border-gray-200 pb-3",
                  role: "tablist",
                  "aria-label": "VOC 카테고리",
                },
                VOC_RECLASSIFIED_TAXONOMY.map((group) => {
                  const customCount = customKeywords.filter((item) => item.category === group.category).length;
                  const active = selectedCategory === group.category;
                  return React.createElement(
                    "button",
                    {
                      key: "voc-taxonomy-" + group.category,
                      type: "button",
                      role: "tab",
                      "aria-selected": active,
                      onClick: () => {
                        setSelectedCategory(group.category);
                        setSearch("");
                        closeAddModal();
                      },
                      className:
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition " +
                        (active
                          ? "bg-gray-900 font-black text-white"
                          : "font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700"),
                    },
                    React.createElement("span", null, group.category),
                    React.createElement(
                      "span",
                      {
                        className:
                          "inline-flex min-w-[18px] justify-center rounded-full px-1.5 text-[10px] font-black " +
                          (active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"),
                      },
                      group.keywords.length + customCount
                    )
                  );
                })
              ),
              React.createElement(
                "div",
                { className: "flex flex-wrap items-center justify-between gap-2" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("p", { className: "text-[14px] font-black text-gray-800" }, selectedCategory),
                  React.createElement(
                    "p",
                    { className: "mt-0.5 text-[11px] font-bold text-gray-400" },
                    `기본 ${selectedBase.keywords.length}개 · 선택 ${categorySelectedKeywords.length}개 · 병원 추가 ${selectedCustom.length}개`
                  )
                ),
                React.createElement(
                  "div",
                  { className: "flex flex-wrap items-center gap-2" },
                  React.createElement("input", {
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    placeholder: "키워드 검색",
                    className: "w-48 rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-bold",
                  }),
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      onClick: openAddModal,
                      className: "rounded-lg bg-blue-600 px-4 py-2 text-[12px] font-black text-white hover:bg-blue-700",
                    },
                    "+ 키워드 추가"
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "mt-4" },
                React.createElement("p", { className: "mb-2 text-[11px] font-black text-gray-500" }, "메디통 기본 키워드"),
                React.createElement(
                  "div",
                  { className: "grid grid-cols-1 gap-2 md:grid-cols-2" },
                  visibleBase.map((keyword) => {
                    const phrases = getBaseVocMobilePhrases(selectedCategory, keyword);
                    const selected = categorySelectedKeywords.includes(keyword);
                    return React.createElement(
                      "button",
                      {
                        key: "base-voc-keyword-" + selectedCategory + "-" + keyword,
                        type: "button",
                        onClick: () => toggleBaseKeyword(keyword),
                        "aria-pressed": selected,
                        className:
                          "rounded-xl border p-3 text-left transition " +
                          (selected
                            ? "border-blue-300 bg-blue-50 shadow-sm"
                            : "border-gray-200 bg-gray-50 hover:border-blue-200 hover:bg-white"),
                      },
                      React.createElement(
                        "div",
                        { className: "flex items-center gap-2" },
                        React.createElement(
                          "span",
                          {
                            className:
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black " +
                              (selected ? "bg-blue-600 text-white" : "border border-gray-300 bg-white text-transparent"),
                          },
                          "✓"
                        ),
                        React.createElement("span", { className: "min-w-0 flex-1 text-[13px] font-black text-gray-800" }, keyword),
                        React.createElement("span", { className: "text-[10px] font-bold text-gray-400" }, selected ? "선택됨" : "선택")
                      ),
                      React.createElement("p", { className: "ml-7 mt-0.5 text-[10px] font-bold text-gray-400" }, selectedCategory),
                      selected
                        ? React.createElement(
                            "div",
                            { className: "ml-7 mt-2 space-y-1.5" },
                            React.createElement(
                              "div",
                              { className: "flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700" },
                              React.createElement("span", { className: "shrink-0" }, "👍"),
                              React.createElement("span", null, phrases.positiveText)
                            ),
                            React.createElement(
                              "div",
                              { className: "flex items-start gap-2 rounded-lg bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-700" },
                              React.createElement("span", { className: "shrink-0" }, "👎"),
                              React.createElement("span", null, phrases.negativeText)
                            )
                          )
                        : null
                    );
                  })
                )
              ),
              React.createElement(
                "div",
                { className: "mt-4" },
                React.createElement("p", { className: "mb-2 text-[11px] font-black text-emerald-700" }, "병원 추가 키워드"),
                visibleCustom.length
                  ? React.createElement(
                      "div",
                      { className: "space-y-2" },
                      visibleCustom.map((item) => {
                        const defaults = getDefaultVocMobilePhrases(item.keyword);
                        return React.createElement(
                          "div",
                          { key: item.id, className: "grid grid-cols-1 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)_32px]" },
                          React.createElement("p", { className: "text-[12px] font-black text-emerald-800" }, item.keyword),
                          React.createElement(
                            "div",
                            { className: "rounded-lg bg-white px-3 py-2" },
                            React.createElement("p", { className: "text-[9px] font-black text-blue-600" }, "긍정 문구"),
                            React.createElement("p", { className: "mt-0.5 text-[11px] font-bold text-gray-700" }, item.positiveText || defaults.positiveText)
                          ),
                          React.createElement(
                            "div",
                            { className: "rounded-lg bg-white px-3 py-2" },
                            React.createElement("p", { className: "text-[9px] font-black text-rose-600" }, "부정 문구"),
                            React.createElement("p", { className: "mt-0.5 text-[11px] font-bold text-gray-700" }, item.negativeText || defaults.negativeText)
                          ),
                          React.createElement("button", { type: "button", onClick: () => onDeleteCustomKeyword(item.id), className: "h-8 w-8 rounded-lg text-emerald-600 hover:bg-rose-50 hover:text-rose-600", "aria-label": item.keyword + " 삭제" }, "×")
                        );
                      })
                    )
                  : React.createElement("p", { className: "rounded-lg border border-dashed border-gray-200 px-3 py-4 text-center text-[11px] font-bold text-gray-400" }, "이 카테고리에 병원이 추가한 키워드가 없습니다.")
              )
            ),
            addModalOpen
              ? React.createElement(
                  "div",
                  { className: "fixed inset-0 z-[180] flex items-center justify-center p-4" },
                  React.createElement("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm", onClick: closeAddModal }),
                  React.createElement(
                    "div",
                    {
                      className: "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl",
                      role: "dialog",
                      "aria-modal": "true",
                      "aria-labelledby": "vocKeywordAddModalTitle",
                    },
                    React.createElement(
                      "div",
                      { className: "flex items-center justify-between border-b border-gray-100 px-5 py-3.5" },
                      React.createElement(
                        "div",
                        null,
                        React.createElement("p", { id: "vocKeywordAddModalTitle", className: "text-[15px] font-black text-gray-800" }, "병원 키워드 추가"),
                        React.createElement("p", { className: "mt-0.5 text-[11px] font-bold text-gray-400" }, `${selectedCategory} 카테고리에 추가합니다.`)
                      ),
                      React.createElement("button", { type: "button", onClick: closeAddModal, className: "text-[12px] font-black text-gray-500" }, "닫기")
                    ),
                    React.createElement(
                      "div",
                      { className: "grid grid-cols-1 gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_220px]" },
                      React.createElement(
                        "div",
                        { className: "space-y-3" },
                        React.createElement(
                          "label",
                          { className: "block" },
                          React.createElement("span", { className: "mb-1 block text-[12px] font-black text-gray-600" }, "키워드명"),
                          React.createElement("input", {
                            value: keywordDraft,
                            onChange: (e) => onChangeKeywordDraft(e.target.value),
                            onKeyDown: (e) => {
                              if (e.key === "Enter") onAddKeyword();
                            },
                            placeholder: "예: 주차 안내",
                            className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] font-bold",
                            autoFocus: true,
                          })
                        ),
                        React.createElement(
                          "label",
                          { className: "block" },
                          React.createElement("span", { className: "mb-1 block text-[12px] font-black text-blue-700" }, "좋아요 선택 시 문구"),
                          React.createElement("input", {
                            value: positiveDraft,
                            onChange: (e) => setPositiveDraft(e.target.value),
                            placeholder: "예: 주차 안내가 친절했어요",
                            className: "w-full rounded-lg border border-blue-200 px-3 py-2 text-[13px] font-bold text-gray-700",
                          })
                        ),
                        React.createElement(
                          "label",
                          { className: "block" },
                          React.createElement("span", { className: "mb-1 block text-[12px] font-black text-rose-700" }, "불편 선택 시 문구"),
                          React.createElement("input", {
                            value: negativeDraft,
                            onChange: (e) => setNegativeDraft(e.target.value),
                            placeholder: "예: 주차 안내가 부족했어요",
                            className: "w-full rounded-lg border border-rose-200 px-3 py-2 text-[13px] font-bold text-gray-700",
                          })
                        ),
                        React.createElement(
                          "div",
                          { className: "flex justify-end gap-2 pt-1" },
                          React.createElement(
                            "button",
                            { type: "button", onClick: closeAddModal, className: "rounded-lg border border-gray-200 bg-white px-4 py-2 text-[12px] font-black text-gray-600 hover:bg-gray-50" },
                            "취소"
                          ),
                          React.createElement(
                            "button",
                            { type: "button", onClick: onAddKeyword, className: "rounded-lg bg-blue-600 px-4 py-2 text-[12px] font-black text-white hover:bg-blue-700" },
                            "저장"
                          )
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "rounded-2xl border border-gray-200 bg-gray-50 p-3" },
                        React.createElement("p", { className: "mb-2 text-[11px] font-black text-gray-500" }, "환자 모바일 미리보기"),
                        React.createElement(
                          "div",
                          { className: "rounded-2xl border border-gray-200 bg-white p-3" },
                          React.createElement("p", { className: "mb-2 text-[11px] font-bold text-gray-400" }, "이 항목에 대해 어떠셨나요?"),
                          React.createElement(
                            "div",
                            { className: "mb-2 flex flex-wrap gap-1.5" },
                            React.createElement("span", { className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700" }, previewKeyword + " 👍"),
                            React.createElement("span", { className: "rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-black text-rose-700" }, previewKeyword + " 👎")
                          ),
                          React.createElement(
                            "div",
                            { className: "space-y-1 text-[11px] font-bold text-gray-600" },
                            positiveDraft
                              ? React.createElement("p", null, React.createElement("span", { className: "text-emerald-600" }, "좋아요 선택 시"), " — ", positiveDraft)
                              : React.createElement("p", { className: "text-gray-400" }, "좋아요 선택 시 문구를 입력하면 여기 표시돼요"),
                            negativeDraft
                              ? React.createElement("p", null, React.createElement("span", { className: "text-rose-600" }, "불편 선택 시"), " — ", negativeDraft)
                              : null
                          )
                        )
                      )
                    )
                  )
                )
              : null
          );
        };

        const originalVocKeywordsPage = typeof VocKeywordsPage === "function" ? VocKeywordsPage : null;
        const originalVocInboxPage = typeof VocInboxPage === "function" ? VocInboxPage : null;
        const originalVocRegisterModal = typeof VocRegisterModal === "function" ? VocRegisterModal : null;
        const VocSettingsPage = (props) => {
          const [topTab, setTopTab] = React.useState("channel");
          return React.createElement(
            "div",
            { className: "space-y-3" },
            React.createElement("div", { className: "space-y-1" }, React.createElement("h2", { className: "text-lg font-black tracking-tight text-gray-900" }, "VOC 설정"), React.createElement("p", { className: "text-[12px] text-gray-600 leading-relaxed" }, "VOC 채널과 메디통 표준 카테고리·키워드, 병원 추가 키워드를 관리합니다.")),
            React.createElement("div", { className: "inline-flex rounded-xl border border-gray-200 bg-white p-1" }, React.createElement("button", { type: "button", onClick: () => setTopTab("channel"), className: `px-3 py-1.5 rounded-lg text-[12px] font-black ${topTab === "channel" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}` }, "채널 설정"), React.createElement("button", { type: "button", onClick: () => setTopTab("keyword"), className: `px-3 py-1.5 rounded-lg text-[12px] font-black ${topTab === "keyword" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}` }, "키워드 설정")),
            topTab === "channel"
              ? React.createElement(VocChannelSettingsPanel, { showToast: props && props.showToast })
              : React.createElement(VocKeywordTaxonomyPanel, { showToast: props && props.showToast })
          );
        };
        window.__VocSettingsPagePatched__ = VocSettingsPage;

        try {
          if (Array.isArray(MENU_STRUCTURE)) {
            const statsGrp = MENU_STRUCTURE.find((g) => g && g.group === "통계");
            if (statsGrp && Array.isArray(statsGrp.items)) {
              statsGrp.items = statsGrp.items.map((item) =>
                item && item.id === "VOC" ? { ...item, id: "VOC 통계" } : item
              );
            }
            const operationsGrp = MENU_STRUCTURE.find(
              (g) => g && (g.group === "운영관리" || g.group === "운영 관리")
            );
            if (operationsGrp && Array.isArray(operationsGrp.items)) {
              operationsGrp.items = operationsGrp.items.filter(
                (item) => item && item.id !== "권한 관리"
              );
            }
            const grp = MENU_STRUCTURE.find((g) => g && g.group === "고객의 소리(VOC)");
            if (grp && Array.isArray(grp.items)) {
              grp.items = grp.items.map((item) => (item && item.id === "VOC 키워드 설정" ? { ...item, id: "VOC 설정" } : item));
            }
          }
          if (MENU_CONTENT_MAP) {
            delete MENU_CONTENT_MAP["권한 관리"];
            MENU_CONTENT_MAP["VOC 통계"] = "vocPixStats";
            MENU_CONTENT_MAP["VOC"] = "vocPixStats";
            MENU_CONTENT_MAP["VOC 설정"] = "vocKeywords";
            MENU_CONTENT_MAP["VOC 키워드 설정"] = "vocKeywords";
          }
          if (HEADER_SUBTITLE) {
            delete HEADER_SUBTITLE["권한 관리"];
            HEADER_SUBTITLE["VOC 통계"] = "전체 VOC 현황 · 구분별 추이 · 병동/진료과/의사별 분석";
            HEADER_SUBTITLE["VOC"] = HEADER_SUBTITLE["VOC 통계"];
            const subtitle = "VOC 채널 · 표준 카테고리/키워드 · 병원 키워드 추가";
            HEADER_SUBTITLE["VOC 설정"] = subtitle;
            HEADER_SUBTITLE["VOC 키워드 설정"] = subtitle;
          }
        } catch (e) {}

        try {
          const relabelVocMenu = () => {
            const nodes = document.querySelectorAll("button, span, p, h1");
            nodes.forEach((node) => {
              const txt = (node.textContent || "").trim();
              if (txt === "VOC 키워드 설정") node.textContent = "VOC 설정";
            });
          };
          relabelVocMenu();
          const obs = new MutationObserver(() => relabelVocMenu());
          obs.observe(document.body, { childList: true, subtree: true });
        } catch (e) {}

        try {
          if (originalVocKeywordsPage && !window.__VOC_SETTINGS_CREATE_ELEMENT_PATCHED__) {
            const rawCreateElement = React.createElement;
            React.createElement = function patchedCreateElement(type, props, ...children) {
              if (type === originalVocKeywordsPage && !(props && props.__vocSettingsBypass)) {
                return rawCreateElement(VocSettingsPage, props || {}, ...children);
              }
              if (type === originalVocInboxPage || type === originalVocRegisterModal) {
                const nextProps = {
                  ...(props || {}),
                  __enabledVocChannels: window.__vocChannelsApi.getEnabledManual(),
                  __vocChannelsVersion: String((window.__vocChannelsApi.getAll() || []).length),
                };
                return rawCreateElement(type, nextProps, ...children);
              }
              return rawCreateElement(type, props, ...children);
            };
            window.__VOC_SETTINGS_CREATE_ELEMENT_PATCHED__ = true;
          }
        } catch (e) {}
      })();
    