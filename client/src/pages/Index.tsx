import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChatSidebar, chats, ChatPreview } from "@/components/ChatSidebar";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageBubble, Message, MessageAttachment } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";
import { SharedFilesPanel } from "@/components/SharedFilesPanel";
import { UserDetailsModal } from "@/components/UserDetailsModal";
import { NoChatSelected } from "@/components/NoChatSelected";
import { StagedFile } from "@/components/StagedFilesArea";
import { ImageGallery } from "@/components/ImageGallery";
import { MediaPlayer } from "@/components/MediaPlayer";
import { Menu, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSound } from "@/contexts/SoundContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const initialMessages: Message[] = [
  { id: "1", sender: "Kate Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate", content: "Hi everyone, let's start the call soon", time: "11:24 AM", isSent: false, emoji: "👋" },
  { id: "2", sender: "Evan Scott", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evan", content: "Recently I saw properties in a great location that I did not pay attention to before", time: "11:25 AM", isSent: false, emoji: "😊" },
  { id: "3", sender: "Evan Scott", avatar: "https://api.diceb ear.com/7.x/avataaars/svg?seed=Evan", content: "Ooo, why don't you say something more", time: "11:26 AM", isSent: false },
  { id: "4", sender: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You", content: "He creates an atmosphere of mystery", time: "11:26 AM", isSent: true, emoji: "😄" },
  { id: "5", sender: "Evan Scott", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evan", content: "Robert, don't be like that and say something more :)", time: "11:34 AM", isSent: false, emoji: "😊" },
];

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatIdFromUrl = searchParams.get("chat");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chatIdFromUrl);
  const [messages, setMessages] = useState(initialMessages);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFilesPanel, setShowFilesPanel] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ChatPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [mediaPlayerUrl, setMediaPlayerUrl] = useState<string | null>(null);
  const [mediaPlayerType, setMediaPlayerType] = useState<"audio" | "video">("audio");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const { playMessageSound } = useSound();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const selectedChat = chats.find(c => c.id === selectedChatId) || null;

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSelect = (id: string) => {
    setSelectedChatId(id);
    setSearchParams({ chat: id });
    setShowSidebar(false);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (!selectedChatId) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleOverlayDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleOverlayDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setDroppedFiles(files);
    }
  };

  const handleOverlayDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMediaClick = (attachment: MessageAttachment) => {
    if (attachment.type === "image") {
      const allImages: string[] = [];
      messages.forEach(msg => {
        if (msg.attachments) {
          msg.attachments.forEach(att => {
            if (att.type === "image") allImages.push(att.url);
          });
        }
      });
      const index = allImages.indexOf(attachment.url);
      setGalleryImages(allImages);
      setGalleryIndex(index >= 0 ? index : 0);
      setShowGallery(true);
    } else if (attachment.type === "audio") {
      // Only audio opens in MediaPlayer, videos play inline
      setMediaPlayerUrl(attachment.url);
      setMediaPlayerType("audio");
    }
  };

  const handleSendMessage = (content: string, files?: StagedFile[]) => {
    if (editingMessage) {
      setMessages(messages.map(msg => msg.id === editingMessage.id ? { ...msg, content } : msg));
      setEditingMessage(null);
      return;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let attachments: MessageAttachment[] = [];
    if (files && files.length > 0) {
      attachments = files.map(f => ({
        url: f.previewUrl,
        name: f.file.name,
        type: f.file.type.startsWith('image/') ? 'image' :
          f.file.type.startsWith('video/') ? 'video' :
            f.file.type.startsWith('audio/') ? 'audio' : 'file'
      }));
    }

    if (content.trim() || attachments.length > 0) {
      const newMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        sender: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        content: content,
        time: timestamp,
        isSent: true,
        type: attachments.length > 0 ? "mixed" : "text",
        attachments: attachments,
        replyTo: replyingTo?.content,
      };
      setMessages(prev => [...prev, newMessage]);
      playMessageSound();
    }

    setReplyingTo(null);
  };

  const handleUserClick = (chat: ChatPreview) => {
    setSelectedUser(chat);
    setUserModalOpen(true);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {!selectedChatId && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon" onClick={() => setShowSidebar(!showSidebar)} className="bg-card shadow-md">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      )}

      <div className={`lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setShowSidebar(false)}>
        <div className={`h-full transition-transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
          <ChatSidebar selectedChatId={selectedChatId} onChatSelect={handleChatSelect} onUserClick={handleUserClick} />
        </div>
      </div>

      <div className={`${selectedChatId ? 'hidden lg:block' : 'block'} h-full`}>
        <ChatSidebar selectedChatId={selectedChatId} onChatSelect={handleChatSelect} onUserClick={handleUserClick} />
      </div>

      {selectedChatId && selectedChat ? (
        <main className="flex-1 flex flex-col min-w-0 h-full relative" onDragEnter={handleDragEnter}>
          <ChatHeader
            chat={selectedChat}
            onBack={() => { setSelectedChatId(null); setSearchParams({}); }}
            onToggleFilesPanel={() => setShowFilesPanel(!showFilesPanel)}
            onUserClick={() => handleUserClick(selectedChat)}
          />

          {isDragging && (
            <div
              className="absolute inset-0 bg-primary/10 backdrop-blur-sm z-50 flex items-center justify-center border-2 border-dashed border-primary animate-pulse"
              onDragLeave={handleOverlayDragLeave}
              onDrop={handleOverlayDrop}
              onDragOver={handleOverlayDragOver}
            >
              <div className="text-center pointer-events-none">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Paperclip className="w-10 h-10 text-primary" />
                </div>
                <p className="text-2xl font-semibold text-primary mb-2">Drop files here</p>
                <p className="text-base text-muted-foreground">Release to upload</p>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 py-6 bg-chat-surface custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onReply={(m) => setReplyingTo(m)}
                  onEdit={(m) => setEditingMessage(m)}
                  onDelete={(id, forEveryone) => { setMessages(messages.filter(m => m.id !== id)); toast({ title: forEveryone ? t("deleteForEveryone") : t("deleteForMe") }); }}
                  onMediaClick={handleMediaClick}
                />
              ))}
              <div className="flex items-center gap-3 mb-4 opacity-70">
                <div className="flex gap-1 px-4 py-3 bg-chat-received rounded-2xl rounded-tl-sm">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-muted-foreground">Robert is {t("typing")}</span>
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>

          <MessageInput
            onSendMessage={handleSendMessage}
            droppedFiles={droppedFiles}
            onFilesProcessed={() => setDroppedFiles([])}
            replyingTo={replyingTo}
            editingMessage={editingMessage}
            onCancelReply={() => { setReplyingTo(null); setEditingMessage(null); }}
          />
        </main>
      ) : (
        <div className="hidden lg:flex flex-1 h-full">
          <NoChatSelected />
        </div>
      )}

      {selectedChatId && showFilesPanel && (
        <div className="w-80 border-l border-border bg-background hidden xl:block h-full">
          <SharedFilesPanel isOpen={true} onClose={() => setShowFilesPanel(false)} chat={selectedChat} />
        </div>
      )}

      {selectedChatId && (
        <div className="xl:hidden">
          <SharedFilesPanel isOpen={showFilesPanel} onClose={() => setShowFilesPanel(false)} chat={selectedChat} />
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal
          isOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          user={{
            id: selectedUser.id,
            name: selectedUser.name,
            username: selectedUser.username,
            avatar: selectedUser.avatar,
            isGroup: selectedUser.isGroup,
            memberCount: selectedUser.memberCount,
            bio: "Real estate enthusiast sharing the best property deals and investment opportunities.",
          }}
        />
      )}

      {showGallery && (
        <ImageGallery
          images={galleryImages}
          currentIndex={galleryIndex}
          onClose={() => setShowGallery(false)}
        />
      )}

      {mediaPlayerUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8">
          <MediaPlayer
            src={mediaPlayerUrl}
            type={mediaPlayerType}
            onClose={() => setMediaPlayerUrl(null)}
            className="w-full max-w-4xl"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
