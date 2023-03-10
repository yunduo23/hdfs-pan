import React ,{useState} from "react";
import './login.css'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onChange1 = (e) =>{
        setUsername(e.target.value)
    }

    const onChange2 = (e) =>{
        setPassword(e.target.value)
    }

    const onSubmit1 = (e) =>{
        console.log(username + "  " + password)
        axios.post('/api/user/login',{
            username: username,
            password: password
        })
            .then((response) => {
                console.log(response)
                // 将认证信息存入local storage中，取出:window.localStorage.getItem("authorization")
                window.localStorage.setItem("authorization", `Bearer ${response.data.data}`)
                window.localStorage.setItem("path", '/')
                window.localStorage.setItem("name", '')
                window.localStorage.setItem("username", username)
                window.localStorage.setItem("password", password)
                navigate("/")
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const onSubmit2 = () => {
        navigate("/register")
    }

    return (
        <div className="login-div">
            <div className="login">
                <h2>用户登录</h2>
                <div className="login_box">
                    <input name="username" onChange={ onChange1 } value={ username } type="text" required />
                    <label>用户名</label>
                </div>
                <div className="login_box">
                    <input name="password" onChange={ onChange2 } value={ password } type="password" required />
                    <label>密码</label>
                </div>

                <div>
                    <button onClick={ onSubmit1 } style={{marginRight: 20}}>
                        登录
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={ onSubmit2} style={{marginLeft: 20}}>
                        注册
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login