import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  if (file.type === 'application/pdf') {
    return extractTextFromPDF(buffer);
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.endsWith('.docx')
  ) {
    return extractTextFromDOCX(buffer);
  } else {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  }
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
    .replace(/[^\w\s.,;:()\-]/g, '') // Remove special characters except basic punctuation
    .trim();
}