<template>
  <div class="container tw-flex tw-flex-col">
    <h1>tg app hello</h1>
    <div v-if="telegramUser">
      <p>Добро пожаловать, {{ telegramUser.first_name }}!</p>
      <p>Ваш Telegram ID: {{ telegramUser.id }}</p>
    </div>
    <HomeVue />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HomeVue from "@/pages/HomeVue.vue";

const telegramUser = ref(null);

onMounted(() => {
  if (window.Telegram?.WebApp) {
    const telegram = window.Telegram.WebApp;
    telegram.ready(); // Уведомляем Telegram, что Mini App готово

    // Логируем initData
    console.log("initData из Telegram:", telegram.initData);

    // Отправляем initData на сервер
    fetch("http://localhost:3082/api/users/verify-init-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          telegramUser.value = data.user; // Сохраняем данные пользователя
        } else {
          console.error("Ошибка авторизации:", data.error);
        }
      })
      .catch((err) => console.error("Ошибка при авторизации:", err));
  } else {
    console.warn("Telegram WebApp API не доступен.");
  }
});
</script>

<style>
.container {
  padding: 50px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
