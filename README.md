# Фронтенд

Фронтенд-приложение на `React + TypeScript + Vite`.

В проекте используются:

- `Vite` для разработки и сборки
- `TypeScript` с project references
- `SCSS modules` для компонентных стилей
- `ESLint` и `Prettier` для проверки и форматирования кода
- `Docker` и `docker-compose` для production-сборки и запуска

## Требования

- `Node.js 20+`
- `npm 10+`

## Установка

```bash
npm install
```

## Переменные окружения

Создайте `.env` на основе `.env.example` или передайте переменные через окружение:

```env
VITE_API_BASE_URL=http://localhost:8080
FRONTEND_PORT=8080
```

Назначение переменных:

- `VITE_API_BASE_URL` — базовый URL backend API
- `FRONTEND_PORT` — порт для публикации контейнера в `docker-compose`

## Основные команды

```bash
npm run dev
```

Запуск dev-сервера Vite.

```bash
npm run build
```

Production-сборка приложения.

```bash
npm run build:dev
```

Сборка в development-режиме.

```bash
npm run build:prod
```

Сборка в production-режиме.

```bash
npm run preview
```

Локальный просмотр production-сборки.

```bash
npm run typecheck
```

Проверка TypeScript.

```bash
npm run lint
```

Проверка кода через ESLint.

```bash
npm run lint:fix
```

Автоисправление части замечаний ESLint.

```bash
npm run format
```

Форматирование файлов через Prettier.

```bash
npm run format:check
```

Проверка форматирования без изменений.

## Структура

- `src/` — исходный код приложения
- `src/styles/` — глобальные стили и `scss`-модули
- `public/` — статические файлы
- `dist/` — результат production-сборки

## Docker

Сборка production-образа:

```bash
docker build -t frontend .
```

Запуск через Docker:

```bash
docker run --rm -p 8080:80 -e VITE_API_BASE_URL=http://localhost:8080 frontend
```

Запуск через `docker-compose`:

```bash
docker compose up --build
```

После запуска приложение будет доступно на порту `8080`, если не переопределён `FRONTEND_PORT`.
