import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import generateOTP from '../../utils/generateOTP';
import { BadRequest } from '@feathersjs/errors';
import app from '../../app';
import RolesEnum from '../../constants/roles.enum';
import * as jwt from "jsonwebtoken"
import sendMail from '../../utils/sendMail';

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: any, params: Params) {
    try {
      if (!data.email || !data.password) throw new BadRequest('Email and Password is required');
      const otp = generateOTP();
      const secret = app.settings.authentication.secret;
      data.role = RolesEnum.PLAYER;
      console.log(data)
      const token = jwt.sign({
        user: data,
        otp
      }, secret);

      await sendMail(data.email, otp);

      return { token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
