import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:'',
  email: '',
  phone:'',
  address:'',
  access_token: '',
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) =>{
      const {email ='', name ='', access_token ='', phone ='', address ='' , _id= ''} = action.payload
      state.name = name  ;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.id = _id;
      state.access_token = access_token;
    },
    resetUser: (state) =>{
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.id = '';
      state.access_token = '';
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer