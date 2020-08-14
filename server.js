const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

// create server
const app = express();

// set template engine
app.engine("html", ejs.__express);
app.set("view engine", "html");
app.set("views", "./html");

// set static folder
app.use("/images", express.static("./images"));
app.use("/img", express.static("./src/app/img"));
app.use("/dist", express.static("./dist"));
app.use("/public", express.static("./public"));

app.get(["/", "/index"], (req, res, next) => {
  res.render("index.html");
});

app.get("/checkout", (req, res, next) => {
  res.render("checkout.html");
});

app.use((req, res, next) => {
  const view = findView(req.url);
  if (view) {
    console.debug(`request url: ${req.url}, view: ${view}`);
    res.render("#entry.html", { view });
  } else {
    next();
  }
});

function findView(url) {
  const path = url.split("?")[0].replace(/\/$/, "");
  let file;
  if (
    ((file = "./html" + path + ".html") && fs.existsSync(file)) ||
    ((file = "./html" + path + "/index.html") && fs.existsSync(file))
  ) {
    return file.replace(/^\.\/html\//, "./");
  } else {
    return false;
  }
}

// listen
app.listen(9000);
