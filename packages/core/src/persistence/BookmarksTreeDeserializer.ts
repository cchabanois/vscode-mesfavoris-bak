import { BookmarksTree } from "../model/BookmarksTree";
import { BookmarkFolder, BookmarkId, Bookmark } from "../model/Bookmark";
import { Map } from "immutable";

export class BookmarksTreeDeserializer {

    public deserialize(jsonString : string) : BookmarksTree {
        return this.convert(JSON.parse(jsonString));
    }

    public convert(json : any) : BookmarksTree {
        const version : string = json.version;
        if (!version) {
            throw new Error("Invalid format");
        }
        if (version !== "1.0") {
            throw new Error("Invalid format : unknown version");
        }
        const bookmarks : any = json.bookmarks;
        if (!bookmarks) {
            throw new Error("Invalid format");
        }
        return this.convertBookmarksTree(bookmarks);
    }

    private convertBookmarksTree(bookmarks: any): BookmarksTree {
        if (!bookmarks.id || !bookmarks.children) {
            throw new Error("Invalid format");
        }
        let properties : Map<string,string>;
        if (bookmarks.properties) {
            properties = Map(bookmarks.properties);
        } else {
            properties = Map();
        }
        const rootFolder = new BookmarkFolder(bookmarks.id, properties);
        let bookmarksTree = BookmarksTree.bookmarksTree(rootFolder);
        bookmarksTree = this.convertBookmarksArray(bookmarks.children, bookmarksTree, bookmarks.id);
        return bookmarksTree;
    }

    private convertBookmarksArray(bookmarksArray: any[], bookmarksTree : BookmarksTree, parentId : BookmarkId): BookmarksTree {
        bookmarksArray.forEach( bookmark => bookmarksTree = this.convertBookmark(bookmark, bookmarksTree, parentId));
        return bookmarksTree;
    }

    private convertBookmark(bookmarkObject: any, bookmarksTree : BookmarksTree, parentId : BookmarkId): BookmarksTree {
        let properties : Map<string,string>;
        if (bookmarkObject.properties) {
            properties = Map(bookmarkObject.properties);
        } else {
            properties = Map();
        }
        if (bookmarkObject.children) {
            const bookmarkFolder = new BookmarkFolder(bookmarkObject.id, properties);
            bookmarksTree = bookmarksTree.addBookmarks(parentId, [bookmarkFolder]);
            bookmarksTree = this.convertBookmarksArray(bookmarkObject.children, bookmarksTree, bookmarkObject.id);
        } else {
            const bookmark = new Bookmark(bookmarkObject.id, properties);
            bookmarksTree = bookmarksTree.addBookmarks(parentId, [bookmark]);
        }
        return bookmarksTree;
    }

}