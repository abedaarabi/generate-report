import { configureStore } from "@reduxjs/toolkit";
import { items, itemContent } from "../features/api/getItems";
import excelReducer from "../features/xlsxData/xlsxReducer";

export const store = configureStore({
  reducer: {
    excelData: excelReducer,
    [items.reducerPath]: items.reducer,
    [itemContent.reducerPath]: itemContent.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
