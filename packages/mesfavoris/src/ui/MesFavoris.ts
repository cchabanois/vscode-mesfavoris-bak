// import { Bookmark, BookmarkFolder } from "../model/Bookmark";
import { TreeView, ExtensionContext, window } from "vscode";
import { BookmarksTreeDataProvider } from "./BookmarksTreeDataProvider";
//import { BookmarksTree } from "../model/BookmarksTree";
//import { Map } from "immutable";
import { BookmarksTreeDeserializer } from '@mesfavoris/core';
import * as fs from 'fs';

export class MesFavoris {

	constructor(context: ExtensionContext) {
        const bookmarksTreeDeserializer = new BookmarksTreeDeserializer();
        const bookmarksTree = bookmarksTreeDeserializer.deserialize(fs.readFileSync("/home/cchabanois/git/vscode-mesfavoris/test/open source projects.json", "utf8"));
     /*   const rootFolder = new BookmarkFolder("root");
        let bookmarksTree = BookmarksTree.bookmarksTree(rootFolder);
        const folder1 = new BookmarkFolder("folder1Id", Map({ [Bookmark.PROPERTY_NAME] : "folder1" }));
        const folder2 = new BookmarkFolder("folder2Id", Map({ [Bookmark.PROPERTY_NAME] : "folder2" }));
        const bookmark1 = new Bookmark("bookmark1Id", Map({ [Bookmark.PROPERTY_NAME] : "bookmark1" }));
        bookmarksTree = bookmarksTree.addBookmarks("root", 0, [ folder1, folder2]);
        bookmarksTree = bookmarksTree.addBookmarks("folder1Id", 0, [ bookmark1 ]); */
		const treeDataProvider = new BookmarksTreeDataProvider(bookmarksTree, context.extensionPath);
		window.createTreeView('mesFavoris', { treeDataProvider });
	}

}