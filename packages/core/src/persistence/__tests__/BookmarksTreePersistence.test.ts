import { bookmarksTreeJSObject } from './mesfavoris'
import { BookmarksTreeSerializer } from '../BookmarksTreeSerializer';
import { BookmarksTreeDeserializer } from '../BookmarksTreeDeserializer';

const bookmarksTreeAsJson = JSON.stringify(bookmarksTreeJSObject, null, 2);

describe('Persistence Tests', () => {
    it('should be the same string than the original one once deserialized and serialized again', () => {
        const bookmarksTreeDeserializer = new BookmarksTreeDeserializer();
        const bookmarksTreeSerializer = new BookmarksTreeSerializer();
        const bookmarksTree = bookmarksTreeDeserializer.deserialize(bookmarksTreeAsJson);
        const newBookmarksTreeAsJson = bookmarksTreeSerializer.serialize(bookmarksTree);
        expect(newBookmarksTreeAsJson).toEqual(bookmarksTreeAsJson);
    });
});