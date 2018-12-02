import * as fs from 'fs';
import { BitapStringMatcher } from '../BitapStringMatcher';
import { DistanceMatchScoreComputer } from '../DistanceMatchScoreComputer';
import 'jest-extended';
import { BitapBigIntegerStringMatcher } from '../BitapBigIntegerStringMatcher';

describe('BitapStringMatcher Tests', () => {
    let text : string;
    let matcher : BitapBigIntegerStringMatcher;
    beforeEach(() => {
        text = fs.readFileSync(__dirname + '/AbstractDocument.java.txt', 'utf8');
        matcher = new BitapBigIntegerStringMatcher(0.5, new DistanceMatchScoreComputer(10000));
    });
    test('find', () => {
        const match = matcher.find(text, "RegisteredReplace(IDocumentListener docListener, IDocumentExtension.IReplace replace) {", 30);
        expect(text.substring(match)).toStartWith('RegisteredReplace(IDocumentListener owner, IDocumentExtension.IReplace replace) {');
    });
});