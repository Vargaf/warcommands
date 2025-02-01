import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[warcommandsClassMemberDirective]',
    standalone: false
})
export class ClassMemberDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
