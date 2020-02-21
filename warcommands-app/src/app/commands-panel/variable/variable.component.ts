import { Component, OnInit, Input } from '@angular/core';
import { VariableCommandEntity } from 'src/warcommands/commands/domain/command/model/variable-command.entity';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit {

  @Input() commandData: VariableCommandEntity;

  constructor() { }

  ngOnInit() {
  }

}
