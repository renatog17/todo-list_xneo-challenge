const btn_add = document.getElementById('btn-add')
const form = document.getElementById('form')

console.log(form)

btn_add.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('botão clicado')
    form.style.display = 'block'
})