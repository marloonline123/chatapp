import { Phone, Video, MoreVertical, Search, ArrowLeft, PanelRight, Volume2, VolumeX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";
import { ChatPreview } from "./ChatSidebar";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  chat: ChatPreview;
  onBack: () => void;
  onToggleFilesPanel: () => void;
  onUserClick: () => void;
}

export function ChatHeader({ chat, onBack, onToggleFilesPanel, onUserClick }: ChatHeaderProps) {
  const { t } = useLanguage();
  const { soundEnabled, toggleSound } = useSound();
  const navigate = useNavigate();

  const handleCall = (type: "audio" | "video") => {
    navigate(type === "audio" ? "/voice-call" : "/video-call");
  };

  const handleSearch = () => {
    // Search functionality placeholder
  };

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden -ml-2" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3 cursor-pointer group" onClick={onUserClick}>
          <div className="relative">
            <Avatar className="w-10 h-10 group-hover:opacity-90 transition-opacity">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm leading-tight">{chat.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {chat.username && (
                <>
                  <span className="text-[10px] text-muted-foreground">@{chat.username}</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                </>
              )}
              <span className={`text-[10px] font-medium ${chat.isOnline ? "text-green-500" : "text-muted-foreground"}`}>
                {chat.isOnline ? t("online") : `${t("lastSeen")} ${chat.time}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleSound} title={soundEnabled ? "Mute sounds" : "Enable sounds"}>
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCall("audio")}>
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCall("video")}>
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleSearch}>
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleFilesPanel} title="Toggle details">
          <PanelRight className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onUserClick}>{t("viewProfile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("muteNotifications")}</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">{t("blockUser")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
