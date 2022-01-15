import { ApolloProvider } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import client from "../config/ApolloClient";
import Directories from "../components/Directories";

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
        <Directories />
      </ApolloProvider>
    </StyledDiv>
  );
};

export default Home;
