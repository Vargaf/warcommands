import { FileDTO } from '../model/file.dto';

export abstract class FileRepositoryService {

    abstract getOpennedFiles(): FileDTO[];

    abstract userHasFiles(): boolean;

    abstract loadFile(fileId: string): FileDTO;

}
