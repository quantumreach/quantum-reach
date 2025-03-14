
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  preview?: boolean;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange,
  preview = false
}) => {
  if (preview) {
    return (
      <div className="p-4 prose prose-sm md:prose-base max-w-none font-lora overflow-auto">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    );
  }

  return (
    <Tabs defaultValue="write" className="w-full">
      <TabsList className="bg-muted p-0 mx-4 mt-2">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="p-0 m-0">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your content here using Markdown..."
          className="min-h-[400px] border-none shadow-none focus-visible:ring-0 font-mono text-sm resize-none"
        />
      </TabsContent>
      <TabsContent value="preview" className="p-4 m-0">
        <div className="prose prose-sm md:prose-base max-w-none font-lora overflow-auto min-h-[400px] bg-background">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic">Nothing to preview yet...</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
