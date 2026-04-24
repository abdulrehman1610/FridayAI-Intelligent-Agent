import logging
import webbrowser
import os
import datetime
import asyncio
import yt_dlp
from livekit.agents import function_tool, RunContext
import requests
from langchain_community.tools import DuckDuckGoSearchRun

_ddg_search = DuckDuckGoSearchRun()
from email.mime.multipart import MIMEMultipart  
from email.mime.text import MIMEText
from typing import Optional
import smtplib
import subprocess
import psutil
import pyautogui


@function_tool()
async def get_weather(context: RunContext, city: str) -> str:
    """Get the current weather for a given city."""
    try:
        api_key = os.getenv("WEATHER_API_KEY")
        response = await asyncio.to_thread(
            requests.get,
            f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"
        )
        data = response.json()
        name = data["location"]["name"]
        country = data["location"]["country"]
        temp_c = data["current"]["temp_c"]
        feels_like = data["current"]["feelslike_c"]
        condition = data["current"]["condition"]["text"]
        humidity = data["current"]["humidity"]
        wind = data["current"]["wind_kph"]
        return (
            f"Weather in {name}, {country}: {condition}. "
            f"Temperature: {temp_c}°C, feels like {feels_like}°C. "
            f"Humidity: {humidity}%, Wind: {wind} km/h."
        )
    except Exception as e:
        return f"Error getting weather: {e}"

@function_tool()
async def search_web(context: RunContext, query: str) -> str:
    """Search the web using DuckDuckGo."""
    try:
        results = await asyncio.to_thread(_ddg_search.run, query)
        return results
    except Exception as e:
        return f"An error occurred while searching the web for '{query}'."

@function_tool()
async def open_website(context: RunContext, site: str) -> str:
    """Open a website in the browser. Examples: google, youtube, facebook, instagram, chatgpt"""
    sites = {
        "google": "https://google.com",
        "youtube": "https://youtube.com",
        "facebook": "https://facebook.com",
        "instagram": "https://instagram.com",
        "chatgpt": "https://chatgpt.com",
    }
    url = sites.get(site.lower(), f"https://{site}.com")
    webbrowser.open(url)
    return f"Opened {site} in your browser."

@function_tool()
async def get_time(context: RunContext) -> str:
    """Get the current time and date."""
    now = datetime.datetime.now()
    return f"The current time is {now.strftime('%I:%M %p')} and date is {now.strftime('%d %B %Y')}"

@function_tool()
async def open_folder(context: RunContext, folder_name: str) -> str:
    """Open a folder from the user's home directory."""
    try:
        path = os.path.join(os.path.expanduser('~'), folder_name)
        if os.path.isdir(path):
            await asyncio.to_thread(os.startfile, path)
            return f"Opened the {folder_name} folder."
        return f"Could not find a folder named {folder_name} in your home directory."
    except Exception as e:
        return f"Error opening folder: {e}"

@function_tool()
async def play_youtube(context: RunContext, song: str) -> str:
    """Play a song or video on YouTube."""
    try:
        ydl_opts = {
            'quiet': True,
            'extract_flat': 'in_playlist',
            'default_search': 'ytsearch1',
            'noplaylist': True,
            'socket_timeout': 5,
        }
        def search():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                return ydl.extract_info(song, download=False)

        search_result = await asyncio.to_thread(search)
        if 'entries' in search_result and len(search_result['entries']) > 0:
            first_video = search_result['entries'][0]
            url = f"https://www.youtube.com/watch?v={first_video['id']}?autoplay=1"
            title = first_video.get("title", "Unknown Title")
            webbrowser.open(url)
            return f"Playing {title} on YouTube."
        return "Sorry, I couldn't find anything on YouTube."
    except Exception as e:
        return f"Something went wrong while searching YouTube: {e}"

@function_tool()
async def send_email(
    context: RunContext,
    to_email: str,
    subject: str,
    message: str,
    cc_email: Optional[str] = None
) -> str:
    """Send an email through Gmail."""
    try:
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        gmail_user = os.getenv("GMAIL_USER")
        gmail_password = os.getenv("GMAIL_APP_PASSWORD")

        if not gmail_user or not gmail_password:
            return "Email sending failed: Gmail credentials not configured."

        def send():
            msg = MIMEMultipart()
            msg['From'] = gmail_user
            msg['To'] = to_email
            msg['Subject'] = subject
            recipients = [to_email]
            if cc_email:
                msg['Cc'] = cc_email
                recipients.append(cc_email)
            msg.attach(MIMEText(message, 'plain'))
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, recipients, msg.as_string())
            server.quit()

        await asyncio.to_thread(send)
        return f"Email sent successfully to {to_email}"
    except smtplib.SMTPAuthenticationError:
        return "Email sending failed: Authentication error."
    except Exception as e:
        return f"An error occurred while sending email: {str(e)}"

