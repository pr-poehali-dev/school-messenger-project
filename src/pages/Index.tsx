import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type UserRole = 'admin' | 'teacher' | 'parent';

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
};

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: 'group' | 'private';
  studentName?: string;
};

const Index = () => {
  const [userRole] = useState<UserRole>('admin');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Группа: Иванов Пётр',
      lastMessage: 'Домашнее задание выполнено',
      timestamp: '14:23',
      unread: 2,
      type: 'group',
      studentName: 'Иванов Пётр',
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
      studentName: 'Смирнова Мария',
    },
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Здравствуйте! Как успехи Пети?',
      sender: 'Мама Иванова',
      timestamp: '14:20',
      isOwn: false,
    },
    {
      id: '2',
      text: 'Добрый день! Петя хорошо справляется с программой.',
      sender: 'Вы',
      timestamp: '14:21',
      isOwn: true,
    },
    {
      id: '3',
      text: 'Домашнее задание выполнено полностью.',
      sender: 'Мама Иванова',
      timestamp: '14:23',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="flex h-screen bg-accent/30">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg">LineaSchool</h1>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'admin' && 'Администратор'}
                  {userRole === 'teacher' && 'Педагог'}
                  {userRole === 'parent' && 'Родитель'}
                </p>
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                  <SheetDescription>
                    Управление профилем и настройками
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Icon name="Bell" size={20} />
                    Уведомления
                    <Badge className="ml-auto" variant="secondary">3</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Icon name="User" size={20} />
                    Личный кабинет
                  </Button>
                  {userRole === 'admin' && (
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Icon name="Shield" size={20} />
                      Админ-панель
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Icon name="Search" size={20} />
                    Поиск
                  </Button>
                  <Separator />
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Icon name="Settings" size={20} />
                    Настройки
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск чатов..."
              className="pl-10 bg-accent/50 border-0"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-3 rounded-lg mb-1 text-left transition-all hover:bg-accent ${
                  selectedChat === chat.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="mt-1">
                    <AvatarFallback className="bg-primary text-white">
                      {chat.type === 'group' ? (
                        <Icon name="Users" size={18} />
                      ) : (
                        <Icon name="User" size={18} />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {chat.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <Badge className="ml-2 bg-primary text-white">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      <Icon name="Users" size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">Группа: Иванов Пётр</h2>
                    <p className="text-sm text-muted-foreground">
                      5 участников
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Search" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-fade-in ${
                      message.isOwn ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {!message.isOwn && (
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-secondary text-white text-sm">
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`flex flex-col ${
                        message.isOwn ? 'items-end' : 'items-start'
                      }`}
                    >
                      {!message.isOwn && (
                        <span className="text-xs font-medium text-muted-foreground mb-1">
                          {message.sender}
                        </span>
                      )}
                      <Card
                        className={`p-3 max-w-md ${
                          message.isOwn
                            ? 'bg-primary text-white'
                            : 'bg-card'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </Card>
                      <span className="text-xs text-muted-foreground mt-1">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-card border-t border-border p-4">
              <div className="max-w-4xl mx-auto flex gap-3">
                <Button variant="ghost" size="icon">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Input
                  placeholder="Напишите сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="MessageSquare" size={40} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Выберите чат
                </h2>
                <p className="text-muted-foreground">
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
