$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$checkpoint = Join-Path $root ".voc-latest-checkpoint"
$files = @(
  "index.html",
  "voc-statistics-mock.html",
  "sync-voc-statistics.ps1",
  "sync-voc-menus-from-master.ps1"
)

[IO.Directory]::CreateDirectory($checkpoint) | Out-Null

foreach ($name in $files) {
  $source = Join-Path $root $name
  if (-not (Test-Path -LiteralPath $source)) {
    throw "$name 파일을 찾을 수 없습니다."
  }
  [IO.File]::Copy($source, (Join-Path $checkpoint $name), $true)
}

$manifest = [ordered]@{
  savedAt = [DateTimeOffset]::Now.ToString("o")
  note = "Latest approved VOC statistics state. Restore with restore-voc-checkpoint.ps1."
  files = @{}
}
foreach ($name in $files) {
  $path = Join-Path $checkpoint $name
  $manifest.files[$name] = @{
    sha256 = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
    bytes = (Get-Item -LiteralPath $path).Length
  }
}

$json = $manifest | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText(
  (Join-Path $checkpoint "manifest.json"),
  $json,
  (New-Object Text.UTF8Encoding($false))
)

Write-Host "VOC latest checkpoint saved: $checkpoint"
