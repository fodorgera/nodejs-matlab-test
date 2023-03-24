const express = require("express");
const app = express();
const port = 5000;
const matlab = require("./middlewares/matlab");

app.get("/", async (req, res) => {
  const matlabVersion = await matlab.getVersion();
  res.send({
    data: {
      matlabVersion,
    },
  });
});

app.get("/get-text", async (req, res) => {
  const text = await matlab.getText("Hello world");
  res.send({
    data: {
      text,
    },
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
