import {PDFParse} from "pdf-parse";
export async function extractPdfText(buffer) {
  if (!buffer || !Buffer.isBuffer(buffer)) throw new Error("Invalid PDF Buffer, could not extract");
  const data = new PDFParse({data: buffer});
  const result = await data.getText();
  return result.text || "";
}
