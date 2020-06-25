<template>
    <div class="master-panel">
        <a-spin :spinning="isLoading" size="large">
            <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
            <h3 class="panel-title">CDS BASE DISPLAY</h3>
            <div class="panel-content">
                <pre class="panel-desc content">{{ data }}</pre>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "DisplayBaseConfig",
        activated() {
            this.getBaseConfig();
        },
        data() {
            return {
                data: "",
                isLoading: true
            };
        },
        methods: {
            getBaseConfig() {
                this.data = "";
                this.isLoading = true;
                Axios.get(`/api/sms/base-configuration/${this.$store.state.ispf.cdsName}`)
                    .then(res => {
                        this.data = res.data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        }
    };
</script>

<style scoped>
    .content {
        background-color: unset;
        border: none;
    }
</style>
