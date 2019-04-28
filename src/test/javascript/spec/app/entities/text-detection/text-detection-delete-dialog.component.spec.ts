/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { XtraOcrTestModule } from '../../../test.module';
import { TextDetectionDeleteDialogComponent } from 'app/entities/text-detection/text-detection-delete-dialog.component';
import { TextDetectionService } from 'app/entities/text-detection/text-detection.service';

describe('Component Tests', () => {
    describe('TextDetection Management Delete Component', () => {
        let comp: TextDetectionDeleteDialogComponent;
        let fixture: ComponentFixture<TextDetectionDeleteDialogComponent>;
        let service: TextDetectionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [XtraOcrTestModule],
                declarations: [TextDetectionDeleteDialogComponent]
            })
                .overrideTemplate(TextDetectionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TextDetectionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextDetectionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
