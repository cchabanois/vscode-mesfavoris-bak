import { CharSubSequence } from "./CharSubSequence";

export interface CharSequence {
    length() : number;

    charAt(index : number) : string;

    /**
     * Returns a CharSequence that is a subsequence of this sequence.
     * 
     * @param start the start index, inclusive
     * @param end the end index, exclusive
     */
    subSequence(start : number, end : number) : CharSequence;
}

export class StringCharSequence implements CharSequence {

    private readonly value : string;

    constructor(value : string) {
        this.value = value;
    }

    public length(): number {
        return this.value.length;
    }    
    
    public charAt(index: number): string {
        return this.value.charAt(index);
    }

    subSequence(start: number, end: number): CharSequence {
        return new CharSubSequence(this, start, end);
    }

    public toString() : string {
        return this.value;
    }
}

