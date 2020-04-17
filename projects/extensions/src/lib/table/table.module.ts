import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderDirective } from './directives/custom-header.directive';

@NgModule({
  declarations: [
    CustomHeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomHeaderDirective
  ]
})
export class MatExtensionsTableModule { }
