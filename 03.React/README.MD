Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP

# 03.React

Czas wziąć się za nasz szablon strony. Zacznijmy od drobnych porządków...

Usuwamy te pliki:

- `/styles/Home.module.css`
- `/public/vercel.svg`

Oraz zmieniamy zawartość niżej wymienionych plików.

`/styles/global.css`

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

`/pages/index.tsx`

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
`/pages/index.tsx`

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
