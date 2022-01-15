import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Dir from "./Dir";

const query = gql`
  query Dirs {
    getDirectories {
      id
      name
    }
  }
`;

const StyledDirectories = styled.div`
  position: relative;
  display: block;
  padding: 10px;
  margin: 15px auto;
  height: 80vh;
`;

const Directories = () => {
  const { loading, error, data } = useQuery(query);
  if (loading) return <div>Loading data from API</div>;
  if (error)
    return (
      <div>
        Error : <br /> {error}
      </div>
    );
  console.log(data);
  return (
    <StyledDirectories>
      {data.getDirectories.map((directory: any) => (
        <Dir name={directory.name} key={directory.id} url={directory.id} />
      ))}
    </StyledDirectories>
  );
};
export default Directories;
