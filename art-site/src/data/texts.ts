// ============================================================
//  ВСІ ТЕКСТИ САЙТУ двома мовами.
//  Ключі (зліва) однакові для uk і en, змінюються тільки значення.
//  Хочеш змінити напис — міняй тут, у компонентах нічого не чіпай.
// ============================================================

export type Lang = "uk" | "en";

export const texts = {
  uk: {
    contact: "Зв'язатися",
    unavailable: "unavailable",
    technique: "акрил, олійна пастель",
    inquire: "Запитати про картину",
    prev: "Попереднє фото",
    next: "Наступне фото",
    close: "Закрити",

    contactTitle: "Зв'язатися",
    contactIntro: "Напишіть мені в Telegram, Instagram чи на пошту — або залиште повідомлення тут, я відповім найближчим часом.",
    aboutPainting: "Щодо картини",
    name: "Ваше ім'я",
    phoneOrTg: "Телефон або Telegram",
    email: "Email",
    message: "Повідомлення",
    send: "Надіслати",
    sending: "Надсилаю...",
    sent: "Дякую! Я напишу вам найближчим часом.",
    error: "Щось пішло не так. Спробуйте ще раз або напишіть мені в Telegram.",
    inquireDefault: "Привіт! Мене цікавить картина",

    footerAbout: "Про мене",
    footerInfo: "Інфо",
    footerPrivacy: "Приватність",
  },
  en: {
    contact: "Contact",
    unavailable: "unavailable",
    technique: "acrylic, oil pastel",
    inquire: "Inquire",
    prev: "Previous photo",
    next: "Next photo",
    close: "Close",

    contactTitle: "Contact",
    contactIntro: "Message me on Telegram, Instagram or by email — or leave a message here and I'll get back to you soon.",
    aboutPainting: "Regarding",
    name: "Your name",
    phoneOrTg: "Phone or Telegram",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending...",
    sent: "Thank you! I'll get back to you soon.",
    error: "Something went wrong. Please try again or message me on Telegram.",
    inquireDefault: "Hi! I'm interested in the painting",

    footerAbout: "About me",
    footerInfo: "Info",
    footerPrivacy: "Privacy",
  },
};

// Тексти для попапів з футера. Кожен абзац — окремий рядок у масиві.
export type PageKey = "about" | "info" | "privacy";

export const pages: Record<PageKey, Record<Lang, { title: string; paragraphs: string[] }>> = {
  about: {
    uk: {
      title: "Про мене",
      paragraphs: [
        "Мене звати Остап Кучеренко, я студент зі Львова. Мені 18, я люблю програмувати і малювати — тож вирішив поєднати одне з іншим і сам розробив цей сайт. Давно хотів щось таке зробити.",
        "Малював я багато ще з дитинства, а картини на полотні почав писати ближче до 2021 року. Працюю переважно акриловими фарбами, маркерами та олійною пастеллю.",
        "Якоїсь особливої техніки в мене немає, і я рідко заздалегідь знаю, що саме хочу зробити. Просто сідаю перед порожнім полотном і створюю на ходу, спираючись на кольори, форми, відчуття та емоції.",
        "Найчастіше на моїх картинах з'являються абстрактні образи створінь і людей — і взагалі все підряд. Особливої історії, звідки вони беруться, у мене немає, але вони мені подобаються, і я сподіваюся, що мені вдається передати ними якусь емоцію.",
        "Кожна робота існує в одному екземплярі. Щоб зв'язатися, пишіть через форму на сайті або напряму в Instagram чи Telegram — так навіть зручніше і швидше.",
      ],
    },
    en: {
      title: "About me",
      paragraphs: [
        "My name is Ostap Kucherenko, I'm an 18-year-old student from Lviv, Ukraine. I love programming and painting — so I decided to bring the two together and built this website myself. I'd wanted to make something like this for a long time.",
        "I drew a lot as a kid and started painting on canvas around 2021. I mostly work with acrylics, markers and oil pastels.",
        "I don't have any particular technique, and I rarely have a plan for what I want to make. I just sit down in front of a blank canvas and create as I go, guided by colours, shapes, feelings and emotion.",
        "My paintings are mostly abstract images of creatures and people — and pretty much everything else. There's no special story behind where they come from, but I like them, and I hope they manage to convey some emotion.",
        "Every work exists as a single original. To get in touch, use the form on the site or message me directly on Instagram or Telegram — that's even easier and faster.",
      ],
    },
  },
  info: {
    uk: {
      title: "Інфо",
      paragraphs: [
        "Усі роботи — оригінали в одному екземплярі, акрил та олійна пастель на полотні.",
        "Як купити: натисніть «Запитати про картину» або напишіть мені в Telegram чи Instagram. Я відповім, надішлю додаткові фото чи відео і ми домовимося про оплату та доставку.",
        "Доставка по Україні — Новою поштою. За кордон — за домовленістю, вартість доставки рахується окремо.",
        "Повернення можливе лише якщо картина в оригінальному стані. Роботи на замовлення поверненню не підлягають.",
        "Також беру замовлення на індивідуальні роботи — пишіть.",
      ],
    },
    en: {
      title: "Info",
      paragraphs: [
        "All works are one-of-a-kind originals, acrylic and oil pastel on canvas.",
        "How to buy: press “Inquire” or message me on Telegram or Instagram. I'll reply, send extra photos or video, and we'll agree on payment and shipping.",
        "Shipping within Ukraine via Nova Poshta. International shipping by arrangement, shipping cost is calculated separately.",
        "Returns are accepted only if the painting is in its original condition. Commissioned works are non-returnable.",
        "I also take commissions — feel free to ask.",
      ],
    },
  },
  privacy: {
    uk: {
      title: "Приватність",
      paragraphs: [
        "Сайт не використовує cookies для реклами чи аналітики.",
        "Ваш вибір мови та валюти зберігається лише у вашому браузері, щоб не обирати їх щоразу.",
        "Дані з форми (ім'я, контакт, повідомлення) надсилаються мені на пошту через сервіс Formspree і використовуються лише для відповіді вам. Я не передаю їх третім особам.",
        "Щоб видалити ваші дані — напишіть мені.",
      ],
    },
    en: {
      title: "Privacy",
      paragraphs: [
        "This site uses no cookies for ads or analytics.",
        "Your language and currency choice is stored only in your browser so you don't have to pick them every time.",
        "Form data (name, contact, message) is sent to my email via Formspree and used only to reply to you. I don't share it with third parties.",
        "To have your data deleted — just message me.",
      ],
    },
  },
};

// Контакти — в одному місці
export const links = {
  instagram: "https://instagram.com/autisticdumpster128",
  telegram: "https://t.me/Ostap_Kucherenko",
  email: "okucherenkoart@gmail.com",
};
