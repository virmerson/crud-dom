
//Business Logic
class Service {

    constructor(){
        this.page=3
        this.start=0;
        this.id=0

        this.users=[]
      
    }

    add (user){
        user.id= ++this.id
         this.users.push(user)
         return user
    }

    getFirstPage(){
        this.reset()
        return this.getUsersPage()
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

//DOM Helper
class UserDOM{


    static getFormData(){
        let user={}
        user.avatarUrl =  document.getElementById("avatarUrl").value
        user.name =  document.getElementById("name").value
        user.email =  document.getElementById("email").value
        return user
    }

   static getUserHTML (user  ){
        let userHTML = 
        `<div class="item"><img src="${user.avatarUrl}" width="100"></div>
        <div class="item">${user.name} (${user.id})</div>
        <div class="item">${user.email}</div>
        <div class="item">
                <button onclick="UserController.delete(${user.id})">Delete</button>
                <button>Edit</button>
        </div>`
        return userHTML
    }

    static addUserHTML(userHTML){
          //creating DOM element for the object
          let divOutput =   document.getElementById("output")
          divOutput.innerHTML +=  userHTML
    }

    static refresh(userList){
        if (userList.length==0) return 
        let divOutput =   document.getElementById("output")
        divOutput.innerHTML =""
        
        userList.forEach(user => {
          
            UserDOM.addUserHTML (  UserDOM.getUserHTML( user) ) 
        });
        
    }
    
}



class UserController {

    static add (e){
         
             //Reading data from DOM
             let user =UserDOM.getFormData ()
     
             //Adding item in array
             userService.add(user)
     
             // //preparing output printing on DOM
             // let userHTML =  UserDOM.getUserHTML( newUser )
             // UserDOM.addUserHTML(userHTML)
            let list =  userService.getUsersPage()
            UserDOM.refresh(list)
            
     }
 
     static delete (id){
             
              let usersList =  userService.remove(id)
             
             UserDOM.refresh(usersList)
 
     }
 
     static goForward(){
         let list =  userService.goForward()
         UserDOM.refresh(list)
     }
 
     static goBackward(){
         let list =  userService.goBackward()
         UserDOM.refresh(list)
     }
 
 }

 


//Events
document.addEventListener("DOMContentLoaded", (e)=>{

    //button event
    document.forms.users.addEventListener("submit", (e)=>{
        e.preventDefault()
    })

    //btn save click
    document.getElementById('btn-save').addEventListener('click',  UserController.add)
    document.getElementById('btn-forward').addEventListener('click',  UserController.goForward)
    document.getElementById('btn-backward').addEventListener('click',  UserController.goBackward)

})


