import { createEpicMiddleware, Epic, StateObservable } from "redux-observable";
import epics from "./epics";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { from, InteropObservable, Observable, Subscriber } from "rxjs";
import { State } from "./state/State";
import { map, distinctUntilChanged } from "rxjs/operators";
import { BookmarksTree } from "./model/BookmarksTree";


const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const store = createStore(reducers, applyMiddleware(epicMiddleware));
  epicMiddleware.run(epics as Epic);
  return store;
}
  
  
export const store = configureStore();


// Why not just state$ = from(store) or state$ = from(store as unknown as InteropObservable<State>);
export const state$ = new Observable<State>((subscriber: Subscriber<State>) => (store as unknown as InteropObservable<State>)[Symbol.observable]().subscribe(subscriber));

export const bookmarksTree$ : Observable<BookmarksTree> = state$.pipe(map(state => state.bookmarksTreeState.bookmarksTree), distinctUntilChanged());
