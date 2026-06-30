# Saruru — Plan d'affaires révisé & Registre stratégique des risques

> **Statut :** Nom choisi — Saruru (사르르). Recherche de marque (KIPO/EUIPO/USPTO) encore à faire. Avant validation.
> **Date :** 26 juin 2026
> **Objet de ce document :** Deux choses en un seul fichier. La **Partie 1** est une évaluation honnête, dans l'esprit d'un consultant, et un registre des risques — les vérités difficiles à conserver même si le projet est mis en pause ou abandonné. La **Partie 2** est le plan d'affaires révisé qui intègre ces correctifs. Lisez d'abord la Partie 1 ; c'est la partie la plus utile à garder.

---

## Comment lire ce document

- **Partie 1 — Registre stratégique des risques.** Pourquoi c'est difficile, ce qui peut tuer le projet, et les hypothèses dont dépend secrètement toute l'entreprise. C'est la section à relire plus tard.
- **Partie 2 — Plan d'affaires révisé.** Le plan réécrit pour être plus honnête et plus ciblé : un seul segment, des chiffres construits de bas en haut, le coût de l'IA intégré, le B2B reporté, la validation avant la construction.
- **À propos des chiffres :** Tout chiffre marqué *(hypothèse)* est un repère de planification, **pas** une prévision et **non sourcé**. Les chiffres marqués *(sourcé)* renvoient à une source nommée. Ne vous fiez à aucun chiffre *(hypothèse)* tant qu'il n'est pas remplacé par vos propres données mesurées.

---

# PARTIE 1 — ÉVALUATION STRATÉGIQUE HONNÊTE (REGISTRE DES RISQUES)

## 1.1 L'essentiel

Le **concept est émotionnellement juste et l'intuition du fondateur est réelle.** Mais l'*entreprise* repose sur **deux hypothèses non prouvées** que le plan original traite comme des faits :

1. Que le « rituel de combustion » (burn ritual) procure réellement un soulagement et fait revenir les gens (efficacité + rétention).
2. Que ce public précis — les travailleurs de première ligne en contact avec la clientèle — **paiera** pour cela.

Si l'une des deux est fausse, presque rien d'autre dans le plan ne tient. Tout ce qui suit vise à tester ces deux choses à faible coût, **avant** de dépenser de l'argent à construire.

## 1.2 Ce qui est réellement fort (à conserver)

- **L'histoire du fondateur (le coupon déchiré) est authentique et mémorable.** C'est le meilleur atout. Elle explique le problème en 20 secondes et inspire confiance.
- **Discipline de positionnement.** « Brûler le résidu, pas la personne. » Pas de vengeance, pas de liste noire de clients, pas d'humiliation publique. Cette retenue est rare et juste.
- **Réflexe « confidentialité d'abord ».** Stockage local en priorité, suppression après combustion, aucun pistage publicitaire. Dans une catégorie régulièrement critiquée pour ses abus en matière de données, cela peut être un vrai facteur de différenciation *si on le met fortement en avant.*
- **Honnêteté sur les allégations médicales.** Refuser de prétendre « soigner le burnout » évite le rejet par l'App Store et l'exposition juridique.
- **Honnêteté intellectuelle.** Le plan original qualifie lui-même ses projections d'hypothèses. Cette habitude est à garder.

## 1.3 Les trois risques fatals

### Risque A — « L'habitude quotidienne » est probablement le mauvais modèle

Les incidents émotionnels avec les clients sont **épisodiques et imprévisibles**, pas quotidiens. Or tout le plan — séries (streaks), abonnements, calculs de rétention, modèle financier — suppose une habitude **quotidienne**. Un déclencheur sporadique ne peut pas alimenter de façon fiable un produit d'habitude quotidienne. Si c'est vrai, la rétention de la première semaine s'effondre et la thèse de l'abonnement s'affaiblit.

**Pourquoi c'est important :** Les applications par abonnement vivent ou meurent sur la rétention. Si les gens n'en ont besoin qu'après un mauvais service (disons quelques fois par mois), ils ne maintiendront pas un abonnement mensuel et risquent de partir avant même de convertir.

