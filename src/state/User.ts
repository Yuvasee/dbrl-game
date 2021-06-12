import { makeAutoObservable } from "mobx";

export class User {
    name: String;

    constructor(name: String) {
        this.name = name;

        makeAutoObservable(this, {}, { autoBind: true });
    }
}
