import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}