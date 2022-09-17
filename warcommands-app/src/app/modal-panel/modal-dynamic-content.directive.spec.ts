import {ModalDynamicContentDirective} from './modal-dynamic-content.directive';

describe('ModalDynamicContentDirective', () => {

    function setup() {
        const viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', ['a']);

        const directive = new ModalDynamicContentDirective(viewContainerRefSpy);
        return {directive, viewContainerRefSpy};
    }

    it('should create an instance', () => {
        const {directive, viewContainerRefSpy} = setup();
        expect(directive).toBeTruthy();
    });
});
