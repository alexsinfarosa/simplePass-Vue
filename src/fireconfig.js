import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'

Vue.use(VueFire)

// Setup Firebase
const config = {
  apiKey: 'AIzaSyAi_yuJciPXLFr_PYPeU3eTvtXf8jbJ8zw',
  authDomain: 'vue-demo-537e6.firebaseapp.com',
  databaseURL: 'https://vue-demo-537e6.firebaseio.com'
}

const firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.database()
