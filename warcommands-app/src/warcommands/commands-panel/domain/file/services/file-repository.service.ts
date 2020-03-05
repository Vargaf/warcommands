import { FileJsonDTO } from '../model/file-json.dto';

export abstract class FileRepositoryService {

    abstract getOpennedFilesInRaw(): FileJsonDTO[];

    abstract userHasFiles(): boolean;

}
