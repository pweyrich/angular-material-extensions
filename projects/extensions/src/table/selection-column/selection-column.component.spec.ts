import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  MatTable,
  MatTableModule
} from '@angular/material/table';
import { MatSelectionColumnComponent } from './selection-column.component';
import { noop } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

const matTableStub: Partial<MatTable<number>> = {
  addColumnDef: noop,
  removeColumnDef: noop,
  dataSource: [1, 2, 3]
};

describe('MatSelectionColumnComponent: ', () =>
{
  let fixture: ComponentFixture<MatSelectionColumnComponent<number>>;
  let component: MatSelectionColumnComponent<number>;

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

    fixture = TestBed.createComponent<MatSelectionColumnComponent<number>>(MatSelectionColumnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should register itself in the table during initialization', () =>
  {
    const matTable = TestBed.inject(MatTable);
    const addColumnDefSpy = spyOn(matTable, 'addColumnDef');

    component.ngOnInit();

    expect(addColumnDefSpy).toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the table when it is destroyed', () =>
  {
    const matTable = TestBed.inject(MatTable);
    const removeColumnDefSpy = spyOn(matTable, 'removeColumnDef');

    component.ngOnDestroy();

    expect(removeColumnDefSpy).toHaveBeenCalledTimes(1);
  });

  it(`should update the columnDef's name with the value of the #name input`, () =>
  {
    component.name = 'test';

    component.ngOnInit();

    expect(component.columnDef.name).toBe(component.name);
  });

  it(`should set the columnDef's name with a default value of 'select'`, () =>
  {
    component.ngOnInit();
    expect(component.columnDef.name).toBe('select');
  });

  describe('with SelectionModel', () =>
  {
    beforeEach(() =>
    {
      component.selection = new SelectionModel<number>(true);
    });
  });
});
