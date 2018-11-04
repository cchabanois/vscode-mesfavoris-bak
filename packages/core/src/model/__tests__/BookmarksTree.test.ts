import { BookmarksTree } from '../BookmarksTree';
import { Bookmark, BookmarkFolder } from '../Bookmark';
import { List } from 'immutable';

describe('BookmarksTree Tests', () => {
    let bookmarksTree : BookmarksTree;
    const rootFolder = BookmarkFolder.bookmarkFolder("rootId", "root");
	const bookmarkFolder1 = BookmarkFolder.bookmarkFolder("folder1Id", "folder1");
	const bookmarkFolder2 = BookmarkFolder.bookmarkFolder("folder2Id", "folder2");
	const bookmark1 = new Bookmark("id1");
	const bookmark2 = new Bookmark("id2");
	const bookmark3 = new Bookmark("id3");
	const bookmark4 = new Bookmark("id4");
	const bookmark5 = new Bookmark("id5");
	const bookmark6 = new Bookmark("id6");

    beforeEach(() => {
		bookmarksTree = BookmarksTree.bookmarksTree(rootFolder);
		bookmarksTree = bookmarksTree.addBookmarks(rootFolder.bookmarkId, [bookmarkFolder1, bookmarkFolder2], 0);
		bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder1.bookmarkId, [bookmark1, bookmark2, bookmark3], 0);
		bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder2.bookmarkId, [bookmark4, bookmark5, bookmark6], 0);
    });
	
	describe('getParent' , () => {
		test('should return undefined for the root folder', () => {
            // Given
			let actualRootFolder = bookmarksTree.getBookmarkFolder(bookmarksTree.rootFolderId);
			expect(actualRootFolder).toBeDefined;
			actualRootFolder = actualRootFolder!;

		    // When
		    const parent = bookmarksTree.getParentBookmark(actualRootFolder.bookmarkId);

			// Then
			expect(parent).toBeUndefined();
        });
		test('should return the parent bookmark folder' , () => {
			// When
			let bookmarkFolder = bookmarksTree.getParentBookmark(bookmark6.bookmarkId);

			// Then
			expect(bookmarkFolder).toBeDefined;
			bookmarkFolder = bookmarkFolder!;
			expect(bookmarkFolder.bookmarkId).toEqual(bookmarkFolder2.bookmarkId);
		});
	});
	describe('getChildren', () => {
		test('should return children for a folder', () => {
			// When
			const children = bookmarksTree.getChildren(bookmarkFolder1.bookmarkId);

			// Then
			expect(children).toEqual(List([bookmark1, bookmark2, bookmark3]));
		});
		test('should throw an exception if not a folder', () => {
			expect(() => bookmarksTree.getChildren(bookmark1.bookmarkId)).toThrow(Error('id1 is not the id of a bookmark folder'));
		});
	});
	describe('addBookmarks', () => {
		test('should add bookmarks at the end when there is no position given', () => {
			// Given
			const bookmark7 = new Bookmark('id7');
			const bookmark8 = new Bookmark('id8');

			// When
			bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder1.bookmarkId, [bookmark7, bookmark8]);

			expect(bookmarksTree.getChildren(bookmarkFolder1.bookmarkId)).toEqual(List([bookmark1, bookmark2, bookmark3, bookmark7, bookmark8]));
			expect(bookmarksTree.getParentBookmark(bookmark7.bookmarkId)).toEqual(bookmarkFolder1);
			expect(bookmarksTree.getParentBookmark(bookmark8.bookmarkId)).toEqual(bookmarkFolder1);
		});
		test('should throw an exception if we try to add the same bookmark twice', () => {
			expect(() => bookmarksTree.addBookmarks(bookmarkFolder2.bookmarkId, [bookmark1])).toThrow(Error('Bookmark already in tree'));
		});
	});
});