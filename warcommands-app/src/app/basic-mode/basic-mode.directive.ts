import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[basic-mode-component-directive]'
})
export class BasicModeComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
