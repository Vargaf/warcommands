import { THREE, utils } from 'aframe';
import { UxUiNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service';
import { BuildingsNgrxRepositoryService } from 'src/warcommands/game-middleware/buildings-ngrx-repository.service';
import { BaseEntityDTO } from 'src/warcommands/game-middleware/model/building/base-entity.dto';
import { BuildingTypeEnum } from 'src/warcommands/game-middleware/model/building/building-type.enum';
import { BuildingDTO, SpawnerBuildingDTO } from 'src/warcommands/game-middleware/model/building/building.dto';
import { BuildingFilterDTO } from 'src/warcommands/vr-mode/domain/buildings/model/building-filter.dto';
import { BuildingsRepositoryInterface } from 'src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface';
import { PlayerRepositoryService } from 'src/warcommands/vr-mode/domain/players/services/player-repository.service';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { Text } from 'troika-three-text/dist/troika-three-text.esm';
import { AframeSceneService } from '../aframe-scene.service';


/**
 * Code inspired by:
 *      https://threejs.org/examples/#webgl_sprites
 *      https://github.com/mrdoob/three.js/blob/r125/examples/webgl_loader_svg.html
 */

export class AFrameComponentHud {

    private componentName = 'hud-component';

    private areSpritesLoaded = false;

    private cameraOrtho!: THREE.OrthographicCamera;
    private sceneOrtho!: THREE.Scene;

    private spriteMatter!: THREE.Group;
    private spriteEnergy!: THREE.Group;
    private resourcesHolder!: THREE.Object3D;

    private inFullScreenMode = false;

    private spriteSize = 24;
    private resourcesHolderTopMargin = 5;

    constructor(
        private readonly uxUiNgrxRepository: UxUiNgrxRepositoryService,
        private readonly buildingsNgrxReposioryService: BuildingsNgrxRepositoryService,
        private readonly aframeSceneService: AframeSceneService,
        private readonly playerRepository: PlayerRepositoryService,
        private readonly buildingsRepository: BuildingsRepositoryInterface,
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {

            cameraOrtho: null,

            init: function () {

                const width = window.innerWidth;
                const height = window.innerHeight;

                scope.cameraOrtho = new THREE.OrthographicCamera(- width / 2, width / 2, height / 2, - height / 2, 1, 10);
                scope.cameraOrtho.position.z = 10;
                scope.sceneOrtho = new THREE.Scene();

                scope.createHudBackground();
                scope.loadResourceIcons();
                scope.createResourceTextFileds();
                
                // Set fullScreen listeners
                if (this.el.sceneEl) {
                    this.el.sceneEl.renderer.autoClear = false;

                    this.el.sceneEl.addEventListener('enter-vr', function (evt) {
                        scope.inFullScreenMode = true;
                        if(utils.device.checkHeadsetConnected()) {
                            scope.resourcesHolder.visible = false;
                        }
                    });

                    this.el.sceneEl.addEventListener('exit-vr', function (evt) {
                        scope.inFullScreenMode = false;
                        if(utils.device.checkHeadsetConnected()) {
                            scope.resourcesHolder.visible = true;
                        }
                    });
                }

                scope.uxUiNgrxRepository.watchWindowsSize().subscribe((windowSize) => {
                    scope.onWindowResize(<number>windowSize.width, <number>windowSize.height);
                });
            },
            tock: function () {

                if (!scope.isInVrMode()) {
                    this.el.sceneEl?.renderer.clearDepth();
                    this.el.sceneEl?.renderer.render(scope.sceneOrtho, scope.cameraOrtho);
                }
            }

        });

    }

    private createResourceTextFileds(): void {
        const textLeftMargin = this.spriteSize + 15;
        const energyTextTopMargin = this.spriteSize + this.resourcesHolderTopMargin;

        const matterText = new Text();
        matterText.text = '0';
        matterText.fontSize = 20;
        matterText.position.set(textLeftMargin,-this.resourcesHolderTopMargin,1);
        matterText.color = '#9A4AE6';
        this.resourcesHolder.add(matterText);
        matterText.sync();

        const energyText = new Text();
        energyText.text = '0';
        energyText.fontSize = 20;
        energyText.position.set(textLeftMargin,-energyTextTopMargin,1);
        energyText.color = '#4242FA';
        this.resourcesHolder.add(energyText);
        energyText.sync();
        
        this.aframeSceneService.isInitialized().then(() => {
            const player = this.playerRepository.findCurrentPlayer();
            const filter: BuildingFilterDTO = {
                type: BuildingTypeEnum.Base,
                playerId: <string>player.id
            };
            const playerBase:SpawnerBuildingDTO = <SpawnerBuildingDTO>this.buildingsRepository.findOneBy(filter);

            this.buildingsNgrxReposioryService.watchBuilding(playerBase.id).subscribe((building: BuildingDTO) => {
                const base: BaseEntityDTO = <BaseEntityDTO>building;
                matterText.text = base.resources.matter;
                energyText.text = base.resources.energy;
                matterText.sync();
                energyText.sync();
            });
        });
    }

    private loadResourceIcons(): void {
        const loadMatterIconPromise = this.loadMatterIcon();
        const loadEnergyIconPromise = this.loadEnergyIcon();

        Promise.all([loadMatterIconPromise, loadEnergyIconPromise]).then(() => {
            this.updateHUDSprites();
            this.areSpritesLoaded = true;
        });
    }

    private createHudBackground(): void {
        const width = window.innerWidth ;
        const height = window.innerHeight;

        const roundedRectShape = new THREE.Shape();

        ( function roundedRect( ctx, x, y, width, height, radius ) {

            ctx.moveTo( x, y + radius );
            ctx.lineTo( x, y + height - radius );
            ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
            ctx.lineTo( x + width - radius, y + height );
            ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
            ctx.lineTo( x + width, y + radius );
            ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
            ctx.lineTo( x + radius, y );
            ctx.quadraticCurveTo( x, y, x, y + radius );

        } )( roundedRectShape, 0, 0, 160, 60, 10 );

        const geometry = new THREE.ShapeGeometry( roundedRectShape );
        geometry.translate(0, -60, 0);
        this.resourcesHolder = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
        this.sceneOrtho.add( this.resourcesHolder );
    }

    private loadMatterIcon(): Promise<boolean> {
        const textureLoader = new SVGLoader();

        return new Promise((resolve, reject) => {
            textureLoader.load("assets/icons/matter_icon.svg", (data) => {
                const color = new THREE.Color("rgb(154, 74, 230)");
                this.spriteMatter = this.createSvgSprite(data, color);
                this.spriteMatter.position.set(10, -this.resourcesHolderTopMargin, 0);
                this.resourcesHolder.add(this.spriteMatter);
                //this.sceneOrtho.add(this.spriteMatter);
                resolve(true);
            });
        });
    }

    private loadEnergyIcon(): Promise<boolean> {
        const textureLoader = new SVGLoader();

        return new Promise((resolve, reject) => {
            textureLoader.load("assets/icons/energy_icon.svg", (data) => {
                const color = new THREE.Color("rgb(66, 66, 250)");
                this.spriteEnergy = this.createSvgSprite(data, color);
                this.spriteEnergy.position.set(10, -this.spriteSize - this.resourcesHolderTopMargin, 0);
                this.resourcesHolder.add(this.spriteEnergy);
                //this.sceneOrtho.add(this.spriteEnergy);
                resolve(true);
            });
        });
    }

    private createSvgSprite(data: SVGResult, color: THREE.Color): THREE.Group {
        const paths = data.paths;
        const group = new THREE.Group();
        //group.scale.multiplyScalar(2);
        group.scale.y *= - 1;

        for (let i = 0; i < paths.length; i++) {

            const path = paths[i];

            if (path.userData) {
                const fillColor = path.userData.style.fill;

                if (fillColor !== undefined && fillColor !== 'none') {
                    const material = new THREE.MeshBasicMaterial({
                        color: color,
                        opacity: path.userData.style.fillOpacity,
                        transparent: path.userData.style.fillOpacity < 1,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                    });

                    const shapes = path.toShapes(false);

                    for (let j = 0; j < shapes.length; j++) {

                        const shape = shapes[j];

                        const geometry = new THREE.ShapeGeometry(shape);
                        const mesh = new THREE.Mesh(geometry, material);

                        group.add(mesh);

                    }
                }
            }
        }

        return group;
    }

    private updateHUDSprites() {

        const iconBarOffset = 40;
        let neededOfset = 0;
        const margin = 10;

        if (!this.inFullScreenMode) {
            neededOfset = iconBarOffset;
        }

        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;

        this.resourcesHolder.position.set(- width + neededOfset + margin, height - margin, 1);
    }

    private onWindowResize(width: number, height: number): void {
        if (this.areSpritesLoaded) {
            this.cameraOrtho.left = - width / 2;
            this.cameraOrtho.right = width / 2;
            this.cameraOrtho.top = height / 2;
            this.cameraOrtho.bottom = - height / 2;
            this.cameraOrtho.updateProjectionMatrix();

            this.updateHUDSprites();
        }
    }
    
    private isInVrMode(): boolean {
        // AFrame has a problem, it says the player is in VR when is playing on in full screen descktop
        // so we have to check if the player is really in VR
        return this.inFullScreenMode && utils.device.checkHeadsetConnected();
    }

}