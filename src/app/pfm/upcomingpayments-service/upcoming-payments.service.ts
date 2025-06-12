import { Injectable } from "@angular/core";
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { of } from "rxjs";

@Injectable()
export class UpcomingPaymentsService implements BaseFpxDataService<any> {
    private _correlationId: string = '';
    constructor(private _httpProvider: HttpProviderService) { }
    findByKey(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindByKeyFn<any> {
        throw new Error("Method not implemented.");
    }
    findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindAllFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setResource("/upcomingpayments");
            httpRequest.setMethod("GET");
            httpRequest.setContextPath('Payments');
            httpRequest.setCriteriaQuery(criteriaQuery);
            return of([
                {
                    billerId: "001",
                    billerName: "Biller 001",
                    paymentDate: "2025-02-26",
                    paymentAmount: "123",
                    paymentCurrency: "CAD"
                },
                {
                    billerId: "002",
                    billerName: "Biller 002",
                    paymentDate: "2025-02-27",
                    paymentAmount: "47.34",
                    paymentCurrency: "CAD"
                }
            ]);
        };
    }
    create(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): CreateFn<any> {
        throw new Error("Method not implemented.");
    }
    lookup(key: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>, criteriaQuery?: CriteriaQuery): LookUpFn<any> {
        throw new Error("Method not implemented.");
    }
    modify(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): ModifyFn<any> {
        throw new Error("Method not implemented.");
    }
    fetchStatistics?(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindAllFn<any> {
        throw new Error("Method not implemented.");
    }
    patch?(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): PatchFn<any> {
        throw new Error("Method not implemented.");
    }
    loadForm?(key: unknown): LoadForm<any> {
        throw new Error("Method not implemented.");
    }
}