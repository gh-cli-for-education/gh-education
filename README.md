# Quick Guide

This is a quick guide for all the features of the template, were are the important files to change and all the important information.

## How to use 

- Fist clone the project and enter into the _vite-education_ folder, then install the dependencies doing:
```
npm i
```

- After lunch the server mode of vitepress doing:
```
npm run docs:dev
```

- Finally run deploy.sh to deploy the result in GitHub pages:
```
./deploy.sh
```


## Auth

First of all there is an authentication system using firebase cloud hosting. This allow the teacher to have his own free databaste for the students (all of this is configured automatically in the script).

First the user need to login or register into the system. All the users are registrated into the firebase project.

<Auth></Auth>

## Tabs

In the navbar there are diferent pages for the units, teams, students, schedule,...

[🕒 Schedule ](./vite-education/docs/schedule.md)
[🧑🏽‍🏫 Lessons ](./vite-education/docs/lessons/lessons.md)
[💻 Tasks ](./vite-education/docs/tasks/tasks.md)
[👥 Teams ](./vite-education/docs/teams/teams.md)
[📝 Units ](./vite-education/docs/units/units.md)

## Teams & Students

This is a tab related with Github. In this page, we can have all the students of our github organization, also the teams of it. For each team we can know basic information about it like repositories, profile github pages, etc. If we want we can know more information about the student like the recent organization posts.

[👥 Teams ](./vite-education/docs/teams/teams.md)

## Configuration

As this is a template, it can be changed the way the user want. All the vitepress configuration is in the folder _.vitepress_, and there we can have the diferent vue components (folder _components_), css for some html elements, public folder that have information like teams, units that are published,... and the vitepress and firebase intial config.

```
docs/.vitepress/
├── deploy.sh
├── docs
│   ├── auth.md
│   ├── guide.md
│   ├── index.md
│   ├── lessons
│   │   ├── 1º Week
│   │   │   ├── 13-10-22-leccion.md
│   │   │   └── 15-10-22-leccion.md
│   │   ├── 2º Week
│   │   │   └── 18-10-22-leccion.md
│   │   └── lessons.md
│   ├── public
│   │   └── assets
│   │       ├── logo-gh-dark.png
│   │       └── logo-gh-light.png
│   ├── schedule.md
│   ├── tasks
│   │   ├── iaas.md
│   │   └── tasks.md
│   ├── teams
│   │   └── teams.md
│   └── units
│       ├── 1º Unit
│       │   ├── 1º section
│       │   │   └── Async JS.md
│       │   └── presentation.md
│       └── units.md
├── package-lock.json
├── package.json
├── src
│   └── update-units.js
└── webpack.config.js
```

