// Installez le projet app-counter avec vite (bundle).

// Créez un bouton pour incrémenter une valeur de manière aléatoire.

// Pour chaque valeur affichée; vous indiquerez si le nombre est pair ou impair. Aidez-vous de la remarque qui suit pour mettre en place cette fonctionnalité.

// import de la fonction 
import { configureStore, createSlice } from '@reduxjs/toolkit'

// définit un state 
const initialState = { counter: 0 }

const counterSlice = createSlice({
    // clé permettant d'identifier le reducer spécifique 
      name: 'counter',
      initialState,
      // gestions des actions dans le/les reducer(s) du state
      reducers: {
        increment(state, action) {
          state.counter = Math.floor(Math.random() * 10);
        }
      },
    })

    // Export des actions
    export const store = configureStore({
         reducer: {
           e : counterSlice.reducer
        }
    });

    export const { increment } = counterSlice.actions

    // pour counterSlice le store dans l'arbre React
    export default counterSlice.reducer;