export class Usuario {

    public $key: string;

    constructor(public nome: string,
                public usuario: string,
                public email: string,
                public foto: string
    ) {}
}