export const isJsonString = (data) =>{
    try {
        JSON.parse(data)
    } catch(error) {
        return false
    }
    return true
}

export const getBase64 = (file) =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const renderOptions = (arr) => {
    let results = []
    if(arr){
        results = arr?.map((opt) => {
            return {
                value: opt,
                label: opt,
            }
        })
    }
    results.push({
        label: 'Thêm Type',
        value:'add_type'
    })
    return results
}

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return result
    } catch (error) {
        return null
    }
}

export const saveCartToLocalStorage = (userId, cartData) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
    storedCart[userId] = cartData;
    localStorage.setItem('cart', JSON.stringify(storedCart));
}

export const getCartFromLocalStorage = (userId) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
    return storedCart[userId] || [];
}

export const convertDataChart = (data) => {
    // Kiểm tra nếu data không hợp lệ hoặc không phải là mảng
    if (!data || !Array.isArray(data)) {
        return []; // Trả về mảng rỗng nếu không có dữ liệu hợp lệ
    }

    // Sử dụng reduce để tạo ra một đối tượng chứa tổng số lượng bán theo tên sản phẩm
    const productMap = data.reduce((acc, order) => {
        order.orderItems.forEach(item => {
            const productName = item.name;
            const amountSold = item.amount;

            // Cộng dồn số lượng bán
            if (acc[productName]) {
                acc[productName] += amountSold;
            } else {
                acc[productName] = amountSold;
            }
        });
        return acc;
    }, {});

    // Chuyển đổi đối tượng thành mảng các đối tượng với cấu trúc { name, value }
    return Object.keys(productMap).map(productName => ({
        name: productName,
        value: productMap[productName] // Tổng số lượng bán của sản phẩm
    }));
};



