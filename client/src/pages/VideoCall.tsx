import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoCall = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=900&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
      </div>

      <div className="z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kate" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-1">Kate Johnson</h2>
            <p className="text-white/70">Calling...</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <Button
            variant="outline"
            size="icon"
            className={`h-14 w-14 rounded-full border-0 ${isMuted ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="h-16 w-16 rounded-full shadow-lg hover:bg-red-600"
            onClick={() => navigate(-1)}
          >
            <PhoneOff className="w-8 h-8" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`h-14 w-14 rounded-full border-0 ${isVideoOff ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
