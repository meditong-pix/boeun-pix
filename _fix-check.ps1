$path = 'D:\boeun-pix\boeun-pix\index.html'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$start = $content.IndexOf('React.createElement("div",{className:"p-4"},/*#__PURE__*/React.createElement("div",{className:"flex items-end gap-3 flex-nowrap flex-wrap w-full"}')
if ($start -lt 0) { Write-Output 'filter block start not found'; exit 1 }
$end = $content.IndexOf('/*#__PURE__*/React.createElement("section",null,/*#__PURE__*/React.createElement("h3"', $start)
$block = $content.Substring($start, $end - $start)
$open = ([regex]::Matches($block, 'React\.createElement\(')).Count
$closeGuess = ($block.ToCharArray() | Where-Object { $_ -eq ')' }).Count
Write-Output "Block length: $($block.Length)"
Write-Output "createElement opens: $open"
Write-Output "close parens in block: $closeGuess"
Write-Output '--- tail ---'
Write-Output $block.Substring([Math]::Max(0, $block.Length - 500))
