try {
    $response = Invoke-WebRequest -Uri 'https://dolevatik.github.io/Web4You/' -UseBasicParsing -TimeoutSec 10
    $content = $response.Content
    
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Size: $($content.Length) bytes"
    
    if ($content -match "src/main") { 
        Write-Host "Using DEV version (src/main.jsx)" 
    } elseif ($content -match "/Web4You/assets") {
        Write-Host "Using BUILT version (/Web4You/assets)"
    }
    
    if ($content -match "DOCTYPE") { 
        Write-Host "HTML is valid" 
    }
    
    Write-Host ""
    Write-Host "First 600 chars:"
    Write-Host $content.Substring(0, [Math]::Min(600, $content.Length))
}
catch {
    Write-Host "Error: $($_.Exception.Message)"
}
