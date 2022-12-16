import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, { description: 'Hola mundo es lo que retorna', name: 'hello' })
    helloWorld(): string {
        return 'Hola Mundo!';
    }

    @Query(() => Float, { name: 'randomNumber' })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, {
        name: 'randomFromZeroTo',
        description: 'Form zero to Argument TO (Default 10)'
    })
    getRandomFromZeroTo(@Args('to', {
        nullable: true,
        type: () => Int
    }) to: number = 10): number {
        return Math.floor(Math.random() * to);
    }

}