**Quoi faire :** Tester directement la fréquence (voir Partie 2, Plan de validation). Si l'usage est épisodique, le *modèle* devra peut-être changer — par ex. un avantage payé par l'employeur, un achat unique/à vie, ou un forfait — plutôt qu'un abonnement mensuel personnel.

### Risque B — Vous ciblez les personnes **les moins capables et les moins susceptibles de payer**

C'est la ligne la plus importante de ce document.

Le personnel de restaurant, les employés de café et de bar, les vendeurs au détail et les agents de centre d'appels figurent parmi les segments **aux revenus les plus faibles et à la dépense discrétionnaire la plus faible** de la population active. Ce sont précisément les personnes pour qui un abonnement de bien-être à 4,99 €/mois est le plus difficile à justifier — non pas parce qu'elles n'ont pas le problème (elles l'ont le plus), mais parce que :

- La dépense mensuelle discrétionnaire est serrée ; une application de bien-être concurrence l'essentiel.
- Le fort turnover dans ces métiers réduit la volonté d'investir dans quoi que ce soit lié à un emploi qu'on peut quitter.
- Les applications grand public de bien-être convertissent déjà mal : le passage du gratuit au payant se situe **généralement dans les bas pourcentages à un chiffre (≈1–4 %, fourchette typique du secteur à vérifier, pas une garantie).** Ce segment se situe probablement au **bas** de cette fourchette.

**Le paradoxe structurel :** *les personnes qui ressentent la douleur le plus intensément sont celles dont le portefeuille est le plus mince.* L'hypothèse de conversion de 4–7 % du plan original va à l'encontre de cela. Considérez 4–7 % comme optimiste ; planifiez autour de **2–3 % (hypothèse)** pour le B2C et testez en condition de stress encore plus bas.

**Implication stratégique :** C'est l'argument le plus fort pour dire que **l'acheteur n'est peut-être pas l'utilisateur.** La personne qui devrait *payer* pourrait être l'**employeur** (un patron de café qui achète du calme pour son personnel), tandis que le **travailleur l'utilise en privé.** Cela recadre l'entreprise — mais le B2B a ses propres contradictions (Risque D). Il n'y a pas de réponse facile ici ; c'est le problème commercial central à résoudre avant de construire.

### Risque C — L'économie unitaire (surtout le coût de l'IA) est absente du modèle

Chaque incident traité peut déclencher **plusieurs appels au LLM** (résumer, classifier l'émotion, séparer la responsabilité, recadrer, générer des scripts, détecter les situations à risque). Avec une offre gratuite importante, le **coût des biens vendus (COGS) lié à l'IA peut dépasser le chiffre d'affaires.** Le modèle financier original n'a **aucune ligne de COGS et suppose un CAC ≈ 0** (« TikTok organique »), ce qui ne tient presque jamais — même le contenu organique a un coût de production réel et un rendement incertain.

**Quoi faire :** Modéliser explicitement le **coût IA par utilisateur gratuit par mois**. Rendre l'**offre gratuite sans IA** (rituel de combustion en local, sans appel au modèle = coût marginal quasi nul). Réserver les modèles coûteux aux utilisateurs *payants* et à l'analyse *complète* uniquement ; utiliser des modèles bon marché pour la classification. Si la marge sur coûts variables par utilisateur payant n'est pas confortablement positive après IA + frais de boutique (Apple/Google prélèvent ~15–30 %), le prix ou le modèle est mauvais.

## 1.4 Autres problèmes structurels

### Risque D — La thèse B2B contredit la valeur centrale

La promesse du produit est une **confidentialité que l'employeur ne peut pas voir.** Mais les acheteurs B2B veulent des **données et un ROI.** Ces deux forces tirent en sens opposés. Pire, des « informations agrégées et anonymes » pour un **café de 10 personnes ne peuvent pas réellement être anonymes** — avec si peu de personnes, les individus sont statistiquement ré-identifiables, donc la donnée est à la fois risquée pour la vie privée et inutile pour l'acheteur. Le B2B dans la petite hôtellerie-restauration a aussi une économie commerciale punitive : faible valeur de contrat, fort taux d'attrition, acheteurs difficiles à atteindre. **Recommandation : retirer le B2B de l'Année 1.** Le garder comme option ultérieure, après que le B2C ait prouvé sa rétention.

### Risque E — L'efficacité n'est pas prouvée, et la conception peut *augmenter* la rumination

La prémisse thérapeutique est une **hypothèse, pas un fait.** Réécrire l'incident et générer des scripts de répartie (« ce que j'aurais dû dire ») peut renforcer la **rumination** au lieu de la libérer — des recherches en psychologie suggèrent que se défouler et répéter ses griefs peut *renforcer* la colère plutôt que la décharger (littérature sur le mythe de la catharsis, p. ex. les travaux de Brad Bushman et ses collègues). Cela entre en collision avec la philosophie de marque (« brûler = lâcher prise ») : un générateur de répliques peut discrètement devenir une **machine à ressasser les griefs.** L'efficacité et le sens de l'effet doivent être **mesurés en bêta**, pas supposés. Si les utilisateurs se sentent *plus mal* ou plus obsédés, la boucle centrale doit être repensée (vers la clôture et le recadrage, et non la répétition).

