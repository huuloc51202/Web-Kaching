import { Col } from "antd";
import styled from "styled-components";

export const Title = styled.h1`
    font-size: 3.5rem;
    font-family: 'SVN-Veneer';
    color: #000;
    margin: 0px 0px 30px 0px;
    font-weight: 500;

`
export const TableHeading = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #000000;
    align-items: center;
    @media (max-width: 521px) {
        display: block;
    }
`

export const TableShare = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    padding: 12px 0px;
    color: #333;
`

export const ThumbCartH4 = styled.h4`
    
    font-size: 1.6rem;
    font-family: sans-serif;
    font-weight: 600;
    color: #000;
    margin: 0px 0px 10px;
    padding-top: 30px;
`
export const ThumbCartSpan = styled.span`
    
    font-size: 1.6rem;
    font-family: sans-serif;
    font-weight: 600;
    color: #000;
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
    padding-left: 7px;
    width: 42px;
    height: 29px;
    text-align: center;
`

export const CartContinue = styled.a`
    font-size: 2rem;
    padding: 0px 40px;
    display: inline-block;
    line-height: 2.5;
    text-decoration: none;
    color: #fff;
    background-color: #000;
    border-radius: 50px;
    text-transform: uppercase;
    &:hover{
        color:#fff;
    }
`

export const CategoryTotal = styled.div`
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 10px 25px;

`

export const ButtonTotal = styled.div`
    padding: 50px;
    text-align: center;
    background-color: #fafafa;
    position: relative;

`

export const PayTotal = styled.div`
    font-size: 1.6rem;
    font-weight: 500;
    text-decoration: none;
    color: #fff;
    background: #000;
    padding: 0px 30px;
    line-height: 3;
    display: inline-block;  
    border-radius: 50px;
    text-transform: uppercase;
    position: absolute;
    left: 50px;
    top: 25px;

`

export const ProductCart =styled.div`
    @media (max-width: 1024px) {
        flex-direction: column;
    }
`

export const ColTable = styled(Col)`
    display: flex;
    justify-content: center;
    
    
`