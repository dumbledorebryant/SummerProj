import { Upload, Icon, message } from 'antd';
import React from 'react';


class UploadNewFoodPic extends React.Component {
    constructor(props){
        super(props);
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


        this.props.setFile(file);
    };


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">点击上传新品图片</div>
            </div>
        );
        return (
                <div align="center">
                    <br/>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                    >
                        {this.state.imageUrl? <img src={this.state.imageUrl}
                                                   height="100px" width="100px" /> : uploadButton}
                    </Upload>
                </div>

            );
    }
}

export default UploadNewFoodPic;
