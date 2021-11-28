import { EntityRepository, Repository } from 'typeorm';
import { PhotoUrl } from '../domain/photo-url.entity';

@EntityRepository(PhotoUrl)
export class PhotoUrlRepository extends Repository<PhotoUrl> {}
