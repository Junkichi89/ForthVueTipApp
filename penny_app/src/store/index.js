import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      tip: null
    }
  },
  mutations: {
    setUser(state, userInfo) {
      state.user.username = userInfo.username,
      state.user.tip = userInfo.tip;
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  actions: {
    //新規userの登録
    signUp(context, userInfo) {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
          .then((res) => {
            const user = res.user;
            user.updateProfile({
              displayName: userInfo.username
            });
            console.log('success');
            resolve(res);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          })
      })
    },
    //firestoreに新規userの情報を格納
    sendFireStore(context, user) {
      const db = firebase.firestore();
      db.collection('users').doc().set(user);

    },
    //既存userのログイン
    signIn: function (context, userInfo) {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(userInfo.email, userInfo.password)
          .then((data) => {
            console.log('Good Job,Mate');
            resolve(data);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      })
    },
    getDBuser: function (context, user) {
      const db = firebase.firestore();
      const users = db.collection('users');
      console.log(user);
      users.where('email', '==', user.email).get().then(data => {
        if (data.empty) {
          console.log('No matching data');
          return;
        }
        data.forEach(doc => {
          const matchUser = doc.data();
          context.commit('setUser', matchUser);
          console.log(matchUser);
        });
      })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    },
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
        })
    },
  },
  modules: {
  }
});