import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export const DoubleContainer = styled(Card)`
  ${({theme, width}) => `
    width: 95%;
    height: 250px;
    text-align:center;
    margin-top: ${theme.spacing(3)}px;
    ${theme.breakpoints.up('sm')} {
      height: 365px;
    }  
  `}
`

export const StyledCard = styled.div`
  ${({theme}) => `
    padding: 0;
    max-width: 160px;
    text-align:center;
    ${theme.breakpoints.up('sm')} {
      max-width: 210px;
      width: 210px;
    }
    p.description{
      overflow: hidden;
      max-height: 30px;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({theme}) => `
    padding: 0px 0 ${theme.spacing(1)}px;
  `}
`

export const RatingContainer = styled.div`
  display:flex;
  align-items: center;
  p {
    margin-left: 5px;
    margin-top: -1px;
  }
  .MuiSvgIcon-root{ 
    width: .5rem;
    height: .5rem;

    ${({theme}) => theme.breakpoints.up('sm')} {
      width: 14px;
      height: 14px;
    }
  
  }
`

export const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: 140px;
  ${({theme}) => theme.breakpoints.up('sm')} {
    height: 210px;
  }
`;

export const StyledCardHeader = styled(CardHeader)`
  font-size: 12px;
`

export const StyledCardContent = styled(CardContent)`
  text-align:center;
  p.title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export const ActionBar = styled.div`
  border: 1px solid;
  border-radius: 5px;
  height: 20px;
  width: 100%;
  display:flex;
  text-align: center;

  ${({ theme }) => `
    border-color: ${theme.palette.secondary.main};
    align-items: center;
    margin: ${theme.spacing(1)}px 0 ${theme.spacing(.5)}px;
    ${theme.breakpoints.up('sm')} {
      height: 35px;
    }

    .left {
      border-right:1px solid ${theme.palette.secondary.main};
      flex:1;
      padding: 0 5px;
      height: 100%;
      display:flex;
      justify-content:center;
      align-items:center;
      ${theme.breakpoints.up('sm')} {
        padding: 0 10px;
      }
    }
    .right {
      flex:1.3;
      padding: 3px 4px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      cursor:pointer;
      
      svg {
        width: 10px;
        height: 10px;
        ${theme.breakpoints.up('sm')} {
          width: 17px;
          height: 17px;
        }
      }
    }

  `}
`