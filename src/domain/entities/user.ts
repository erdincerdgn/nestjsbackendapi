export class User {
    constructor(
        public readonly user_id: string,
        public user_email: string,
        public user_password: string,
        public user_fullname: string,
        public user_age: number,
        public user_countryinlive: string,
    ) {}
}