<template>
    <div class="master-panel">
        <a-spin :spinning="isLoading" size="large">
            <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
            <h3 class="panel-title">STORAGE CLASS DEFINE</h3>
            <div class="panel-content">
                <a-row>
                    <a-col :span="10" class="panel-name">SCDS Name :</a-col>
                    <a-col :span="14" class="panel-name">
                        {{ this.$store.state.ispf.cdsName }}
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="10" class="panel-name">Storage Class Name :</a-col>
                    <a-col :span="14" class="panel-name">
                        {{ this.$store.state.ispf.construct }}
                    </a-col>
                </a-row>
                <a-row class="panel-name">To DEFINE Storage Class, Specify:</a-row>
                <a-row>
                    <a-input
                            addonBefore="Description: "
                            class="panel-option"
                            v-model="descr"
                    ></a-input>
                </a-row>
                <a-row class="panel-cmd">Performance Objectives</a-row>
                <a-row>
                    <a-input
                            addonBefore="Direct Millisecond Response: "
                            class="panel-option"
                            placeholder="1 to 999 or blank"
                            v-model="dmsresp"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Direct Bias: "
                            class="panel-option"
                            placeholder="R, W or blank"
                            v-model="drtbias"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Sequential Millisecond Response: "
                            class="panel-option"
                            placeholder="1 to 999 or blank"
                            v-model="seqmsres"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Sequential Bias: "
                            class="panel-option"
                            placeholder="R, W or blank"
                            v-model="seqbias"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Initial Access Response Seconds: "
                            class="panel-option"
                            placeholder="0 to 9999 or blank"
                            v-model="iniaress"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Sustained Data Rate (MB/sec): "
                            class="panel-option"
                            placeholder="0 to 999 or blank"
                            v-model="susdtrt"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="OAM Sublevel: "
                            class="panel-option"
                            placeholder="1, 2 or blank"
                            v-model="oamlvl"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Availability: "
                            class="panel-option"
                            placeholder="C, P ,S or N"
                            v-model="avalbty"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Accessibility: "
                            class="panel-option"
                            placeholder="C, P ,S or N"
                            v-model="accsbty"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Backup: "
                            class="panel-option"
                            placeholder="Y, N or Blank"
                            v-model="backup"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Versioning: "
                            class="panel-option"
                            placeholder="Y, N or Blank"
                            v-model="vrsning"
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
        name: "DefineStorageClass",
        data() {
            return {
                descr: "",
                dmsresp: "",
                drtbias: "",
                seqmsres: "",
                seqbias: "",
                iniaress: "",
                susdtrt: "",
                oamlvl: "",
                avalbty: "",
                accsbty: "",
                backup: "",
                vrsning: "",
                isLoading: false
            };
        },
        methods: {
            onEnter() {
                const params = {
                    scds: this.$store.state.ispf.cdsName,
                    stcname: this.$store.state.ispf.construct,
                    descr: this.descr.trim(),
                    dmsresp: this.dmsresp.trim(),
                    drtbias: this.drtbias.trim(),
                    seqmsres: this.seqmsres.trim(),
                    seqbias: this.seqbias.trim(),
                    iniaress: this.iniaress.trim(),
                    susdtrt: this.susdtrt.trim(),
                    oamlvl: this.oamlvl.trim(),
                    avalbty: this.avalbty.trim(),
                    accsbty: this.accsbty.trim(),
                    backup: this.backup.trim(),
                    vrsning: this.vrsning.trim()
                };
                this.isLoading = true;
                Axios.post("/api/sms/storage-class", params)
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
