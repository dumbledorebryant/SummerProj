import { Upload, Icon, message } from 'antd';
import React from 'react';


class WorkerPage extends React.Component {
    constructor(){
        super();
        this.state={
            loading:false,
            imageUrl:'',
        };
        this.beforeUpload=this.beforeUpload.bind(this);
    }


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
        fetch('http://localhost:8080/Worker/UpdatePic?WindowID=1',
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
                <div className="ant-upload-text">点击上传图片</div>
            </div>
        );

        return (
            <div align="center">
                <br/>
                <br/>
                <br/><br/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                >
                {this.state.imageUrl? <img src={this.state.imageUrl}
                                           height="600px" width="1000px" /> : uploadButton}
                </Upload>
        </div>

        );
    }
}

export default WorkerPage;
