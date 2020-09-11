<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3>
      <span class="greeting">{{ username }}さんようこそ！！</span>
      <span>残高：{{ tip }}</span>
      <span>
        <button @click="signOut">ログアウト</button>
      </span>
    </h3>

    <h1>ユーザ一覧</h1>

    <table>
      <tr>
        <td>
          <h3>ユーザ名</h3>
        </td>
      </tr>
      <tr>
        <td>{{ }}</td>
        <td>
          <button>walletを見る</button>
        </td>
        <td>
          <button>送る</button>
        </td>
      </tr>
    </table>

    <p>Copyright ©︎2019〇〇 Inc All rights reserved</p>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Dashboard',
  data() {
    return {};
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('No user is signed in.');
      } else {
        const curUser = firebase.auth().currentUser;
        this.$store.dispatch('getDBuser', curUser);
      }
    });
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    tip() {
      return this.$store.state.user.tip;
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push('/Login');
    },
  },
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  margin: auto;
}
</style>
