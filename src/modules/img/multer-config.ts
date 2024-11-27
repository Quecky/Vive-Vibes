import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

export const multerConfig: MulterOptions = {
  storage: memoryStorage(), // Guarda los archivos temporalmente en memoria
    limits: {
    fileSize: 10 * 1024 * 1024, // Máximo tamaño del archivo (5 MB)
    },
    fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Solo se permiten imágenes'), false);
    }
    cb(null, true);
    },
};