### Risque F — La barrière à l'entrée est fine et facile à copier

Focalisation sur un segment + prompts LLM + animation de combustion : tout cela peut être cloné en un week-end, y compris par un concurrent « wrapper LLM » ou un acteur établi. Le rituel de combustion est une **fioriture d'interface, pas un actif défendable.** Un avantage durable, s'il existe, doit venir de l'un de ces éléments : (a) une marque de confiance au sein d'une communauté précise, (b) une qualité de recadrage réellement supérieure, construite à partir d'un apprentissage accumulé (respectueux de la vie privée), ou (c) un verrouillage de la distribution. Nommez explicitement la barrière visée ; « nous étions les premiers » n'en est pas une.

### Risque G — Le TAM est un chiffre de vanité

Le marché mondial des applications de santé mentale à 7,48 Md$ *(sourcé : Grand View Research, 2024)* n'est **pas** votre marché adressable. Votre vrai marché est « les travailleurs de service prêts à payer pour une décompression émotionnelle épisodique » — bien plus petit. Remplacez le TAM descendant par un **SOM ascendant** (Partie 2). Les investisseurs comme votre propre planification méritent le chiffre honnête et plus petit.

### Risque H — La surface de sécurité et juridique est vaste pour un fondateur seul

Utilisateurs émotionnellement vulnérables + réponses générées par IA + données de **catégorie spéciale** RGPD (santé mentale) + contenu de crise selon les juridictions = une lourde charge de conformité et de responsabilité. La détection de crise basée sur un LLM est **peu fiable**, et un faux négatif (manquer une vraie crise) est catastrophique — sur le plan réputationnel et juridique. Ce n'est pas une case à cocher ; cela peut conditionner la possibilité même de lancer. Prévoyez un budget pour une revue juridique et concevez le parcours de crise de manière conservatrice dès le premier jour.

### Risque N — Nom (résolu → Saruru)

« Saruru » apparaît déjà sur Google Play pour une application liée au burnout, ce qui crée un risque de marque et de propriété intellectuelle. **À régler avant toute dépense de marque.** Cherchez sur EUIPO, la base mondiale des marques de l'OMPI (WIPO), l'USPTO, les boutiques d'applications, les noms de domaine et les pseudos sociaux. Considérez le nom actuel comme provisoire.

## 1.5 Registre des risques (synthèse)

