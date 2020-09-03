import {
  Component,
  Inject,
  TemplateRef
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mat-confirmation',
  template: `<h2 mat-dialog-title>Confirmation</h2>
  <mat-dialog-content>
    <ng-container *ngTemplateOutlet="templateRef"></ng-container>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true">Confirm</button>
  </mat-dialog-actions>`,
})
export class ConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public templateRef: TemplateRef<any>
  ) {}
}
