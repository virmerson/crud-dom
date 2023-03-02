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

export default new Service()