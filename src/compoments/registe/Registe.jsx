import React, { Component } from "react";
import './registe.css'

import axios from "axios";

export default class registe extends Component {


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
    // TODO: 跨域搞不定
    axios.post('http://129.226.91.218:8807/user/registe',this.state)
    .then(function(response){
      // 
      console.log(response)
    })
    console.log(this.state)
  }

  render() {
    return (
      <div className="login-div">
        <div className="login">
          <h2>用户注册</h2>
          <div className="login_box">
            <input name="username" onChange={ this.onChange } value={ this.state.username } type="text" required />
            <label>用户名</label>
          </div>
          <div className="login_box">
            <input name="password" onChange={ this.onChange } value={ this.state.password } type="password" required />
            <label>密码</label>
          </div>

          <a onClick={ this.onSubmit } href="javascript:void(0)">
            注册
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