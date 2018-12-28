import { CharSequence, CharSubSequence } from '@mesfavoris/textmatching';
import { TextDocument, Range, Position } from 'vscode';
import { last } from 'rxjs/operators';
import { AbstractCharSequence } from '@mesfavoris/textmatching/lib/AbstractCharSequence';

export class DocumentCharSequence extends AbstractCharSequence {
    private readonly document : TextDocument;

    constructor(document : TextDocument) {
        super();
        this.document = document;
    }

    length(): number {
        const lastPosition = this.document.validatePosition(new Position(Number.MAX_SAFE_INTEGER, 0));
        return this.document.offsetAt(lastPosition);
    }    
    
    charAt(index: number): string {
        const position1 = this.document.positionAt(index);
        const position2 = this.document.positionAt(index+1);
        return this.document.getText(new Range(position1, position2));
    }

    subSequence(start: number, end: number): CharSequence {
        return new CharSubSequence(this, start, end);
    }

    subSequenceFromRange(range : Range) : CharSequence {
        const start = this.document.offsetAt(range.start);
        const end = this.document.offsetAt(range.end);
        return this.subSequence(start, end);
    }

    public toString() : string {
        return this.document.getText();
    }

}