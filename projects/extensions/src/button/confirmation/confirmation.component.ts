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
    <ng-container [ngSwitch]="content | confirmationContentType">
      <ng-container *ngSwitchCase="'string'">
        {{content}}
      </ng-container>
      <ng-container *ngSwitchCase="'template'">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </ng-container>
    </ng-container>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true">Confirm</button>
  </mat-dialog-actions>`,
})
export class ConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public content: TemplateRef<any> | string
  ) {}
}
