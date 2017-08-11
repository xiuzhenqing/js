import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import NewsXq from './NewsXq';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
class BasicExample extends Component {
		constructor(){
  super()
  this.state={
  	News:[],
  	index:null

  }
}

componentDidMount(){

			

	$.ajax({
    type:"get",
    url:"http://localhost:8002/News/News",
    async:true,       
    success:function(e){
    	console.log(e)
      this.setState({
      	News:e         
      })
    }.bind(this)
  })

}
clearfn=function(event){
		var aa=event.target.parentElement.firstElementChild.innerHTML
		console.log(aa)
		$.ajax({
		        url:"http://localhost:8002/News/dele",
		        type:"post",
		        data:{id:aa},
		        success:function(e){
		        	 this.setState({
      	             News:e   
      })
		        }.bind(this)
	})
}.bind(this)
xiu=function(event){
		var aa=event.target.parentElement.firstElementChild.innerHTML
		console.log(aa)
		this.setState({
			index:aa
		})
		$('.none').css('display','block')

}.bind(this)
ti=function(event){
		var input1=document.getElementById('input1');
		var input2=document.getElementById('input2');
		$('.none').css('display','none')
		console.log(input1)
		if(input1.value.length==0||input2.value.length==0){
			alert('请输入内容')
			$('.none').css('display','block')
		}else{
			$.ajax({
		        url:"http://localhost:8002/News/upscases",
		        type:"post",
		        data:{id:this.state.index,title:input1.value,content:input2.value},
		        success:function(e){
		        	 this.setState({
      	             News:e   
      })
		        }.bind(this)
	})
		
		}

}.bind(this)
  render() {
    return (
    	<Router>
    	<div className="zuida">
    	<Route path="/NewsXq" component={NewsXq} />	 	 
	    <Route exact path="/" render={() => (  
    		<ul>
				{  this.state.News.map(function(val,k){
			                  return (
			                  	<li className="new-con" key={k}>
			                  	<span className="opa">{val.id}</span>
			                  		<Link to={`/NewsXq?${val.id}`}><p className="left">{val.title}</p></Link>
			                  		<button onClick={this.xiu}>修改</button>
			                  		<button  className='del' onClick={this.clearfn}>删除</button>
			                  	</li>
			                  	)
			                }.bind(this))
			            }	
			</ul>
			 )}/>
	    <div className='none'>
	     tit<input type='text' id='input1'/>
	     con<input type='text' id='input2' />
	     <button onClick={this.ti}>提交</button>
	     <button>取消</button>
	    </div>
    	</div>
	    </Router>
    );
  }
}

export default BasicExample;
