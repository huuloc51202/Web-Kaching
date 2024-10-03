import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 7px 15px;
    background-color: #fff;
    border-bottom: 1px solid #000;
    align-items: center;
    z-index:999;
    width:100%;
    position:fixed;
    top:0;
    @media (max-width: 768px) {
        padding: 15px 10px;
    };

    @media (max-width: 576px) {
        padding: 0px 5px;
    };
    
`
export const WrapperHeaderLogo = styled.div`
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: 2.5rem;
    };

    @media (max-width: 576px) {
        font-size: 2rem;
        margin-bottom: 10px;
    };
`
export const WrapperHeaderSSU = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: space-between;
    };

    @media (max-width: 576px) {
        width: 100%;
        justify-content: right;
        
    };
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    text-align: center;
    &:hover {
        color: #ccc;
    }
    @media (max-width: 576px) {
        font-size: 0.9rem;
    }
`
