import styled from "styled-components";

export const Container = styled.div`
  ${({ theme }) => `

  .carousel {
    
    .slide {
      min-height: 250px;
    }
    max-width: 425px;
    .thumbs-wrapper {
      margin:0;
    }

    .thumbs.animated {
      padding: 0;
    }
    .control-prev.control-arrow {
      // background:blue;
    }

    .thumb {
      width: 76px !important;
      padding: 0;
    }

    .thumb.selected{
      border-width: 2px;
      border-color ${theme.palette.primary.main};
    }

    .thumb img{
      width: 76px;
      height: 76px;
      object-fit: contain;
    }
    .control-arrow {
      opacity:1;
    }
    .control-next.control-arrow:before {
      border-left: 8px solid ${theme.palette.primary.main};
    }
    .control-prev.control-arrow:before {
      border-right: 8px solid ${theme.palette.primary.main};
    }
  }

  .carousel-image {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    width: 425px;
    height: 100%;
    object-fit: contain;
    background: white;
  }
  `}
`;
