import { IFuzzyStringMatcher, IMatchScoreComputer } from "./IFuzzyStringMatcher";
import { BitapStringMatcher } from "./BitapStringMatcher";
import { BitapBigIntegerStringMatcher } from "./BitapBigIntegerStringMatcher";
import { CharSequence, StringCharSequence } from "./CharSequence";
import { BitapLongStringMatcher } from "./BitapLongStringMatcher";

export class FuzzyStringMatcher implements IFuzzyStringMatcher {

    private readonly bitapStringMatcher : BitapStringMatcher;
    private readonly bitapBigIntegerStringMatcher : BitapBigIntegerStringMatcher;
    private readonly bitapLongStringMatcher : BitapLongStringMatcher;
    constructor(matchThreshold : number, matchScoreComputer : IMatchScoreComputer) {
		this.bitapStringMatcher = new BitapStringMatcher(matchThreshold, matchScoreComputer);
        this.bitapBigIntegerStringMatcher = new BitapBigIntegerStringMatcher(matchThreshold, matchScoreComputer);
        this.bitapLongStringMatcher = new BitapLongStringMatcher(matchThreshold, matchScoreComputer);
    }

    public find(text: string|CharSequence, pattern: string, expectedLocation: number): number {
        if (typeof(text) === 'string') {
            text = new StringCharSequence(text);
        }        
        expectedLocation = Math.max(0, Math.min(expectedLocation, text.length()));
        if (text.length() === pattern.length && text.toString() === pattern) {
            // shortcut
            return 0;
        } else if (text.length() === 0) {
            // nothing to match
            return -1;
        } else if ((expectedLocation + pattern.length <= text.length()) && 
            (text.subSequence(expectedLocation, expectedLocation + pattern.length).toString() === pattern)) {
            // Perfect match at the perfect spot!
            return expectedLocation;
        } else {
            // Do a fuzzy compare
            return this.getBitapStringMatcher(pattern).find(text, pattern, expectedLocation);
        }
    }

    private getBitapStringMatcher(pattern : string) : IFuzzyStringMatcher {
        if (pattern.length <= BitapStringMatcher.MAX_BITS) {
            return this.bitapStringMatcher;
        } else if (pattern.length <= BitapLongStringMatcher.MAX_BITS) {
            return this.bitapLongStringMatcher;
        } else {
            return this.bitapBigIntegerStringMatcher;
        }
    }
}