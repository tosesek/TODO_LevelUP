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
