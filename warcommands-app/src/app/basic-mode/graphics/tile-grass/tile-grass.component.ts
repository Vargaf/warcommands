import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { GameEngineBasicModeConfiguration, GAME_CONFIG } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { TileDTO } from 'src/warcommands/gameEngine/domain/maps/model/tile.dto';
import { TileType } from 'src/warcommands/gameEngine/domain/maps/model/tile-type.enum';

@Component({
  selector: 'app-tile-grass',
  templateUrl: './tile-grass.component.html',
  styleUrls: ['./tile-grass.component.scss']
})
export class TileGrassComponent implements OnInit {

  @Input() data!: TileDTO;

  @ViewChild('tile', { static: true })
  public tileElement!: ElementRef<HTMLDivElement>;

  tileType = TileType;

  type!: TileType;

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
