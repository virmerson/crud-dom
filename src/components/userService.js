import  MyUtil  from  './myUtil';
//Business Logic
class Service {

    constructor(){  
        this.page=3
        this.start=0;
        this.id=0
        this.users=[]
    }


    async getAvatar(user){
        
        let avatarId = user.name
        const response =  await fetch(`https://api.multiavatar.com/${JSON.stringify(avatarId)}`)
        const svg = await response.text()
        return svg

    }

    async save(user){

        //calculating age

        user.age = MyUtil.calcAge(user.birthDate)

        //validation existing e-maill
       const userFound =  this.findByFilter (user.email)
       if(userFound.length>0 && user.id !==userFound[0].id){
            throw Error(`E-mail ${user.email} already exists`)
       }    
       //generating an avatar 
        if ( user.avatarUrl=="")
             user.avatarUrl = await this.getAvatar(user)


        if (!user.id){
            this.add(user)
        }else {
         this.users= this.users.map( (found) => {
                    if (user.id===found.id){
                        return { 
                            id: user.id,
                            avatarUrl:  user.avatarUrl!=found.avatarUrl ? user.avatarUrl :  found.avatarUrl,
                            name:       user.name!=found.name ? user.name : found.name ,
                            email:      user.email!=found.email ? user.email :  found.email, 
                            birthDate:  user.birthDate!=found.birthDate ? user.birthDate :  found.birthDate, 
                            age: user.age!=found.age ? user.age :  found.age    
                        }
                    }
                    return found
                }

            )

        }
    }

    // update(user){
    //     const index = this.users.findIndex( (u) => u.id===user.id )     
    //     this.users[index]= user

       
    // }

    add (user){
        user.id= ++this.id
        this.users.push(user)
        return user
    }

    find (id){
       return this.users.find( (u)=> u.id===id)
    }

    findByFilter (text){
       return this.users.filter( (u)=> u.email.toLowerCase().search(text.toLowerCase())>=0  || u.name.toLowerCase().search(text.toLowerCase())>=0)  
    }

    getUsersPage(sortedBy){

       
        if (sortedBy)
            this.users.sort(MyUtil.compareValues( sortedBy  ,"asc") )

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

    calcAgeAverage(){
        const sum =  this.users.reduce (  (sum, u)=> sum + u.age  , 0)
        return sum / this.users.length
    }
}

export default new Service()