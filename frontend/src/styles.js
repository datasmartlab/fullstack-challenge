import styled from "styled-components";

export const Root = styled.main`
  * {
    padding: 0;
    margin: 0;
  }
`;

export const MainDocument = styled(Root)`
  margin: 5vh;
  padding: 0% 2% 0%;
  height: 350px;
`;

export const MediaRoot = styled.main`
  width: 80vw;
`;

export const MainDialog = styled.main`
  padding: 2vw;
  display: flex;

  @media screen and (max-width: 425px) {
    flex-direction: column;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ContentDialog = styled.main`
  @media screen and (max-width: 425px) {
    width: 75vw;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    width: 75vw;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 55vw;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 40vw;
  }
`;

export const Content_padding_2_vw = styled.main`
  padding: 2vw;
`;

export const ContentProductListMain = styled(MediaRoot)`
  margin-left: 10%;
`;

export const ContentListItem = styled.main`
  :hover {
    background-color: rgba(110, 110, 110, 0.3);
  }
  cursor: pointer;
  border-bottom: 1px black solid;
`;

export const ContentItem = styled.main`
  :hover {
    background: none;
  }
`;

export const ContentButtons = styled(MediaRoot)`
  display: flex;
  justify-content: space-between;
`;
