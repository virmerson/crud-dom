//Business Logic
class Service {

    constructor(){
        this.page=3
        this.start=0;
        this.id=0
        this.users=[]
    }

    save(user){
        if (!user.id){
            this.add(user)
        }else {
            const found= this.find(user.id)
            
            let editUser = { 
                id: user.id,
                avatarUrl:  user.avatarUrl!=found.avatarUrl ? user.avatarUrl :  found.avatarUrl,
                name:       user.name!=found.name ? user.name : found.name ,
                email:      user.email!=found.email ? user.name :  found.email 
            }
            
            this.update(editUser)
        }
    }

    update(user){
        const index = this.users.findIndex( (u) => u.id===user.id )     
        this.users[index]= user
    }


    add (user){
        user.id= ++this.id
        this.users.push(user)
        return user
    }

    find (id){
       return this.users.find( (u)=> u.id===id)
    }

    getUsersPage(){
        let start = this.start
        let end =  this.start+this.page
      
        //validating end of array

        if (end>=  this.users.length)
            end = this.users.length

        //getting data
        return this.users.slice(start, end)
    }

    goForward(){
       
        if (this.start< this.users.length-1)
            this.start= this.start + this.page
        return this.getUsersPage()
    }

    goBackward(){
        if( this.start>=this.page)
            this.start = this.start - this.page
            return this.getUsersPage() 
    }

    goToTheFirstPage(){
        this.reset()
        return this.getUsersPage()
    }

    goToTheLastPage(){
        let numberOfPages = this.users.length / this.page
        this.start = parseInt(numberOfPages) * this.page
        return this.getUsersPage()
    }

    reset(){
        this.start=0;
    }

    remove(id){
        this.users =  this.users.filter ( (u)=> u.id!==id  )
        return this.users
    }
}

//Dependency
const userService =  new Service()

//DOM Render Helper
class UserDOM{

    static getFormData(){
        const user={}
        const id = document.getElementById("id").innerText;
        user.id =  id!=""?parseInt(id) :""
        user.avatarUrl =  document.getElementById("avatarUrl").value
        user.name =  document.getElementById("name").value
        user.email =  document.getElementById("email").value
        return user
    }

    static resetForm(){
        document.getElementById("id").innerText=""
        document.getElementById("avatarUrl").value =""
        document.getElementById("name").value =""
        document.getElementById("email").value =""
    }

    static formRender(user){
        document.getElementById("id").innerText=user.id
        document.getElementById("avatarUrl").value =user.avatarUrl
        document.getElementById("name").value =user.name
        document.getElementById("email").value=user.email
    }

    static getUserHTML (user){
        const userHTML = 
        `<div class="item"><img src="${user.avatarUrl}" width="100"></div>
        <div class="item">${user.id} </div>
        <div class="item">${user.name} </div>
        <div class="item">${user.email}</div>
        <div class="item">
                <button onclick="UserController.delete(${user.id})">Delete</button>
                <button onclick="UserController.edit(${user.id})">Edit</button>
        </div>`
        return userHTML
    }

    static addUserHTML(userHTML){
          //creating DOM element for the object
          const divOutput =   document.getElementById("output")
          divOutput.innerHTML +=  userHTML
    }

    static refresh(userList){
      
        const divOutput =   document.getElementById("output")
        divOutput.innerHTML =""
        
        userList.forEach(user => {
            UserDOM.addUserHTML (  UserDOM.getUserHTML( user) ) 
        });
        
    }
}

//Event listeners
class UserController {

    static save (e){
         
        //Reading data from DOM
        const user =UserDOM.getFormData ()
     
        //Adding item in array
        userService.save(user)
     
        //rendering on DOM
        const list =  userService.getUsersPage()
        UserDOM.refresh(list)
       // UserDOM.resetForm()
            
     }
 
     static delete (id){
        userService.remove(id)
        const list = userService.goToTheFirstPage()
        UserDOM.refresh(list)
     }

     static edit (id){
        const user = userService.find (id)
        UserDOM.formRender(user)
     }

     static goForward(){
        const list =  userService.goForward()
         UserDOM.refresh(list)
     }
 
     static goBackward(){
        const list =  userService.goBackward()
         UserDOM.refresh(list)
     }

     static goToTheFirstPage(){
        const list =  userService.goToTheFirstPage()
        UserDOM.refresh(list)
    }

    static goToTheLastPage(){
        const list =  userService.goToTheLastPage()
        UserDOM.refresh(list)
    }

    static resetForm(){
        UserDOM.resetForm()
    }
 
}

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

})