$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourcePath = (Get-ChildItem -LiteralPath "C:\Users\elmas\Downloads" -Filter "*Cursor-v23.html" | Select-Object -First 1).FullName
if (-not $sourcePath) { throw "VOC checkpoint file was not found." }
$outputPath = Join-Path $root "voc-statistics-recovered.html"
$transcriptPath = "C:\Users\elmas\.cursor\projects\d-cursor-PIX-AI-master-web\agent-transcripts\f3bb7ab0-0cce-4eaa-bfaa-993adbf9eec4\f3bb7ab0-0cce-4eaa-bfaa-993adbf9eec4.jsonl"

$content = [IO.File]::ReadAllText($sourcePath, [Text.Encoding]::UTF8).Replace("`r`n", "`n")
$stats = @{ strApplied = 0; strSkipped = 0; patchApplied = 0; patchSkipped = 0 }
$lineNumber = 0

function Replace-First([string]$text, [string]$oldText, [string]$newText) {
  $index = $text.IndexOf($oldText, [StringComparison]::Ordinal)
  if ($index -lt 0) { return $null }
  return $text.Substring(0, $index) + $newText + $text.Substring($index + $oldText.Length)
}

function Apply-PatchText([string]$text, [string]$patchText) {
  $normalized = $patchText.Replace("`r`n", "`n")
  if ($normalized -notmatch '(?m)^\*\*\* Update File: .*voc-statistics-mock\.html\s*$') {
    return @{ content = $text; applied = 0; skipped = 0 }
  }

  $lines = $normalized -split "`n"
  $hunks = New-Object System.Collections.Generic.List[object]
  $current = $null
  foreach ($line in $lines) {
    if ($line -match '^@@') {
      if ($null -ne $current -and $current.Count -gt 0) { $hunks.Add($current) }
      $current = New-Object System.Collections.Generic.List[string]
      continue
    }
    if ($null -eq $current) { continue }
    if ($line -eq '*** End Patch' -or $line -match '^\*\*\* (Update|Add) File:') {
      if ($current.Count -gt 0) { $hunks.Add($current) }
      $current = $null
      continue
    }
    if ($line.Length -gt 0 -and " +-".Contains($line.Substring(0, 1))) {
      $current.Add($line)
    }
  }
  if ($null -ne $current -and $current.Count -gt 0) { $hunks.Add($current) }

  $applied = 0
  $skipped = 0
  foreach ($hunk in $hunks) {
    $oldLines = New-Object System.Collections.Generic.List[string]
    $newLines = New-Object System.Collections.Generic.List[string]
    $removedLines = New-Object System.Collections.Generic.List[string]
    $addedLines = New-Object System.Collections.Generic.List[string]
    foreach ($line in $hunk) {
      $prefix = $line.Substring(0, 1)
      $value = $line.Substring(1)
      if ($prefix -eq ' ' -or $prefix -eq '-') { $oldLines.Add($value) }
      if ($prefix -eq ' ' -or $prefix -eq '+') { $newLines.Add($value) }
      if ($prefix -eq '-') { $removedLines.Add($value) }
      if ($prefix -eq '+') { $addedLines.Add($value) }
    }
    $oldBlock = [string]::Join("`n", $oldLines)
    $newBlock = [string]::Join("`n", $newLines)
    if ($oldBlock.Length -eq 0) {
      $skipped++
      continue
    }
    $replaced = Replace-First $text $oldBlock $newBlock
    if ($null -eq $replaced) {
      $removedBlock = [string]::Join("`n", $removedLines)
      $addedBlock = [string]::Join("`n", $addedLines)
      if ($removedBlock.Length -gt 0) {
        $fallback = Replace-First $text $removedBlock $addedBlock
        if ($null -ne $fallback) {
          $text = $fallback
          $applied++
        } else {
          $skipped++
        }
      } else {
        $skipped++
      }
    } else {
      $text = $replaced
      $applied++
    }
  }
  return @{ content = $text; applied = $applied; skipped = $skipped }
}

Get-Content -LiteralPath $transcriptPath -Encoding UTF8 | ForEach-Object {
  $lineNumber++
  if ($lineNumber -lt 1258) { return }
  if ($lineNumber -gt 1443) { return }
  try { $entry = $_ | ConvertFrom-Json } catch { return }
  foreach ($tool in $entry.message.content) {
    if ($tool.type -ne "tool_use") { continue }

    if ($tool.name -eq "StrReplace") {
      $inputPath = [string]$tool.input.path
      if (-not $inputPath.EndsWith("voc-statistics-mock.html", [StringComparison]::OrdinalIgnoreCase)) { continue }
      $oldText = ([string]$tool.input.old_string).Replace("`r`n", "`n")
      $newText = ([string]$tool.input.new_string).Replace("`r`n", "`n")
      if ([bool]$tool.input.replace_all) {
        if ($content.Contains($oldText)) {
          $content = $content.Replace($oldText, $newText)
          $stats.strApplied++
        } else {
          $stats.strSkipped++
        }
      } else {
        $replaced = Replace-First $content $oldText $newText
        if ($null -eq $replaced) {
          $stats.strSkipped++
        } else {
          $content = $replaced
          $stats.strApplied++
        }
      }
    }

    if ($tool.name -eq "ApplyPatch") {
      $patchText = [string]$tool.input
      if ($patchText -notlike "*voc-statistics-mock.html*") { continue }
      $result = Apply-PatchText $content $patchText
      $content = $result.content
      $stats.patchApplied += $result.applied
      $stats.patchSkipped += $result.skipped
    }
  }
}

$utf8WithoutBom = New-Object Text.UTF8Encoding($false)
[IO.File]::WriteAllText($outputPath, $content, $utf8WithoutBom)

Write-Output ("Recovered characters: " + $content.Length)
Write-Output ("StrReplace applied/skipped: " + $stats.strApplied + "/" + $stats.strSkipped)
Write-Output ("Patch hunks applied/skipped: " + $stats.patchApplied + "/" + $stats.patchSkipped)
