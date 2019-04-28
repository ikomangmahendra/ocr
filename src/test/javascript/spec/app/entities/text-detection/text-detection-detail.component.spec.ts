/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { XtraOcrTestModule } from '../../../test.module';
import { TextDetectionDetailComponent } from 'app/entities/text-detection/text-detection-detail.component';
import { TextDetection } from 'app/shared/model/text-detection.model';

describe('Component Tests', () => {
    describe('TextDetection Management Detail Component', () => {
        let comp: TextDetectionDetailComponent;
        let fixture: ComponentFixture<TextDetectionDetailComponent>;
        const route = ({ data: of({ textDetection: new TextDetection(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [XtraOcrTestModule],
                declarations: [TextDetectionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TextDetectionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TextDetectionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.textDetection).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
