//DOM Render Helper
export default class UserDOM{

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
        if(user){
            document.getElementById("id").innerText=user.id?user.id:""
            document.getElementById("avatarUrl").value =user.avatarUrl
            document.getElementById("name").value =user.name
            document.getElementById("email").value=user.email
        }
    }

    static getUserHTML (user, deleteFn, editFn){
  
        
        const userHTML = 
        `<div class="item"><img src="${user.avatarUrl}" width="100"></div>
        <div class="item">${user.id} </div>
        <div class="item">${user.name} </div>
        <div class="item">${user.email}</div>
        <div class="item">
                <button id="delete-${user.id}">Delete</button>
                <button id="edit-${user.id}">Edit</button>
        </div>`   
         return userHTML
    
    }

    static addUserHTML(userHTML){
          //creating DOM element for the object
          const divOutput =   document.getElementById("output")
          //divOutput.appendChild(userHTML)
          divOutput.innerHTML +=  userHTML
    }

    static refresh(userList, deleteFn, editFn){
      
        const divOutput =   document.getElementById("output")
        divOutput.innerHTML =""
        
        userList.forEach(user => {
            UserDOM.addUserHTML (  UserDOM.getUserHTML( user, deleteFn, editFn) ) 
        });
        
    }
}
