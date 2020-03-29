import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectionColumnComponent } from './selection-column/selection-column.component';


/**
 * @description Exports all the extensions for material's table component
 */
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
