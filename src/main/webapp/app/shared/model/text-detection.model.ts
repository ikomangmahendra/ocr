export interface ITextDetection {
    id?: number;
    name?: string;
}

export class TextDetection implements ITextDetection {
    constructor(public id?: number, public name?: string) {}
}
