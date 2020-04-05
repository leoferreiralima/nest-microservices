import { Inject, Controller,Get , OnModuleInit} from '@nestjs/common';
import { ClientGrpc,Client,Transport } from '@nestjs/microservices';
import { join } from "path"

import { Observable} from 'rxjs';

import { User } from './interfaces/user.interface'
import { UserById } from './interfaces/user-by-id.interface';


interface UserMicroService {
  findOne(data: UserById): Observable<User>;
}

@Controller()
export class UserController implements OnModuleInit{
  @Client({
    
    transport: Transport.GRPC,
    options: {
      url:"0.0.0.0:5000",
      package: 'user',
      protoPath: './src/user/user.proto',
    },
  })
  client: ClientGrpc;

  private userMicroService: UserMicroService;

  onModuleInit() {
    this.userMicroService = this.client.getService<UserMicroService>('UserService');
  }

  @Get()
  findOne(): Observable<User> {
    return this.userMicroService.findOne({id: 1})
  }

}