#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-web-chat-670039-670048/chat_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

