import { FileDTO } from '../../file/model/file.dto';

export abstract class FileManagerService {

    abstract loadOppenedFiles(): FileDTO[];

    abstract saveFile(fileId: string): void;

    abstract removeFile(): void;

    abstract openFile(fileId: string): FileDTO;

}
