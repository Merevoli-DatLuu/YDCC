import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="teamInfo">
                    <div className="members">
                        <h2>Danh sách các thành viên</h2>
                        <h4>1. Nguyễn Minh Ngọc</h4>
                        <h4>2. Phạm Văn Chiến</h4>
                        <h4>3. Lưu Thành Đạt</h4>
                        <h4>4. Đỗ Trường Giang</h4>
                    </div>
                    <div className="units">
                        <h2>Đơn vị công tác</h2>
                        <h4>1. Đại học Ngoại thương Hà Nội</h4>
                        <h4>2. Đại học Sài Gòn</h4>
                    </div>
                    <div className="contactInfo">
                        <h2>Thông tin liên hệ</h2>
                        <h4>1. ngocnm.fyu@gmail.com</h4>
                        <h4>2. chienpv15.fsc@gmail.com</h4>
                        <h4>3. datluu.1702@gmail.com</h4>
                        <h4>4. dotruonggiang290@gmail.com</h4>
                    </div>
                </div>
                <div className="teamName">
                    <h2>TÊN NHÓM: FLAZER</h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
