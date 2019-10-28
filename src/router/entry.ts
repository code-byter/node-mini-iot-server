import { Request, Response, Router } from "express";
import { RouteFactory, MiniIotConfig } from "../main-api";

export const IndexRoute: RouteFactory = {
    register: (config: MiniIotConfig, router: Router) => {
        router.get("/", (req: Request, resp: Response) => {
            resp.send("Running.");
        });
    }
}