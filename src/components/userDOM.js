//DOM Render Helper
export default class UserDOM{


    static getSortedByData(){
        const sortedBy = document.getElementById("sortedBy").value;
        return sortedBy
    }


    static getSearchData(){
        const search = document.getElementById("search").value;
        return search
    }

    static getFormData(){
        const user={}
        const id = document.getElementById("id").innerText;
        user.id =  id!=""?parseInt(id) :""
        user.avatarUrl =  document.getElementById("avatarUrl").value
        user.name =  document.getElementById("name").value
        user.email =  document.getElementById("email").value
        user.birthDate =  document.getElementById("birthDate").value
        return user
    }

    static resetForm(){
        document.getElementById("id").innerText=""
        document.getElementById("avatarUrl").value =""
        document.getElementById("name").value =""
        document.getElementById("email").value =""
        document.getElementById("birthDate").value =""
    }

    static formRender(user){
        if(user){
            document.getElementById("id").innerText=user.id?user.id:""
            document.getElementById("avatarUrl").value =user.avatarUrl
            document.getElementById("name").value =user.name
            document.getElementById("email").value=user.email
            document.getElementById("birthDate").value=user.birthDate
        }
    }

    static getUserHTML (user){
  
        
        const userHTML = 
        `<div class="item"><img src="${user.avatarUrl}" width="100"></div>
        <div class="item">${user.id} </div>
        <div class="item">${user.name} </div>
        <div class="item">${user.email}</div>
        <div class="item">${user.birthDate}</div>
        <div class="item">${user.age}</div>
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

    static refresh(userList){
      
        const divOutput =   document.getElementById("output")
        divOutput.innerHTML =""
        
        userList.forEach(user => {
            UserDOM.addUserHTML (  UserDOM.getUserHTML( user) ) 
        });

        //throwing an output event 
        let event = new Event("updated", {bubbles: true});
        divOutput.dispatchEvent(event);
 
    }

    static refreshAgeAverage(ageAverage){
        const divAverage =   document.getElementById("ageAverage")
        divAverage.innerHTML = `Age Average ${ageAverage.toPrecision(4)};`
    }

    static renderError(error){
        const divError =   document.getElementById("error")
        divError.innerHTML=  error.message
    }

    static clearError(){
        const divError =   document.getElementById("error")
        divError.innerHTML=  ""
    }
}

