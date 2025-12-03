import { useState, useRef, useEffect } from "react";
import { Smile, Paperclip, Image as ImageIcon, Mic, Video, FileText, Send, X, Edit2, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmojiPicker } from "@/components/EmojiPicker";
import { StagedFilesArea, StagedFile } from "@/components/StagedFilesArea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Message } from "@/components/MessageBubble";

interface MessageInputProps {
  onSendMessage: (message: string, files?: StagedFile[]) => void;
  droppedFiles?: File[];
  onFilesProcessed?: () => void;
  replyingTo?: Message | null;
  editingMessage?: Message | null;
  onCancelReply?: () => void;
}

export function MessageInput({
  onSendMessage,
  droppedFiles,
  onFilesProcessed,
  replyingTo,
  editingMessage,
  onCancelReply
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (droppedFiles && droppedFiles.length > 0) {
      handleFiles(droppedFiles);
      onFilesProcessed?.();
    }
  }, [droppedFiles, onFilesProcessed]);

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.content);
      inputRef.current?.focus();
    }
  }, [editingMessage]);

  useEffect(() => {
    if (replyingTo) {
      inputRef.current?.focus();
    }
  }, [replyingTo]);

  const handleFiles = (files: File[]) => {
    const newStagedFiles: StagedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setStagedFiles(prev => [...prev, ...newStagedFiles]);
  };

  const handleSend = () => {
    if (message.trim() || stagedFiles.length > 0) {
      onSendMessage(message, stagedFiles);
      if (!editingMessage) {
        setMessage("");
        setStagedFiles([]);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveStagedFile = (id: string) => {
    setStagedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-chat-surface/95 backdrop-blur-sm border-t border-border flex flex-col z-20">
      {/* Inline Reply/Edit Indicator */}
      {(replyingTo || editingMessage) && (
        <div className="px-4 py-2 bg-muted/40 border-b border-border flex items-center justify-between animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-1 self-stretch bg-primary rounded-full" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                {editingMessage ? <Edit2 className="w-3 h-3" /> : <Reply className="w-3 h-3" />}
                {editingMessage ? t("editingMessage") : t("replyingTo")}
              </span>
              <span className="text-sm text-muted-foreground truncate">
                {editingMessage ? editingMessage.content : replyingTo?.content}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancelReply}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <StagedFilesArea
        files={stagedFiles}
        onRemove={handleRemoveStagedFile}
        onClearAll={() => setStagedFiles([])}
      />

      <div className="px-4 py-3">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
        />

        <div className="flex items-end gap-2">
          <div className="flex items-center gap-1">
            <EmojiPicker onEmojiSelect={handleEmojiSelect}>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Smile className="w-5 h-5" />
              </Button>
            </EmojiPicker>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem
                  className="gap-2 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <span>{t("image")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <Mic className="w-4 h-4 text-destructive" />
                  <span>{t("audio")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <Video className="w-4 h-4 text-secondary-foreground" />
                  <span>{t("video")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{t("document")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("typeMessage")}
              className="pr-4 bg-background/50 border-border rounded-full"
            />
          </div>

          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
            disabled={!message.trim() && stagedFiles.length === 0}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
