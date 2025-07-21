#!/usr/bin/env bash
set -e

# Update package list and install Chromium with all dependencies
apt-get update && apt-get install -y \
  chromium-browser \
  chromium-codecs-ffmpeg \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcairo-gobject2 \
  libdrm2 \
  libgdk-pixbuf2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  xdg-utils \
  --no-install-recommends

# Clean up to reduce image size
apt-get clean && rm -rf /var/lib/apt/lists/*

echo "Chrome installation completed successfully"