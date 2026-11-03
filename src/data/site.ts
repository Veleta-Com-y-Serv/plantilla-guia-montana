// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico: señales de la portada, titulaciones, material, zonas, pasos de la reserva… */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string; duracion?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Actividad que guía (sección «actividades»). `nivel`: Iniciación | Medio | Avanzado (o libre). `precio` como texto. */
export interface Actividad { titulo: string; texto?: string; nivel?: string; duracion?: string; precio?: string; temporada?: string; imagen?: string }
/** Salida en grupo con fecha fija (sección «salidas»). `estado`: Plazas libres | Últimas plazas | Completo (o libre). */
export interface Salida { fecha: string; titulo?: string; lugar?: string; plazas?: string; precio?: string; estado?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  nota?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  actividades: Actividad[];
  salidas: Salida[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    nota: texto(s.nota),
    cta: s.cta?.url ? (s.cta as Enlace) : undefined,
    cta_secundario: s.cta_secundario?.url ? (s.cta_secundario as Enlace) : undefined,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    actividades: lista<Actividad>(s.actividades).filter((a) => texto(a.titulo).trim()),
    salidas: lista<Salida>(s.salidas).filter((f) => texto(f.fecha).trim() || texto(f.titulo).trim()),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#1f4a36', acento: '#f26419', fondo: '#ecebe5', texto: '#17201b', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'SportsActivityLocation',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Secciones activas que usan un diseño (su id o su `tipo:`), en orden. */
export function seccionesDeTipo(tipo: string): Seccion[] {
  return seccionesActivas()
    .filter((id) => id === tipo || site.secciones[id].tipo === tipo)
    .map((id) => site.secciones[id]);
}

/** Opciones del desplegable «Actividad» de los formularios: los títulos de las actividades. */
export function intereses(): string[] {
  const titulos = seccionesDeTipo('actividades').flatMap((s) => s.actividades.map((a) => texto(a.titulo).trim()));
  return [...new Set(titulos.filter(Boolean))];
}

/** Niveles del formulario de reserva: los de `niveles` («Iniciación; Medio; Avanzado») o, si no hay, los de las actividades. */
export function niveles(propios?: unknown): string[] {
  const p = puntos(propios);
  if (p.length) return p;
  const n = seccionesDeTipo('actividades').flatMap((s) => s.actividades.map((a) => texto(a.nivel).trim()));
  return [...new Set(n.filter(Boolean))];
}

/** Escalones del nivel (1-3) para pintarlo con picos; 0 si el texto no se reconoce (se pinta solo el texto). */
export function escalones(nivel?: string): number {
  const n = texto(nivel).toLowerCase();
  if (!n) return 0;
  if (/inicia|f[aá]cil|baj|princip/.test(n)) return 1;
  if (/medi|moder|intermed/.test(n)) return 2;
  if (/avanz|dif[ií]cil|alt|exper|t[eé]cnic/.test(n)) return 3;
  return 0;
}

/** ¿El estado dice que no quedan plazas? */
export const esCompleta = (estado?: string) => /complet|agotad|cerrad|sin plazas/i.test(texto(estado));
/** ¿El estado avisa de que quedan pocas? */
export const esUltimas = (estado?: string) => /[uú]ltim|pocas|quedan/i.test(texto(estado));

/** Primera salida con plazas (si no hay, la primera) de la primera sección de salidas activa, con el id de su sección. */
export function proximaSalida(): (Salida & { ancla: string }) | null {
  for (const id of seccionesActivas()) {
    const s = site.secciones[id];
    if ((id === 'salidas' || s.tipo === 'salidas') && s.salidas.length) {
      const libre = s.salidas.find((f) => !esCompleta(f.estado)) ?? s.salidas[0];
      return { ...libre, ancla: id };
    }
  }
  return null;
}

/**
 * «14 nov 2026» → { dia: '14', resto: 'nov 2026' }; «Sábado 14 de noviembre» → { dia: '14', resto: 'Sábado de noviembre' }.
 * Si no hay número, todo va en `resto`. Sirve para pintar el día en grande sin obligar a un formato.
 */
export function partirFecha(f?: string): { dia: string; resto: string } {
  const t = texto(f).trim();
  const m = t.match(/(^|\s)(\d{1,2})(?=\s|$|[\/.-])/);
  if (!m) return { dia: '', resto: t };
  const resto = (t.slice(0, m.index! + m[1].length) + t.slice(m.index! + m[0].length)).replace(/^[\s\/.-]+/, '').replace(/\s+de\s+/i, ' de ').replace(/\s{2,}/g, ' ').trim();
  return { dia: m[2], resto };
}

/** Lista a partir de una cadena separada por «;» o por líneas (p. ej. `niveles`). */
export const puntos = (t?: unknown) => (t ? String(t).split(/[;\n]/).map((p) => p.trim()).filter(Boolean) : []);

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Enlace a otra web? (se abre en pestaña nueva). */
export const esExterno = (u?: string) => /^https?:\/\//i.test(texto(u));
