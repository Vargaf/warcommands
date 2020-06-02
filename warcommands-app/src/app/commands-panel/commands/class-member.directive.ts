import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[class-member]'
})
export class ClassMemberDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}