
export interface CharSequence extends Iterable<string>{
    length() : number;

    charAt(index : number) : string;

    /**
     * Returns a CharSequence that is a subsequence of this sequence.
     * 
     * @param start the start index, inclusive
     * @param end the end index, exclusive
     */
    subSequence(start : number, end : number) : CharSequence;

    [Symbol.iterator]() : any;

}


