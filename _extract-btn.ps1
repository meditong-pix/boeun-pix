$path = 'D:\boeun-pix\boeun-pix\index.html'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$patterns = @('openPxSurveyAiModal', 'AI 분석 및 보고서 작성', 'AI 분석하기', 'border-violet-600')
foreach ($p in $patterns) {
  Write-Output "=== $p ==="
  $i = 0
  $count = 0
  while (($idx = $content.IndexOf($p, $i)) -ge 0 -and $count -lt 3) {
    $start = [Math]::Max(0, $idx - 300)
    $len = [Math]::Min(900, $content.Length - $start)
    Write-Output "--- match $($count+1) at $idx ---"
    Write-Output $content.Substring($start, $len)
    Write-Output ''
    $i = $idx + $p.Length
    $count++
  }
  if ($count -eq 0) { Write-Output '(no matches)' }
}