| # | Risque | Gravité | Probabilité | Atténuation |
|---|--------|---------|-------------|-------------|
| A | Le modèle « habitude quotidienne » est peut-être faux ; usage épisodique | Élevée | Élevée | Mesurer la fréquence réelle d'usage avant de bâtir la logique d'abonnement |
| B | Segment cible le moins capable/susceptible de payer | Élevée | Élevée | Prévoir 2–3 % de conversion ; tester acheteur = employeur vs utilisateur ; valider la disposition à payer par un test « fausse porte » |
| C | Le COGS IA peut dépasser le CA ; CAC ≈ 0 est faux | Élevée | Moyenne | Offre gratuite sans IA ; modèles bon marché pour la classification ; modéliser le coût par utilisateur |
| D | Le B2B contredit la promesse de confidentialité ; mauvaise économie PME | Élevée | Moyenne | Retirer le B2B de l'Année 1 ; n'y revenir qu'après preuve de rétention B2C |
| E | Efficacité non prouvée ; peut accroître la rumination | Élevée | Moyenne | Mesurer humeur + intention de revenir en bêta ; repenser vers la clôture si négatif |
| F | Barrière fine et copiable | Moyenne | Élevée | Choisir et construire une vraie barrière (confiance communautaire / qualité de recadrage) |
| G | TAM de vanité ; marché réel bien plus petit | Moyenne | Élevée | Remplacer par un SOM ascendant |
| H | Lourde surface sécurité/juridique/RGPD pour un fondateur seul | Élevée | Moyenne | Parcours de crise conservateur ; revue juridique ; minimisation des données |
| N | Ancien nom « Saruru » en conflit — résolu (désormais Saruru) | Élevée | Élevée | Recherche complète marque/pseudos avant dépense de marque |

## 1.6 Critères d'abandon — quand renoncer

Décidez-les **maintenant**, par écrit, pour que l'émotion ne l'emporte pas sur les preuves plus tard. Abandonnez ou pivotez si, après les 4 semaines de validation (Partie 2) :

- **Rétention/fréquence :** Moins de ~30 % des testeurs disent qu'ils l'utiliseraient à nouveau la *prochaine* fois qu'un incident survient, **et** la fréquence observée/déclarée est inférieure à ~une fois par semaine. *(seuils hypothétiques — fixez les vôtres, mais fixez-les.)*
- **Disposition à payer :** Le taux de clic sur la « fausse porte » de paiement est dans les bas pourcentages à un chiffre, **sans** qu'aucun segment ne montre une réelle intention de sortir la carte.
- **Efficacité/direction :** Une part significative des testeurs déclarent ne se sentir **pas mieux, voire moins bien** après le rituel.
- **Économie unitaire :** Vous ne trouvez aucune configuration où la marge sur coûts variables par utilisateur payant est positive après IA + frais de boutique.

Si deux de ces critères ou plus échouent, le geste honnête est de **pivoter le modèle** (acheteur, fréquence ou format) ou de **s'arrêter** — et ce document est la trace du pourquoi.

---

# PARTIE 2 — PLAN D'AFFAIRES RÉVISÉ

## 2.1 Résumé exécutif (révisé)

Saruru (사르르) est un **outil de décompression émotionnelle, confidentialité d'abord,** pour les personnes en contact avec la clientèle. Après une interaction difficile, l'utilisateur saisit brièvement ce qui s'est passé, reçoit un court recadrage guidé par l'IA qui sépare *sa* responsabilité du comportement du client, et accomplit un rituel symbolique de « combustion » pour marquer la clôture.

**Ce qui change par rapport au plan original, et pourquoi :**

- **Une seule tête de pont, pas sept segments.** Concentrer tout l'effort initial sur **un** segment dans **une** géographie pour apprendre vite.
- **Validation avant construction.** Un test sans code de 4 semaines des deux hypothèses décisives (efficacité/fréquence et disposition à payer) vient *avant* tout MVP.
- **B2B reporté.** Retiré de l'Année 1 en raison de la contradiction de confidentialité et de la mauvaise économie PME.
- **Économie honnête.** Conversion prudente (2–3 %), COGS IA explicite, offre gratuite sans IA, dimensionnement de marché ascendant.
- **Efficacité traitée comme une hypothèse à mesurer**, avec la boucle centrale orientée vers la *clôture*, pas la répétition des griefs.

## 2.2 Le problème (resserré)

