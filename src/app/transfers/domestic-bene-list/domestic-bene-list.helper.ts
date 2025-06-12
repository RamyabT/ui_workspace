import { Injectable } from '@angular/core';
import { BaseFpxControlHelper, CriteriaQuery } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { BenedomesticService } from '../benedomestic-service/benedomestic.service';
import { Benedomestic } from '../benedomestic-service/benedomestic.model';


@Injectable()
export class DomesticBeneListHelper extends BaseFpxControlHelper{
selectableDataList$: any;
constructor(private benedomesticService: BenedomesticService) 
    {
        super();
     
    }

    override doPreInit(): void {
        let criteriaQuery =  new CriteriaQuery()
        this.benedomesticService.findAll()().subscribe({
            next:(beneList: any)=> {
                beneList.data.map((item: Benedomestic) => item.id = item.inventoryNumber);
                this.selectableDataList$ = of(beneList.data)
            },
            error:(err)=> {
                
            },
        })
    }
   
   
     public override doPostInit(): void {
     }


}