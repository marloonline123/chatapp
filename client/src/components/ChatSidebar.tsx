import { Search, Plus, MoreVertical, Sun, Moon, Globe, Volume2, VolumeX, MessageSquare, Phone, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ChatPreview {
  id: string;
  name: string;
  username?: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline?: boolean;
  isTyping?: boolean;
  isGroup?: boolean;
  memberCount?: number;
}

export const chats: ChatPreview[] = [
  {
    id: "1",
    name: "Real estate deals",
    username: "realestate_group",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=group1",
    lastMessage: "typing...",
    time: "11:15",
    isTyping: true,
    isGroup: true,
    memberCount: 10,
  },
  {
    id: "2",
    name: "Kate Johnson",
    username: "kate_j",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate",
    lastMessage: "I will send the document s...",
    time: "11:15",
    isOnline: true,
  },
  {
    id: "3",
    name: "Tamara Shevchenko",
    username: "tamara_s",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tamara",
    lastMessage: "are you going to a busine...",
    time: "10:05",
  },
  {
    id: "4",
    name: "Joshua Clarkson",
    username: "josh_c",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joshua",
    lastMessage: "I suggest to start. I have n...",
    time: "15:09",
    isOnline: true,
  },
  {
    id: "5",
    name: "Jeroen Zoet",
    username: "jeroen_z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jeroen",
    lastMessage: "We need to start a new re...",
    time: "14:09",
    isOnline: true,
  },
];

interface ChatSidebarProps {
  selectedChatId: string | null;
  onChatSelect: (id: string) => void;
  onUserClick?: (chat: ChatPreview) => void;
}

export function ChatSidebar({ selectedChatId, onChatSelect, onUserClick }: ChatSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { soundEnabled, toggleSound } = useSound();

  return (
    <aside className="w-full lg:w-80 bg-chat-sidebar border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold tracking-tight">Messages</h2>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 rounded-full">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={toggleSound}>
                  {soundEnabled ? t("muteSounds") : t("enableSounds")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
                  {t("switchLanguage")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("search")}
            className="pl-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
          />
        </div>
      </div>

      <Tabs defaultValue="chats" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-2 flex-shrink-0">
          <TabsList className="w-full grid grid-cols-3 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="chats" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chats
            </TabsTrigger>
            <TabsTrigger value="calls" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Phone className="w-4 h-4 mr-2" />
              Calls
            </TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Users className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chats" className="flex-1 flex flex-col overflow-hidden mt-2">
          <div className="px-4 py-2 flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("lastChats")}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/10 hover:text-primary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
            <div className="space-y-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect(chat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group",
                    selectedChatId === chat.id && "bg-primary/10 hover:bg-primary/15"
                  )}
                >
                  <div
                    className="relative cursor-pointer transition-transform group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUserClick?.(chat);
                    }}
                  >
                    <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 text-left overflow-hidden">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className={cn("font-semibold text-sm truncate", selectedChatId === chat.id && "text-primary")}>
                        {chat.name}
                      </h4>
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full">
                        {chat.time}
                      </span>
                    </div>
                    {chat.username && (
                      <p className="text-xs text-muted-foreground truncate mb-0.5 opacity-70">@{chat.username}</p>
                    )}
                    <p className={cn(
                      "text-sm text-muted-foreground truncate",
                      chat.isTyping && "text-primary font-medium italic animate-pulse"
                    )}>
                      {chat.isTyping ? t("typing") : chat.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calls" className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Phone className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>No recent calls</p>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>No contacts found</p>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
