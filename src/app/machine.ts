export class Machine {

    public id?: number;
    public name?: string;
    public type?: string;
    public year?: number;

    constructor(id?: number, name?: string, type?: string, year?: number)
       {  
         this.id = id;
         this.name = name;
         this.type = type;
         this.year = year;
       }
    
    }