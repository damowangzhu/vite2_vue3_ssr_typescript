const fs = require('fs');
const path = require('path');
const express = require('express');

const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const app = express();

  const viteServer = await require('vite').createServer({
    server: {
      middlewareMode: true
    }
  });

  app.use(viteServer.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      template = fs.readFileSync(resolve('../index.html'), 'utf-8');

      template = await viteServer.transformIndexHtml(url, template);
      render = (await viteServer.ssrLoadModule(resolve('../src/entry-server.js'))).render;

      const [appHtml, state, links] = await render(url, {});

      let html = template
        .replace(`<!--preload-links-->`, links)
        .replace(`'<vuex-state>'`, JSON.stringify(state))
        .replace(`<!--app-html-->`, appHtml);

      try {
        state && state.route && (html = html.replace('_Title_', state.route.meta.title || '首页'));
      } catch (error) {
        console.log(error);
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      viteServer && viteServer.ssrFixStacktrace(e);
      console.log(e);
      res.status(500).end(e.message);
    }
  });

  return { app };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  })
);
