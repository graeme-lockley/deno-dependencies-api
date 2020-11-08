import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.73.0/testing/asserts.ts";

import { dependencies } from "./control.ts";

Deno.test("dependencies - unknown file", async () => {
  const result: [number, string] = await dependencies("fred");

  assertEquals(result[0], 1);
  assertEquals(result[1], "");
});

Deno.test("dependencies - known file", async () => {
  const result: [number, string] = await dependencies(
    "https://deno.land/std@0.73.0/testing/asserts.ts",
  );
  const json = JSON.parse(result[1]);

  assertEquals(result[0], 0);
  assertEquals(json.module, "https://deno.land/std@0.73.0/testing/asserts.ts");
  assertEquals(Object.keys(json.files), [
    "https://deno.land/std@0.73.0/fmt/colors.ts",
    "https://deno.land/std@0.73.0/testing/_diff.ts",
    "https://deno.land/std@0.73.0/testing/asserts.ts",
  ]);
});
