import { Map, List } from 'immutable';
import { BookmarkId, Bookmark, BookmarkFolder } from './Bookmark';

export class BookmarksTree {
    public readonly rootFolderId: BookmarkId;
    private readonly bookmarksMap: Map<BookmarkId, Bookmark>;
    private readonly childrenMap: BookmarksChildrenMap;
    private readonly parentMap: BookmarksParentsMap;

    private constructor(rootFolderId: BookmarkId, bookmarksMap: Map<BookmarkId, Bookmark>, childrenMap: BookmarksChildrenMap, parentMap: BookmarksParentsMap) {
        this.rootFolderId = rootFolderId;
        this.bookmarksMap = bookmarksMap;
        this.childrenMap = childrenMap;
        this.parentMap = parentMap;
    }

    public static bookmarksTree(rootFolder: BookmarkFolder) {
        let bookmarksMap: Map<BookmarkId, Bookmark> = Map();
        bookmarksMap = bookmarksMap.set(rootFolder.bookmarkId, rootFolder);
        return new BookmarksTree(rootFolder.bookmarkId, bookmarksMap, new BookmarksChildrenMap(), new BookmarksParentsMap());
    }

    private bookmarksTree(rootFolderId: BookmarkId, bookmarksMap: Map<BookmarkId, Bookmark>, childrenMap: BookmarksChildrenMap, parentMap: BookmarksParentsMap): BookmarksTree {
        if (this.rootFolderId === rootFolderId && this.bookmarksMap === bookmarksMap && this.parentMap === parentMap) {
            return this;
        }
        return new BookmarksTree(rootFolderId, bookmarksMap, childrenMap, parentMap);
    }

    public addBookmarks(parentId: BookmarkId, bookmarks: Iterable<Bookmark>, index?: number): BookmarksTree {
        this.checkBookmarkFolderExist(parentId);
        this.checkBookmarksNotInTree(bookmarks);
        let bookmarksMap = this.bookmarksMap.withMutations(map => {
            for (let bookmark of bookmarks) {
                map = map.set(bookmark.bookmarkId, bookmark);
            }
        });
        const bookmarkIds = this.getBookmarkIds(bookmarks);
        const childrenMap = this.childrenMap.add(parentId, bookmarkIds, index);
        const parentMap = this.parentMap.setParent(bookmarkIds, parentId);
        return this.bookmarksTree(this.rootFolderId, bookmarksMap, childrenMap, parentMap);
    }

    public getBookmark(bookmarkId: BookmarkId): Bookmark | undefined {
        return this.bookmarksMap.get(bookmarkId);
    }

    public getBookmarkFolder(bookmarkId: BookmarkId): BookmarkFolder | undefined {
        const bookmark = this.bookmarksMap.get(bookmarkId);
        if (bookmark instanceof BookmarkFolder) {
            return bookmark as BookmarkFolder;
        }
        return undefined;
    }

    public getChildren(parentId: BookmarkId): List<Bookmark> {
        this.checkBookmarkFolderExist(parentId);
        return this.childrenMap.getChildren(parentId).map(bookmarkId => this.getBookmark(bookmarkId) as Bookmark);
    }

    public getParentBookmark(bookmarkId: BookmarkId): Bookmark | undefined {
        this.checkBookmarkExist(bookmarkId);
        const parentId = this.parentMap.getParent(bookmarkId);
        if (!parentId) {
            return undefined;
        } else {
            return this.bookmarksMap.get(parentId) as BookmarkFolder;
        }
    }

    public setPropertyValue(bookmarkId: BookmarkId, propertyName: string, propertyValue: string | undefined) : BookmarksTree {
        let bookmark = this.checkBookmarkExist(bookmarkId);
        let newProperties: Map<string, string>;
        if (propertyValue === undefined) {
            newProperties = bookmark.properties.delete(propertyName);
        } else {
            if (propertyValue !== bookmark.properties.get(propertyName)) {
                newProperties = bookmark.properties.set(propertyName, propertyValue);
            } else {
                newProperties = bookmark.properties;
            }
        }
        if (newProperties === bookmark.properties) {
            return this;
        }
        if (bookmark instanceof BookmarkFolder) {
            bookmark = new BookmarkFolder(bookmark.bookmarkId, newProperties);
        } else {
            bookmark = new Bookmark(bookmark.bookmarkId, newProperties);
        }
        const newBookmarksMap = this.bookmarksMap.set(bookmark.bookmarkId, bookmark);
        return new BookmarksTree(this.rootFolderId, newBookmarksMap, this.childrenMap, this.parentMap);
    }

