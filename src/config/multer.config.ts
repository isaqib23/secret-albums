import {diskStorage} from "multer";

export const saveImagetoStorage = {
    storage: diskStorage({
        destination: './uploads',
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            const fileNameSplit = file.originalname.split(".");
            const fileExt = fileNameSplit[fileNameSplit.length - 1];
            callback(null,`${Date.now()}.${fileExt}`);
        }
    })
}

export const multerStorage = {
    saveImagetoStorage
}