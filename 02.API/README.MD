Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP

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
      "date": "14.02.2021",
      "dir": 1,
      "done": false
    },
    {
      "id": 1,
      "title": "Wypracowanie z Angielskiego",
      "desc": "Napisać rozprawkę na jeden z tematów maturalnych z Polskiego",
      "date": "15.02.2021",
      "dir": 1,
      "done": false
    },
    {
      "id": 3,
      "title": "Zakupy",
      "desc": "Zrobić zakupy, lista zakupów będzie przygotowana i przypięta na lodówce :D",
      "date": "19.02.2021",
      "dir": 0,
      "done": false
    }
  ]
}
```

Tak początkowo wyglądać będzie nasza baza danych. Potrzebujemy domyślnych wartości, aby upewnić się, że API, które zaraz napiszemy, będzie działać.

W tym miejscu rezygnujemy z gotowej trasy API. Odpowiada za nią plik `/pages/api/hello.ts`. Po prostu usuwamy ten plik.

Zanim zajmiemy się uruchomieniem naszego API, musimy dodać kilka wymaganych plików. Pierwszym z nich jest definicja schematów czyli tras i typów danych.

`/pages/api/schemas/index.js`

```js
import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type directory {
    id: ID
    name: String
    todos: [todo]
  }
  type todo {
    id: ID
    title: String!
    desc: String
    date: String
    done: Boolean
  }

  type Query {
    getDirectories: [directory]
    getTodos(dirID: ID): [todo]
  }
`;
export default typeDefs;
```

`type directory` oraz `type todo` są odzwierciedleniem naszego pliku `/pages/api/data/data.json`.
`type Query` określa, jakie zapytania akceptujemy w naszym API i jakiego typu dane zwraca.
Określenie typu w nawiasach klamrowych, np. `[directory]`, mówi nam o tym, że zwrócony zostanie więcej niż jeden element -> lista.

Kolejnym etapem jest zainicjowanie API.

`/pages/api/graphql.js`

```js
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemas";
import resolvers from "./resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

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

To nam jednak wiele nie dało, ponieważ linijka 4

```js
import resolvers from "./resolvers";
```

Zwraca nam error. Próbujemy zaimportować zmienną `resolvers` z pliku, który nie istnieje. Dlatego trzeba go napisać :pencil:
Zakładamy, że nasza aplikacja się rozrośnie w coś większego, dlatego 'odpowiedzi' API rozbijemy na mniejsze pliki.

Głównym plikiem jest index. W nim zaimportujemy funkcje, które ma wykonać serwer, gdy zostanie o coś 'zapytany'.
`/pages/api/resolvers/index.js`

```js
import getTodos from "./todos";
import getDirectories from "./directories";

const resolvers = {
  Query: {
    getTodos: (req, res) => getTodos(res.dirID),
    getDirectories: getDirectories,
  },
};
export default resolvers;
```

`getTodos: (req, res) => getTodos(res.dirID),` wymaga takiego zapisu, ponieważ będziemy przesyłać zmienną do zapytania o zadania. `req` i `res` odnoszą się do protokołu HTTP: `request` i `response`. W `response` będzie przesłana nasza zmienna.

Jak pewnie się domyślacie, potrzebne będą jeszcze 2 pliki. To w nich będzie się działa cała 'magia' :sparkles:

Zajmiemy się plikiem `/pages/api/resolvers/todos.js`

```js
let data = require("../data/data.json");
const todos = (dirID) => {
  return data.todos.filter((todo) => {
    if (todo.dir == dirID) {
      return todo;
    }
  });
};
export default todos;
```

Powyższy kod nie robi nic innego jak importuje nasz plik danych, oraz zwraca listę todos. Na początek to nam wystarczy.

Analogicznie piszemy plik `/pages/api/resolvers/directories.js`

```js
let data = require("../data/data.json");
const directories = () => {
  return data.directories;
};
export default directories;
```

Teraz najważniejsze pytanie.

### Czy to już działa?

Odpowiedź brzmi:

### TAK!

Otwórz [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) i sprawdź sam!

Wystarczy, że wpiszesz te zapytania:

```gql
query Dirs {
  getDirectories {
    id
    name
  }
}
query Todos($id: Int!) {
  getTodos(dirID: $id) {
    id
    title
    desc
    date
    done
  }
}
```

Przy próbie wywołania zapytania `Todos` może wyświetlić się błąd. Wszytsko co musisz zrobić, to wpisać zmienną w zakładce na dole strony `QUERY VARIABLES`. Jak na razie nasza zmienna może przyjąć 2 wartości: 0 i 1. Spowodowane jest to tym, że nie mamy więcej katalogów w bazie. Wpisanie innej wartości zwróci nam pustą tablicę.

```json
{
  "id": 0
}
```

#### UWAGA

Aplikację będziemy pisać na składni `Typescript`, ale dla uproszczenia, API napiszemy w `Javascript`. Pisanie własnego API to i tak ciężkie zadanie, dlatego na potrzeby lekcji ułatwimy to. Sprawdzaniem poprawności typów zmiennych zajmuje się za nas biblioteka `apollo-server-micro`.

Dodatkowo API można rozbudować o system logowania, rejestracji oraz listę zadań osobną dla każdego użytkownika, jednak to zadanie pozostawiam chętnym.

### Coś nie działa? Nie ma problemu!

Pliki z tej części poradnika znajdziesz [na tej stronie](https://github.com/Tomsonikus/TODO_LevelUP/tree/main/02.API).
