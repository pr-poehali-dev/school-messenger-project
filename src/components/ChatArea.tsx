import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { MessageBubble } from './MessageBubble';

type AttachedFile = {
  type: 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
};

type Message = {
  id: string;
  text?: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
  attachments?: AttachedFile[];
  reactions?: { emoji: string; count: number; users: string[] }[];
};

type ChatAreaProps = {
  messages: Message[];
  onReaction: (messageId: string, emoji: string) => void;
  chatName: string;
};

export const ChatArea = ({ messages, onReaction, chatName }: ChatAreaProps) => {
  return (
    <>
      <div className="bg-gradient-to-r from-card via-primary/5 to-secondary/5 border-b border-border px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-11 h-11 ring-2 ring-offset-2 ring-primary/20 shadow-md">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                <Icon name="Users" size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-base tracking-tight">{chatName}</h2>
              <p className="text-xs font-medium text-primary/70">
                {chatName.startsWith('Группа:') ? '5 участников' : 'Личный чат'}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 text-primary">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary/10 text-secondary">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div 
        className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-background via-primary/5 to-secondary/5"
      >
        <div className="space-y-3 max-w-5xl mx-auto">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id}
              message={message}
              onReaction={onReaction}
            />
          ))}
        </div>
      </div>
    </>
  );
};