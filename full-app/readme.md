# PIX 마스터(병원관리자) — 전체 파일 기계적 구조화본 (v25 기준)

`픽스-마스터(병원관리자)-PC-Cursor-v25.html`(VOC 기획변경 4건 반영본)을 **원본 동작 그대로 유지하며** HTML / CSS / JS로 기계적 분리한 결과입니다.

## 열기 (원클릭 뷰)
- **Mac**: `열기(맥).command` 더블클릭 (또는 `index.html` 더블클릭)
- **Windows**: `열기(윈도우).bat` 더블클릭
- ※ React·Tailwind·Chart.js를 CDN에서 로드 → 인터넷 필요

## 구성
```
전체구조화_v25/
├── index.html      ← HTML 셸(약 1KB). CDN·CSS·JS 참조만. (React 앱이라 화면은 JS가 그림)
├── styles.css      ← 문서의 실제 <style> 블록
└── js/
    ├── app-bundle.min.js        (1.28MB) ★ 메인 React 앱 — minify된 빌드
    ├── voc-statistics-embed.js  (305KB)  VOC 통계 페이지(base64 HTML) + 디코더 ← 기획변경 4건 반영
    ├── inline-01.js / inline-03.js        셋업
    └── inline-05.js / inline-06.js        런타임 패치(VOC 인박스/설정 등)
```

## 중요 — 성격 이해
- **`app-bundle.min.js`(전체의 75%)는 minify된 React 빌드**입니다. 파일은 분리됐지만 "읽기 좋은 컴포넌트"는 아닙니다. **읽기 좋은 정본 소스는 pix-front**(`src/pages/master/...`)입니다. 이 분리본은 *뷰/전달용*이며 컴포넌트 편집용이 아닙니다.
- **VOC 통계 페이지만** `voc-statistics-embed.js` 안에 **base64 HTML**로 통째 들어 있어 별도로 열어 편집 가능합니다(→ 기획수정 하네스 참고). VOC의 4건 변경은 이미 반영돼 있습니다.
- `pix-ai-summary-modal.js`는 **원본에도 동봉돼 있지 않습니다**(404). AI요약 모달만 미동작이며 나머지는 정상입니다.

## 검증
Playwright 렌더 결과: React 앱 정상 마운트(타이틀 `CareLink Admin`), 좌측 네비(대시보드·VOC 통계 등) 전체 렌더, 신규 JS 에러 0(사전 404 2건: pix-ai-summary-modal / favicon).

## 관련 산출물 (같은 /sample 하위)
- `VOC탭_수정본/frontend_구조화/` — VOC 페이지를 **읽기 좋게 분해 + pix-front 컴포넌트 매핑 + 변경 마킹**한 버전(프론트 적용용)
- `_하네스/` — ①기획수정 하네스(기획자용) ②프론트전달 하네스(프론트용)
