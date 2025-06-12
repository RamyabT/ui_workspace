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
  FpxIHttpOption,
} from "@fpx/core";
import { AppConfigService } from '@dep/services';
import { CcRewardBenefitsService } from '../ccRewardBenefits-service/ccRewardBenefits.service';
import { CcBenefitsInfo } from '../ccRewardBenefits-service/ccRewardBenefits.model';

@Injectable()
export class ccBenefitsInfoHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private ccRewardBenefitsService: CcRewardBenefitsService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,) {
    super();
  }

  public getGridColumnWidth(): number[] {
    return [50, 50];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private ccBenefitsInfoView: BaseFpxRoGridHandleAction = (
    name: string,
    data: CcBenefitsInfo
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private ccBenefitsInfoModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: CcBenefitsInfo
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private ccBenefitsInfoEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: CcBenefitsInfo
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.onLoad();
  }


  override doPostInit(): void {
  }

  public onLoad() {
    const cardData = this._appConfig.getData('creditCardData');
    const prodCode = cardData?.productCode;
    const initialCriteria2 = new CriteriaQuery();
    let httpparam = new Map();
    let httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map();

    httpparam.set('prodCode', prodCode);
    httpOption.set('pathParam', httpparam)

    this.ccRewardBenefitsService.findAll(initialCriteria2, httpOption)().subscribe({
      next: (res: any) => {
        console.log("response", res)
        this.setGridData(res?.data?.ccBenefitsInfo);
      }
    })
  }


}




