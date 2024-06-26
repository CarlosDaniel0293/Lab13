import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getGameById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createGame(game: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, game);
  }

  updateGame(id: string, game: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
