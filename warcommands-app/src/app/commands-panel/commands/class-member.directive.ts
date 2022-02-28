import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[warcommandsClassMemberDirective]'
})
export class ClassMemberDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
