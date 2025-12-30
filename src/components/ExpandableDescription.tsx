import { useState } from "react";

interface ExpandableDescriptionProps {
  text: string;
}

export function ExpandableDescription({ text }: ExpandableDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(' ');
  const truncatedText = words.length > 30 ? words.slice(0, 30).join(' ') + '...' : text;

  return (
    <div className="space-y-3">
      <p className={`${expanded ? '' : 'line-clamp-4'}`}>
        {expanded ? text : truncatedText}
      </p>
      {words.length > 30 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#e50914] hover:text-[#f40612] font-medium text-sm"
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
}