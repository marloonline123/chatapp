import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, Mail, MapPin, Calendar, Star, Bell, Ban } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    username?: string;
    avatar: string;
    email?: string;
    phone?: string;
    location?: string;
    bio?: string;
    joinedDate?: string;
    isGroup?: boolean;
    memberCount?: number;
  };
}

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-0 gap-0 custom-scrollbar">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-foreground/50 hover:text-foreground"
            onClick={onClose}
          >
            {/* Close icon handled by Dialog primitive usually, but good to have explicit if needed */}
          </Button>
        </div>

        <div className="px-6 pb-6 -mt-12 relative">
          <Avatar className="w-24 h-24 border-4 border-background shadow-lg mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex justify-between items-start mb-6">
            <div>
              <DialogTitle className="text-2xl font-bold">{user.name}</DialogTitle>
              {user.username && (
                <p className="text-muted-foreground">@{user.username}</p>
              )}
              {user.isGroup && (
                <p className="text-sm text-muted-foreground">{user.memberCount} members</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {user.bio && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">About</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {user.bio}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {user.email && (
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{user.location}</span>
              </div>
            )}
            {user.joinedDate && (
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Joined {user.joinedDate}</span>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Star className="w-4 h-4" />
              Add to favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Bell className="w-4 h-4" />
              Mute notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
              <Ban className="w-4 h-4" />
              Block {user.isGroup ? "Group" : "User"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
