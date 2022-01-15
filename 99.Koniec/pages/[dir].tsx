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
