'use strict';

let userlist={}
function addnew(login, password, age){
 
  this[login]={}
  this[login].login=login
  this[login].password=password
  this[login].age=age
  usertable(this[login])
  return(this[login])
}

  let loginexplain = document.getElementById('loginexplain')
let passwordexplain =  document.getElementById('passwordexplain')
  let ageexplain =document.getElementById('ageexplain')


let color_correct=`background: rgb(73,255,33);
background: linear-gradient(98deg, rgba(73,255,33,0.9691516709511568) 4%, rgba(94,226,76,0.9717223650385605) 26%, rgba(156,237,111,1) 50%, rgba(133,252,202,1) 82%, rgba(63,246,214,0.9691516709511568) 100%);`
let color_invalid=`background: rgb(254,101,101);
background: linear-gradient(233deg, rgba(254,101,101,0.9691516709511568) 0%, rgba(252,105,84,0.9717223650385605) 54%, rgba(241,116,116,0.9691516709511568) 100%);`

let color_normal_psw=`background: rgb(197,254,101);
background: linear-gradient(233deg, rgba(197,254,101,0.9691516709511568) 13%, rgba(252,229,84,0.9717223650385605) 34%, rgba(226,234,97,1) 62%, rgba(185,241,116,0.9691516709511568) 100%);`

addnew.apply(userlist, ['kirill', 'qWeRtY_123', '20'])


let element_list = ['login', 'password', 'age']

function read_register_data(element_list){
    let value_list=[]
  for(let i of element_list){
     value_list.push(document.getElementById(i).value)     
  }
  return value_list
}


let submit=document.getElementById('submit')

submit.addEventListener('click',
  function(){
    let data= read_register_data(element_list)


    let login_ok = check_login(data[0])=='good'
    let password_ok = (check_password(data[1])=='super' || check_password(data[1])=='ok')
    let check_age_ok = check_age(data[2])
    let lst = [[login_ok, 'login'], [password_ok, 'password'], [check_age_ok, 'age']]

    let result = lst.every(e => e[0]==true)

    if(result)
      {
         addnew.apply(userlist,data);
         console.log("пользователь успешно добавлен")
         console.log(userlist)
         clear_input()
         return
       }
    else {
      //console.log('ошибка')
      let alertlist = []
      for(let i of lst){
        if(i[0]==false){
        alertlist.push(i[1])
      }

      }
      alert(`wrong fields: ${alertlist}`)
    }

  })







function check_password(str){

  let regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    if (str.length < 6) {
        return("too_short");
    } else if (str.length > 50) {
        return("too_long");
    } else if (str.search(/\d/) == -1) {
        return("no_num");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        return("no_letter");
    }  else if (str.search(/[A-Z]/) == -1) {
        return("no_uppercase");
    }  else if (str.search(/[a-z]/) == -1) {
        return("no_lowercase");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        return("bad_char");
    }
    else if (str.search(/[\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {

        return("super");
    }
    return("ok");
}




function check_password_input(){
  let data=read_register_data(['password'])[0]
  let password=document.getElementById('password')
  

    if(check_password(data)=='super'){
    password.style.cssText=(color_correct)
    passwordexplain.innerHTML='super strong password'
    //submit.disabled=false
    return
  }
    if(check_password(data)=='ok'){
    //console.log('free')
    password.style.cssText=(color_normal_psw)
    passwordexplain.innerHTML=`normal password, <br> but please add special characters
    like !@#$%^&*()_+ `
    //submit.disabled=false
    return
  }
  else{
    //console.log('already taken')
    password.style.cssText=(color_invalid)
    passwordexplain.innerHTML=check_password(data)
    //submit.disabled=true
  }
}

document.getElementById('password').addEventListener('input', check_password_input)



function check_age(age){

  age=parseInt(age,10 )
  if(age>=18 && age<=100){
    ageexplain.innerHTML=''
    return true
  }
  else if(age>100){
    ageexplain.innerHTML='Invalid age'
    return false
  } 
  else{
    ageexplain.innerHTML='You must be 18 or older'
    return false
  }
}


document.getElementById('age').addEventListener('input', function(){
  let data=read_register_data(['age'])[0]
    if(check_age(data)){

    document.getElementById('age').style.cssText=(color_correct)
    //submit.disabled=false
  }
  else{
    document.getElementById('age').style.cssText=(color_invalid)
    //submit.disabled=true

  }
})




document.getElementById('login').addEventListener('input', check_login_input)
//document.getElementById('submit').addEventListener('click', check_login_input)


function check_login(login){
  let regex= /^w*[a-zA-Z]\w{5,}$/
  //console.log(login.match(regex))
  if(login.match(regex)== null){

    return 'invalid format'
  }
  else if(userlist[login]!= undefined){
    return 'user already registred'
  }
  else{
    return 'good'
  }
}


function check_login_input(){
  let data=read_register_data(['login'])[0]

    if(check_login(data)=='invalid format'){
    //submit.disabled=true
    document.getElementById('login').style.cssText=
    (color_invalid)
    loginexplain.innerHTML='invalid login format'
    return
  }
  if(check_login(data)=='user already registred'){
    //submit.disabled=true
    document.getElementById('login').style.cssText=
    (color_invalid)
    loginexplain.innerHTML='username already taken'
    return
  }
      else{
    document.getElementById('login').style.cssText=
    (color_correct)
    //submit.disabled=false
    loginexplain.innerHTML=`nice username, <b>${data}</b> !`
  }
}

document.getElementById('showpsw').addEventListener('click', show_hide_password)
function show_hide_password() {
  let password = document.getElementById("password");
  let showpsw =  document.getElementById("showpsw");
  if (password.type == "password") {
    password.type = "text";
    showpsw.src='media/password_hide.svg'

  } else {
    password.type = "password";
    showpsw.src='media/password.svg'
  }
}


function usertable(info){
  let user_table = document.getElementById('user_table')
 
  
  let text = JSON.stringify(info)
  text =(text.replaceAll(',', ', ')+'<br>')
  user_table.innerHTML+=text
}


function clear_input(){
  let password = document.getElementById('password')
  password.value=''
  password.style.cssText=''

  let login = document.getElementById('login')
  login.value=''
  login.style.cssText=''

  let age = document.getElementById('age')
  age.value=''
  age.style.cssText=''

  passwordexplain.innerHTML=''
  ageexplain.innerHTML=''
  loginexplain.innerHTML=''

}