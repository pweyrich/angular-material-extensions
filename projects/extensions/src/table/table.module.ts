import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectionColumnComponent } from './selection-column/selection-column.component';



@NgModule({
  declarations: [
    MatSelectionColumnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatSelectionColumnComponent
  ]
})
export class MatExtensionsTableModule { }
