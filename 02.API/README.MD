# 02.API

Każda większa aplikacja ma jakieś połączenie z bazą danych. Często odbywa się to poprzez komunikację z API. Postaramy się napisać własne API. Wykorzystamy w tym celu bibliotekę `apollo-server-micro`.

```bash
npm install -D apollo-server-micro micro graphql
```

Naszą bazą danych będzie plik w formacie JSON. Pierwszym zadaniem jest utworzenie pliku odpowiedzialnego za przechowywanie danych.

`/pages/api/data/data.json`

```json
{
  "directories": [
    { "id": 0, "name": "Dom" },
    { "id": 1, "name": "Szkoła" }
  ],
  "todos": [
    {
      "id": 0,
      "title": "Kartkówka z Angielskiego",
      "desc": "Nauczyć się na kartkówkę ze słówek z działu Jedzenie",
      "date": "15.02.2021",
      "dir": "Szkoła",
      "done": false
    },
    {
      "id": 1,
      "title": "Wypracowanie z Angielskiego",
      "desc": "Napisać rozprawkę na jeden z tematów maturalnych z Polskiego",
      "date": "15.02.2021",
      "dir": "Szkoła",
      "done": false
    }
  ]
}
```

Tak początkowo wyglądać będzie nasza baza danych. Potrzebujemy domyślnych wartości, aby upewnić się, że API, które zaraz napiszemy, będzie działać.

Kolejnym etapem jest zainicjowanie API.

`/pages/api/graphql.js`

```js
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer();

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

### UWAGA

Aplikację będziemy pisać na składni `Typescript`, ale dla uproszczenia, API napiszemy w `Javascript`. Pisanie własnego API to i tak ciężkie zadanie, dlatego na potrzeby lekcji ułatwimy to.

Dodatkowo API można rozbudować o system logowania, rejestracji oraz listę zadań osobną dla każdego użytkownika, jednak to zadanie pozostawiam chętnym.
