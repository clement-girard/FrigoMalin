import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
// @ts-expect-error Node.js strip-types test runner imports the TypeScript module directly.
import { matchRecipes } from './recipes.ts';

describe('mise à jour des correspondances de recettes', () => {
  it('propose des recettes réalisables sans achat avant celles à compléter', () => {
    const matches = matchRecipes(['Avocat', 'Tomates cerises']);
    const feasible = matches.filter(recipe => recipe.missingIngredients.length === 0);
    const incomplete = matches.filter(recipe => recipe.missingIngredients.length > 0);
    assert.ok(feasible.length > 0);
    assert.ok(matches.indexOf(feasible[0]) < matches.indexOf(incomplete[0]));
    assert.ok(feasible.some(recipe => recipe.id === 'avocado-tomato-bowl'));
  });

  it('recalcule recettes et ingrédients manquants après ajout', () => {
    const afterAddingEgg = matchRecipes(['Avocat', 'Œuf', 'Lait frais', 'Tomates cerises']);
    const avocadoToast = afterAddingEgg.find(recipe => recipe.id === 'avocado-toast');
    assert.deepEqual(avocadoToast?.availableIngredients, ['Avocat', 'Œuf']);
    assert.deepEqual(avocadoToast?.missingIngredients, ['Pain', 'Citron']);
    assert.ok(afterAddingEgg[0].missingIngredients.length <= afterAddingEgg.at(-1)!.missingIngredients.length);
  });

  it('recalcule après modification du nom d’un aliment', () => {
    const beforeEdit = matchRecipes(['Avocat', 'Œuf', 'Tomates cerises']);
    const afterEdit = matchRecipes(['Avocat', 'Pain', 'Tomates cerises']);
    assert.deepEqual(beforeEdit.find(recipe => recipe.id === 'avocado-toast')?.missingIngredients, ['Pain', 'Citron']);
    assert.deepEqual(afterEdit.find(recipe => recipe.id === 'avocado-toast')?.missingIngredients, ['Œuf', 'Citron']);
  });

  it('reconnaît les nouveaux aliments sans emoji et distingue pomme de pomme de terre', () => {
    const matches = matchRecipes(['Carottes râpées', 'Citron jaune', 'Pommes de terre', 'Huile d’olive', 'Yaourts nature']);
    assert.deepEqual(matches.find(recipe => recipe.id === 'carrot-salad')?.missingIngredients, []);
    assert.deepEqual(matches.find(recipe => recipe.id === 'potato-pan')?.missingIngredients, []);
    assert.ok(matches.find(recipe => recipe.id === 'yogurt-apple')?.availableIngredients.includes('Yaourt'));
    assert.ok(matches.find(recipe => recipe.id === 'yogurt-apple')?.missingIngredients.includes('Pomme'));
  });

  it('retire les correspondances quand un aliment est supprimé', () => {
    const beforeDelete = matchRecipes(['Lait frais', 'Œuf plein air', 'Tomates cerises']);
    const afterDelete = matchRecipes(['Lait frais', 'Tomates cerises']);
    assert.ok(beforeDelete.find(recipe => recipe.id === 'tomato-omelette')?.availableIngredients.includes('Œuf'));
    assert.ok(!afterDelete.find(recipe => recipe.id === 'tomato-omelette')?.availableIngredients.includes('Œuf'));
    assert.ok(afterDelete.find(recipe => recipe.id === 'tomato-omelette')?.missingIngredients.includes('Œuf'));
  });
});
