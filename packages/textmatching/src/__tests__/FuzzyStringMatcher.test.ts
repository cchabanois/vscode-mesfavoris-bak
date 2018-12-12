import * as fs from 'fs';
import { BitapStringMatcher } from '../BitapStringMatcher';
import { DistanceMatchScoreComputer } from '../DistanceMatchScoreComputer';
import 'jest-extended';
import { FuzzyStringMatcher } from '../FuzzyStringMatcher';

describe('FuzzyStringMatcher Tests', () => {
    let text : string;
    let matcher : FuzzyStringMatcher;
    beforeEach(() => {
        text = fs.readFileSync(__dirname + '/AbstractDocument.java.txt', 'utf8');
        matcher = new FuzzyStringMatcher(0.5, new DistanceMatchScoreComputer(10000));
    });
    test('find', () => {
        const match = matcher.find(text, "    while (position != null && position.offset == offset) {", 12790);
        expect(text.substring(match, match+100).trim()).toStartWith('while (p != null && p.offset == offset) {');
    });
});