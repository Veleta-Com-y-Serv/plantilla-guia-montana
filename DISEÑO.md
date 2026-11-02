# Guía de montaña y aventura: brief de diseño

Plantilla `guia-montana` creada el 02/11/2026 a partir de `musica-espectaculos` con `php artisan plantillas:nueva`
(de la base solo queda la estructura técnica: `index.astro`, `seo.ts`, endpoints, `Imagen.astro`, el formulario
`mailto` y `Base.astro`). Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: guías de montaña autónomos o equipos muy pequeños (sectores: guía de montaña, senderismo,
  escalada, barranquismo, esquí de travesía, turismo de aventura). Su cliente quiere saber qué puede hacer según su
  nivel, cuándo hay salidas, si es seguro y cuánto cuesta, y reservar rápido.
- **Qué tiene que conseguir la web**: que llamen o escriban por WhatsApp para reservar. Botón de WhatsApp en la
  cabecera, barra fija «Llamar / WhatsApp» en móvil, «Quiero plaza» en cada salida con el mensaje hecho y formulario
  corto de reserva (nombre, teléfono, fecha, personas, actividad, nivel y qué te apetece).
- **Tono y estilo** (`aventurero`): cercano, en primera persona («Soy Pau…»), seguro y sin épica de catálogo.
  Referencia sí: cuaderno de ruta, señalización de senderos, mapa topográfico. Referencia no: cartel nocturno (la
  base), pádel con cursiva y diagonales (`club-padel`, misma base), agencia de viajes con tarjeta de billete.
- **Paleta de ejemplo**: primario `#1f4a36` (verde pino), acento `#f26419` (naranja chaleco), fondo `#ecebe5` (roca
  clara), texto `#17201b`. Derivados con `color-mix`: pizarra (texto + pino), sima (pizarra + negro), niebla
  (fondo + pino). Letra sobre acento/primario calculada con `oklch(from …)`. Aguanta fondo oscuro.
- **Tipografía**: del sistema. Títulos en condensada (Bahnschrift Condensed, Roboto Condensed, Arial Narrow…,
  `font-stretch: 75%`, 700) en **minúsculas** con interlineado apretado; antetítulos, datos y botones en versalitas
  condensadas con interletrado. Texto en system-ui.
- **Motivos**: antetítulo con la marca de sendero (raya clara sobre raya naranja); bandas que suben sobre la anterior
  con el perfil de una cresta (`.cresta`, `.cresta--suave`, mismo fondo con `background: inherit` y `clip-path`);
  curvas de nivel en las bandas oscuras (`.curvas`, máscara SVG); poste de señales con forma de flecha en la portada;
  niveles con 1-3 picos; botones con la esquina cortada; foto del guía con el borde de arriba en sierra.
- **Ritmo de bandas**: portada foto → actividades roca + mosaico pizarra a sangre → salidas pino con curvas → sobre mí
  niebla 50/50 con foto → material naranja → seguridad pizarra con curvas → zonas roca con sierra → galería pizarra a
  sangre → opiniones pino → preguntas roca → reserva 50/50 naranja / pizarra → contacto niebla → pie sima.
- **Apartados** (en orden): `hero`, `actividades` (titulo, texto, nivel, duracion, precio por persona, temporada,
  imagen), `salidas` (fecha, titulo, lugar, plazas, precio, estado), `guia` (sobre + titulación en `items`),
  `material` (`items` + `nota`), `seguridad` (`preguntas` propias), `zonas` (`items`), `galeria`, `opiniones`
  (`testimonios`), `preguntas`, `reserva` (`items`, `niveles`, formulario), `contacto`.
- **Fotos**: Pirineo de Benasque (Maladeta, glaciar del Aneto, Estós, ibones, barrancos, nieve), material sobre roca,
  huellas; luz de amanecer o atardecer; sin personas reconocibles, sin texto ni logotipos (`fotos.json`, 14).
- **Qué no hacer**: tarjetas blancas en caja estrecha; mayúsculas de cartel y cursivas (son de la base y de
  `club-padel`); caras en las fotos; precios o cifras en los componentes.

## Negocio de ejemplo

Bescós Montaña, guía de montaña en Benasque (Huesca), teléfono 974 31 86 52 y WhatsApp 689 47 21 05 (ficticios).

## Páginas propias (fichas y zonas)
Con la misma piel que la portada: cabecera y pie de la plantilla, migas (Inicio › Sección › Elemento), hero con la foto del
elemento (sin foto, su icono), `detalle` en párrafos, tabla de datos, caja de contacto, galería (`imagenes`) y otros elementos
de la misma lista; en las zonas, entrada, texto de la zona, servicios, trabajos del lugar, opiniones y contacto.
