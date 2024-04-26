import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
  isLoggedIn: boolean;
  userData : any
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
  userData : {}
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.userData = action.payload
    },
    logoutUser: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = false;
      state.userData = {}
    },
  },
})

export const { setLoginState, setUserData, logoutUser } = userSlice.actions

export default userSlice.reducer