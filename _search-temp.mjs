const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const patterns = ['openPxSurveyAiModal', 'AI 상세분석', 'AI 분석하기', 'AI 요약하기', 'voc-filter-action'];
for (const pat of patterns) {
  console.log('='.repeat(80));
  console.log('PATTERN:', pat);
  console.log('='.repeat(80));
  let start = 0, idx = 0;
  while (true) {
    const pos = text.indexOf(pat, start);
    if (pos === -1) { if (idx === 0) console.log('  (no matches)'); break; }
    idx++;
    const before = text.slice(Math.max(0, pos - 200), pos);
    const after = text.slice(pos + pat.length, pos + pat.length + 200);
    console.log('--- Match #' + idx + ' at offset ' + pos + ' ---');
    console.log('BEFORE (200 chars):');
    console.log(before);
    console.log('--- MATCH ---');
    console.log(pat);
    console.log('AFTER (200 chars):');
    console.log(after);
    console.log('');
    start = pos + 1;
  }
}
// PatientSurveyAnalysisTab filter row
let p = text.indexOf('PatientSurveyAnalysisTab');
while (p !== -1) {
  const chunk = text.slice(p, p + 20000);
  if (chunk.includes('voc-filter-action') && (chunk.includes('openPxSurveyAiModal') || chunk.includes('AI 분석'))) {
    const i = chunk.indexOf('voc-filter-action');
    console.log('=== PatientSurveyAnalysisTab FILTER ROW (wide excerpt) ===');
    console.log(chunk.slice(Math.max(0, i - 800), i + 1200));
    break;
  }
  p = text.indexOf('PatientSurveyAnalysisTab', p + 1);
}
