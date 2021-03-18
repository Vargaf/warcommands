import { Renderer2, RendererFactory2 } from "@angular/core";
import { Subject } from "rxjs";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { AframeSceneService } from "../aframe-scene.service";


export class AframeGtlfModelLoader implements ModelLoaderInterfaceService {
    
    private renderer: Renderer2;

    private modelLoaderElement: any;

    private modelList: Map<string, any> = new Map();

    private modelLoadedSubject: Subject<any> = new Subject();

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

    loadPreloadedModel(modelId: string): Promise<any> {

        const modelLoadedPromise: Promise<any> = new Promise((resolve, reject) => {
            if(this.modelList.has(modelId)) {
                resolve(this.modelList.get(modelId));
            } else {
                const subscription = this.modelLoadedSubject.subscribe((data) => {
                    // Grab the mesh / scene.
                    const obj = data.target.getObject3D('mesh');

                    if (!obj) {
                        return;
                    }

                    // Get the requested model node
                    let modelNode;
                    obj.traverse((node : any) => {
                        if (node.name.indexOf(modelId) !== -1) {
                            modelNode = (node as any).clone();
                        }
                    });

                    if (modelNode) {
                        this.modelList.set(modelId, modelNode);
                        this.renderer.removeChild(this.modelLoaderElement, data.srcElement);
                        resolve(modelNode);
                    }
                });
            }
        });

        var modelToLoadElement = this.renderer.createElement('a-gltf-model');
		modelToLoadElement.setAttribute('id', 'model_to_load_' + modelId);
		modelToLoadElement.setAttribute('src', '#' + modelId);
		this.modelLoaderElement.appendChild(modelToLoadElement);

        return modelLoadedPromise;
    }

    private createModelLoaderStorageElement(): void {
        var modelLoaderElement = this.renderer.createElement('a-entity');
		modelLoaderElement.setAttribute('id', 'model_loader');
		modelLoaderElement.setAttribute('position', { x:0, y: -100, z:0 });
		this.scene().appendChild(modelLoaderElement);

        this.modelLoaderElement = modelLoaderElement;
    }

    private scene() {
        return this.sceneService.getSceneElement();
    }

    private setLoaderListener(): void {
        this.scene().addEventListener('model-loaded', (data) => {
            this.modelLoadedSubject.next(data);
        });
    }
    
}