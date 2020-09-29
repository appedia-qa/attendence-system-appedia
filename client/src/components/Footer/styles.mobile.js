import styled from 'styled-components';


export const FooterMobileContainer = styled.div`
${({theme}) => `
  padding: 50px 30px 60px;
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.white.main};
  box-shadow: 0px 3px 6px #00000029;
  padding: 30px 7% 20px 3%;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: space-between;

  .menu-icon {
    height: 20px;
    width: auto;
  }
  .house-logo {
    height: 30px;
    width: auto;
    margin-left: 15px;
  }

  .download-icons {
    display:flex;
    flex-direction: column;
    svg {
      height: 40px;
      width: auto;
      margin-top: 15px;
    }
  }

  .social-icons {
    width: 70%;
    display:flex;
    justify-content: space-evenly;
    svg {
      height: 30px;
      width: auto;
    }    
  }
  .helpcenter {
    margin: 20px 0 5px;
  }

  .shop {
    margin-top: 65px;
  }

  .connect {
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .payment-icons {
    margin-top: 20px;
    width: 60%;
    justify-content: space-evenly;
    display:flex;
    align-items: center;
    img{
      height: 32px;
      width: auto;
    }
  } 
  .rights {
    font-size: 14px;
    font-weight: 300;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  `}
`;
