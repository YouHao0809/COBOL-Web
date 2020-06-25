<template>
    <div class="master-panel">
        <h3 class="panel-title">Data Set List Utility</h3>

        <div class="panel-content">
            <div class="panel-name">
                <a-row>
                    <a-col :span="12">blank: Display data set list</a-col>
                    <a-col :span="12">P: Print data set list</a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">V: Display VTOC information</a-col>
                    <a-col :span="12">PV: Print VTOC information</a-col>
                </a-row>
            </div>

            <br/>

            <a-row class="panel-desc"
            >Enter one or both of the parameters below:
            </a-row
            >
            <a-form-item
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 18 }"
                    class="panel-option"
                    label="Dsname Level: "
                    v-focus
            >
                <a-input v-model="dsName"/>
            </a-form-item>
            <a-form-item
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 18 }"
                    class="panel-option"
                    label="Volume Serial: "
            >
                <a-input v-model="volumeName"/>
            </a-form-item>

            <div class="panel-card">
                <a-row class="panel-desc">Data set list options:</a-row>
                <a-form-item
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 18 }"
                        class="panel-option"
                        label="Initial View"
                >
                    <a-radio-group v-model="value">
                        <a-radio-button value="1">Volume</a-radio-button>
                        <a-radio-button value="2">Space</a-radio-button>
                        <a-radio-button value="3">Attrib</a-radio-button>
                        <a-radio-button value="4">Total</a-radio-button>
                    </a-radio-group>
                </a-form-item>

                <a-form-item
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 18 }"
                        class="panel-option"
                        label="Select option"
                >
                    <a-checkbox-group :options="selectOptions" v-model="checkedList"/>
                </a-form-item>
            </div>
            <a-input
                    @keyup.enter="onEnter"
                    addonBefore="Option >"
                    class="panel-option"
                    placeholder="Only support 'blank' for now and options above are all ignored except 'Dsname Level' 🤣"
                    v-model="option"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "dsu-panel",
        data() {
            return {
                dsName: "",
                volumeName: "",
                option: "",
                value: "1",
                selectOptions: [
                    "Confirm Data Set Delete",
                    "Confirm Member Delete",
                    "Include Additional Qualifiers",
                    "Display Catalog Name",
                    "Display Total Tracks",
                    "Prefix Dsname Level"
                ],
                checkedList: [
                    "Confirm Data Set Delete",
                    "Confirm Member Delete",
                    "Include Additional Qualifiers",
                    "Display Catalog Name"
                ]
            };
        },
        methods: {
            onEnter() {
                if (!this.dsName) {
                    this.$message.warn("请输入 Dsname Level");
                    return;
                }
                let opt = this.option.trim();
                opt = opt === "" ? "blank" : opt;
                const panel = `p_3_4_${opt}`.replace(/\./g, "_").toLowerCase();
                this.$store.commit(
                    "ispf/SET_DSN_LEVEL",
                    this.dsName.toUpperCase().trim()
                );
                this.$store.commit("ispf/SET_PANEL", panel);
            }
        }
    };
</script>

<style>
    .panel-card {
        background: rgba(0, 0, 0, 0.5);
    }

    .panel-card .ant-radio-button-wrapper {
        color: white;
        background: black;
    }

    .panel-card .ant-checkbox-wrapper {
        color: white;
    }
</style>
