// Crguezl: My Jekyll _config.yml file for PL web site

module.exports = {
  "minimal_mistakes_skin": "default",
  "darks": [
    "plum",
    "dark",
    "ull"
  ],
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
  "logoLightBackground": "/assets/images/escuela-politecnica-ingenieria-original.png",
  "logoDarkBackground": "/assets/images/escuela-politecnica-ingenieria-positivo.png",
  "logo": "/assets/images/escuela-politecnica-ingenieria-positivo.png",
  "masthead_title": null,
  "words_per_minute": 200,
  "comments": {
    "provider": null,
    "disqus": {
      "shortname": null
    },
    "discourse": {
      "server": null
    },
    "facebook": {
      "appid": null,
      "num_posts": null,
      "colorscheme": null
    },
    "utterances": {
      "theme": "github-light",
      "issue_term": null
    },
    "staticman": {
      "branch": null,
      "endpoint": null
    }
  },
  "reCaptcha": {
    "siteKey": null,
    "secret": null
  },
  "atom_feed": {
    "path": null
  },
  "search": null,
  "search_full_content": null,
  "search_provider": null,
  "algolia": {
    "application_id": null,
    "index_name": null,
    "search_only_api_key": null,
    "powered_by": false
  },
  "google": {
    "search_engine_id": null,
    "instant_search": null
  },
  "google_site_verification": null,
  "bing_site_verification": null,
  "yandex_site_verification": null,
  "naver_site_verification": null,
  "twitter": {
    "username": null
  },
  "facebook": {
    "username": null,
    "app_id": null,
    "publisher": null
  },
  "og_image": null,
  "social": {
    "type": null,
    "name": null,
    "links": null
  },
  "analytics": {
    "provider": false,
    "google": {
      "tracking_id": null,
      "anonymize_ip": null
    }
  },
  "author": {
    "name": " Casiano Rodríguez León",
    "avatar": "/assets/images/bio-photo.jpg",
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
  "footer": {
    "links": [
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
        "label": "GitLab",
        "icon": "fab fa-fw fa-gitlab"
      },
      {
        "label": "Bitbucket",
        "icon": "fab fa-fw fa-bitbucket"
      },
      {
        "label": "Instagram",
        "icon": "fab fa-fw fa-instagram"
      }
    ]
  },
  "include": [
    ".htaccess",
    "_pages"
  ],
  "exclude": [
    "assets/clases",
    "*.sublime-project",
    "*.sublime-workspace",
    "vendor",
    ".asset-cache",
    ".bundle",
    ".jekyll-assets-cache",
    ".sass-cache",
    "assets/js/plugins",
    "assets/js/_main.js",
    "assets/js/vendor",
    "assets/clases/*",
    "Capfile",
    "CHANGELOG",
    "config",
    "Gemfile",
    "Gruntfile.js",
    "gulpfile.js",
    "LICENSE",
    "log",
    "node_modules",
    "package.json",
    "package-lock.json",
    "Rakefile",
    "README",
    "tmp",
    "/docs",
    "/test"
  ],
  "keep_files": [
    ".git",
    ".svn"
  ],
  "encoding": "utf-8",
  "markdown_ext": "markdown,mkdown,mkdn,mkd,md",
  "singular": {
    "practicas": "Práctica",
    "temas": "Tema",
    "clases": "Clase"
  },
  "markdown": "kramdown",
  "highlighter": "rouge",
  "lsi": false,
  "excerpt_separator": "\n\n",
  "incremental": false,
  "kramdown": {
    "input": "GFM",
    "hard_wrap": false,
    "auto_ids": true,
    "footnote_nr": 1,
    "entity_output": "as_char",
    "toc_levels": "1..6",
    "smart_quotes": "lsquo,rsquo,ldquo,rdquo",
    "enable_coderay": false
  },
  "sass": {
    "sass_dir": "_sass",
    "style": "compressed"
  },
  "paginate": 5,
  "paginate_path": "/page:num/",
  "timezone": "",
  "plugins": [
    "jekyll-paginate",
    "jekyll-sitemap",
    "jekyll-gist",
    "jekyll-feed",
    "jekyll-include-cache",
    "jemoji"
  ],
  "whitelist": [
    "jekyll-paginate",
    "jekyll-sitemap",
    "jekyll-gist",
    "jekyll-feed",
    "jekyll-include-cache"
  ],
  "category_archive": {
    "type": "liquid",
    "path": "/categories/"
  },
  "tag_archive": {
    "type": "liquid",
    "path": "/tags/"
  },
  "compress_html": {
    "clippings": "all",
    "ignore": {
      "envs": "development"
    }
  },
  "defaults": [
    {
      "scope": {
        "path": ""
      },
      "values": {
        "layout": "single",
        "comments": true,
        "share": true,
        "sidebar": {
          "title": "",
          "nav": "sidebar-sample"
        },
        "toc": true,
        "toc_label": "Tabla de Contenidos",
        "toc_icon": "list"
      }
    },
    {
      "scope": {
        "path": "",
        "type": "posts"
      },
      "values": {
        "layout": "single",
        "author_profile": true,
        "related": true,
        "read_time": false
      }
    },
    {
      "scope": {
        "path": "temas"
      },
      "values": {
        "comments": true,
        "layout": "tema"
      }
    },
    {
      "scope": {
        "path": "temas/_posts",
        "type": "posts"
      },
      "values": {
        "permalink": "temas/:title"
      }
    },
    {
      "scope": {
        "path": "/assets/temas"
      },
      "values": {
        "comments": true,
        "layout": "tema"
      }
    },
    {
      "scope": {
        "path": "practicas",
        "type": "posts"
      },
      "values": {
        "layout": "practica",
        "permalink": "practicas/:title"
      }
    },
    {
      "scope": {
        "path": "clases",
        "type": "posts"
      },
      "values": {
        "layout": "leccion"
      }
    },
    {
      "scope": {
        "path": "pages"
      },
      "values": {
        "toc": false,
        "share": true
      }
    }
  ],
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
  "livereload": true
};