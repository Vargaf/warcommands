import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerClassMemberOptionListComponent } from './worker-class-member-option-list.component';

describe('WorkerClassMemberOptionListComponent', () => {
  let component: WorkerClassMemberOptionListComponent;
  let fixture: ComponentFixture<WorkerClassMemberOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerClassMemberOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerClassMemberOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
