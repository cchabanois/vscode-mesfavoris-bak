import { IMatchScoreComputer } from "./IFuzzyStringMatcher";

/**
 * A IMatchScoreComputer that considers both the error count and the
 * distance to the expected location
 * 
 */
export class DistanceMatchScoreComputer implements IMatchScoreComputer {
    private readonly matchDistance : number;

    /**
	 * 
	 * @param matchDistance
	 *            How far to search for a match (0 = exact location, 1000+ =
	 *            broad match). A match this many characters away from the
	 *            expected location will add 1.0 to the score (0.0 is a perfect
	 *            match).
	 */
    constructor(matchDistance : number) {
        this.matchDistance = matchDistance;
    }


    score(errorsCount: number, matchLocation: number, expectedLocation: number, pattern: string): number {
		const accuracy = errorsCount / pattern.length;
		if (expectedLocation == -1) {
			return accuracy;
		}
		const proximity = Math.abs(expectedLocation - matchLocation);
		if (this.matchDistance == 0) {
			// Dodge divide by zero error.
			return proximity == 0 ? accuracy : 1.0;
		}
		return accuracy + (proximity / this.matchDistance);
    }

}