// Crguezl: My Jekyll _config.yml file for PL web site
const navigationBar = [
  {
    text: 'Docencia',
    items: [
      {
        text: 'Clases',
        link: '/clases/index.html',
      },
      {
        text: 'Temas',
        items: [
          {text: 'Introdución a PL', link:'/temas/introduccion-a-pl/index.html'}
        ]
      },
      {
        text: 'Labs',
        link: '/practicas/index.html'
      },
    ]
  },
  {
    text: 'Context',
    items: [
      {
        text: 'Recursos',
        link: '/recursos/index.html'
      },      
      {
        text: 'Horarios',
        link: '/horarios/index.html'
      },
      {
        text: 'Referencias',
        link: '/referencias/index.html'
      },
    ]
  },
  {
    text: 'GitHub',
    items: [
      {text: 'Organization', link: 'https://github.com/ULL-ESIT-PL-2122'},
      {text: 'Teams', link: 'https://github.com/orgs/ULL-ESIT-PL-2122/teams'},
      {text: 'Projects', link: 'https://github.com/orgs/ULL-ESIT-PL-2122/projects'},
      {text: 'Classroom', link: 'https://classroom.github.com/classrooms/90842648-ull-esit-pl-2122'},
      {text: 'Apuntes Repo', link: 'https://github.com/ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io'},
      {text: 'Global Campus Teachers', link: 'https://github.com/GitHub-Global-Campus/Global-Campus-Teachers/discussions'}
    ]
  },
  {
    text: 'Campus Virtual',
    items: [
      { text:'PL en el Campus Virtual', link: 'https://campusingenieriaytecnologia2122.ull.es/course/view.php?id=2122090039' },
      {text: 'Guía Docente', link: 'https://www.ull.es/apps/guias/guias/view_guide_course/2122/139263121/'},
      {text: 'Calendario Académico', link: 'https://www.ull.es/estudios-docencia/calendario-academico/'},
      {text: 'Horario de Tutorías', link: 'https://www.ull.es/apps/guias/guias/view_guide_course/2122/139263121/3/'},
      {text: 'Horarios de Tercero', link: 'https://www.ull.es/grados/ingenieria-informatica/informacion-academica/horarios-y-calendario-examenes/#tercero'}
    ]
  },
  {
    text: 'Google',
    items: [
      {text: 'Meet', link: 'https://meet.google.com/eha-yfij-zmo'},
      {text: 'Chat', link: 'https://mail.google.com/chat/u/1/#chat/welcome'},
      {text: 'Vídeos', link: 'https://www.youtube.com/playlist?list=PLuPGCp-dfrUTzN_o2beArY1QoFUTGH-yd'},

    ]
  }
];

