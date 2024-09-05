import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems : [

        
    ],
    shippingAddress: {
        
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt:'',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            // Tìm sản phẩm dựa trên cả 'product' và 'size'
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === orderItem.product && item?.size === orderItem.size
            );
        
            if (itemOrder) {
                // Nếu sản phẩm cùng size đã tồn tại, tăng số lượng
                itemOrder.amount += orderItem?.amount;
            } else {
                // Nếu sản phẩm với size mới, thêm sản phẩm mới vào giỏ hàng
                state.orderItems.push(orderItem);
            }
        },

        increaseAmount: (state, action) => {
            const { idProduct, size } = action.payload;  // Lấy idProduct và size từ action.payload
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct && item?.size === size
            );
            if (itemOrder) {
                itemOrder.amount++;
            }
        },
        
        decreaseAmount: (state, action) => {
            const { idProduct, size } = action.payload;  // Lấy idProduct và size từ action.payload
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct && item?.size === size
            );
            if (itemOrder && itemOrder.amount > 1) {  // Đảm bảo không giảm xuống dưới 1
                itemOrder.amount--;
            }
        },
        
        // removeOrderProduct: (state, action) => {
        //     const {idProduct} = action.payload
        //     const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
        //     itemOrder.orderItems = idProduct
            
        // },
        removeOrderProduct: (state, action) => {
            const { idProduct, size } = action.payload;
            
            // Lọc ra những sản phẩm không có idProduct và size tương ứng để loại bỏ chúng khỏi orderItems
            state.orderItems = state.orderItems.filter((item) => !(item.product === idProduct && item.size === size));
        },
        clearOrder: (state) => {
            state.orderItems = [];
        }
        
    }
})

// Action creators are generated for each case reducer function
export const { addOrderProduct,increaseAmount,decreaseAmount,removeOrderProduct,clearOrder } = orderSlide.actions

export default orderSlide.reducer