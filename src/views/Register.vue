<template>
  <v-container class="mx-auto pa-5">
    <v-layout row justify-center align-center>
      <v-col cols="12" sm="12" md="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="[formRules.requiredField]"
            label="İsim"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            :rules="requiredField"
            label="Soyad"
            required
          ></v-text-field>
          <!-- rules.required, rules.min -->
          <v-text-field
            v-model="password1"
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[formRules.requiredField]"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-1"
            label="Şifre"
            hint="En az 8 karakter"
            counter
            @click:append="passwordVisible = !passwordVisible"
          ></v-text-field>

          <v-text-field
           v-model="password2"
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[formRules.requiredField]"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-1"
            label="Şifre tekrar"
            hint="En az 8 karakter"
            counter
            @click:append="passwordVisible = !passwordVisible"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[formRules.requiredField, formRules.emailRules]"
            label="E-posta"
            required
          ></v-text-field>

          <v-radio-group row>
            <v-radio label="Erkek" value="erkek"></v-radio>
            <v-radio label="Kadın" value="kadin"></v-radio>
            <v-radio label="Diğer" value="diger"></v-radio>
          </v-radio-group>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            TAMAMLA
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Temizle </v-btn>
        </v-form>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      passwordVisible: false,
      name: "",
      email: "",
      password1: "",
      password2: "",

      formRules: {
        requiredField: [(v) => !!v || "Bu alan zorunludur"],
        emailRules: [
          (v) => /.+@.+\..+/.test(v) || "Geçerli bir e-posta adresi giriniz.",
        ],
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>