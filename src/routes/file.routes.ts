import { Router } from 'express';
import FileController from '../controller/file.controller';
import { uploadCsv, uploadVideo } from '../middleware/upload-file.middleware';

const route = Router();

route.post('/csv', uploadCsv.single('file'), FileController.uploadFile);
route.post('/pdf', FileController.exportPdfFile);
route.post('/transcribe-video', uploadVideo.single('file'), FileController.transcribeVideo);

export default route;
