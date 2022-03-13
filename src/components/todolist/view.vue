<template>
    <div v-if="currentTutorial" class="">
        <h4>Todo</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title"
                       v-model="currentTutorial.name"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description"
                       v-model="currentTutorial.detail"
                />
            </div>

            <div class="form-group">
                <label for="description">DateTime</label>
                <Datepicker
                        id="todo_at"
                        required
                        name="todo_at"
                        v-model="currentTutorial.todo_at"
                        locale="id"
                ></Datepicker>
            </div>

        </form>

        <button class="btn btn-danger mr-2"
                @click="deleteTutorial"
        >
            Delete
        </button>

        <button type="submit" class="btn btn-success mr-2"
                @click="updateTutorial"
        >
            Update
        </button>
        <button type="button" class="btn btn-primary" @click="kembali">Back</button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
</template>

<script>
    import TodoDataService from "../../services/TodoDataService";
    import Datepicker from 'vue3-date-time-picker';
    import 'vue3-date-time-picker/dist/main.css';
    import moment from 'moment-timezone';
    moment.tz.setDefault('Asia/Jakarta');

    export default {
        name: "todolist-view",
        data() {
            return {
                currentTutorial: null,
                message: ''
            };
        },
        methods: {
            getTutorial(id) {
                TodoDataService.get(id)
                    .then(response => {
                        this.currentTutorial = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            updatePublished(status) {
                var data = {
                    id: this.currentTutorial._id,
                    title: this.currentTutorial.title,
                    description: this.currentTutorial.description,
                    todo_at: this.currentTutorial.todo_at,
                    published: status
                };

                TodoDataService.update(this.currentTutorial._id, data)
                    .then(response => {
                        console.log(response.data);
                        this.currentTutorial.published = status;
                        this.message = 'The status was updated successfully!';
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            updateTutorial() {
                TodoDataService.update(this.currentTutorial._id, this.currentTutorial)
                    .then(response => {
                        console.log(response.data);
                        alert("The todo was updated successfully!");
                        this.$router.push({ name: 'todos' });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            deleteTutorial() {
                if(!confirm('Are yout sure ?')) return false;
                TodoDataService.delete(this.currentTutorial._id)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({ name: "todos" });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            kembali(){
                this.$router.push({ name: 'todos' });
            }

        },
        mounted() {
            this.message = '';
            this.getTutorial(this.$route.params.id);
        },
        components: { Datepicker },
    };
</script>

<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
