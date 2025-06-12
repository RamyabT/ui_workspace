import { NgModule } from "@angular/core";
import { QRCodeModule } from "angularx-qrcode";
import { SlickCarouselModule } from "ngx-slick-carousel";

@NgModule({
    exports: [
        SlickCarouselModule,
        QRCodeModule
    ]
})

export class ThirdPartyModule {}