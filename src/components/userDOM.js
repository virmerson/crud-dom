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
                <button>Delete</button>
                <button>Edit</button>
        </div>`


        // const e = document.createElement('div');
        // e.innerHTML = userHTML;
        // e.querySelectorAll('button')[0].addEventListener('click', UserController.delete(user.id));

        // return userHTML
        
      
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
