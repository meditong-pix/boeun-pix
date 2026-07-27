import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("root page does not redeclare the VOC date formatter", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const declarations = html.match(/(?:function\s+formatDate\b|(?:const|let|var)\s+formatDate\b)/g) ?? [];

  assert.equal(declarations.length, 1, "formatDate must have exactly one top-level declaration");
});
