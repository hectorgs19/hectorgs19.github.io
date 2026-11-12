/*
  PROYECTOS DEL PORTFOLIO
  -----------------------
  Para añadir un proyecto, copia un bloque { ... } y pégalo en la lista
  (separado por comas). Campos:

    title        Nombre del proyecto                         (obligatorio)
    description  Una o dos frases sobre qué es y qué hiciste (obligatorio)
    tags         Tecnologías, p. ej. ['Angular', 'Ionic']
    status       Etiqueta opcional, p. ej. 'En desarrollo'
    code         URL del repositorio (opcional)
    demo         URL de la demo en vivo (opcional)
    private      true si el código no es público (muestra "Código privado")
    details      Opcional. Si existe, la tarjeta muestra "Ver detalle" y abre una
                 ventana sin salir del portfolio con:
                   intro       Párrafo de presentación
                   facts       [['Etiqueta', 'Valor'], ...]
                   media       { src: 'assets/demo.gif', alt: 'Texto alternativo' }
                   highlights  [{ title, text }, ...]

  Los proyectos se muestran en el orden en que aparecen aquí.
*/
const PROJECTS = [
  {
    title: 'El Gran Café León',
    description:
      'Nueva web de la sala de conciertos El Gran Café León, hecha desde cero sin WordPress: agenda pública, panel de administración propio y despliegue automático.',
    tags: ['JavaScript', 'PHP', 'HTML/CSS', 'GitHub Actions'],
    status: 'Nueva versión en pruebas',
    demo: 'https://nueva.elgrancafeleon.es',
    private: true,
    details: {
      intro:
        'La sala tenía su web en WordPress. La he sustituido por una web ligera hecha a medida, con una agenda pública y un panel privado desde el que se publican y editan los conciertos sin tocar código.',
      media: {
        src: 'assets/demo-gran-cafe.gif',
        alt: 'Recorrido por la web: portada con carrusel de conciertos, ficha de un concierto, agenda por meses y panel de administración con el botón de estado de las entradas.',
        caption: 'Demo con conciertos de ejemplo · agenda pública y panel de administración',
      },
      facts: [
        ['Rol', 'Diseño y desarrollo completo, en solitario'],
        ['Stack', 'JavaScript vanilla · PHP · HTML/CSS'],
        ['Alojamiento', 'Nominalia (solo PHP)'],
        ['Código', 'Repositorio privado'],
      ],
      highlights: [
        {
          title: 'Agenda pública',
          text: 'Portada con un carrusel en bucle de los próximos conciertos, página de agenda con barra de meses y ficha de cada concierto en una ventana emergente. Adaptada a móvil.',
        },
        {
          title: 'Panel de administración',
          text: 'Alta, edición y borrado de conciertos con cartel y foto, enlace de entradas opcional y un botón que rota el estado entre «entradas», «últimas entradas» y «sold out».',
        },
        {
          title: 'Vídeo del mes para redes',
          text: 'Generador de un vídeo vertical con la agenda del mes, dibujado en un canvas y grabado en el propio navegador, listo para Instagram, TikTok o WhatsApp.',
        },
        {
          title: 'API portada a PHP',
          text: 'El hosting no ejecuta Node.js, así que porté la API a PHP manteniendo los mismos endpoints: el front no cambió. Datos en JSON fuera de la carpeta pública y login con límite de intentos.',
        },
        {
          title: 'Despliegue automático',
          text: 'Cada cambio en main se sube por FTP con GitHub Actions, solo los archivos modificados, con un reintento si el servidor tarda y sin tocar nunca los carteles que sube el dueño.',
        },
        {
          title: 'Rendimiento y seguridad',
          text: 'Sin dependencias, fuentes alojadas en la propia web, imágenes WebP, cabeceras de seguridad HTTP y política de contenido restrictiva.',
        },
      ],
    },
  },
  {
    title: 'Reforma',
    description:
      'App híbrida para gestionar las tareas de una mudanza o reforma por habitación, con foto hecha con la cámara y recordatorios locales.',
    tags: ['Ionic', 'Angular', 'Capacitor'],
    status: 'En desarrollo',
  },
  {
    title: 'App de hospitales privados',
    description:
      'App móvil híbrida en producción, escrita en JavaScript vanilla y compilada con Cordova. Me encargué de resolver bugs y de añadir nuevas funcionalidades.',
    tags: ['JavaScript', 'Cordova', 'Android Studio'],
    private: true,
  },
  {
    title: 'Este portfolio',
    description:
      'Web personal sin frameworks ni build: HTML, CSS y JavaScript vanilla, responsive y desplegada en GitHub Pages.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    code: 'https://github.com/hectorgs19/hectorgs19.github.io',
    demo: 'https://hectorgs19.github.io/',
  },
];
