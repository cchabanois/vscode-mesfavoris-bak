import { StringCharSequence, CharSequence } from "./CharSequence";
import { stringify } from "querystring";
import { IFuzzyStringMatcher, IMatchScoreComputer } from "./IFuzzyStringMatcher";
import Long from "long";

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
export class BitapLongStringMatcher implements IFuzzyStringMatcher {

    public static MAX_BITS = 64;

    private readonly matchThreshold : number;
    private readonly matchScoreComputer: IMatchScoreComputer;

    constructor(matchThreshold : number, matchScoreComputer: IMatchScoreComputer) {
        this.matchThreshold = matchThreshold;
        this.matchScoreComputer =matchScoreComputer;
    }

    public find(text : string | CharSequence, pattern : string, expectedLocation? : number) : number {
        if (typeof(text) === 'string') {
            text = new StringCharSequence(text);
        }
        if (pattern.length > BitapLongStringMatcher.MAX_BITS) {
            throw new Error('Pattern length is too long');
        }
        // Initialise the alphabet.
        const alphabet = this.alphabet(pattern);

		// Highest score beyond which we give up.
		let scoreThreshold = this.matchThreshold;
        let bestLocation = -1;
        
		// Initialise the bit arrays.
		const matchMask = Long.UONE.shiftLeft(pattern.length - 1);
        
        const startLocation = 1;
		const finishLocation = text.length() + pattern.length;
        let last_rd : Long[] = [];
        for (let passNumber = 0; passNumber < pattern.length; passNumber++) {
  			// Scan for the best match; each iteration allows for one more
			// error.
            let rd : Long[] = new Array(finishLocation + 2);
            rd[finishLocation + 1] = Long.UONE.shiftLeft(passNumber).add(-1);
            for (let j = finishLocation; j >= startLocation; j--) {
				let charMatch : Long;
				if (text.length() <= j - 1 || !alphabet.has(text.charAt(j - 1))) {
					// Out of range.
					charMatch = Long.UZERO;
				} else {
					charMatch = alphabet.get(text.charAt(j - 1))!;
                }
                if (passNumber == 0) {
					// First pass: exact match.
					rd[j] = rd[j + 1].shiftLeft(1).or(1).and(charMatch);
				} else {
					// Subsequent passes: fuzzy match.
                    rd[j] = rd[j + 1].shiftLeft(1).or(1).and(charMatch);
                    rd[j] = rd[j].or(last_rd[j + 1].or(last_rd[j]).shiftLeft(1).or(1));
                    rd[j] = rd[j].or(last_rd[j + 1]);
                }
                if ((rd[j].and(matchMask)).neq(0)) {
					const score = this.matchScoreComputer.score(pattern, passNumber, j - 1, expectedLocation);
					// This match will almost certainly be better than any
					// existing match. But check anyway.
					if (score <= scoreThreshold) {
						// Told you so.
						scoreThreshold = score;
						bestLocation = j - 1;
					}
				}
            }
			if (this.matchScoreComputer.score(pattern, passNumber + 1, expectedLocation || -1, expectedLocation) > scoreThreshold) {
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
    private alphabet(pattern : string) : Map<string, Long> {
        const alphabet = new Map<string, Long>();
        for (let c of pattern) {
            alphabet.set(c, Long.UZERO);
        }
        let i = 0;
        for (let c of pattern) {
            alphabet.set(c, alphabet.get(c)!.or(Long.ONE.shiftLeft(pattern.length - i - 1)));
            i++;
        }
        return alphabet;
    }

}