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

  Los proyectos se muestran en el orden en que aparecen aquí.
*/
const PROJECTS = [
  {
    title: 'El Gran Café León',
    description:
      'Web de la sala de conciertos y café El Gran Café León, hecha en WordPress: agenda de conciertos con venta de entradas, horarios, contacto y solicitud de eventos privados.',
    tags: ['WordPress', 'Slider Revolution'],
    demo: 'https://elgrancafeleon.es',
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
