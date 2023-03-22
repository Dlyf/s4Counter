import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Créez une page avec un bouton qui permet
// - de récupérer tous les utilisateurs (10 en tout) et
// - d'affichez le nom et le numéro de téléphone.


// Créez un deuxième bouton par nom d'utilisateur;
// il affiche la somme des caractères de "username" et "name". Si on clique à nouveau sur ce même bouton cette information disparaît.
const initialState = {
  users: [],
  userB: [],
  count: 0,
}

const urlUsers = `https://jsonplaceholder.typicode.com/users`;

export const userAsync = createAsyncThunk(
  'users/fetch',
  async () => {
      const res = await fetch(urlUsers);
      return await res.json();
  }
)
console.log("userAsync", userAsync)

export const userSliceAsync = createSlice({
    name: 'user',
    initialState,
    reducers: {
      deleteUser: {
        reducer : (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload);
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(userAsync.pending, (state, action) => {
        // todo ?
        console.log(state)
      });
      builder.addCase(userAsync.fulfilled, (state, action) => {
         state.users = action.payload
      });
      builder.addCase(userAsync.rejected, (state, action) => {
          // todo ?
          console.log(state);
      })
    },
  })

  // export const userCount = createAsyncThunk(
  //   'users/count',
  //   async () => {
  //     const res = await fetch(urlUsers);
  //     return await res.json();
  //   }
  // )

  export const userCountSliceAsync = createSlice({
    name: 'userB',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(userAsync.pending, (state, action) => {
        // todo ?
        // state.userB = action.payload
      });
      builder.addCase(userAsync.fulfilled, (state, action) => {
        // let count = action.payload;
        state.userB = action.payload
        // console.log("count", count);
  
      });
      builder.addCase(userAsync.rejected, (state, action) => {
          // todo ?
          console.log(state);
      })
    },
  })

  export const { deleteUser } = userSliceAsync.actions;

  export default configureStore({
    reducer : {
        ua : userSliceAsync.reducer,
        uc : userCountSliceAsync.reducer
    }
  })