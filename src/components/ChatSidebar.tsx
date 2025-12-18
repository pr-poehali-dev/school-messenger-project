import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

type UserRole = 'admin' | 'teacher' | 'parent';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: 'group' | 'private';
};

type ChatSidebarProps = {
  userRole: UserRole;
  chats: Chat[];
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
};

export const ChatSidebar = ({ userRole, chats, selectedChat, onSelectChat }: ChatSidebarProps) => {
  return (
    <div className="w-[380px] bg-card border-r border-border flex flex-col shadow-sm">
      <div className="p-5 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/linea-logo.svg" alt="LineaSchool" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">LineaSchool</h1>
              <p className="text-xs font-medium text-primary">
                {userRole === 'admin' && 'Администратор'}
                {userRole === 'teacher' && 'Педагог'}
                {userRole === 'parent' && 'Родитель'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/50">
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск чатов..."
            className="pl-10 h-11 bg-white border border-border rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full px-4 py-3.5 text-left transition-all relative group ${
              selectedChat === chat.id 
                ? 'bg-accent' 
                : 'hover:bg-muted/30'
            }`}
          >
            {selectedChat === chat.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r" />
            )}
            <div className="flex items-center gap-3.5">
              <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-primary/20 shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm font-semibold">
                  {chat.type === 'group' ? (
                    <Icon name="Users" size={20} />
                  ) : (
                    <Icon name="User" size={20} />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate text-foreground">{chat.name}</h3>
                  <span className="text-xs font-medium text-muted-foreground ml-2 flex-shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="bg-gradient-to-br from-secondary to-primary text-white text-xs px-2.5 py-0 h-6 min-w-6 rounded-full flex items-center justify-center font-bold shadow-md">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </ScrollArea>
    </div>
  );
};