import type { Category, MenuItem } from "./types";

export const CATEGORIES: Category[] = [
  { id: "breakfast", name: "Завтраки", iconUrl: "/images/tableorder/breakfast.webp" },
  { id: "salads", name: "Салаты", iconUrl: "/images/tableorder/salad.webp" },
  { id: "hot", name: "Горячее", iconUrl: "/images/tableorder/hot.webp" },
  { id: "drinks", name: "Напитки", iconUrl: "/images/tableorder/drink.webp" },
  { id: "desserts", name: "Десерты", iconUrl: "/images/tableorder/dessert.webp" },
];

export const DISHES: MenuItem[] = [
  // Завтраки
  { id: "d1", categoryId: "breakfast", name: "Сырники со сметаной", description: "Нежные сырники из творога, подаются со сметаной и ягодным соусом", price: 350, emoji: "🥞", popular: true },
  { id: "d2", categoryId: "breakfast", name: "Омлет с беконом", description: "Пышный омлет из трёх яиц с хрустящим беконом и тостом", price: 320, emoji: "🍳" },
  { id: "d3", categoryId: "breakfast", name: "Каша рисово-молочная", description: "Рисовая каша на топлёном молоке с маслом и корицей", price: 250, emoji: "🥣" },
  { id: "d4", categoryId: "breakfast", name: "Гранола с йогуртом", description: "Домашняя гранола с греческим йогуртом, мёдом и свежими ягодами", price: 380, emoji: "🥛" },

  // Салаты
  { id: "d5", categoryId: "salads", name: "Цезарь с курицей", description: "Куриная грудка, романо, пармезан, гренки, соус Цезарь", price: 420, emoji: "🥗", popular: true },
  { id: "d6", categoryId: "salads", name: "Греческий салат", description: "Овощи, фета, маслины, оливковое масло и пряные травы", price: 380, emoji: "🥗" },
  { id: "d7", categoryId: "salads", name: "Тёплый салат с говядиной", description: "Ростбиф с руколой, черри, пармезаном и бальзамиком", price: 490, emoji: "🥩" },
  { id: "d8", categoryId: "salads", name: "Салат с тунцом", description: "Консервированный тунец, микс салата, яйцо, оливки, кукуруза", price: 410, emoji: "🐟" },

  // Горячее
  { id: "d9", categoryId: "hot", name: "Паста Карбонара", description: "Спагетти, бекон, яичный желток, пармезан, сливочный соус", price: 450, emoji: "🍝", popular: true },
  { id: "d10", categoryId: "hot", name: "Борщ с пампушками", description: "Классический борщ со сметаной и чесночными пампушками", price: 380, emoji: "🍲" },
  { id: "d11", categoryId: "hot", name: "Куриная грудка гриль", description: "Куриная грудка с овощами гриль и соусом песто", price: 420, emoji: "🍗" },
  { id: "d12", categoryId: "hot", name: "Стейк из лосося", description: "Филе лосося с пюре из цветной капусты и лимонным маслом", price: 650, emoji: "🐟" },
  { id: "d13", categoryId: "hot", name: "Рис с овощами", description: "Жареный рис с болгарским перцем, морковью, горошком и яйцом", price: 320, emoji: "🍚" },

  // Напитки
  { id: "d14", categoryId: "drinks", name: "Капучино", description: "Эспрессо с воздушной молочной пеной", price: 220, emoji: "☕", popular: true },
  { id: "d15", categoryId: "drinks", name: "Матча-латте", description: "Японский зелёный чай матча с молоком", price: 280, emoji: "🍵" },
  { id: "d16", categoryId: "drinks", name: "Лимонад маракуйя", description: "Домашний лимонад с маракуйей и мятой", price: 250, emoji: "🍹" },
  { id: "d17", categoryId: "drinks", name: "Чай облепиховый", description: "Облепиха, имбирь, мёд и апельсин — горячий напиток", price: 230, emoji: "🍊" },
  { id: "d18", categoryId: "drinks", name: "Смузи ягодный", description: "Клубника, черника, банан на миндальном молоке", price: 290, emoji: "🫐" },

  // Десерты
  { id: "d19", categoryId: "desserts", name: "Чизкейк Нью-Йорк", description: "Классический сливочный чизкейк с ягодным конфитюром", price: 390, emoji: "🍰", popular: true },
  { id: "d20", categoryId: "desserts", name: "Тирамису", description: "Итальянский десерт с маскарпоне и кофе", price: 370, emoji: "🍮" },
  { id: "d21", categoryId: "desserts", name: "Брауни с мороженым", description: "Шоколадный брауни с ванильным мороженым и орехами", price: 420, emoji: "🍫" },
  { id: "d22", categoryId: "desserts", name: "Панна-котта", description: "Сливочный итальянский десерт с клубничным топпингом", price: 340, emoji: "🍮" },
];

export function getDishesByCategory(categoryId: string): MenuItem[] {
  return DISHES.filter((d) => d.categoryId === categoryId);
}

export function getItem(id: string): MenuItem | undefined {
  return DISHES.find((d) => d.id === id);
}

export const POPULAR_ITEM = DISHES.find((d) => d.popular);
