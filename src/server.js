import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import querystring from 'querystring'

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const queryParameters = querystring.parse(req.url.split('?')[1]);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? queryParameters : {};

    return route.handler(req, res);
  }
});

server.listen(3333, () => {
  console.log("Listening on port 3333!");
});
