import { BeneccService } from './../benecc-service/benecc.service';
import { Injectable } from '@angular/core';
import { BaseFpxControlHelper, CriteriaQuery } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { Benecc } from '../benecc-service/benecc.model';


@Injectable()
export class BeneccListControlHelper extends BaseFpxControlHelper{
    selectableDataList$: any;
constructor(
    private beneCCService: BeneccService
) 
    {
        super();
     
    }
        override doPreInit(): void {
            let criteriaQuery =  new CriteriaQuery()
            this.beneCCService.findAll(criteriaQuery)().subscribe({
                next:(beneList: any)=> {
                    beneList.data.map((item:Benecc ) => item.id = item.inventoryNumber);
                    this.selectableDataList$ = of(beneList.data)
                },
                error:(err)=> {
                    
                },
            })
        }
   
   
     public override doPostInit(): void {
     }


}