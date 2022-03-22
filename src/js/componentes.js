import { todoList } from "../index";
import { Todo } from "./classes";

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    // Armamos el HTML de la tarea con los datos correspondientes
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // creamos el div a insertar
    const div = document.createElement('div');

    // Agregamos htmlTodo al div
    div.innerHTML = htmlTodo;
    
    //insertamos el primer elememto hijo del div al UL(todoList)
    divTodoList.append( div.firstElementChild );
    
    return div;

}


// Eventos
txtInput.addEventListener('keyup', ( event ) => {

    // console.log(event.keyCode);
    if( event.keyCode === 13 && txtInput.value.length > 0 ) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo( nuevoTodo );
        // console.log(todoList);
        crearTodoHtml(nuevoTodo);

        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    
    const nombreElemento = event.target.localName; // input, label, button
    // console.log(nombreElemento);
    const todoElemento = event.target.parentElement.parentElement;
    console.log(todoElemento);
    const todoId = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ) { // ckick en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button')){
        
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento );
    }

})

btnBorrarCompletados.addEventListener('click', () => {

    todoList.eliminarCompleatados();
    console.log(todoList);
    
    for ( let i = divTodoList.children.length - 1; i >= 0; i-- ) {

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }


})

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text; //Todos - Pendientes - Completados
    if(!filtro ){ return; };    

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected')

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
             
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
        }

    }


})