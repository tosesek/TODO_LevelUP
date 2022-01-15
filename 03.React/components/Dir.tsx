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
