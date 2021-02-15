import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[command-directive]'
})
export class CommandDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
