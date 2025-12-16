import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type UserRole = 'admin' | 'teacher' | 'parent';

type Message = {
  id: string;
  text?: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
};

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: 'group' | 'private';
};

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

const Index = () => {
  const [userRole] = useState<UserRole>('admin');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Как успехи Пети?',
      sender: 'Мама Иванова',
      timestamp: '14:20',
      isOwn: false,
      type: 'text',
    },
    {
      id: '2',
      text: 'Добрый день! Петя хорошо справляется с программой.',
      sender: 'Вы',
      timestamp: '14:21',
      isOwn: true,
      type: 'text',
    },
    {
      id: '3',
      type: 'image',
      fileUrl: 'https://cdn.poehali.dev/files/WhatsApp%20Image%202025-11-04%20at%2017.17.39.jpeg',
      sender: 'Мама Иванова',
      timestamp: '14:22',
      isOwn: false,
    },
    {
      id: '4',
      text: 'Домашнее задание выполнено полностью.',
      sender: 'Мама Иванова',
      timestamp: '14:23',
      isOwn: false,
      type: 'text',
      reactions: [
        { emoji: '👍', count: 2, users: ['Учитель', 'Администратор'] },
        { emoji: '❤️', count: 1, users: ['Вы'] },
      ],
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Группа: Иванов Пётр',
      lastMessage: 'Домашнее задание выполнено',
      timestamp: '14:23',
      unread: 2,
      type: 'group',
    },
    {
      id: '2',
      name: 'Мама Петрова Анна',
      lastMessage: 'Спасибо за информацию',
      timestamp: '13:45',
      unread: 0,
      type: 'private',
    },
    {
      id: '3',
      name: 'Группа: Смирнова Мария',
      lastMessage: 'Учитель математики: Отличная работа!',
      timestamp: 'Вчера',
      unread: 5,
      type: 'group',
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: 'Вы',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'file',
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(0)} KB`,
        sender: 'Вы',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          type: 'image',
          fileUrl: e.target?.result as string,
          sender: 'Вы',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          if (existingReaction.users.includes('Вы')) {
            return {
              ...msg,
              reactions: reactions
                .map(r => r.emoji === emoji 
                  ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== 'Вы') }
                  : r
                )
                .filter(r => r.count > 0)
            };
          } else {
            return {
              ...msg,
              reactions: reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count + 1, users: [...r.users, 'Вы'] }
                  : r
              )
            };
          }
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1, users: ['Вы'] }]
          };
        }
      }
      return msg;
    }));
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-[420px] bg-card border-r border-border flex flex-col">
        <div className="p-4 bg-card">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center p-2">
                <img src="/linea-logo.svg" alt="LineaSchool" className="w-full h-full" />
              </div>
              <div>
                <h1 className="font-semibold text-base">LineaSchool</h1>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'admin' && 'Администратор'}
                  {userRole === 'teacher' && 'Педагог'}
                  {userRole === 'parent' && 'Родитель'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Icon name="Menu" size={20} />
            </Button>
          </div>

          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск чатов..."
              className="pl-9 h-9 bg-accent border-0 text-sm"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full px-4 py-3 text-left transition-colors border-l-4 ${
                selectedChat === chat.id 
                  ? 'bg-accent border-primary' 
                  : 'border-transparent hover:bg-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {chat.type === 'group' ? (
                      <Icon name="Users" size={20} />
                    ) : (
                      <Icon name="User" size={20} />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <h3 className="font-medium text-sm truncate text-foreground">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-white text-xs px-2 py-0 h-5 min-w-5 rounded-full flex items-center justify-center">
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

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="bg-card border-b border-border px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-white">
                      <Icon name="Users" size={18} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium text-base">Группа: Иванов Пётр</h2>
                    <p className="text-xs text-muted-foreground">
                      5 участников
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Icon name="Search" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            <div 
              className="flex-1 p-6 overflow-y-auto"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            >
              <div className="space-y-3 max-w-5xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex group ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="relative">
                      <div
                        className={`max-w-md rounded-lg shadow-sm ${
                          message.isOwn
                            ? 'bg-[#D9FDD3] text-foreground rounded-br-none'
                            : 'bg-card text-foreground rounded-bl-none'
                        }`}
                      >
                        {message.type === 'image' && message.fileUrl && (
                          <div className="p-1">
                            <img 
                              src={message.fileUrl} 
                              alt="Изображение" 
                              className="rounded-lg max-w-xs max-h-80 object-cover"
                            />
                            <div className="flex items-center justify-end gap-1 px-2 pb-1 mt-1">
                              <span className="text-[11px] text-muted-foreground">
                                {message.timestamp}
                              </span>
                              {message.isOwn && (
                                <Icon name="CheckCheck" size={14} className="text-primary" />
                              )}
                            </div>
                          </div>
                        )}
                        
                        {message.type === 'file' && (
                          <div className="p-3 flex items-center gap-3 min-w-[280px]">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon name="FileText" size={24} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{message.fileName}</p>
                              <p className="text-xs text-muted-foreground">{message.fileSize}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                              <Icon name="Download" size={18} />
                            </Button>
                          </div>
                        )}
                        
                        {message.type === 'text' && (
                          <div className="px-3 py-2">
                            {!message.isOwn && (
                              <p className="text-xs font-medium text-primary mb-1">
                                {message.sender}
                              </p>
                            )}
                            <p className="text-[14.2px] leading-[19px] break-words">{message.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <span className="text-[11px] text-muted-foreground">
                                {message.timestamp}
                              </span>
                              {message.isOwn && (
                                <Icon name="CheckCheck" size={14} className="text-primary" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {message.reactions && message.reactions.length > 0 && (
                        <div className="absolute -bottom-2 right-2 flex gap-1 bg-card rounded-full px-2 py-0.5 border border-border shadow-sm">
                          {message.reactions.map((reaction, idx) => (
                            <button
                              key={idx}
                              className="flex items-center gap-0.5 text-xs hover:scale-110 transition-transform"
                              onClick={() => handleReaction(message.id, reaction.emoji)}
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-muted-foreground">{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className={`absolute top-1 ${message.isOwn ? 'left-[-40px]' : 'right-[-40px]'} opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8`}
                          >
                            <Icon name="SmilePlus" size={16} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                          <div className="flex gap-1">
                            {REACTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleReaction(message.id, emoji)}
                                className="text-2xl hover:scale-125 transition-transform p-1"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border-t border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Icon name="Smile" size={20} />
                </Button>
                
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Icon name="Image" size={20} />
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon name="Paperclip" size={20} />
                </Button>

                <Input
                  placeholder="Введите сообщение"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  className="flex-1 bg-card border-border h-10"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-accent/20">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="MessageSquare" size={36} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium mb-1">
                  Выберите чат
                </h2>
                <p className="text-sm text-muted-foreground">
                  Начните общение с педагогами и родителями
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
