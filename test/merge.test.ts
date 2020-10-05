import { beforeEach, test, expect } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { readJSON } from "read-json-safe";
import { mergeJSON, mergeJSONSync } from "../source";

beforeEach(async () => {
  mock({
    "/test": {
      "file.json": '{"ok": true, "arr": [1, 2]}'
    },
    "/no-access": directory({
      mode: 0,
      items: {
        b: "no access"
      }
    })
  })
});

afterEach(async () => {
  restore();
});

test("merge", async () => {
  return mergeJSON("/test/file.json", { arr: [2, 3], code: 1 }).then(async (success) => {
    expect(success).toBe(true);
    return readJSON("/test/file.json").then((json) => {
      expect(json).toEqual({ ok: true, arr: [1, 2, 2, 3], code: 1 });
    });
  })
});

test("merge new", async () => {
  return mergeJSON("/test/new.json", { code: 1 }).then(async (success) => {
    expect(success).toBe(true);
    return readJSON("/test/new.json").then((json) => {
      expect(json).toEqual({ code: 1 });
    });
  })
});

test("merge sync", async () => {
  expect(mergeJSONSync("/test/file.json", { arr: [2, 3], code: 1 })).toBe(true);
  return readJSON("/test/file.json").then((json) => {
    expect(json).toEqual({ ok: true, arr: [1, 2, 2, 3], code: 1 });
  });
});

test("merge new sync", async () => {
  expect(mergeJSONSync("/test/new.json", { code: 1 })).toBe(true);
  return readJSON("/test/new.json").then((json) => {
    expect(json).toEqual({ code: 1 });
  });
});
