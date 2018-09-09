import { Upload, Icon, message } from 'antd';
import React from 'react';


class WorkerPage extends React.Component {
    constructor(){
        super();
        this.state={
            loading:false,
            imageUrl:'',
            windowId:null,
            login:false
        };
        this.beforeUpload=this.beforeUpload.bind(this);
    }

    componentWillMount(){
        fetch('http://localhost:8080/Worker/State',{
            credentials: 'include',
            method:'GET',
            mode:'cors',

        }).then(response=>{
            console.log('Request successful',response);
            return response.text().then(result=>{
                if (result!=="-1" ){
                    this.setState({windowId:result,login:true});
                }
            });
        });
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
        console.log("WindowID:"+this.state.windowId);

        let formData = new FormData();
        formData.append('files[]', file);
        fetch('http://localhost:8080/Worker/UpdatePic?WindowID='+this.state.windowId,
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
        if (this.state.login){
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
                                           height="100px" width="100px" /> : uploadButton}
                </Upload>
        </div>

        );}
        else{
            return(
                    <p>please login</p>
                )

        }
    }
}

export default WorkerPage;
