import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarAlterarPessoaComponent } from './pages/cadastro-pessoa/cadastrar-alterar-pessoa/cadastrar-alterar-pessoa.component';
import { ListaPessoasComponent } from './pages/cadastro-pessoa/lista-pessoas/lista-pessoas.component';

const routes: Routes = [
  { path: '', component: ListaPessoasComponent },
  { path: 'pessoa', component: CadastrarAlterarPessoaComponent},
  { path: 'pessoa/:id', component: CadastrarAlterarPessoaComponent},
  { path: 'pessoas', component: ListaPessoasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
