import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITextDetection } from 'app/shared/model/text-detection.model';

@Component({
    selector: 'jhi-text-detection-detail',
    templateUrl: './text-detection-detail.component.html'
})
export class TextDetectionDetailComponent implements OnInit {
    textDetection: ITextDetection;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ textDetection }) => {
            this.textDetection = textDetection;
        });
    }

    previousState() {
        window.history.back();
    }
}
