import http from "node:http";
import { json } from "./middlewares/json.js";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/tasks") {
    const tasks = database.select('tasks')
    return res.end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    const { title, description, completed_at, created_at, updated_at } = req.body;

    const task = {
      id: randomUUID(),
      title,
      description,
      created_at,
      completed_at,
      updated_at,
    };

    database.insert('tasks', task);

    return res.end(JSON.stringify(task))
  }

  await json(req, res);
});

server.listen(3333, () => {
  console.log("Listening on port 3333!");
});
