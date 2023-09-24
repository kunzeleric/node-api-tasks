import fs from "node:fs/promises";

// sets database based on current location of file execution
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8") // when the class is started, it reads the file
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist(); // database is created empty if there is no file
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database), (e) => {
      // "saves" the file
      console.log(e);
    });
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          if (!value) return true;

          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
      return true;
    } else {
      return null;
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const currentTask = this.#database[table][rowIndex];

      const newTask = { ...currentTask, updated_at: new Date(), ...data };

      this.#database[table][rowIndex] = newTask;
      this.#persist();
      return true;
    } else {
      return null;
    }
  }

  complete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const currentTask = this.#database[table][rowIndex];
      if (currentTask.completed_at) {
        res.status(400).send("Not possible to complete task, it's already complete.")
        return false;
      }
      const newTask = { ...currentTask, completed_at: new Date(), updated_at: new Date() };
      this.#database[table][rowIndex] = newTask;
      this.#persist();
      return true;
    } else {
      return res.writeHead(404).send("Task not found!");
    }
  }
}
