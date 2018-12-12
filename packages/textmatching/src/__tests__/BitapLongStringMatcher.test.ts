import * as fs from 'fs';
import { BitapStringMatcher } from '../BitapStringMatcher';
import { DistanceMatchScoreComputer } from '../DistanceMatchScoreComputer';
import 'jest-extended';
import { BitapLongStringMatcher } from '../BitapLongStringMatcher';

describe('BitapLongMatcher Tests', () => {
    let text : string;
    let matcher : BitapLongStringMatcher;
    beforeEach(() => {
        text = fs.readFileSync(__dirname + '/AbstractDocument.java.txt', 'utf8');
        matcher = new BitapLongStringMatcher(0.5, new DistanceMatchScoreComputer(10000));
    });
    test('find', () => {
        const match = matcher.find(text, "RegisteredReplace(IDocumentListener docListener, IDocumentExt", 30);
        expect(text.substring(match)).toStartWith('RegisteredReplace(IDocumentListener owner, IDocumentExtension.IReplace replace) {');
    });
});