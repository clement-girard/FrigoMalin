export type Recipe = {
  id: string;
  title: string;
  time: string;
  difficulty: string;
  image: string;
  ingredients: string[];
  steps: string[];
};

// Base locale : les ingrédients sont exprimés sous leur forme canonique.
export const recipes: Recipe[] = [
  { id: 'avocado-toast', title: 'Tartines avocat & œuf', time: '15 min', difficulty: 'Facile', image: '🥑', ingredients: ['Avocat', 'Œuf', 'Pain', 'Citron'], steps: ['Faites cuire les œufs selon votre préférence.', 'Écrasez l’avocat avec un peu de jus de citron.', 'Faites griller le pain, garnissez avec l’avocat et les œufs.'] },
  { id: 'tomato-omelette', title: 'Omelette aux tomates', time: '12 min', difficulty: 'Très facile', image: '🍳', ingredients: ['Œuf', 'Tomate', 'Lait', 'Beurre'], steps: ['Battez les œufs avec un trait de lait.', 'Faites revenir les tomates dans une poêle avec un peu de beurre.', 'Versez les œufs et faites cuire doucement jusqu’à obtenir la texture souhaitée.'] },
  { id: 'garden-salad', title: 'Salade fraîche du jardin', time: '20 min', difficulty: 'Facile', image: '🥗', ingredients: ['Tomate', 'Concombre', 'Salade', 'Citron'], steps: ['Lavez et coupez les légumes.', 'Mélangez-les dans un saladier.', 'Assaisonnez avec du jus de citron, de l’huile, du sel et du poivre.'] },
  { id: 'tomato-pasta', title: 'Pâtes aux tomates fraîches', time: '25 min', difficulty: 'Facile', image: '🍝', ingredients: ['Tomate', 'Pâtes', 'Ail', 'Huile d’olive'], steps: ['Faites cuire les pâtes dans de l’eau bouillante salée.', 'Faites revenir l’ail et les tomates dans un filet d’huile d’olive.', 'Mélangez les pâtes égouttées avec la sauce.'] },
  { id: 'milk-pancakes', title: 'Petites crêpes au lait', time: '20 min', difficulty: 'Facile', image: '🥞', ingredients: ['Lait', 'Œuf', 'Farine', 'Beurre'], steps: ['Mélangez la farine et les œufs.', 'Ajoutez le lait progressivement en fouettant.', 'Faites cuire de petites crêpes dans une poêle légèrement beurrée.'] },
  { id: 'tomato-sandwich', title: 'Tartine tomate & fromage', time: '10 min', difficulty: 'Très facile', image: '🍅', ingredients: ['Tomate', 'Pain', 'Fromage', 'Huile d’olive'], steps: ['Faites griller les tranches de pain.', 'Ajoutez les tomates coupées et le fromage.', 'Arrosez d’un filet d’huile d’olive et servez.'] },
  { id: 'green-smoothie', title: 'Smoothie fruité', time: '5 min', difficulty: 'Très facile', image: '🥤', ingredients: ['Lait', 'Banane', 'Pomme', 'Miel'], steps: ['Épluchez et coupez les fruits.', 'Placez-les dans un mixeur avec le lait et le miel.', 'Mixez jusqu’à obtenir une texture lisse.'] },
  { id: 'tomato-eggs', title: 'Œufs brouillés à la tomate', time: '10 min', difficulty: 'Très facile', image: '🍳', ingredients: ['Œuf', 'Tomate'], steps: ['Coupez les tomates en petits dés.', 'Faites-les cuire doucement dans une poêle antiadhésive.', 'Ajoutez les œufs battus et remuez jusqu’à cuisson.'] },
  { id: 'avocado-tomato-bowl', title: 'Bowl avocat & tomates', time: '8 min', difficulty: 'Très facile', image: '🥑', ingredients: ['Avocat', 'Tomate'], steps: ['Coupez l’avocat et les tomates en morceaux.', 'Disposez-les dans un bol et assaisonnez selon votre goût.', 'Servez immédiatement.'] },
  { id: 'carrot-salad', title: 'Salade de carottes râpées', time: '10 min', difficulty: 'Très facile', image: '🥕', ingredients: ['Carotte', 'Citron'], steps: ['Lavez, épluchez et râpez les carottes.', 'Ajoutez le jus de citron et mélangez.', 'Servez frais.'] },
  { id: 'zucchini-pan', title: 'Poêlée de courgettes', time: '20 min', difficulty: 'Facile', image: '🥒', ingredients: ['Courgette', 'Ail', 'Huile d’olive'], steps: ['Lavez et coupez les courgettes.', 'Faites-les revenir avec l’ail dans l’huile d’olive jusqu’à ce qu’elles soient tendres.', 'Assaisonnez et servez.'] },
  { id: 'potato-pan', title: 'Pommes de terre sautées', time: '30 min', difficulty: 'Facile', image: '🥔', ingredients: ['Pomme de terre', 'Huile d’olive'], steps: ['Lavez et coupez les pommes de terre en petits morceaux.', 'Faites-les cuire dans une poêle avec l’huile jusqu’à ce qu’elles soient tendres et dorées.', 'Assaisonnez avant de servir.'] },
  { id: 'chicken-rice', title: 'Poulet au riz', time: '30 min', difficulty: 'Facile', image: '🍚', ingredients: ['Poulet', 'Riz'], steps: ['Faites cuire le riz selon les indications du paquet.', 'Faites cuire le poulet à cœur dans une poêle.', 'Servez le poulet avec le riz et assaisonnez.'] },
  { id: 'yogurt-apple', title: 'Yaourt aux pommes', time: '8 min', difficulty: 'Très facile', image: '🍎', ingredients: ['Yaourt', 'Pomme'], steps: ['Lavez et coupez la pomme en dés.', 'Ajoutez-la au yaourt.', 'Mélangez et servez frais.'] },
];