module.exports = {
  "locale": "en-US",
  "title": "PL",
  "title_separator": "-",
  "subtitle": null,
  "name": "Procesadores de Lenguajes",
  "description": "Itinerario de Computación. 2º cuatrimestre",
  "url": null,
  "baseurl": "",
  "repository": "ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io",
  "teaser": null,
  "logoLightBackground": "/images/escuela-politecnica-ingenieria-original.png",
  "logoDarkBackground": "/images/escuela-politecnica-ingenieria-positivo.png",
  "logo": "/images/escuela-politecnica-ingenieria-positivo.png",
  "author": {
    "name": " Casiano Rodríguez León",
    "avatar": "/images/bio-photo.jpg",
    "home": "https://crguezl.github.io",
    "bio": null,
    "location": "San Cristóbal de La Laguna",
    "email": null,
    "links": [
      {
        "label": "Email",
        "icon": "fas fa-fw fa-envelope-square"
      },
      {
        "label": "Website",
        "icon": "fas fa-fw fa-link",
        "url": "https://crguezl.github.io"
      },
      {
        "label": "Twitter",
        "icon": "fab fa-fw fa-twitter-square"
      },
      {
        "label": "Facebook",
        "icon": "fab fa-fw fa-facebook-square"
      },
      {
        "label": "GitHub",
        "icon": "fab fa-fw fa-github"
      },
      {
        "label": "Instagram",
        "icon": "fab fa-fw fa-instagram"
      }
    ]
  },
  nav: navigationBar,
  "encoding": "utf-8",
  "singular": {
    "practicas": "Práctica",
    "temas": "Tema",
    "clases": "Clase"
  },
  "lsi": false,
  "excerpt_separator": "\n\n",
  "incremental": false,
  "calendario_academico": "https://www.ull.es/estudios-docencia/calendario-academico/",
  "horarios_tercero": "https://www.ull.es/grados/ingenieria-informatica/informacion-academica/horarios-y-calendario-examenes/#tercero",
  "horarios_tutorias": "https://www.ull.es/apps/guias/guias/view_guide/24127/",
  "cita_previa": "https://calendar.google.com/calendar/u/0/selfsched?sstoken=UUd1YlJSLURtcE5JfGRlZmF1bHR8ZmNiMWNmMTE4MjNjNzk1MWQwZGQyYTI4ZjZjYjZjY2E",
  "google_plus": "https://currents.google.com/u/1/communities/101901734024125937720",
  "organization": {
    "url": "https://github.com/ULL-ESIT-PL-2122",
    "name": "ULL-ESIT-PL-2122",
    "master": "https://github.com/ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io/tree/master/"
  },
  "apuntes_repo": "https://github.com/ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io",
  "campus_virtual": "https://campusingenieriaytecnologia2122.ull.es/course/view.php?id=2122090039",
  "calificador": "https://campusingenieriaytecnologia2122.ull.es/grade/report/user/index.php?id=2122090039",
  "participantes": "https://campusingenieriaytecnologia2122.ull.es/user/index.php?id=2122090039",
  "tareas": "https://campusingenieriaytecnologia2122.ull.es/mod/assign/index.php?id=2122090039",
  "foros": "https://campusingenieriaytecnologia2122.ull.es/mod/forum/index.php?id=2122090039",
  "profesor": "https://www.ull.es/apps/guias/guias/view_teacher_niu/745/(%3FPcrguezl.*)/",
  "teacher_profile_edit": "https://www.ull.es/apps/guias/teachers/view_profile/",
  "alu_github": "https://campusingenieriaytecnologia2122.ull.es/mod/assign/view.php?id=21205",
  "udv": "https://udv.ull.es/portal/",
  "profesor_github": "crguezl",
  "chat": "https://chat.google.com/u/1/room/AAAANx1edCg",
  "bull_puntoq": "https://www.ull.es/servicios/biblioteca/servicios/puntoq/",
  "bull_permanente": "https://puntoq.ull.es/permalink/f",
  "covid_ull": "https://campusvirtual.ull.es/doctoradoyposgrado/course/view.php?id=201913946",
  "turnitin": "https://docs.google.com/forms/d/e/1FAIpQLSfEyKnNYAXH5lH9eTh6de6qu5dP-lp33ul4QE8PrFLqeXT66A/viewform",
  "dsi": {
    "apuntes": "https://ull-esit-dsi-1819.github.io/dsi-1819/"
  },
  "sytws": {
    "url": "https://ull-mii-sytws-1920.github.io/"
  },
  "disqus": {
    "url": "https://procesadores-de-lenguajes.disqus.com/embed.js",
    "comments": true
  },
  "classroom": {
    "url": "https://classroom.github.com/classrooms/90842648-ull-esit-pl-2122",
    "name": "ULL-ESIT-PL-2122"
  },
};

/*
    sidebar: {
      '/clases/': [
        {
          title: 'Clases',
          collapsable: false,
          children: [
            '',
            'introducción a PL',
          ]
        }
      ],
      '/temas/': [
        {
          title: 'Temas',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
    } */