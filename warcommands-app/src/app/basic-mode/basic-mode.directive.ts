import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[warcommandsBasicModeComponentDirective]',
    standalone: false
})
export class BasicModeComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