    public setProperties(bookmarkId: BookmarkId, properties : Map<string, string>) : BookmarksTree {
        let bookmark = this.checkBookmarkExist(bookmarkId);
        if (bookmark.properties.equals(properties)) {
            return this;
        }
        if (bookmark instanceof BookmarkFolder) {
            bookmark = new BookmarkFolder(bookmark.bookmarkId, properties);
        } else {
            bookmark = new Bookmark(bookmark.bookmarkId, properties);
        }
        const newBookmarksMap = this.bookmarksMap.set(bookmark.bookmarkId, bookmark);
        return new BookmarksTree(this.rootFolderId, newBookmarksMap, this.childrenMap, this.parentMap);
    }

    public deleteBookmark(bookmarkId : BookmarkId, recurse : boolean = false) : BookmarksTree {
        const bookmark = this.getBookmark(bookmarkId);
        if (!bookmark) {
            return this;
        }
        this.checkNotRootFolder(bookmarkId);
        let newBookmarksTree : BookmarksTree = this;
        if (recurse && bookmark instanceof BookmarkFolder) {
            newBookmarksTree = this.deleteBookmarksUnder(bookmarkId);
            return newBookmarksTree.deleteBookmark(bookmarkId);
        }
        if (this.childrenMap.hasChildren(bookmarkId)) {
            throw new Error('Cannot delete non-empty folder');
        }
        const parentFolder = this.getParentBookmark(bookmarkId)!;
        return new BookmarksTree(
            this.rootFolderId, 
            this.bookmarksMap.delete(bookmarkId), 
            this.childrenMap.delete(parentFolder.bookmarkId, bookmarkId), 
            this.parentMap.delete(bookmarkId));
    }

    private deleteBookmarksUnder(bookmarkFolderId : BookmarkId) : BookmarksTree {
        const subTreeBookmarks = new Set<Bookmark>();
        this.getAllBookmarksUnder(bookmarkFolderId, subTreeBookmarks);
        let newChildrenMap = this.childrenMap;
        let newParentMap = this.parentMap;
        let newBookmarksMap = this.bookmarksMap;
        subTreeBookmarks.forEach(bookmark => {
            newChildrenMap = newChildrenMap.delete(bookmark.bookmarkId);
            newParentMap = newParentMap.delete(bookmark.bookmarkId);
            newBookmarksMap = newBookmarksMap.delete(bookmark.bookmarkId);
        });
        newChildrenMap = newChildrenMap.delete(bookmarkFolderId);
        return new BookmarksTree(this.rootFolderId, newBookmarksMap, newChildrenMap, newParentMap);
    }

    private getAllBookmarksUnder(bookmarkFolderId : BookmarkId, bookmarks : Set<Bookmark>) {
        const children = this.childrenMap.getChildren(bookmarkFolderId)
            .map(bookmarkId => this.getBookmark(bookmarkId)!);
        children.forEach(bookmark => {
            bookmarks.add(bookmark);
            if (bookmark instanceof BookmarkFolder) {
                this.getAllBookmarksUnder(bookmark.bookmarkId, bookmarks);
            }
        });
    }

    private getBookmarkIds(bookmarks: Iterable<Bookmark>): List<BookmarkId> {
        return List().withMutations(list => {
            for (let bookmark of bookmarks) {
                list.push(bookmark.bookmarkId);
            }
        });
    }

    private checkBookmarkFolderExist(bookmarkId: BookmarkId): BookmarkFolder {
        const bookmark = this.getBookmark(bookmarkId);
        if (!bookmark) {
            throw new Error(`No bookmark with id ${bookmarkId}`);
        }
        if (!(bookmark instanceof BookmarkFolder)) {
            throw new Error(`${bookmarkId} is not the id of a bookmark folder`);
        }
        return bookmark as BookmarkFolder;
    }

