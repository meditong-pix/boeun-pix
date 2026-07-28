# Agent constraints (boeun-pix)

이 저장소는 단일 `index.html`에 React 앱과 VOC mock HTML이 **같은 문서 스코프**로 합쳐집니다.
스크립트/식별자 충돌과 깨진 참조를 만들지 마세요.

## 1. 중복 선언 (SyntaxError) 금지

- `index.html`에 올라가는 **전역** `function` / `const` / `let` / `var` 이름은 문서 전체에서 **한 번만** 선언합니다.
- VOC mock (`voc-*-mock.html`)을 `index.html`에 sync할 때 React 쪽과 이름이 겹치면 **mock 쪽을 접두사로 분리**합니다.
  - 예: VOC 날짜 → `formatVocDate` (React `formatDate`와 분리)
  - 예: `renderRows` / `openModal` 등 흔히 겹치는 이름은 `vocInbox*` 등으로 고유화
- sync 후 반드시 중복 여부를 확인합니다.

```text
# formatDate 선언은 React 쪽 1개만 허용 (VOC는 formatVocDate)
rg -n "function formatDate\\b|(?:const|let|var) formatDate\\b" index.html

# 권장 테스트
node --test tests/index-script-declarations.test.mjs
```

## 2. 참조 오류 방지

- `getElementById` / `querySelector`로 쓰는 id는 마크업에 실제로 존재해야 합니다.
- `onclick="fn()"` / 전역 호출 함수는 같은 스코프에 정의되어 있어야 합니다. 이름 변경 시 **선언·호출·모달 핸들러를 함께** 수정합니다.
- light DOM / template embed 후에는 부모 페이지 전역과 충돌·미정의가 없는지 확인합니다.

## 3. VOC sync 워크플로

1. 소스는 `voc-inbox-mock.html` / `voc-settings-mock.html` / `voc-statistics-mock.html` 등 mock 파일을 먼저 수정합니다.
2. `sync-voc-inbox.ps1` 또는 `sync-voc-all-to-index.ps1`로 `index.html`에 반영합니다.
3. sync만 하고 끝내지 말고, **중복 선언·깨진 참조**를 검사한 뒤 브라우저에서 해당 메뉴를 열어 확인합니다.

## 4. 수정 후 최소 검증

- [ ] `index.html`에 동일 top-level 식별자 중복 없음
- [ ] VOC 접수 목록: 유형 뱃지 / 수정·삭제 / 수정 모달 동작
- [ ] 콘솔·앱 로드 오류 박스에 `already been declared` / `is not defined` 없음
