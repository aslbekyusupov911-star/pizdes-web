import sys
import os

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Add root directory to sys.path so "backend" module can be imported properly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

import uvicorn

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    print(f"🚀 UTU Ranch Backend ishga tushmoqda: http://localhost:{port}")
    print(f"📖 API Hujjatlar (Swagger UI): http://localhost:{port}/docs")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
