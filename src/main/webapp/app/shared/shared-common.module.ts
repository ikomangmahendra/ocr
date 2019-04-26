import { NgModule } from '@angular/core';

import { XtraOcrSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [XtraOcrSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [XtraOcrSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class XtraOcrSharedCommonModule {}
