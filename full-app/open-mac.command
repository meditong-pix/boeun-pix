#!/bin/bash
# 더블클릭 시 기본 브라우저로 전체 앱(index.html)을 엽니다. (서버 불필요, 인터넷 필요)
cd "$(dirname "$0")"
open "index.html"
