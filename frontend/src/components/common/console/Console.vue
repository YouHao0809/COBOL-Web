<template>
    <a-tabs :defaultActiveKey="defaultTab" type="card">
        <a-tab-pane key="cmd" tab="命令行">
            <CMD/>
        </a-tab-pane>
        <a-tab-pane key="jcl" tab="JCL">
            <JCL/>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
  import CMD from "./CMD";
  import JCL from "./JCL";
  // remove warning of async-validator used by a-form
  // ref: https://github.com/yiminghe/async-validator#how-to-avoid-warning
  import Schema from "async-validator";

  Schema.warning = function () {
    };

    export default {
        components: {
            CMD,
            JCL
        },
        props: {
            defaultTab: {
                type: String,
                default: "cmd"
            }
        },
        data() {
            return {};
        },

        methods: {}
    };
</script>

<style>
    .ant-tabs-tab {
        min-width: 80px;
        text-align: center;
    }
</style>
