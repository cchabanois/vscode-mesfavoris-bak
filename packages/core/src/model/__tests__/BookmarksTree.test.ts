import { BookmarksTree } from '../BookmarksTree';
import { Bookmark, BookmarkFolder, getBookmarkId } from '../Bookmark';
import { List, Map } from 'immutable';

describe('BookmarksTree Tests', () => {
	let bookmarksTree: BookmarksTree;
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

	describe('getParent', () => {
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
		test('should return the parent bookmark folder', () => {
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

			// Then
			expect(bookmarksTree.getChildren(bookmarkFolder1.bookmarkId)).toEqual(List([bookmark1, bookmark2, bookmark3, bookmark7, bookmark8]));
			expect(bookmarksTree.getParentBookmark(bookmark7.bookmarkId)).toEqual(bookmarkFolder1);
			expect(bookmarksTree.getParentBookmark(bookmark8.bookmarkId)).toEqual(bookmarkFolder1);
		});
		test('should throw an exception if we try to add the same bookmark twice', () => {
			expect(() => bookmarksTree.addBookmarks(bookmarkFolder2.bookmarkId, [bookmark1])).toThrow(Error('Bookmark already in tree'));
		});
	});
	describe('setPropertyValue', () => {
		test('set the property value', () => {
			// When
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop1', 'value1');
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop2', 'value2');

			// Then
			const newBookmark = bookmarksTree.getBookmark(bookmark1.bookmarkId)!;
			expect(newBookmark.properties.get('prop1')).toEqual('value1');
			expect(newBookmark.properties.get('prop2')).toEqual('value2');
		});
		test('should return the same bookmarksTree when we set the same property value than existing one', () => {
			// Given
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop1', 'value1');
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop2', 'value2');

			// When
			const newBookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop1', 'value1');

			// Then
			expect(newBookmarksTree).toBe(bookmarksTree);
		});
		test('delete a property', () => {
			// Given
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop1', 'value1');
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop2', 'value2');

			// When
			const newBookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop1', undefined);

			// Then
			const newBookmark = newBookmarksTree.getBookmark(bookmark1.bookmarkId)!;
			expect(newBookmark.properties.get('prop1')).toBeUndefined();
			expect(newBookmark.properties.get('prop2')).toEqual('value2');
		});
	});
	describe('setProperties', () => {
		test('set properties for a bookmark', () => {
			// Given
			const properties = Map({ prop1: 'value1', prop2: 'value2'});

			// When
			bookmarksTree = bookmarksTree.setProperties(bookmark1.bookmarkId, properties);

			// Then
			const bookmark = bookmarksTree.getBookmark(bookmark1.bookmarkId)!;
			expect(bookmark.properties.get('prop1')).toEqual('value1');
			expect(bookmark.properties.get('prop2')).toEqual('value2');			
		});
		test('should return the same bookmarksTree if we set the same properties than the existing ones', () => {
			// Given
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop1', 'value1');
			bookmarksTree = bookmarksTree.setPropertyValue(bookmark1.bookmarkId, 'prop2', 'value2');

			// When
			const newBookmarksTree = bookmarksTree.setProperties(bookmark1.bookmarkId, Map({ prop1: 'value1', prop2: 'value2'}));

			// Then
			expect(newBookmarksTree).toBe(bookmarksTree);			
		});
	});
	describe('deleteBookmark', () => {
		it('deletes a single bookmark', () => {
			// When
			bookmarksTree = bookmarksTree.deleteBookmark(bookmark2.bookmarkId, false);

			// Then
			expect(bookmarksTree.getBookmark(bookmark2.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getChildren(bookmarkFolder1.bookmarkId)).toEqual(List([bookmark1, bookmark3]));
		});
		test('should throw an exception if we try to delete a non-empty folder without recurse', () => {
			expect(() => bookmarksTree.deleteBookmark(bookmarkFolder2.bookmarkId)).toThrow(Error('Cannot delete non-empty folder'));
		});
		it('deletes a bookmark folder recursively when recurse is true', () => {
			// Given
			const bookmarkFolder3 = BookmarkFolder.bookmarkFolder('folder3Id', 'folder3');
			const bookmark7 = new Bookmark('id7');
			const bookmark8 = new Bookmark('id8');
			bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder2.bookmarkId, [bookmarkFolder3]);
			bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder3.bookmarkId, [bookmark7, bookmark8]);

			// When
			debugger;
			bookmarksTree = bookmarksTree.deleteBookmark(bookmarkFolder2.bookmarkId, true);

			// Then
			expect(bookmarksTree.getBookmark(bookmarkFolder2.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getBookmark(bookmark4.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getBookmark(bookmark5.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getBookmark(bookmark6.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getBookmark(bookmarkFolder3.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getBookmark(bookmark7.bookmarkId)).toBeUndefined();
			expect(bookmarksTree.getBookmark(bookmark8.bookmarkId)).toBeUndefined();
		});
	});
});