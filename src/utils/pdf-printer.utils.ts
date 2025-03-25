import { join } from 'node:path';

import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';

const rootPath = join(process.cwd(), 'assets', 'fonts');

const fonts: TFontDictionary = {
  Roboto: {
    normal: join(rootPath, 'Roboto-Regular.ttf'),
    bold: join(rootPath, 'Roboto-Bold.ttf'),
    italics: join(rootPath, 'Roboto-Italic.ttf'),
    bolditalics: join(rootPath, 'Roboto-BoldItalic.ttf'),
  },
};

export default class PdfPrinterUtils {
  private printer = new PdfPrinter(fonts);

  async createPdf(
    docDefinitions: TDocumentDefinitions,
    options?: BufferOptions,
  ): Promise<PDFKit.PDFDocument> {
    return this.printer.createPdfKitDocument(docDefinitions, options);
  }
}
