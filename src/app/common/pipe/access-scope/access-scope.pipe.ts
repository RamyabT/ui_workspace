import { Pipe, PipeTransform } from '@angular/core';
import { CustomMenuService } from 'src/app/dep/services/menu-service/custom-menu.service';

@Pipe({ name: 'AccessScope' })
export class AccessScopePipe implements PipeTransform {
    constructor(
        private _menuService: CustomMenuService,
    ) { }
    transform(serviceCode: string): boolean {
        let allowedServices:boolean =false
        if (this._menuService?.allowedServices && serviceCode in this._menuService?.allowedServices) {
            allowedServices =true;
        }
        else {
            allowedServices =false;
        }
        return allowedServices;
    }
}