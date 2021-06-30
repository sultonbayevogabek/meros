const fs = require("fs");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./modules/postgres");
const userMiddleware = require("./middlewares/user-middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./modules/swagger");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(async (req, res, next) => {
    let psql = await db();
    req.db = psql;
    next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(userMiddleware);

const pathToRoutes = path.join(__dirname, "routes");

fs.readdir(pathToRoutes, (err, files) => {
    if (err) throw new Error(err);

    files.forEach((file) => {
        const Route = require(path.join(pathToRoutes, file));
        if (Route.path && Route.router) app.use(Route.path, Route.router);
    });
});

module.exports = app;