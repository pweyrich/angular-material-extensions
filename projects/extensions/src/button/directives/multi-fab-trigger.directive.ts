import {Directive, Input, TemplateRef, HostListener, ViewContainerRef, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Directive({
    selector: 'button[multiFabTriggerFor]'
})
export class MultiFabTriggerDirective implements AfterViewInit, OnDestroy
{
 @Input('multiFabTriggerFor') template:TemplateRef<any>;

 private _portal:TemplatePortal;
 private _overlayRef:OverlayRef;

 constructor(
     private _elRef:ElementRef,
     private _vcRef:ViewContainerRef,
     private _overlay:Overlay
){}

 ngAfterViewInit() {
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
    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

 @HostListener('click')
 onHostClick() {
     this._overlayRef.attach(this._portal);
 }
}
