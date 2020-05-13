import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  Self,
  ViewContainerRef
} from '@angular/core';
import {
  MAT_MENU_SCROLL_STRATEGY,
  MatMenu,
  MatMenuItem,
  MatMenuPanel,
  MatMenuTrigger
} from '@angular/material/menu';
import { Subject } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import {
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import {
  skip,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Directive({
  selector: '[matMenuHoverTriggerFor]',
})
export class MenuHoverTrigger extends MatMenuTrigger implements OnInit
{
  @Input('matMenuHoverTriggerFor')
  get hoverMenu(): MatMenuPanel
  {
    return this.menu;
  }
  set hoverMenu(menu: MatMenuPanel)
  {
    this.menu = menu;
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
    console.log('left');
  }

  private mouseEnter$:Subject<MouseEvent> = new Subject();
  private mouseLeave$:Subject<MouseEvent> = new Subject();
  private backdropHover$:Subject<MouseEvent> = new Subject();

  constructor(private overlay: Overlay,
              private element: ElementRef<HTMLElement>,
              _viewContainerRef: ViewContainerRef,
              @Inject(MAT_MENU_SCROLL_STRATEGY) scrollStrategy: any,
              @Optional() private parentMenu: MatMenu,
              @Optional() @Self() private menuItemInstance: MatMenuItem,
              @Optional() _dir: Directionality)
  {
    super(overlay, element, _viewContainerRef, scrollStrategy, parentMenu, menuItemInstance, _dir);
  }

  public ngOnInit(): void
  {
    this.mouseEnter$.pipe(
      tap(() => this.openMenu()),
      tap(() => {
        const overlayRef = (this['_overlayRef'] as OverlayRef);
        overlayRef.backdropElement.onmouseenter = (event) => this.backdropHover$.next(event);
      }),
      switchMap(() => this.backdropHover$.pipe(
        takeUntil(this.menuClosed),
        skip(1),
        tap(() => this.closeMenu())
      ))
    ).subscribe();
  }
}
