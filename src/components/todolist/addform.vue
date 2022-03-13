<template>
    <div>
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                        type="text"
                        class="form-control"
                        id="name"
                        required
                        v-model="tutorial.title"
                        name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input
                        class="form-control"
                        id="description"
                        required
                        v-model="tutorial.description"
                        name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">DateTime</label>
                <Datepicker
                        id="todo_at"
                        required
                        name="todo_at"
                        v-model="tutorial.todo_at"
                ></Datepicker>
            </div>

            <button @click="saveTutorial" class="btn btn-success">Save</button>
            <button type="button" class="btn btn-primary ml-2" @click="kembali">Back</button>
        </div>
        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>

<script>
    import TodoDataService from "../../services/TodoDataService";
    import Datepicker from 'vue3-date-time-picker';
    import 'vue3-date-time-picker/dist/main.css';
    import moment from 'moment-timezone';
    moment.tz.setDefault('Asia/Jakarta');

    export default {
        name: "todolist-addform",
        data() {
            return {
                tutorial: {
                    id: null,
                    title: "",
                    description: "",
                    todo_at: "",
                    published: false
                },
                submitted: false
            };
        },
        methods: {
            saveTutorial() {
                var data = {
                    title: this.tutorial.title,
                    description: this.tutorial.description,
                    todo_at: this.tutorial.todo_at
                };

                console.log(data)

                TodoDataService.create(data)
                    .then((response) => {
                        /*this.tutorial.id = response.data.id;
                        console.log(response.data);
                        this.submitted = true;*/
                        console.log(response.data);
                        this.$router.push({ name: 'todos' });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            newTutorial() {
                this.submitted = false;
                this.tutorial = {};
            },
            kembali(){
                this.$router.push({ name: 'todos' });
            }
        },
        components: { Datepicker },
    };
</script>

<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
