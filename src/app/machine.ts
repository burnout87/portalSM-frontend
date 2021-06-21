import { Image } from '@ks89/angular-modal-gallery';
import { Owner } from './owner';

export enum ActivationType {
  pedal = "pedale",
  handle = "manovella",
  engine = "motore"
}

export enum BaseType {
  portable = "portatile",
  table = "tavolo",
  cabinet = "armadietto"
}

export class Machine {

    public _id?: number;
    public name?: string;
    public brand?: string;
    // public model?: string;
    public serialNumber?: string;
    // anno di fabbricazione
    public year?: number;
    // accertato o presunto (digitale  A/P)
    public color?: string;
    // variante
    public variation?: string;
    // note
    public description?: string;
    public activationType?: ActivationType;
    public baseType?: BaseType; 
    public images?: Image[];

    public recordingTime?: Date;
    public lastUpdateTime?: Date;
    public cancellingTime?: Date; 
    public cancellingNote?: string;

    public ownerData: Owner;

    constructor(data: any) {
      for ( const key of Object.keys(data) ) {
        if(key == 'recordingTime' || 
        key == 'lastUpdateTime' || 
        key == 'cancellingTime')
          this[key] = new Date(parseInt(data[key]));
        else
        {
          this[key] = data[key];
        }
      }
    }
    
  }