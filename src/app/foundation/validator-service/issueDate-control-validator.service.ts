
import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class IssueDateValidatorService {

    constructor() { }

    validateIssueDate(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control?.value) {
                const currentDate = new Date();
                const pastDate = new Date(control.value);
                if (pastDate <= currentDate) {
                    console.warn("Invalid Date");
                    return { 'Invalid date': true }
                }
            }
            return null;

        }

    }
}

