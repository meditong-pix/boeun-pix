$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$targetPath = Join-Path $root "index.html"
$sourcePath = (
  Get-ChildItem -Path "D:\*\*\html\*\*Cursor-v23.html" -File |
  Select-Object -First 1
).FullName
$beginMarker = "<!-- VOC_MENU_MASTER_SYNC_START -->"
$endMarker = "<!-- VOC_MENU_MASTER_SYNC_END -->"

if (-not $sourcePath -or -not (Test-Path -LiteralPath $sourcePath)) {
  throw "VOC menu reference file was not found."
}
if (-not (Test-Path -LiteralPath $targetPath)) {
  throw "index.html was not found."
}

$utf8 = [Text.Encoding]::UTF8
$source = [IO.File]::ReadAllText($sourcePath, $utf8)
$target = [IO.File]::ReadAllText($targetPath, $utf8)

$startToken = "    <script>`r`n      (function () {`r`n        if (window.__VOC_SETTINGS_PATCH_V1__) return;"
$start = $source.IndexOf($startToken, [StringComparison]::Ordinal)
if ($start -lt 0) {
  $startToken = "    <script>`n      (function () {`n        if (window.__VOC_SETTINGS_PATCH_V1__) return;"
  $start = $source.IndexOf($startToken, [StringComparison]::Ordinal)
}
if ($start -lt 0) {
  throw "VOC settings patch start marker was not found."
}

$inboxFlag = "window.__VOC_INBOX_RESTORE_PATCHED_CREATE__ = true;"
$flagAt = $source.IndexOf($inboxFlag, $start, [StringComparison]::Ordinal)
if ($flagAt -lt 0) {
  throw "VOC inbox patch end marker was not found."
}
$scriptEnd = $source.IndexOf("</script>", $flagAt, [StringComparison]::Ordinal)
if ($scriptEnd -lt 0) {
  throw "VOC inbox script closing tag was not found."
}
$scriptEnd += "</script>".Length
$patch = $source.Substring($start, $scriptEnd - $start)
$managedBlock = "$beginMarker`r`n$patch`r`n$endMarker"

$existingPattern = "(?s)" + [Text.RegularExpressions.Regex]::Escape($beginMarker) + ".*?" + [Text.RegularExpressions.Regex]::Escape($endMarker)
if ([Text.RegularExpressions.Regex]::IsMatch($target, $existingPattern)) {
  $updated = [Text.RegularExpressions.Regex]::Replace($target, $existingPattern, [Text.RegularExpressions.MatchEvaluator]{ param($m) $managedBlock }, 1)
} else {
  $bodyClose = $target.LastIndexOf("</body>", [StringComparison]::OrdinalIgnoreCase)
  if ($bodyClose -lt 0) {
    throw "index.html body closing tag was not found."
  }
  $updated = $target.Insert($bodyClose, "$managedBlock`r`n  ")
}

# Remove the permission menu from the original menu structure as well, so it
# cannot flash before the synchronized runtime patch is applied.
$permissionLabel =
  [string][char]0xAD8C +
  [string][char]0xD55C +
  " " +
  [string][char]0xAD00 +
  [string][char]0xB9AC
$permissionMenuPattern =
  ',\{id:"' +
  [Text.RegularExpressions.Regex]::Escape($permissionLabel) +
  '",icon:"[^"]+"\}'
$updated = [Text.RegularExpressions.Regex]::Replace(
  $updated,
  $permissionMenuPattern,
  "",
  1
)

[IO.File]::WriteAllText($targetPath, $updated, (New-Object Text.UTF8Encoding($false)))
Write-Host "VOC inbox and keyword settings synced from the reference file."
