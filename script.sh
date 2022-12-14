#!/bin/bash

cd ./dist
nohup pm2 start main.js &
nohup service mysql start &