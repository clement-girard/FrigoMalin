// Photos locales : le nom prime, puis la catégorie sert de repli.
export function foodPhoto(name: string, category: string): string {
  const normalized = name.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/œ/g, 'oe');
  if (/\b(avocat|avocats)\b/.test(normalized)) return '/foods/avocado.jpg';
  if (/\b(tomate|tomates)\b/.test(normalized)) return '/foods/tomato.jpg';
  if (/\b(oeuf|oeufs)\b/.test(normalized)) return '/foods/eggs.jpg';
  if (/\b(lait|yaourt|yogourt|fromage|creme)\b/.test(normalized)) return '/foods/dairy.jpg';
  if (/\b(poulet|boeuf|steak|viande|poisson|saumon)\b/.test(normalized)) return '/foods/meat.jpg';
  if (/\b(pain|pates|riz|farine|huile)\b/.test(normalized)) return '/foods/pantry.jpg';
  if (category === 'Fruits & légumes') return '/foods/vegetables.jpg';
  if (category === 'Produits laitiers') return '/foods/dairy.jpg';
  if (category === 'Viandes & poissons') return '/foods/meat.jpg';
  if (category === 'Épicerie') return '/foods/pantry.jpg';
  return '/foods/other.jpg';
}
