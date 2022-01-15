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

### UWAGA

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

