<template>
    <div>
        <h1>Home Page</h1>
        <v-btn class="test" @click="$router.push('/about')">Go to About</v-btn>
    </div>
</template>

<script>
export default {
    name: 'Home',
};
</script>