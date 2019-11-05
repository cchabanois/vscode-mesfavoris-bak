import { createEpicMiddleware, Epic, StateObservable } from "redux-observable";
import epics from "./epics";
import { applyMiddleware, createStore, Action } from "redux";
import reducers from "./reducers";
import { from, InteropObservable, Observable, Subscriber, BehaviorSubject } from "rxjs";
import { State } from "./state/State";
import { map, distinctUntilChanged, mergeMap } from "rxjs/operators";
import { BookmarksTree } from "./model/BookmarksTree";
import { bookmarksTreeStateReducer } from "./reducers/BookmarksTreeStateReducer";


const epicMiddleware = createEpicMiddleware();

export const epic$ = new BehaviorSubject(epics);
const rootEpic : Epic = (inputAction$, outputAction$, state$) => epic$.pipe(
  mergeMap(epic => epic(inputAction$, outputAction$, state$))
);

export const reducersMap = {
  bookmarksTreeState: bookmarksTreeStateReducer
}

function configureStore() {
  const store = createStore(reducers, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
}
  
export const store = configureStore();


// Why not just state$ = from(store) or state$ = from(store as unknown as InteropObservable<State>);
export const state$ = new Observable<State>((subscriber: Subscriber<State>) => (store as unknown as InteropObservable<State>)[Symbol.observable]().subscribe(subscriber));

export const bookmarksTree$ : Observable<BookmarksTree> = state$.pipe(map(state => state.bookmarksTreeState.bookmarksTree), distinctUntilChanged());
