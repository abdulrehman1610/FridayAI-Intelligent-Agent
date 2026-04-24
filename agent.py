from dotenv import load_dotenv
from livekit import agents
from livekit.agents import AgentSession, Agent
from livekit.plugins import google
from prompt import AGENT_INSTRUCTION, SESSION_INSTRUCTION
from tools import get_weather, search_web, open_website, get_time,open_folder, play_youtube, send_email, set_volume,take_screenshot, lock_screen, shutdown_pc, restart_pc,get_battery_status, open_app

load_dotenv(".env")

class Assistant(Agent):
    def __init__(self):
        super().__init__(
            instructions=AGENT_INSTRUCTION,
            llm=google.beta.realtime.RealtimeModel(
                voice="Zephyr",
                temperature=0.6,
            ),
            tools=[get_weather, search_web, open_website, 
                   get_time, open_folder, play_youtube, send_email, 
                   set_volume, get_battery_status, lock_screen, 
                   shutdown_pc, restart_pc, open_app, take_screenshot]
        )

async def entrypoint(ctx: agents.JobContext):
    await ctx.connect()
    
    session = AgentSession()
    
    await session.start(
        room=ctx.room,
        agent=Assistant(),
    )
    
    await session.generate_reply(instructions=SESSION_INSTRUCTION)

if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))