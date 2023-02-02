import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {authInfoResponse} from "@/service/auth/auth";
import {REMOVE, UPDATE} from "@/store/const/userConst";
import {RootState} from "@/store/store";

export type StateUser = { auth: authInfoResponse | null }

const initialState: StateUser = {
  auth: null
}

const a = (a: string) => {
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [UPDATE]: (state, action: PayloadAction<authInfoResponse>) => {
      state.auth = action.payload
    },
    [REMOVE]: (state) => {
      state.auth = null
    },
  },
})

export const {update, remove} = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
