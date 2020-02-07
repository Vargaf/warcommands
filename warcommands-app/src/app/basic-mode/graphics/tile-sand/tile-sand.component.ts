import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { TileInterface } from 'src/warcommands/gameEngine/interfaces/model/map/tile.interface';
import { TileTypeEnum } from 'src/warcommands/gameEngine/interfaces/model/map/tileType.enum';
import { GAME_CONFIG, GameEngineBasicModeConfiguration } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';

@Component({
  selector: 'app-tile-sand',
  templateUrl: './tile-sand.component.html',
  styleUrls: ['./tile-sand.component.scss']
})
export class TileSandComponent implements OnInit {

  @Input() data: TileInterface;

  @ViewChild('tile', { static: true })
  public tileElement: ElementRef<HTMLDivElement>;

  tileType = TileTypeEnum;

  type: TileTypeEnum;

  constructor(
    @Inject(GAME_CONFIG) private gameConfig: GameEngineBasicModeConfiguration
  ) { }

  ngOnInit() {
    const tileSize = this.gameConfig.tileSize - 2;

    this.tileElement.nativeElement.style.setProperty('width', tileSize + 'px');
    this.tileElement.nativeElement.style.setProperty('height', tileSize + 'px');
    this.tileElement.nativeElement.style.setProperty('top', this.data.yCoordinate * this.gameConfig.tileSize + 'px');
    this.tileElement.nativeElement.style.setProperty('left', this.data.xCoordinate * this.gameConfig.tileSize + 'px');
    this.type = this.data.type;
  }

}
