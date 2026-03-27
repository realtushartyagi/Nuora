import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '@/lib/api'
import toast from 'react-hot-toast'

export interface User {
    _id: string;
    username: string;
    full_name: string;
    email: string;
    profile_picture: string;
    bio?: string;
    cover_photo?: string;
    [key: string]: any;
}

interface UserState {
    value: User | null;
}

const initialState: UserState = {
    value: null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string) => {
    const { data } = await api.get('/user/data', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data.success ? data.user : null
})

export const updateUser = createAsyncThunk('user/update', async ({ userData, token }: { userData: any, token: string }) => {
    const { data } = await api.post('/user/update', userData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    if (data.success) {
        toast.success(data.message)
        return data.user
    } else {
        toast.error(data.message)
        return null
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.value = action.payload
        }).addCase(updateUser.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.value = action.payload
        })
    }
})

export default userSlice.reducer
