import { expect } from 'chai';
import * as vscode from 'vscode';
import * as path from 'path';
import { DocumentFuzzySearcher } from '../../src/textmatching/DocumentFuzzySearcher';

const getRange = (line1 : number, line2 : number) => {
    const range = new vscode.Range(new vscode.Position(line1, 0), new vscode.Position(line2, Number.MAX_SAFE_INTEGER));
    return range;
}

describe('DocumentFuzzySearcher Tests', () => {
    let document : vscode.TextDocument;
    let searcher : DocumentFuzzySearcher;

    before(async () => {
        document = await vscode.workspace.openTextDocument(path.join(__dirname, 'AbstractDocument.java.txt'));
        searcher = new DocumentFuzzySearcher(document);
    });
    describe('Without expected line number', () => {
        it('finds the line number', () => {
            const lineNumber = searcher.findLineNumber("private int computeIndexInPosition(List positions, int offset, boolean orderedByOffset) {");
            expect(lineNumber).eq(468);
        });
    });
    describe('With an expected line number', () => {
        it('finds the line number', () => {
            const lineNumber = searcher.findLineNumber("private int computeIndexInPosition(List positions, int offset, boolean orderedByOffset) {", { expectedLineNumber : 450 });
            expect(lineNumber).eq(468);
        });
    });
    describe('In a given text range', () => {
        it('finds the line number', () => {
            const range = getRange(458, 483);
            const lineNumber = searcher.findLineNumber("private int computeIndexInPosition(List positions, int offset, boolean orderedByOffset) {", { expectedLineNumber : 470, range });
            expect(lineNumber).eq(468);
        });
    });
});