import { Schema ,Prop, MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';



export type AuthDocument =  Auth & Document;

@Schema()

export class Auth{
    @Prop()
     Name:string;
     @Prop()
     Username:string;
     @Prop()
     Email:string;
     @Prop()
     Password:string;
}

export const userSchema = SchemaFactory.createForClass(Auth);