import { Injectable } from "@angular/core";
import { HammerGestureConfig } from "@angular/platform-browser";
import * as Hammer from 'hammerjs';

@Injectable()
export class DepHammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { enable: true, direction: Hammer.DIRECTION_ALL },
    pan: { enable: true, direction: Hammer.DIRECTION_ALL },
    pinch: { enable: false },
    rotate: { enable: false }
  };
}