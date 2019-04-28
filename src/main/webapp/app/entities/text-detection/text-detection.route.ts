import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TextDetection } from 'app/shared/model/text-detection.model';
import { TextDetectionService } from './text-detection.service';
import { TextDetectionComponent } from './text-detection.component';
import { TextDetectionDetailComponent } from './text-detection-detail.component';
import { TextDetectionUpdateComponent } from './text-detection-update.component';
import { TextDetectionDeletePopupComponent } from './text-detection-delete-dialog.component';
import { ITextDetection } from 'app/shared/model/text-detection.model';

@Injectable({ providedIn: 'root' })
export class TextDetectionResolve implements Resolve<ITextDetection> {
    constructor(private service: TextDetectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITextDetection> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TextDetection>) => response.ok),
                map((textDetection: HttpResponse<TextDetection>) => textDetection.body)
            );
        }
        return of(new TextDetection());
    }
}

export const textDetectionRoute: Routes = [
    {
        path: '',
        component: TextDetectionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextDetections'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TextDetectionDetailComponent,
        resolve: {
            textDetection: TextDetectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextDetections'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TextDetectionUpdateComponent,
        resolve: {
            textDetection: TextDetectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextDetections'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TextDetectionUpdateComponent,
        resolve: {
            textDetection: TextDetectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextDetections'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const textDetectionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TextDetectionDeletePopupComponent,
        resolve: {
            textDetection: TextDetectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TextDetections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
