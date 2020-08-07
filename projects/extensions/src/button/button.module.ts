import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MultiFabTriggerDirective } from './directives/multi-fab-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [MultiFabTriggerDirective],
    exports: [MultiFabTriggerDirective]
})
export class MatButtonExtensionsModule {}