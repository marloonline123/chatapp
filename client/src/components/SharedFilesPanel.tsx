import { X, FileText, Image as ImageIcon, Video, MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatPreview } from "./ChatSidebar";

interface FileCategory {
  name: string;
  count: number;
  size: string;
  icon: React.ReactNode;
  color: string;
}

const fileCategories: FileCategory[] = [
  {
    name: "Documents",
    count: 126,
    size: "193MB",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Photos",
    count: 53,
    size: "321MB",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    name: "Movies",
    count: 3,
    size: "210MB",
    icon: <Video className="w-5 h-5" />,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  },
  {
    name: "Other",
    count: 43,
    size: "194MB",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
];

interface SharedFilesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  chat?: ChatPreview | null;
}

export function SharedFilesPanel({ isOpen, onClose, chat }: SharedFilesPanelProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`xl:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className={`h-full w-80 ml-auto bg-chat-sidebar border-l border-border transition-transform overflow-hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <SharedFilesPanelContent onClose={onClose} chat={chat} />
        </div>
      </div>

      {/* Desktop */}
      <aside className={`hidden xl:flex w-80 bg-chat-sidebar border-l border-border flex-col h-full overflow-hidden transition-all ${
        isOpen ? "opacity-100" : "opacity-0 w-0 border-0"
      }`}>
        <SharedFilesPanelContent onClose={onClose} chat={chat} />
      </aside>
    </>
  );
}

function SharedFilesPanelContent({ onClose, chat }: { onClose: () => void; chat?: ChatPreview | null }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <h3 className="font-semibold">{t("sharedFiles")}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <Tabs defaultValue="messages" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0 h-auto flex-shrink-0">
          <TabsTrigger 
            value="messages" 
            className="flex-1 rounded-none data-[state=active]:bg-accent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            {t("messages")}
          </TabsTrigger>
          <TabsTrigger 
            value="participants" 
            className="flex-1 rounded-none data-[state=active]:bg-accent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            {t("participants")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="flex-1 overflow-y-auto mt-0 p-4">
          <div className="space-y-4">
            {/* Group Info */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-border">
              <Avatar className="w-20 h-20 mb-3">
                <AvatarImage src={chat?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=realestate"} alt={chat?.name || "Chat"} />
                <AvatarFallback>{chat?.name?.[0] || "C"}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-0.5">{chat?.name || "Real estate deals"}</h3>
              {chat?.username && (
                <p className="text-xs text-muted-foreground mb-1">@{chat.username}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {chat?.memberCount || 10} {t("members")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-accent/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                </div>
                <div className="text-2xl font-semibold mb-1">231</div>
                <div className="text-xs text-muted-foreground">{t("allFiles")}</div>
              </div>
              
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="text-2xl font-semibold mb-1">45</div>
                <div className="text-xs text-muted-foreground">{t("allLinks")}</div>
              </div>
            </div>

            {/* File Types */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">{t("fileType")}</h4>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {fileCategories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h5 className="font-medium text-sm">{category.name}</h5>
                      <p className="text-xs text-muted-foreground">
                        {category.count} files, {category.size}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="participants" className="flex-1 overflow-y-auto mt-0 p-4">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h5 className="font-medium text-sm">User {i}</h5>
                  <p className="text-xs text-muted-foreground">@user_{i}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
