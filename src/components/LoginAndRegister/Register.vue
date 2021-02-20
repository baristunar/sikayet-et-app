<template>
  <v-layout row justify-center align-center>
    <v-col cols="12" sm="12" md="6">
      <v-form ref="form" v-model="formValidation">
        <v-radio-group v-model="registerType" row>
          <v-radio label="Bireysel Üyelik" :value="true"></v-radio>
          <v-radio label="Kurumsal Üyelik" :value="false"></v-radio>
        </v-radio-group>

        <div v-if="registerType">
          <v-text-field
            v-model="firstname"
            :rules="[formRules.requiredField]"
            label="İsim"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastname"
            :rules="[formRules.requiredField]"
            label="Soyad"
            required
          ></v-text-field>
        </div>
        <div v-else>
          <v-text-field
            v-model="companyName"
            :rules="[formRules.requiredField]"
            label="Şirket Adı"
            required
          ></v-text-field>

          <v-text-field
            v-model="companyLogo"
            label="Şiket Logosu"
            required
          ></v-text-field>
        </div>
        <!-- rules.required, rules.min -->
        <v-text-field
          v-model="password"
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

        <v-radio-group row v-model="gender" v-if="registerType">
          <v-radio label="Erkek" value="Erkek"></v-radio>
          <v-radio label="Kadın" value="Kadin"></v-radio>
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
      registerType: true,
      companyName: "",
      companyLogo: null,
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      gender: null,

      formRules: {
        requiredField: (v) => !!v || "Bu alan zorunludur",
        emailRules: (v) =>
          /.+@.+\..+/.test(v) || "Geçerli bir e-posta adresi giriniz.",
      },
    };
  },
  methods: {
    newUser() {
      const individualData = {
        firstname: this.firstname,
        lastname: this.lastname,
        gender: this.gender,
        userType: 1, // User is not admin.
        registerType: 1,
        city: null,
        trIdNo: null,
        birthday: null,
      };

      const corporateData = {
        companyName: this.companyName,
        companyLogo: this.companyLogo
          ? this.companyLogo
          : "@/assets/images/no-image.png",
        registerType: 2,
      };

      const commonData = {
        email: this.email,
        password: this.password,
        phone: null,
        adress: null,
      };

      if (this?.password === this.password2 && this.registerType) {
        this.$store.dispatch("user/newUser", {
          ...individualData,
          ...commonData,
        });
      } else if (this?.password === this.password2 && !this.registerType) {
        this.$store.dispatch("user/newCompany", {
          ...corporateData,
          ...commonData,
        });
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