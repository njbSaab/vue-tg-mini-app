import { createApp } from "vue";
import App from "./App.vue";
import { registerPlugins } from "@/plugins";
import "./styles/tailwind.css";

const app = createApp(App);

registerPlugins(app);

// Проверяем Telegram WebApp API
if (window.Telegram?.WebApp) {
  const telegram = window.Telegram.WebApp;
  telegram.ready(); // Уведомляем Telegram, что приложение готово
  console.log("Telegram WebApp API доступен:", telegram);

  // Логируем initData
  console.log("initData из Telegram:", telegram.initData);

  // Отправляем initData на сервер для проверки
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
        console.log("Авторизация успешна:", data.user);
        localStorage.setItem("telegram_user", JSON.stringify(data.user));
      } else {
        console.error("Ошибка авторизации:", data.error);
      }
    })
    .catch((err) => console.error("Ошибка авторизации:", err));
} else {
  console.warn("Telegram WebApp API не доступен.");
}

app.mount("#app");
