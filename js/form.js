let full_name = document.getElementById("full_name")
let gender = document.getElementById("gender")
let email = document.getElementById("email")
let password = document.getElementById("password")

const formRegister = document.getElementById("formRegister")

const User = JSON.parse(localStorage.getItem("user") || '[]')

if(formRegister){
    formRegister.addEventListener("submit",function(param){

    param.preventDefault()
    let user = {
        full_name : full_name.value,
        gender :  gender.value,
        email :  email.value,
        password:  password.value,
        role : role.value
    }

    User.push(user)
    

    localStorage.setItem("user",JSON.stringify(User))

    alert("User Register successfully")

    window.location.href = '../pages/login.html'
})
}



function login(e){

    e.preventDefault();

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const User = JSON.parse(localStorage.getItem('user') || '[]')

    const user = User.find((user ) => {
        return user.email == email && user.password == password
    })

    if(!user){
        alert('you dunt have permission')
        return;
    }
    if(user){
        localStorage.setItem('auth_login',JSON.stringify(user))
        alert('Login successfully')
        // window.location.href = '../admin/dashboard.html';
    }
//     checkRole(user)
   }

// function checkRole(role){ //staff , admine
    
//     if(role.role=== 'admin'){
//         window.location.href = '../';
//         return;
//     }
//     if(role.role === 'staff'){
//         window.location.href = '../staff/index.html';
//         return;
//     }
//     window.location.href = '../index.html';
//         return;
// }