import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  MatTable,
  MatTableModule
} from '@angular/material/table';
import { MatSelectionColumnComponent } from './selection-column.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'mat-selection-test',
  template: `<mat-table>
    <mat-selection-column></mat-selection-column>
  </mat-table>`
})
class MatSelectionTestComponent {}

describe('MatSelectionColumnComponent: ', () =>
{
  let fixture: ComponentFixture<MatTable<any>>;
  let tableComponent: MatTable<any>;
  let columnComponent: MatSelectionColumnComponent<any>;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports:      [MatTableModule],
      declarations: [MatSelectionColumnComponent]
    });

    fixture = TestBed.createComponent(MatTable);
    tableComponent = fixture.componentInstance;
    // columnComponent = fixture.debugElement.query(By.directive(MatSelectionColumnComponent)).nativeElement;
  });

  it('should create', () =>
  {
    expect(tableComponent).toBeTruthy();
    // expect(columnComponent).toBeTruthy();
  });
});
