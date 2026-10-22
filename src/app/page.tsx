'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import Image from 'next/image';
import DemoAccess from './DemoAccess';
import { foodPhoto } from '@/data/foodPhotos';
import { matchRecipes } from '@/data/recipes';
import type { MatchedRecipe } from '@/data/recipes';

type Food = { id: string; name: string; category: string; quantity: string; expiry: string; image: string };
type Grocery = { id: string; name: string; done: boolean };
const today = new Date();
const dateIn = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };
const seed: Food[] = [
  { id: '1', name: 'Avocat', category: 'Fruits & légumes', quantity: '2 pièces', expiry: dateIn(1), image: '🥑' },
  { id: '2', name: 'Lait frais', category: 'Produits laitiers', quantity: '1 bouteille', expiry: dateIn(2), image: '🥛' },
  { id: '3', name: 'Tomates cerises', category: 'Fruits & légumes', quantity: '250 g', expiry: dateIn(3), image: '🍅' },
  { id: '4', name: 'Œufs plein air', category: 'Produits laitiers', quantity: '6 pièces', expiry: dateIn(8), image: '🥚' },
];
function status(food: Food) { const days = Math.ceil((new Date(`${food.expiry}T23:59:59`).getTime() - new Date().setHours(0,0,0,0)) / 86400000); return days <= 1 ? 'urgent' : days <= 3 ? 'soon' : 'fresh'; }
function niceDate(value: string) { return new Date(`${value}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); }

export default function Home() {
  return <DemoAccess>{logout => <FrigoApp onLogout={logout} />}</DemoAccess>;
}

function FrigoApp({ onLogout }: { onLogout: () => void }) {
  const [foods, setFoods] = useState<Food[]>([]); const [ready, setReady] = useState(false);
  const [groceries, setGroceries] = useState<Grocery[]>([]); const [tab, setTab] = useState('Accueil');
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('Tous'); const [sort, setSort] = useState('date');
  const [modal, setModal] = useState(false); const [editing, setEditing] = useState<Food | null>(null); const [toast, setToast] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  useEffect(() => { const timer = window.setTimeout(() => { try { const f = localStorage.getItem('frigomalin-foods'); setFoods(f ? JSON.parse(f) : seed); const g = localStorage.getItem('frigomalin-groceries'); setGroceries(g ? JSON.parse(g) : []); } catch { setFoods(seed); } setReady(true); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (ready) { localStorage.setItem('frigomalin-foods', JSON.stringify(foods)); localStorage.setItem('frigomalin-groceries', JSON.stringify(groceries)); } }, [foods, groceries, ready]);
  const updateToast = (s: string) => { setToast(s); window.setTimeout(() => setToast(''), 2400); };
  const filtered = useMemo(() => foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) && (filter === 'Tous' || status(f) === filter)).sort((a,b) => sort === 'nom' ? a.name.localeCompare(b.name) : a.expiry.localeCompare(b.expiry)), [foods, search, filter, sort]);
  const addFood = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const data = new FormData(e.currentTarget); const item: Food = { id: editing?.id ?? crypto.randomUUID(), name: String(data.get('name')).trim(), category: String(data.get('category')), quantity: String(data.get('quantity')).trim(), expiry: String(data.get('expiry')), image: foodPhoto(String(data.get('name')).trim(), String(data.get('category'))) }; if (!item.name || !item.quantity || !item.expiry) return; setFoods(prev => editing ? prev.map(f => f.id === item.id ? item : f) : [item, ...prev]); setModal(false); setEditing(null); updateToast(editing ? 'Aliment modifié' : 'Aliment ajouté au frigo'); };
  const deleteFood = (id: string) => { setFoods(prev => prev.filter(f => f.id !== id)); updateToast('Aliment supprimé'); };
  const toggleGrocery = (id: string) => setGroceries(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  const matchedRecipes = useMemo(() => matchRecipes(foods.map(food => food.name)), [foods]);
  const feasibleRecipes = matchedRecipes.filter(recipe => recipe.missingIngredients.length === 0);
  const recipesToComplete = matchedRecipes.filter(recipe => recipe.missingIngredients.length > 0);
  const featuredRecipe = feasibleRecipes[0] ?? matchedRecipes[0];
  const selectedRecipe = matchedRecipes.find(recipe => recipe.id === selectedRecipeId) ?? null;
  const freshCount = foods.filter(food => status(food) === 'fresh').length;
  const soonCount = foods.filter(food => status(food) === 'soon').length;
  const urgentCount = foods.filter(food => status(food) === 'urgent').length;
  const nav = ['Accueil', 'Mon frigo', 'Recettes', 'Courses'];
  const navigateToTab = (nextTab: string) => {
    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return <>
    {tab === 'Accueil' && <section className="landing-hero" aria-label="Bienvenue sur Frigo Malin"><div className="hero-orbit hero-orbit-one" aria-hidden="true"/><div className="hero-orbit hero-orbit-two" aria-hidden="true"/><div className="landing-content"><span className="landing-kicker">MOINS DE GASPILLAGE, PLUS DE PLAISIR</span><h1>Frigo <span>Malin</span></h1><p>Tout ce qu’il faut pour cuisiner<br className="landing-break"/> merveilleusement avec ce que vous avez.</p><div className="hero-food-art" aria-hidden="true"><span className="hero-fridge"><i/><b/><em/></span><span className="hero-food leaf">✿</span><span className="hero-food citrus">◒</span><span className="hero-food herb">✳</span><span className="hero-food seed">·</span></div></div><div className="scroll-cue" aria-hidden="true"><span>FAITES DÉFILER</span><i>↓</i></div></section>}
    <main className="app-shell" id="application">
    <header className="topbar"><a className="brand" href="#" onClick={e => { e.preventDefault(); navigateToTab('Accueil'); }}><span className="brand-mark">f</span> frigo<span>malin</span></a><nav className="top-nav" aria-label="Navigation principale">{nav.map((n,i) => <button key={n} onClick={() => navigateToTab(n)} className={tab === n ? 'active' : ''} aria-current={tab === n ? 'page' : undefined}><span className="nav-icon" aria-hidden="true">{i === 1 ? <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M5 10h14M8 6v2M8 13v3"/></svg> : i === 2 ? <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M16 2c-2.5 2.5-3 5.5-3 9h5V2M18 11v11"/></svg> : ['⌂','','','☷'][i]}</span><span>{n}</span></button>)}</nav><button type="button" className="profile logout-button" onClick={onLogout} aria-label="Se déconnecter" title="Se déconnecter">Se déconnecter</button></header>
    <div className="content">
      {tab === 'Accueil' && <><section className="welcome"><div><p className="eyebrow">JEUDI 22 OCTOBRE</p><h1>Bonjour ! <span>👋</span></h1><p className="subtitle">Qu’est-ce qu’on cuisine aujourd’hui ?</p></div><div className="welcome-art" aria-hidden="true">🥬</div></section>
      <section className="stats" aria-label="Résumé du frigo"><StatCard icon="✳" tone="green" count={freshCount} label="Aliments frais" foods={foods.filter(food => status(food) === 'fresh')} /><StatCard icon="◷" tone="amber" count={soonCount} label="Bientôt périmés" foods={foods.filter(food => status(food) === 'soon')} /><StatCard icon="!" tone="coral" count={urgentCount} label="À consommer vite" foods={foods.filter(food => status(food) === 'urgent')} /></section>
      <button className="add-button" onClick={() => { setEditing(null); setModal(true); }}><span>＋</span> Ajouter un aliment</button>
      <section className="recipe-banner"><div className="recipe-copy"><p className="eyebrow">INSPIRÉ DE VOTRE FRIGO</p><h2>Une idée pour ce soir ?</h2><p className="recipe-title">{featuredRecipe?.title ?? 'Ajoutez des aliments pour découvrir des recettes'}</p><div className="recipe-meta"><span>◷ {featuredRecipe?.time ?? 'Idées personnalisées'}</span><span>·</span><span>{featuredRecipe ? `${featuredRecipe.missingIngredients.length} ingrédient${featuredRecipe.missingIngredients.length === 1 ? '' : 's'} à ajouter` : 'Suggestions du frigo'}</span></div><button className="recipe-button" onClick={() => featuredRecipe ? setSelectedRecipeId(featuredRecipe.id) : setTab('Recettes')}>Voir la recette <span>→</span></button></div><div className="recipe-image">{featuredRecipe?.image ?? '🥗'}<i>✳</i></div></section></>}
      {tab === 'Mon frigo' && <section className="section"><div className="section-head"><div><p className="eyebrow">VOTRE INVENTAIRE</p><h2>Mon frigo <span className="count">{foods.length}</span></h2></div><button className="add-button fridge-add-button" onClick={() => { setEditing(null); setModal(true); }}><span>＋</span> Ajouter un aliment</button></div><div className="tools"><input aria-label="Rechercher" placeholder="⌕  Rechercher un aliment…" value={search} onChange={e => setSearch(e.target.value)} /><select aria-label="Filtrer" value={filter} onChange={e => setFilter(e.target.value)}><option value="Tous">Tous les aliments</option><option value="fresh">Frais</option><option value="soon">Bientôt périmés</option><option value="urgent">Urgents</option></select><select aria-label="Trier" value={sort} onChange={e => setSort(e.target.value)}><option value="date">Trier par date</option><option value="nom">Trier par nom</option></select></div><div className="food-list fridge-food-list">{filtered.length ? filtered.map(f => <FoodCard key={f.id} food={f} onEdit={() => { setEditing(f); setModal(true); }} onDelete={() => deleteFood(f.id)} />) : <p className="empty">Aucun aliment ici pour le moment.</p>}</div></section>}
      {tab === 'Recettes' && <section className="section"><div className="section-head"><div><p className="eyebrow">À PARTIR DE VOS ALIMENTS</p><h2>Vos idées recettes</h2></div></div><p className="section-intro">Les recettes réalisables avec votre frigo passent en premier. Les autres indiquent précisément quoi acheter.</p><RecipeGroup title="Prêtes avec votre frigo" description="Aucun achat supplémentaire nécessaire." recipes={feasibleRecipes} onSelect={setSelectedRecipeId} emptyMessage="Pas encore de recette réalisable. Ajoutez des ingrédients pour découvrir des idées." /><RecipeGroup title="À compléter" description="Ces recettes demandent quelques ingrédients en plus." recipes={recipesToComplete} onSelect={setSelectedRecipeId} emptyMessage="Toutes les recettes sont prêtes avec votre frigo !" /></section>}
      {tab === 'Courses' && <section className="section"><div className="section-head"><div><p className="eyebrow">VOTRE PROCHAINE SORTIE</p><h2>Liste de courses</h2></div><span className="count">{groceries.filter(g => !g.done).length} à acheter</span></div><form className="grocery-form" onSubmit={e => { e.preventDefault(); const form = e.currentTarget; const input = new FormData(form).get('grocery')?.toString().trim(); if (input) { setGroceries(prev => [...prev, { id: crypto.randomUUID(), name: input, done: false }]); form.reset(); } }}><input name="grocery" placeholder="Ajouter à la liste…" required /><button>Ajouter</button></form><div className="grocery-list">{groceries.map(g => <div className={`grocery-row ${g.done ? 'is-done' : ''}`} key={g.id}><label><input type="checkbox" checked={g.done} onChange={() => toggleGrocery(g.id)} /><span>{g.name}</span></label><button aria-label={`Supprimer ${g.name}`} onClick={() => setGroceries(prev => prev.filter(x => x.id !== g.id))}>×</button></div>)}{!groceries.length && <p className="empty">Votre liste est vide. Ajoutez ce qu’il vous manque !</p>}</div></section>}
    </div>
    {toast && <div className="toast" role="status">✓　{toast}</div>}
    {selectedRecipeId && selectedRecipe && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedRecipeId(null); }}><section className="modal recipe-detail" role="dialog" aria-modal="true" aria-labelledby="recipe-detail-title"><button className="modal-close" onClick={() => setSelectedRecipeId(null)} aria-label="Fermer">×</button><div className="recipe-detail-hero">{selectedRecipe.image}</div><p className="eyebrow">◷ {selectedRecipe.time}　·　{selectedRecipe.difficulty}</p><h2 id="recipe-detail-title">{selectedRecipe.title}</h2><p className="recipe-detail-summary">{selectedRecipe.availableIngredients.length} ingrédient{selectedRecipe.availableIngredients.length === 1 ? '' : 's'} disponible{selectedRecipe.availableIngredients.length === 1 ? '' : 's'} sur {selectedRecipe.ingredients.length}</p><h3>Ingrédients</h3><ul className="ingredient-list">{selectedRecipe.ingredients.map(ingredient => <li key={ingredient}><span>{ingredient}</span>{selectedRecipe.availableIngredients.includes(ingredient) ? <span className="ingredient-have">Dans votre frigo</span> : <span className="ingredient-missing">À acheter</span>}</li>)}</ul><h3>Préparation</h3><ol className="recipe-steps">{selectedRecipe.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></section></div>}
    {modal && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModal(false); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><button className="modal-close" onClick={() => setModal(false)} aria-label="Fermer">×</button><p className="eyebrow">VOTRE INVENTAIRE</p><h2 id="form-title">{editing ? 'Modifier un aliment' : 'Ajouter au frigo'}</h2><form onSubmit={addFood}><label>Nom de l’aliment<input name="name" placeholder="Ex. Yaourt nature" defaultValue={editing?.name} required maxLength={60} /></label><div className="form-row"><label>Catégorie<select name="category" defaultValue={editing?.category || 'Fruits & légumes'}><option>Fruits & légumes</option><option>Produits laitiers</option><option>Viandes & poissons</option><option>Épicerie</option><option>Autre</option></select></label><label>Quantité<input name="quantity" placeholder="Ex. 2 pièces" defaultValue={editing?.quantity} required /></label></div><label>Date de péremption<input type="date" name="expiry" min={today.toISOString().slice(0,10)} defaultValue={editing?.expiry} required /></label><p className="photo-hint">La photo est choisie automatiquement selon le nom et la catégorie.</p><button className="add-button submit-button" type="submit">{editing ? 'Enregistrer les modifications' : 'Ajouter au frigo'}</button></form></section></div>}
    </main>
  </>;
}
function StatCard({ icon, tone, count, label, foods }: { icon: string; tone: 'green' | 'amber' | 'coral'; count: number; label: string; foods: Food[] }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  return <div ref={cardRef} className={`stat-card-wrap${open ? ' is-open' : ''}`} onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }} onPointerLeave={event => { if (event.pointerType === 'mouse') setOpen(false); }}>
    <button type="button" className="stat-card" aria-expanded={open} aria-label={`${label} : ${count} aliments. Afficher la liste`} onPointerUp={event => { if (event.pointerType === 'touch') setOpen(value => !value); }} onClick={event => { if (event.detail === 0) setOpen(value => !value); }}><span className={`stat-icon ${tone}`}>{icon}</span><span className="stat-card-copy"><strong>{count}</strong><span>{label}</span></span></button>
    <div className="stat-popover" aria-hidden={!open}><div className="stat-popover-panel"><strong>{label}</strong>{foods.length ? <ul>{[...foods].sort((a, b) => a.expiry.localeCompare(b.expiry)).map(food => <li key={food.id}><span>{food.name}{food.quantity && <small>{food.quantity}</small>}</span><time dateTime={food.expiry}>{niceDate(food.expiry)}</time></li>)}</ul> : <p>Aucun aliment dans cette catégorie</p>}</div></div>
  </div>;
}
function RecipeGroup({ title, description, recipes, onSelect, emptyMessage }: { title: string; description: string; recipes: MatchedRecipe[]; onSelect: (id: string) => void; emptyMessage: string }) {
  return <section className="recipe-group"><div className="recipe-group-heading"><div><h3>{title}</h3><p>{description}</p></div><span className="count">{recipes.length}</span></div>{recipes.length ? <div className="recipe-grid">{recipes.map(recipe => <button className="recipe-card recipe-card-button" key={recipe.id} onClick={() => onSelect(recipe.id)}><div className="recipe-card-image">{recipe.image}</div><div className="recipe-card-body"><span className="eyebrow">◷ {recipe.time}　·　{recipe.difficulty}</span><h3>{recipe.title}</h3><p><strong>{recipe.availableIngredients.length}/{recipe.ingredients.length}</strong> ingrédients disponibles</p>{recipe.missingIngredients.length > 0 && <p className="recipe-missing-list">À acheter : {recipe.missingIngredients.join(', ')}</p>}<span className={`recipe-match ${recipe.missingIngredients.length === 0 ? 'complete' : ''}`}>{recipe.missingIngredients.length === 0 ? '✓ Tout est disponible' : `${recipe.missingIngredients.length} à acheter`}</span></div></button>)}</div> : <p className="empty">{emptyMessage}</p>}</section>;
}
function FoodCard({ food, onEdit, onDelete }: { food: Food; onEdit: () => void; onDelete: () => void }) {
  const s = status(food);
  return <article className="food-card">
    <button type="button" className="food-card-edit" onClick={onEdit} aria-label={`Modifier ${food.name}`}>
      <span className={`food-emoji ${s}`}><Image src={foodPhoto(food.name, food.category)} alt="" width={96} height={96} /></span>
      <span className="food-info"><strong>{food.name}</strong><span>{food.quantity} <span>·</span> {food.category}</span></span>
      <span className="food-expiry"><span className={`badge ${s}`}>{s === 'urgent' ? 'À manger vite' : s === 'soon' ? 'Bientôt' : 'Tout frais'}</span><small>Le {niceDate(food.expiry)}</small></span>
    </button>
    <button type="button" className="food-delete" onClick={onDelete} aria-label={`Supprimer ${food.name}`}>×</button>
  </article>;
}
