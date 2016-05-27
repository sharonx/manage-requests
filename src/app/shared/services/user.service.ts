import {Injectable} from "@angular/core";

@Injectable()
export class UserService {
    user: string;

    constructor() {
      
    }

    setUser(val: string) {
      this.user = val;
    }

    getUser() : string {
        return this.user;
    }
}