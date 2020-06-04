import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBaseByIndexComponent } from './get-base-by-index.component';

describe('GetBaseByIndexComponent', () => {
  let component: GetBaseByIndexComponent;
  let fixture: ComponentFixture<GetBaseByIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBaseByIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBaseByIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
