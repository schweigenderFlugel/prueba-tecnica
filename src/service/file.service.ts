import { PassThrough } from 'node:stream';
import csv from 'csv';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import HttpError from '../utils/pdf-printer/http-error.utils';
import PdfPrinterUtils from '../utils/pdf-printer/pdf-printer.utils';
import getInfoDocument from '../utils/pdf-printer/sheets/info.sheet';
import { openai } from '../utils/whisper-model/openia';

const printer = new PdfPrinterUtils();

export default class FileService {
  static async loadCsvFile(file: Express.Multer.File | undefined) {
    if (file) {
      const rawCsv = Buffer.from(file.buffer);
      const bufferStream = new PassThrough();
      return bufferStream
        .end(rawCsv)
        .pipe(csv.parse({ trim: true, skip_empty_lines: true, columns: true }));
    } else {
      throw new HttpError(400, 'No file uploaded');
    }
  }

  static async createPdfDocument(data: { [key: string]: string }): Promise<PDFKit.PDFDocument> {
    const docDefinition: TDocumentDefinitions = getInfoDocument(data);
    const doc = printer.createPdf(docDefinition);
    return doc;
  }

  static async trancribeVideo(file: Express.Multer.File | undefined) {
    if (!file) return;
    const video = Buffer.from(file.buffer);
    const bufferStream = new PassThrough();
    const readStream = bufferStream.end(video).read();
    const transcription = openai.audio.transcriptions.create({
      file: readStream,
      model: 'whisper-1',
      stream: true,
    });
    return transcription;
  }
}
