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
      <tr v-for="user in dbUsers" :key="user.id">
        <td>{{ user.username}}</td>
        <td>
          <div class="example-modal-window">
            <button @click="openModal(user)">walletを見る</button>
            <wallet-modal v-show="content" @close="closeModal">
              <template slot="header">
                <p>{{ modalUser.username }}さんの残高</p>
              </template>
              <template slot="body">{{ modalUser.tip}}</template>
              <template slot="footer"></template>
            </wallet-modal>
          </div>
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
import walletModal from './walletModal.vue';

export default {
  name: 'Dashboard',
  components: { walletModal },
  data() {
    return {
      content: false,
      modalUser: '',
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('No user is signed in.');
      } else {
        const curUser = firebase.auth().currentUser;
        this.$store.dispatch('getCurrentUser', curUser);
        this.$store.dispatch('getDbUser', curUser);
      }
    });
  },
  computed: {
    username() {
      return this.$store.getters.user.username;
    },
    tip() {
      return this.$store.getters.user.tip;
    },
    dbUsers() {
      return this.$store.getters.dbUsers;
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push('/Login');
    },
    openModal: function (user) {
      (this.content = true), (this.modalUser = user);
    },
    closeModal: function () {
      this.content = false;
    },
    clickEvent: function () {
      this.$emit('from-child');
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
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #ffff;
}
</style>
