# RazorNexus - Zero-Dependency Local HTTP Server (PowerShell)
$port = 8080
$folder = $PSScriptRoot

Write-Host "====================================================" -ForegroundColor White
Write-Host "  RazorNexus — Autonomous Agentic Commerce Protocol" -ForegroundColor White
Write-Host "  Engineered by Palash Tripathi (Noida, India)" -ForegroundColor Gray
Write-Host "====================================================" -ForegroundColor White
Write-Host "Serving static files from: $folder" -ForegroundColor Gray
Write-Host "Opening application on: http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server.`n" -ForegroundColor DarkGray

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Start-Process "http://localhost:$port/index.html"
} catch {
    Write-Host "Port $port might be busy or permission needed. Opening directly in default browser..." -ForegroundColor Yellow
    Start-Process "$folder\index.html"
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($path)) {
            $path = "index.html"
        }

        $filePath = Join-Path $folder $path

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Content Types
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # Loop continuation
    }
}
