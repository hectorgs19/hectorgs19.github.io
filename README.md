# Portfolio — Héctor Gómez Soria

Web personal sin frameworks: HTML, CSS y JavaScript vanilla, desplegada en
GitHub Pages.

**Demo:** https://hectorgs19.github.io/

## Cómo añadir un proyecto

Los proyectos viven en `projects.js`. Para añadir uno, copia un bloque
`{ ... }` de la lista `PROJECTS`, pégalo (con una coma al final del bloque
anterior) y cambia los campos:

```js
{
  title: 'Nombre del proyecto',
  description: 'Qué es y qué hiciste, en una o dos frases.',
  tags: ['Angular', 'Ionic'],
  status: 'En desarrollo',            // opcional
  code: 'https://github.com/...',     // opcional
  demo: 'https://...',                // opcional
  private: true,                      // opcional: muestra "Código privado"
},
```

La web los muestra en una cuadrícula, en el orden de la lista. No hay que
tocar el HTML ni el CSS.

## Estructura

```
├── index.html
├── styles.css
├── script.js      ← menú y generación de la cuadrícula
├── projects.js    ← aquí se añaden los proyectos
└── README.md
```

## Desarrollo local

No requiere instalación: abre `index.html` en el navegador, o sírvelo con

```bash
python3 -m http.server 8000
```

## Despliegue

Cualquier cambio que hagas `push` a la rama `main` se publica solo en
GitHub Pages en 1-2 minutos.
