import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="teamInfo">
                    <div className="members">
                        <h4>Danh sách các thành viên</h4>
                        <p>1. Nguyễn Minh Ngọc</p>
                        <p>2. Phạm Văn Chiến</p>
                        <p>3. Lưu Thành Đạt</p>
                        <p>4. Đỗ Trường Giang</p>
                    </div>
                    <div className="units">
                        <h4>Đơn vị công tác</h4>
                        <p>1. Đại học Ngoại thương Hà Nội</p>
                        <p>2. Đại học Sài Gòn</p>
                    </div>
                    <div className="contactInfo">
                        <h4>Thông tin liên hệ</h4>
                        <p>1. ngocnm.fyu@gmail.com</p>
                        <p>2. chienpv15.fsc@gmail.com</p>
                        <p>3. datluu.1702@gmail.com</p>
                        <p>4. dotruonggiang290@gmail.com</p>
                    </div>
                </div>
                <div className="teamName">
                    <h4>TÊN NHÓM: FLAZER</h4>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
