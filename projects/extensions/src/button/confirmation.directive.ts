import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Optional,
  Output,
  TemplateRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation.component';
import { filter } from 'rxjs/operators';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: 'button[withConfirmation]'
})
export class ConfirmationDirective
{
  @Input('withConfirmation') templateRef: TemplateRef<any>;

  @Output() confirmed: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLButtonElement>,
    private dialog: MatDialog,
    @Optional() private button: MatButton
  ) {
    if (this.button) {
      this.button.color = 'warn';
    }
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: this.templateRef
    });

    dialogRef.afterClosed().pipe(
      filter(confirmed => confirmed)
    ).subscribe(() => {
      this.confirmed.next(event);
    });
  }
}
