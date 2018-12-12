import { CharSequence } from "./CharSequence";

export interface IMatchScoreComputer {
	/**
	 * Compute and return the score for a match with e errors and x location.
	 * 
	 * @param errorsCount
	 *            Number of errors in match.
	 * @param matchLocation
	 *            Location of match.
	 * @param expectedLocation
	 *            Expected location of match, -1 if unknown.
	 * @param pattern
	 *            Pattern being sought.
	 * @return Overall score for match (0.0 = good, 1.0 = bad).
	 */
    score(errorsCount : number, matchLocation : number, expectedLocation : number, pattern : string) : number;
}

export interface IFuzzyStringMatcher {
/**
	 * Locate the best instance of 'pattern' in 'text' near 'expectedLocation'.
	 * Returns -1 if no match found.
	 * 
	 * @param text
	 *            The text to search.
	 * @param pattern
	 *            The pattern to search for.
	 * @param expectedLocation
	 *            The location to search around, -1 if unknown.
	 * @param monitor
	 * @return Best match index or -1.
	 */	
    find(text : string | CharSequence, pattern : string, expectedLocation : number) : number;
    
}