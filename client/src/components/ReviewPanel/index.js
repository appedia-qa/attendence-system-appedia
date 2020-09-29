import React from "react";
import * as StyledComponent from "./styles";
import Typography from "@material-ui/core/Typography";
import { withStyles, Button, IconButton } from "@material-ui/core";
import { ReactComponent as PenSVG } from "../../assets/icons/pen.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import theme from "../../theme/Theme";
import Rating from "@material-ui/lab/Rating";
import moment from "moment";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

const reviews = [
  {
    id: 1,
    name: "Waleed",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2020-03-09 07:14:33.571106",
    stars: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 1,
    name: "Faisal",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2020-04-09 07:14:33.571106",
    stars: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

const BorderLinearProgress = withStyles({
  root: {
    height: 6,
    backgroundColor: theme.palette.lightGray.main,
    borderRadius: 4,
    width: "100%"
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main
  }
})(LinearProgress);

const ReviewComment = ({ review }) => {
  return (
    <StyledComponent.ReviewCommentContainer>
      <Typography variant="h4" className="reviewTitle">
        {review.headline}
      </Typography>
      <StyledComponent.ReviewRatingContainer>
        <Rating
          size="small"
          value={review.rating}
          className={"rating"}
          readOnly
        />
        <Typography variant="body2" component="p">
          {moment(review.updated_at).format("MM/DD/YYYY")}
        </Typography>
      </StyledComponent.ReviewRatingContainer>
      <Typography variant="body1">{review.description}</Typography>
      <StyledComponent.ReviewHelpfulContainer>
        <Typography variant="body1" component="p" color="textSecondary">Was this Review Helpful ?</Typography>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          className="icon thumbup"
        >
          <ThumbUpAltOutlinedIcon/>
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          className="icon thumbdown"
        >
          <ThumbDownAltOutlinedIcon/>
        </IconButton>
      </StyledComponent.ReviewHelpfulContainer>
    </StyledComponent.ReviewCommentContainer>
  );
};

const ReviewPanel = props => {
  return (
    <StyledComponent.ReviewPanelContainer>
      <StyledComponent.ReviewPanelInnerContainer>
        <StyledComponent.ReviewHeader>
          <Typography variant="h4" component="p" className="title">
            Reviews
          </Typography>
          <Typography variant="h5" component="p" color="textSecondary">
            {props.reviews.length} reviews
          </Typography>
        </StyledComponent.ReviewHeader>
        { props.reviews.length > 0 ? 
        (
          <div>
        <div style={{ display: "flex" }}>
          <StyledComponent.RatingBox>
            <Typography component="p" className="reviewTitle">
              {props.rating}
            </Typography>
            {/* <Typography component="p" className="reviewSubtitle">
              {}
            </Typography> */}
          </StyledComponent.RatingBox>
          <StyledComponent.RatingLinearMainContainer style={{display:'none'}}>
            <StyledComponent.RatingLinearContainer>
              <Typography component="p">Excellent</Typography>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={20}
              />
            </StyledComponent.RatingLinearContainer>
            <StyledComponent.RatingLinearContainer>
              <Typography component="p">Size</Typography>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={30}
              />
            </StyledComponent.RatingLinearContainer>
            <StyledComponent.RatingLinearContainer>
              <Typography component="p">Fabric</Typography>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={50}
              />
            </StyledComponent.RatingLinearContainer>
            <StyledComponent.RatingLinearContainer>
              <Typography component="p">Quality</Typography>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={10}
              />
            </StyledComponent.RatingLinearContainer>
          </StyledComponent.RatingLinearMainContainer>
        </div>

        <Rating
          size="small"
          value={props.rating}
          // className={"rating"}
          readOnly
        />
        </div>
        )
        : null}
      </StyledComponent.ReviewPanelInnerContainer>
      {/* <StyledComponent.WriteReviewTitle>
        <PenSVG></PenSVG>
        <Typography component="p" variant="h5">
          Write a review
        </Typography>
      </StyledComponent.WriteReviewTitle> */}

      {props.reviews.map(review => (
        <ReviewComment review={review} />
      ))}

      {/* <StyledComponent.ReadReview>
        <Button autoCapitalize={false}>Read All Reviews</Button>
      </StyledComponent.ReadReview> */}
    </StyledComponent.ReviewPanelContainer>
  );
};

export default ReviewPanel;
