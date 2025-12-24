# NoyaTab - Chrome New Tab Extension – CS50 Final Project

## 📌 Project Overview
This project is a **Google Chrome New Tab Extension** that replaces the default new tab page with a modern, customizable, and productivity-focused dashboard.

The extension provides commonly used daily tools such as search, time, task management, calendar, weather information, and personalization options — all accessible from a single new tab.

This project was developed as the **Final Project for Harvard University's CS50 course**.

---

## 🎥 Project Demonstration Video
You can watch a full demonstration of the project on YouTube:

🔗 **YouTube Link:**  
https://youtu.be/BOMlSdvaRUQ

The video explains:
- Project features
- How the extension works
- Design choices
- How to load and use the extension in Chrome

---

## ✨ Features

### 🔍 Google Search
- Google search input directly from the New Tab page
- Displays the **last 3 search queries**
- Search history stored locally

### ⏰ Live Clock
- Displays the system time in real time

### 📝 Advanced To-Do List
- Add and remove tasks
- Assign priority levels:
  - No priority
  - Low
  - Medium
  - High
- **Blur / hide tasks feature**
  - Designed to protect user privacy during screen sharing
- All tasks are stored using `localStorage`

### 📅 Persian (Jalali) Calendar
- Independent Persian calendar
- Displays official holidays
- Shows daily events and occasions

### 🌦️ Weather Information
- Displays real-time weather data
- Supports **all cities in Iran**
- Fetches data using an external Weather API

### 🎨 Background Customization
- Separate settings panel
- Ability to change the New Tab background
- User preferences persist across sessions

---

## 💾 Data Storage
All user-related data, including:
- To-do list items
- Search history
- Background preferences
- Application settings

are stored locally using the browser’s `localStorage`.

### ❗ Why localStorage Instead of chrome.storage?
Although Chrome provides `chrome.storage` for cloud synchronization, `localStorage` was intentionally chosen because:

- Data is **not synchronized between devices**
- Each device maintains its own independent data
- This approach improves user privacy and device-specific customization

---

## 🛠️ Technologies Used
- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extension APIs
- External Weather API
- localStorage

---

## 🚀 How to Run the Project

### Option 1: Run Using Pre-built `dist` Folder (Recommended)
This is the easiest way to run the extension and does not require Node.js.

1. Open Google Chrome
2. Navigate to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the `dist` folder inside the project directory
6. Open a new tab to use the extension

---

### Option 2: Build From Source
If you want to build the project manually:

1. Make sure **Node.js** is installed
2. Install dependencies:
   ```bash
   npm install
