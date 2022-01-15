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
