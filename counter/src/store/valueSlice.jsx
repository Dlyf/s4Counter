// Installez le projet app-counter avec vite (bundle).

// Créez un bouton pour incrémenter une valeur de manière aléatoire.

// Pour chaque valeur affichée; vous indiquerez si le nombre est pair ou impair. Aidez-vous de la remarque qui suit pour mettre en place cette fonctionnalité.

// Définissez un compteur asynchrone dans une promesse.

// Ajoutez un bouton permettant d'afficher une valeur incrémentée +1 de manière asynchrone en utilisant createAsynchThunk

// Maintenant le délai du compteur est de 500ms; ajoutez à ce compteur la fonctionnalité suivante : 
// si la valeur du compteur dépasse 10 on incrémente de +2.
// Et si on atteind 20 on rend inactif le bouton.

// import de la fonction 
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// définit un state 
const aleaMax = 10;
// const initialState = { number: 0 }
const initialState = {
  number: 0,
  parity: null,
  step: 0
}
const parityName = {
  even : "even",
  odd: "odd"
}

function delay(number, time) {

  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // if (number < 0) {
          //     reject(`Number < 0, ${number} `)

          //     return;
          // }
          // if (number === 10)

          // ce que la promesse retourne comme valeur dans la fonction de callback 
          resolve(number);

      }, time)
  });
}

export const counterAsync = createAsyncThunk(
  'counterAsync',
  async (number) => {
    const num = await delay(number, 500)
    return num
  }
)

export const valueSliceAsync = createSlice({
  name: 'counter2',
  initialState : { countA : 0, active: true },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(counterAsync.pending, (state, action) => {
      // todo ?
      console.log(state)
    });
    builder.addCase(counterAsync.fulfilled, (state, action) => {
      let count = action.payload;
      if(state.countA + action.payload > 10) {
          count = 2 * count;
      }

      if(state.countA + action.payload > 20) {
        state.active = false
      }
      state.countA += count;
    });
    builder.addCase(counterAsync.rejected, (state, action) => {
        // todo ?
        console.log(state);
    })
  },
})
const valueSlice = createSlice({
    // clé permettant d'identifier le reducer spécifique 
      name: 'counter',
      initialState,
      // gestions des actions dans le/les reducer(s) du state
      // reducers: {
      //   increment: {
      //     prepare: (coeff) => {
      //       const alea = Math.floor(Math.random() * aleaMax * coeff) + 1 ;
      //      return { payload : alea }
      //     },
      //     reducer: (state, action) => {
      //       const  { number } = action.payload;
      //       state.number += number;
      //     }
      //   }
      // },
      reducers: {
        increment:{
            // le reducer modifie le state
            reducer: (state, action) => {
               const { number } =  action.payload;
               console.log("actioncreateslice", action);

               state.number += number;
               state.parity = ( state.number % 2 ) ? parityName.odd : parityName.even
               state.step = number; 
            },
            // prépare le payload petite couche avant le reducer
            prepare: (coeff) => {
                // valeur aléatoire 
                const alea = Math.floor(Math.random() * aleaMax * coeff) + 1 ;
                console.log("paramter of prepare que l'on retrouve dans la méthode incremente dans le component", coeff)

                return {
                    payload:{
                        number: alea
                    }
                }
            }
        }
    }
    })

    // Export des actions
    // export const store = configureStore({
    //      reducer: {
    //        e : counterSlice.reducer
    //     }
    // });

    export const { increment } = valueSlice.actions

    // pour counterSlice le store dans l'arbre React
    export default configureStore({
      // combine reducer == lorsqu'il y a plusieurs reducers
      reducer: {
        c : valueSlice.reducer,
        ca : valueSliceAsync.reducer
      }, // passe le state pour lecture dans useSelector
  });