import React, { Component } from "react";
import './login.css'

import axios from "axios";

export default class Login extends Component {


  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  onSubmit = (e) =>{
    axios.post('http://129.226.91.218:8807/user/login',this.state)
    .then(function(response){

      // 将认证信息存入local storage中，取出:window.localStorage.getItem("authorization")
      window.localStorage.setItem("authorization", response.data.data)
      
      //TODO 写好路由之后可以做跳转
    })
  }

  render() {
    return (
      <div className="login-div">
        <div className="login">
          <h2>用户登录</h2>
          <div className="login_box">
            <input name="username" onChange={ this.onChange } value={ this.state.username } type="text" required />
            <label>用户名</label>
          </div>
          <div className="login_box">
            <input name="password" onChange={ this.onChange } value={ this.state.password } type="password" required />
            <label>密码</label>
          </div>

          <a onClick={ this.onSubmit } href="javascript:void(0)">
            登录
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
    )
  }
}