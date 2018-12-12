import { ICharSequenceFilter } from "./FilteredCharSequence";
import { CharSequence } from "./CharSequence";
import XRegExp from "xregexp";

export class RemoveExtraWhitespacesSequenceFilter implements ICharSequenceFilter {
    private isLetterOrDigitRegExp : RegExp = XRegExp('[\\pL\\pN]');

    nextCharIndex(charSequence : CharSequence, index: number): number {
		index = this.removeExtraVerticalWhitespaces(charSequence, index);
		index = this.removeExtraHorizontalWhitespaces(charSequence, index);
		return index;        
    }
    
	private removeExtraVerticalWhitespaces(charSequence : CharSequence, index : number) : number {
		const index1 = this.nextNonVerticalWhitespaceChar(charSequence, index);
		if (index == 0) {
			index = index1;
		} else if (index1 == charSequence.length()) {
			index = index1;
		} else {
			if (index1 != index) {
				index = index1 - 1;
			}
		}
		return index;
    }
    
	private removeExtraHorizontalWhitespaces(charSequence : CharSequence, index : number) : number {
		const index1 = this.nextNonHorizontalWhitespaceChar(charSequence, index);
		if (index == 0) {
			index = index1;
		} else if (index1 == charSequence.length()) {
			index = index1;
		} else {
			if (index1 != index && this.needHorizontalSeparation(charSequence.charAt(index-1), charSequence.charAt(index1))) {
				index = index1 - 1;
			} else {
				index = index1;
			}
		}

		return index;
	}

	private needHorizontalSeparation(char1 : string, char2 : string) : boolean {
        return this.isLetterOrDigitRegExp.test(char1) && this.isLetterOrDigitRegExp.test(char2);
	}

    private nextNonVerticalWhitespaceChar(charSequence : CharSequence, index : number) : number {
		while (index < charSequence.length() && this.isVerticalWhitespace(charSequence.charAt(index))) {
			index++;
		}
		return index;
	}

    private nextNonHorizontalWhitespaceChar(charSequence : CharSequence, index : number) : number {
		while (index < charSequence.length() && this.isHorizontalWhitespace(charSequence.charAt(index))) {
			index++;
		}
		return index;
	}
	
	private isHorizontalWhitespace(c : string) : boolean {
		return c == ' ' || c == '\t';
	}

	private isVerticalWhitespace(c : string) : boolean {
		return c == '\n';
	}

}