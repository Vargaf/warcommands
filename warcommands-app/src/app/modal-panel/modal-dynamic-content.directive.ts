import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appModalDynamicContent]'
})
export class ModalDynamicContentDirective {

    constructor(public viewContainerRef: ViewContainerRef) {}

}
