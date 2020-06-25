<template>
    <div class="master-panel">
        <a-spin :spinning="isLoading" size="large">
            <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
            <h3 class="panel-title">POOL STORAGE GROUP DEFINE</h3>
            <div class="panel-content">
                <a-row>
                    <a-col :span="10" class="panel-name">SCDS Name :</a-col>
                    <a-col :span="14" class="panel-name">
                        {{ this.$store.state.ispf.cdsName }}
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="10" class="panel-name">Storage Group Name :</a-col>
                    <a-col :span="14" class="panel-name">
                        {{ this.$store.state.ispf.construct }}
                    </a-col>
                </a-row>
                <a-row class="panel-name">To DEFINE Storage Group, Specify:</a-row>
                <a-row>
                    <a-input
                            addonBefore="Description: "
                            class="panel-option"
                            v-model="descr"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Auto Migrate: "
                            class="panel-option"
                            placeholder="Y, N, I or P"
                            v-model="automig"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Auto Backup: "
                            class="panel-option"
                            placeholder="Y or N"
                            v-model="autobkup"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Auto Dump: "
                            class="panel-option"
                            placeholder="Y or N"
                            v-model="autodump"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Overflow: "
                            class="panel-option"
                            placeholder="Y or N"
                            v-model="ovrflow"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Guaranteed Backup Frequency: "
                            class="panel-option"
                            placeholder="Required, 1 to 9999 or NOLIMIT"
                            v-model="guarbkfr"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            @keyup.enter="onEnter"
                            addonBefore="Command >"
                            class="panel-option"
                            placeholder="Press enter to submit"
                    />
                </a-row>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "DefinePoolStorageGroup",
        data() {
            return {
                descr: "",
                automig: "",
                autobkup: "",
                autodump: "",
                ovrflow: "",
                guarbkfr: "",
                isLoading: false
            };
        },
        methods: {
            onEnter() {
                const params = {
                    scds: this.$store.state.ispf.cdsName,
                    storgrp: this.$store.state.ispf.construct,
                    descr: this.descr.trim(),
                    automig: this.automig.trim(),
                    autobkup: this.autobkup.trim(),
                    autodump: this.autodump.trim(),
                    ovrflow: this.ovrflow.trim(),
                    guarbkfr: this.guarbkfr.trim()
                };
                if (!params.guarbkfr) {
                    this.$message.warn("请输入 Backup Frequency");
                    return;
                }
                this.isLoading = true;
                Axios.post("/api/sms/storage-group/pool", params)
                    .then(res => {
                        this.showResult(res.data);
                    })
                    .catch(e => {
                        this.$message.error("发生错误：" + e.message);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            showResult(result) {
                if (result.length > 0) {
                    const h = this.$createElement;
                    this.$info({
                        title: `DEFINE 结果`,
                        width: 800,
                        content: h("div", {}, [h("pre", result)]),
                        onOk() {
                            // do nothing
                        }
                    });
                }
            }
        }
    };
</script>

<style scoped></style>
