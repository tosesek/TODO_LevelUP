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
