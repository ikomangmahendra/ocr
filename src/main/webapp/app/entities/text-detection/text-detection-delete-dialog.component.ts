import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITextDetection } from 'app/shared/model/text-detection.model';
import { TextDetectionService } from './text-detection.service';

@Component({
    selector: 'jhi-text-detection-delete-dialog',
    templateUrl: './text-detection-delete-dialog.component.html'
})
export class TextDetectionDeleteDialogComponent {
    textDetection: ITextDetection;

    constructor(
        protected textDetectionService: TextDetectionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.textDetectionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'textDetectionListModification',
                content: 'Deleted an textDetection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-text-detection-delete-popup',
    template: ''
})
export class TextDetectionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ textDetection }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TextDetectionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.textDetection = textDetection;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/text-detection', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/text-detection', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
