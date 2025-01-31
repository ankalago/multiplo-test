import { IMultigram } from '../../entities/multigram'
import { createSlice } from '@reduxjs/toolkit'

export const multigramEmptyState: IMultigram[] = []

export const multigramSlice = createSlice({
	name: 'multigram',
	initialState: multigramEmptyState,
	reducers: {
		setData: (_state, action) => action.payload,
		addItem: (state, action) => [...state, action.payload],
	},
})

export const { addItem, setData } = multigramSlice.actions

export default multigramSlice.reducer
