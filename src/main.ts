import App from './app';

async function startApp() {
  new App().start().listen(3000);
  // eslint-disable-next-line no-console
  console.log(`I'm listening on port 3000`);
}

startApp();
