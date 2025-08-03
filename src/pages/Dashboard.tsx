import styled from "@emotion/styled";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  padding: 2rem;
  border-radius: 7px;
  color: #000433;
  max-width: 1288px;
  margin: 3rem 2rem;
  height: auto;
`;

const Heading = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
  white-space: pre-line;
`;

export default function Dashboard() {
  return (
    <Container>
      <Heading>Hello, Parnia 👋🏻</Heading>
      <Message>
        Im very happy you are here,
        <br /> I hope you find this dashboard easy and useful to use ☺️
      </Message>
    </Container>
  );
}
