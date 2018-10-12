import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, ProviderResult, ThemeIcon }  from 'vscode';
import { Bookmark, BookmarkFolder, BookmarksTree } from '@mesfavoris/core';
import { Base64ToUri } from './Base64ToUri';

export class BookmarksTreeDataProvider implements TreeDataProvider<Bookmark> {
    private readonly bookmarksTree : BookmarksTree;
    private readonly base64ToUri : Base64ToUri;

    constructor(bookmarksTree : BookmarksTree, base64Dir : string) {
        this.bookmarksTree = bookmarksTree;
        this.base64ToUri = new Base64ToUri(base64Dir);
    }
    
    async getTreeItem(element: Bookmark): Promise<TreeItem> {
        const label = element.properties.get(Bookmark.PROPERTY_NAME, "unknown");
        const treeItemCollapsableState = element instanceof BookmarkFolder ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None;
        const treeItem = new TreeItem(label, treeItemCollapsableState);
        treeItem.id = element.bookmarkId;
        if (element instanceof BookmarkFolder) {
            treeItem.iconPath = ThemeIcon.Folder;
        }
        const iconBase64 = element.properties.get("icon");
        if (iconBase64) {
            treeItem.iconPath = await this.base64ToUri.getUri(iconBase64);
        }
        return treeItem;
    }

    getChildren(element?: Bookmark): ProviderResult<Bookmark[]> {
        if (element) {
            if (element instanceof BookmarkFolder) {
                return this.bookmarksTree.getChildren(element.bookmarkId).toArray();
            } else {
                return [];
            }
        } else {
            return this.bookmarksTree.getChildren(this.bookmarksTree.rootFolderId).toArray();
        }
    }

    getParent?(element: Bookmark): ProviderResult<Bookmark> {
       const parent = this.bookmarksTree.getParentBookmark(element.bookmarkId);
       if (!parent || parent.bookmarkId === this.bookmarksTree.rootFolderId) {
           return undefined;
       }
       return parent;
    }
}