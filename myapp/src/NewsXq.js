import React, { Component } from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class NewsXq extends Component {
	constructor(){
  super()
  this.state={
    News:[]
  }
}

	  componentDidMount(){
	  	$.ajax({
    type:"post",
    url:"http://localhost:8002/News/Xq",
    async:true, 
    data:{
    id:window.location.href.split('?')[1]
    },   
    success:function(e){
    	console.log(e)
      this.setState({
         News:e[0]
      })

    }.bind(this)
  })
  }
  render() {
    return (
    	<div className="x-warp-xq">
    		<div className="xq-con">{this.state.News.content}</div>	   		  	
	    </div>

    );
  }
}

export default NewsXq;
