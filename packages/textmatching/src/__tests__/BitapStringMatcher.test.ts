import * as fs from 'fs';
import { BitapStringMatcher } from '../BitapStringMatcher';
import { DistanceMatchScoreComputer } from '../DistanceMatchScoreComputer';
import 'jest-extended';

describe('BitapStringMatcher Tests', () => {
    let text : string;
    let matcher : BitapStringMatcher;
    beforeEach(() => {
        text = fs.readFileSync(__dirname + '/AbstractDocument.java.txt', 'utf8');
        matcher = new BitapStringMatcher(0.5, new DistanceMatchScoreComputer(10000));
    });
    test('find', () => {
        const match = matcher.find(text, "RegisteredReplacer(", 30);
        expect(text.substring(match)).toStartWith('RegisteredReplace(IDocumentListener owner, IDocumentExtension.IReplace replace) {');
    });
});