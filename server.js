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

app.get("/run-function/:fileName",async (req,res) => {
  const {fileName} = req.params;
  const query = req.query;
  const matlabRes = await matlab.runFunction({fileName, params: query})
  res.send({
    data: {
      matlabRes
    }
  })
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
