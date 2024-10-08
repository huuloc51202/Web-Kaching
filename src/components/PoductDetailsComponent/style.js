import { Col } from "antd";
import styled from "styled-components";

export const SliderProCol = styled(Col)`
    padding: 40px 15px;
    border-right: 1px solid #000;
    @media (max-width: 575px) {
        border-right: 1px solid #fff
    }
`

export const SliderPro = styled.div`

    padding: 0 45px;
    @media (min-width: 1490px) {
        padding: 0 175px;
    }

   
`

export const SliderProItem = styled.div`

    
    margin-bottom: 15px;
    position: relative;
`

export const SliderProImg = styled.img`

    max-width: 100%;
    height: 85%;
    cursor: pointer;


`

export const ListImageSm = styled.img`
    width: 100%;
    margin : 5px;
`

export const Control = styled.div`
    
    position: absolute;
    top: 50%;
    border-radius: 50px;
    font-size: 3rem;
    background-color: rgb(226, 222, 216, 0.1);
    padding: 8px 13px;
    cursor: pointer;

`

export const ProductActionCol = styled.div`
    max-height:850px;
    overflow-y:auto;
    @media ( max-width: 575px){
        max-height:100%;
        overflow-y: hidden;
    }
`

export const ProductAction = styled.div`
    border-bottom: 1px solid #000;
    padding: 40px 15px;
    text-align: center;
`

export const ProductDetailName = styled.h1`
    font-weight: 600;
    font-size: 18px !important;
    text-transform: uppercase;
    width: 80%;
    margin: auto;
`

export const CurrentPrice = styled.span`
    font-weight: 600;
    font-size: 16px !important;
    text-transform: uppercase;

`

export const ItemColorImg = styled.img`
    padding: 0.1rem;
    width: 74px;
    object-fit: cover;
    border-radius: 5px;
    overflow: hidden;
`

export const SizeSpan = styled.span`
    margin: 0 5px;
    cursor: pointer;

` 

export const SizeSpanA = styled.span`
    border: 1px solid #000;
    height: 45px;
    min-width: 35px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    text-align: center;
    font-weight: 400;
    background: #fff;
    transition: all .2s;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    padding: 0 5px;
    cursor: pointer;
    &.active {
        background-color: black;
        color: white;
    }
` 

export const Qty = styled.button`
    border: 1px solid #000;
    height: 30px;
    width: 30px;
    background-color: #fff;
    cursor: pointer;

`

export const QtyInput = styled.input`
    border: 1px solid #000;
    border-right: none;
    border-left: none;
    padding-left: 5px;
    width: 100px;
    height: 29px;
    text-align: center;
`

export const AddCartButton = styled.button`
    
    margin: 25px 0 0;
    background-color: #000 ;
    width: 200px;
    height: 37px;
    text-align: center;
    border-radius: 4px;
    border: none;
    &:hover{
        background-color: #006b2b;
        
    }
    cursor: pointer;

`

export const ProductDescription = styled.div`
    padding: 40px 15px;
    text-align: center;
`

export const PrdDesTitle = styled.h1`

    font-weight: 600;
    font-size: 1.8rem;
    text-transform: uppercase;
    width: 80%;
    margin: auto;
`

export const PrdDesContent = styled.div`
    width: 80%;
    max-width: 600px;
    margin: 40px auto 0;
`

export const PrdDesContentP = styled.p`
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
`

