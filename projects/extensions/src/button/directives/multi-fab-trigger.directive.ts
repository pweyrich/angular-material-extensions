import {Directive, Input, TemplateRef, HostListener, ViewContainerRef, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';

@Directive({
    selector: 'button[multiFabTriggerFor]'
})
export class MultiFabTriggerDirective implements AfterViewInit, OnDestroy
{
 @Input('multiFabTriggerFor') template:TemplateRef<any>;

 private _portal:TemplatePortal;
 private _overlayRef:OverlayRef;

 constructor(
     private elRef:ElementRef,
     private vcRef:ViewContainerRef,
     private overlay:Overlay
){}

 ngAfterViewInit() {
    this._portal = new TemplatePortal(this.template, this.vcRef);
    this._overlayRef = this.overlay.create({
    //   positionStrategy: this.overlay.position().flexibleConnectedTo(this.elRef),
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
