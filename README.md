# Jeyawarsharith Dass: Executive Portfolio

Cinematic 3D scroll portfolio. React + Tailwind CSS v4 + Three.js (`@react-three/fiber`), smooth scroll with Lenis.
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
- `src/scene/layout.ts`: where each 3D object sits and the camera pose per section
- `src/scene/objects.tsx`: monolith, rings, globe, network, tower, pillars, ripples, seal
- `src/ui/Sections.tsx`: page copy and layout
