import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'info-usuario',
    templateUrl: 'info-usuario.component.html'
})
export class InfoUsuarioComponent {

    @Input() usuario: Usuario;
    @Input() ehMenu: boolean;

    constructor() {
       
    }

}
