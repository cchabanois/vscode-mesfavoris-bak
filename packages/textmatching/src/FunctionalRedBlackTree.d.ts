declare module 'functional-red-black-tree' {
    class RedBlackTreeIterator<K,V> {
        key : K;
        value : V;

        valid : boolean;
    }
    class RedBlackTree<K,V> {
        insert(key:K, value:V) : RedBlackTree;
        le(key:K) : RedBlackTreeIterator<K,V>;

        end : RedBlackTreeIterator<K,V>;
    }
    export default function createRBTree<K,V>() : RedBlackTree<K,V>;
}