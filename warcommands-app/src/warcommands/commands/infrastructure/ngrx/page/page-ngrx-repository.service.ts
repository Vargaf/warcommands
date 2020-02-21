import { Injectable } from '@angular/core';
import { PageRepositoryService } from 'src/warcommands/commands/domain/page/services/PageRepository.service';
import { Store, select } from '@ngrx/store';
import * as UserProgramSelectors from 'src/ngrx/commands-panel/page/selectors';
import * as UserProgramActions from 'src/ngrx/commands-panel/page/actions';
import { PageDTO } from 'src/warcommands/commands/domain/page/model/page.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageNgrxRepositoryService implements PageRepositoryService {

    constructor(
        private readonly store: Store<UserProgramSelectors.PageSelectorState>
    ) {}

    savePage(page: PageDTO): void {
        this.store.dispatch(UserProgramActions.addPage({ page }));
    }

    getPage(pageId: string): Observable<PageDTO> {
        return this.store.pipe(select(UserProgramSelectors.pageSelector, { pageId }));
    }
}
