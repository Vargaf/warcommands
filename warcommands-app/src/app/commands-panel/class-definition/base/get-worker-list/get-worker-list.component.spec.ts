import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWorkerListComponent } from './get-worker-list.component';

describe('GetWorkersComponent', () => {
  let component: GetWorkerListComponent;
  let fixture: ComponentFixture<GetWorkerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetWorkerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetWorkerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
