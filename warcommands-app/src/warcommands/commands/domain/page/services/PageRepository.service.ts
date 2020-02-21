import { Observable } from 'rxjs';
import { PageDTO } from '../model/page.dto';

export abstract class PageRepositoryService {

    abstract savePage(page: PageDTO): void;

    abstract getPage(pageId: string): Observable<PageDTO>;

}
