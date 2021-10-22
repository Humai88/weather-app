import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { ActionAppTypes } from "../actions/actions";
import { appReducer } from "./../reducers/appReducer";

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

export default store;
// Types
export type AppStore = ReturnType<typeof appReducer>;
export type AppActionsType = ActionAppTypes;

export type ThunkType = ThunkAction<void, AppStore, unknown, AppActionsType>;
