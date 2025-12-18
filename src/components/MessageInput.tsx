import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type AttachedFile = {
  type: 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
};

type MessageInputProps = {
  messageText: string;
  attachments: AttachedFile[];
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAttachment: (index: number) => void;
};

export const MessageInput = ({
  messageText,
  attachments,
  onMessageChange,
  onSendMessage,
  onFileUpload,
  onImageUpload,
  onRemoveAttachment,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-gradient-to-r from-card via-primary/5 to-secondary/5 border-t border-border px-6 py-4 shadow-sm">
      {attachments.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-3">
          {attachments.map((attachment, idx) => (
            <div 
              key={idx}
              className="relative group bg-white rounded-2xl overflow-hidden shadow-md border border-border"
            >
              {attachment.type === 'image' && attachment.fileUrl && (
                <div className="relative">
                  <img 
                    src={attachment.fileUrl} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover"
                  />
                  <button
                    onClick={() => onRemoveAttachment(idx)}
                    className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              )}
              
              {attachment.type === 'file' && (
                <div className="flex items-center gap-3 p-3 pr-10 min-w-[200px]">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{attachment.fileName}</p>
                    <p className="text-[10px] text-muted-foreground">{attachment.fileSize}</p>
                  </div>
                  <button
                    onClick={() => onRemoveAttachment(idx)}
                    className="absolute top-3 right-3 bg-destructive text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent text-primary">
          <Icon name="Smile" size={22} />
        </Button>
        
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onImageUpload}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl hover:bg-accent text-secondary"
          onClick={() => imageInputRef.current?.click()}
        >
          <Icon name="Image" size={22} />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={onFileUpload}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl hover:bg-accent text-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <Icon name="Paperclip" size={22} />
        </Button>

        <Input
          placeholder="Введите сообщение"
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onSendMessage();
          }}
          className="flex-1 bg-white border-border h-12 rounded-2xl px-5 shadow-sm focus:ring-2 focus:ring-primary/20"
        />
        <Button
          onClick={onSendMessage}
          size="icon"
          className="bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-2xl h-12 w-12 shadow-lg hover:shadow-xl transition-all"
          disabled={!messageText.trim() && attachments.length === 0}
        >
          <Icon name="Send" size={20} />
        </Button>
      </div>
    </div>
  );
};