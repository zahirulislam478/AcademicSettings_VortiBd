import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyDirective } from 'app/Utility/digit-only.directive';
import { TruncateFileName } from 'app/Utility/TruncateFileName.pipe';

@NgModule({
    declarations: [DigitOnlyDirective, TruncateFileName],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DigitOnlyDirective,
        TruncateFileName,
    ]
})
export class SharedModule
{
}
