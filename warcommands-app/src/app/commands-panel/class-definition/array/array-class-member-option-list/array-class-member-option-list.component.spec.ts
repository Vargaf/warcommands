import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayClassMemberOptionListComponent } from './array-class-member-option-list.component';

describe('ArrayClassMemberOptionListComponent', () => {
  let component: ArrayClassMemberOptionListComponent;
  let fixture: ComponentFixture<ArrayClassMemberOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayClassMemberOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayClassMemberOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
