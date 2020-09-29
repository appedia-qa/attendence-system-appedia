import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
export const StyledCard = styled(Card)`
  ${({ theme }) => `
    width: 165px;
    text-align:left;
    cursor: pointer;
    background: ${theme.palette.white[400]};
    margin-top: ${theme.spacing(3)}px;

    ${theme.breakpoints.up("md")} {
      width: 250px;
      height: 415px;
    }
    p.description{
      overflow: hidden;
      max-height: 36px;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }
  `}
`;

export const StyledCardMediaContainer = styled.div`
  position: relative;
`;

export const FavoriteButton = styled.button`
${({ selected, theme }) => `
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  background: transparent;
  ${theme.breakpoints.down("xs")} {
    top: 3px;
    right: 0;
  }
    svg path {
      fill: ${
    selected ? theme.palette.secondary[600] : theme.palette.lightGray[700]
    };
    }
`}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => `
    padding: 0px 0 ${theme.spacing(1)}px;
  `}
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 5px;
    margin-top: -1px;
  }
  .MuiSvgIcon-root {
    width: 0.5rem;
    height: 0.5rem;

    ${({ theme }) => theme.breakpoints.up("sm")} {
      width: 14px;
      height: 14px;
    }
  }
`;

export const StyledCardMedia = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 263px;
  }
`;

export const StyledCardHeader = styled(CardHeader)`
  font-size: 12px;
`;

export const StyledCardContentContainer = styled.div`
  ${({ theme }) => `
    padding: 15px 15px;
    ${theme.breakpoints.down("sm")} {
      padding: 10px 12px;
    }
  `}
`;

export const StyledCardContent = styled(CardContent)`
  text-align: left;
  padding: 0;
  margin-bottom: 10px;

  p.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }
`;
export const ActionBar = styled.div`
  width: 100%;
  display: flex;
  text-align: left;
  justify-content: space-between;

  ${({ theme }) => `
    border-color: ${theme.palette.secondary.main};
    align-items: center;
    margin: ${theme.spacing(1)}px 0 ${theme.spacing(0.5)}px;
    margin-top: ${theme.spacing(1.5)}px;
    ${theme.breakpoints.up("sm")} {
      height: 30px;
    }

    button {
      border-radius: 0;
      box-shadow: none;
      background-color: ${theme.palette.secondary.main};
      p {
        color: ${theme.palette.white.main};
      }
      ${theme.breakpoints.down("sm")} {
        p {
          font-size: 10px !important;
        }
        padding: 6px;
      }
    }

  `}
`;
