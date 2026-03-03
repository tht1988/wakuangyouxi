import http.server
import socketserver
import os

PORT = 8000

# 获取当前工作目录
current_dir = os.getcwd()

# 创建HTTP请求处理器
Handler = http.server.SimpleHTTPRequestHandler

# 设置工作目录
os.chdir(current_dir)

# 创建TCP服务器
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Server running at http://127.0.0.1:{PORT}")
    print(f"Serving files from: {current_dir}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()
