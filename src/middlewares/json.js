export const json = async (req, res) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    console.log('Error parsing JSON.')
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
};
