<template>
    <div>
        <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
    </div>
</template>
<script>
export default {
    name: 'ChartJs',
    data() {
        return {
        }
    },
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js')
        document.head.appendChild(recaptchaScript);
        let recaptchaScript1 = document.createElement('script')
        recaptchaScript1.setAttribute('src', 'https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js')
        document.head.appendChild(recaptchaScript1);
        let recaptchaScript2 = document.createElement('script')
        recaptchaScript2.setAttribute('src', 'dashboard.js')
        document.head.appendChild(recaptchaScript2);
    },
}
</script>
<style scoped>

</style>
