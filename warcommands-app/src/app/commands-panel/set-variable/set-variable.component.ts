import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SetVariableCommandEntity } from 'src/warcommands/commands/domain/command/model/set-variable-command.entity';

@Component({
  selector: 'app-set-variable',
  templateUrl: './set-variable.component.html',
  styleUrls: ['./set-variable.component.scss']
})
export class SetVariableComponent implements OnInit, OnDestroy {

  @Input() commandData: SetVariableCommandEntity;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('destroyed');
  }

}
