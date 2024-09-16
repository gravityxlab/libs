#!/bin/bash

# 檢查是否提供了證書目錄參數，否則使用默認值
if [ $# -eq 1 ]; then
  CERT_DIR="$1"
else
  CERT_DIR="./.https_cert"
fi

# 檢查 .https_cert 資料夾是否存在，不存在則創建
if [ ! -d "$CERT_DIR" ]; then
  echo "Creating directory $CERT_DIR..."
  mkdir -p "$CERT_DIR"
fi

# 檢查是否安裝了 mkcert，若未安裝則自動安裝
if ! command -v mkcert &> /dev/null; then
  echo "mkcert is not installed. Installing mkcert..."
  
  # 檢查操作系統並進行安裝
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt update && sudo apt install -y mkcert libnss3-tools
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew install mkcert
    brew install nss # 用於 Firefox
  else
    echo "Unsupported OS. Please install mkcert manually."
    exit 1
  fi
fi

# 安裝本地根證書（如果尚未安裝）
mkcert -install

# 生成 localhost 的 SSL 憑證，並將它們存放到 .https_cert 資料夾
mkcert -key-file "$CERT_DIR/localhost-key.pem" -cert-file "$CERT_DIR/localhost.pem" localhost 127.0.0.1 ::1

# 結果提示
echo "SSL certificate and key have been generated and saved to $CERT_DIR:"
echo " - $CERT_DIR/localhost.pem (Certificate)"
echo " - $CERT_DIR/localhost-key.pem (Private Key)"
