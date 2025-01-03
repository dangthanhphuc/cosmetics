import {JsonProperty} from 'json2typescript';

export class RegisterDTO {
  email : string;
  password : string;
  confirm_password : string;
  name : string;

  constructor(data : any) {
    this.email = data.email;
    this.password = data.password;
    this.confirm_password = data.confirmPassword;
    this.name = data.name;
  }
}
