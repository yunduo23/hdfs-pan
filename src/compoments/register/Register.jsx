import React, {useState} from "react";
import './register.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const onChange1 = (e) =>{
        setUsername(e.target.value)
    }

    const onChange2 = (e) =>{
        setPassword(e.target.value)
    }

    const onSubmit = (e) =>{
        console.log(username + "  " + password)
        axios.post('/api/user/register', {
            username: username,
            password: password
        })
            .then((response) => {
                //TODO 写好路由之后可以做跳转
                console.log(response)
                navigate('/login')
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    return (
        <div className="login-div">
            <div className="login">
                <h2>用户注册</h2>
                <div className="login_box">
                    <input name="username" onChange={ onChange1 } value={ username } type="text" required />
                    <label>用户名</label>
                </div>
                <div className="login_box">
                    <input name="password" onChange={ onChange2 } value={ password } type="password" required />
                    <label>密码</label>
                </div>

                <div>
                    <button onClick={ onSubmit }>
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

export default Register