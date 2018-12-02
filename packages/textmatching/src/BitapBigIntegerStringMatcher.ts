import { StringCharSequence, CharSequence } from "./CharSequence";
import { FuzzyStringMatcher, MatchScoreComputer } from "./FuzzyStringMatcher";
import JSBI from 'jsbi';

const BigInt = JSBI.BigInt;
const leftShift = JSBI.leftShift;
const add = JSBI.add;
const bitwiseAnd = JSBI.bitwiseAnd;
const bitwiseOr = JSBI.bitwiseOr;
const equal = JSBI.equal;

/**
 * Use the bitap algorithm to find a fuzzy match.
 * 
 * This version can use a pattern of any length but is slower than
 * {@link BitapStringMatcher}
 * 
 * This is a modified version of the bitap java implementation from
 * http://code.google.com/p/google-diff-match-patch/ as starting point (Apache
 * License, Version 2.0)
 * 
 * @author cchabanois
 *
 */
export class BitapBigIntegerStringMatcher implements FuzzyStringMatcher {
    private readonly matchThreshold : number;
    private readonly matchScoreComputer: MatchScoreComputer;

    constructor(matchThreshold : number, matchScoreComputer: MatchScoreComputer) {
        this.matchThreshold = matchThreshold;
        this.matchScoreComputer = matchScoreComputer;
    }

    public find(text : string | CharSequence, pattern : string, expectedLocation : number) : number {
        if (typeof(text) === 'string') {
            text = new StringCharSequence(text);
        }
        // Initialise the alphabet.
        const alphabet = this.alphabet(pattern);

		// Highest score beyond which we give up.
		let scoreThreshold = this.matchThreshold;
        let bestLocation = -1;
        
		// Initialise the bit arrays.
		const matchMask = leftShift(BigInt(1), BigInt(pattern.length - 1));
        bestLocation = -1;
        
        const startLocation = 1;
		const finishLocation = text.length() + pattern.length;
        let last_rd : JSBI[] = [];
        for (let passNumber = 0; passNumber < pattern.length; passNumber++) {
  			// Scan for the best match; each iteration allows for one more
			// error.
            let rd : JSBI[] = new Array(finishLocation + 2);
            rd[finishLocation + 1] = add(leftShift(BigInt(1), BigInt(passNumber)), BigInt(-1));
            for (let j = finishLocation; j >= startLocation; j--) {
				let charMatch : JSBI;
				if (text.length() <= j - 1 || !alphabet.has(text.charAt(j - 1))) {
					// Out of range.
					charMatch = BigInt(0);
				} else {
					charMatch = alphabet.get(text.charAt(j - 1))!;
                }
                if (passNumber == 0) {
                    // First pass: exact match.
                    rd[j] = bitwiseAnd(bitwiseOr(leftShift(rd[j + 1], BigInt(1)), BigInt(1)), BigInt(charMatch));
				} else {
                    // Subsequent passes: fuzzy match.
                    rd[j] = bitwiseAnd(bitwiseOr(leftShift(rd[j + 1], BigInt(1)), BigInt(1)), BigInt(charMatch));
                    rd[j] = bitwiseOr(rd[j], bitwiseOr(leftShift(bitwiseOr(last_rd[j +1 ], last_rd[j]), BigInt(1)), BigInt(1)));
                    rd[j] = bitwiseOr(rd[j], last_rd[j + 1]);
                }
                if (!equal(bitwiseAnd(rd[j], matchMask), BigInt(0))) {
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
    private alphabet(pattern : string) : Map<string, JSBI> {
        const alphabet = new Map<string, JSBI>();
        for (let c of pattern) {
            alphabet.set(c, BigInt(0));
        }
        let i = 0;
        for (let c of pattern) {
            alphabet.set(c, bitwiseOr(alphabet.get(c)!, leftShift(BigInt(1), BigInt(pattern.length - i - 1))));
            i++;
        }
        return alphabet;
    }

}