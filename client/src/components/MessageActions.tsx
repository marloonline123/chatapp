import { MoreVertical, Reply, Trash2, Edit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageActionsProps {
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDownload?: () => void;
  showDownload?: boolean;
}

export function MessageActions({ onReply, onEdit, onDelete, onDownload, showDownload }: MessageActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/message:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onReply} className="gap-2 cursor-pointer">
          <Reply className="w-4 h-4" />
          <span>Reply</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        {showDownload && onDownload && (
          <DropdownMenuItem onClick={onDownload} className="gap-2 cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onDelete} className="gap-2 cursor-pointer text-destructive">
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
