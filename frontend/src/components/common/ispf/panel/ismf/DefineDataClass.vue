<template>
    <div class="master-panel">
        <a-spin :spinning="isLoading" size="large">
            <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
            <h3 class="panel-title">DATA CLASS DEFINE</h3>
            <div class="panel-content">
                <a-row>
                    <a-col :span="10" class="panel-name">SCDS Name :</a-col>
                    <a-col :span="14" class="panel-name">
                        {{ this.$store.state.ispf.cdsName }}
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="10" class="panel-name">Data Class Name :</a-col>
                    <a-col :span="14" class="panel-name">
                        {{ this.$store.state.ispf.construct }}
                    </a-col>
                </a-row>
                <a-row class="panel-name">To DEFINE Data Class, Specify:</a-row>
                <a-row>
                    <a-input
                            addonBefore="Description: "
                            class="panel-option"
                            v-model="descr"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Recfm: "
                            class="panel-option"
                            placeholder="any valid RECFM combination or blank"
                            v-model="recfm"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Lrecl: "
                            class="panel-option"
                            placeholder="1 to 32761 or blank"
                            v-model="lrecl"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Space Avgrec: "
                            class="panel-option"
                            placeholder="U, K, M or blank"
                            v-model="spcavrec"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Avg Value: "
                            class="panel-option"
                            placeholder="0 to 65535 or blank"
                            v-model="spcavval"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Primary: "
                            class="panel-option"
                            placeholder="0 to 999999 or blank"
                            v-model="spcprm"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Secondary: "
                            class="panel-option"
                            placeholder="0 to 999999 or blank"
                            v-model="spcsec"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Directory: "
                            class="panel-option"
                            placeholder="0 to 999999 or blank"
                            v-model="spcdir"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Retpd Or Expdt: "
                            class="panel-option"
                            placeholder="0 to 93000, YYYY/MM/DD or blank"
                            v-model="rexppdt"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Volume Count: "
                            class="panel-option"
                            placeholder="1 to 255 or blank"
                            v-model="volcnt"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Add'l Volume Amount: "
                            class="panel-option"
                            placeholder="P=Primary, S=Secondary or blank"
                            v-model="addvolam"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Data Set Name Type: "
                            class="panel-option"
                            placeholder="EXT, HFS, LIB, PDS, Large or blank"
                            v-model="dsnmtyp"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Recorg: "
                            class="panel-option"
                            placeholder="KS, ES, RR, LS or blank"
                            v-model="recorg"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Keylen: "
                            class="panel-option"
                            placeholder="0 to 255 or blank"
                            v-model="keylen"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="Keyoff: "
                            class="panel-option"
                            placeholder="0 to 32760 or blank"
                            v-model="keyoff"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="CIzise Data: "
                            class="panel-option"
                            placeholder="1 to 32768 or blank"
                            v-model="ciszdata"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="% Freespace CI: "
                            class="panel-option"
                            placeholder="0 to 100 or blank"
                            v-model="frspcci"
                    ></a-input>
                </a-row>
                <a-row>
                    <a-input
                            addonBefore="CA: "
                            class="panel-option"
                            placeholder="0 to 100 or blank"
                            v-model="frspcca"
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
        name: "DefineDataClass",
        data() {
            return {
                descr: "",
                recfm: "",
                lrecl: "",
                spcavrec: "",
                spcavval: "",
                spcprm: "",
                spcsec: "",
                spcdir: "",
                rexppdt: "",
                volcnt: "",
                addvolam: "",
                dsnmtyp: "",
                recorg: "",
                keylen: "",
                keyoff: "",
                ciszdata: "",
                frspcci: "",
                frspcca: "",
                isLoading: false
            };
        },
        methods: {
            onEnter() {
                const params = {
                    scds: this.$store.state.ispf.cdsName,
                    dcname: this.$store.state.ispf.construct,
                    descr: this.descr.trim(),
                    recfm: this.recfm.trim(),
                    lrecl: this.lrecl.trim(),
                    spcavrec: this.spcavrec.trim(),
                    spcavval: this.spcavval.trim(),
                    spcprm: this.spcprm.trim(),
                    spcsec: this.spcsec.trim(),
                    spcdir: this.spcdir.trim(),
                    rexppdt: this.rexppdt.trim(),
                    volcnt: this.volcnt.trim(),
                    addvolam: this.addvolam.trim(),
                    dsnmtyp: this.dsnmtyp.trim(),
                    recorg: this.recorg.trim(),
                    keylen: this.keylen.trim(),
                    keyoff: this.keyoff.trim(),
                    ciszdata: this.ciszdata.trim(),
                    frspcci: this.frspcci.trim(),
                    frspcca: this.frspcca.trim()
                };
                this.isLoading = true;
                Axios.post("/api/sms/data-class", params)
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
