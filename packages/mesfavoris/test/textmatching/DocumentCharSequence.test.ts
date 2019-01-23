import { expect } from 'chai';
import * as vscode from 'vscode';
import * as path from 'path';
import { DocumentCharSequence } from '../../src/textmatching/DocumentCharSequence';

describe('DocumentCharSequence Tests', () => {
    describe('length', () => {
        it('returns the document length', async () => {
            const document = await vscode.workspace.openTextDocument(path.join(__dirname, 'AbstractDocument.java.txt'));
            const documentCharSequence = new DocumentCharSequence(document);
            expect(documentCharSequence.length()).eq(57812);
        });
        it('returns 0 for an empty document', async () => {
            const document = await vscode.workspace.openTextDocument();
            const documentCharSequence = new DocumentCharSequence(document);
            expect(documentCharSequence.length()).eq(0);
        });
    });
    describe('charAt', () => {
        it('returns the character at the given position', async () => {
            const document = await vscode.workspace.openTextDocument(path.join(__dirname, 'AbstractDocument.java.txt'));
            const documentCharSequence = new DocumentCharSequence(document);
            let result : string = '';
            for (let i = 0; i < documentCharSequence.length(); i++) {
                result += documentCharSequence.charAt(i);
            }
            expect(result).eq(document.getText());
        });
    });
});