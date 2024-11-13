export interface User{
  "id": number,
  "username": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "address": string,
  "roles": [{"id": number, "name": string}]
}
