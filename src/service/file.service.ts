import * as stream from 'node:stream';
import csv from 'csv';
import HttpError from '../utils/http-error.utils';

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
}
