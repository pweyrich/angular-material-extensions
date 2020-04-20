import {
  AfterViewInit,
  Directive,
  ElementRef
} from '@angular/core';
import {
  DragDrop,
  DragRef,
  DropListRef,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {
  MatHeaderCell,
  MatTable
} from '@angular/material/table';

@Directive({
  selector: '[matCustomHeader]'
})
export class CustomHeaderDirective implements AfterViewInit
{

  private dropListRef: DropListRef;
  private columns: Array<string> = [];

  constructor(private table: MatTable<any>, private headerRow: ElementRef, private dndService: DragDrop)
  {}

  public ngAfterViewInit(): void
  {
    this.dropListRef = this.createDropList(this.headerRow, this.createDrags(this.getHeaderCells(this.headerRow.nativeElement)));
    this.columns = this.table._contentHeaderRowDefs.first.columns as Array<string>;
    console.log(this.columns);
  }

  public drop(event: any): void
  {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  private getHeaderCells(rowElem: Element): Array<MatHeaderCell>
  {
    return Array.from(rowElem.children);
  }

  private createDrags(cellRefs: Array<MatHeaderCell>): Array<DragRef>
  {
    return cellRefs.map((cellRef: MatHeaderCell) =>
    {
      const drag: DragRef = this.dndService.createDrag(cellRef as ElementRef);
      drag.lockAxis = 'x';
      return drag;
    });
  }

  private createDropList(headerRowDef: ElementRef, drags: Array<DragRef>): DropListRef
  {
    const dropListRef: DropListRef = this.dndService.createDropList(headerRowDef);
    dropListRef.withItems(drags);
    dropListRef.withOrientation('horizontal');
    dropListRef.dropped.subscribe((event: {
      item: DragRef;
      currentIndex: number;
      previousIndex: number;
      container: DropListRef<any>;
      previousContainer: DropListRef<any>;
      isPointerOverContainer: boolean;
    }) => this.drop(event));
    return dropListRef;
  }

}
