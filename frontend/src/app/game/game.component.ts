import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  games: any[] = [];
  currentGame: any = {};
  searchQuery: string = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames()
      .subscribe((games: any[]) => {
        this.games = games;
      });
  }

  getGameById(id: string): void {
    this.gameService.getGameById(id)
      .subscribe((game: any) => {
        this.currentGame = game;
      });
  }

  createGame(form: NgForm): void {
    if (form.valid) {
      this.gameService.createGame(this.currentGame)
        .subscribe(() => {
          this.getGames();
          this.currentGame = {};
          form.resetForm();
        });
    }
  }

  updateGame(id: string, form: NgForm): void {
    if (form.valid) {
      this.gameService.updateGame(id, this.currentGame)
        .subscribe(() => {
          this.getGames();
          this.currentGame = {};
          form.resetForm();
        });
    }
  }

  deleteGame(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este videojuego?')) {
      this.gameService.deleteGame(id)
        .subscribe(() => {
          this.getGames();
        });
    }
  }

  editGame(id: string): void {
    this.getGameById(id);
  }

  searchGames(): void {
    if (this.searchQuery) {
      this.games = this.games.filter(game => game.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.getGames();
    }
  }
}
