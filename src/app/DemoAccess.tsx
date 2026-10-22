'use client';

import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

const demoSessionKey = 'frigomalin-demo-access';

type Screen = 'login' | 'signup' | 'forgot';

export default function DemoAccess({ children }: { children: (logout: () => void) => ReactNode }) {
  const [access, setAccess] = useState<'loading' | 'guest' | 'entered'>('loading');
  const [screen, setScreen] = useState<Screen>('login');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAccess(sessionStorage.getItem(demoSessionKey) === 'entered' ? 'entered' : 'guest');
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const enter = () => {
    sessionStorage.setItem(demoSessionKey, 'entered');
    setError('');
    setAccess('entered');
    window.scrollTo(0, 0);
  };
  const logout = () => {
    sessionStorage.removeItem(demoSessionKey);
    setScreen('login');
    setError('');
    setAccess('guest');
    window.scrollTo(0, 0);
  };
  const changeScreen = (next: Screen) => {
    setScreen(next);
    setError('');
    setShowPassword(false);
    setShowConfirmation(false);
  };
  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (!String(values.get('email') ?? '').trim() || !String(values.get('password') ?? '').trim()) {
      setError('Renseignez votre adresse e-mail et votre mot de passe.');
      return;
    }
    enter();
  };
  const signup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const required = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmation', 'familySize'];
    if (required.some(field => !String(values.get(field) ?? '').trim())) {
      setError('Remplissez tous les champs obligatoires.');
      return;
    }
    if (Number(values.get('familySize')) < 1) {
      setError('Indiquez au moins une personne dans le foyer.');
      return;
    }
    if (values.get('password') !== values.get('confirmation')) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    // Démonstration uniquement : aucune donnée d'inscription ni aucun mot de passe n'est conservé.
    enter();
  };

  if (access === 'loading') return null;
  if (access === 'entered') return <>{children(logout)}</>;

  return <main className="auth-page">
    <header className="auth-header">
      <div className="brand"><span className="brand-mark">f</span> Frigo <span>Malin</span></div>
      <button type="button" className="auth-header-link" onClick={() => changeScreen(screen === 'signup' ? 'login' : 'signup')}>
        {screen === 'signup' ? 'Se connecter' : 'Créer un compte'}
      </button>
    </header>
    <div className="auth-center"><section className={`auth-card ${screen === 'signup' ? 'auth-card-wide' : ''}`} aria-labelledby="auth-title">
      <p className="eyebrow">FRIGO MALIN · ACCÈS DÉMO</p>
      <h1 id="auth-title">{screen === 'login' ? 'Heureux de vous revoir !' : screen === 'signup' ? 'Bienvenue chez Frigo Malin' : 'Mot de passe oublié ?'}</h1>
      <p className="auth-intro">{screen === 'login' ? 'Retrouvez votre frigo et vos idées recettes.' : screen === 'signup' ? 'Créez votre profil de démonstration en quelques étapes.' : 'En mode démonstration, aucun compte ni mot de passe n’est enregistré. Il n’y a donc rien à réinitialiser : vous pouvez saisir un nouveau mot de passe non vide pour vous connecter.'}</p>
      {screen === 'login' ? <form noValidate onSubmit={login}>
        <label>Adresse e-mail<input name="email" type="text" inputMode="email" autoComplete="username" placeholder="vous@exemple.fr" /></label>
        <label>Mot de passe<span className="auth-password"><input name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Votre mot de passe" /><button type="button" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Masquer' : 'Afficher'}</button></span></label>
        <button type="button" className="auth-forgot" onClick={() => changeScreen('forgot')}>Mot de passe oublié ?</button>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" type="submit">Se connecter</button>
      </form> : screen === 'signup' ? <form noValidate onSubmit={signup}>
        <p className="auth-group-title">Informations personnelles</p>
        <div className="auth-grid"><label>Prénom *<input name="firstName" autoComplete="given-name" /></label><label>Nom *<input name="lastName" autoComplete="family-name" /></label></div>
        <div className="auth-grid"><label>Adresse e-mail *<input name="email" type="text" inputMode="email" autoComplete="email" /></label><label>Numéro de téléphone *<input name="phone" type="tel" autoComplete="tel" /></label></div>
        <div className="auth-grid"><label>Mot de passe *<span className="auth-password"><input name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" /><button type="button" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Masquer' : 'Afficher'}</button></span></label><label>Confirmer le mot de passe *<span className="auth-password"><input name="confirmation" type={showConfirmation ? 'text' : 'password'} autoComplete="new-password" /><button type="button" aria-label={showConfirmation ? 'Masquer la confirmation' : 'Afficher la confirmation'} aria-pressed={showConfirmation} onClick={() => setShowConfirmation(!showConfirmation)}>{showConfirmation ? 'Masquer' : 'Afficher'}</button></span></label></div>
        <p className="auth-group-title">Votre foyer</p>
        <div className="auth-grid"><label>Nombre de personnes *<input name="familySize" type="number" min="1" step="1" defaultValue="1" /></label><label>Type de logement<select name="homeType" defaultValue=""><option value="">Choisir (facultatif)</option><option>Appartement</option><option>Maison</option><option>Autre</option></select></label></div>
        <label>Préférences alimentaires<select name="diet" defaultValue="none"><option value="none">Sans préférence</option><option>Végétarien</option><option>Végétalien</option><option>Autres restrictions</option></select></label>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" type="submit">Créer mon compte</button>
      </form> : null}
      <p className="auth-switch"><button type="button" onClick={() => changeScreen(screen === 'login' ? 'signup' : 'login')}>{screen === 'login' ? 'Créer un compte' : screen === 'signup' ? "J’ai déjà un compte — Se connecter" : 'Retour à la connexion'}</button></p>
      <p className="auth-disclaimer">Mode démonstration : aucun compte sécurisé n’est créé et aucun mot de passe n’est enregistré.</p>
    </section></div>
  </main>;
}
