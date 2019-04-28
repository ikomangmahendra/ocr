import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XtraOcrSharedModule } from 'app/shared';
import {
    TextDetectionComponent,
    TextDetectionDetailComponent,
    TextDetectionUpdateComponent,
    TextDetectionDeletePopupComponent,
    TextDetectionDeleteDialogComponent,
    textDetectionRoute,
    textDetectionPopupRoute
} from './';

const ENTITY_STATES = [...textDetectionRoute, ...textDetectionPopupRoute];

@NgModule({
    imports: [XtraOcrSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TextDetectionComponent,
        TextDetectionDetailComponent,
        TextDetectionUpdateComponent,
        TextDetectionDeleteDialogComponent,
        TextDetectionDeletePopupComponent
    ],
    entryComponents: [
        TextDetectionComponent,
        TextDetectionUpdateComponent,
        TextDetectionDeleteDialogComponent,
        TextDetectionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class XtraOcrTextDetectionModule {}
