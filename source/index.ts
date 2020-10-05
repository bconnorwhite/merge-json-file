import { JSONObject } from "types-json";
import { readJSONObject, readJSONObjectSync } from "read-json-safe";
import { writeJSON, writeJSONSync, Options } from "write-json-safe";
import merge from "deepmerge";

export async function mergeJSON(path: string, object: JSONObject, options?: Options) {
  return readJSONObject(path).then((old = {}) => {
    const json = merge(old, object);
    return writeJSON(path, json, options);
  });
}

export function mergeJSONSync(path: string, object: JSONObject, options?: Options) {
  const old = readJSONObjectSync(path) ?? {};
  const json = merge(old, object);
  return writeJSONSync(path, json, options);
}

export {
  Options,
  JSONObject
}
