# How to Browse the Web Undetected: Privacy in Virtual Environments (Experiment)

**Stealth Chrome Puppeteer** is a privacy-focused automation tool designed to simulate natural human browsing behavior and evade modern detection mechanisms often deployed by websites—especially when running in virtualized environments (VMs). It leverages **Puppeteer**, **Google Chrome**, and a series of stealth countermeasures to ensure smooth and undetectable web interactions.

## Why This Project?

Many websites actively detect and block traffic from:

- Virtual machines
- Headless browsers
- Unusual hardware environments (e.g., fake GPU, VM camera/mic)

This tool addresses these privacy challenges by mimicking expected browser behavior and spoofing key environmental signals—allowing developers, testers, and privacy advocates to interact with the web without being unfairly flagged.

## Features

This project implements real-world stealth techniques including:

### 1. Focus/Blur Evasion
Blocks focus and visibility change events bound to the `window` and `document` objects, making the browser appear always active and in focus.

### 2. Smooth Mouse Movement
Simulates realistic cursor movement with interpolated mouse events to prevent "teleporting" behavior common in virtual machines.

### 3. GPU (WebGL) Spoofing
Overrides `WebGLRenderingContext.getParameter` to return realistic, non-VM GPU vendor and renderer values.

### 4. CPU Core Spoofing
Replaces `navigator.hardwareConcurrency` with a plausible value (e.g., `4`) to avoid hardware profile mismatches.

### 5. Camera and Microphone Masking
Spoofs device labels in `navigator.mediaDevices.enumerateDevices` to hide virtual device identifiers like "VirtualBox Camera".

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- Google Chrome installed locally

### Install Dependencies

```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth
```

### Run the Script

```bash
node stealth-chrome.js
```

> Make sure to update the path to the Chrome binary in the script if you're using macOS or Windows.

### Chrome Path Reference

| OS       | Chrome Path                                                 |
|----------|-------------------------------------------------------------|
| Linux    | `/usr/bin/google-chrome`                                    |
| macOS    | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` |
| Windows  | `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe` |

## File Structure

```
/project-root
├── src/                    # Sources
├── src/stealth-chrome.js   # Main Puppeteer script
├── package.json            # Project metadata and dependencies
└── README.md               # You're reading this!
```

## Legal & Ethical Notice

This tool is intended for ethical use only—such as testing, development, research, and privacy enhancement. It does **not** promote scraping of protected content or evasion of terms of service for malicious purposes.

## Medium

[https://medium.com/@olaferlandsen/how-to-browse-the-web-undetected-privacy-in-virtual-environments-a1f5dde4d43e](https://medium.com/@olaferlandsen/how-to-browse-the-web-undetected-privacy-in-virtual-environments-a1f5dde4d43e)