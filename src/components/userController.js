import { User } from "realm-web"
import UserDOM from "./userDOM"
import userService from "./userService"

//Event listeners
export default class UserController {

    static save (e){
         
        //Reading data from DOM
        const user =UserDOM.getFormData ()
     
        //Adding item in array
        userService.save(user)
     
        //rendering on DOM
        const list =  userService.getUsersPage()
        UserDOM.refresh(list, UserController.delete,UserController.edit )
       // UserDOM.resetForm()
            
     }
 
     static delete (id){
        userService.remove(id)
        const list = userService.goToTheFirstPage()
        UserDOM.refresh(list, UserController.delete,UserController.edit  )
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
        UserDOM.refresh(list, UserController.delete,UserController.edit  )
       
     }

     static goToTheFirstPage(){
        const list =  userService.goToTheFirstPage()
        UserDOM.refresh(list, UserController.delete,UserController.edit )
       
    }

    static goToTheLastPage(){
        const list =  userService.goToTheLastPage()
        UserDOM.refresh(list, UserController.delete,UserController.edit  )
       
    }

    static resetForm(){
        UserDOM.resetForm()
    }
 
}