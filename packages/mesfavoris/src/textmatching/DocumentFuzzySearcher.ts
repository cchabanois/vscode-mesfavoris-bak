import { TextDocument, Range, Position } from "vscode";
import { CharSubSequence, LowerCaseCharSequence, ErrorCountMatchScoreComputer, DistanceMatchScoreComputer, FuzzyFilteredStringMatcher, FuzzyStringMatcher, RemoveExtraWhitespacesSequenceFilter } from "@mesfavoris/textmatching";
import { DocumentCharSequence } from "./DocumentCharSequence";
import { IMatchScoreComputer } from "@mesfavoris/textmatching/lib/IFuzzyStringMatcher";

export class DocumentFuzzySearcher {
	private readonly matchThreshold : number;
	private readonly document : TextDocument;

	constructor(document : TextDocument, matchThreshold : number = 0.5) {
		this.document = document;
		this.matchThreshold = matchThreshold;
    }

	private fullDocumentRange() : Range {
		return this.document.validateRange(new Range(new Position(0, 0), new Position(Number.MAX_SAFE_INTEGER, 0)));
	}

    public findLineNumber(lineContent : string, { range = this.fullDocumentRange(), expectedLineNumber = -1 } : { range? : Range, expectedLineNumber? : number } = {}) : number {
		const charSubSequence = new CharSubSequence(new DocumentCharSequence(this.document), this.document.offsetAt(range.start), this.document.offsetAt(range.end));
		const lowerCharSubSequence = new LowerCaseCharSequence(charSubSequence);
		let expectedLocationInSubSequence : number;
		if (expectedLineNumber === -1) {
			expectedLocationInSubSequence = -1;
		} else {
			const minLineNumber = range.start.line;
			const maxLineNumber = range.end.line;
			if (expectedLineNumber < minLineNumber) {
				expectedLineNumber = minLineNumber;
			}
			if (expectedLineNumber > maxLineNumber) {
				expectedLineNumber = maxLineNumber;
			}
			expectedLocationInSubSequence = this.getLineOffset(expectedLineNumber) - this.document.offsetAt(range.start);
		}
		const matchScoreComputer = this.getMatchScoreComputer(range, expectedLineNumber);
		const pattern = new LowerCaseCharSequence(lineContent).toString();

		const fuzzyFilteredStringMatcher = new FuzzyFilteredStringMatcher(
					new FuzzyStringMatcher(this.matchThreshold, matchScoreComputer),
					new RemoveExtraWhitespacesSequenceFilter());

		const matchPositionInSubSequence = fuzzyFilteredStringMatcher.find(lowerCharSubSequence, pattern,
						expectedLocationInSubSequence);
		if (matchPositionInSubSequence === -1) {
			return -1;
		}
		const matchPosition = charSubSequence.getParentIndex(matchPositionInSubSequence);
		if (matchPosition === undefined) {
			return -1;
		}
		return this.document.positionAt(matchPosition).line;
	}
	 
	private getMatchScoreComputer(range : Range, expectedLineNumber : number) : IMatchScoreComputer {
		if (expectedLineNumber === -1) {
			return new ErrorCountMatchScoreComputer();
		} else {
			const matchDistance = Math.max(this.getLineOffset(expectedLineNumber) - this.document.offsetAt(range.start),
				this.document.offsetAt(range.end) - this.getLineOffset(expectedLineNumber));
			return new DistanceMatchScoreComputer(matchDistance);
		}
	}	

	private getLineOffset(lineNumber : number) : number {
		return this.document.offsetAt(new Position(lineNumber, 0));
	}
 
}