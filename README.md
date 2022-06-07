# Navigator

## Code Status
[![CodeFactor](https://www.codefactor.io/repository/github/dhbw-fn/web-eng-2/badge?s=c410c808c745281459230001890de660f2f7b640)](https://www.codefactor.io/repository/github/dhbw-fn/web-eng-2)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6ff6dc97585d4fc3b0f515856d615265)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DHBW-FN/web-eng-2&amp;utm_campaign=Badge_Grade)

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "/Users/marioschwartz/UNI/WebEng2_group/web-eng-2",
  "type": [
    "web",
    "pwa"
  ],
  "name": "Navigator",
  "framework": "react",
  "template": "blank",
  "cssPreProcessor": false,
  "bundler": "vite",
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)

* [Framework7 React Documentation](https://framework7.io/react/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)
