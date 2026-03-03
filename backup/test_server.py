import http.server
import socketserver
import os
import threading
import time
import urllib.request

# 设置端口
PORT = 8000

# 启动HTTP服务器的函数
def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Server started at http://127.0.0.1:{PORT}")
        httpd.serve_forever()

# 测试HTTP服务器的函数
def test_server():
    print("Testing HTTP server...")
    try:
        # 等待服务器启动
        time.sleep(1)
        
        # 测试访问根路径
        url = f"http://127.0.0.1:{PORT}"
        print(f"Accessing: {url}")
        response = urllib.request.urlopen(url, timeout=5)
        status_code = response.getcode()
        print(f"Response code: {status_code}")
        
        # 检查返回内容
        content = response.read().decode('utf-8')
        print(f"Response length: {len(content)} bytes")
        
        # 测试访问index.html
        url = f"http://127.0.0.1:{PORT}/index.html"
        print(f"Accessing: {url}")
        response = urllib.request.urlopen(url, timeout=5)
        status_code = response.getcode()
        print(f"Response code: {status_code}")
        
        content = response.read().decode('utf-8')
        print(f"Response length: {len(content)} bytes")
        print(f"Contains '<html>' tag: {'<html' in content.lower()}")
        
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

# 主函数
if __name__ == "__main__":
    print("Testing HTTP server setup...")
    
    # 检查当前目录
    print(f"Current directory: {os.getcwd()}")
    print("Files in directory:")
    for file in os.listdir('.'):
        if os.path.isfile(file):
            print(f"  - {file}")
    
    # 检查index.html是否存在
    if os.path.exists('index.html'):
        print("index.html found!")
    else:
        print("ERROR: index.html not found!")
    
    # 启动服务器线程
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # 测试服务器
    success = test_server()
    
    if success:
        print("\n✅ HTTP server test passed!")
        print(f"\nYou can now access the game at: http://127.0.0.1:{PORT}")
        print("Press Ctrl+C to stop the server.")
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nServer stopped.")
    else:
        print("\n❌ HTTP server test failed!")
