import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IPessoa } from 'src/app/interfaces/IPessoa';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.scss']
})
export class ListaPessoasComponent implements OnInit {

  public mostrarCarregamento: boolean;
  public colunasTabela: string [] = ['Nome', 'Email', 'CPF/CNPJ', 'TipoPessoa', 'Ações'];
  public dataSource = new MatTableDataSource<IPessoa>();

  @ViewChild(MatPaginator) paginacao: MatPaginator;

  constructor(private pessoaService: PessoaService,
              private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.obterPessoas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacao;
  }

  obterPessoas() {
    this.mostrarCarregamento = true;

    this.pessoaService.obterPessoas().subscribe((pessoas: IPessoa[]) => {
      this.dataSource.data = pessoas as IPessoa[];
      this.mostrarCarregamento = false;
    })
  };

  deletarPessoa(pessoa: IPessoa){
    this.mostrarCarregamento = true;

    this.pessoaService.deletar(pessoa.id).subscribe(resposta => {
      this.mostrarCarregamento = false;

      if(resposta.sucesso){
        this.abrirMensagem("Sucesso!", "Pessoa deletada com sucesso");
        this.atualizarDataSource(pessoa);
      }
    });
  };

  atualizarDataSource(pessoaParaRemover: IPessoa){
    const index = this.dataSource.data.indexOf(pessoaParaRemover);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  abrirMensagem(titulo: string, mensagem: string) {
    this.snackBar.open(titulo, mensagem, {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  };

}
