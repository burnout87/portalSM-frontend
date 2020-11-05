export enum MachineType {
  first = "first",
  second = "second",
  third = "third",
  fourth = "fourth"
}

export class Machine {

    public _id?: number;
    public name?: string;
    public type?: MachineType;
    public description?: string;
    public year?: number;
    public images?: Array<Object>;

    constructor(_id?: number, name?: string, type?: string, description?: string, year?: number, images?: Array<Object>)
       {  
         this._id = _id;
         this.name = name;
         this.type = MachineType[type];
         this.description = description;
         this.year = year;
         this.images = images;
       }
    
    }