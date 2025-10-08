import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(file: File): Promise<string | null> {
  try {
    const worker = await createWorker('nld'); // Nederlandse taal
    
    const { data: { text } } = await worker.recognize(file);
    
    await worker.terminate();
    
    return text.trim() || null;
  } catch (error) {
    // OCR extraction error occurred
    return null;
  }
}
