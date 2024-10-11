import { Image } from "antd";
import styled from "styled-components";

export const SliderImage = styled(Image)`
    width: 100%; 
    height: auto;

    @media (max-width: 503px) {
        width: 100%;  /* Chiều rộng chiếm toàn bộ màn hình */
        min-height: 500px; /* Chiều cao chiếm toàn bộ màn hình */
        object-fit: cover; /* Đảm bảo hình ảnh không bị méo */
    }
`