import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '@/lib/api'
import { User } from './userSlice'

interface ConnectionsState {
    connections: User[];
    pendingConnections: User[];
    followers: User[];
    following: User[];
}

const initialState: ConnectionsState = {
    connections: [],
    pendingConnections: [],
    followers: [],
    following: []
}

export const fetchConnections = createAsyncThunk('connections/fetchConnections', async (token: string) => {
    const { data } = await api.get('/user/connections', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return data.success ? data : null;
})

const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchConnections.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.connections = action.payload.connections
                state.pendingConnections = action.payload.pendingConnections
                state.followers = action.payload.followers
                state.following = action.payload.following
            }
        })
    }
})

export default connectionsSlice.reducer
