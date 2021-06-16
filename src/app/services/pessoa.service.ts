import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenericoResultado } from '../interfaces/IGenericoResultado';
import { IPessoa } from '../interfaces/IPessoa';

const apiUrlPessoa = environment.apiUrl + "Pessoa";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  constructor(private httpClient: HttpClient) { }

  obterPessoas() : Observable<IPessoa[]> {
    return this.httpClient.get<IPessoa[]>(apiUrlPessoa)
  }

  obterPessoa(idPessoa: string) {
    return this.httpClient.get<IPessoa>(apiUrlPessoa + '/' + idPessoa)
  }

  criar(pessoa: IPessoa) : Observable<IGenericoResultado> {
    return this.httpClient.post<IGenericoResultado>(apiUrlPessoa, pessoa);
  }

  alterar(pessoa: IPessoa) {
    return this.httpClient.put<IGenericoResultado>(apiUrlPessoa, pessoa);
  }

  deletar(id: string) : Observable<IGenericoResultado>{
    return this.httpClient.delete<IGenericoResultado>(apiUrlPessoa + '/' + id);
  }
}
