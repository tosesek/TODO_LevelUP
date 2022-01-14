# 02.API

Każda większa aplikacja ma jakieś połączenie z bazą danych. Często odbywa się to poprzez komunikację z API. Postaramy się napisać własne API. Wykorzystamy w tym celu bibliotekę `apollo-server-micro`.

```bash
npm install -D apollo-server-micro micro graphql
```

```bash
npm install -D axios
```

### UWAGA

Aplikację będziemy pisać na składni `Typescript`, ale dla uproszczenia, API napiszemy w `Javascript`. Pisanie własnego API to i tak ciężkie zadanie, dlatego na potrzeby lekcji ułatwimy to.

Dodatkowo API można rozbudować o system logowania, rejestracji oraz listę zadań osobną dla każdego użytkownika, jednak to zadanie pozostawiam chętnym.
