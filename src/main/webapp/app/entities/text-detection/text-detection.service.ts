import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITextDetection } from 'app/shared/model/text-detection.model';

type EntityResponseType = HttpResponse<ITextDetection>;
type EntityArrayResponseType = HttpResponse<ITextDetection[]>;

@Injectable({ providedIn: 'root' })
export class TextDetectionService {
    public resourceUrl = SERVER_API_URL + 'api/text-detections';

    constructor(protected http: HttpClient) {}

    create(textDetection: ITextDetection): Observable<EntityResponseType> {
        return this.http.post<ITextDetection>(this.resourceUrl, textDetection, { observe: 'response' });
    }

    update(textDetection: ITextDetection): Observable<EntityResponseType> {
        return this.http.put<ITextDetection>(this.resourceUrl, textDetection, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITextDetection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITextDetection[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
