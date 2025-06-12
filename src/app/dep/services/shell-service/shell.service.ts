import { Injectable, inject } from "@angular/core";
import { Fpxshell, HttpProviderService, HttpRequest } from "@fpx/core";
import {
  FpxShellButton,
  FpxShellService,
  FpxShellToastMessage,
  FpxShellToastTransform,
  FpxToastType,
} from "@fpx/layout";
import { Observable, of } from "rxjs";
import { ActiveSpaceInfoService } from "../../core/class/active-space-info.service";
import { APPCONSTANTS } from "@dep/constants";

@Injectable({
  providedIn: "root",
})
export class ShellService extends FpxShellService {
  override workflowRowData: any;

  private _workflowRowData: any | undefined;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  constructor(
    private _httpProvider: HttpProviderService
  ) {
    super();
    this.addShellButton('Reject', 'R', 'btn-tertiary', 'DECISION', 'button', true);
    this.addShellButton('Approve', 'A', 'btn-primary', 'DECISION');
    this.showWorkFlowHistory = false;
    this.enableHeaderCloseBtn = APPCONSTANTS.enableHeaderCloseBtn;
  }

  updateDecision(payload: any, taskId: string, action: "Complete") {
    payload = JSON.parse(payload);
    const taskInstanceId = this.workflowRowData?.requestReference;
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("POST");
    httpRequest.setResource(`/checker/process`);
    // httpRequest.addPathParameter("taskInstanceId", taskInstanceId);
    payload['requestReference'] = taskInstanceId
    payload['remarks'] = payload.comments;
    delete payload.comments;
    httpRequest.setBody(payload);
    // httpRequest.addHeaderParamter("action", action);
    // httpRequest.addHeaderParamter("userId", "U0000001");
    // httpRequest.addHeaderParamter("targetUser", "U0000001");
    httpRequest.setContextPath('WorkflowService');
    return this._httpProvider.invokeRestApi(httpRequest);
  }
  override getworkflowdetail(refId: string): Observable<any> {
    return of(null);
  }

  override onHeaderCloseBtnClick(): void {
    this._activeSpaceInfoService.doTakeSpaceAction();
  }

}