# =================================================
# =              System Control                   =
# =================================================

@function_tool()
async def set_volume(context: RunContext, level: int) -> str:
    """Set system volume. Level should be between 0 and 100."""
    try:
        script = f"""
        $wshShell = New-Object -ComObject WScript.Shell
        for ($i = 0; $i -lt 50; $i++) {{ $wshShell.SendKeys([char]174) }}
        for ($i = 0; $i -lt {int(level / 2)}; $i++) {{ $wshShell.SendKeys([char]175) }}
        """
        await asyncio.to_thread(subprocess.run, ["powershell", "-Command", script])
        return f"Volume set to {level}%."
    except Exception as e:
        return f"Error setting volume: {e}"

@function_tool()
async def take_screenshot(context: RunContext) -> str:
    """Take a screenshot and save it to the desktop."""
    try:
        desktop = os.path.join(os.path.expanduser('~'), 'Desktop')
        filename = f"screenshot_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
        path = os.path.join(desktop, filename)
        await asyncio.to_thread(pyautogui.screenshot, path)
        return f"Screenshot saved to Desktop as {filename}."
    except Exception as e:
        return f"Error taking screenshot: {e}"

@function_tool()
async def lock_screen(context: RunContext) -> str:
    """Lock the Windows screen."""
    try:
        await asyncio.to_thread(subprocess.run, ["rundll32.exe", "user32.dll,LockWorkStation"])
        return "Screen locked."
    except Exception as e:
        return f"Error locking screen: {e}"

@function_tool()
async def shutdown_pc(context: RunContext) -> str:
    """Shutdown the computer."""
    try:
        await asyncio.to_thread(subprocess.run, ["shutdown", "/s", "/t", "5"])
        return "Shutting down in 5 seconds."
    except Exception as e:
        return f"Error shutting down: {e}"

@function_tool()
async def restart_pc(context: RunContext) -> str:
    """Restart the computer."""
    try:
        await asyncio.to_thread(subprocess.run, ["shutdown", "/r", "/t", "5"])
        return "Restarting in 5 seconds."
    except Exception as e:
        return f"Error restarting: {e}"

@function_tool()
async def get_battery_status(context: RunContext) -> str:
    """Get the current battery percentage and charging status."""
    try:
        battery = psutil.sensors_battery()
        if battery is None:
            return "No battery found — this might be a desktop PC."
        status = "charging" if battery.power_plugged else "not charging"
        return f"Battery is at {int(battery.percent)}% and is {status}."
    except Exception as e:
        return f"Error getting battery status: {e}"

@function_tool()
async def open_app(context: RunContext, app_name: str) -> str:
    """Open an application by name. Examples: notepad, calculator, chrome, spotify"""
    apps = {
        "notepad": "notepad.exe",
        "calculator": "calc.exe",
        "paint": "mspaint.exe",
        "taskmanager": "taskmgr.exe",
        "chrome": "chrome.exe",
        "spotify": "spotify.exe",
        "vscode": "code",
        "explorer": "explorer.exe",
    }
    try:
        exe = apps.get(app_name.lower().replace(" ", ""))
        if exe:
            await asyncio.to_thread(subprocess.Popen, exe)
            return f"Opened {app_name}."
        return f"Sorry, I don't know how to open {app_name}."
    except Exception as e:
        return f"Error opening {app_name}: {e}"

# @function_tool()
# async def set_reminder(context: RunContext, message: str, minutes: int) -> str:
#     """Set a reminder that will notify after a given number of minutes."""
#     async def remind():
#         await asyncio.sleep(minutes * 60)
#         subprocess.run([
#             "powershell", "-Command",
#             f"Add-Type -AssemblyName System.Windows.Forms; "
#             f"[System.Windows.Forms.MessageBox]::Show('{message}', 'Friday Reminder')"
#         ])
#     asyncio.create_task(remind())
    # return f"Reminder set! I will remind you about '{message}' in {minutes} minutes."

# @function_tool()
# async def open_live_preview(context: RunContext, filename: str) -> str:
#     """Open a local HTML file with live preview using Python's HTTP server."""
#     try:
#         import threading
#         import http.server
#         import socketserver

#         directory = os.path.dirname(os.path.abspath(filename))
#         file = os.path.basename(filename)
#         port = 5500

#         def start_server():
#             os.chdir(directory)
#             handler = http.server.SimpleHTTPRequestHandler
#             with socketserver.TCPServer(("", port), handler) as httpd:
#                 httpd.serve_forever()

#         thread = threading.Thread(target=start_server, daemon=True)
#         thread.start()

#         url = f"http://localhost:{port}/{file}"
#         webbrowser.open(url)
#         return f"Live preview started at {url}"
#     except Exception as e:
#         return f"Error starting live preview: {e}"