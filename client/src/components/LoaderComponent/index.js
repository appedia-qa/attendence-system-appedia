import React from 'react';
import Loader from 'react-loader-spinner'
import styled from 'styled-components';

const LoaderContainer = styled.div`
  ${({ theme ,height}) => `
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    height: ${height ? height : '60vh'}
    svg {
      fill: ${theme.palette.secondary.main};
      stroke: ${theme.palette.secondary.main};
    }
  `}
`

const LoaderComponent = (props) => {
  return (
    <LoaderContainer style={{height:props.height ? props.height :'60vh' }}>
      <Loader 
        type="Oval"
        height={50}
        width={50}
      />
    </LoaderContainer>
  )
}

export default LoaderComponent;