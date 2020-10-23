export enum MachineType {
  first = "first",
  second = "second",
  third = "third",
  fourth = "fourth"
}

export class Machine {

    public id?: number;
    public name?: string;
    public type?: MachineType;
    public year?: number;

    constructor(id?: number, name?: string, type?: string, year?: number)
       {  
         this.id = id;
         this.name = name;
         this.type = MachineType[type];
         this.year = year;
       }
    
    }