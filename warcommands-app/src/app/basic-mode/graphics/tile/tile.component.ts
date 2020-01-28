import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TileEntity } from 'src/warcommands/gameEngine/domain/maps/model/tile.entity';
import { TileType } from 'src/warcommands/gameEngine/domain/maps/model/tileType.enum';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() data: TileEntity;

  @ViewChild('tile', { static: true })
  public tileElement: ElementRef<HTMLDivElement>;

  tileType = TileType;

  type: TileType;

  constructor() { }

  ngOnInit() {
    this.tileElement.nativeElement.style.setProperty('top', this.data.yCoordinate * 100 + 'px');
    this.tileElement.nativeElement.style.setProperty('left', this.data.xCoordinate * 100 + 'px');
    this.type = this.data.type;
  }

}
