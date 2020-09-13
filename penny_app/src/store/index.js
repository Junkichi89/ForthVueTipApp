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
    RegUsers: []
  },
  mutations: {
    setUser(state, userInfo) {
      state.user.username = userInfo.username,
      state.user.tip = userInfo.tip;
    },
    setRegUser(state, RegUsersInfo) {
      state.RegUsers.push(RegUsersInfo);
    },
    deleteUsers(state) {
      state.RegUsers = [];
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    RegUsers(state) {
      return Array.from(new Set(state.RegUsers));
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
            // context.dispatch('getRegUser', userInfo);
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
            // context.dispatch('getRegUser', userInfo);
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
      console.log(users);
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
    getRegUser: function (context, user) {
      let db = firebase.firestore();
      let users = db.collection('users');
      users.get().then(data => {
        context.commit('deleteUsers');
        if (data.empty) {
          console.log('No data');
          return;
        } else {
          data.forEach(doc => {
            let regUser = doc.data();
            console.log(regUser);
            if (regUser.email !== user.email) {
              context.commit('setRegUser', regUser);
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
          // context.commit('deleteUsers');
        })
    },
  },
  modules: {
  }
});