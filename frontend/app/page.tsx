"use client";

import "@livekit/components-styles";
import { LiveKitRoom, RoomAudioRenderer, useVoiceAssistant, useLocalParticipant, useChat, useTracks, BarVisualizer, TrackToggle, useConnectionState } from "@livekit/components-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Track, ConnectionState } from "livekit-client";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");
  const [started, setStarted] = useState(false);
  const fetchedRef = useRef(false);

  const initSession = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    try {
      const roomName = `friday-${Date.now()}`;
      const resp = await fetch(`/api/token?room=${roomName}`);
      const data = await resp.json();
      setToken(data.token);
      setUrl(data.url);
      setStarted(true);
    } catch (e) {
      console.error(e);
      fetchedRef.current = false;
    }
  }, []);

  if (!started || token === "" || url === "") {
    return (
      <div
        className="h-screen w-screen flex flex-col items-center justify-center cursor-pointer select-none"
        style={{ background: '#0A0A0B' }}
        onClick={initSession}
      >
        <div style={{ 
          width: 120, height: 120, borderRadius: 0, 
          border: '2px solid #e3b5ff', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(227,181,255,0.3), inset 0 0 30px rgba(227,181,255,0.1)',
          marginBottom: 40,
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          {fetchedRef.current ? (
            <div style={{ color: '#e3b5ff', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em' }}>LOADING...</div>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#e3b5ff"><path d="M5 3l14 9-14 9V3z"/></svg>
          )}
        </div>
        <div style={{ color: '#e3b5ff', fontFamily: '"Space Grotesk", sans-serif', fontSize: 28, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 12 }}>
          FRIDAY // NEURAL INTERFACE
        </div>
        <div style={{ color: '#9a8ca0', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.2em' }}>
          {fetchedRef.current ? 'ESTABLISHING CONNECTION...' : 'CLICK ANYWHERE TO INITIALIZE SYSTEM'}
        </div>
        <div style={{ color: '#ffe2ab', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.15em', marginTop: 24, opacity: 0.6 }}>
          MICROPHONE + AUDIO OUTPUT REQUIRED
        </div>
        <style>{`@keyframes pulse { 0%,100% { box-shadow: 0 0 30px rgba(227,181,255,0.3), inset 0 0 30px rgba(227,181,255,0.1); } 50% { box-shadow: 0 0 60px rgba(227,181,255,0.6), inset 0 0 40px rgba(227,181,255,0.2); } }`}</style>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={false}
      audio={false}
      token={token}
      serverUrl={url}
      data-lk-theme="default"
      style={{ height: '100%', background: '#0A0A0B' }}
    >
      <MainInterface />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}

function MainInterface() {
  const connectionState = useConnectionState();

  return (
    <div className="flex flex-col h-full h-screen overflow-hidden bg-background text-on-surface">
      {/* Navbar area */}
      <nav className="flex justify-between items-center p-md border-b border-surface-container-high shrink-0" style={{ padding: '24px' }}>
        <div className="flex space-x-md text-sm tracking-widest text-[#9a8ca0] gap-8">
          <span className="text-primary font-bold border-b-2 border-primary pb-2 cursor-pointer font-sans">DASHBOARD</span>
          <span className="cursor-pointer hover:text-white transition-colors pb-2 font-sans">NETWORK</span>
          <span className="cursor-pointer hover:text-white transition-colors pb-2 font-sans">VAULT</span>
        </div>
        <div className="flex items-center space-x-4">
          <div style={{
            padding: '6px 16px',
            border: `1px solid ${connectionState === ConnectionState.Connected ? '#00dbe9' : '#ffe2ab'}`,
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.1em',
            color: connectionState === ConnectionState.Connected ? '#00dbe9' : '#ffe2ab',
          }}>
            {connectionState === ConnectionState.Connected ? '● CONNECTED' : '○ CONNECTING...'}
          </div>
          <div className="btn-cyber-primary hidden sm:block">OP_1</div>
        </div>
      </nav>

      {/* Main Grid content */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 overflow-hidden min-h-0 container mx-auto max-w-7xl">
        {/* Left Column */}
        <div className="flex flex-col gap-6 overflow-hidden">
          <UserAudioSection />
          <AgentAudioSection />
        </div>
        {/* Right Column */}
        <div className="h-full min-h-[600px] overflow-hidden">
          <NeuralEntitySidebar />
        </div>
      </div>
    </div>
  );
}

function UserAudioSection() {
  const { localParticipant } = useLocalParticipant();
  const tracks = useTracks([{ source: Track.Source.Microphone, withPlaceholder: true }]);
  const micTrack = tracks.find(tr => tr.participant.identity === localParticipant?.identity);

  return (
    <div className="glass-panel p-6 flex-[3] flex flex-col hover:border-glow-primary transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-primary text-2xl tracking-widest font-bold font-['Space_Grotesk'] uppercase">USER_AUDIO_INPUT</h2>
        <div className="flex gap-2">
           <TrackToggle
              source={Track.Source.Microphone}
              className="border border-[rgba(229,226,225,0.2)] px-2 py-1 font-mono hover:bg-surface-tier3 cursor-pointer text-[10px]"
           />
           <div className="border border-[rgba(229,226,225,0.2)] px-3 py-1 font-mono text-[10px]">STEREO_L_R</div>
        </div>
      </div>

      <div className="text-xs text-secondary mb-4 flex items-center font-mono uppercase">
        <div className={`w-2 h-2 ${localParticipant?.isSpeaking ? 'bg-primary' : 'bg-secondary'} mr-2 transition-colors`}></div> UPLINK: {localParticipant?.isSpeaking ? 'TRANSMITTING' : 'ACTIVE'} // LATENCY: 12MS
      </div>

      <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
         {micTrack && (
           <BarVisualizer
             state={localParticipant?.isSpeaking ? "speaking" : "listening"}
             trackRef={micTrack}
             barCount={64}
             className="w-full max-w-[90%] h-[80%] text-primary opacity-80"
             options={{minHeight: 2}}
             style={{ gap: '2px' }}
           />
         )}
         <div className="absolute bottom-[-10px] w-full border-t border-[rgba(227,181,255,0.2)] flex justify-between text-[10px] text-[rgba(227,181,255,0.5)] pt-2 font-mono">
            <span>-INF DB</span>
            <span>-30 DB</span>
            <span>-12 DB</span>
            <span>-6 DB</span>
            <span className="text-secondary">0 DB (PEAK)</span>
         </div>
         <div className="absolute w-full h-[1px] bg-[rgba(227,181,255,0.3)] top-1/2 left-0 z-0"></div>
      </div>
    </div>
  );
}

function AgentAudioSection() {
  const { state, audioTrack } = useVoiceAssistant();

  return (
    <div className="glass-panel p-6 flex-[2] flex flex-col hover:border-glow-secondary transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-secondary text-2xl tracking-widest font-bold font-['Space_Grotesk'] uppercase">AGENT_AUDIO_OUTPUT</h2>
        <div className="flex gap-2">
           <div className="border border-[rgba(229,226,225,0.2)] px-2 py-1 font-mono hover:bg-surface-tier3 cursor-pointer">🔊</div>
           <div className="border border-[rgba(229,226,225,0.2)] px-2 py-1 font-mono hover:bg-surface-tier3 cursor-pointer">ılı</div>
        </div>
      </div>

      <div className="text-xs text-[#9a8ca0] mb-4 flex items-center font-mono">
        <div className={`w-2 h-2 ${state === 'speaking' ? 'bg-secondary' : 'bg-[#9a8ca0]'} mr-2 transition-colors`}></div>
        SYNTHESIS: NEURAL_V2 // STATE: {state?.toUpperCase() || 'IDLE'}
      </div>

      <div className="flex-1 flex items-center justify-center relative min-h-[100px]">
        {audioTrack && (
          <BarVisualizer
            state={state}
            trackRef={audioTrack}
            barCount={64}
            className="w-full max-w-[80%] h-[70%] text-secondary opacity-80"
            options={{minHeight: 2}}
            style={{ gap: '2px' }}
          />
        )}
        {!audioTrack && (
          <div className="font-mono text-[11px] text-[#9a8ca0] tracking-widest animate-pulse">
            WAITING FOR AGENT AUDIO TRACK...
          </div>
        )}
        <div className="absolute w-full h-[1px] bg-[rgba(255,226,171,0.2)] top-1/2 left-0 z-0"></div>
      </div>
    </div>
  );
}

function NeuralEntitySidebar() {
  const { chatMessages } = useChat();
  const messages = chatMessages || [];
  const { state } = useVoiceAssistant();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border border-[rgba(229,226,225,0.1)] h-full flex flex-col bg-surface-tier2 backdrop-blur-md">
      <div className="p-4 border-b border-[rgba(229,226,225,0.1)] flex justify-between items-start">
         <div>
            <div className="font-[Space_Grotesk] font-bold text-xl leading-tight">NEURAL_ENTITY_04</div>
            <div className="text-[10px] text-[#9a8ca0] font-mono mt-1">ID: AX-7792 // STATUS:<br/><span className="text-secondary">SYNCHRONIZED</span></div>
         </div>
         <div className="text-right">
            <div className="text-[9px] text-[#9a8ca0] font-mono tracking-widest">SYNC_COEFFICIENT</div>
            <div className="text-secondary font-bold text-2xl mt-1">99.8%</div>
         </div>
      </div>

      <div className="p-8 flex justify-center items-center shrink-0 border-b border-[rgba(229,226,225,0.1)]" style={{
          backgroundImage: "linear-gradient(rgba(227, 181, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 181, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
      }}>
        <div className="target-frame w-full max-w-[220px] aspect-square relative z-10 p-2 border border-transparent hover:border-glow-primary transition-all cursor-pointer group">
           <img src="/AI_Animation.gif" alt="AI Neural Entity" className="w-full h-full object-cover filter grayscale sepia-[0.3] hue-rotate-[240deg] contrast-[1.2] brightness-125" />
           <div className="absolute top-4 left-4 bg-[rgba(10,10,11,0.8)] border border-secondary text-secondary text-[10px] px-2 py-1 font-mono uppercase tracking-widest hidden group-hover:block blur-0">
              FACIAL_RENDER: OK
           </div>
        </div>
      </div>

      <div className="px-6 py-4 flex gap-4 shrink-0 border-b border-[rgba(229,226,225,0.1)]">
         <div className="border border-[rgba(229,226,225,0.2)] p-2 flex-1 text-[10px] font-mono">
           <div className="text-[#9a8ca0] mb-2 uppercase">COGNITIVE_LOAD</div>
           <div className="h-1 bg-[rgba(227,181,255,0.2)]"><div className="h-full bg-primary w-[30%]"></div></div>
         </div>
         <div className="border border-[rgba(229,226,225,0.2)] p-2 flex-1 text-[10px] font-mono">
           <div className="text-[#9a8ca0] mb-2 uppercase">REASONING_DEPTH</div>
           <div className="h-1 bg-[rgba(255,226,171,0.2)]"><div className="h-full bg-secondary w-[80%]"></div></div>
         </div>
      </div>

      <div className="flex-1 p-6 overflow-hidden flex flex-col min-h-0 text-left">
         <div ref={scrollRef} className="border border-[rgba(229,226,225,0.2)] flex-1 p-4 overflow-y-auto terminal-scroll font-mono text-[12px] whitespace-pre-wrap leading-relaxed space-y-2 bg-[rgba(0,0,0,0.2)]">
            <div className="text-secondary">{">"} NEURAL_SYNC: <span className="animate-pulse">ACTIVE</span></div>
            <div className="text-[#9a8ca0]">{">"} PROTOCOL: DELTA_7_INITIATED</div>
            <div className="text-[#9a8ca0]">{">"} AGENT_STATE: {state?.toUpperCase() || 'IDLE'}</div>

            {messages.length === 0 && <div className="text-primary opacity-50">{">"} WAITING FOR SENSORY_INPUT...</div>}

            {messages.map((msg, i) => (
               <div key={i} className={`mt-3 border-l-2 pl-2 ${msg.from?.identity?.includes('agent') ? 'text-primary border-primary' : 'text-on-surface border-secondary'}`}>
                 <div className="text-[10px] opacity-60 mb-1">
                    {msg.from?.identity?.includes('agent') ? 'SYSTEM_RESPONSE' : 'USER_INPUT'} // {new Date(msg.timestamp).toLocaleTimeString()}
                 </div>
                 {msg.message}
               </div>
            ))}
         </div>
      </div>

      <div className="p-4 border-t border-[rgba(229,226,225,0.1)] flex gap-4 shrink-0 bg-[rgba(10,10,11,0.5)]">
         <button className="btn-cyber flex-1 text-xs">RECALIBRATE</button>
         <button className="btn-cyber-primary flex-[2] text-xs flex items-center justify-center gap-2">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
           EXECUTE
         </button>
      </div>
    </div>
  );
}
