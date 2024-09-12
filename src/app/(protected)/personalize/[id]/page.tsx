"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { cardTemplates } from '@/components/cards/card-templates';
import Canvas from '@/components/personalize/canvas';
import { CardTemplate } from '@/components/cards/card-templates';
import PersonalizeHeader from '@/components/personalize/header-personalize';

type CardOptions = {
  type: 'ecard' | 'standard';
  quantity: number;
};

export default function PersonalizePage() {
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<CardTemplate | null>(null);
  const [cardOptions, setCardOptions] = useState<CardOptions>({ type: 'standard', quantity: 1 });
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    const selectedTemplate = cardTemplates.find(t => t.id === id);
    setTemplate(selectedTemplate || null);
  }, [id]);

  const handlePreview = () => {
    // Implement preview logic if needed
  };

  const handleAddToBasket = () => {
    if (template) {
      localStorage.setItem('selectedTemplate', JSON.stringify(template));
      localStorage.setItem('selectedOptions', JSON.stringify(cardOptions));
      router.push('/carrito');
    }
  };

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
      <PersonalizeHeader 
        onAddToBasket={handleAddToBasket} 
        template={template}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {template && (
          <Canvas 
            template={template} 
            selectedPage={selectedPage}
            onPageChange={setSelectedPage}
          />
        )}
      </div>
    </div>
  );
}
