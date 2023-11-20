import { useState, useEffect } from 'react';

import React from 'react'

const url = "http://localhost:5000/users";

const data = {
    name: "Daenerys Targaryen",
    username: "Madre de dragones",
    email: "dragon@targaryen.com",
    phone: "9893548125",
    companiesId: "1",
    title: "Jhon Nieve me pone"
  };



async function fetchPost(url){
  await fetch(url, {
  method: "POST", 
  body: JSON.stringify(data), //convierte JS en JSON
  headers: {
    "Content-Type": "application/json",
  },
})}



function FetchServerPost() {

    useEffect(function(){
        fetchPost(url)
        },[]);


  return (
    <div>FetchServerPost</div>
  )
}

export default FetchServerPost