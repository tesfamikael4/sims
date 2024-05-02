
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Database Connection
inside the srs/app.module.ts change your own db configuration default one is 
for postgresql

    TypeOrmModule.forRootAsync({ useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sims',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }) 
  }),

  
  for mysql
    TypeOrmModule.forRootAsync({ useFactory: () => ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sims',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }) 
  }),

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support
michaelwondemu195@gmail.com
## Stay in touch

- Author - [Michael Wondemu](https://www.linkedin.com/in/michael-wondemu-2a3849199/)

