import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadPrompt(promptFileName) {
  const promptPath = path.join(
    __dirname, // services/ai/utils
    "..", // services/ai
    "prompts", // services/ai/prompts
    promptFileName
  );

  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt not found: ${promptPath}`);
  }

  return fs.readFileSync(promptPath, "utf-8");
}
