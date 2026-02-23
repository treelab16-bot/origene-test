export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Classic' | 'Vegan' | 'Gluten-Free' | 'Seasonal' | 'Tart' | 'Premium' | 'Organic Five-Spice Vegetarian' | 'Butter-Based Vegetarian (No Egg)';
  ingredients: string[];
  image: string;
  inStock: boolean;
  stockCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: CartItem[];
}

export interface FilterState {
  category: string;
  search: string;
}

export enum SortOption {
  NEWEST = 'newest',
  PRICE_LOW = 'price_low',
  PRICE_HIGH = 'price_high',
}
