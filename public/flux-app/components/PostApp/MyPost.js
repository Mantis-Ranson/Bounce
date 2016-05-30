import React from 'react'
import  {Link} from "react-router"
import {hashHistory} from 'react-router';

import Editor from './Editor'
import PostAppActions from '../../actions/PostAppActions.js'
import MyPageAppActions from '../../actions/MyPageAppActions.js'
import SinglePostActions from '../../actions/SinglePostActions.js'

export default class MyPost extends React.Component{
    constructor(props){
        super(props)
        this.displayEditor = this.displayEditor.bind(this)
        this.state = {
            showEditor:false
        }
    }
    displayEditor() {
        this.setState({ showEditor: !this.state.showEditor });
    }
    deletePost(e){
        e.preventDefault()
        //if MyPage delete post args is MyPage 
        const post = {ImgDir:this.props.post.ImgDir,_id:this.props.post._id};
        PostAppActions.deletePost(post);
        //SinglePostAction? Can't find this post
        if(window.location.href.indexOf("SinglePost") > -1){
            SinglePostActions.clearSinglePost();
            hashHistory.push('PostApp');
        }
        if(window.location.href.indexOf("MyPage") > -1){
            MyPageAppActions.getUserPosts({postId:this.props.post._id,username:this.props.post.user})
        }
        
    }
    render(){
        const comment = this.props.post.comment;
        let link = "MyPage/";
        return(        
            <div className="myPost">

            {this.state.showEditor ? null :<h3 className="CommentBox"> <Link to={link} className="userLink">{this.props.user}</Link> - {comment} </h3>}

            {this.state.showEditor ? <Editor post={this.props.post} displayEditor={this.displayEditor.bind(this)} /> : null }
            
            {this.state.showEditor ? <button type="button" className="btn btn-info" onClick={this.displayEditor.bind(this)}>Cancel</button> : <button  type="button" className="btn btn-info" onClick={this.displayEditor.bind(this)}>Edit</button>}

            <button type="button" className="btn btn-danger" onClick={this.deletePost.bind(this)}>Delete</button>
            </div>
            );
    }
}