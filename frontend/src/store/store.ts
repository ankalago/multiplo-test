import { configureStore } from '@reduxjs/toolkit'
import { IMultigram } from '../entities/multigram'
import multigramSlice from './states/multigram'

export interface AppStore {
	multigram: IMultigram[]
}

export default configureStore<AppStore>({
	reducer: {
		multigram: multigramSlice,
	},
	preloadedState: {
		multigram: [],
	},
})
