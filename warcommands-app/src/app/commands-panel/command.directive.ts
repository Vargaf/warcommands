import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[warcommandsCommandDirective]',
    standalone: false
})
export class CommandDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
