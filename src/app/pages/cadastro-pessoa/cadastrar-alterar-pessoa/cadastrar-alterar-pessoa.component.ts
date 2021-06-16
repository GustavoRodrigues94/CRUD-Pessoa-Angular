import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPessoa } from '../../../interfaces/IPessoa';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-cadastrar-alterar-pessoa',
  templateUrl: './cadastrar-alterar-pessoa.component.html',
  styleUrls: ['./cadastrar-alterar-pessoa.component.scss']
})
export class CadastrarAlterarPessoaComponent implements OnInit {
  public mostrarCarregamento : boolean;
  public formPessoa: FormGroup;
  public alterandoPessoa: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.params.subscribe(params => {
        var idPessoa = params['id'];
        if(idPessoa !== undefined)
          this.obterPessoa(idPessoa);
     });
    };

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(){
    this.formPessoa = this.formBuilder.group({
      id: [{value: '', disabled:true}],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numeroDocumento: ['', [Validators.required, Validators.minLength(11)]]
    });
  }

  cadastrarAlterar(){
    if(this.formPessoa.invalid) return;

    var pessoa = this.formPessoa.getRawValue() as IPessoa;

    if(pessoa.id == '')
      this.criarPessoa(pessoa);
    else
      this.alterarPessoa(pessoa);
  }

  private alterarPessoa(pessoa: IPessoa) {
    this.pessoaService.alterar(pessoa).subscribe(resposta => {
      if (!resposta.sucesso){
        this.abrirMensagem("Erro!", resposta.dado[0].message);
        return;
      }

      this.abrirMensagem("Sucesso!", "Pessoa alterada com sucesso");
      this.router.navigate(['']);
    });
  }

  private criarPessoa(pessoa: IPessoa) {
    this.pessoaService.criar(pessoa).subscribe(resposta => {
      if (!resposta.sucesso){
        this.abrirMensagem("Ocorreu um erro!", resposta.dado[0].message);
        return;
      }

      this.abrirMensagem("Sucesso!", "Pessoa criada com sucesso");
      this.router.navigate(['']);
    });
  }

  obterPessoa(idPessoa: string){
    this.mostrarCarregamento = true;

    this.pessoaService.obterPessoa(idPessoa).subscribe(resposta => {
      var pessoa = resposta as IPessoa;
      this.formPessoa.patchValue({
        id: pessoa.id,
        nome: pessoa.nome,
        email: pessoa.email,
        numeroDocumento: pessoa.numeroDocumento,
      });

      this.alterandoPessoa = true;
      this.mostrarCarregamento = false;
    });
  }

  abrirMensagem(titulo: string, mensagem: string) {
    this.snackBar.open(titulo, mensagem, {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });

  }
}
