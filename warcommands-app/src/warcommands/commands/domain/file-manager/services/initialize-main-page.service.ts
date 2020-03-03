import { Injectable } from '@angular/core';
import { FileDTO } from '../../file/model/file.dto';

@Injectable({
    providedIn: 'root'
})
export abstract class InitializeMainPageService {

    abstract initialize(): FileDTO[];

}
