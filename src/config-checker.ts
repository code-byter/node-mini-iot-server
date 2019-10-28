import { MiniIotConfig } from "./main-api";
import * as fs from "fs";

export const checkConfig = (config: MiniIotConfig): MiniIotConfig => {
    // the slash is not part of the file name...
    if (config.dataDir.endsWith("/")) {
        config.dataDir = config.dataDir.substr(0, config.dataDir.length - 1)
    }

    if (!fs.existsSync(config.dataDir)) {
        throw new Error("config.dataDir: " + config.dataDir + " doest not exist!");
    }

    return config;
}