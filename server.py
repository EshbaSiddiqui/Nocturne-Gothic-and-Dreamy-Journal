#!/usr/bin/env python3
"""
Nocturne Web App - Local Server Launcher
Launches a lightweight local HTTP server and opens Nocturne in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080

class NocturneRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.svg'):
            return 'image/svg+xml'
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

def find_available_port(start_port):
    import socket
    port = start_port
    while port < start_port + 100:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
            port += 1
    return start_port

def run():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = find_available_port(PORT)
    url = f"http://localhost:{port}"

    print("=" * 60)
    print(f"NOCTURNE - Personal Gothic Diary & Sanctuary")
    print(f"Serving live at: {url}")
    print("=" * 60)

    try:
        webbrowser.open(url)
    except Exception:
        pass

    handler = NocturneRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.server_close()

if __name__ == "__main__":
    run()
