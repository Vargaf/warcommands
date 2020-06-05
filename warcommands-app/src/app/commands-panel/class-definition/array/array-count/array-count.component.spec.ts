import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayCountComponent } from './array-count.component';

describe('ArrayCountComponent', () => {
  let component: ArrayCountComponent;
  let fixture: ComponentFixture<ArrayCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
