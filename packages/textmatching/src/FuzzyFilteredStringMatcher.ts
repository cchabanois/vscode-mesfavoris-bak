import { IFuzzyStringMatcher } from "./IFuzzyStringMatcher";
import { ICharSequenceFilter, FilteredCharSequence } from "./FilteredCharSequence";
import { CharSequence, StringCharSequence } from "./CharSequence";

/**
 * A fuzzy string matcher that filters the text (removing whitespaces for ex)
 * before searching for the pattern
 */
export class FuzzyFilteredStringMatcher implements IFuzzyStringMatcher {
	private readonly filter : ICharSequenceFilter;
	private readonly fuzzyStringMatcher : IFuzzyStringMatcher;

	constructor(fuzzyStringMatcher : IFuzzyStringMatcher, filter : ICharSequenceFilter) {
		this.filter = filter;
		this.fuzzyStringMatcher = fuzzyStringMatcher;
	}

    find(text : string | CharSequence, pattern : string, expectedLocation? : number) : number {
        if (typeof(text) === 'string') {
            text = new StringCharSequence(text);
        }         
        const filteredCharSequence = new FilteredCharSequence(text, this.filter);
		const filteredPattern = new FilteredCharSequence(pattern, this.filter).toString();
		let filteredExpectedLocation : number | undefined;
        if (expectedLocation === undefined) {
            filteredExpectedLocation = undefined;
        } else if (expectedLocation < 0) {
			filteredExpectedLocation = 0;
		} else if (expectedLocation >= text.length()){
			filteredExpectedLocation = filteredCharSequence.length()-1;
		} else {
			filteredExpectedLocation = filteredCharSequence.getIndex(expectedLocation);
		}
		const filteredIndex = this.fuzzyStringMatcher.find(filteredCharSequence, filteredPattern, filteredExpectedLocation);
		if (filteredIndex === undefined) {
			return -1;
		}
		return filteredCharSequence.getParentIndex(filteredIndex) || -1;
	}

}
