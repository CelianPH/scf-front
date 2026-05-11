import DOMPurify from "isomorphic-dompurify";

interface RichTextProps {
  html?: string | null;
  className?: string;
}

export function RichText({ html, className }: RichTextProps) {
  if (!html) return null;
  const safe = DOMPurify.sanitize(html);
  return (
    <div
      className={className}
      // Sanitised via DOMPurify on the line above; safe to inject.
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
