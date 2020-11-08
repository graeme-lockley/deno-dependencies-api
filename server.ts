import {
  Application,
  helpers,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";
import { dependencies, greet } from "./control.ts";
import * as Flags from "https://deno.land/std@0.66.0/flags/mod.ts";

const port = () => {
  const DEFAULT_PORT = 8080;
  const argPort = Flags.parse(Deno.args).port;
  const port = argPort ? Number(argPort) : DEFAULT_PORT;

  if (isNaN(port)) {
    console.error("Port is not a number.");
    Deno.exit(1);
  }

  return port;
};

const app = new Application();

const router = new Router()
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World!";
  })
  .get("/dependencies", async (ctx: RouterContext) => {
    const query = helpers.getQuery(ctx);

    if (query.url === undefined) {
      ctx.throw(404, `Expected query parameter url`);
    } else {
      const result = await dependencies(query.url as string);

      if (result[0] === 0) {
        ctx.response.body = result[1];
        ctx.response.type = "application/json";
      } else {
        ctx.throw(404, `Unable to resolve URL ${query.url}`);
      }
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: port() });
