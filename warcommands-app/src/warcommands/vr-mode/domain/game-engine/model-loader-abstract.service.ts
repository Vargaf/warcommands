
export abstract class ModelLoaderInterfaceService {

    abstract loadPreloadedModel(modelId: string): Promise<any>;

}