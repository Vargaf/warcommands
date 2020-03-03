import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsPanelComponent } from './commands-panel.component';

describe('CommandsPanelComponent', () => {
  let component: CommandsPanelComponent;
  let fixture: ComponentFixture<CommandsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
