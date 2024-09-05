"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CardTemplate } from '@/components/cards/card-templates';

type CardOptions = {
  type: 'ecard' | 'standard';
  quantity: number;
};

type CardSize = {
  label: string;
  description: string;
  price: number;
  bgColor: string;
};

const cardSizes: Record<CardOptions['type'], CardSize> = {
  ecard: { label: 'eCard', description: 'Envio instantaneo', price: 99, bgColor: '#04d9b2' },
  standard: { label: 'Standard Card', description: 'Para tus seres queridos', price: 199, bgColor: '#5D60a6' },
};

const CartPage = () => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartItem, setCartItem] = useState<{ template: CardTemplate; options: CardOptions } | null>(null);

  useEffect(() => {
    const storedTemplate = localStorage.getItem('selectedTemplate');
    const storedOptions = localStorage.getItem('selectedOptions');

    if (storedTemplate && storedOptions) {
      const template = JSON.parse(storedTemplate) as CardTemplate;
      const options = JSON.parse(storedOptions) as CardOptions;
      setCartItem({ template, options });
    }
  }, []);

  const addresses = [
    { id: 1, address: 'Calle 123, Ciudad A' },
    { id: 2, address: 'Avenida 456, Ciudad B' },
  ];

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      const updatedOptions = { ...cartItem.options, quantity: newQuantity };
      setCartItem({ ...cartItem, options: updatedOptions });
      localStorage.setItem('selectedOptions', JSON.stringify(updatedOptions));
    }
  };

  const handleRemoveItem = () => {
    setCartItem(null);
    localStorage.removeItem('selectedTemplate');
    localStorage.removeItem('selectedOptions');
  };

  const handleContinueShopping = () => {
    router.push('/cards');
  };

  if (!cartItem) {
    return (
      <div className="container mx-auto pt-48 px-4 py-8 text-center">
        <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6">Carrito vacío</h1>
        <p className="text-xl font-geometos text-gray-600 mb-8">No hay artículos en tu carrito.</p>
        <button
          onClick={handleContinueShopping}
          className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-6 py-3 rounded font-geometos text-lg"
        >
          Continuar comprando
        </button>
      </div>
    );
  }

  const totalPrice = cardSizes[cartItem.options.type].price * cartItem.options.quantity;

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Carrito</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Artículo en el carrito</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Image src={cartItem.template.imageUrl} alt="Card Template" width={200} height={200} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-geometos text-[#5D60a6]">{cardSizes[cartItem.options.type].label}</h3>
            <p className="text-sm font-geometos text-gray-600">{cardSizes[cartItem.options.type].description}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(Math.max(1, cartItem.options.quantity - 1))}
                  className="bg-gray-200 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="bg-gray-100 px-4 py-1">{cartItem.options.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(cartItem.options.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-geometos text-[#04d9b2]">
                ${cardSizes[cartItem.options.type].price} x {cartItem.options.quantity}
              </p>
            </div>
            <p className="text-lg font-geometos text-[#5D60a6] mt-2">Total: ${totalPrice}</p>
            <button
              onClick={handleRemoveItem}
              className="mt-4 text-red-500 hover:text-red-700 font-geometos"
            >
              Eliminar artículo
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Dirección de envío</h2>
          <select
            value={selectedAddress}
            onChange={handleAddressChange}
            className="w-full p-2 mb-4 font-geometos text-[#5D60a6] border border-gray-200 rounded-lg"
          >
            <option value="">Selecciona una dirección</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.address}
              </option>
            ))}
          </select>
          
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Método de pago</h2>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="font-geometos text-[#5D60a6]">Opciones de pago en desarrollo</p>
          </div>
          
          <button
            onClick={handlePayment}
            className="w-full bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-4 py-2 rounded font-geometos"
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
