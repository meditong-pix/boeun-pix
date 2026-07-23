$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$checkpoint = Join-Path $root ".voc-latest-checkpoint"
$manifestPath = Join-Path $checkpoint "manifest.json"

if (-not (Test-Path -LiteralPath $manifestPath)) {
  throw "저장된 VOC 체크포인트가 없습니다. save-voc-checkpoint.ps1을 먼저 실행하세요."
}

$manifest = [IO.File]::ReadAllText($manifestPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
$files = @(
  "index.html",
  "voc-statistics-mock.html",
  "sync-voc-statistics.ps1",
  "sync-voc-menus-from-master.ps1"
)
foreach ($name in $files) {
  $source = Join-Path $checkpoint $name
  $expected = $manifest.files.$name.sha256
  $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
  if ($actual -ne $expected) {
    throw "체크포인트의 $name 해시가 일치하지 않아 복원을 중단합니다."
  }
}

foreach ($name in $files) {
  [IO.File]::Copy((Join-Path $checkpoint $name), (Join-Path $root $name), $true)
}

Write-Host "VOC latest checkpoint restored (saved at $($manifest.savedAt))."
