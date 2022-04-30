// import {
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//   canActivate(context: ExecutionContext) {
//     return super.canActivate(context);
//   }

//   handleRequest(err, user) {
//     if (err || !user) {
//       throw new UnauthorizedException(err?.message);
//     }

//     return user;
//   }
// }

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
