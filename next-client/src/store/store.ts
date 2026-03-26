import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import connectionsReducer from './slices/connectionsSlice'
import messagesReducer from './slices/messagesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      connections: connectionsReducer,
      messages: messagesReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
