
# Tasks API - Node

Project developed to represent a task API designed in Node. A challenge in the Ignite Rocketseat course to practice and go further in terms of Node's abilities.

### Technology & Libraries

- Node's HTTP, Crypto and FS modules;
- CSV lib;

### Next Level

- Make sure ID exists in database before any update\complete\delete operation;
- Validate if update\post routes don't have an empty body.

### Take Aways

- Handled Node's native modules;
- Amped up the API's building skills;
- Learned how to retrieve CSV data.


## Installing

Install the project with the following commands:

```bash
  npm install
  cd PROJECTS_NAME
```

## API Routes

#### Return all tasks

```http
  GET /tasks
```

#### Return tasks based on search query

```http
  GET /tasks?=search=PARAM
```

#### Create a task

```http
  POST /tasks
```

| Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Mandatory**. Tasks title |
| `description` | `string` | **Mandatory**. Tasks description |


#### Update a task

```http
  PUT /tasks/:id
```


| Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Mandatory**. Tasks ID goes in the URL |
| `title` | `string` | **Optional**. Tasks title |
| `description` | `string` | **Optional**. Tasks description |
| `updated_at` | `date` | Date is automatically filled. |

#### Delete a task

```http
  DELETE /tasks/:id
```


| Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Mandatory**. Tasks ID goes in the URL |


#### Complete a task

```http
  PATCH /tasks/:id/complete
```

| Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Mandatory**. Tasks ID goes in the URL |
| `updated_at` | `date` | Date is automatically filled. |
| `completed_at` | `date` | Date is automatically filled. |