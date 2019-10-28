import express from "express";
import bodyParser from "body-parser";
import { Application, Router } from "express";
import { IndexRoute } from "./router/entry";
import { ReadFilesRoute } from "./router/read-files";
import { checkConfig } from "./config-checker";
import { WriteFilesRoute } from "./router/write-files";
import { CsvToGrafanaRoute } from "./router/grafana-endpoint";

const config = checkConfig(require("../mini-iot-config.json"));

const app: Application = express();
const router: Router = express.Router();

WriteFilesRoute.register(config, router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

IndexRoute.register(config, router);
CsvToGrafanaRoute.register(config, router);
ReadFilesRoute.register(config, router);

app.use(router);

const server = app.listen(config.port, () => {
    console.log("Started server: http://localhost:" + config.port + "/");
    console.log(config);
});