<template>

    <v-layout row justify-center align-center>
      <v-col cols="12" sm="12" md="6">
        <v-form ref="form" v-model="formValidation">
          <v-text-field
            v-model="registerData.name"
            :rules="[formRules.requiredField]"
            label="İsim"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerData.lastname"
            :rules="[formRules.requiredField]"
            label="Soyad"
            required
          ></v-text-field>
          <!-- rules.required, rules.min -->
          <v-text-field
            v-model="registerData.password"
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
            v-model="registerData.email"
            :rules="[formRules.requiredField, formRules.emailRules]"
            label="E-posta"
            required
          ></v-text-field>

          <v-radio-group row v-model="registerData.gender">
            <v-radio label="Erkek" value="erkek"></v-radio>
            <v-radio label="Kadın" value="kadin"></v-radio>
            <v-radio
              label="Belirtmek İstemiyorum"
              value="Belirtmek İstemiyorum"
            ></v-radio>
          </v-radio-group>

          <v-btn
            :disabled="!formValidation"
            color="success"
            class="mr-4"
            @click="newUser"
          >
            TAMAMLA
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Temizle </v-btn>
        </v-form>
      </v-col>
    </v-layout>
  
</template>

<script>
export default {
  data() {
    return {
      formValidation: false,
      passwordVisible: false,
      password2: "",

      registerData: {
        name: "",
        lastname: "",
        password: "",
        email: "",
        gender: null,
        userType: 0,
      },
      formRules: {
        requiredField: (v) => !!v || "Bu alan zorunludur",
        emailRules: (v) =>
          /.+@.+\..+/.test(v) || "Geçerli bir e-posta adresi giriniz.",
      },
    };
  },
  methods: {
    newUser() {
      const userDatas = {
        ...this.registerData,
        city: null,
        phone: null,
        trIdNo: null,
        birthday: null,
        adress: null,
      };

      if (this.registerData?.password === this.password2) {
        this.$store.dispatch("user/newUser", { ...userDatas });
      } else {
        alert("Şifreler birbiriyle eşleşmiyor");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>