import { StringCharSequence, CharSequence } from "./CharSequence";
import { stringify } from "querystring";
import { FuzzyStringMatcher, MatchScoreComputer } from "./FuzzyStringMatcher";

/**
 * Use the bitap algorithm to find a fuzzy match.
 * 
 * This is a modified version of the bitap java implementation from
 * http://code.google.com/p/google-diff-match-patch/ as starting point (Apache
 * License, Version 2.0)
 * 
 * @author cchabanois
 *
 */
export class BitapStringMatcher implements FuzzyStringMatcher {

    public static MAX_BITS = 32;

    private readonly matchThreshold : number;
    private readonly matchScoreComputer: MatchScoreComputer;

    constructor(matchThreshold : number, matchScoreComputer: MatchScoreComputer) {
        this.matchThreshold = matchThreshold;
        this.matchScoreComputer =matchScoreComputer;
    }

    public find(text : string | CharSequence, pattern : string, expectedLocation : number) : number {
        if (typeof(text) === 'string') {
            text = new StringCharSequence(text);
        }
        if (pattern.length > BitapStringMatcher.MAX_BITS) {
            throw new Error('Pattern length is too long');
        }
        // Initialise the alphabet.
        const alphabet = this.alphabet(pattern);

		// Highest score beyond which we give up.
		let scoreThreshold = this.matchThreshold;
        let bestLocation = -1;
        
		// Initialise the bit arrays.
		const matchMask = 1 << (pattern.length - 1);
        bestLocation = -1;
        
        const startLocation = 1;
		const finishLocation = text.length() + pattern.length;
        let last_rd : number[] = [];
        for (let passNumber = 0; passNumber < pattern.length; passNumber++) {
  			// Scan for the best match; each iteration allows for one more
			// error.
            let rd : number[] = new Array(finishLocation + 2);
            rd[finishLocation + 1] = (1 << passNumber) - 1;
            for (let j = finishLocation; j >= startLocation; j--) {
				let charMatch : number;
				if (text.length() <= j - 1 || !alphabet.has(text.charAt(j - 1))) {
					// Out of range.
					charMatch = 0;
				} else {
					charMatch = alphabet.get(text.charAt(j - 1))!;
                }
                if (passNumber == 0) {
					// First pass: exact match.
					rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
				} else {
					// Subsequent passes: fuzzy match.
					rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) | (((last_rd[j + 1] | last_rd[j]) << 1) | 1)
							| last_rd[j + 1];
                }
                if ((rd[j] & matchMask) != 0) {
					const score = this.matchScoreComputer.score(passNumber, j - 1, expectedLocation, pattern);
					// This match will almost certainly be better than any
					// existing match. But check anyway.
					if (score <= scoreThreshold) {
						// Told you so.
						scoreThreshold = score;
						bestLocation = j - 1;
					}
				}
            }
			if (this.matchScoreComputer.score(passNumber + 1, expectedLocation, expectedLocation,
                pattern) > scoreThreshold) {
                // No hope for a (better) match at greater error levels.
                break;
            }
            last_rd = rd;
        }
        return bestLocation;
    }

    /**
	 * Initialise the alphabet for the Bitap algorithm.
	 * 
	 * @param pattern
	 *            The text to encode.
	 * @return Hash of character locations.
	 */
    private alphabet(pattern : string) : Map<string, number> {
        const alphabet = new Map<string, number>();
        for (let c of pattern) {
            alphabet.set(c, 0);
        }
        let i = 0;
        for (let c of pattern) {
            alphabet.set(c, alphabet.get(c)! | (1 << (pattern.length - i - 1)));
            i++;
        }
        return alphabet;
    }

}