import {
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'mat-speed-dial',
  templateUrl: './mat-speed-dial.component.html',
  styleUrls: ['./mat-speed-dial.component.scss']
})
export class MatSpeedDialComponent {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
}