    private checkBookmarkExist(bookmarkId: BookmarkId): Bookmark {
        const bookmark = this.getBookmark(bookmarkId);
        if (!bookmark) {
            throw new Error(`No bookmark with id ${bookmarkId}`);
        }
        return bookmark as Bookmark;
    }

    private checkBookmarksNotInTree(bookmarks: Iterable<Bookmark>) {
        for (let bookmark of bookmarks) {
            if (this.getBookmark(bookmark.bookmarkId)) {
                throw new Error("Bookmark already in tree");
            }
        }
    }

    private checkNotRootFolder(bookmarkId : BookmarkId) {
        if (this.rootFolderId === bookmarkId) {
            throw new Error("Operation invalid on root folder");
        }
    }

}

class BookmarksChildrenMap {
    private readonly idToChildren: Map<BookmarkId, List<BookmarkId>>;

    constructor(idToChildren?: Map<BookmarkId, List<BookmarkId>>) {
        if (idToChildren) {
            this.idToChildren = idToChildren;
        } else {
            this.idToChildren = Map();
        }
    }

    private createBookmarksChildrenMap(idToChildren: Map<BookmarkId, List<BookmarkId>>) {
        if (idToChildren === this.idToChildren) {
            return this;
        }
        return new BookmarksChildrenMap(idToChildren);
    }


    public delete(parentId : BookmarkId, bookmarkId? : BookmarkId) : BookmarksChildrenMap {
        if (!bookmarkId) {
            return this.createBookmarksChildrenMap(this.idToChildren.delete(parentId));
        }
        let newChildrenList = this.idToChildren.get(parentId);
        if (!newChildrenList) {
            return this;
        }
        const index = newChildrenList.findIndex(value => value === bookmarkId);
        newChildrenList = newChildrenList.delete(index);
        if (newChildrenList.isEmpty()) {
            return new BookmarksChildrenMap(this.idToChildren.delete(parentId));
        } else {
            return new BookmarksChildrenMap(this.idToChildren.set(parentId, newChildrenList));
        }
    }

    public add(parentId: BookmarkId, bookmarkIds: List<BookmarkId>, index?: number): BookmarksChildrenMap {
        let children = this.idToChildren.get(parentId);
        if (!children) {
            children = List();
        }
        if (index) {
            for (let bookmarkId of bookmarkIds) {
                children = children.insert(index, bookmarkId);
                index++;
            }
        } else {
            children = children.push(...bookmarkIds.toArray());
        }
        return this.createBookmarksChildrenMap(this.idToChildren.set(parentId, children));
    }

    public getChildren(parentId: BookmarkId): List<BookmarkId> {
        return this.idToChildren.get(parentId, List());
    }

    public hasChildren(parentId: BookmarkId) : boolean {
        return this.idToChildren.has(parentId);
    }

}

class BookmarksParentsMap {
    private readonly idToParent: Map<BookmarkId, BookmarkId>;

    constructor(idToParent?: Map<BookmarkId, BookmarkId>) {
        if (idToParent) {
            this.idToParent = idToParent;
        } else {
            this.idToParent = Map();
        }
    }

    private createBookmarksParentMap(idToParent: Map<BookmarkId, BookmarkId>): BookmarksParentsMap {
        if (this.idToParent === idToParent) {
            return this;
        }
        return new BookmarksParentsMap(idToParent);
    }

    public getParent(bookmarkId: BookmarkId): BookmarkId | undefined {
        return this.idToParent.get(bookmarkId);
    }

    public setParent(bookmarkIds: List<BookmarkId>, parentId: BookmarkId): BookmarksParentsMap {
        let idToParent = this.idToParent;
        for (let bookmarkId of bookmarkIds) {
            idToParent = idToParent.set(bookmarkId, parentId);
        }
        return this.createBookmarksParentMap(idToParent);
    }

    public delete(bookmarkId: BookmarkId): BookmarksParentsMap {
        return this.createBookmarksParentMap(this.idToParent.delete(bookmarkId));
    }

}