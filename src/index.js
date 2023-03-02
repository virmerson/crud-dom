import UserController from './components/userController'
import "./style.css"

//Static events setup
document.addEventListener("DOMContentLoaded", (e)=>{

    //button event
    document.forms.users.addEventListener("submit", (e)=>{
        e.preventDefault()
    })

    //btn save click
    document.getElementById('btn-save').addEventListener('click',  UserController.save)
    document.getElementById('btn-forward').addEventListener('click',  UserController.goForward)
    document.getElementById('btn-backward').addEventListener('click',  UserController.goBackward)
    document.getElementById('btn-first').addEventListener('click',  UserController.goToTheFirstPage)
    document.getElementById('btn-last').addEventListener('click',  UserController.goToTheLastPage)
    document.getElementById('btn-clear').addEventListener('click',  UserController.resetForm)
   //Delete and Edit buttons 
    document.getElementById('output').addEventListener('click', (e)=>{

            const component =  e.target.id;
            if(component) 
            {
                const c = component.split("-")
                const action = c[0]
                const id = parseInt(c[1])

                if (action=="delete"){
                    UserController.delete(id)
                }else if (action=="edit"){
                    UserController.edit(id)
                }
                
            }
        
    })  
})