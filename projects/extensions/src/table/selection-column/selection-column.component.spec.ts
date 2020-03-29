import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  MatColumnDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import { MatSelectionColumnComponent } from './selection-column.component';
import { noop } from 'rxjs';

const matTableStub: Partial<MatTable<any>> = {
  addColumnDef: (columnDef: MatColumnDef) => noop(),
  removeColumnDef: (columnDef: MatColumnDef) => noop(),
};

describe('MatSelectionColumnComponent: ', () =>
{
  let fixture: ComponentFixture<MatSelectionColumnComponent<any>>;
  let component: MatSelectionColumnComponent<any>;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports:      [MatTableModule],
      declarations: [MatSelectionColumnComponent],
      providers: [{
        provide: MatTable,
        useValue: matTableStub
      }]
    });

    fixture = TestBed.createComponent(MatSelectionColumnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should register itself in the table during intialization', () =>
  {
    const matTable = TestBed.inject(MatTable);
    const addColumnDefSpy = spyOn(matTable, 'addColumnDef');

    component.ngOnInit();

    expect(addColumnDefSpy).toHaveBeenCalledTimes(1);
  });
});
