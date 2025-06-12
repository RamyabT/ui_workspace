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
import { Customerdocumentdtls } from '../customerdocumentdtls-service/customerdocumentdtls.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailCustomerDocumentDetailsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    protected _appConfig: AppConfigService,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retailCustomerDocumentDetailsRoGridView);
    this.addHandleActions('modify', this.retailCustomerDocumentDetailsRoGridModify);
    this.addHandleActions('add', this.retailCustomerDocumentDetailsRoGridEntry);
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

  private retailCustomerDocumentDetailsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Customerdocumentdtls
  ) => {
    //WRITE YOUR CODE HERE 
    let service = this._appConfig.getServiceDetails('RETAILUPDATEDOC');
    service.servicePath[1] = 'display-shell'
    this._router.navigate(service.servicePath, {
      queryParams: {
        serviceCode: 'RETAILUPDATEDOC',
        mode:"V",
        id:data?.id
      }
    });
    service.servicePath[1] = 'entry-shell'
  };
  private retailCustomerDocumentDetailsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Customerdocumentdtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailCustomerDocumentDetailsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Customerdocumentdtls
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
      this.setNgTemplateClass('profile-doc-tmpl');
      this.setNgTemplateName('profileDocTempl');
    }
      
      
     override doPostInit(): void {
      }  
    
      override postFindallInterceptor = (payload: any) => {
        this.triggerGridOutputEvent('PROFILEDOCEMITDATA',payload)
        return payload;
      }
}


 
 
