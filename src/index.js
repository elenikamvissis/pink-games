import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import './index.css'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBC85Z1rF--UJr0W3JqQ3WrcCRXWSCPkXI',
  authDomain: 'pink-games-1760a.firebaseapp.com',
  databaseURL: 'https://pink-games-1760a.firebaseio.com',
  projectId: 'pink-games-1760a',
  storageBucket: 'pink-games-1760a.appspot.com',
  messagingSenderId: '762113152640',
  appId: '1:762113152640:web:7785d155faf8ab69a07865',
  measurementId: 'G-VKKV5JLPYG',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

ReactDOM.render(<App />, document.getElementById('app'))
