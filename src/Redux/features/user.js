import { createSlice } from '@reduxjs/toolkit';

// const initialValue = {
// 	id: '',
// 	name: '',
// 	email: '',
// 	rating: 0,
// 	phoneNumber: '',
// 	comment: ''
// };

const UserSlice = createSlice({
	name: 'UserDetails',
	initialState: { value: [] },
	reducers: {
		setUserData: (state, action) => {
			const data = JSON.parse(localStorage.getItem('UserDataList'));
			console.log(action.payload);
			state.value = action.payload;

			const allReviews = [ ...data, state.value ];
			console.log(allReviews);
			localStorage.setItem('UserDataList', JSON.stringify(allReviews));
		}
	}
});

export const { setUserData, getUserData } = UserSlice.actions;
export default UserSlice.reducer;
