import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWorkerComponent } from './get-worker.component';

describe('GetWorkerComponent', () => {
  let component: GetWorkerComponent;
  let fixture: ComponentFixture<GetWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
