try {
    $response = Invoke-WebRequest -Uri 'https://dolevatik.github.io/Web4You/' -UseBasicParsing -TimeoutSec 10
    Write-Host "Site is accessible!" 
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Content Length: $($response.Content.Length) bytes"
    
    if ($response.Content -match "Web4You") {
        Write-Host "Site contains expected content"
    }
    if ($response.Content -match "DOCTYPE") {
        Write-Host "Valid HTML detected"
    }
}
catch {
    Write-Host "Error accessing site:"
    Write-Host $_.Exception.Message
}
