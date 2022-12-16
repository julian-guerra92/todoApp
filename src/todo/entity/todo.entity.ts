import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {

    @Field(() => Int)
    id: number;

    @Field(() => String)
    description: string;

    @Field(() => String)
    done: boolean = false;

}

/* 
- Para la definición de objetos personalizados se utiliza el decorador @ObjectType()
- Se grega los ecoradores a cada atributo del objeto con la definición de su tipo (Int, Boolean, String, etc).
*/