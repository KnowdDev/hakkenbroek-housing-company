'use client';

import React from 'react';

interface FormattedDescriptionProps {
  text?: string | null;
  className?: string;
}

type Block =
  | { type: 'heading'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'list'; items: string[] };

// Render inline **bold** segments within a string.
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <strong key={`${keyPrefix}-b-${i}`} className="font-medium text-charcoal">
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
    i++;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

// Parse a plain/markdown-ish description into structured blocks.
function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  // Normalise line endings, then split into lines.
  const lines = text.replace(/\r\n/g, '\n').split('\n');

  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: 'paragraph', content: paragraph.join(' ').trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: 'list', items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === '') {
      flushParagraph();
      flushList();
      continue;
    }

    // Bullet item: "- ", "* ", or "• "
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      listItems.push(bulletMatch[1].trim());
      continue;
    }

    // Standalone bold line => heading (e.g. "**Indeling**")
    const headingMatch = line.match(/^\*\*(.+?)\*\*:?$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', content: headingMatch[1].trim() });
      continue;
    }

    // Otherwise accumulate into the current paragraph.
    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export default function FormattedDescription({ text, className }: FormattedDescriptionProps) {
  if (!text || !text.trim()) {
    return null;
  }

  const blocks = parseBlocks(text);

  return (
    <div className={className}>
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          return (
            <h3
              key={`h-${idx}`}
              className="font-display text-lg text-charcoal mt-6 mb-2 first:mt-0"
            >
              {block.content}
            </h3>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={`l-${idx}`} className="my-3 space-y-2">
              {block.items.map((item, i) => (
                <li key={`l-${idx}-${i}`} className="flex gap-3 text-stone-600 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brass" aria-hidden />
                  <span>{renderInline(item, `l-${idx}-${i}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`p-${idx}`} className="text-stone-600 leading-relaxed mb-4 last:mb-0">
            {renderInline(block.content, `p-${idx}`)}
          </p>
        );
      })}
    </div>
  );
}
