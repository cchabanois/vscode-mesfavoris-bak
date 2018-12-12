import { CharSequence } from "./CharSequence";
import { CharSubSequence } from "./CharSubSequence";

export class LowerCaseCharSequence implements CharSequence {
    private parent : CharSequence;

    constructor(parent : CharSequence) {
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