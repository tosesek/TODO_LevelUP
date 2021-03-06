Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP

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

#### Mała uwaga

`styled-components` nie jest w pełni wspierany przez NextJS, dlatego po naprawieniu błędu i po odświeżeniu strony, może nie załadować poprawnie wyglądu strony. Gdy mamy tylko jeden plik strony, jest to problematyczne, ponieważ musimy zresetować serwer aplikacji kombinacją `ctrl` + `C`. Zobaczymy pytanie, czy na pewno chcemy przerwać zadanie, klikamy `Y` i uruchamiamy nasz serwer ponownie. Gdy mamy więcej stron, wystarczy kliknąć link odnoszący się do kolejnej strony, i wrócić na stronę, którą odświeżaliśmy.

<br/>

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

#### UWAGA

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

:file_folder: `/pages/api/data/data.json`

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

:file_folder: `/pages/api/schemas/index.js`

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

:file_folder :`/pages/api/resolvers/index.js`

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

Zajmiemy się plikiem

:file_folder: `/pages/api/resolvers/todos.js`

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

#### UWAGA

Dobrą praktyką jest nazywanie komponentów wielką literą.

:file_folder: `/components/Directories.tsx`

```tsx
const Directories = () => {
  return <div>Tutaj będą nasze katalogi zwrócone z API</div>;
};
export default Directories;
```

Dobrze by było napisać wygląd tego komponentu, ale jak sprawdzić jego wygląd? Nie widać go na stronie, i nie ma możliwości dostać się do niego przez przeglądarkę. :scream:
Spokojnie, już tłumaczę :grin:
NextJS udostępnia użytkownikowi dostęp tylko do dwóch folderów

- :file_folder: `/pages` - strony i api
- :file_folder: `/public` - zdjęcia i inne assety, które chcemy aby były publiczne

To właśnie dlatego pliki konfiguracyjne i komponenty Reacta piszemy w innych katalogach.
Dodatkowo w folderze :file_folder: `/pages` wyświetlane są tylko pliki napisane w składni Reacta. Nasz plik :file_folder: `/pages/api/data/data.json` nie wyświetli się, zamiast tego zobaczymy stronę błędu 404.

Aby wyświetlić komponent na stronie, musimy go zaimportować, oraz użyć.

:file_folder: `/pages/index.tsx`

```tsx
import { ApolloProvider } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import client from "../config/ApolloClient";
import Directories from "../components/directories";

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
        <Directories />
      </ApolloProvider>
    </StyledDiv>
  );
};

export default Home;
```

`<Directories />` to skrócony zapis. Korzystamy z niego, gdy nie wpisujemy nic wewnątrz znacznika. Gdybyśmy chcieli wpisać coś wewnątrz, zapis wyglądałby tak `<Directories>...</Directories>`.

