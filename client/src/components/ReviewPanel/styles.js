import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Chip, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export const ReviewPanelContainer = styled.div`
  padding-right: 10px;
`;

export const ReviewPanelInnerContainer = styled.div`
  max-width: 350px;
`

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(2)}px;

    .title {
      padding-bottom: 5px;
      border-bottom: 2px solid ${theme.palette.brown.main};
      border-radius: 1px;
    }
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
  }
`;

export const StyledRating = styled(Rating)`
  ${({ theme }) => `
    margin-top: ${theme.spacing(1)}px;
  `}
`;

export const StyledCardHeader = styled(CardHeader)`
  font-size: 12px;
`;

export const StyledCardContent = styled(CardContent)`
  padding: 5px 10px;
  text-align: center;
`;
export const ActionBar = styled.div`
  border: 1px solid;
  border-radius: 5px;
  height: 20px;
  width: 100%;
  display: flex;
  text-align: center;

  ${({ theme }) => `
    border-color: ${theme.palette.secondary.main};
    .left {
      border-right:1px solid ${theme.palette.secondary.main};
      flex:1;
      padding: 3px 5px;
      align-items: center;
      display: flex;    
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
      }
    }

  `}
`;

export const RatingBox = styled.div`
  ${({ theme }) => `
    width: 58px;
    height: 58px;
    min-width: 58px;
    border-radius: 14px;
    background-color: ${theme.palette.primary.main};
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    padding: 12px;

    p {
      color: ${theme.palette.primaryTextColor.main};
      text-align:center;
    }

    .reviewTitle {
      font-size: 32px;
      line-height:1;
    }

    .reviewSubtitle {
      font-size: 9px;
    }
  `}
`;

export const RatingLinearMainContainer = styled.div`
  width: 100%;
  margin-left: 10px;
`;

export const RatingLinearContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  p {
    font-size: 14px;
    width: 100px;
  }
`;

export const WriteReviewTitle = styled.div`
  display: flex;
  ${({ theme }) => `
    margin: ${theme.spacing(3)}px 0 ${theme.spacing(2)}px ${theme.spacing(3)}px;
    p {
      padding-bottom: ${theme.spacing(0.5)};
      border-bottom: 1px solid ${theme.palette.primary.main};
    }
    svg {
      width: 15px;
      height: 15px;
      margin-right: 10px;
      ${theme.breakpoints.up("sm")} {
        width: 20px;
        height: 20px;
      }
    }
  `}
`;

export const ReviewCommentContainer = styled.div`
  align-items: center;
  ${({ theme }) => `

    padding: ${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(5)}px;
    border-bottom: 1px solid ${theme.palette.lightGray.main};

    .reviewTitle {
      margin-bottom: ${theme.spacing(2)}px;
      text-decoration: underline;
    }
  `}
`;

export const ReviewHelpfulContainer = styled.div`

  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme }) => `
    margin-top: ${theme.spacing(2)}px;
    p {
      font-weight: 300;
      margin-right: ${theme.spacing(1)}px;
    }

    .icon {
      svg {
        width: 12px;
        height: 12px;
      }
    }

    .thumbup {
      padding: 10px;
      background-color: ${theme.palette.primary.main};
      margin-right: ${theme.spacing(1)}px;

      svg path{
        color: ${theme.palette.white.main};
      }
    }
    .thumbdown {
      padding: 8px;
      background-color: ${theme.palette.white.main};
      border: 1px solid ${theme.palette.brown['700']};
      border-radius: 50%;
      svg {
        width: 14px;
        height: 14px;
      }

      svg path{
        color: ${theme.palette.brown['700']};
      }
    }


  `}
`

export const ReviewRatingContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    
    margin-top: ${theme.spacing(1.5)}px;
    margin-bottom: ${theme.spacing(1)}px;
    svg {
      width: 15px;
      height: 15px;
    }

    p {
      margin-left: ${theme.spacing(2)}px;
    }
  `}
`

export const ReadReview = styled.div`
  display:flex;
  justify-content:center;

  ${({ theme }) => `
    button {
      background: ${theme.palette.lightGray.main};
      margin-top: ${theme.spacing(6)}px;
      padding: 8px 26px;
      font-weight: bold;
    }
    button:hover {
      background: ${theme.palette.lightGray[600]};
    }
  `}
`