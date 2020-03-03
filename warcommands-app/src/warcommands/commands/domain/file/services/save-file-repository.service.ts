import { FileJsonDTO } from '../model/file-json.dto';

export abstract class SaveFileRepositoryService {

    abstract saveFile(jsonFile: FileJsonDTO): void ;

    abstract getFile(fileId: string): FileJsonDTO;

}
