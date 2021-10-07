<template>
    <div class="text-xs" v-show="unreadnotifications.length > 0">{{unreadnotifications.length}}</div>
</template>

<script>
import Website from '../Apis/Website';

export default {
    mounted(){
        this.getNotifications();
    },
    data(){
        return {
            unreadnotifications: {},
        }
    },
    methods:{
        getNotifications(){
            Website.notification()
            .then(response => {
                this.unreadnotifications = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

}
</script>

<style>

</style>