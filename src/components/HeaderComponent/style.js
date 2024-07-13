import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 20px 15px;
    background-color: #fff;
    border-bottom: 1px solid #000;
    align-items: center;
    z-index:999;
    width:100%;
    position:fixed;
    top:0;
    
`
export const WrapperHeaderLogo = styled.div`
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`
export const WrapperHeaderSSU = styled.div`
    justify-content: flex-end;
    display: flex;
    
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    text-align: center;
    &:hover {
        color: #ccc;
    }
`
