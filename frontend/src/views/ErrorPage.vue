<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <div class="card error-card">
        <!-- error svg -->
        <i class="bi bi-x-octagon"></i>
        <!-- card body -->
        <div class="card-body">
            <h5 class="card-title">Payment failed :(</h5>
            <p class="card-text">Something went wrong.</p>
            <button @click="$router.go(-3)" class="btn btn-primary">Return to Event Page</button>
        </div>
    </div>
</template>


<style>
.error-card {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 10rem;
    width: 25rem;
}
.bi-x-octagon {
    color: red;
    font-size: 8rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
}
</style>