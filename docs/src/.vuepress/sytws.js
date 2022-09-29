// Crguezl: My Jekyll _config.yml file for PL web site
const TemasPublicados = require('./temas-publicados.js')

const navigationBar = [
  {
    text: 'Clases',
    link: '/clases/index.html',
  },
  {
    text: 'Labs',
    link: '/practicas/index.html'
  },
  {
    text: 'Temas',
    items: TemasPublicados,
  },
  {
    text: 'Context',
    items: [
      {
        text: '\u2442 ASTexplorer',
        link: 'https://astexplorer.net/'
      },      
      {
        text: 'Recursos',
        items: [
            { text: "ULL", link: '/recursos/index.html/#recursos-ull'},
            { text: "GitHub", link: '/recursos/index.html/#recursos-github'},
          ]
      },      
      {
        text: 'Horarios',
        items: [  
          { text: 'Google Cal, Cal Acad y Exámenes', link: '/horarios/index.html'},
          { text: 'Horarios de Tercero', link: 'https://www.ull.es/grados/ingenieria-informatica/informacion-academica/horarios-y-calendario-examenes/#tercero'},
        ],
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
      {
        text: "ULL-MII-SYTWS-2223",
        items: [
          {text: 'Organization', link: 'https://github.com/ULL-MII-SYTWS-2223'},
          {text: 'Teams', link: 'https://github.com/orgs/ULL-MII-SYTWS-2223/teams'},
          {text: 'Projects', link: 'https://github.com/orgs/ULL-MII-SYTWS-2223/projects'},
          {text: 'Classroom', link: 'https://classroom.github.com/classrooms/108465218-ull-mii-sytws-2223'},
        ]    
      },
      {text: 'Apuntes Repo', 
        items: [
        { text: 'Deploy at GH', link: 'https://github.com/ULL-MII-SYTWS/ull-mii-sytws.github.io'},
        //{ text: "Deploy at netlify", link: 'https://fervent-swirles-a16008.netlify.app/'},
        { text: 'Source', link: 'https://github.com/ULL-MII-SYTWS/vuepress-apuntes'}
        ]
      },
      {text: 'Teacher',
        items: [
          {text: 'ULL-MFP-TFM-Y-PCE-2223', link: 'https://github.com/ULL-MFP-TFM-Y-PCE-2223/private'},
          //{text: 'PL Discussions', link: 'https://github.com/ULL-MII-SYTWS-2223/PL-2223-discussions/discussions'},
          {text: 'Global Campus Teachers', link: 'https://github.com/GitHub-Global-Campus/Global-Campus-Teachers/discussions'},
        ]
      }
    ]
  },
  {
    text: 'Campus Virtual',
    items: [
      { text:'PL en el Campus Virtual', link: 'https://campusingenieriaytecnologia2122.ull.es/course/view.php?id=2122090039' },
      {text: 'Guía Docente',
       items: [
         { text: "Guía", link: 'https://www.ull.es/apps/guias/guias/view_guide_course/2122/139263121/'},
         { text: "Casiano", link: 'https://www.ull.es/apps/guias/guias/view_teacher_niu/798/crguezl/'},
         { text: "Israel", link: 'https://www.ull.es/apps/guias/guias/view_teacher_niu/798/ilopezpl/'},
         {text: 'Horario de Tutorías', link: 'https://www.ull.es/apps/guias/guias/view_guide_course/2122/139263121/3/'},
       ]
      },
      { text: 'Campus',
        items: [
          { text: 'Participantes', link: "https://campusingenieriaytecnologia2122.ull.es/user/index.php?id=2122090039" },
          { text: 'Calificador', link: "https://campusingenieriaytecnologia2122.ull.es/grade/report/user/index.php?id=2122090039" },
          { text: 'Tareas', link: "https://campusingenieriaytecnologia2122.ull.es/mod/assign/index.php?id=2122090039"},
          { text: 'Foros', link: "https://campusingenieriaytecnologia2122.ull.es/mod/forum/index.php?id=2122090039"},
          { text: 'Banco de Preguntas', link: "https://campusingenieriaytecnologia2122.ull.es/question/edit.php?courseid=2122090039" },
          { text: 'Introducción a PL', link: 'https://campusingenieriaytecnologia2122.ull.es/course/view.php?id=2122090039#section-12'}
        ]
      },
      { 
        text: 'ULL',
        items: [
          {text: 'Calendario Académico', link: 'https://www.ull.es/estudios-docencia/calendario-academico/'},
          {text: 'Portafirmas', link: 'https://sede.ull.es/ecivilis-signature-inbox-application/inbox.html'},
        ]
      },
      { text: 'TFG', link: "https://campusingenieriaytecnologia2122.ull.es/grade/report/user/index.php?id=2122090070&userid=254"},
      { text: 'Campus de Masters', link: "https://campusdoctoradoyposgrado2122.ull.es/my/"},
 
/*
      <li><a :href="$var.foros" target="_blank">Foros</a></li>
*/
    ]
  },
  {
    text: 'Google',
    items: [
      {text: 'Meet', link: 'https://meet.google.com/bhv-togn-ynm'},
      {text: 'Chat', link: 'https://mail.google.com/chat/u/1/#chat/welcome'},
      {text: 'Spreadsheets', link: 'https://docs.google.com/spreadsheets/d/1aSoJX0QO9gTsGmK_TUXbiNTlBj8Ka4IEJQwJYkY6x5s/edit#gid=1724628448'},
      {text: 'Community', link: 'https://currents.google.com/u/1/communities/104629784252354892324' },
      {
        text: 'Vídeos', 
        items: [
          { text: 'Curso 21/22', link: 'https://youtube.com/playlist?list=PLuPGCp-dfrUQbbnbT_8qHK1WQYurYwBEY' },
          { text: 'Curso 20/21', link: 'https://www.youtube.com/playlist?list=PLuPGCp-dfrUTzN_o2beArY1QoFUTGH-yd'},
          { text: 'Curso 19/20', link: 'https://youtube.com/playlist?list=PLuPGCp-dfrUTByhC5b9vInei9OzdYSBs7' }
        ]
      }
    ]
  }
];

const PLinfo = {
  networks: ['telegram', 'whatsapp', 'email', 'twitter', ],
  "locale": "en-US",
  "title": "PL",
  "title_separator": "-",
  "name": "Procesadores de Lenguajes",
  "description": "Itinerario de Computación. 2º cuatrimestre",
  "url": null,
  "baseurl": "",
  "repository": "ULL-MII-SYTWS/ull-mii-sytws.github.io",
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
    "url": "https://github.com/ULL-MII-SYTWS-2223",
    "name": "ULL-MII-SYTWS-2223",
    "master": "https://github.com/ULL-MII-SYTWS/ull-mii-sytws.github.io/tree/master/"
  },
  "apuntes_repo": "https://github.com/ULL-MII-SYTWS/ull-mii-sytws.github.io",
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
    "apuntes": "https://ull-mii-dsi-1819.github.io/dsi-1819/"
  },
  "sytws": {
    "url": "https://ull-mii-sytws-1920.github.io/"
  },
  "disqus": {
    "url": "https://procesadores-de-lenguajes.disqus.com/embed.js",
    "comments": true
  },
  "classroom": {
    "url": "https://classroom.github.com/classrooms/108465218-ull-mii-sytws-2223",
    "name": "ULL-MII-SYTWS-2223"
  },
};

module.exports = PLinfo;

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