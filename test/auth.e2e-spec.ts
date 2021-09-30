import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'asd@gmail.com';
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({ email, password: '123123' })
      .expect(201)
      .then((res) => {
        const { id, email: email2 } = res.body;
        expect(id).toBeDefined();
        expect(email2).toEqual(email);
      });
  });
});
