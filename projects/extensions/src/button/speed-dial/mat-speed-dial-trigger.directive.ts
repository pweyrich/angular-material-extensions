import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { MatSpeedDialComponent } from './mat-speed-dial.component';

@Directive({
  selector: 'button[matSpeedDialTrigger]',
  exportAs: 'matSpeedDialTrigger'
})
export class MatSpeedDialTrigger implements OnInit, OnDestroy {
  @Input('matSpeedDialTrigger') speedDial: MatSpeedDialComponent;

  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;

  constructor(
    private _elRef: ElementRef,
    private _vcRef: ViewContainerRef,
    private _overlay: Overlay
  ) { }

  ngOnInit() {
    this._portal = new TemplatePortal(this.speedDial.templateRef, this._vcRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._elRef).withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]),
      hasBackdrop: true
    });
    this._overlayRef.backdropClick().subscribe(() => this.close());
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  @HostListener('click')
  public onHostClick(): void {
    if (!this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  public open(): void {
      this._overlayRef.attach(this._portal);
  }

  public close(): void {
    this._overlayRef.detach();
  }

  get isOpen(): boolean {
    return this._overlayRef?.hasAttached();
  }

  @HostBinding('style.zIndex')
  get zIndex(): number {
    return this.isOpen ? 1001 : null;
  }
}
