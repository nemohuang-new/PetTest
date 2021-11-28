import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { PhotoUrlDTO } from '../src/service/dto/photo-url.dto';
import { PhotoUrlService } from '../src/service/photo-url.service';

describe('PhotoUrl Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(PhotoUrlService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all photo-urls ', async () => {
        const getEntities: PhotoUrlDTO[] = (
            await request(app.getHttpServer())
                .get('/api/photo-urls')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET photo-urls by id', async () => {
        const getEntity: PhotoUrlDTO = (
            await request(app.getHttpServer())
                .get('/api/photo-urls/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create photo-urls', async () => {
        const createdEntity: PhotoUrlDTO = (
            await request(app.getHttpServer())
                .post('/api/photo-urls')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update photo-urls', async () => {
        const updatedEntity: PhotoUrlDTO = (
            await request(app.getHttpServer())
                .put('/api/photo-urls')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update photo-urls from id', async () => {
        const updatedEntity: PhotoUrlDTO = (
            await request(app.getHttpServer())
                .put('/api/photo-urls/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE photo-urls', async () => {
        const deletedEntity: PhotoUrlDTO = (
            await request(app.getHttpServer())
                .delete('/api/photo-urls/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
