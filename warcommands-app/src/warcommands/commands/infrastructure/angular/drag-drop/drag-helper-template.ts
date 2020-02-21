import { TemplateRef, ViewContainerRef } from '@angular/core';

export interface DragHelperTemplate<T = any> {
    template: TemplateRef<T> | null;
    viewContainer: ViewContainerRef;
    context: T;
}