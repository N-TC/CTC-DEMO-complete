# LCL Digital Flyer

## Setup

Clone repo, then install dependencies:

```
npm i
```

This project uses [Parcel.js](https://parceljs.org/getting_started.html) as a build tool.

## Development

Start the app with:
```
npm run serve
```

You should now be able to view the app at `localhost:1234`. Parcel includes hot reloading so you can leave the app running while you work on it.

## Generating for Production

When you're ready to build, just run:

```
npm run generate
```

This compiles the project to the `/dist` folder and replaces all content with required placeholder tags. If you want to preview the compiled app, you can use [http-server](https://www.npmjs.com/package/http-server) and point it at the production code:

```
http-server dist
```

The `/dist` folder is what will be given to the client to work with.

Please note there will be lots of stylying error where the placeholder tags overflow the expected content.

## Building for Demo Purposes

You can also run the `npm run build` command – this is exactly the same as `npm run generate` except it does does not replace the content with placeholder tags. This is the command that Jenkins runs to compile the [staging site](https://tcloblaws.dev.kpd-i.com/).

Jenkins builds from `master` every hour so all you have to is merge to `master` then `git push`.

### Credentials for Staging Site

username: tcloblaws
password: tcloblaws19