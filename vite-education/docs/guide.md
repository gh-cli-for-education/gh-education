# Quick Guide

This is a quick guide for all the features of the template, were are the important files to change and all the important information.

## Auth

First of all there is an authentication system using firebase cloud hosting. This allow the teacher to have his own free databaste for the students (all of this is configured automatically in the script).

::: info
First the user need to login or register into the system. All the users are registrated into the firebase project.
:::

<Auth></Auth>

## Tabs

In the navbar there are diferent pages for the units, teams, students, schedule,...

[🕒 Schedule ](./horario/horario.md)
[🧑🏽‍🏫 Classes ](./clases/clases.md)
[💻 Tasks ](./practicas/practicas.md)
[👥 Teams ](./teams/teams.md)
[📝 Units ](./temas/temas.md)

## Teams & Students

This is a tab related with Github. In this page, we can have all the students of our github organization, also the teams of it. For each team we can know basic information about it like repositories, profile github pages, etc. If we want we can know more information about the student like the recent organization posts.

[👥 Teams ](./teams/teams.md)

## Configuration

As this is a template, it can be changed the way the user want. All the vitepress configuration is in the folder _.vitepress_, and there we can have the diferent vue components (folder _components_), css for some html elements, public folder that have information like teams, units that are published,... and the vitepress and firebase intial config.

```
docs/.vitepress/
├── components
│   ├── Auth.vue
│   ├── Student.vue
│   ├── clases.vue
│   ├── ghcard.vue
│   ├── practicas.vue
│   ├── teams.vue
│   └── temas.vue
├── config.js
├── css
│   └── auth-form.css
├── firebase.js
└── publico
    ├── clases.js
    ├── practicas.js
    ├── teams.js
    └── temas.js
```