Les travailleurs de première ligne absorbent colère, sentiment de tout-dû et manque de respect tout en devant rester polis. Pris isolément, ces moments paraissent mineurs ; cumulés, ils contribuent à l'épuisement émotionnel. La recherche relie l'incivilité des clients à l'épuisement émotionnel et aux intentions de départ chez les employés de service. L'OMS définit le **burnout** comme un phénomène lié au travail résultant d'un stress professionnel chronique non géré, caractérisé par l'épuisement, le cynisme et une efficacité réduite *(sourcé : cadrage CIM-11 de l'OMS)*. Saruru vise la **couche pré-burnout** : une libération préventive et légère — explicitement **pas** un traitement clinique.

Les applications de bien-être génériques demandent « Comment vous sentez-vous aujourd'hui ? » Le besoin non satisfait est plus précis : *« Cette interaction m'a blessé — comment arrêter de la porter, et que dire la prochaine fois ? »*

## 2.3 La solution & la boucle centrale

Une boucle délibérément **courte** (cible : moins de ~3 minutes) :

1. **Capturer** — texte ou voix ; étiquettes d'émotion optionnelles ; catégorie de lieu de travail.
2. **Recadrer (IA)** — résumé neutre ; interprétation *possible* (jamais « le client voulait définitivement dire X ») ; ce qui n'était **pas** votre responsabilité ; pourquoi ça a piqué ; un recadrage orienté vers la **clôture**.
3. **Rituel de combustion** — l'incident devient un objet visuel (reçu/note) qui se plie, noircit et brûle. Phrase de clôture : *« Libéré. Tu n'as pas à porter ça. »*

**Garde-fou de conception (nouveau) :** Parce que répéter les répliques peut alimenter la rumination (Risque E), les « scripts de réponse » sont **optionnels et secondaires**, présentés comme un *langage de limite pour la prochaine fois*, et non comme des munitions. La charge émotionnelle principale est la **clôture**, pas le fait de gagner la dispute.

## 2.4 Positionnement

- **Catégorie :** prévention du burnout + décompression émotionnelle + micro-récupération au travail (une niche précise, pas un « traitement de santé mentale »).
- **En une ligne :** Un outil de décompression confidentialité-d'abord pour les gens qui ont affaire à des gens.
- **Philosophie :** *Brûler le résidu, pas la personne.* Pas de vengeance, pas de base de données clients, pas d'humiliation publique.
- **Voix :** calme, protectrice, émotionnellement précise, jamais vengeresse.

## 2.5 Marché cible — avec la réalité de la disposition à payer (révisé)

**Tête de pont (en choisir une pour démarrer) :** travailleurs et patrons de **cafés / restaurants** indépendants dans **une** géographie de lancement. Justification : fidèle à l'histoire du fondateur, fréquence élevée d'incidents, facile à démontrer en vidéo courte.

**Dit honnêtement (voir Risque B) :** ce segment a un **besoin élevé mais une capacité/volonté de payer faible.** Deux implications intégrées à ce plan :

- Le prix et la conversion B2C sont modélisés de façon **prudente**.
- Le plan **teste activement si l'acheteur doit être l'employeur** (avantage pour le personnel payé par le patron) plutôt que le travailleur individuel — sans jamais exposer les saisies individuelles à cet employeur.

**Expansion (seulement après preuve de rétention) :** autres métiers de première ligne (commerce, centre d'appels, hôtellerie, accueil de santé), puis géographies adjacentes.

## 2.6 Dimensionnement du marché — SOM ascendant (remplace le TAM de vanité)

Ne vous ancrez **pas** sur le TAM de 7,48 Md$ des applications de santé mentale *(sourcé : Grand View Research)*. Construisez le chiffre de bas en haut :

> **SOM (modèle, à remplir avec des données réelles) :**
> (Nombre de travailleurs du segment cible dans la géographie de lancement)
> × (part réellement atteignable via vos canaux)
> × (conversion gratuit→payant prudente, **2–3 % hypothèse**)
> × (prix annuel, **39,99 € hypothèse**)
> = revenu réalisable et atteignable.

Tant que chaque entrée n'est pas votre propre chiffre mesuré, considérez le résultat comme purement illustratif.

## 2.7 Différenciation & barrière visée

Différenciation à court terme : **spécificité du segment + conception confidentialité-d'abord + rituel orienté clôture.** Reconnaissez ouvertement que ces éléments sont **copiables** (Risque F). La barrière durable visée — à construire délibérément — est une **marque de confiance au sein d'une communauté précise de première ligne** plus une **qualité de recadrage** qui s'améliore grâce à un usage respectueux de la vie privée. Énoncez-le comme un objectif, pas comme un acquis.

## 2.8 Feuille de route produit (focalisée)

**MVP (seulement après réussite de la validation) :** capture d'incident (texte + voix), étiquettes d'émotion, recadrage IA avec le garde-fou de clôture, rituel de combustion, suppression après combustion, paywall simple. **Optionnel/secondaire :** scripts de langage de limite.

**Reporter (V1+) :** détection de motifs récurrents, bilans burnout, expansion multilingue, visuels personnalisés, rituels avant/après service.

**Reporter indéfiniment / revoir uniquement après PMF :** toutes les fonctionnalités **B2B** (tableaux de bord employeur, indice de climat d'équipe). Voir Risque D.

## 2.9 Modèle économique (révisé)

**Freemium B2C :**
- **Offre gratuite = sans IA** (rituel de combustion en local, étiquettes de base). Coût marginal quasi nul ; protège l'économie unitaire.
- **Premium *(prix hypothèse : 4,99 €/mois ou 39,99 €/an)* :** recadrage IA, saisie vocale, scripts optionnels, archive privée, analyses.

**Hypothèse de conversion : 2–3 %** (et non 4–7 %), reflétant le Risque B. Testez plus bas en condition de stress.

**Contrôle du coût IA (nouveau, déterminant) :** modèles bon marché pour la classification ; modèles premium uniquement pour l'analyse complète des utilisateurs payants ; prompts courts ; résumer avant analyse approfondie ; plafonds stricts sur l'usage IA gratuit (idéalement zéro IA en gratuit).

**B2B :** **retiré de l'Année 1.** Possible plus tard comme **avantage personnel payé par le patron** avec des données strictement agrégées et une taille d'équipe minimale assez grande pour rendre l'anonymisation réelle (p. ex. 25+), jamais de visibilité individuelle.

## 2.10 Modèle financier (prudent, avec COGS) — *tous les chiffres sont des hypothèses*

**Ceci remplace les projections originales.** À considérer comme une *structure à remplir*, pas une prévision. Principe clé : **montrer la marge sur coûts variables, pas seulement le chiffre d'affaires.**

| Ligne | Année 1 (illustratif) | Notes |
|-------|----------------------|-------|
| Utilisateurs gratuits | (à fixer d'après l'entonnoir réel) | Tirés par le contenu ; ne **pas** supposer CAC = 0 |
| Conversion gratuit→payant | **2–3 % (hypothèse)** | Borne basse pour ce segment |
| ARPU (payants) | 4,99 €/mois *(hypothèse)* | Avant frais de boutique |
| **Moins :** frais de boutique | ~15–30 % | Apple/Google |
| **Moins :** COGS IA / utilisateur payant | (à modéliser) | Offre gratuite ≈ 0 € si sans IA |
| **Moins :** contenu/CAC | (réel, pas 0) | Même « l'organique » a un coût |
| **= Marge sur coûts variables/utilisateur** | doit être **> 0** | Sinon, corriger le prix ou le modèle |

**Sensibilité :** modéliser le résultat à conversion = 1 %, 2 %, 3 % et à deux niveaux de coût IA. La variable la plus importante à stresser est la **rétention de la première semaine** — y consacrer un tableau de sensibilité.

Les chiffres originaux de revenu annualisé Années 1–3 (≈24 K€ → ≈254 K€ → ≈1,36 M€) sont **retirés** des affirmations principales ; ils dépendent d'une conversion non validée et ignorent COGS/CAC. Ne les reconstruisez qu'après avoir mesuré l'entonnoir.

## 2.11 Stratégie de mise sur le marché (focalisée)

- **Un segment, une géographie, une boucle centrale.** Résister à l'éparpillement multilingue/multi-segment tant que la rétention n'est pas prouvée.
- **Canaux :** vidéo courte (l'histoire du fondateur est l'accroche), communautés pertinentes de travailleurs/patrons. Suivre le **coût par utilisateur acquis**, temps de production de contenu inclus — pas « gratuit ».
- **Message :** « Brûle avant le burnout. » Commencer par l'histoire du coupon déchiré.

## 2.12 Feuille de route « validation d'abord » (les vraies 4 prochaines semaines)

**Avant d'écrire du code produit**, tuer ou confirmer les Risques A, B, C, E :

1. **Vérification nom/juridique (semaine 1) :** EUIPO / OMPI / USPTO / boutiques d'apps / domaines / pseudos.
2. **Test efficacité + fréquence (semaines 1–3) :** prototype « magicien d'Oz » / papier ou chat. Délivrer manuellement le recadrage à **20–30** vrais travailleurs de première ligne à partir de leurs incidents réels. Demander immédiatement : *Vous sentez-vous plus léger ? L'utiliseriez-vous la prochaine fois qu'un incident survient ?* Noter **à quelle fréquence** ces incidents leur arrivent (teste le Risque A).
3. **Test de disposition à payer (semaines 2–4) :** page d'atterrissage avec une **fausse porte** prix + bouton de paiement ; mesurer le taux de clic réel, par segment, et si les **patrons** paieraient pour le personnel (teste le Risque B et la question de l'acheteur).
4. **Note d'économie unitaire d'une page (semaine 3) :** coût IA par utilisateur ; prouver qu'une offre gratuite sans IA est viable et que la marge d'un utilisateur payant est positive.
5. **Décision (semaine 4) :** Appliquer les **critères d'abandon** du §1.6. Construire le MVP seulement s'ils passent ; sinon pivoter le modèle ou arrêter.

**Ensuite :** MVP (8–12 sem.) → bêta fermée avec cafés/restaurants, en mesurant la direction de l'humeur et la rétention de la première semaine (teste le Risque E) → lancement public.

## 2.13 Indicateurs qui comptent

- **Avancés :** activation de la première combustion, **rétention de la première semaine**, fréquence d'incidents par utilisateur actif, taux d'achèvement du rituel.
- **Commerciaux :** conversion gratuit→payant (cible 2–3 %), marge sur coûts variables par utilisateur payant, attrition.
- **Résultat (auto-déclaré, non clinique) :** « Je me sens plus léger après usage », « Je l'ai moins porté », « Je me suis senti plus préparé ». Ne **jamais** revendiquer d'amélioration médicale sans validation clinique.

## 2.14 Éthique, sécurité & confidentialité (non négociable)

- **Confidentialité :** pas de noms de clients, pas de noms de lieux de travail par défaut, pas de photo/vidéo dans le MVP, local d'abord quand c'est possible, suppression après combustion, pas de vente de données, pas de pistage publicitaire, consentement explicite avant tout traitement IA. Le mettre fortement en avant — c'est un facteur de différenciation.
- **Sécurité :** parcours de crise conservateur. Si une saisie suggère automutilation, menaces ou crise, **ne pas** dérouler le rituel comme si tout était normal — proposer des ressources de soutien adaptées et conscientes de la juridiction. Supposer que la détection de crise par LLM est imparfaite ; concevoir pour les faux négatifs (Risque H).
- **Allégations :** Saruru n'est **pas** un dispositif médical, une thérapie, un service de crise ni un outil de diagnostic. Ne jamais prétendre « guérir » ou « traiter » le burnout ou la dépression.
- **Pas** de cadrage vengeur, **pas** d'identification des clients, **pas** de surveillance par l'employeur.

## 2.15 Questions ouvertes à résoudre avant de s'engager

1. L'usage est-il **épisodique ou quotidien** ? (Détermine si l'abonnement est même le bon modèle.)
2. L'acheteur est-il le **travailleur ou l'employeur** ? (Détermine toute la structure commerciale.)
3. Le rituel produit-il une **clôture ou de la rumination** ? (Détermine si le produit aide tout court.)
4. Une **offre gratuite sans IA** + une offre IA payante peuvent-elles être à marge positive ? (Détermine la viabilité.)
5. Quel est le **vrai nom disponible** et la marque ?

Ce document existe pour que — que Saruru soit lancé, pivote ou soit mis de côté — le raisonnement soit conservé et réutilisable pour la prochaine idée.
