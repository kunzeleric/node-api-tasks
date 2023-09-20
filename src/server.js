import http from 'node:http';

const server = http.createServer((req, res) => {
  res.end("Hello, world!");
})

server.listen(3333, () => {
  console.log("Listening on port 3333!")
});