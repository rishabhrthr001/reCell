
import { Brand, DeviceModel, InventoryItem } from './types';

export const BRANDS: Brand[] = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing'];

export const BRAND_LOGOS: Record<Brand, string> = {
  'Apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  'Samsung': 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  'Google': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg',
  'OnePlus': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/OnePlus_logo.svg',
  'Xiaomi': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg',
  'Nothing': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Nothing_logo.svg'
};

export const MODELS: DeviceModel[] = [
  { id: '1', brand: 'Apple', name: 'iPhone 15 Pro Max', basePrice: 125000, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400' },
  { id: '2', brand: 'Apple', name: 'iPhone 14', basePrice: 65000, image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=400' },
  { id: '3', brand: 'Samsung', name: 'Galaxy S24 Ultra', basePrice: 115000, image: 'https://images.unsplash.com/photo-1706114131602-536966838a6a?auto=format&fit=crop&q=80&w=400' },
  { id: '4', brand: 'Samsung', name: 'Galaxy Z Fold 5', basePrice: 135000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400' },
  { id: '5', brand: 'Google', name: 'Pixel 8 Pro', basePrice: 95000, image: 'https://images.unsplash.com/photo-1697528389657-3604f3d1b333?auto=format&fit=crop&q=80&w=400' },
  { id: '6', brand: 'OnePlus', name: 'OnePlus 12', basePrice: 65000, image: 'https://images.unsplash.com/photo-1707212000000-d8f99e32a630?auto=format&fit=crop&q=80&w=400' },
  { id: '7', brand: 'Apple', name: 'iPhone 13 Mini', basePrice: 42000, image: 'https://images.unsplash.com/photo-1634305881475-4d74261448b1?auto=format&fit=crop&q=80&w=400' },
  { id: '8', brand: 'Nothing', name: 'Phone (2)', basePrice: 45000, image: 'https://images.unsplash.com/photo-1689088659102-14cc4500e57c?auto=format&fit=crop&q=80&w=400' },
];

export const INVENTORY: InventoryItem[] = [
  { id: 'i1', brand: 'Apple', name: 'iPhone 14 Pro', storage: '256GB', price: 84900, originalPrice: 119900, grade: 'A', image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=400' },
  { id: 'i2', brand: 'Samsung', name: 'Galaxy S23', storage: '128GB', price: 49900, originalPrice: 79900, grade: 'B', image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=400' },
  { id: 'i3', brand: 'Google', name: 'Pixel 7', storage: '128GB', price: 34900, originalPrice: 59900, grade: 'C', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=400' },
  { id: 'i4', brand: 'Apple', name: 'iPhone 12', storage: '64GB', price: 32900, originalPrice: 79900, grade: 'A', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=400' },
];

export const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB'];
export const AGE_OPTIONS = ['Less than 6 months', '6-11 months', '1-2 years', 'Above 2 years'];
