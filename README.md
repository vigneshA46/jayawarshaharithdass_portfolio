# Jeyawarsharith Dass: Executive Portfolio

Cinematic scroll portfolio: huge gold type, a silhouette stand-in for his portrait (swap in a transparent cut-out via `person.photoSrc`), a 3D venture carousel and a light-dust backdrop. React + Tailwind CSS v4 + Three.js (`@react-three/fiber`), smooth scroll with Lenis.
All copy comes from the client's "Final Executive Portfolio" PDF.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Deploy (Cloudflare Pages, via GitHub)
- Framework preset: None. Build command: `npm run build`. Output directory: `dist`.
- Node 20 or newer.

## Still to supply (placeholders are in place)
Edit `src/content.ts`:
- `person.photoSrc`: portrait (shown in the About section)
- `ventures.karts.logoSrc` and `ventures.sovereign.logoSrc`: venture logos
- `person.website`, `person.email`: both "To be added" in the PDF

## Structure
- `src/ui/`: one file per scene (Cover, Statement, About, Quote, Empire, Philosophy, Vision, Focus, Mission, Contact)
- `src/scene/Backdrop.tsx`: the 3D gold dust and light shafts
- `src/scroll.ts`: scroll progress drives each scene through CSS variables
