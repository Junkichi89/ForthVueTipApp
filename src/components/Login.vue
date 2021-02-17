<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>ログイン画面</h1>
    <table>
      <tr>
        <td>メールアドレス</td>
        <td>
          <input type="text" placeholder="email" v-model="email" />
        </td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td>
          <input type="text" placeholder="password" v-model="password" />
        </td>
      </tr>
    </table>
    <button @click="signIn">ログイン</button>
    <p>
      <router-link to="/">
        <a>新規登録はこちらから</a>
      </router-link>
    </p>

    <p>Copyright ©︎2019〇〇 Inc All rights reserved</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      const user = {
        email: this.email,
        password: this.password,
        tip: 1000,
      };
      this.$store.dispatch('signIn', user).then(() => {
        this.$router.push('/Dashboard');
      });
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
