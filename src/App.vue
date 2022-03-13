<style>
    .dd-mn .nav-link {
        color: #000 !important;
    }
</style>
<template>

    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Todo Application</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <router-link to="/todos" class="nav-link">All Todo</router-link>

                        <!--<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Todo
                        </a>
                        <ul class="dropdown-menu dd-mn" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                                <router-link to="/add" class="nav-link">Add Todo</router-link>
                            </li>
                            <li>
                                <router-link to="/todos" class="nav-link">Todo List</router-link>
                            </li>
                        </ul>-->
                    </li>
                    <li class="nav-item active">
                        <router-link to="/todo/summary" class="nav-link">Sumary</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" style="padding: 20px;">
                    <router-view/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "app"
    };


</script>
