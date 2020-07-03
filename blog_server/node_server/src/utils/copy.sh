#!/bin/sh
cd /Users/gaohang/Side-Project/个人博客后端项目/node_server/vanilla_ver/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log