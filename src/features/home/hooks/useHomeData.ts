import { useState } from 'react';
import { CampaignBanner, Combo, Product } from '@/types/product.types';

export const useHomeData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const campaign: CampaignBanner = {
    tag: 'EDICIÓN ESPECIAL ✨',
    title: 'Regalos que enamoran · Fragancias Exclusivas',
    subtitle: 'Envío gratis desde Gs. 250.000 + Caja de lujo Maribel con tarjeta dedicatoria de obsequio.',
    ctaText: 'Ver Colección Especial ✨',
  };

  const combos: Combo[] = [
    {
      id: 'combo-duo-sensualite',
      title: 'Duo Sensualité',
      kicker: '★ FAVORITO BOUTIQUE',
      discountBadge: 'Ahorrás Gs. 60.000',
      savingsAmount: 60000,
      fragranceCountLabel: '2 Fragancias',
      description: 'Incluye: Cool Girl EdP 85ml + Mystical Zanzibara 30ml + Mini estuche rígido con listón.',
      originalPrice: 365000,
      price: 305000,
      imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 'combo-pack-romance',
      title: 'Pack Romance Florale',
      kicker: '♥ BOUQUET FLORAL',
      discountBadge: 'Ahorrás Gs. 45.000',
      savingsAmount: 45000,
      fragranceCountLabel: '3 Piezas',
      description: 'Incluye: Sweet Cherry 85ml + Tartan Silk 30ml + Loción corporal iluminadora perfumada.',
      originalPrice: 360000,
      price: 315000,
      imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 'combo-duo-imperial',
      title: 'Duo Imperial Noir',
      kicker: '✦ ÉXITO EN VENTAS',
      discountBadge: 'Ahorrás Gs. 50.000',
      savingsAmount: 50000,
      fragranceCountLabel: '2 Fragancias',
      description: 'Incluye: Sauvage Intense 100ml + Bleu Nocturne 30ml travel spray recargable.',
      originalPrice: 390000,
      price: 340000,
      imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
  ];

  const products: Product[] = [
    {
      id: 'prod-cool-girl',
      name: 'Cool Girl Velvet Pour Femme',
      brand: 'Carolina H.',
      category: 'Femenino',
      volumeMl: 85,
      price: 165000,
      originalPrice: 190000,
      imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80',
      stock: 12,
      badge: 'Más Vendido',
    },
    {
      id: 'prod-sauvage',
      name: 'Sauvage Eau de Parfum',
      brand: 'Dior Luxe',
      category: 'Masculino',
      volumeMl: 100,
      price: 180000,
      originalPrice: 210000,
      imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=500&q=80',
      stock: 8,
      badge: 'Top Masculino',
    },
    {
      id: 'prod-baccarat',
      name: 'Rouge Ambré 540 Sillage',
      brand: 'Maison Chic',
      category: 'Unisex',
      volumeMl: 70,
      price: 210000,
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=500&q=80',
      stock: 5,
      badge: 'Exclusivo',
    },
    {
      id: 'prod-khamrah',
      name: 'Khamrah Qahwa Imperial',
      brand: 'Lattafa Perfumes',
      category: 'Árabe',
      volumeMl: 100,
      price: 195000,
      originalPrice: 230000,
      imageUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=500&q=80',
      stock: 14,
      badge: 'Tendencia',
    },
  ];

  const categories = ['Todos', 'Combos', 'Femenino', 'Masculino', 'Árabe', 'Unisex'];

  const filteredCombos = combos.filter((combo) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      combo.title.toLowerCase().includes(query) ||
      combo.description.toLowerCase().includes(query)
    );
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'Todos' ||
      activeCategory === 'Combos' ||
      product.category === activeCategory;

    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );
  });

  return {
    campaign,
    combos: filteredCombos,
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
  };
};
