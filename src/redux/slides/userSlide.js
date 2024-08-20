import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:'',
  email: '',
  phone:'',
  address:'',
  avatar: '',
  access_token: '',
  id: '',
  isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) =>{
      const {email ='', name ='', access_token ='', phone ='', address ='', avatar ='' , _id= '', isAdmin} = action.payload
      state.name = name  ;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) =>{
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.access_token = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer