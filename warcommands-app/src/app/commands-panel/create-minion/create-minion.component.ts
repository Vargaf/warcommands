import { Component, OnInit, Input } from '@angular/core';
import { CreateMinionCommandEntity } from 'src/warcommands/commands/domain/command/model/create-minion-command.entity';

@Component({
  selector: 'app-create-minion',
  templateUrl: './create-minion.component.html',
  styleUrls: ['./create-minion.component.scss']
})
export class CreateMinionComponent implements OnInit {

  @Input() commandData: CreateMinionCommandEntity;

  constructor() { }

  ngOnInit() { }

}
