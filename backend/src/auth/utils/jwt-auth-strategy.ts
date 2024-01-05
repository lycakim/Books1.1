// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// // import { Strategy } from "passport";
// import { ExtractJwt, Strategy } from "passport-jwt";


// @Injectable()
// export class JwtAuthStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: process.env.JWT_SECRET
//         });
//     }

//     async validate(payload: any) {
//         return {
//             id: payload.id,
//             name: payload.name
//         }
//     }
// }