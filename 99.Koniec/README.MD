# Projekt aplikacji :ballot_box_check: TODO

# 01.Przygotowanie

Projekt aplikacji dla akademii programowania LevelUP

## Zaczynamy!

Najpierw należy przygotować środowisko, w którym będziemy pracować.

Utwórz folder o dowolnej nazwie a następnie włącz terminal.
Przejdź do katalogu komeną:

```bash
  cd sciezka/do/katalogu
```

Repozytoria npm zawierają wiele bibliotek ułatwiających pracę. Jedną z nich jest `create-react-app`.
Tworzy ona podstawowy szablon aplikacji. Nie pozostaje nam nic innego, jak uruchomić komendę:

```bash
npx create-next-app --ts .
```

Parametr `--ts` określa składnię w jakiej będzie pisana aplikacja. Dokładniej mówiąc, jest to `Typescript`. Różni się on od zwykłego Javascript między innymi typowaniem zmiennych. Pozwala to nam "filtrować" wartości przesyłane do funkcji i komponentów, co może ograniczyć ilość błędów. Przy próbie przypisania wartości innego typu niż typ zmiennej React wyświetli nam opdowiedni komunikat.

Oprócz szablonu będziemy potrzebować kilka dodatkowych pakietów.
Wygląd aplikacji można pisać w standardowej składni CSS, ale w tym poradniku zrobimy coś innego.
Biblioteka :nail_care:` styled-components` służy do stylowania poszczególnych komponentów, z których "zbudujemy" naszą aplikację. Instalujemy ją komendą:

```bash
npm install -D styled-components @types/styled-components
```

