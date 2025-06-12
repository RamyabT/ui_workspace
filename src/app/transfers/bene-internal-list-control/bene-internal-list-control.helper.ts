import { Injectable } from '@angular/core';
import { BaseFpxControlHelper, CriteriaQuery } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { BeneinternalService } from '../beneinternal-service/beneinternal.service';
import { Beneinternal } from '../beneinternal-service/beneinternal.model';


@Injectable()
export class beneInternallistControlHelper extends BaseFpxControlHelper{
    selectableDataList$: any;
constructor(private beneinternalService: BeneinternalService) 
    {
        super();
     
    }

    override doPreInit(): void {
        let criteriaQuery =  new CriteriaQuery()
        this.beneinternalService.findAll()().subscribe({
            next:(beneList: any)=> {
                beneList.data.map((item: Beneinternal) => item.id = item.inventoryNumber);
                this.selectableDataList$ = of(beneList.data)
            },
            error:(err)=> {
                
            },
        })
    }
   
   
   
   
     public override doPostInit(): void {
     }


}