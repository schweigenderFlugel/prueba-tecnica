import { Router } from 'express';
import FileController from '../controller/file.controller';
import { uploadCsv } from '../middleware/upload-file.middleware';

const route = Router();

route.post('/csv', uploadCsv.single('file'), FileController.uploadFile);

export default route;