Sprawdź [stronę aplikacji](http://localhost:3000/) i upewnij się, czy na pewno jest nasz komponent.

Gdy już widać, co napisaliśmy, można zabrać się za stylowanie.
Importujemy `styled-components` i do dzieła.

:file_folder: `/components/Directories.tsx`

```tsx
import styled from "styled-components";

const StyledDirectories = styled.div`
  position: relative;
  display: block;
  padding: 10px;
  margin: 15px auto;
`;

const Directories = () => {
  return (
    <StyledDirectories>
      Tutaj będą nasze katalogi zwrócone z API
    </StyledDirectories>
  );
};
export default Directories;
```

Ten komponent będzie tylko kontenerem, w którym będą poszczególne katalogi.
Dlatego utworzymy komponent odpowiedzialny za wygląd pojedynczego folderu. Jednak do tego komponentu będziemy musieli przesłać parę informacji. Na początek niech są to `nazwa` i `adres`. Składnia `Typescript` wymaga definiowania typów zmiennych, dlatego ten komponent będzie wyglądał trochę inaczej.

:file_folder: `/components/Dir.tsx`

```tsx
import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";

interface DirProps {
  name: string;
  url: string;
}

const StyledDir = styled.button`
  position: relative;
  display: block;
  background: #33f;
  border-radius: 5px;
  font-size: 28px;
  line-height: 38px;
  padding: 10px 25px;
  width: 100%;
  text-align: left;
  color: white;
  margin-bottom: 10px;
`;

const Dir = ({ name, url }: DirProps) => {
  const router = useRouter();
  return <StyledDir onClick={() => router.push(url)}>{name}</StyledDir>;
};
export default Dir;
```

`interface` służy do definiowania typów zmiennych. Wewnątrz określamy, jakie parametry będą przekazywane do komponentu.
`{ name, url }: DirProps` przypisuje typy zmiennych do komponentu.
Zapis `const Dir = () => {}` to nic innego jak przypisanie do zmiennej funckji. Nazywa się to funkcją strzałkową. Wartości, jakie będziemy otrzymywać i wykorzystywać w komponencie, tak jak w zwykłej funkcji, wpisujemy wewnątrz nawiasu. Z drobną różnicą. Piszemy to wewnątrz nawiasu klamrowego.

Jest jeszcze jedna rzecz, która wymaga wyjaśnienia.

NextJS przyspiesza ładowanie stron, poprzez dynamiczne podmienianie zawartości. Zwykły link `<a href="#">link</a>` przeładowuje zawartość strony. NextJS ma swój system przekierowań na swojej stronie. Jest nim `<Link href="#">link</Link>` z biblioteki `next/link` lub router z biblioteki `next/router`. Tutaj używamy routera.

`const router = useRouter()` pozwala nam na korzystanie z routera wewnątrz kodu funkcji. `router.push(url)` odpowiada za wykonanie przekierowania na adres w zmiennej `url`.

Tak przygotowany komponent pozwoli nam na wykorzystanie go do wyświetlenia katalogów z API.

### Czas na pierwsze zapytanie do API

Wcześniej napisałem, że to w `index.tsx` będzie wywołane zapytanie do API. Jest to tylko częściowo prawdą. Samo zapytanie będzie napisane w pliku `/components/Directories.tsx`. Jednak wywołanie będzie wewnątrz znacznika `<ApolloProvider>`.
Dzieje się tak, ponieważ komponent jest wywołany wewnątrz tego znacznika.

W rozdziale 2 podałem przykładowe zapytania do serwera. Tutaj użyjemy jednego z nich.

```tsx
const query = gql`
  query Dirs {
    getDirectories {
      id
      name
    }
  }
`;
```

Zapytanie prosi serwer o podanie katalogów `getDirectories`, a dokładniej `id` i `name`. Jednak samo przypisanie zapytania do zmiennej nic nam nie da. Musimy go użyć. Pozwoli nam na to biblioteka `@apollo/client`.

:file_folder: `/components/Directories.tsx`

```tsx
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Dir from "./Dir";

const query = gql`
  query Dirs {
    getDirectories {
      id
      name
    }
  }
`;

const StyledDirectories = styled.div`
  position: relative;
  display: block;
  padding: 10px;
  margin: 15px auto;
  height: 80vh;
`;

const Directories = () => {
  const { loading, error, data } = useQuery(query);
  if (loading) return <div>Loading data from API</div>;
  if (error)
    return (
      <div>
        Error : <br /> {error}
      </div>
    );
  console.log(data);
  return (
    <StyledDirectories>
      {data.getDirectories.map((directory: any) => (
        <Dir name={directory.name} key={directory.id} url={directory.id} />
      ))}
    </StyledDirectories>
  );
};
export default Directories;
```

`const { loading, error, data } = useQuery(query);` useQuery dostarcza nam 3 dane. `loading` określa, czy dane się jeszcze ładują, `error` czy wystąpił jakiś błąd, no i `data` czyli odpowiedź z serwera.
W konsoli w przeglądarce (`F12`) widzimy, w jakiej fromie zapisana jest odpowiedź z serwera.
`data.getDirectories.map()` pozwala nam przejść po każdym elemencie tablicy, i wykonać kod. Więcej o [array.map](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

### Coś nie działa? Nie ma problemu!

Pliki z tej części poradnika znajdziesz [na tej stronie](https://github.com/Tomsonikus/TODO_LevelUP/tree/main/03.React)

```

```

```

```

```

```

Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP

# 04.Dynamiczne strony NextJS

NextJS dostarcza wiele usprawnień, które poprawiają wydajność strony, ale także ułatwiają ich pisanie. Przykładem może być dynamiczny plik strony. Jeden plik może odpowiadać za wyświetlanie wielu różnych podstron. Wystarczy napisać odpowiedni szablon.

W naszej aplikacji dynamicznie będziemy wyświetlać listę zadań. Jeden plik będzie odpowiedzialny za wyświetlanie zadań z katalogu `Dom` i `Szkoła`. Aby tego dokonać, musimy odpowiednio nazwać i napisać plik strony.

:file_folder: `/pages/[dir].tsx`

```tsx
import { useRouter } from "next/router";

const TodoTasks = () => {
  const router = useRouter();
  const { dir } = router.query;
  return dir;
};
export default TodoTasks;
```

`router` bierze z adresu url zmienną o nazwie `dir` (bo tak nazwaliśmy zmienną w nazwie pliku) i wyświetla ją na stronie.

Na podstawie tej zmiennej możemy wyświetlać odpowiednie zadania z API. Ale zanim je wyświetlimy, czeka nas trochę pracy.

### Etap 1 - przygotowanie komponentów

Można powiedzieć, że podstawowa praca z Reactem opiera się głównie na pisaniu komponentów. Podobnie jak z katalogami, tutaj też będziemy potrzebować 2 komponentów - kontenera i pojedynczego elementu.

#### Uwaga

Zachęcam do zmiany wyglądu aplikacji i zabawy z kodem. W razie problemów, zawsze możesz cofnąć się do poprzednich rozdziałów lub pobrać pliki z [githuba](https://github.com/Tomsonikus/TODO_LevelUP).

:file_folder: `/components/Todos.tsx`

```tsx
import styled from "styled-components";
import Todo from "./Todo";

interface TodosProps {
  dirID: number;
}

const StyledTodos = styled.div`
  position: relative;
  display: block;
  margin: 15px auto;
  padding: 10px;
  height: 80vh;
  overflow-y: auto;
`;

const Todos = ({ dirID }: TodosProps) => {
  return (
    <StyledTodos>
      <Todo
        title="test"
        desc="Sprawdzamy czy nasze komponenty działają"
        date="15.01.2022"
        done={true}
      />
    </StyledTodos>
  );
};
export default Todos;
```

W kontenerze wywołamy zapytanie do API, w którym będziemy potrzebować identyfikatora katalogu.

:file_folder: `/components/Todo.tsx`

```tsx
import styled from "styled-components";
import React from "react";

interface TodoProps {
  title: string;
  desc: string;
  date: string;
  done: boolean;
}
interface StyledStatusProps {
  done: boolean;
}

const StyledTodo = styled.div`
  position: relative;
  display: block;
  background: #33f;
  border-radius: 5px;
  font-size: 28px;
  line-height: 38px;
  padding: 10px 25px;
  width: 100%;
  text-align: left;
  color: white;
  margin-bottom: 10px;
`;
const StyledTitle = styled.div`
  position: relative;
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const StyledDate = styled(StyledTitle)`
  font-size: 16px;
  font-weight: 400px;
  text-align: right;
  color: #cccc;
  position: absolute;
  top: 30px;
`;
const StyledStatus = styled(StyledDate)<StyledStatusProps>`
  color: ${(props) => (props.done ? "#FFF" : "#f00")};
  position: relative;
  padding-bottom: 15px;
  text-transform: uppercase;
`;
const StyledDesc = styled(StyledTitle)`
  font-size: 18px;
  font-size: 400;
`;

const Todo = ({ title, desc, date, done }: TodoProps) => {
  return (
    <StyledTodo>
      <StyledTitle>{title}</StyledTitle>
      <StyledDate>{date}</StyledDate>
      <StyledDesc>{desc}</StyledDesc>
      <StyledStatus done={done}>
        {done ? "Zakończone" : "Do zrobienia"}
      </StyledStatus>
    </StyledTodo>
  );
};
export default Todo;
```

W tym pliku wykorzystałem coś nowego. Do komponentu utworzonego przez `styled-components` przypisałem zmienną jak do komponentu w React. Przydało się to do wybrania koloru w zależności od tego, czy zadanie zostało już skończone, czy nie. Do krótkiej funkcji przesyłam zmienną `props`, która zawiera wszystkie przesłane do komponentu zmienne.
`props.done ? "#FFF" : "#f00"` to nic innego jak instrukcja warunkowa `if`. Najpierw podajemy warunek, `?` i wartości które ma zwrócić, gdy prawda `:` i gdy fałsz.

I teraz najważniejsze - wyświetlenie naszych komponentów.

:file_folder: `/pages/[dir].tsx`

```tsx
import { useRouter } from "next/router";
import styled from "styled-components";
import Todos from "../components/Todos";

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

const TodoTasks = () => {
  const router = useRouter();
  const { dir } = router.query;
  return (
    <StyledDiv>
      <StyledTitle>Test</StyledTitle>
      <Todos dirID={1} />
    </StyledDiv>
  );
};
export default TodoTasks;
```

### Etap 2 - podłączenie API

test
