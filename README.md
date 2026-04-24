# Friday AI: Intelligent Voice Agent

Friday is a sophisticated, low-latency AI voice assistant built on top of LiveKit and Google's Gemini Realtime Model. Designed to feel like a professional monitoring instrument, it can handle natural conversations and execute complex system tasks such as controlling your PC, searching the web, and managing your digital life.

---

## 🚀 Features

- **Natural Voice Conversations**: Real-time communication powered by Google Gemini (Zephyr voice).
- **Web Intelligence**: 
  - Real-time web search (DuckDuckGo).
  - Current weather updates.
  - Automatic website navigation.
- **System Control**:
  - Volume manipulation.
  - Desktop screenshots.
  - PC Power control (Lock, Shutdown, Restart).
  - Battery status monitoring.
- **Productivity & Media**:
  - Integrated YouTube player.
  - Email sending via Gmail.
  - System application management (Notepad, Calculator, VS Code, etc.).
  - File system navigation.

---

## 🛠️ Tech Stack

### Backend (Python)
- **Framework**: [LiveKit Agents](https://docs.livekit.io/agents/)
- **LLM**: Google Gemini Realtime (RealtimeModel)
- **Tools**: yt-dlp, pyautogui, psutil, LangChain, DuckDuckGo Search, mem0ai.

### Frontend (Next.js)
- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: Radix UI / Lucide React
- **Streaming**: LiveKit React Components

---

## ⚙️ Setup & Installation

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**
- **LiveKit Account**: Get a project URL and API keys from [LiveKit Cloud](https://cloud.livekit.io/).
- **API Keys**:
  - Google Gemini API Key
  - WeatherAPI Key
  - Google/Gmail App Password (for email functionality)

### 1. Backend Setup
1. Navigate to the root directory:
   ```bash
   pip install -r requirements.txt
   ```
2. Create a `.env` file in the root:
   ```env
   LIVEKIT_URL=your_livekit_url
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   GOOGLE_API_KEY=your_gemini_key
   WEATHER_API_KEY=your_weather_key
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_app_password
   ```
3. Run the agent:
   ```bash
   python agent.py dev
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env.local` file in `frontend/`:
   ```env
   LIVEKIT_URL=your_livekit_url
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   NEXT_PUBLIC_LIVEKIT_URL=your_livekit_url
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📖 Usage
1. Ensure the Python agent is running (`python agent.py dev`).
2. Open the frontend in your browser (usually `http://localhost:3000`).
3. Click "Connect" to start the conversation with Friday.
4. Try asking: *"Hey Friday, open YouTube and play some Lo-Fi music"* or *"Friday, what's my battery status?"*



# MIT License

Copyright (c) 2026 Abdul Rehman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

## Conditions

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

