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

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      if (req.body) {
        const { title, description } = req.body;

        if (title.trim().length === 0 || description.trim().length === 0) {
          return res
            .writeHead(404)
            .end("Please provide task title and description.");
        }

        const task = {
          id: randomUUID(),
          title,
          description,
          created_at: new Date(),
          completed_at: null,
          updated_at: null,
        };

        database.insert("tasks", task);

        return res.end(JSON.stringify(task));
      } else {
        return res.writeHead(404).end("No body found.");
      }
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const data = database.delete("tasks", id);

      if (data) {
        return res.end("Task deleted successfully.");
      } else {
        return res.writeHead(404).end("Task not found.");
      }
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (req.body && (title || description)) {
        const data = database.update("tasks", id, req.body);
        if (data) {
          return res.end("Task updated successfully.");
        } else {
          return res.writeHead(404).end("Task not found.");
        }
      } else {
        return res.end("Not valid input.");
      }
    },
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const data = database.complete("tasks", id);
      if (data) {
        return res.end("Task completed successfully.");
      } else {
        return res.writeHead(404).end("Task not found.");
      }
    },
  },
];
