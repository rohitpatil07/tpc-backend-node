import { startServer } from './app/index.js';
import request from 'supertest';
const app = startServer();

describe('Filter tests', () => {
  const fields = {
    roll_no: true,
    gender: true,
    middle_name: true,
    github: true,
    email: true,
  };

  const queries = {
    roll_no: '19CE1065',
  };

  it('POST /filter/dashboard', async () => {
    const response = await request(app)
      .post('/filter/dashboard')
      .send({ fields, queries })
      .expect(200);

    const student = response._body.student[0];

    expect(student).toEqual(
      expect.objectContaining({
        roll_no: expect.any(String),
        gender: expect.any(String),
        middle_name: expect.any(String),
        github: expect.any(String),
        email: expect.any(String),
      }),
    );
  });
});
