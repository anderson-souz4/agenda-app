import {Component, OnInit} from '@angular/core';
import {Contato} from './contato';
import {ContatoService} from '../contato.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.montarFomulario();
    this.listarContatos();
  }

  listarContatos() {
    this.service.list().subscribe(response => {
      this.contatos = response;
    });
  }

  montarFomulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  favoritar(contato: Contato) {
    this.service.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    });
  }

  submit() {
    const formsValues = this.formulario.value;
    const contato: Contato = new Contato(formsValues.nome, formsValues.email);
    this.service.save(contato).subscribe(response => {
      this.contatos.push(response);
      let lista: Contato[] =  [... this.contatos, response];
      this.contatos = lista;
    });

  }


}
