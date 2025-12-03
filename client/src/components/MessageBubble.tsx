import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FileText, Image as ImageIcon, Video, Music, Play, Download } from "lucide-react";
import { MessageActions } from "@/components/MessageActions";
import { DeleteMessageDialog } from "@/components/DeleteMessageDialog";
import { Button } from "@/components/ui/button";

export interface MessageAttachment {
  url: string;
  type: "image" | "video" | "audio" | "file";
  name?: string;
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isSent: boolean;
  type?: "text" | "image" | "audio" | "video" | "file" | "mixed";
  fileUrl?: string; // Legacy support
  fileName?: string; // Legacy support
  attachments?: MessageAttachment[];
  emoji?: string;
  replyTo?: string;
}

interface MessageBubbleProps {
  message: Message;
  onReply?: (message: Message) => void;
  onEdit?: (message: Message) => void;
  onDelete?: (messageId: string, deleteForEveryone: boolean) => void;
  onMediaClick?: (attachment: MessageAttachment) => void;
}

export function MessageBubble({ message, onReply, onEdit, onDelete, onMediaClick }: MessageBubbleProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    const attachments = message.attachments || (message.fileUrl ? [{ url: message.fileUrl, name: message.fileName || "file" }] : []);
    attachments.forEach(att => {
      if (att.url) handleDownload(att.url, att.name || "download");
    });
  };

  const renderAttachment = (attachment: MessageAttachment, index: number, total: number) => {
    const isLast = index === 3;
    const remaining = total - 4;
    const showOverlay = isLast && remaining > 0;

    if (attachment.type === "image") {
      return (
        <div key={index} className="relative w-full h-full cursor-pointer" onClick={() => onMediaClick?.(attachment)}>
          <img
            src={attachment.url}
            alt={attachment.name || "Image"}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
          {showOverlay && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-xl">+{remaining + 1}</span>
            </div>
          )}
        </div>
      );
    }

    if (attachment.type === "video") {
      return (
        <div key={index} className="relative w-full h-full bg-black flex items-center justify-center group/video">
          <video
            src={attachment.url}
            controls
            className="w-full h-full object-cover"
            onClick={(e) => e.stopPropagation()}
          />
          {showOverlay && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 pointer-events-none">
              <span className="text-white font-bold text-xl">+{remaining + 1}</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={index} className="relative w-full h-full bg-muted/30 flex flex-col items-center justify-center p-2 text-center group/file">
        {attachment.type === "audio" ? <Music className="w-8 h-8 mb-1 text-primary" /> : <FileText className="w-8 h-8 mb-1 text-primary" />}
        <span className="text-xs truncate w-full px-1 font-medium">{attachment.name || "File"}</span>

        {/* Download button overlay for files */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/file:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(attachment.url, attachment.name || "file");
            }}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {showOverlay && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-10">
            <span className="text-white font-bold text-xl">+{remaining + 1}</span>
          </div>
        )}
      </div>
    );
  };

  const renderAttachments = () => {
    if (!message.attachments || message.attachments.length === 0) {
      // Legacy single file support
      if (message.type && message.type !== "text" && message.type !== "mixed") {
        return (
          <div className="mb-2 max-w-[240px]">
            {renderAttachment({
              url: message.fileUrl || "",
              type: message.type as any,
              name: message.fileName
            }, 0, 1)}
          </div>
        );
      }
      return null;
    }

    const displayCount = Math.min(message.attachments.length, 4);
    const gridClass = displayCount === 1 ? "grid-cols-1" : "grid-cols-2";

    // Reduced max-width for the grid container
    return (
      <div className={`grid ${gridClass} gap-1 mb-2 rounded-lg overflow-hidden max-w-[280px]`}>
        {message.attachments.slice(0, 4).map((att, i) => (
          <div key={i} className={cn(
            "aspect-square overflow-hidden bg-muted/20",
            displayCount === 3 && i === 0 ? "col-span-2 aspect-video" : ""
          )}>
            {renderAttachment(att, i, message.attachments!.length)}
          </div>
        ))}
      </div>
    );
  };

  const handleDelete = (deleteForEveryone: boolean) => {
    onDelete?.(message.id, deleteForEveryone);
    setShowDeleteDialog(false);
  };

  const hasAttachments = (message.attachments && message.attachments.length > 0) || (message.type !== 'text' && message.type !== 'mixed' && message.fileUrl);

  return (
    <>
      <div className={cn(
        "flex gap-3 mb-4 animate-fade-in group",
        message.isSent ? "flex-row-reverse" : "flex-row"
      )}>
        {!message.isSent && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={message.avatar} alt={message.sender} />
            <AvatarFallback>{message.sender[0]}</AvatarFallback>
          </Avatar>
        )}

        <div className={cn(
          "flex flex-col max-w-[70%]",
          message.isSent ? "items-end" : "items-start"
        )}>
          {!message.isSent && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-foreground">{message.sender}</span>
              <span className="text-xs text-muted-foreground">{message.time}</span>
            </div>
          )}

          <div className="relative group/message">
            <div className={cn(
              "px-2 py-2 rounded-2xl shadow-sm transition-all hover:shadow-md min-w-[120px]",
              message.isSent
                ? "bg-chat-sent text-foreground rounded-tr-sm"
                : "bg-chat-received text-foreground rounded-tl-sm"
            )}>
              {message.replyTo && (
                <div className="mb-2 p-2 bg-muted/30 rounded-lg border-l-2 border-primary">
                  <p className="text-xs text-muted-foreground line-clamp-2">{message.replyTo}</p>
                </div>
              )}

              {renderAttachments()}

              {message.content && (
                <p className="text-sm leading-relaxed whitespace-pre-wrap px-2 pb-1">
                  {message.content}
                  {message.emoji && <span className="ml-1">{message.emoji}</span>}
                </p>
              )}
            </div>

            <div className={cn(
              "absolute top-0",
              message.isSent ? "left-0 -translate-x-full -ml-2" : "right-0 translate-x-full mr-2"
            )}>
              <MessageActions
                onReply={() => onReply?.(message)}
                onEdit={() => onEdit?.(message)}
                onDelete={() => setShowDeleteDialog(true)}
                onDownload={hasAttachments ? handleDownloadAll : undefined}
                showDownload={!!hasAttachments}
              />
            </div>
          </div>

          {message.isSent && (
            <span className="text-xs text-muted-foreground mt-1">{message.time}</span>
          )}
        </div>
      </div>

      <DeleteMessageDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </>
  );
}
