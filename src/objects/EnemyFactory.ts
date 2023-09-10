import { Enemy } from "./Enemy";
import { ENEMY_TYPE_COUNT, EnemyType } from "./EnemyType";
import { Game } from "./Game";
import { GameState } from "./GameState";

export class EnemyFactory {
  game: Game;

  SPAWNING_DELAY_MIN = 2000;
  SPAWNING_DELAY_MAX = 4000;

  timeLastSpawned: number;
  nextSpawningDelay: number;

  constructor(game: Game) {
    this.game = game;
    this.timeLastSpawned = 0;
  }

  notifyMenuShown() {
    this.spawn(EnemyType.BASIC);
  }

  notifyGameStart() {
    this.nextSpawningDelay = this.SPAWNING_DELAY_MIN + Math.random() * (this.SPAWNING_DELAY_MAX - this.SPAWNING_DELAY_MIN);
  }

  updateState() {
    if (this.game.state !== GameState.STARTED) {
      return;
    }
    
    let now = Date.now();
    if (now - this.timeLastSpawned > this.nextSpawningDelay) {
      let type = Math.floor(Math.random() * ENEMY_TYPE_COUNT);
      this.spawn(type as EnemyType);
    }
  }

  private spawn(type: EnemyType) {
    let enemy = new Enemy(this.game, type);
    this.game.enemyList.push(enemy);
    this.timeLastSpawned = Date.now();
    this.nextSpawningDelay = this.SPAWNING_DELAY_MIN + Math.random() * (this.SPAWNING_DELAY_MAX - this.SPAWNING_DELAY_MIN);
  }
}
