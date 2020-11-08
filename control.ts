import { exec, OutputMode } from "https://deno.land/x/exec@0.0.5/mod.ts";

export const dependencies = async (name: string): Promise<[number, string]> => {
  const output = await exec(
    `deno info --json --unstable ${name}`,
    { output: OutputMode.Capture },
  );

  return [output.status.code, output.output];
};
