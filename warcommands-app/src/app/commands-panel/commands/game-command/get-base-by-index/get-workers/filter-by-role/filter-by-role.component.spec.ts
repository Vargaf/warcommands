import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByRoleComponent } from './filter-by-role.component';

describe('FilterByRoleComponent', () => {
  let component: FilterByRoleComponent;
  let fixture: ComponentFixture<FilterByRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
