import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWorkersComponent } from './get-workers.component';

describe('GetWorkersComponent', () => {
  let component: GetWorkersComponent;
  let fixture: ComponentFixture<GetWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
