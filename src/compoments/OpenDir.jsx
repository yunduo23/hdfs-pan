import React, {useContext, useEffect, useState} from "react";
import {Button, Modal} from "@douyinfe/semi-ui";
import axios from "axios";
import MyContext from "../context"

const sortBy = ['dir', 'file']

const OpenDir = () => {
    const context = useContext(MyContext)

    const [data,setData] = useState([])

    const getData = () => {
        axios.get('/api/hdfs/list',{
            params: {
                path: window.localStorage.getItem("path")
            },
            headers: {
                Authorization: window.localStorage.getItem("authorization")
            }
        })
            .then((response) => {
                console.log(response)
                let midData = response.data.data
                customSort({data: midData, sortBy, sortField: 'type'})
                let Data = [...midData]
                setData(Data)
                context[1][1](midData)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getData()
    },[])

    const customSort = ({data, sortBy, sortField}) => {
        const sortByObject = sortBy.reduce(
            (obj, item, index) => ({
                ...obj,
                [item]: index
            }),{}
        )
        return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
    }

    const open = () => {
        console.log(context)
        let midPath
        if(window.localStorage.getItem("path") === "/"){
            midPath = `${window.localStorage.getItem("path")}${context[0].name}`
        } else {
            midPath = `${window.localStorage.getItem("path")}/${context[0].name}`
        }
        window.localStorage.setItem("path", midPath)
        window.localStorage.setItem("name", context[0].name)
        console.log(window.localStorage.getItem("path"))
        console.log(window.localStorage.getItem("name"))
        getData()
    }

    return (
        <>
            <Button
                onClick={open}
                style={{marginLeft: 4}}
            >打开</Button>
        </>
    )
}

export default OpenDir