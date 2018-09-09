import { Upload, Icon, message } from 'antd';
import React from 'react';
import pic from '../img/none.jpg'


class Avatar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            imageUrl:'',
        };
        this.showPic=this.showPic.bind(this);
        this.showPic();
        this.beforeUpload=this.beforeUpload.bind(this);
    }

    showPic = () => {
        fetch('http://localhost:8080/User/GetPic?userID='+this.props.userid,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response=> {
                //let blob = response.blob();
                 response.json()
                    .then(result => {
                        //let str = byteToString(result[0]);
                        //var blob = new Blob([str], {type:'image/*'});
                        //let blob = new Blob(result[0]);
                        //let blob = c.blob();
                        //let blob = new Blob([c],{type:"image/*"});
                        //if(blob.size===0){
                          //  return;
                        //}
                        /*else{
                            var blobUrl = URL.createObjectURL(blob);
                            /*let reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = ()=> {
                                this.setState({
                                    imageUrl: reader.result
                                })
                            }*/
                            this.setState({
                                imageUrl: result[0]
                            })

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
        fetch('http://localhost:8080/User/UpdatePic?userId='+this.props.userid,
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
                {this.state.imageUrl
                    ? <img src={this.state.imageUrl}
                                           height="120px" width="140px" alt="aaa"/>
                    : <img src={pic} height="120px" width="140px"/>}
            </Upload>
        );
    }
}

export default Avatar;
