import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

export interface State
{
  name: string;
  population: number;
}

export const states: State[] = [
  {
    name:       'Hessen',
    population: 1223415
  },
  {
    name:       'Saarland',
    population: 21451
  }
];

@Component({
  selector: 'app-selection-column',
  template: `<table mat-table [dataSource]="data" class="full-width">
    <mat-selection-column name="select" [selection]="selection"></mat-selection-column>

    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let element;">{{element.name}}</td>
    </ng-container>

    <ng-container matColumnDef="population">
      <th mat-header-cell *matHeaderCellDef> Population </th>
      <td mat-cell *matCellDef="let element;">{{element.population}}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>`,
  styles: ['.full-width { width: 100% }'],
})
export class SelectionColumnComponent {

  data = states;
  displayedColumns = ['select', 'name', 'population'];
  selection = new SelectionModel<State>(true);

  constructor() { }

}
