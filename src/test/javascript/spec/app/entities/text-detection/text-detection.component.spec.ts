/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { XtraOcrTestModule } from '../../../test.module';
import { TextDetectionComponent } from 'app/entities/text-detection/text-detection.component';
import { TextDetectionService } from 'app/entities/text-detection/text-detection.service';
import { TextDetection } from 'app/shared/model/text-detection.model';

describe('Component Tests', () => {
    describe('TextDetection Management Component', () => {
        let comp: TextDetectionComponent;
        let fixture: ComponentFixture<TextDetectionComponent>;
        let service: TextDetectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [XtraOcrTestModule],
                declarations: [TextDetectionComponent],
                providers: []
            })
                .overrideTemplate(TextDetectionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TextDetectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextDetectionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TextDetection(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.textDetections[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
