import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      tip: null
    },
    dbUsers: []
  },
  mutations: {
    setUser(state, userInfo) {
      state.user.username = userInfo.username,
      state.user.tip = userInfo.tip;
    },
    setDbUser(state, dbUsersInfo) {
      state.dbUsers.push(dbUsersInfo);
    },
    deleteDbUsers(state) {
      state.dbUsers = [];
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    dbUsers(state) {
      return Array.from(new Set(state.dbUsers));
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
            })
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
    getCurrentUser: function (context, user) {
      const db = firebase.firestore();
      const users = db.collection('users');
      users.where('email', '==', user.email).get().then(data => {
        if (data.empty) {
          console.log('No matching data');
          return;
        }
        data.forEach(doc => {
          const matchUser = doc.data();
          context.commit('setUser', matchUser);
        });
      })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    },
    getDbUser: function (context, user) {
      const db = firebase.firestore();
      const users = db.collection('users');
      users.get().then(data => {
        context.commit('deleteDbUsers');
        if (data.empty) {
          console.log('No data');
          return;
        } else {
          data.forEach(doc => {
            const dbUser = doc.data();
            if (dbUser.email !== user.email) {
              context.commit('setDbUser', dbUser);
            }
          });
        }
      })
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