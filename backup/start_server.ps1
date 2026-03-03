# 简单HTTP服务器脚本
$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "HTTP Server running on http://localhost:$port"
Write-Host "Press Ctrl+C to stop the server"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    try {
        # 获取请求的文件路径
        $filePath = $request.Url.LocalPath
        if ($filePath -eq "/") {
            $filePath = "/index.html"
        }
        
        # 转换为本地文件路径
        $localPath = Join-Path -Path $PSScriptRoot -ChildPath $filePath.TrimStart("/")
        
        # 检查文件是否存在
        if (Test-Path $localPath -PathType Leaf) {
            # 读取文件内容
            $content = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $content.Length
            
            # 设置Content-Type
            $extension = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = switch ($extension) {
                ".html" { "text/html" }
                ".js" { "application/javascript" }
                ".css" { "text/css" }
                ".json" { "application/json" }
                ".png" { "image/png" }
                ".jpg" { "image/jpeg" }
                ".gif" { "image/gif" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $contentType
            
            # 发送响应
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            # 文件不存在，返回404
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $content = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        }
    } catch {
        # 处理错误
        $response.StatusCode = 500
        $response.ContentType = "text/plain"
        $content = [System.Text.Encoding]::UTF8.GetBytes("500 - Internal Server Error")
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } finally {
        # 关闭响应流
        $response.Close()
    }
}

$listener.Stop()
$listener.Close()
Write-Host "Server stopped"
