# VOC 통계 · 기획변경 구조화본 (프론트 전달용)

PIX 마스터(병원관리자) **VOC 통계 화면**의 **기획변경 4건**을, 프론트에서 쉽게 매핑·적용하도록 구조화한 뷰 초안입니다. (사전 예고용)

## 열기 (원클릭 뷰)
- **Mac**: `열기(맥).command` 더블클릭 — (또는 `index.html` 더블클릭)
- **Windows**: `열기(윈도우).bat` 더블클릭
- ※ 차트는 Chart.js **CDN**이라 볼 때 인터넷 필요

## 구성
```
frontend_구조화/
├── index.html   ← 화면 구조(읽기용). 변경점을 [기획변경 ①~④] 주석으로 표시
├── styles.css   ← 스타일 (Tailwind 변환 시 참고)
├── app.js       ← 목업 데이터 + 렌더 로직 (Chart.js · ※ pix-front는 recharts라 차트는 재구현 대상)
├── 열기(맥).command / 열기(윈도우).bat
└── 적용가이드.md (이 문서)
```

## 기획변경 4건 → pix-front 컴포넌트 매핑
경로: `pix-front/src/pages/master/components/voc-stats/`

| # | 변경 내용 | 대응 컴포넌트 |
|---|-----------|--------------|
| **①** | 진료과별·의사별 VOC → **병동별과 동일 구조** (그래프/표 토글·"자세히 보기" 제거 → 막대그래프 + 5열 표 동시 표시) | `MasterVocDepartmentAnalysisSection.tsx` (병동=`MasterVocWardAnalysisSection.tsx`, 셋 다 `MasterVocGroupAnalysisPanel` 공유) |
| **②** | 연령·성별 VOC 키워드에서 **"월별 추이" 차트 제거** (TOP5 키워드만 유지) | `MasterVocKeywordAnalysisSection.tsx` |
| **③** | 상단 유형별 접수: 기타문의 우측 **"미분류" 카드 추가** (7 → 8개) | `MasterVocStatsTopSection.tsx` / `MasterVocStatsTopParts.tsx` |
| **④** | **부서칭찬·직원칭찬 현황** 랭킹 카드 (건수 + 전월 대비, 이미지 형식) | `MasterVocPraiseComplaintSection.tsx` |

> ★ **중요 — pix-front 현행 대조 결과:**
> **①**(병동/진료과/의사가 이미 `MasterVocGroupAnalysisPanel` 하나로 통일됨) 와 **②**(키워드 섹션에 월별추이 자체가 없음)는 **pix-front에 이미 반영/정합**된 상태입니다.
> 즉 실제 신규 델타는 주로 **③·④**입니다. (①·②는 "목업을 현행에 맞춘" 정합 성격)

## 섹션 ↔ 컴포넌트 전체 지도 (index.html 등장 순서)
| 화면 섹션 | pix-front 컴포넌트 |
|-----------|--------------------|
| 상단 유형별 접수 (8개) | `MasterVocStatsTopSection` |
| 개요 / 기간별 추이 | `MasterVocOverviewCard` / `MasterVocPeriodTrendSection` |
| 연령·성별 VOC 키워드 | `MasterVocKeywordAnalysisSection` |
| 카테고리·키워드 분석 | `MasterVocCategoryAnalysisSection` |
| 그룹별 VOC (병동/진료과/의사) | `MasterVocWardAnalysisSection` + `MasterVocDepartmentAnalysisSection` (→ `MasterVocGroupAnalysisPanel`) |
| 부서/직원 칭찬 현황 | `MasterVocPraiseComplaintSection` |

## 적용 시 주의
- **차트**: 이 초안은 Chart.js. pix-front는 **recharts**이므로 차트는 그대로 복붙이 아니라 recharts로 재구현.
- **미분류 카드 건수(42건)**: placeholder. 실데이터 연동 시 교체.
- **부서/직원 칭찬 데이터**: 전달해주신 이미지 값 그대로(간호부 148건 ▲6.2% … 이OO 간호사 32건 ▲8.4% …).
- 이 뷰는 **디자인·구조 스펙**이며, 데이터는 목업입니다.
