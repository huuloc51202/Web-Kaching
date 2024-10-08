import { Row,Col } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled(Row)`
    background-color: #000;
    align-items: center;
    width:100%;
`

export const WrapperCol = styled(Col)`
    padding: 20px;
    border-right: 1px solid #fff;  
    @media (max-width: 768px) {
        border-bottom:1px solid #fff
    };

    @media (max-width: 576px) {
        padding: 10px;
        border-bottom:1px solid #fff;
        border-right: 1px solid #000;  
    };
`

export const ColInner = styled.div`
   
    @media (max-width: 576px){
        margin-bottom: 0px !important;
        text-align: center;
    }
`

