import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
} from "@fpx/core";
import { Billercategory } from '../billercategory-service/billercategory.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailBillerCategoryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _appConfig:AppConfigService,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retailBillerCategoryRoGridView);
    this.addHandleActions('modify', this.retailBillerCategoryRoGridModify);
    this.addHandleActions('add', this.retailBillerCategoryRoGridEntry);
  }
   
  public getGridColumnWidth(): number[] {
    return  [3,];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private retailBillerCategoryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Billercategory
  ) => {
    if(data?.description){
      let sertvice = this._appConfig.getServiceDetails('RETAILBILLERLISTGOGRID');
      this._angularRouter.navigate(sertvice.servicePath, {
        queryParams: {
          categoryCode: data.categoryCode,
          serviceCode: 'RETAILBILLERLISTGOGRID' 
        }
      });
    }
    //WRITE YOUR CODE HERE 
    
  };
  private retailBillerCategoryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Billercategory
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailBillerCategoryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Billercategory
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {

  let criteriaQuery:CriteriaQuery = new CriteriaQuery();
  criteriaQuery.addFilterCritertia('categoryCode','String','notEqual',{'searchText':"BILLERCAT04"})
  criteriaQuery.setPaginationCriteria('1',4)
  let serviceCode = this.getRoutingParam("serviceCode");
  if(serviceCode == 'RETAILCATEGORYGROUPBILLER'){
    this.setNgTemplateName('categoryGroupbillerListTmplt');
    this.setNgTemplateClass('category-group-biller-list-tmpl');

  }else{
    this.setNgTemplateName('miniBillerCategoryTmplt');
    this.setNgTemplateClass('biller-category-mini-list-tmpl grid');
    criteriaQuery.setPaginationCriteria('1',4)
  }
  this.setInitialCriteria(criteriaQuery);
}
  
 override doPostInit(): void {
  }  
 

  override postFindallInterceptor = (payload: any) => {
    let serviceCode = this.getRoutingParam("serviceCode");
    if(serviceCode == 'RETAILCATEGORYGROUPBILLER'){
        if(payload?.data){
          let tempPayload:any[] = [];
          let groupByPayload = this.groupBy(payload?.data);

          let groupKey:string;
          groupByPayload.forEach((element:any) => {
            
            if(groupKey!=element[0]?.groupCode?.description){
              groupKey = element[0]?.groupCode?.description
              tempPayload.push({rowGroupTitle:groupKey})
            }
            element.forEach((res:any) => {

            })
            tempPayload.push({data:element})
          });
          payload.data = tempPayload
        }
    }
    
    return payload;
  }

   groupBy(array:any) {
    var hash = Object.create(null)
       let result:any[] = [];

    array.forEach( (a:any) => {
        if (!hash[a['groupCode']['shortDescription']]) {
            hash[a['groupCode']['shortDescription']] = [];
            result.push(hash[a['groupCode']['shortDescription']]);
        }
        hash[a['groupCode']['shortDescription']].push(a);
    });
    return result;
}
 
}


 
 
