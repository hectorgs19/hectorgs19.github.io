# Portfolio — Héctor Gómez Soria

Web personal de un solo archivo, sin frameworks: HTML, CSS y JavaScript
vanilla. Pensada para desplegarse gratis en GitHub Pages.

**Demo:** _añade aquí el enlace en cuanto la despliegues_

## Por qué está hecha así

Está construida en vanilla JS a propósito: es el mismo enfoque que usé en
producción para una app móvil de hospitales privados con Apache Cordova, y
demuestra que no dependo de un framework para entregar algo cuidado,
accesible y responsive.

## Características

- Sin dependencias de build — abre `index.html` y funciona.
- Responsive de escritorio a móvil, con menú lateral colapsable.
- Respeta `prefers-reduced-motion` y tiene foco visible por teclado.
- Sección de "proyecto destacado" lista para enlazar el próximo repo.

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en el navegador, o
servirlo con:

```bash
python3 -m http.server 8000
```

## Despliegue en GitHub Pages

1. Sube este contenido a un repositorio público (p. ej. `tu-usuario.github.io`
   para tu dominio raíz, o cualquier nombre si lo enlazas como proyecto).
2. En **Settings → Pages**, elige la rama `main` y la carpeta raíz.
3. En 1-2 minutos estará publicado en `https://tu-usuario.github.io/`.

## Estructura

```
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Personalización pendiente

- [ ] Sustituir la sección "Proyecto destacado" por un proyecto real
- [ ] Añadir enlace a GitHub Pages en este README
- [ ] Revisar el enlace de GitHub en el menú (actualmente apunta a github.com)
