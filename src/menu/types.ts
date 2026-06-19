export interface Category {
  id: string;
  name: string;
  iconUrl: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  popular?: boolean;
}

export interface CartItem {
  itemId: string;
  quantity: number;
}

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "preparing" | "delivering" | "delivered";

export interface Order {
  id: string;
  items: OrderItem[];
  comment: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface MenuTheme {
  bg: string;
  card: string;
  text: string;
  muted: string;
  accent: string;
  accentBg: string;
  border: string;
  btnBg: string;
  btnText: string;
  success: string;
  error: string;
}
