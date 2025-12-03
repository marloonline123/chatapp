import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function NoChatSelected() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-chat-surface text-center p-8">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <MessageSquare className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{t("welcomeBack")}</h2>
      <p className="text-muted-foreground max-w-sm">{t("selectChat")}</p>
    </div>
  );
}
