# Start a simple local HTTP server for the project.
# Usage: Open PowerShell in the project root and run:
#   .\start-server.ps1

param(
    [int]$Port = 8000
)

function Start-With-Python {
    Write-Host "Starting Python 3 HTTP server on port $Port..."
    # Start python -m http.server in a new window
    Start-Process -NoNewWindow -FilePath python -ArgumentList "-m", "http.server", "$Port"
}

function Start-With-Node {
    Write-Host "Starting http-server (Node) on port $Port via npx..."
    Start-Process -NoNewWindow -FilePath npx -ArgumentList "http-server", "-p", "$Port"
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    Start-With-Python
} elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Start-With-Node
} else {
    Write-Host "No Python or npx (http-server) found on PATH."
    Write-Host "Install Python 3 or Node.js, or run one of these commands manually:" 
    Write-Host "  python -m http.server 8000"
    Write-Host "  npx http-server -p 8000"
}

Write-Host "Open http://localhost:$Port in your browser to view the site."