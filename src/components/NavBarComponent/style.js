import styled from "styled-components";

export const CategoryActionsWrap = styled.div`
    border: 1px solid #000;
    position: relative;
`

export const Contauner = styled.div`
    padding: 0 15px;
    margin:0 132px;

`

export const LefttFilter = styled.div`
    width: 180px;
    position: relative;
    
`

export const ArrangeTitle = styled.div`
    padding: 9px;
    border: 1px solid #000;
    position: relative;
    font-size:1.4rem;
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    cursor: default;
    
`

export const FilterArrange = styled.div`
    position: absolute;
    background-color: #fff;
    z-index: 500;
    border:1px solid #000;
    min-width: 178px;
    top: 36px;
    display: none;
    
`

export const FilterArrangeA = styled.a`
    display: block;
    padding: 9px;
    border-bottom: 1px solid #000;
    text-decoration: none;
    font-size:1.4rem;
    cursor: pointer;
    color:#000;
    &:hover {
        background-color: #000;
        color:#fff ;
    }
`
