import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilePreview } from "@/components/FilePreview";
import { useLanguage } from "@/contexts/LanguageContext";

export interface StagedFile {
  id: string;
  file: File;
  previewUrl: string;
  caption?: string; // Kept for compatibility but not used in UI
}

interface StagedFilesAreaProps {
  files: StagedFile[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function StagedFilesArea({ files, onRemove, onClearAll }: StagedFilesAreaProps) {
  const { t } = useLanguage();

  if (files.length === 0) return null;

  return (
    <div className="border-t border-border bg-card/50 p-2">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-medium text-muted-foreground">
          {files.length} {files.length === 1 ? t("file") : t("files")} {t("selected")}
        </span>
        <Button variant="ghost" size="sm" onClick={onClearAll} className="h-6 text-xs text-destructive hover:text-destructive">
          {t("clearAll")}
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 px-1 custom-scrollbar">
        {files.map((stagedFile) => (
          <div key={stagedFile.id} className="flex-shrink-0 w-24 relative group">
            <FilePreview
              file={stagedFile.file}
              previewUrl={stagedFile.previewUrl}
              onRemove={() => onRemove(stagedFile.id)}
              className="w-24 h-24"
              showRemove={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
