import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions,Transport} from "@nestjs/microservices";
import { AppModule } from './app.module';
import {join} from "path"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,  
    options: {
      url:"0.0.0.0:5000",
      package: 'user',
      protoPath: "./src/user/user.proto",
    },
  });

  app.listen(()=>{
    console.log("Server Startup")
  });
}
bootstrap();
