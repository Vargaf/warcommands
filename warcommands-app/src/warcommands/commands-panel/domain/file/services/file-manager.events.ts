import { Injectable } from '@angular/core';
import { FileDTO } from '../model/file.dto';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileManagerEvents {

    readonly fileLoadedSubject: Subject<FileDTO>;

    constructor() {
        this.fileLoadedSubject = new Subject<FileDTO>();
    }

    fileLoadedDispatch(file: FileDTO) {
        this.fileLoadedSubject.next(file);
    }

    fileLoadedListener(): Observable<FileDTO> {
        return this.fileLoadedSubject;
    }

}
