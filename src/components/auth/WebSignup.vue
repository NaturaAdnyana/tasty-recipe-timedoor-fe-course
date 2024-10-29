<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        <img src="@/assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>
      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <base-input
              type="text"
              identity="firstname"
              placeholder="Ex: Jack"
              label="Firstname"
              v-model="signUpData.firstname"
            ></base-input>
          </div>
          <div class="col-md-6">
            <base-input
              type="text"
              identity="lastname"
              placeholder="Ex: Daniel"
              label="Lastname"
              v-model="signUpData.lastname"
            ></base-input>
          </div>
        </div>
        <div class="my-4">
          <base-input
            type="text"
            identity="username"
            placeholder="Your Username"
            label="Username"
            v-model="signUpData.username"
          ></base-input>
        </div>
        <div class="my-4">
          <base-input
            type="email"
            identity="email"
            placeholder="Your email address"
            label="Email"
            v-model="signUpData.email"
          ></base-input>
        </div>
        <div class="my-4">
          <base-input
            type="password"
            identity="password"
            placeholder="Your Password"
            label="Password"
            v-model="signUpData.password"
            @keyInput="passwordCheck"
          ></base-input>
          <p
            class="text-danger mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: passwordStatusDisplay }"
          >
            The password field must be at least 8 characters
          </p>
        </div>
        <div class="my-4">
          <base-input
            type="password"
            identity="confirmationPassword"
            placeholder="Same with password"
            label="Confirmation Password"
            v-model="signUpData.confirmationPassword"
            @keyInput="confirmationPasswordCheck"
          ></base-input>
          <p
            class="text-danger mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: confirmPasswordDoesNotMatch }"
          >
            The password confirmation does not match
          </p>
          <p
            class="text-success mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: confirmPasswordMatch }"
          >
            The password confirmation does match
          </p>
        </div>
        <div class="my-4">
          <base-input
            type="file"
            identity="recipeImage"
            label="Profile Photo"
            :isImage="true"
            @input="checkImage"
          >
            <div>
              <div class="border p-1 mt-2 rounded-circle">
                <img
                  :src="signUpData.imageLink"
                  class="rounded-circle"
                  width="140"
                  height="150"
                  style="object-fit: cover"
                />
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                <i
                  class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"
                ></i>
              </div>
            </div>
          </base-input>
        </div>
        <base-button class="login w-100 my-3">Register</base-button>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?<span style="color: #4c4ddc"
            ><router-link to="/login" class="text-decoration-none">
              Login</router-link
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";

import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const signUpData = reactive({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: "",
  imageLink: "",
});

const passwordStatusDisplay = ref("none");
const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

const passwordCheck = () => {
  if (signUpData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};

const confirmationPasswordCheck = () => {
  if (signUpData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }
  if (signUpData.password !== signUpData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }

  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signUpData.imageLink = reader.result;
  });
};

const register = async () => {
  if (
    signUpData.password !== signUpData.confirmationPassword ||
    signUpData.password.length < 8
  ) {
    signUpData.confirmationPassword = "";
    signUpData.password = "";
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signUpData);
    router.push("/");
  }
};
</script>
