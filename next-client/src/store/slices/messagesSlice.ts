import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '@/lib/api'

export interface Message {
    _id: string;
    from_user_id: any;
    to_user_id: string;
    text: string;
    message_type: 'text' | 'image';
    media_url?: string;
    createdAt: string;
}

interface MessagesState {
    messages: Message[]
}

const initialState: MessagesState = {
    messages: []
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async ({ token, userId }: { token: string, userId: string }) => {
    const { data } = await api.post('/message/get', { to_user_id: userId }, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data.success ? data : null
})

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages = [...state.messages, action.payload]
        },
        resetMessages: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
                state.messages = action.payload.messages
            }
        })
    }
})

export const { setMessages, addMessage, resetMessages } = messagesSlice.actions;

export default messagesSlice.reducer
