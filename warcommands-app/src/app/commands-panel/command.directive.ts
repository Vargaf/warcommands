import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[warcommandsCommandDirective]'
})
export class CommandDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
