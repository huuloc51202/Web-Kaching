import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientService = () => {
    return (
        <div>
            <div className="body-news" style={{marginTop:'60px',minHeight:'100vh'}}>
    
                <div className="client-service-wrap">
                    <div className="container" >
                        <div className="row justify-content-center" >
                            <div  className="col-lg-12 col-md-12 col-12">
                                <div className="client-service-inner" 
                                    style={{
                                        borderRight:'1px solid #000',
                                        borderLeft:'1px solid #000',
                                        borderBottom:'1px solid #000', 
                                        padding:'20px 40px 40px'
                                    }}>
                                    <h2 className="client-service-title" 
                                        style={{
                                            fontSize:'1.6rem',
                                            textTransform:'uppercase',
                                            fontWeight:'600',
                                            textAlign:'center',
                                            margin:'0 0 20px',
                                            borderBottom:'1px solid #000',
                                            paddingBottom:'20px'
                                        }}>
                                        client services
                                    </h2>
                                    <ul className="cs-list" style={{listStyle:'none',padding:'0',margin:'0'}}>
                                        <li className="cs-item" style={{borderBottom:'1px solid #000',marginBottom:'20px'}}>
                                            <span className="cs-item-title" style={{textTransform:'uppercase',fontWeight:'600',fontSize:'1.5rem',paddingTop:'10px'}}>
                                                QUY TRÌNH ĐỔI HÀNG                                            
                                            </span>
                                            <div className="cs-item-content">
                                                <p style={{fontSize:'1.5rem',lineHeight:'1.5'}}>
                                                    1. STRESSMAMA sẽ cho shipper đến địa chỉ quý khách lấy hàng, sau khi kiểm tra và sản phẩm đáp ứng đầy đủ tiêu chuẩn đổi hàng STRESSMAMA sẽ lên đơn gửi cho quý khách sản phẩm mới.<br></br>
                                                    2. Thời gian đổi hàng cho quy trình cơ bản sẽ dao động từ 3-4 ngày (nội thành) và từ 3-6 ngày (ngoại thành).<br></br>
                                                    3. Đối với các trường hợp khách cần gấp, STRESSMAMA có thể hỗ trợ đổi 2 chiều với thời gian nhanh hơn nhưng quý khách vui lòng cọc 100% đơn hàng. Sau khi nhận được sản phẩm hoàn về và kiểm tra, STRESSMAMA sẽ hoàn tiền cọc lại cho quý khách. STRESSMAMA sẽ hoàn tiền vào THỨ 3 và THỨ 7 hàng tuần.<br></br>
                                                </p>                                    
                                            </div>
                                        </li>
                                        <li className="cs-item">
                                            <span className="cs-item-title"  style={{textTransform:'uppercase',fontWeight:'600',fontSize:'1.5rem',paddingTop:'10px'}}>
                                                CHÍNH SÁCH ĐỔI TRẢ  
                                            </span>
                                            <div className="cs-item-content">
                                                <p style={{fontSize:'1.5rem',lineHeight:'1.5'}}>
                                                    1. Quý khách vui lòng kiểm tra kỹ sản phẩm cũng như size sản phẩm sau khi nhận được đơn hàng. STRESSMAMA sẽ chấp nhận các phản hồi và hỗ trợ đổi hàng trong vòng 5 ngày (tính từ ngày khách nhận được hàng).<br></br>
                                                    2. Quý khách vui lòng quay clip unbox (Clip liền mạch không bị ngắt đoạn, cắt ghép hoặc bị che đi) để STRESSMAMA có thể xử lý đơn và đổi hàng nhanh hơn. Lưu ý: STRESSMAMA chỉ nhận đổi size.<br></br>
                                                    3. Đối với các sản phẩm đổi, quý khách vui lòng giữ nguyên trạng thái mới, đầy đủ tag, sản phẩm phải chưa qua giặt ủi, không có mùi lạ.<br></br>
                                                    4. Đối với các trường hợp sản phẩm hết size để hỗ trợ đổi, STRESSMAMA có thể đổi sang sản phẩm khác (giá trị bằng hoặc cao hơn). Lưu ý: STRESSMAMA không hỗ trợ hoàn tiền.<br></br>
                                                    5. Những lỗi xuất phát từ nhà sản xuất, STRESSMAMA sẽ chịu trách nhiệm 100% và hỗ trợ hoàn tiền nếu không tìm được phương án giải quyết khác.<br></br>
                                                    6. STRESSMAMA chỉ nhận đổi hàng, không nhận trả hàng trong bất kỳ tình huống nào.<br></br>
                                                    7. STRESSMAMA sẽ chịu hoàn toàn phí ship đổi hàng cho quý khách.<br></br>
                                                </p>                                    
                                            </div>
                                        </li>
                                                                    
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                
            </div>
        </div>
    )
}

export default ClientService
