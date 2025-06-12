import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
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

@Injectable()
export class ccRewardsInfoHelper extends BaseFpxRoGridHelper {

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
    _isSortSearch.set('rewardDescription', "sort&search");
    _isSortSearch.set('rewardId', "sort&search");
    return _isSortSearch;
  }

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
    $(".ro-grid-actions").hide();
    $(".table-header").hide();
    $(".table-footer").hide();

    const gridRows = Array.from(document.getElementsByClassName("fpx-ro-grid-row"));

    gridRows.forEach((el) => {
      el.setAttribute('style', 'background-color: "red"');
    })
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
        this.setGridData(res?.data?.ccRewardsInfo);
      }
    })
  }

}




