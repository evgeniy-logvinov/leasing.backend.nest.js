import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: configService.get<'mysql'>('DB_TYPE'),
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<string>('DB_PORT')),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  charset: configService.get<string>('DB_CHARSET'),
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.js}'],
  synchronize: true,
});
