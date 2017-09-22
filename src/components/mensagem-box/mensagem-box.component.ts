import { Component, Input } from '@angular/core';
import { Mensagem } from '../../models/mensagem.model';

@Component({
    selector: 'mensagem-box',
    templateUrl: 'mensagem-box.component.html',
    host: {
        '[style.justify-content]': '((!ehDoRemetente) ? "flex-start" : "flex-end")',
        '[style.text-align]': '((!ehDoRemetente) ? "left" : "right")'
    }
})
export class MensagemBoxComponent {

    @Input() mensagem: Mensagem;
    @Input() ehDoRemetente: boolean;

    constructor() {
      
    }

}
