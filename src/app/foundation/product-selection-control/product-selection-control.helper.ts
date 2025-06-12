import { Injectable } from '@angular/core';
import { BaseFpxControlHelper, LookUpFn } from '@fpx/core';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class ProductSelectionControlHelper extends BaseFpxControlHelper {

    constructor() {
        super();
    }

    public override doPostLookupInterceptor(data: Observable<any>): Observable<any> {

        console.log(data);
        return data.pipe(
            map(
                (obj) => {
                    let list = obj.map((_d: any) => {
                        return {
                            id: _d.productCode,
                            text: _d
                        }
                    });
                    return list;
                }
            )
        );
    }
}