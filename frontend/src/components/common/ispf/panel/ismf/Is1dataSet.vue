<template>
    <div class="master-panel">
        <h3 class="panel-title">DATA SET SELECTION ENTRY PANEL</h3>

        <div class="panel-content">
            <a-row>
                <a-col :span="24" class="panel-name"
                >For a Data Set List, Select Source of Generated List . . 2 (1 or
                    2)
                </a-col
                >
            </a-row>
            <a-row :gutter="16" class="panel-desc">
                <a-col :offset="1" :span="1">1</a-col>
                <a-col :span="9">Generate from a Saved List List Name . . .</a-col>
                <a-col :span="9">Query Name To Save or Retrieve . . .</a-col>
            </a-row>

            <a-row class="panel-desc">
                <a-col :offset="1" :span="1">2</a-col>
                <a-col :span="22">Generate a new list from criteria below</a-col>
            </a-row>

            <a-row>
                <a-col :offset="2" :span="22">
                    <a-input
                            @pressEnter="datasetApp"
                            addonBefore="Data Set Name"
                            class="panel-option"
                            v-focus
                            v-model="dataSetName"
                    />
                </a-col>
            </a-row>

            <a-row>
                <a-col :offset="2" :span="22">
                    <a-input
                            @pressEnter="datasetApp"
                            addonBefore="Specify Source of the new list"
                            class="panel-option"
                            placeholder="(1 - VTOC, 2 - Catalog)"
                            v-model="source"
                    />
                </a-col>
            </a-row>

            <a-row class="panel-desc">
                <a-col :offset="2" :span="1">1</a-col>
                <a-col :span="21">Generate list from VTOC</a-col>
            </a-row>

            <a-row>
                <a-col :offset="3" :span="21">
                    <a-input
                            @pressEnter="datasetApp"
                            addonBefore="Volume Serial Number"
                            class="panel-option"
                            placeholder="(fully or partially specified)"
                            v-model="volume"
                    />
                </a-col>
            </a-row>

            <a-row class="panel-desc">
                <a-col :offset="3" :span="21">Storage Group Name . . .</a-col>
            </a-row>

            <a-row class="panel-desc">
                <a-col :offset="2" :span="1">2</a-col>
                <a-col :span="21">Generate list from Catalog</a-col>
            </a-row>

            <a-row class="panel-desc">
                <a-col :offset="3" :span="21">Catalog Name . . .</a-col>
            </a-row>
            <a-row class="panel-desc">
                <a-col :offset="3" :span="21">Volume Serial Number . . .</a-col>
            </a-row>
            <a-row class="panel-desc">
                <a-col :offset="3" :span="21">
                    <a-input
                            @pressEnter="datasetApp"
                            addonBefore="Acquire Data from Volume"
                            class="panel-option"
                            placeholder="Y or N"
                            v-model="acquireVolume"
                    />
                </a-col>
            </a-row>
            <a-row class="panel-desc">
                <a-col :offset="3" :span="21"
                >Acquire Data if DFSMShsm Migrated . . . N (Y or N)
                </a-col
                >
            </a-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "is1",
        data() {
            return {
                dataSetName: "",
                source: "",
                volume: "",
                acquireVolume: "N"
            };
        },
        methods: {
            datasetApp() {
                // console.log({
                //   dataSetName: this.dataSetName,
                //   source: this.source,
                //   volume: this.volume,
                //   acquireVolume: this.acquireVolume
                // });
            }
        }
    };
</script>
