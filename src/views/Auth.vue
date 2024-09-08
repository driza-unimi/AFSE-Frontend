<template>
  <v-container height="100vh" class="d-flex align-center justify-center">
    <v-card class="elevation-6 mt-12" rounded="xl" height="470" width="900">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-row>
            <v-col cols="12" md="6">
              <v-card-text class="mt-12">
                <h1 class="text-center"> Login in to Your Account </h1>
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="8">
                    <v-form ref="loginForm" @submit.prevent>
                      <v-text-field
                          v-model="loginUsername"
                          label="Username"
                          :rules="[requiredRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          class="mt-16"
                      />
                      <v-text-field
                          v-model="loginPassword"
                          label="Password"
                          :rules="[requiredRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          :type="showLoginPassword ? 'text' : 'password'"
                          :append-inner-icon="showLoginPassword ? 'mdi-eye-off' : 'mdi-eye'"
                          @click:append-inner="showLoginPassword = !showLoginPassword"
                      />
                      <v-btn color="primary" block type="submit" @click="login">Log in</v-btn>
                      <v-btn variant="outlined" block class="d-md-none mt-2" @click="step++">or SIGN UP</v-btn>
                    </v-form>
                  </v-col>

                </v-row>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6" class="background d-none d-md-block">
              <div style="text-align: center; padding: 180px 0;">
                <v-card-text>
                  <h1 class="text-center">Don't Have an Account Yet?</h1>
                  <span class="text-center">Join and start collect superheroes cards</span>
                </v-card-text>
                <div class="text-center">
                  <v-btn variant="outlined" @click="step++">SIGN UP</v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-window-item>


        <v-window-item :value="2">
          <v-row>
            <v-col cols="12" md="6" class="background d-none d-md-block">
              <div style="text-align: center; padding: 180px 0;">
                <v-card-text>
                  <h1 class="text-center">Already Signed up?</h1>
                  <span class="text-center">Log in to your account so you <br> can continue to collect superheroes cards !</span>
                </v-card-text>
                <div class="text-center">
                  <v-btn variant="outlined" @click="step--">Log in</v-btn>
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card-text class="mt-12">
                <h1 class="text-center pb-2"> Sign Up for an Account </h1>
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="8">
                    <v-form ref="signupForm" @submit.prevent>
                      <v-text-field
                          v-model="signupUsername"
                          label="Username"
                          :rules="[requiredRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                      />
                      <v-text-field
                          v-model="signupEmail"
                          label="Email"
                          :rules="[emailRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                      />
                      <v-text-field
                          v-model="signupPassword"
                          label="Password"
                          :rules="[requiredRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          :type="showSignupPassword ? 'text' : 'password'"
                          :append-inner-icon="showSignupPassword ? 'mdi-eye-off' : 'mdi-eye'"
                          @click:append-inner="showSignupPassword = !showSignupPassword"
                      />
                      <v-btn color="primary" block type="submit" @click.stop="signup">Sign up</v-btn>
                      <v-btn variant="outlined" block class="d-md-none mt-2" @click="step--">or Log in</v-btn>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService';
import {useUserStore} from '@/stores/userStore';
import {toast} from "vuetify-sonner";

export default {
  data() {
    return {
      userStore: useUserStore(),
      step: 0,

      showLoginPassword: false,
      showSignupPassword: false,

      loginUsername: null,
      loginPassword: null,

      signupUsername: null,
      signupEmail: null,
      signupPassword: null,
      emailRule: (v) => /^(?!\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(v) || "Email must be valid",
      requiredRule: (v) => !!v || 'This field is required.',
    };
  },
  methods: {
    async login() {
      try {
        const {valid: isValid} = await this.$refs.loginForm.validate();
        if (isValid) {
          await apiService.post('/login', {
            username: this.loginUsername,
            password: this.loginPassword
          });

          await this.cacheUserData();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    async signup() {
      try {
        const {valid: isValid} = await this.$refs.signupForm.validate();
        if (isValid) {
          await apiService.post('/signup', {
            username: this.signupUsername,
            email: this.signupEmail,
            password: this.signupPassword
          });

          await this.cacheUserData();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    async cacheUserData() {
      const response = await apiService.get('/user');
      this.userStore.setUser(response.data.data);
      await this.$router.push(this.userStore.user.role === 'admin' ? '/admin' : '/album');
    },
  },
};
</script>

<style scoped>
.background {
  background-color: rgb(var(--v-theme-accent));
}
</style>