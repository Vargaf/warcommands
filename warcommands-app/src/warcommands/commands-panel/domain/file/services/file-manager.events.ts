import { Injectable } from '@angular/core';
import { FileDTO } from '../model/file.dto';
import { Observable, Subject } from 'rxjs';
import { FileJsonDTO } from '../model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class FileManagerEvents {

    private readonly opennedFileLoadedSubject: Subject<FileDTO>;
    private readonly fileLoadedSubject: Subject<FileJsonDTO>;
    private readonly savedFileSubject: Subject<FileJsonDTO>;

    constructor() {
        this.opennedFileLoadedSubject = new Subject<FileDTO>();
        this.fileLoadedSubject = new Subject<FileJsonDTO>();
        this.savedFileSubject = new Subject<FileJsonDTO>();
    }

    opennedFileLoadedDispatch(file: FileDTO): void {
        this.opennedFileLoadedSubject.next(file);
    }

    opennedFileLoadedListener(): Observable<FileDTO> {
        return this.opennedFileLoadedSubject;
    }

    fileLoadedDispatch(file: FileJsonDTO): void {
        this.fileLoadedSubject.next(file);
    }

    fileLoadedListener(): Observable<FileJsonDTO> {
        return this.fileLoadedSubject;
    }

    savedFileDispatch(file: FileJsonDTO): void {
        this.savedFileSubject.next(file);
    }

    savedFileListener(): Observable<FileJsonDTO> {
        return this.savedFileSubject;
    }

}
