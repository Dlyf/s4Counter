// Installez le projet app-counter avec vite (bundle).

// Créez un bouton pour incrémenter une valeur de manière aléatoire.

// Pour chaque valeur affichée; vous indiquerez si le nombre est pair ou impair. Aidez-vous de la remarque qui suit pour mettre en place cette fonctionnalité.

// import de la fonction 
import { configureStore, createSlice } from '@reduxjs/toolkit'

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
      reducer: valueSlice.reducer // passe le state pour lecture dans useSelector
  });