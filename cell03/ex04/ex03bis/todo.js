const todo_container = document.querySelector('#ft_list');
const button = document.querySelector('#new-todo');

let todo_list = [];
let next_id = 0;

if (document.cookie) {
    const site_cookies = document.cookie.split('; ');
    const todos_json = site_cookies
        .map(cookie => cookie.split('=', 2))
        .filter(cookie => cookie[0] === 'todos')[0][1];
    const todo_texts = JSON.parse(todos_json);
    todo_texts.forEach(todo_text => {
        new_todo(todo_text);
    });
}

button.onclick = () => {
    const todo_text = prompt('What is your new todo?');
    if (!todo_text) return;
    new_todo(todo_text);
}

function new_todo(todo_text) {
    todo = {
        text: todo_text,
        id: next_id++
    }
    todo_list.push(todo);


    const todo_element = new_todo_element(todo);
    todo_container.insertBefore(todo_element, todo_container.firstChild);

    save_cookie();
}

function new_todo_element(todo) {
    const new_todo = document.createElement('div');
    new_todo.textContent = todo.text;
    new_todo.id = todo.id;
    new_todo.classList.add('todo');
    new_todo.onclick = remove_todo(new_todo);
    return new_todo;
}

function remove_todo(todo_element) {
    return function() {
        const confirm_delete = confirm(`Do you want to delete ${todo_element.textContent} ?`);
        if (!confirm_delete) return;


        todo_list = todo_list.filter(todo => todo.id != todo_element.id);
        todo_container.removeChild(todo_element);

        save_cookie();
    }
}   

function save_cookie() {
    const todo_texts = todo_list.map(todo => todo.text);
    document.cookie = `todos=${JSON.stringify(todo_texts)}`;
}