import {
  Directive,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import {
  MatMenuPanel,
  MatMenuTrigger
} from '@angular/material/menu';
import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  skip,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Directive({
  selector: '[matMenuHoverTriggerFor]',
})
/*tslint:disable-next-line:directive-class-suffix*/
export class MenuHoverTrigger extends MatMenuTrigger implements OnInit
{
  @Input('matMenuHoverTriggerFor')
  get hoverMenu(): MatMenuPanel
  {
    return this.menu;
  }
  set hoverMenu(menu: MatMenuPanel)
  {
    menu.hasBackdrop = true; // force the menu to have a backdrop
    this.menu = menu;
  }

  private mouseEnter$ = new Subject<MouseEvent>();
  private mouseLeave$ = new Subject<MouseEvent>();
  private backdropHover$ = new Subject<MouseEvent>();
  private backdropExited$ = new Subject<MouseEvent>();

  public ngOnInit(): void
  {
    this.mouseEnter$.pipe(
      tap(() => this.openMenu()),
      tap(() => {
        /*tslint:disable-next-line:no-string-literal*/
        const overlayRef = (this['_overlayRef'] as OverlayRef);
        overlayRef.backdropElement.onmouseenter = (event) => {this.backdropHover$.next(event); console.log('mouse entered backdrop'); };
        overlayRef.backdropElement.onmouseleave = (event) => {this.backdropExited$.next(event); console.log('mouse left backdrop'); };
      }),
      switchMap(() => this.backdropHover$.pipe(
        takeUntil(this.menuClosed),
        skip(1),
        tap(() => console.log('left menu')),
        tap(() => this.closeMenu())
      ))
    ).subscribe();
  }

  @HostListener('mouseenter') _handleMouseEnter(event: MouseEvent) {
    // see first answer in this thread
    // (https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover)
    // to figure out why mouseleave event is emitted when opening the menu
    this.mouseEnter$.next(event);
    console.log('entered');
  }

  @HostListener('mouseleave') _handleMouseLeave(event: MouseEvent) {
    this.mouseLeave$.next(event);
    console.log('leave');
  }
}