Dokumentację tej biblioteki znajdziesz [tutaj](https://styled-components.com/docs).

Na razie tyle nam wystarczy. Można zacząć pisać :pencil2:.

Otwórz folder z aplikacją w ulubionym edytorze, np VS Code. Jeżeli masz uruchomiony terminal, wystarczy że wpiszesz tą komendę:

```bash
code .
```

Kolejna komenda uruchamia serwer. Jest on nam potrzebny aby widzieć, co dokładnie dzieje się z naszą aplikacją.

```bash
npm run dev
```

Teraz otwórz [ten link](http://localhost:3000)w swojej przeglądarce, lub wpisz `http://localhost:3000/`.

Aby zmienić zawartość strony otwórz plik `pages/index.tsx`. Strona odświeży się od razu po zapisaniu pliku.

NextJS posiada wbudowany [serwer API](https://nextjs.org/docs/api-routes/introduction). Aby dostać się do API otwórz [ten link](http://localhost:3000/api/hello). Ten punkt końcowy API możesz zmienić w pliku `pages/api/hello.ts`.

Folder `pages/api` jest automatycznie przekierowany na adres `/api/*`. Pliki w tym folderze są traktowane jako [trasy API](https://nextjs.org/docs/api-routes/introduction) zamiast stron React.

### UWAGA

Wszystkie ścieżki podane w poradniku odnoszą się do głównego katalogu aplikacji. Jeżeli pomylisz ścieżkę, aplikacja może nie działać tak jak powinna.

## Dowiedz się więcej

Aby dowiedzieć się więcej o Next.js, zobacz poniższe linki:

- [Next.js Documentation](https://nextjs.org/docs) - Dowiedz się więcej o funkcjach Next.js i API.
- [Learn Next.js](https://nextjs.org/learn) - interaktywny tutorial Next.js.

Możesz też sprawdzić oficjalne repozytorium [Next.js na GitHub](https://github.com/vercel/next.js/).

## Wdrażanie na Vercel

Najprostrzy sposób na wdrożenie aplikacji Next.js jest skorzystanie z [platformy Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) od twórców Next.js.

Sprawdź [dokumentację wdrażania aplikacji Next.js](https://nextjs.org/docs/deployment).

Ale zanim to zrobisz, czeka cię sporo pracy. Powodzenia :punch:

```

```

```

```

```

```

Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP

# 02.API

Każda większa aplikacja ma jakieś połączenie z bazą danych. Często odbywa się to poprzez komunikację z API. Postaramy się napisać własne API. Wykorzystamy w tym celu bibliotekę `apollo-server-micro`.

```bash
npm install -D apollo-server-micro micro graphql
```

Naszą bazą danych będzie plik w formacie JSON. Pierwszym zadaniem jest utworzenie pliku odpowiedzialnego za przechowywanie danych.

:file_folder:`/pages/api/data/data.json`

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

W tym miejscu rezygnujemy z gotowej trasy API. Odpowiada za nią plik `/pages/api/hello.ts`. Po prostu usuwamy ten plik.

Zanim zajmiemy się uruchomieniem naszego API, musimy dodać kilka wymaganych plików. Pierwszym z nich jest definicja schematów czyli tras i typów danych.

:file_folder: `/pages/api/schemas/index.js`

```js
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type directory {
    id: ID
    name: String
  }
  type todo {
    id: ID
    title: String!
    desc: String
    date: String
    dir: String!
    done: Boolean
  }

  type Query {
    getDirectories: [directory]
    getTodos(dirID: ID): [todo]
  }
`;
```

`type directory` oraz `type todo` są odzwierciedleniem naszego pliku `/pages/api/data/data.json`.
`type Query` określa, jakie zapytania akceptujemy w naszym API i jakiego typu dane zwraca.
Określenie typu w nawiasach klamrowych, np. `[directory]`, mówi nam o tym, że zwrócony zostanie więcej niż jeden element -> lista.

Kolejnym etapem jest zainicjowanie API.

:file_folder: `/pages/api/graphql.js`

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
:file_folder: `/pages/api/resolvers/index.js`

```js
import getTodos from "./todos";
import getDirectories from "./directories";

const resolvers = {
  Query: {
    getTodos: getTodos,
    getDirectories: getDirectories,
  },
};
export default resolvers;
```

Jak pewnie się domyślacie, potrzebne będą jeszcze 2 pliki. To w nich będzie się działa cała 'magia' :sparkles:

Zajmiemy się plikiem
:file_folder: `/pages/api/resolvers/todos.js`

```js
let data = require("../data/data.json");
const todos = () => {
  return data.todos;
};
export default todos;
```

Powyższy kod nie robi nic innego jak importuje nasz plik danych, oraz zwraca listę todos. Na początek to nam wystarczy.

Analogicznie piszemy plik
:file_folder: `/pages/api/resolvers/directories.js`

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
query Todos {
  getTodos {
    id
    title
    desc
    date
    done
  }
}
```

### UWAGA

Aplikację będziemy pisać na składni `Typescript`, ale dla uproszczenia, API napiszemy w `Javascript`. Pisanie własnego API to i tak ciężkie zadanie, dlatego na potrzeby lekcji ułatwimy to. Sprawdzaniem poprawności typów zmiennych zajmuje się za nas biblioteka `apollo-server-micro`.

Dodatkowo API można rozbudować o system logowania, rejestracji oraz listę zadań osobną dla każdego użytkownika, jednak to zadanie pozostawiam chętnym.

### Coś nie działa? Nie ma problemu!

Pliki z tej części poradnika znajdziesz [na tej stronie](https://github.com/Tomsonikus/TODO_LevelUP/tree/main/02.API).

```

```

```

```

```

```

Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP

# 03.React

Czas wziąć się za nasz szablon strony. Zacznijmy od drobnych porządków...

Usuwamy te pliki:

- :file_folder: `/styles/Home.module.css`
- :file_folder: `/public/vercel.svg`

Oraz zmieniamy zawartość niżej wymienionych plików.

:file_folder: `/styles/global.css`

```css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background: #08498c;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
```

:file_folder: `/pages/index.tsx`

```tsx
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lista Zadań</title>
        <meta name="description" content="Projekt z zajęć Akademii LevelUP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      content
    </div>
  );
};

export default Home;
```

Małe wyjaśnienie. Znacznik `<Head>` to niestandardowy komponent z biblioteki `NextJS`. Służy on do zmiany wartości zdefiniowanych w standardowej sekcji `<head>` strony, takich jak `<title>` czy `<meta>`.

Nadszedł czas na pisanie własnych komponentów. Zaczniemy od prostego znacznika `<div></div>` ze zmienionym wyglądem.

```tsx
import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  display: block;
  width: 1200px;
  height: 95vh;
  background: #fff5;
  margin: 20px auto;
  padding: 15px;
  border-radius: 5px;
`;
```

Teraz wystarczy podmienić `<div>` na `<StyledDiv>` i voilà.
Właśnie napisałeś, i użyłeś swojego pierwszego komponentu w :nail_care: styled-components.

W ten sposób zrobimy jeszcze jeden komponent. Będzie nim tytuł strony.

```tsx
const StyledTitle = styled.div`
  position: relative;
  display: block;
  font-size: 80px;
  line-height: 90px;
  font-weight: 00;
  color: #000c;
  text-align: center;
  margin-top: 15px;
`;
```

Teraz wykorzystaj komponent wewnątrz `<StyledDiv>`. Nasz index powinien wyglądać następująco:
:file_folder: `/pages/index.tsx`

```tsx
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  display: block;
  width: 1200px;
  height: 95vh;
  background: #fff5;
  margin: 20px auto;
  padding: 15px;
  border-radius: 5px;
`;
const StyledTitle = styled.div`
  position: relative;
  display: block;
  font-size: 80px;
  line-height: 90px;
  font-weight: 00;
  color: #000c;
  text-align: center;
  margin-top: 15px;
`;

const Home: NextPage = () => {
  return (
    <StyledDiv>
      <Head>
        <title>Lista Zadań</title>
        <meta name="description" content="Projekt z zajęć Akademii LevelUP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledTitle>Lista Zadań</StyledTitle>
    </StyledDiv>
  );
};

export default Home;
```

A może coś bardziej zaawansowanego?
`styled-components` to nic innego jak przypisanie do zmiennej gotowego tagu html z przypisaną klasą css. Serwer dynamicznie generuje i podmienia style dla poszczególnych elementów.
Kolejne komponenty nie będą już tak łatwe.

### W tym miejscu przyszedł czas na podpięcie się do API.

Potrzebować będziemy biblioteki klienta Apollo `@apollo/client`. Instalujemy ją komendą:

```bash
npm i -D @apollo-client
```

Server Apollo wymaga od nas, aby każde zapytanie było wywołane wewnątrz tzw. `body` komponentu. Biblioteka ta dostarcza specjalny komponent, wewnątrz którego będą wywoływane zapytania. Komponent ten wymaga odpowiedniego parametru, którym jest `client`. Nasza aplikacja będzie działała na kilku stronach, dlatego definicję clienta napiszemy w osobnym pliku.

:file_folder: `/config/ApolloClient.ts`

```ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql/",
  cache: new InMemoryCache(),
});

export default client;
```

- `uri` to adres naszego serwera API.
- `cache` określa, jak mają być przechowywane dane tymczasowe.

Teraz musimy zmienić naszą stronę domową.
:file_folder: `/pages/index.tsx`

```tsx
import { ApolloProvider } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import client from "../config/ApolloClient";

const StyledDiv = styled.div`
  position: relative;
  display: block;
  width: 1200px;
  height: 95vh;
  background: #fff5;
  margin: 20px auto;
  padding: 15px;
  border-radius: 5px;
`;
const StyledTitle = styled.div`
  position: relative;
  display: block;
  font-size: 80px;
  line-height: 90px;
  font-weight: 00;
  color: #000c;
  text-align: center;
  margin-top: 15px;
`;

const Home: NextPage = () => {
  return (
    <StyledDiv>
      <Head>
        <title>Lista Zadań</title>
        <meta name="description" content="Projekt z zajęć Akademii LevelUP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledTitle>Lista Zadań</StyledTitle>
      <ApolloProvider client={client}>
        <div>Tutaj będziemy wywoływać zapytania do API</div>
      </ApolloProvider>
    </StyledDiv>
  );
};

export default Home;
```

Kolejnym krokiem jest napisanie komponentów, tym razem w składni Reacta.
Pierwszym komponentem będzie lista katalogów.
:file_folder: `/components/directories.tsx`

```tsx
const Directories = () => {
  return <div>Tutaj będą nasze katalogi zwrócone z API</div>;
};
export default Directories;
```
