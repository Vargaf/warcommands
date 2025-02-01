import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appModalDynamicContent]',
    standalone: false
})
export class ModalDynamicContentDirective {

    constructor(public viewContainerRef: ViewContainerRef) {}

}
