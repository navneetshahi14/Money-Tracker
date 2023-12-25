const user = document.getElementById('User')
const mail = document.getElementById('Mail')
const Pass = document.getElementById('Pass')
const Con = document.getElementById("Con")
const btn = document.getElementById('btn')
const icon = document.getElementById('icon')
const eye = document.getElementById('eye')
const show = document.getElementById('show')
const hide = document.getElementById('hide')

btn.addEventListener('click',async function(e){

    e.preventDefault();

    let username = user.value
    let Email = mail.value
    let Password = Pass.value
    let confirm = Con.value

    let resp = await axios.post('/signup',{username,Email,Password,confirm})
    console.log('resp',resp)
})

eye.addEventListener('click',()=>{
    let x = Pass;
    if(x.type === "password" ){
        x.type ='text';
        show.classList.add('hidden')
        hide.classList.remove('hidden')
    }else{
        x.type = 'password';
        hide.classList.add('hidden')
        show.classList.remove('hidden')
    }
})