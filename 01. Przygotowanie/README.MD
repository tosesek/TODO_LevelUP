Projekt aplikacji :ballot_box_with_check: TODO dla akademii programowania LevelUP


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

Parametr `--ts` określa składnię w jakiej będzie pisana aplikacja. Dokładniej mówiąc, jest to `typescript`. Różni się on od zwykłego Javascript między innymi typowaniem zmiennych. Pozwala to nam "filtrować" wartości przesyłane do funkcji i komponentów, co może ograniczyć ilość błędów. Przy próbie przypisania wartości innego typu niż typ zmiennej React wyświetli nam opdowiedni komunikat.

Oprócz szablonu będziemy potrzebować kilka dodatkowych pakietów.
Wygląd aplikacji można pisać w standardowej składni CSS, ale w tym poradniku zrobimy coś innego.
Biblioteka :nail_care:` styled-components` służy do stylowania poszczególnych komponentów, z których "zbudujemy" naszą aplikację. Instalujemy ją komendą:

```bash
npm install -D styled-components @types/styled-components
```

Dokumentację tej biblioteki znajdziesz [tutaj](https://styled-components.com/docs).

### Mała uwaga

`styled-components` nie jest w pełni wspierany przez NextJS, dlatego przy odświeżeniu strony, może nie załadować poprawnie wyglądu strony. Gdy mamy tylko jeden plik strony, jest to problematyczne, ponieważ musimy zresetować serwer aplikacji kombinacją `ctrl` + `C`. Zobaczymy pytanie, czy na pewno chcemy przerwać zadanie, klikamy `Y` i uruchamiamy nasz serwer ponownie. Gdy mamy więcej stron, wystarczy kliknąć link odnoszący się do kolejnej strony, i wrócić na stronę, którą odświeżaliśmy.

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

Folder `pages/api` jest automatycznie przekierowany na adres `/api/*`. Pliki w tym folderze są traktowane jako [trasy API](https://nextjs.org/docs/api-routes/introduction) zamiast stron React .

## Dowiedz się więcej

Aby dowiedzieć się więcej o Next.js, zobacz poniższe linki:

- [Next.js Documentation](https://nextjs.org/docs) - Dowiedz się więcej o funkcjach Next.js i API.
- [Learn Next.js](https://nextjs.org/learn) - interaktywny tutorial Next.js.

Możesz też sprawdzić oficjalne repozytorium [Next.js na GitHub](https://github.com/vercel/next.js/).

## Wdrażanie na Vercel

Najprostrzy sposób na wdrożenie aplikacji Next.js jest skorzystanie z [platformy Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) od twórców Next.js.

Sprawdź [ dokumentację wdrażania aplikacji Next.js](https://nextjs.org/docs/deployment).

Ale zanim to zrobisz, czeka cię sporo pracy. Powodzenia :punch:
