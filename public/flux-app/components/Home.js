import React from 'react';
import  {Link} from "react-router";

export default class Home extends React.Component{
    render(){
        return(
        <div id="Home">
        
        <Link to="PostApp">
        <img src="svg/people.svg"/>
        </Link>
        
        <Link to="ChatApp">
        <img src="svg/shapes.svg" />
        </Link>

        </div>
            );
    }
}