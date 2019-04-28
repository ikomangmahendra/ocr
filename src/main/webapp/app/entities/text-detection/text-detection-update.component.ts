import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITextDetection } from 'app/shared/model/text-detection.model';
import { TextDetectionService } from './text-detection.service';

@Component({
    selector: 'jhi-text-detection-update',
    templateUrl: './text-detection-update.component.html'
})
export class TextDetectionUpdateComponent implements OnInit {
    textDetection: ITextDetection;
    isSaving: boolean;

    constructor(protected textDetectionService: TextDetectionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ textDetection }) => {
            this.textDetection = textDetection;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.textDetection.id !== undefined) {
            this.subscribeToSaveResponse(this.textDetectionService.update(this.textDetection));
        } else {
            this.subscribeToSaveResponse(this.textDetectionService.create(this.textDetection));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITextDetection>>) {
        result.subscribe((res: HttpResponse<ITextDetection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
