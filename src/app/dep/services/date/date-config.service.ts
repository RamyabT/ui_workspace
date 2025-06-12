import { Injectable } from "@angular/core";
import { FpxDateConfiguration } from "@fpx/core";

@Injectable({ providedIn: "root" })
export class CustomDateService extends FpxDateConfiguration {
  constructor() {
    super();
    this.setApiDateFormat("YYYY-MM-DD");
    this.setDisplayDateFormat("DD MMM YYYY");
  }
}
