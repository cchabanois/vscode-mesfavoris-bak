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
        let bookmarksMap = this.bookmarksMap.withMutations(map=>{
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

    public getBookmarkFolder(bookmarkId : BookmarkId) : BookmarkFolder | undefined {
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

    private getBookmarkIds(bookmarks: Iterable<Bookmark>): List<BookmarkId> {
        return List().withMutations(list=> {
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


    public delete(bookmarkId: BookmarkId): BookmarksChildrenMap {
        return this.createBookmarksChildrenMap(this.idToChildren.delete(bookmarkId));
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