const aliases: Record<string, string[]> = {
  'œuf': ['œuf', 'oeuf', 'œufs', 'oeufs'],
  'tomate': ['tomate', 'tomates'],
  'avocat': ['avocat', 'avocats'],
  'lait': ['lait'],
  'pain': ['pain', 'baguette'],
  'citron': ['citron'],
  'concombre': ['concombre'],
  'salade': ['salade', 'laitue'],
  'beurre': ['beurre'],
  'pâtes': ['pâte', 'pates', 'pâtes'],
  'ail': ['ail'],
  'huile d’olive': ['huile d’olive', "huile d'olive", 'huile olive'],
  'farine': ['farine'],
  'fromage': ['fromage', 'emmental', 'mozzarella', 'gruyère'],
  'banane': ['banane'],
  'pomme': ['pomme', 'pommes'],
  'miel': ['miel'],
  'carotte': ['carotte', 'carottes'],
  'courgette': ['courgette', 'courgettes'],
  'pomme de terre': ['pomme de terre', 'pommes de terre', 'patate', 'patates'],
  'poulet': ['poulet', 'poulets'],
  'riz': ['riz'],
  'yaourt': ['yaourt', 'yaourts', 'yogourt', 'yogourts'],
};

function normalize(value: string) {
  return value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/œ/g, 'oe').replace(/[’']/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasIngredient(foodNames: string[], ingredient: string) {
  const variants = (aliases[ingredient.toLocaleLowerCase('fr')] ?? [ingredient]).map(normalize);
  return foodNames.some((food) => {
    const name = ` ${normalize(food)} `;
    return variants.some((variant) => name.includes(` ${variant} `) && !(ingredient === 'Pomme' && / pommes? de terre /.test(name)));
  });
}

export type MatchedRecipe = Recipe & { availableIngredients: string[]; missingIngredients: string[] };

export function matchRecipes(foodNames: string[]): MatchedRecipe[] {
  return recipes.map((recipe) => {
    const availableIngredients = recipe.ingredients.filter((ingredient) => hasIngredient(foodNames, ingredient));
    return { ...recipe, availableIngredients, missingIngredients: recipe.ingredients.filter((ingredient) => !availableIngredients.includes(ingredient)) };
  }).sort((a, b) => a.missingIngredients.length - b.missingIngredients.length || b.availableIngredients.length - a.availableIngredients.length || a.title.localeCompare(b.title, 'fr'));
}
