import { CharSequence, StringCharSequence } from "./CharSequence";
import createRBTree, { RedBlackTree } from "functional-red-black-tree";
import { CharSubSequence } from "./CharSubSequence";
import { isString } from "util";
 
export interface ICharSequenceFilter {
	/**
	 * return the next included char
	 * 
	 * @param index
	 * @return index if charSequence.charAt(index) should be included, next
	 *         included char index otherwise, charSequence.length if there
	 *         is no char to include anymore
	 */
	nextCharIndex(charSequence : CharSequence, index : number) : number;    
}

/**
 * A partial view from a CharSequence. The parent CharSequence is
 * filtered using CharSequenceFilter
 */
export class FilteredCharSequence implements CharSequence {
    private readonly parent : CharSequence;
    private readonly _length : number;
    private readonly subSequences : RedBlackTree<number, CharSubSequence>;
    
    constructor(parent : CharSequence|string, filter : ICharSequenceFilter) {
        this.parent = isString(parent)?new StringCharSequence(parent):parent;
        this.subSequences = this.getSubSequences(this.parent, filter);
        const end = this.subSequences.end;
        if (!end.valid) {
            this._length = 0;
        } else {
            this._length = end.key + end.value.length();
        }

    }
    
    private getSubSequences(parent : CharSequence, filter : ICharSequenceFilter) {
        let subSequences : RedBlackTree<number, CharSubSequence> = createRBTree<number, CharSubSequence>();
        const lengthSource = parent.length();
        let indexSource = 0;
        let indexTarget = 0;
        let subSequenceStartIndexSource = -1;
        let subSequenceStartIndexTarget = -1;
        while (indexSource < lengthSource) {
            const previousIndexSource = indexSource;
            indexSource = filter.nextCharIndex(parent, indexSource);
            if (indexSource < previousIndexSource) {
                throw Error('Filter is not valid');
            }
            if (subSequenceStartIndexSource === -1) {
                subSequenceStartIndexSource = indexSource;
                subSequenceStartIndexTarget = indexTarget;
            } else if (indexSource != previousIndexSource) {
                subSequences = subSequences.insert(subSequenceStartIndexTarget, new CharSubSequence(parent, subSequenceStartIndexSource, previousIndexSource));
                subSequenceStartIndexSource = indexSource;
                subSequenceStartIndexTarget = indexTarget;
            }
            indexSource++;
            indexTarget++;
        }
        if (subSequenceStartIndexSource !== lengthSource) {
            subSequences = subSequences.insert(subSequenceStartIndexTarget, new CharSubSequence(parent, subSequenceStartIndexSource, lengthSource));
        }
        return subSequences;
    }

    length(): number {
        return this._length;
    }
    charAt(index: number): string {
        if (index < 0 || index >= this._length) {
            return '';
        }
        const it = this.subSequences.le(index);
        return it.value.charAt(index - it.key);
    }

    public getParentIndex(index : number) : number|undefined {
        if (index < 0 || index >= this._length) {
            return undefined;
        }
        const it = this.subSequences.le(index);
        return it.value.getParentIndex(index - it.key);
    }

    public getIndex(parentIndex : number) : number|undefined {
        if (parentIndex < 0 || parentIndex >= this.parent.length()) {
            return undefined;
        }
        // use binary search
        let low = 0;
        let high = this.length() - 1;
        while (low <= high) {
            const mid = (low + high) >>> 1;
            const midVal = this.getParentIndex(mid)!;
            if (midVal < parentIndex) {
                low = mid + 1;
            } else if (midVal > parentIndex) {
                high = mid - 1;
            } else {
                return mid;
            }
        }
        // parent char filtered
		// we return the insertion point
		return low;
    }

    subSequence(start: number, end: number): CharSequence {
        return new CharSubSequence(this, start, end);
    }
    public toString() : string {
        let result : string = '';
        for (let i = 0; i < this._length; i++) {
            result += this.charAt(i);
        }
        return result;
    }

}