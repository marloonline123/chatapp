import { FileText, FileSpreadsheet, FileImage, File, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  file: File;
  previewUrl?: string;
  onRemove?: () => void;
  className?: string;
  showRemove?: boolean;
}

const getFileIcon = (type: string) => {
  if (type.includes("pdf")) return <FileText className="w-8 h-8 text-red-500" />;
  if (type.includes("word") || type.includes("document")) return <FileText className="w-8 h-8 text-blue-500" />;
  if (type.includes("sheet") || type.includes("excel")) return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
  if (type.includes("image")) return <FileImage className="w-8 h-8 text-purple-500" />;
  return <File className="w-8 h-8 text-muted-foreground" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function FilePreview({ file, previewUrl, onRemove, className, showRemove = true }: FilePreviewProps) {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isPdf = file.type === "application/pdf";
  const isDocument = file.type.includes("word") || file.type.includes("document");
  const isSpreadsheet = file.type.includes("sheet") || file.type.includes("excel");

  return (
    <div className={cn("relative group bg-card rounded-xl border border-border overflow-hidden", className)}>
      {showRemove && onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 z-10 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      )}

      {isImage && previewUrl && (
        <div className="aspect-square">
          <img src={previewUrl} alt={file.name} className="w-full h-full object-cover" />
        </div>
      )}

      {isVideo && previewUrl && (
        <div className="aspect-video bg-black">
          <video src={previewUrl} className="w-full h-full object-contain" />
        </div>
      )}

      {(isPdf || isDocument || isSpreadsheet) && (
        <div className="aspect-square flex flex-col items-center justify-center p-4 bg-muted/30">
          <div className="w-16 h-20 bg-card rounded-lg border border-border flex items-center justify-center mb-2 shadow-sm">
            {getFileIcon(file.type)}
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-muted-foreground/30" />
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
            <div className="w-1/2 h-full bg-muted-foreground/20" />
          </div>
        </div>
      )}

      {!isImage && !isVideo && !isPdf && !isDocument && !isSpreadsheet && (
        <div className="aspect-square flex items-center justify-center bg-muted/30">
          {getFileIcon(file.type)}
        </div>
      )}

      <div className="p-2 border-t border-border">
        <p className="text-xs font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
}

interface DocumentPreviewProps {
  fileUrl: string;
  fileName: string;
  fileType: string;
  className?: string;
}

export function DocumentPreview({ fileUrl, fileName, fileType, className }: DocumentPreviewProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className={cn("bg-card rounded-xl border border-border overflow-hidden", className)}>
      <div className="aspect-[3/4] flex flex-col items-center justify-center p-6 bg-muted/30">
        <div className="w-20 h-24 bg-card rounded-lg border border-border flex items-center justify-center mb-3 shadow-md">
          {getFileIcon(fileType)}
        </div>
        <div className="w-full space-y-1.5">
          <div className="w-full h-2 bg-muted rounded-full" />
          <div className="w-3/4 h-2 bg-muted rounded-full" />
          <div className="w-5/6 h-2 bg-muted rounded-full" />
          <div className="w-2/3 h-2 bg-muted rounded-full" />
        </div>
      </div>
      <div className="p-3 flex items-center justify-between border-t border-border">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{fileName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
