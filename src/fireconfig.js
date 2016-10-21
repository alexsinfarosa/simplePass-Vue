import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'

Vue.use(VueFire)

// Setup Firebase
const config = {
  apiKey: 'AIzaSyAtHrs0mochY_LMHxs2IHxvBM2FtUy81-0',
  authDomain: 'simplepass-xscanna.firebaseapp.com',
  databaseURL: 'https://simplepass-xscanna.firebaseio.com'
}

const firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.database()
