import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NoteMarkdownProps {
  content: string;
  className?: string;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);

  return parts.filter(Boolean).map((part, index) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$|^__([^_]+)__$/);

    if (boldMatch) {
      return <strong key={`${part}-${index}`}>{boldMatch[1] ?? boldMatch[2]}</strong>;
    }

    return part;
  });
}

function renderBlocks(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  function flushParagraph() {
    if (!paragraphLines.length) {
      return;
    }

    const text = paragraphLines.join(" ");
    blocks.push(
      <p key={`p-${blocks.length}`} className="note-markdown__paragraph">
        {renderInline(text)}
      </p>
    );
    paragraphLines = [];
  }

  function flushList() {
    if (!listItems.length || !listType) {
      return;
    }

    const Tag = listType;
    blocks.push(
      <Tag key={`list-${blocks.length}`} className="note-markdown__list">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`} className="note-markdown__list-item">
            {renderInline(item)}
          </li>
        ))}
      </Tag>
    );

    listItems = [];
    listType = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);

    if (headingMatch) {
      flushParagraph();
      flushList();

      const level = headingMatch[1].length;
      const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;

      blocks.push(
        <HeadingTag
          key={`heading-${blocks.length}`}
          className={`note-markdown__heading note-markdown__heading--${Math.min(level, 6)}`}
        >
          {renderInline(headingMatch[2])}
        </HeadingTag>
      );
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);

    if (orderedMatch) {
      flushParagraph();

      if (listType && listType !== "ol") {
        flushList();
      }

      listType = "ol";
      listItems.push(orderedMatch[1]);
      continue;
    }

    const bulletMatch = line.match(/^[-*+]\s+(.*)$/);

    if (bulletMatch) {
      flushParagraph();

      if (listType && listType !== "ul") {
        flushList();
      }

      listType = "ul";
      listItems.push(bulletMatch[1]);
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export function NoteMarkdown({ content, className }: NoteMarkdownProps) {
  return <div className={cn("note-markdown", className)}>{renderBlocks(content)}</div>;
}
