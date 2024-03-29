import UserDOM from "./userDOM"
import userService from "./userService"

//Event listeners
export default class UserController {

    static async save (e){
         
        //Reading data from DOM
        const user =UserDOM.getFormData ()
        try {
            
            //Adding item in array
            await userService.save(user)
            //rendering on DOM
            const list =   userService.getUsersPage()
            UserDOM.refresh(list)
            UserDOM.clearError()

        } catch (error) {
            UserDOM.renderError(error)
        }
     
       
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

    static search (){
        const search =UserDOM.getSearchData()
        const list =  userService.findByFilter(search)

        UserDOM.refresh(list)
    }
 
    static sort(){
        const sortedBy =UserDOM.getSortedByData()
        const list =  userService.getUsersPage(sortedBy)
        UserDOM.refresh(list)
    }

    static calcAgeAverage(){    
        const ageAverage = userService.calcAgeAverage()
        UserDOM.refreshAgeAverage(ageAverage)
    }
}