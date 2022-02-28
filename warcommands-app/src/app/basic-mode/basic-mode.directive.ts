import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[warcommandsBasicModeComponentDirective]'
})
export class BasicModeComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
