import { Server } from 'node:http';
import { Express } from 'express';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';
import request from 'supertest';
import App from '../src/app';

describe('Testing the files controllers', () => {
  let app: Express;
  let server: Server;
  let api: TestAgent<Test>;

  beforeAll(() => {
    app = new App().start();
    server = app.listen(9000);
    api = request(app);
  });

  describe('POST /upload/csv', () => {
    it('Should get an error message because the file was not uploaded', async () => {
      const { statusCode } = await api.post('/api/v1/upload/csv');
      expect(statusCode).toBe(400);
    });

    it('Should get an error message because the file format is not acceptable', async () => {
      const fakeFile = {
        fieldname: 'file',
        originalName: 'doc.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('avatar'),
      };
      const { statusCode } = await api
        .post('/api/v1/upload/csv')
        .set('Content-Type', 'multipart/form-data')
        .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalName);

      expect(statusCode).toBe(415);
    });

    it('Should get a stream of the data in json format', async () => {
      const fakeFile = {
        fieldname: 'file',
        originalName: 'doc.csv',
        mimetype: 'text/csv',
        size: 1024,
        buffer: Buffer.from('file'),
      };
      const { statusCode, body, header } = await api
        .post('/api/v1/upload/csv')
        .set('Content-Type', 'multipart/form-data')
        .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalName);

      expect(statusCode).toBe(200);
      expect(header['content-type']).toEqual('application/json');
      expect(body).toBeInstanceOf(Array);
    });
  });

  afterAll(() => {
    server.close();
  });
});
