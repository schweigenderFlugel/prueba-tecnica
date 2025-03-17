import * as stream from 'node:stream';
import csv from 'csv';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import HttpError from '../utils/http-error.utils';
import PdfPrinterUtils from '../utils/pdf-printer.utils';
import getInfoDocument from '../utils/sheets/info.sheet';

const printer = new PdfPrinterUtils();

export default class FileService {
  static async loadCsvFile(file: Express.Multer.File | undefined) {
    if (file) {
      const rawCsv = Buffer.from(file.buffer);
      const bufferStream = new stream.PassThrough();
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
}
