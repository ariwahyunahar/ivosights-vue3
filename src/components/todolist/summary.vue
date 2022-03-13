<template>
    <div class="row">
        <div class="col-md-4">
            <h2 class="">Todo</h2>
            <table class="table">
                <tr>
                    <th>No</th>
                    <th>Todo</th>
                    <th>Action</th>
                </tr>

                <tr v-for="(data, index) in todos"
                    :key="index">
                    <td>{{ index+1 }}</td>
                    <td>
                        <b>{{ data.name }}</b><br>
                        {{ data.detail }}<br>
                        <small>{{ format_date(data.todo_at) }}</small>
                    </td>
                    <th><button class="btn btn-sm btn-success" @click="finish(1, data)">Finish</button></th>
                </tr>
            </table>
        </div>
        <div class="col-md-4">
            <h2 class="text-danger">Past Todo</h2>
            <table class="table">
                <tr>
                    <th>No</th>
                    <th>Todo</th>
                    <th>Action</th>
                </tr>

                <tr v-for="(data, index) in todospast"
                    :key="index">
                    <td>{{ index+1 }}</td>
                    <td>
                        <b>{{ data.name }}</b><br>
                        {{ data.detail }}<br>
                        <small class="text-danger">{{ format_date(data.todo_at) }}</small>
                    </td>
                    <th><button class="btn btn-sm btn-success" @click="finish(0, data)">Finish</button></th>
                </tr>
            </table>
        </div>

        <div class="col-md-4">
            <h2 class="text-success">Finish Todo</h2>
            <table class="table">
                <tr>
                    <th>No</th>
                    <th>Todo</th>
                </tr>

                <tr v-for="(data, index) in todosfinish"
                    :key="index">
                    <td>{{ index+1 }}</td>
                    <td>
                        <b>{{ data.name }}</b><br>
                        {{ data.detail }}<br>
                        <small>{{ format_date(data.todo_at) }}</small><br>
                        Finish at: {{ format_date(data.is_finish_at) }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import TodoDataService from "../../services/TodoDataService";
    import moment from 'moment';
    // import Pagination from 'v-pagination-3';

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
        name: "todolist-summary",
        data() {
            return {
                todos: [],
                todospast: [],
                todosfinish: [],
                currentTutorial: null,
                currentIndex: -1,
                title: ""
            };
        },
        methods: {
            getTodo() {
                TodoDataService.getTodo()
                    .then(response => {
                        this.todos = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getTodoPast() {
                TodoDataService.getTodoPast()
                    .then(response => {
                        this.todospast = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getTodoFinish(){
                TodoDataService.getTodoFinish()
                    .then(response => {
                        this.todosfinish = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            finish(is_todo = 1, todo_data) {
                if(!confirm('Are yout sure ?')) return false;
                TodoDataService.finish(todo_data)
                    .then(() => {
                        if(is_todo){
                            this.getTodo();
                        }else{
                            this.getTodoPast();
                        }
                        this.getTodoFinish();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            format_date(value){
                if (value) {
                    var dtrtn = moment(String(value)).format('DD MMM YYYY, HH:mm');
                    var hr = new Date(value).getDay();
                    return days[hr]+', '+dtrtn;
                }
            },
        },
        mounted() {
            this.getTodo();
            this.getTodoPast();
            this.getTodoFinish();
        },
        components: {

        }
    }
</script>

<style scoped>

</style>