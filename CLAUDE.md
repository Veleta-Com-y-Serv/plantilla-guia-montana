# Plantilla «Guía de montaña y aventura» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **aventurero**
(cuaderno de ruta: verde pino + roca clara + naranja chaleco, letra condensada en minúsculas, marca de sendero en los
antetítulos, bandas cortadas con el perfil de una cresta, curvas de nivel, señales de poste y fotos a sangre). Es la web
de un autónomo: habla en primera persona («Soy Pau…»), el teléfono y el WhatsApp mandan (botón en la cabecera y barra
fija «Llamar / WhatsApp» en el móvil) y el formulario es corto. Todo en castellano de España, frases cortas, sin jerga.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…).
  - `primario` = verde pino: bandas de salidas y opiniones, señales de la portada, botón «Llamar» y teléfono de contacto.
  - `acento` = naranja chaleco: botones, señal de la próxima salida, días de las salidas, banda de material, mitad de la reserva y marcas.
  - `fondo` + `texto` = roca clara y casi negro. Las bandas oscuras salen de ellos: `--pizarra` (texto + pino) y `--sima` (pizarra + negro); las claras, `--niebla` (fondo + pino). Si el cliente pide fondo oscuro, todo se recoloca.
  - Derivados en `src/styles/global.css`: `--pizarra`, `--sima`, `--niebla`, `--roca`, `--sobre-acento`, `--sobre-primario`, `--resalte` y `--resalte-texto` (lo que resalta en cada banda; la versión `-texto` cumple contraste AA en letra pequeña).
- **Tipografías y aspecto general**: `src/styles/global.css` (`--fuente-titulos`: Bahnschrift Condensed, Roboto Condensed, Arial Narrow… con `font-stretch: 75%`; texto en system-ui). Bandas `.banda-roca|niebla|pino|pizarra|chaleco`, `.cresta` y `.cresta--suave` (borde de arriba con el perfil de una sierra), `.curvas` (curvas de nivel), `.antetitulo` (marca de sendero), `.dato`, `.nivel` (picos 1-3), `.estado`, botones `.btn` (esquina cortada) / `.btn-sec`, cabecera `.cabecera--cumbre`, pie `.pie--cumbre` y `.barra-movil`. Fuentes del sistema: no añadas fuentes externas.
- **Imágenes**: las fotos van en `public/fotos/` (lista y descripción en `fotos.json`); si una foto todavía no existe, `Imagen.astro` enseña su respaldo `public/placeholders/<mismo nombre>.svg`. En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). Sin caras: paisajes, material y huellas.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = pico naranja con la inicial + nombre.
- **Pie**: próxima salida (la primera con plazas de `salidas`), `contacto.horario` y «Web creada con NoExpertise» si `marca_pie` no es `false`. La barra móvil sale si hay `contacto.telefono` o `contacto.whatsapp`.

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro`: pantalla completa con foto a sangre, `titulo` enorme (la última palabra en naranja; mejor 3-5 palabras), `texto`, `cta`, `cta_secundario` (si es un enlace de WhatsApp lleva su icono) y poste de señales: la próxima salida (sola, de `salidas`) y `items: [{titulo, icono}]`.
- `actividades` → `actividades.astro`: `actividades: [{titulo, texto, nivel, duracion, precio, temporada, imagen}]` en mosaico de borde a borde. `nivel`: «Iniciación», «Medio» o «Avanzado» se pintan con 1-3 picos (otro texto sale tal cual). `precio` libre («desde 45 € por persona»). `cta` opcional.
- `salidas` → `salidas.astro`: `salidas: [{fecha, titulo, lugar, plazas, precio, estado}]`. `fecha` libre («22 nov 2026»: el número se pinta en grande). `plazas` = número. `estado`: «Plazas libres», «Últimas plazas» (naranja), «Completo» (tachado, sin botón). El botón «Quiero plaza» abre WhatsApp con el mensaje hecho (sin WhatsApp, va a la reserva). `nota` y `cta` opcionales. En orden de fecha; las pasadas se quitan.
- `guia` → `guia.astro`: sobre mí en primera persona; `texto` (párrafos con línea en blanco), `imagen` a sangre e `items: [{titulo, texto, icono}]` con titulación, licencia y seguros.
- `material` → `material.astro`: `items: [{titulo, texto, icono}]` y `nota` (lo que trae el cliente).
- `seguridad` → `seguridad.astro`: `texto` y `preguntas: [{pregunta, respuesta}]` propias (abiertas y numeradas; no van al JSON-LD de preguntas frecuentes).
- `zonas` → `zonas.astro`: `items: [{titulo, texto}]` (valles, macizos, comarcas); salen también como `areaServed`.
- `galeria` → `galeria.astro`: `galeria: [ruta…]` de borde a borde (con 6 o 12 fotos queda cerrada; la sexta, panorámica).
- `opiniones` → `opiniones.astro`: `testimonios: [{texto, autor, nota}]`. No inventes opiniones.
- `preguntas` → `preguntas.astro` (acordeón `details/summary`; sin preguntas no se pinta).
- `reserva` → `reserva.astro`: `texto`, `items: [{titulo, texto}]` (etapas), `cta` (p. ej. WhatsApp), `niveles` (cadena con «;») y `boton_formulario`; formulario con fecha, personas, actividad (de `actividades`) y nivel.
- `contacto` → `contacto.astro`: teléfono enorme, botón de WhatsApp, datos de `contacto` y formulario corto (nombre, teléfono, qué necesitas). `boton_formulario` opcional.
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen` 50/50 a sangre, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, salidas, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas (fechas, horas y precios, siempre).
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Precios siempre como texto entre comillas. Máximo 24 elementos por lista.
5. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: salidas`, `tipo: actividades`…) y su propio id. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y una banda (`Seccion` con `banda=`, `cresta` y `curvas`). `src/pages/index.astro` la recoge sola: no lo toques.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` son obligatorios. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base y salen solos de `site.yaml`. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral (`.contenedor`), bandas y fotos de borde a borde, sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.
10. Iconos: `src/components/ui/Icono.astro` (de montaña: `montana, casco, cuerda, mosqueton, piolet, crampon, raqueta, mochila, brujula, botiquin, radio, nieve, agua, bota, linterna, bandera, aviso`; y `escudo, usuarios, sol, reloj, calendario, mapa, camara`…).

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento y páginas por zona)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.actividades.actividades` → `/actividades/<slug>/` (actividad).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (precio, duración…) salen en la tabla de datos de la ficha.
- Zonas: cada elemento de `secciones.zonas.items` **con `texto`** (60-150 palabras: qué trabajos se hacen allí, pueblos cercanos)
  tiene su página en `/zonas/<slug>/`. En la sección: `titulo_pagina` («Reformas en {zona}») y `texto_pagina` (entrada, con {zona} y {negocio}).
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona) en site.yaml. Nunca crees a mano páginas en
  `src/pages/actividades/` ni en `src/pages/zonas/`: salen solas de `src/pages/[coleccion]/[slug].astro` y `src/pages/zonas/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y servicio/producto con precio si lo hay; zonas con `areaServed`).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "servicios; planes" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada (`/servicios/`…); el menú se hace solo con las páginas (las entradas `/#…` de `menu` no salen) y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
