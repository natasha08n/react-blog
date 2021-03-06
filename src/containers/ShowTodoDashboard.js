import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import { addTodo, editTodo, toggleTodo, deleteTodo, fetchTodos, deleteTodoSuccess } from '../actions/todos';
import { addCategory, fetchCategories } from '../actions/categories';
import TodoDashboard from '../components/partials/TodoDashboard/TodoDashboard';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
};

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos.present, state.filter),
        categories: state.categories,
        store: state
    }
};

const mapDispatchToProps = (dispatch) => ({
    addCategory: addCategory,
    fetchTodos: (url) => dispatch(fetchTodos(url)),
    fetchCategories: (url) => dispatch(fetchCategories(url)),
    editTodo: (text, category, description, completed, deleted) => dispatch(editTodo(text, category, description, completed, deleted)),
    addTodo: (text, category, description) => dispatch(addTodo(text, category, description)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    toggleTodo: (id, completed) => dispatch(toggleTodo(id, completed)),
    deleteTodoSuccess: (id) => dispatch(deleteTodoSuccess(id)),
    undo: UndoActionCreators.undo,
});

export const ShowTodoDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoDashboard);
