import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const { content } = useContent();
  const faqs = content.faq;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-8 text-center">Pertanyaan Umum</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-stone-200 dark:border-stone-800">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between py-4 text-left focus:outline-none group"
            >
              <span className="font-medium text-stone-900 dark:text-stone-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-stone-500 dark:text-stone-400 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-stone-600 dark:text-stone-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
