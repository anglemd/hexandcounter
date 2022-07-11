import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { AES, enc } from 'crypto-js';
import { UserRecord } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private _key = process.env.SECRET_KEY;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  encrptString(text: string) {
    let cipherText = AES.encrypt(text, this._key);
    return cipherText.toString();
  }

  decryptString(cipher: string) {
    const bytes = AES.decrypt(cipher.toString(), this._key);
    const plainText = bytes.toString(enc.Utf8);
    return plainText;
  }
  // https://stackoverflow.com/questions/23097928/node-js-btoa-is-not-defined-error
  // CONVERT PLAIN TEXT TO BASE64 TEXT BEFORE SENDING TO BROWSER....
  btoa(text): string {
    return Buffer.from(text).toString('base64'); // USE window.atob(text) in browser to convert back to plain text....
  }

  // CONVERT BASE64 TEXT SENT FROM BROWSER TO PLAIN TEXT....
  atob(b64EncodedTxt): string {
    return Buffer.from(b64EncodedTxt, 'base64').toString();
  }

  // USER NAME IS ACTUALLY A PASSWORD....
  async validateUser(
    userName: string,
    pass: string,
  ): Promise<UserRecord | null> {
    // THE CLIENT SHOULD SEND THE USER NAME AND PW ENCODED, SO WE NEED TO CONVERT TO PLAIN TEXT.
    //TODO: reimplement decoding of email/password coming from client.
    // let clientPw = this.atob(pass);
    // let userNm = this.atob(userName);
    let clientPw = pass;
    let userNm = userName;

    // console.log('AuthService TESTING: ' + userNm + ', ' + clientPw);
    const user: UserRecord = await this.userService.findOneByUserName(userNm);
    if (user && user.pw /*&& this.decryptString(user.pw) == clientPw */) {
      const user2: UserRecord = {
        userName: user.userName,
        displayName: user.displayName,
        email: user.email,
      };
      // console.log('AuthService found user');
      return user2;
    }
    return null;
  }

  async login(user: UserRecord) {
    // console.log('----AUTH SERVICE- login');
    // console.log(user);
    const payload = {
      userName: user.userName,
      displayName: user.displayName,
      email: user.email,
    };
    return {
      // PROVIDE A JWT TOKEN FOR THE CLIENT APP TO USE...
      access_token: this.jwtService.sign(payload),
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
