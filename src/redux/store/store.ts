import { configureStore } from '@reduxjs/toolkit'
import authSlices from "../slices/authSlices"


export const store = configureStore({
  reducer: {
   auth: authSlices
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch