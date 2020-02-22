import { Observable } from 'rxjs';
import { FileDTO } from '../model/file.dto';

export abstract class FileRepositoryService {

    abstract saveFile(file: FileDTO): void;

    abstract getFile(fileId: string): Observable<FileDTO>;

}
