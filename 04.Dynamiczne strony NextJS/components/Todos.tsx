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
