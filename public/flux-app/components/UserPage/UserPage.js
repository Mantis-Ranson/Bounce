import React from 'react';

import UserPageActions from '../../actions/UserPageActions.js';
import UserPageStore   from '../../stores/UserPageStore.js';
import UserPageData    from './UserPageData.js';
import Posts           from '../PostApp/Posts.js';

function getUserInfo(){
	return{
		userinfo:UserPageStore.getUserPageState()
	}
} 

export default class UserPage extends React.Component{
	constructor(){
		super()
		this.componentDidMount = this.componentDidMount.bind(this)
		this.setUserPageState  = this.setUserPageState.bind(this)
		this.state = getUserInfo()
	}
	componentDidMount(){
		UserPageStore.addChangeListener(this.setUserPageState)
		this.getUserInfo()
	}
	getUserInfo(){
		const username = this.props.params.user;
		const limit    = this.state.userinfo.limit;
		UserPageActions.requestUserPage({username:username,limit:limit})
	}
	 
	componentWillUnmount(){
		UserPageStore.removeChangeListener(this.setUserPageState)
		UserPageStore.resetLimit()
	}
	
	setUserPageState(){
		this.setState(getUserInfo())
	}

	backToTop(){
		window.scrollTo(0,0);
		UserPageStore.resetLimit()
	}

	showMore(){
	UserPageStore.showMorePosts();
   	this.getUserInfo()
    }

    render(){
    	const user = this.props.LoginState.loggedIn.username;
    	if(this.state.userinfo.userinfo){
    		return(
			<div id="UserPageDiv">
			<UserPageData userData={this.state.userinfo.userinfo}/>
			<Posts Posts={this.state.userinfo.posts} user={user}/>
			
			{this.state.userinfo.posts.length > 9 ? 
			<div className="btn-group btn-group-justified" role="group" aria-label="...">
			    <div className="btn-group" role="group">
			        <button className="btn btn-default" onClick={this.showMore.bind(this)}>Show more posts</button>
			    </div>
			    <div className="btn-group" role="group">
			        <button className="btn btn-default" onClick={this.backToTop}>Back to top</button>
			    </div>
			</div>
			    :null}
			</div>
			);	
		} else {
			return (
				<div>loading</div>
				);
		}
    }
}