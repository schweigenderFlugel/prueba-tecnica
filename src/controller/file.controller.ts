import { Request, Response, NextFunction } from 'express';
import FileService from '../service/file.service';

export default class FileController {
  static uploadFile(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    FileService.loadCsvFile(file)
      .then(async (stream) => {
        res.setHeader('Content-Type', 'application/json');
        res.write('[');
        let first = true;
        for await (const chunk of stream) {
          if (!first) res.write(',');
          res.write(JSON.stringify(chunk));
          first = false;
        }
        res.write(']');
        res.end();
      })
      .catch((error) => {
        next(error);
      });
  }

  static exportPdfFile(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const pdfDoc = FileService.createPdfDocument(data);

    pdfDoc
      .then((data) => {
        res.setHeader('Content-Type', 'application/pdf');
        data.info.Title = 'Información';
        data.pipe(res);
        data.end();
      })
      .catch((error) => {
        next(error);
      });
  }
}
