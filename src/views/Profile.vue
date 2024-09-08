<template>
  <v-container>
    <v-col>
      <h2>Username</h2>
      <span>{{ userStore.user?.username }}</span>
    </v-col>
    <v-col>
      <h2>E-mail</h2>
      <span>{{ userStore.user?.email }}</span>
    </v-col>
    <v-col>
      <v-btn
          color="primary"
          max-width="200px"
          @click="passwordDialog = true"
      >
        Change password
      </v-btn>
    </v-col>
    <v-col>
      <v-btn
          color="accent"
          variant="outlined"
          max-width="200px"
          @click="logout"
      >
        Logout
      </v-btn>
    </v-col>
    <v-col>
      <v-btn
          color="accent"
          variant="outlined"
          max-width="200px"
          @click="deleteDialog = true"
      >
        Delete account
      </v-btn>
    </v-col>


    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete your account? <br> This action is irreversible.
        </v-card-text>
        <v-card-actions class="justify-end pa-2">
          <v-btn color="primary" @click="deleteProfile">Yes, Delete</v-btn>
          <v-btn variant="outlined" @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="passwordDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Change Password</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent>
            <v-text-field
                v-model="password"
                label="New Password"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                dense
                outlined
                required
            />

            <v-text-field
                v-model="confirmPassword"
                :disabled="!password"
                label="Confirm New Password"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                :rules="confirmPasswordRules"
                dense
                outlined
                required
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end pa-2">
          <v-btn color="primary" type="submit" @click="updateProfile">Update</v-btn>
          <v-btn variant="outlined" @click="passwordDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import {useUserStore} from "@/stores/userStore.js";
import apiService from "@/services/apiService.js";
import {toast} from "vuetify-sonner";

export default {
  name: "Profile",
  data() {
    return {
      password: "",
      confirmPassword: "",
      showPassword: false,
      deleteDialog: false,
      passwordDialog: false,
      confirmPasswordRules: [
        (v) => v === this.password || "Passwords must match",
      ],

      userStore: useUserStore(),
    }
  },
  watch: {
    passwordDialog(newVal) {
      if (!newVal) {
        this.password = "";
        this.confirmPassword = "";
      }
    }
  },
  methods: {
    async logout() {
      try {
        await apiService.post('/logout');
        this.userStore.clearUser();
        this.$router.push('/login');
      } catch (error) {
        toast.error(error.message);
      }
    },
    async updateProfile() {
      try {
        const {valid: isValid} = await this.$refs.form.validate();

        console.log(isValid);

        if (isValid) {
          const body = {
            newPassword: this.password
          };

          await apiService.put('/user/', body);
          this.passwordDialog = false;
          toast.success('Password updated successfully');
        }

      } catch (error) {
        toast.error(error.message);
      }
    },
    async deleteProfile() {
      try {
        await apiService.delete('/user/');
        this.userStore.clearUser();
        this.$router.push('/login');
      } catch (error) {
        toast.error(error.message);
      }
    },
  }
}
</script>


<style scoped>

</style>