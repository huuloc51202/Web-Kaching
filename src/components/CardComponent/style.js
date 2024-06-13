import { Card } from "antd";
import styled from "styled-components";

export const WrapperCard = styled(Card)`
    
    height:628px;
    & img {
        max-width: 100%;
    }
    border-radius: 0px;
`

export const ProContent = styled.div`
    
    font-size:1.6rem;
    text-transform: uppercase;
    font-weight:500;
    padding:0 15px;
    text-align:center;
    height:93px;
`

export const ItemSoldOut = styled.div`
    margin: 8px;
    position: relative;
    text-align: center;
}
`