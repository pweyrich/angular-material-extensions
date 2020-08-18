import { Directive, Input, TemplateRef, HostListener, ViewContainerRef, ElementRef, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Directive({
  selector: 'button[multiFabTriggerFor]',
  exportAs: 'multiFab'
})
export class MultiFabTriggerDirective implements OnInit, OnDestroy {
  @Input('multiFabTriggerFor') template: TemplateRef<any>;

  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;

  constructor(
    private _elRef: ElementRef,
    private _vcRef: ViewContainerRef,
    private _overlay: Overlay
  ) { }

  ngOnInit() {
    this._portal = new TemplatePortal(this.template, this._vcRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._elRef).withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]),
      hasBackdrop: true
    });
    this._overlayRef.overlayElement.style.display = 'grid';
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
    this._overlayRef.detach()
  }

  get isOpen(): boolean {
    return this._overlayRef?.hasAttached();
  }

  @HostBinding('style.zIndex')
  get zIndex(): number {
    return this.isOpen ? 1001 : null;
  }
}
