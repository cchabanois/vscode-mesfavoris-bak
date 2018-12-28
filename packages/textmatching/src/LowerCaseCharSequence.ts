import { CharSequence } from "./CharSequence";
import { AbstractCharSequence } from "./AbstractCharSequence";
import { CharSubSequence } from "./CharSubSequence";
import { StringCharSequence } from "./StringCharSequence";

export class LowerCaseCharSequence extends AbstractCharSequence {
    private parent : CharSequence;

    constructor(parent : CharSequence|string) {
        super();
        if (typeof(parent) === 'string') {
            parent = new StringCharSequence(parent);
        }
        this.parent = parent;
    }

    length(): number {
        return this.parent.length();
    }    
    
    charAt(index: number): string {
        return this.parent.charAt(index).toLowerCase();
    }

    subSequence(start: number, end: number): CharSequence {
        return new CharSubSequence(this, start, end);        
    }

    public toString() : string {
        return this.parent.toString().toLowerCase();
    }    

}