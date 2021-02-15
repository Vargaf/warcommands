import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseClassMemberOptionListComponent } from './base-class-member-option-list.component';

describe('BaseClassMemberOptionListComponent', () => {
  let component: BaseClassMemberOptionListComponent;
  let fixture: ComponentFixture<BaseClassMemberOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseClassMemberOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseClassMemberOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
