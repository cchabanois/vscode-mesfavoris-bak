// import { Bookmark, BookmarkFolder } from "../model/Bookmark";
import { TreeView, ExtensionContext, window } from "vscode";
import { BookmarksTreeDataProvider } from "./BookmarksTreeDataProvider";
//import { BookmarksTree } from "../model/BookmarksTree";
//import { Map } from "immutable";
import { BookmarksTreeDeserializer, store, loadBookmarks, bookmarksTree$ } from '@mesfavoris/core';
import * as fs from 'fs';

export class MesFavoris {

	constructor(context: ExtensionContext) {
      store.dispatch(loadBookmarks.request("/home/cchabanois/git/vscode-mesfavoris/packages/mesfavoris/src/ui/open source projects.json"));
      const treeDataProvider = new BookmarksTreeDataProvider(() => store.getState().bookmarksTreeState.bookmarksTree, context.extensionPath);
      bookmarksTree$.subscribe(() => treeDataProvider.refresh());
		window.createTreeView('mesFavoris', { treeDataProvider });
	}

}