# Plantilla NoExpertise · Guía de montaña y aventura

Web de una sola página para guías de montaña, senderismo, escalada, barranquismo y esquí de travesía que trabajan por
su cuenta. Estilo **aventurero**: verde pino, roca clara y naranja chaleco; letra condensada; bandas a todo el ancho
que se cortan con el perfil de una cresta; curvas de nivel; fotos de montaña a sangre. Pensada para el móvil: botón
de WhatsApp en la cabecera y barra fija «Llamar / WhatsApp».

Astro 5 + Tailwind 4, derivada de AstroWind (MIT, `LICENSE-ASTROWIND.md`). Todo el contenido está en `site.yaml`.

## Secciones (en este orden en el ejemplo)

| id | Qué enseña | Campos propios |
|---|---|---|
| `hero` | Portada a pantalla completa con foto, título, dos botones y poste de señales | `items: [{titulo, icono}]` (señales); la próxima salida sale sola |
| `actividades` | Mosaico de actividades de borde a borde | `actividades: [{titulo, texto, nivel, duracion, precio, temporada, imagen}]` |
| `salidas` | Calendario de salidas en grupo con plazas | `salidas: [{fecha, titulo, lugar, plazas, precio, estado}]`, `nota` |
| `guia` | Sobre mí, 50/50 con foto a sangre | `texto`, `imagen`, `items: [{titulo, texto, icono}]` (titulación, seguros) |
| `material` | Material incluido, banda naranja | `items: [{titulo, texto, icono}]`, `nota` (lo que trae el cliente) |
| `seguridad` | Dudas de seguridad abiertas y numeradas | `preguntas: [{pregunta, respuesta}]` |
| `zonas` | Valles y macizos donde guía | `items: [{titulo, texto}]` |
| `galeria` | Mosaico de fotos de borde a borde | `galeria: [ruta…]` |
| `opiniones` | Opiniones de clientes | `testimonios: [{texto, autor, nota}]` |
| `preguntas` | Preguntas frecuentes (acordeón, JSON-LD FAQPage) | `preguntas: [{pregunta, respuesta}]` |
| `reserva` | Etapas + formulario con fecha, personas, actividad y nivel | `items: [{titulo, texto}]`, `niveles` («;»), `boton_formulario`, `cta` |
| `contacto` | Teléfono enorme, WhatsApp, datos y formulario corto | `boton_formulario` |

`texto` es el diseño genérico para apartados nuevos (`tipo: texto`).

## Construir

```
npm ci
npm run build     # dist/
```

Fotos: `fotos.json` (14, sin personas reconocibles); mientras no existan se ven los SVG de `public/placeholders/`.

## Páginas propias
- Cada elemento de `secciones.actividades.actividades` con `detalle` tiene su página en `/actividades/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Cada zona de `secciones.zonas.items` con `texto` tiene su página en `/zonas/<slug>/` (`src/pages/zonas/[slug].astro`); en la sección, `titulo_pagina` y `texto_pagina` con {zona} y {negocio}.
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
