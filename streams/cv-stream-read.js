import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("./tasks.csv", import.meta.url);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  from_line: 2,
});

const stream = fs.createReadStream(csvPath);

const csvImport = async () => {
  const lineParsed = stream.pipe(csvParse);

  for await (const line of lineParsed) {
    const [title, description] = line;

    if (title && description) {
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
    } else {
      console.log("Input data not found.");
    }
  }
};

csvImport();
