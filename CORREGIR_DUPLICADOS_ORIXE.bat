@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

echo.
echo === ORIXE - DETECTOR DE MISIONES REPETIDAS ===
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$files=Get-ChildItem 'src\content\missions\*.yaml'; $seen=@{}; $next=1; foreach($f in $files){ $txt=Get-Content $f.FullName -Raw; $m=[regex]::Match($txt,'(?m)^slug:\s*[\"'']?([^\"''\r\n]+)[\"'']?\s*$'); if(!$m.Success){continue}; $slug=$m.Groups[1].Value.Trim(); if($seen.ContainsKey($slug)){ $base=$seen[$slug]; $num=[int][regex]::Match($base,'ORX-(\d+)').Groups[1].Value; $newnum=$num; while($files.Name -match ('orx-{0:D4}' -f $newnum)){ $newnum++ }; $newid='ORX-{0:D4}' -f $newnum; $newslug=$slug+'-'+$newnum; $txt=[regex]::Replace($txt,'(?m)^id:\s*.*$','id: '+$newid,1); $txt=[regex]::Replace($txt,'(?m)^slug:\s*.*$','slug: "'+$newslug+'"',1); $newname='orx-'+('{0:D4}' -f $newnum)+'-'+$slug+'.yaml'; Copy-Item $f.FullName (Join-Path $f.DirectoryName $newname); Set-Content -Path (Join-Path $f.DirectoryName $newname) -Value $txt -Encoding UTF8; Write-Host ('DUPLICADO: '+$f.Name+' -> '+$newname+' | slug: '+$newslug+' | id: '+$newid); } else {$seen[$slug]=$f.BaseName; Write-Host ('OK: '+$f.Name+' | slug: '+$slug)} }"

echo.
echo Si aparece DUPLICADO, conserva ambos archivos.
echo El segundo recibe un ID y slug nuevos para evitar sobreescrituras.
echo.
pause
