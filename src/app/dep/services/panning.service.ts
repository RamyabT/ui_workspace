import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PanningService {
    public resetTaskSwipe$ = new Subject<string>();
    constructor() { }

    /* Reset task list item swipe */
    triggerTaskSwipe(val: any){
        this.resetTaskSwipe$.next(val);
    }
    getTaskSwipeTrigger():Observable<any>{
        return this.resetTaskSwipe$.asObservable();
    }

}