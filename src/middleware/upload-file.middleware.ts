import multer, { Options, memoryStorage } from 'multer';
import HttpError from '../utils/http-error.utils';

const options = (formats: string[], fileSize?: number | undefined): Options => {
  return {
    limits: { fileSize: fileSize },
    fileFilter: (_req, file, cb) => {
      if (formats.some((format) => format === file.mimetype)) cb(null, true);
      else cb(new HttpError(415, 'The file format is not acceptable'));
    },
    storage: memoryStorage(),
  };
};

export const uploadCsv = multer(options(['text/csv']));
