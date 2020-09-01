import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSpeedDialTrigger } from './speed-dial/mat-speed-dial-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSpeedDialComponent } from './speed-dial/mat-speed-dial.component';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [MatSpeedDialTrigger, MatSpeedDialComponent],
    exports: [MatSpeedDialTrigger, MatSpeedDialComponent]
})
export class MatButtonExtensionsModule {}
