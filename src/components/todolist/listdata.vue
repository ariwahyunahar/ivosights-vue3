
<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>

<template>
    <h2>Todo List</h2>
    <div class="row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by name"
                       v-model="title"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchTitle">
                        Search
                    </button>
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchTitleReset">
                        Reset
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <router-link to="/add" class="btn btn-primary">+ Add Todo</router-link>
            <button class="btn btn-danger ml-3" @click="removeAllTodos">
                Remove All
            </button>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12 mt-2">
            <pagination v-model="page" :records="count" :per-page="pageSize" @paginate="handlePageChange"></pagination>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(todo, index) in todos"
                    :key="index"
                >
                    <div style="float: right;">
                        <button @click="setActivetodo(todo, index)" class="btn btn-success btn-sm">View</button>
                        <button v-if="!todo.is_finish" @click="finish(todo)" class="btn btn-sm btn-warning ml-2">Finish</button>
                        <button v-if="todo.is_finish" class="btn btn-sm btn-light ml-2" disabled>Finished</button>
                        <button @click="deletetodo(todo)" class="btn btn-danger btn-sm ml-2">Delete</button>
                    </div>
                    <div class="font-weight-bold">{{ todo.name }}</div>
                    <div>{{ format_date(todo.todo_at) }}</div>
                    <small style="color: #aaa;">CreatedAt: {{ format_date(todo.created_at) }}</small>

                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currenttodo">
                <h4>Todo</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currenttodo.name }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ currenttodo.detail }}
                </div>

                <router-link :to="'/todo/' + currenttodo._id" class="btn btn-warning">Edit</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoDataService from "../../services/TodoDataService";
    import moment from 'moment';
    import Pagination from 'v-pagination-3';

    // eslint-disable-next-line no-unused-vars
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
    ];

    export default {
        name: "component-todolist-listdata",
        data() {
            return {
                todos: [],
                currenttodo: null,
                currentIndex: -1,
                title: "",

                page: 1,
                count: 0,
                pageSize: 2,
                pageSizes: [3, 6, 9]
            };
        },
        methods: {
            getRequestParams(title, page, pageSize) {
                let params = {};
                if (title) {
                    params["title"] = title;
                }
                if (page) {
                    params["page"] = page - 1;
                }
                if (pageSize) {
                    params["size"] = pageSize;
                }
                return params;
            },
            retrieveTodos() {
                const params = this.getRequestParams(
                    this.title,
                    this.page,
                    this.pageSize
                );
                TodoDataService.getAll(params)
                    .then((response) => {
                        this.todos = response.data.data;
                        this.count = response.data.count;
                        console.log(response.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },

            handlePageChange(value) {
                this.page = value;
                this.retrieveTodos();
            },

            refreshList() {
                this.retrieveTodos();
                this.currenttodo = null;
                this.currentIndex = -1;
            },

            setActivetodo(todo, index) {
                this.currenttodo = todo;
                this.currentIndex = todo ? index : -1;
            },

            removeAllTodos() {
                if(!confirm('Are you sure ?')){
                    return false;
                }
                TodoDataService.deleteAll()
                    .then(response => {
                        console.log(response.data);
                        this.refreshList();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            searchTitle() {
                this.page = 1;
                this.retrieveTodos();
            },
            searchTitleReset() {
                this.title = "";
                this.page = 1;
                this.retrieveTodos();
            },
            format_date(value){
                if (value) {
                    var dtrtn = moment(String(value)).format('DD MMM YYYY, HH:mm');
                    var hr = new Date(value).getDay();
                    return days[hr]+', '+dtrtn;
                }
            },
            deletetodo(todo) {
                if(!confirm('Are yout sure ?')) return false;
                TodoDataService.delete(todo._id)
                    .then(() => {
                        this.refreshList();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            finish(todo_data) {
                if(!confirm('Are yout sure ?')) return false;
                TodoDataService.finish(todo_data)
                    .then(() => {
                        this.refreshList();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
        },
        mounted() {
            this.retrieveTodos();
        },
        components: {
            Pagination
        }
    };
</script>

