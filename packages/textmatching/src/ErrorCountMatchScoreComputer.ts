import { IMatchScoreComputer } from "./IFuzzyStringMatcher";

/**
 * A IMatchScoreComputer that only considers the errorsCount
 * 
 * @author cchabanois
 *
 */
export class ErrorCountMatchScoreComputer implements IMatchScoreComputer {

	public score(pattern : string, errorsCount : number, matchLocation : number, expectedLocation? : number) : number {
		const accuracy = errorsCount / pattern.length;
		return accuracy;
	}

}