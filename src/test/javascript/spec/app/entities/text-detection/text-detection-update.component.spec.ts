/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { XtraOcrTestModule } from '../../../test.module';
import { TextDetectionUpdateComponent } from 'app/entities/text-detection/text-detection-update.component';
import { TextDetectionService } from 'app/entities/text-detection/text-detection.service';
import { TextDetection } from 'app/shared/model/text-detection.model';

describe('Component Tests', () => {
    describe('TextDetection Management Update Component', () => {
        let comp: TextDetectionUpdateComponent;
        let fixture: ComponentFixture<TextDetectionUpdateComponent>;
        let service: TextDetectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [XtraOcrTestModule],
                declarations: [TextDetectionUpdateComponent]
            })
                .overrideTemplate(TextDetectionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TextDetectionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextDetectionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TextDetection(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.textDetection = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TextDetection();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.textDetection = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
