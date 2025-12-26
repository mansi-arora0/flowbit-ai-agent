import fs from "fs";
import path from "path";

export function loadJSON(fileName: string) {
  // project root = process.cwd()
  const filePath = path.join(process.cwd(), "data", fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

