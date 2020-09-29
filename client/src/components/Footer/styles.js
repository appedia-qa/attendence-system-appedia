import styled from "styled-components";
import { Grid, Row } from "react-flexbox-grid";
import { Link } from "react-router-dom";

export const FooterContainer = styled(Grid)`
  ${({ theme }) => `
    width: 100%;
    background-color: ${theme.palette.primary.main};
    p {
      color: white !important;
    }

  `}
`;
export const Container = styled(Grid)`
  padding: 40px 5% 20px;
  .MuiTypography-body1 {
    color: black;
  }
  ${({ theme }) => `
    width: 100%;
    background-color: ${theme.palette.primary.main};
  

  `}
`;

export const InfoRow = styled(Row)`
  padding: 40px 5% 20px;
`;
export const SvgContainer = styled.div`
${({ theme }) => `
svg {
  width: 50%;
  height: auto;
  .a {
    stroke: none;
  } 
}
}`})}
`;
export const ContactContainer = styled.div`
  margin-bottom: 30px;
  p {
    margin-top: 5px;
  }
  .letter {
    font-size: 10px;
    font-weight: 200;
  }

  svg {
    height: 34px;
    width: auto;
    margin-bottom: 20px;
  }
`;

export const BrandContainer = styled.div`
  h5 {
    margin-bottom: 20px;
    margin-top: 10px;
  }

  p {
    color: black;
    margin-bottom: 3px;
    font-weight: 550;
    letter-spacing: 0px;
  }
`;

export const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
    padding: 0px;
    margin: 0px;
    color: black;
    font-size: 16px;
    margin-right: 10px;
    font-weight: 400;
  }
  h2 {
    padding: 0px;
    margin: 0px;
    color: black;
    font-size: 12px;
    font-weight: 400;
  }
`;
export const footer = styled.div`
  h1 {
    padding: 0px;
    margin: 0px;
    color: black;
    font-size: 16px;
    margin-right: 10px;
    font-weight: 400;
  }
  h2 {
    padding: 0px;
    margin: 0px;
    color: black;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const DownloadContainer = styled.div`
  padding: 0 3% 0 10%;
  h5 {
    color: white;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .download-icons {
    margin-top: 20px;
    svg {
      margin-top: 15px;
      height: 42px;
      width: auto;
    }
  }
`;

export const BottomRow = styled(Row)`
  padding: 20px 5% 20px;
  justify-content: space-between;
  align-item: center;
  .rights {
    font-size: 14px;
    color: white;
  }
  .social-icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    svg {
      height: 20px;
      width: auto;
      margin-right: 10px;
    }
  }
  .payment-icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    img {
      height: 25px;
      width: auto;
      margin-right: 5px;
    }
  }
`;
