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
        complaints: [],
      };

      const corporateData = {
        companyName: this.companyName,
        companyLogo: this.companyLogo
          ? this.companyLogo
          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAScAAACrCAMAAAATgapkAAAAPFBMVEX///+6urq3t7fCwsLIyMj6+vq+vr729vby8vK7u7vm5ubFxcXPz8/8/Pza2tqzs7Pp6enc3NzU1NTt7e0w3LkNAAAHuElEQVR4nO2d65qjIAyGS8ATCore/70uwROdUaQz+7QD5vuxj3aqK28hRAjh8SCRSCQSiUQikUgkEolEIpFIJBKJRCIlo0p3xzLFpx/tL0mWcCZef/rh/o4ksFNBqz79eH9FFQ9wYjB8+vn+iqYAJcZ68+nn+yuaQtWJgfz08/0VEac4EaeQiqquC6cLTsZ+8Veq0vXBJi04L0s+K4SJsab8rbjQ1adL/AMpKZj1IMN0/qsAGpOcG1aLtzJaUYnEQEkG80/8ZliJgZILJaFN+WZQ+tNlf0Gub7OUJvVQF/b7v6tJx5gX+CoHpZyP38wpoQplEBOff9dLTvCiDTsemPG+wD9c+mgpYR+7meaTC062cY66a+JJle2hvDs0qYxlVVj+cTkJc4LWmrCHqkU0qMW7/6rK7HeYPlr6eFXgPWyQE4j1ZWOMBXXa7e/DgKm8KiKnrfKH69PWRIo2EtT5W1y33iE7TtDtF+lfc5L5cvIGMWUcpgCngTjdndO4X/T7dpcxJ76VWv3ejufLyXvHiK1O9+TE2DywpqIx3ZUTCDnVMt4dD8w3ZM0JB2ubV16E+emwSd6cXhW0slJHytjP/BkoWCdwntVuA6fEKU7EiTgRp59ycqO51uxw/urQ8J04AROjXF2AYtDiBefhPpygNNOXgcva8FhSd+FkKR29nSgZjFy8HScYz1zuQrMYUrfgBGUoonWKqVJ34ARtePat6q5B3YATtFdRceoaVP6cosLtL0FlzwnKp9qkatMJ3najLHx8xdVoVfacnma8K3SYFjXd018uQqpy5+RPUylT+m6ldc89+x5aKZM/J984Vd/aFvjFD5uo3Dntbas+cpO8ALC6uS8nEPsNjr1Jr10Gw1vy5rQXT511aPvis/q+nPhmncwZBCjX7wS9zaw57bEGgW5/N1GhLi9vTpsVD80Nb7N3dcCHyprT5oqrkBe5TwcHBg5y5gTdanqC68/2CLyAgcqa02Z5Tq2402bJA1/LmtPmG4V9bVgNVMCQ58yp3woXHg2A9b6B5pkzJ4jktA0pBDxN4sT2iPPbc4q0T3dtd5sdj+zvhpty2vyCSP/prn7B5mdG+uM39TP395bg+125TRW351/KmtPmGIUGK6MGFTLntI/qnleovdLddlzFG6c7XcPhBY/fdpyOsT3+oj5eL+xVuSp0o7w5+YsWpyNQ0aur8ubkz0sdxO+APwsanhHOnZPw7lGMTyFhANwPiwqvus6c09O8ua1SXdO7qXOXX/MpYVE45Vb2nL5maKhk1zas4cJMT3EsxUVQXfacvPWdm9S3iKjLSLHsOcVlb7pMCZE/J+scXGbju86ccQNOtkaF0zdFhGfegpO1UaE0MlEJa27BybpN+jzXTElx9h4pLg/XbQyROQ5S4hSX1+iUVGu+httXMjrRZDKcmPdu/7N1ZQClMPUSDq0K63GW8evKUkllPudyWn7VX6xT7Bl3uye0zUvrFJPJuza7OM0M6lfrXr8n6YtQMnn8HsNcSBccT3khA5qdQWBiUO/PM5pMs8NxtLmtAHD97ry1SW20sA3cvj0PcpdUHmRcUfBmQo4SjGlhsvbbW+70NolUXExfajKjeJ+60dSpVSYSiUQikUgkEolEIt1RQ1OmspXIR6V72u01RhO/SCJGIq1SHeZy5p1Uy0mLyZ0nHMbDE8wAOXLcFkjaj9dRWzzW26E7qluOcdGFEZyLZVZduhvZ+sjTb7dFA9D3PbgtkqrSnfT9gJOh7tDg8gNM3yBw4HYet8WvrZnqagZupkkDLiGWzXyzeVZFuwsUhwx2/S5KaKdqaF3RLADhNrFVjwHwUIqNUwclX2LtZW8P14x+43xlgx9IgFLWlV6WcMycOkhpavNMlhMGXU4u9rIqtwjMEdad3zZOfATmoukEdN3GqW4wbZ1DYi+fZzHlvCTIfWjZpbUn57EWTraI3cPn1G0JwnZOQ+nak21qUuwZIm2FkqrEXD0WybJ2o3VXIyd7yzKdnSbPhZww3dzW7pbPTc/YvC/y3u4qS+eBxeeFx6nCTTnWFrYYIu3aGnKyvLNwUi2nsusEW+24Pelwmg2D5e1J5XOyNG2hi7bXyuOETbTEU8yftTAxrmZpYG1iE+WnKkoG2EO5Lr9yJ32PrafqmCVljdTOqaiw+NbCT0+ccIEn0rBfXIMsfE7d8X+cmGx94tI0wLGEtj610mou7TS61KIeJ2vBWzUCV367c/FUuIrxuT4t7U5AYOubhDTbcWtf8Gf37LhTzTGQ0+Nky29dpPHxzEkulaaDNQ1Lt9rxoU4rkudUMyfrC6Ib8JUT1pTB54ROAC7EO+Zk+qW/s40ZPQjnF9h/EotROdTiF8wNZeekhNvotUWPyeOEHb5tdiecMNkaVijbNB0wx6los2h5Cydri0vnZ3JtrKqH7QCNacGadN8+YZoLNNnHnJA2jMZYm+RWVs3++AAsAw+qaHqXj1b0vdzf7+TDuG6wGbFN9lhO0TfoOVgSNYYM994aMwn90qmZkvXuMvdH3Tt7NfZ9+n2eMtoNFUxaWxdA6lk1Bs5rPb/3yxFXaw7aOUJS44mSo/Sy/eK1s4rBXr1uWDK5Gz0KrU0GFopEIpFIJBKJRCKRSCQSiUQikUgkEolEIpH+q/4B+/dp6+X+AekAAAAASUVORK5CYII=",
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