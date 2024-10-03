import { Card } from "antd";
import styled from "styled-components";

// export const WrapperCard = styled(Card)`
    
//     height:628px;
//     & img {
//         max-width: 100%;
//     }
//     border-radius: 0px;
// `

// export const ProContent = styled.div`
    
//     font-size:1.6rem;
//     text-transform: uppercase;
//     font-weight:500;
//     padding:0 15px;
//     text-align:center;
//     height:100px;
// `

// export const ItemSoldOut = styled.div`
//     margin: 8px;
//     position: relative;
//     text-align: center;

// `

export const WrapperCard = styled(Card)`
  height: 628px;

  @media (max-width: 1200px) {
    height: 490px;
  } 

  @media (max-width: 992px) {
    height: 480px;
  }

  @media (max-width: 768px) {
    height: 450px;
  }

  @media (max-width: 511px) {
    height: 400px;
  }

  & img {
    max-width: 100%;
  }
  
  border-radius: 0px;
`
export const ProContent = styled.div`
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0 15px;
  text-align: center;
  height: 100px;

  @media (max-width: 992px) {
    font-size: 1.4rem;
    padding: 0 10px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 8px;
  }
`
export const ItemSoldOut = styled.div`
  margin: 8px;
  position: relative;
  text-align: center;

  @media (max-width: 992px) {
    margin: 6px;
  }

  @media (max-width: 768px) {
    margin: 4px;
  }
`

export const PrdPriceBox =  styled.div`
  @media (max-width: 1024px) {
    margin-top: 6px;
  }

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`
