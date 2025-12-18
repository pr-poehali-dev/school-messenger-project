import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

type ProfileSettingsProps = {
  userRole: UserRole;
  onBack: () => void;
};

export const ProfileSettings = ({ userRole, onBack }: ProfileSettingsProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'teacher': return 'Педагог';
      case 'parent': return 'Родитель';
      case 'student': return 'Ученик';
    }
  };

  const handleSave = () => {
    console.log('Сохранение профиля:', { name, email, phone, bio });
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="bg-card border-b border-border px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-xl hover:bg-muted"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Настройки профиля</h1>
            <p className="text-sm text-muted-foreground">Управление личной информацией</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                  <Icon name="User" size={40} />
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="rounded-xl mb-2">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
                <p className="text-xs text-muted-foreground">
                  Рекомендуемый размер: 500x500 пикселей
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="role" className="text-sm font-medium mb-2 block">
                  Роль
                </Label>
                <Input
                  id="role"
                  value={getRoleName(userRole)}
                  disabled
                  className="rounded-xl bg-muted"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Полное имя
                </Label>
                <Input
                  id="name"
                  placeholder="Введите ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-sm font-medium mb-2 block">
                  О себе
                </Label>
                <textarea
                  id="bio"
                  placeholder="Расскажите о себе..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full min-h-[100px] px-4 py-3 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Безопасность</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-xl">
                <Icon name="Lock" size={18} className="mr-3" />
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl">
                <Icon name="Shield" size={18} className="mr-3" />
                Двухфакторная аутентификация
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-xl"
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
