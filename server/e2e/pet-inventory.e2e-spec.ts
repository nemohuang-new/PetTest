import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { PetInventoryDTO } from '../src/service/dto/pet-inventory.dto';
import { PetInventoryService } from '../src/service/pet-inventory.service';

describe('PetInventory Controller', () => {
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
            .overrideProvider(PetInventoryService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all pet-inventories ', async () => {
        const getEntities: PetInventoryDTO[] = (
            await request(app.getHttpServer())
                .get('/api/pet-inventories')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET pet-inventories by id', async () => {
        const getEntity: PetInventoryDTO = (
            await request(app.getHttpServer())
                .get('/api/pet-inventories/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create pet-inventories', async () => {
        const createdEntity: PetInventoryDTO = (
            await request(app.getHttpServer())
                .post('/api/pet-inventories')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update pet-inventories', async () => {
        const updatedEntity: PetInventoryDTO = (
            await request(app.getHttpServer())
                .put('/api/pet-inventories')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update pet-inventories from id', async () => {
        const updatedEntity: PetInventoryDTO = (
            await request(app.getHttpServer())
                .put('/api/pet-inventories/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE pet-inventories', async () => {
        const deletedEntity: PetInventoryDTO = (
            await request(app.getHttpServer())
                .delete('/api/pet-inventories/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
