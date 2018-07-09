import { Upload, Icon, message } from 'antd';
import React from 'react';
import protrait from '../img/none.jpg'

class Avatar extends React.Component {
    constructor(){
        super();
        this.state={
            loading:false,
            imageUrl:'',
        };
        this.showPic=this.showPic.bind(this);
        this.showPic();
        this.beforeUpload=this.beforeUpload.bind(this);
    }

    showPic = () => {
        fetch('http://localhost:8080/User/GetPic?userID=1',
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response=> {
                console.log('Request successful', response);
                let blob = response.blob();
                console.log('blob:', blob);
                return blob
                    .then(blob => {
                        let reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = ()=> {
                            this.setState({
                                imageUrl:reader.result
                            })
                        };
                        console.log("image2:"+this.state.imageUrl);
                    });
            });
    };

    beforeUpload=(file)=> {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend =  () => {
            this.setState({
                imageUrl: reader.result,
            });
        };
        console.log("image1:"+this.state.imageUrl);

        let formData = new FormData();
        formData.append('files[]', file);
        fetch('http://localhost:8080/User/UpdatePic?userId=1',
            {
                method: 'POST',
                mode: 'cors',
                body:formData
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        alert(result);
                    });
            })
    };


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                accept="image/*"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
            >
                {this.state.imageUrl? <img src={this.state.imageUrl}
                                           height="120px" width="140px" alt="点击上传头像" /> : uploadButton}
            </Upload>

        );
    }
}

export default Avatar;
