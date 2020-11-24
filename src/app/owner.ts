export class Owner {
    public name?: string;
    public surname?: string;
    public address?: string;
    public postCode?: string;
    public city?: string;
    public country?: string;
    public phone?: string;
    public mail?: string;
    public notes?: string;

    constructor(data: any) {
        for ( const key of Object.keys(data) ) {
            this[key] = data[key];
        }
    }
}
