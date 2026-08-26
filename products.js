// Дані каталогу BARS. Ціни вже актуалізовані за вашим описом.
// Детальні розмірні сітки зберігаються окремо у sizes.js.
window.PRODUCTS = [
  { id: "tshirt", number: "01", name: "Клубна футболка", label: "Форма BARS",
    prices: [{ label: "Дитячі", value: 850 }, { label: "Дорослі від S", value: 1000 }],
    image: "assets/bars-tshirt.jpg", imageAlt: "Клубна футболка BARS — вигляд спереду та ззаду",
    description: "Легка клубна футболка у фірмовій чорно-бірюзовій палітрі.", sizeChart: "tshirt" },
  { id: "tracksuit", number: "02", name: "Клубний костюм", label: "Повний комплект",
    prices: [{ label: "Дитячі", value: 3000 }, { label: "Дорослі", value: 3500 }],
    image: "assets/bars-tracksuit.png", imageAlt: "Клубний спортивний костюм BARS",
    description: "Кофта та штани з клубною символікою для тренувань і виїздів.", sizeChart: "tracksuit" },
  { id: "shorts", number: "03", name: "Спортивні шорти", label: "Дитячі та дорослі",
    prices: [{ label: "Дитячі", value: 1500 }, { label: "Дорослі", value: 1700 }],
    image: "assets/bars-shorts.jpg", imageAlt: "Клубні спортивні шорти BARS — вигляд спереду та ззаду",
    description: "Двошарові клубні шорти для тренувань. Доступні дитячі та дорослі розміри.", sizeChart: "shorts" },
  { id: "bag", number: "04", name: "Сумка для амуніції", label: "Один розмір", price: 1700,
    image: "assets/bars-bag.jpg", imageAlt: "Клубна спортивна сумка BARS — елементи дизайну",
    description: "Містка спортивна сумка для форми та захисної амуніції." },
  { id: "guards", number: "05", name: "Накладки на ноги", label: "Захист", price: 300,
    image: "assets/bars-leg-guards.jpg", imageAlt: "Сині та червоні накладки на ноги BARS",
    description: "Клубні накладки для тренувань. Доступні у синьому та червоному кольорах.",
    sizes: ["S", "M", "L"], sizesNote: "Тестова сітка" }
];
