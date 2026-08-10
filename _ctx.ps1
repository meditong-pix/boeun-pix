$path = Join-Path (Get-Location) 'index.html'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$patterns = @('openPxSurveyAiModal', 'AI 상세분석', 'AI 분석하기', 'AI 요약하기', 'voc-filter-action')
foreach ($pat in $patterns) {
  Write-Output ('=' * 80)
  Write-Output ("PATTERN: $pat")
  $start = 0
  $idx = 0
  while ($true) {
    $pos = $text.IndexOf($pat, $start)
    if ($pos -lt 0) {
      if ($idx -eq 0) { Write-Output '  (no matches)' }
      break
    }
    $idx++
    $bStart = [Math]::Max(0, $pos - 200)
    $before = $text.Substring($bStart, $pos - $bStart)
    $afterLen = [Math]::Min(200, $text.Length - $pos - $pat.Length)
    $after = $text.Substring($pos + $pat.Length, $afterLen)
    Write-Output "--- Match #$idx at offset $pos ---"
    Write-Output 'BEFORE:'
    Write-Output $before
    Write-Output 'MATCH:'
    Write-Output $pat
    Write-Output 'AFTER:'
    Write-Output $after
    Write-Output ''
    $start = $pos + 1
  }
}
