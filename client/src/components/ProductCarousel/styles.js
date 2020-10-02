import styled from "styled-components";

export const Container = styled.div`
  ${({ theme }) => `
  
  max-width: 425px;
  .carousel {
    max-width: 425px;
    
    
    .slide img{
      border-radius: 16px;
    }

    .slide {
      border:5px solid #F36D12;
      border-radius: 22px;
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
      border-radius: 16px;
      border-width: 2px;
      border-color ${theme.palette.primary.main};
    }

    .thumb img{
      
      width: 76px;
      height: 76px;
      object-fit: contain;
    }
    .control-arrow {
      border-radius: 16px;
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
    border-radius: 16px;
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
