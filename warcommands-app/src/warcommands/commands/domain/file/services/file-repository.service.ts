import { Observable } from 'rxjs';
import { FileDTO } from '../model/file.dto';

export abstract class FileRepositoryService {

    abstract addFile(file: FileDTO): void;

    abstract loadFiles(fileList: FileDTO[]): void;

    abstract getFile(fileId: string): Observable<FileDTO>;

    abstract getFileList(): Observable<FileDTO[]>;

}
