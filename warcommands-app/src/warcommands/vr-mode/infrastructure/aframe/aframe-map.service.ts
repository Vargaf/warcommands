import { NgZone } from '@angular/core';
import { THREE } from 'aframe';
import { MapDTO } from 'src/warcommands/game-middleware/model/map/map.dto';
import { TileType } from 'src/warcommands/game-middleware/model/map/tile-type.enum';
import { TileDTO } from 'src/warcommands/game-middleware/model/map/tile.dto';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ModelLoaderInterfaceService } from '../../domain/game-engine/model-loader-abstract.service';
import { AframeSceneService } from './aframe-scene.service';

/*
*	Inspired on this posts:
*		https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
*		https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_performance.html
*		https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_indexed.html
*		https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
*/

export class AframeMapService {

	private componentName = 'map-component';
	private map!: MapDTO;

	private topTile!: any;
	private trees: any[] = [];

	private voxelFaces = [
		{ // left
			dir: [-1, 0, 0,],
			corners: [
				[0, 1, 0],
				[0, 0, 0],
				[0, 1, 1],
				[0, 0, 1],
			],
		},
		{ // right
			dir: [1, 0, 0,],
			corners: [
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 0],
				[1, 0, 0],
			],
		},
		{ // back
			dir: [0, 0, -1,],
			corners: [
				[1, 0, 0],
				[0, 0, 0],
				[1, 1, 0],
				[0, 1, 0],
			],
		},
		{ // front
			dir: [0, 0, 1,],
			corners: [
				[0, 0, 1],
				[1, 0, 1],
				[0, 1, 1],
				[1, 1, 1],
			],
		},
	];

	constructor(
		private readonly ngZone: NgZone,
		private readonly modelLoader: ModelLoaderInterfaceService,
		private readonly aframeSceneService: AframeSceneService,
	) {

		const serviceScope = this;

		this.ngZone.runOutsideAngular(() => {
			AFRAME.registerComponent(this.componentName, {
				init: function () {
					const mapGenerated = serviceScope.generateMap();
					this.el.setObject3D('mesh', mapGenerated);
				}
			});
		});
	}

	createMap(map: MapDTO): void {
		this.map = map;

		const promiseList = [];
		promiseList.push(this.modelLoader.loadPreloadedModel('TopTile'));
		promiseList.push(this.modelLoader.loadPreloadedModel('Tree_01'));
		promiseList.push(this.modelLoader.loadPreloadedModel('Tree_02'));
		promiseList.push(this.modelLoader.loadPreloadedModel('Tree_03'));
		promiseList.push(this.modelLoader.loadPreloadedModel('Tree_04'));
		promiseList.push(this.modelLoader.loadPreloadedModel('Tree_05'));
		promiseList.push(this.modelLoader.loadPreloadedModel('Tree_06'));

		Promise.all(promiseList).then((loadedGeometries) => {
			this.topTile = loadedGeometries[0];
			this.trees.push(
				loadedGeometries[1],
				loadedGeometries[2],
				loadedGeometries[3],
				loadedGeometries[4],
				loadedGeometries[5],
				loadedGeometries[6]);

			this.createMapElement();
		});
	}

	private createMapElement(): void {
		var mapElelement = document.createElement('a-entity');
		mapElelement.setAttribute(this.componentName, true);
		this.aframeSceneService.getSceneElement().appendChild(mapElelement);
	}

	private needsFace(xCoordinate: number, yCoordinate: number): boolean {

		let needsFace = false;
		const isxCoordinateInsideMap = 0 <= xCoordinate && xCoordinate < this.map.size.width;
		const isyCoordinateInsideMap = 0 <= yCoordinate && yCoordinate < this.map.size.height;

		if (isxCoordinateInsideMap && isyCoordinateInsideMap) {
			const tileIndex = xCoordinate + (this.map.size.width * yCoordinate);
			const tile = this.map.tiles[tileIndex];
			if (tile.type === TileType.Water) {
				needsFace = true;
			}
		} else {
			needsFace = true;
		}

		return needsFace;
	}

	private generateMap(): THREE.Group {

		const topTileHeight = 0.05;
		const topTileSize = 1;
		const waterTileOfset = 0.3;

		const geometries: THREE.BufferGeometry[] = [];

		// Get the TopTile mesh to replicate to create the map
		const topTileGeometry: THREE.BufferGeometry = (this.topTile as any).geometry;

		// We need to remove this attributes in order to be able to merge the faces sorrounding the map
		topTileGeometry.deleteAttribute('tangent');
		topTileGeometry.deleteAttribute('uv');

		for (const mapTile of this.map.tiles) {
			const newTopTile = <THREE.BufferGeometry>topTileGeometry?.clone();
			newTopTile.translate(mapTile.xCoordinate, -topTileHeight / 2, mapTile.yCoordinate);

			// The water tiles will go on a lover level
			if(mapTile.type === TileType.Water) {
				newTopTile.translate(0, -waterTileOfset, 0);
			}

			// Set the tile color
			let tileColor = this.getTileColor(mapTile);
			const dinamicColor = new THREE.Color(tileColor);

			const colorVertices = [];
			const originalGeometriVertices = topTileGeometry?.getAttribute('position') as THREE.BufferAttribute;
			const colorVerticesCount = originalGeometriVertices.count;
			for (let colorIndex = 0; colorIndex < colorVerticesCount; colorIndex++) {
				colorVertices.push(dinamicColor.r, dinamicColor.g, dinamicColor.b);
			}

			const colorBufferAttribute = new THREE.Float32BufferAttribute(colorVertices, 3);
			newTopTile.setAttribute('color', colorBufferAttribute);
			geometries.push(<THREE.BufferGeometry>newTopTile);

			// Check if the tile needs a face to border the map or water tiles
			if (mapTile.type !== TileType.Water) {
				for (const { dir, corners } of this.voxelFaces) {
					const needsFace = this.needsFace(
						mapTile.xCoordinate + dir[0],
						mapTile.yCoordinate + dir[2]);
					if (needsFace) {

						const facePositions = [];
						const faceNormals = [];
						const faceIndices = [];
						const faceColors = [];

						// this voxel has no neighbor in this direction so we need a face
						// here.
						const ndx = facePositions.length / 3;
						for (const pos of corners) {
							facePositions.push(
								pos[0] + mapTile.xCoordinate - topTileSize / 2, 
								pos[1] - 1 - topTileHeight, 
								pos[2] + mapTile.yCoordinate - topTileSize / 2);
							faceNormals.push(...dir);
							faceColors.push(dinamicColor.r, dinamicColor.g, dinamicColor.b);
						}
						faceIndices.push(
							ndx, ndx + 1, ndx + 2,
							ndx + 2, ndx + 1, ndx + 3,
						);

						const facesGeometry = new THREE.BufferGeometry();
						facesGeometry.setAttribute(
							'position',
							new THREE.BufferAttribute(new Float32Array(facePositions), 3));
						facesGeometry.setAttribute(
							'normal',
							new THREE.BufferAttribute(new Float32Array(faceNormals), 3));
						facesGeometry.setAttribute(
							'color',
							new THREE.BufferAttribute(new Float32Array(faceColors), 3));
						facesGeometry.setIndex(faceIndices);
						geometries.push(facesGeometry);
					}
				}
			}

			if(mapTile.type === TileType.Tree) {
				const tree = this.generateTreeGeometry();
				tree.translate(mapTile.xCoordinate, 0, mapTile.yCoordinate);
				geometries.push(tree);
			}
		}

		const meshMaterial = new THREE.MeshStandardMaterial();
		meshMaterial.vertexColors = true;

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
		mergedGeometry.computeBoundingBox();

		const mesh = new THREE.Mesh(mergedGeometry, meshMaterial);
		mesh.name = 'GeneratedMap';

		const group = new THREE.Group();
		group.add(mesh);

		return group;
	}

	private generateTreeGeometry(): THREE.BufferGeometry {

		const random = Math.floor(Math.random() * this.trees.length);
		const randomTree = this.trees[random];

		const treeClone = randomTree.geometry.clone();
		const treeColorAttribute16 = treeClone.getAttribute('color');
		const color16 = [];
		const color16Size = treeColorAttribute16.count * treeColorAttribute16.itemSize;
		for(let x = 0; x < color16Size; x++) {
			if(x < 2 || (x + 1) % 4 != 0) {
				const glslValue = 1/ 65535 * treeColorAttribute16.array[x]; 
				color16.push(glslValue);
			}
		}
		const color32 = new Float32Array(color16);
		treeClone.setAttribute(
			'color',
			new THREE.BufferAttribute(color32, 3));
		treeClone.scale(randomTree.scale.x, randomTree.scale.y, randomTree.scale.z);
		treeClone.translate(0, randomTree.position.y, 0);

		return treeClone;
	}
	
	private getTileColor(tile: TileDTO): string {
		
		let tileColor = '';
		switch (tile.type) {
			case TileType.Grass:
				tileColor = 'darkgreen';
				break;
			case TileType.Sand:
				tileColor = 'darkgoldenrod';
				break;
			case TileType.Rock:
				tileColor = 'gray';
				break;
			case TileType.Water:
				tileColor = 'dodgerblue';
				break;
			case TileType.Tree:
				tileColor = 'green';
				break;

			default:
				throw new Error('Tile type not recognized.');
				break;
		}

		return tileColor;
	}
}