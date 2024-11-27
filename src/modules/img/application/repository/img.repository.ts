import { ImagenAttached } from "../../domain/img.domain";

export const IMAGEN_REPOSITORY = 'IMAGEN_REPOSITORY';
export interface IImagenAttachedRepository {
    findAll(options?: object): Promise<ImagenAttached[]>;
    findById(id: number): Promise<ImagenAttached>;
    findByIds(id:number[]): Promise<ImagenAttached[]>
    create(ImagenAttached: ImagenAttached): Promise<ImagenAttached>;
    update(
        id: number,
        newImagenAttached: ImagenAttached,
    ): Promise<ImagenAttached>;
    delete(id: number): Promise<void>;
}
