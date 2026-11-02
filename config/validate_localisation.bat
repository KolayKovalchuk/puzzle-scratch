@echo off
setlocal

:: Check if file name is provided
if "%~1"=="" (
    echo Usage: %0 <file_name>
    exit /b 1
)

:: Path to the JSON file
set "FILE=.\localisation\%~1"

:: Check if the file exists
if not exist "%FILE%" (
    echo File not found!
    exit /b 1
)

:: Use PowerShell to validate JSON structure and language keys
powershell -Command ^
    "try {" ^
    "    # Load the JSON file" ^
    "    $json = Get-Content -Path '%FILE%' -Raw | ConvertFrom-Json" ^
    "    # Get expected keys from the first item (excluding 'Key')" ^
    "    $expectedKeys = $json[0].PSObject.Properties.Name | Where-Object { $_ -ne 'Key' }" ^
    "    # Iterate through each item to check for missing keys" ^
    "    foreach ($item in $json) {" ^
    "        $itemKey = $item.Key" ^
    "        $itemKeys = $item.PSObject.Properties.Name | Where-Object { $_ -ne 'Key' }" ^
    "        # Find any missing keys" ^
    "        $missingKeys = $expectedKeys | Where-Object { $_ -notin $itemKeys }" ^
    "        if ($missingKeys.Count -gt 0) {" ^
    "            Write-Output \"Error: Inconsistent languages in item: $itemKey\"" ^
    "            Write-Output \"Missing keys: $($missingKeys -join ', ')\"" ^
    "            exit 1" ^
    "        }" ^
    "    }" ^
    "    Write-Output 'JSON is valid, and all items have consistent language keys.'" ^
    "} catch {" ^
    "    Write-Output 'Invalid JSON format.'" ^
    "    exit 1" ^
    "}"
