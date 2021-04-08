import { Renderer2, RendererFactory2 } from "@angular/core";
import { Subject } from "rxjs";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { AframeSceneService } from "../aframe-scene.service";


export class AframeGtlfModelLoader implements ModelLoaderInterfaceService {
    
    private renderer: Renderer2;

    private modelLoaderElement: any;

    private modelList: Map<string, any> = new Map();

    private modelLoadedSubject: Subject<any> = new Subject();

    private modelLoaderelementId = 'model_loader';

    constructor(
        private readonly sceneService: AframeSceneService,
        private readonly rendererFactory: RendererFactory2
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);

        this.sceneService.isLoaded().then(() => {
            this.createModelLoaderStorageElement();
            this.setLoaderListener();
        });
    }

    loadPreloadedModel(modelName: string): Promise<any> {

        if(!document.getElementById(modelName)) {
            throw new Error('Asset item "' + modelName + '" does not found.' );
        }

        var modelToLoadElement = this.renderer.createElement('a-gltf-model');
		modelToLoadElement.setAttribute('id', 'model_to_load_' + modelName);
		modelToLoadElement.setAttribute('src', '#' + modelName);
		this.modelLoaderElement.appendChild(modelToLoadElement);

        const modelLoadedPromise: Promise<any> = new Promise((resolve, reject) => {
            if(this.modelList.has(modelName)) {
                resolve(this.modelList.get(modelName));
            } else {
                const subscription = this.modelLoadedSubject.subscribe((data) => {
                    const modelLoadedSubscription = subscription;
                    // Grab the mesh / scene.
                    const obj = data.target.getObject3D('mesh');

                    if (!obj) {
                        return;
                    }

                    // Get the requested model node
                    let modelNode;
                    obj.traverse((node : any) => {
                        if (node.name.indexOf(modelName) !== -1) {
                            modelNode = (node as any).clone();
                        }
                    });

                    if (modelNode) {
                        this.modelList.set(modelName, modelNode);
                        this.renderer.removeChild(this.modelLoaderElement, data.srcElement);
                        resolve(modelNode);
                        setTimeout(() => {
                            modelLoadedSubscription.unsubscribe();    
                        }, 0);
                    }
                });
            }
        });

        

        return modelLoadedPromise;
    }

    loadComponent(modelId: string, modelName: string, position: THREE.Vector3, ): void {
        var modelToLoadElement = this.renderer.createElement('a-gltf-model');
		modelToLoadElement.setAttribute('id', modelId);
		modelToLoadElement.setAttribute('src', '#' + modelName);
        this.modelLoaderElement.appendChild(modelToLoadElement);
    }

    private createModelLoaderStorageElement(): void {
        var modelLoaderElement = this.renderer.createElement('a-entity');
		modelLoaderElement.setAttribute('id', this.modelLoaderelementId);
		modelLoaderElement.setAttribute('visible', false);
		this.scene().appendChild(modelLoaderElement);

        this.modelLoaderElement = modelLoaderElement;
    }

    private scene() {
        return this.sceneService.getSceneElement();
    }

    private setLoaderListener(): void {
        this.scene().addEventListener('model-loaded', (data) => {
            if(this.isModelLoadedByThisService(data)) {
                this.modelLoadedSubject.next(data);
            }
        });
    }

    private isModelLoadedByThisService(modelData: any): boolean {
        let isMoldelLoadedByThisService = false;

        const parentElement = (modelData as any).path[1];
        const elementId = (parentElement as any).getAttribute('id');
        
        if(elementId === this.modelLoaderelementId) {
            isMoldelLoadedByThisService = true;
        }

        return isMoldelLoadedByThisService;
    }
    
}