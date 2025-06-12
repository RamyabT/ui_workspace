import { Injectable } from '@angular/core';
import { BaseFpxControlHelper, CriteriaQuery } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { BeneInternationalService } from '../beneInternational-service/beneInternational.service';
import { BeneInternational } from '../beneInternational-service/beneInternational.model';




@Injectable()
export class BeneInternationalListHelper extends BaseFpxControlHelper{
    selectableDataList$: any;
constructor(private beneinternalService: BeneInternationalService) 
    {
        super();
     
    }

    override doPreInit(): void {
        let criteriaQuery =  new CriteriaQuery()
        this.beneinternalService.findAll()().subscribe({
            next:(beneList: any)=> {
                beneList.data.map((item: BeneInternational) => item.id = item.inventoryNumber);
                this.selectableDataList$ = of(beneList.data)
            },
            error:(err)=> {
                
            },
        })
    }
   
     public override doPostInit(): void {
     }


}