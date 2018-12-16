import * as fs from 'fs';
import { DistanceMatchScoreComputer } from '../DistanceMatchScoreComputer';
import 'jest-extended';
import { FuzzyStringMatcher } from '../FuzzyStringMatcher';
import { FuzzyFilteredStringMatcher } from '../FuzzyFilteredStringMatcher';
import { RemoveExtraWhitespacesSequenceFilter } from '../RemoveExtraWhitespacesSequenceFilter';

describe('FuzzyFilteredStringMatcher Tests', () => {
    let text : string;
    let matcher : FuzzyFilteredStringMatcher;
    beforeEach(() => {
        text = fs.readFileSync(__dirname + '/AbstractDocument.java.txt', 'utf8');
        matcher = new FuzzyFilteredStringMatcher(
            new FuzzyStringMatcher(0.5, new DistanceMatchScoreComputer(10000)), 
            new RemoveExtraWhitespacesSequenceFilter());
    });
    test('find', () => {
        const match = matcher.find(text, "    while (position != null  &&  position.offset == offset) {", 12790);
        expect(text.substring(match, match+100).trim()).toStartWith('while (p != null && p.offset == offset) {');
    });
    test('not found', () => {
        const match = matcher.find(text, "This won't be found", 12790);
        expect(match).toBe(-1);
    });
});