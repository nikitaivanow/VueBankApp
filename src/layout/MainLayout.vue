<template>
<div>
    <the-navbar></the-navbar>
    <the-sidebar></the-sidebar>
    <div class="container with-nav">
        <AppMessage/>>
        <router-view></router-view>
   </div>
</div>
</template>

<script>
import TheSidebar from "../components/TheSidebar"
import TheNavbar from "../components/TheNavbar"
import AppMessage from '../components/ui/AppMessage'

export default {
    components: {TheNavbar,AppMessage,TheSidebar}
    }
</script>

<style scoped>

</style>