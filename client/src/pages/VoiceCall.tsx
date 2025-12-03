import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VoiceCall = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950" />

      <div className="z-10 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl mb-6 animate-pulse">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kate" alt="User" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Kate Johnson</h2>
          <p className="text-white/60 text-lg">00:45</p>
        </div>

        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            size="icon"
            className={`h-16 w-16 rounded-full border-0 ${isMuted ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="h-20 w-20 rounded-full shadow-xl hover:bg-red-600"
            onClick={() => navigate(-1)}
          >
            <PhoneOff className="w-9 h-9" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`h-16 w-16 rounded-full border-0 ${isSpeaker ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
            onClick={() => setIsSpeaker(!isSpeaker)}
          >
            {isSpeaker ? <Volume2 className="w-7 h-7" /> : <VolumeX className="w-7 h-7" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;
