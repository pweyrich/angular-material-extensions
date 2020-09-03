import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDirective } from './confirmation.directive';
import { ConfirmationComponent } from './confirmation.component';
import { ConfirmationContentTypePipe } from './confirmation-content-type.pipe';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [ConfirmationDirective, ConfirmationComponent, ConfirmationContentTypePipe],
  exports: [ConfirmationDirective]
})
export class ConfirmationModule {}
