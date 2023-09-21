import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select("tasks", {
        title: search,
        description: search
      });

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description, completed_at, created_at, updated_at } =
        req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at,
        completed_at,
        updated_at,
      };

      database.insert("tasks", task);

      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('tasks', id);
      
      return res.writeHead(204).end();
    },
  },
];
