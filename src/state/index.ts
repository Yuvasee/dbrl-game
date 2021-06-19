import { Game } from "./Game";

export var State = new Game();
window.Game = State;

declare global {
    interface Window {
        Game: Game;
    }
}
