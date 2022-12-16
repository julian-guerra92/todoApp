import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(@Args('id', { type: () => Int }) id: number): Todo {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ): Todo {
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.update(updateTodoInput);
    }

    @Mutation(() => Boolean)
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete(id);
    }

    //Aggregation
    @Query(() => Int, { name: 'totalTodos' })
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query(() => Int, { name: 'completedTodos' })
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query(() => Int, { name: 'pendingTodos' })
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }

    @Query(() => AggregationsType)
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos
        }
    }

}

/* 
- Todo lo que modifique la data es una mutación (create, update and delete)
- Si es @ArgsType no se pone el nombre del tipo de dato ya que genera error. Ejemplo: findAll
*/
