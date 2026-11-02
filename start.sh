#!/bin/bash
# Запуск приложения СловоВместе на локальном сервере Mac
PORT=3000
echo "🚀 Запуск приложения «СловоВместе» на http://localhost:$PORT ..."
open "http://localhost:$PORT" 2>/dev/null || true
python3 -m http.server $PORT
