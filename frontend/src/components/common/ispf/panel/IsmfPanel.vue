<template>
    <div class="master-panel">
        <h3 class="panel-title">ISMF PRIMARY OPTION MENU</h3>
        <a-input
                @pressEnter="onEnter"
                addonBefore="OPTION >"
                class="panel-option"
                v-focus
        />
        <div class="panel-content">
            <a-row :gutter="16" :key="option.cmd" v-for="option in options">
                <a-col :span="2" class="panel-cmd">{{ option.cmd }}</a-col>
                <a-col :span="7" class="panel-name">{{ option.name }}</a-col>
                <a-col :span="15" class="panel-desc">{{ option.desc }}</a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ismf-panel",
        data() {
            return {
                option: "",
                options: [
                    {
                        cmd: 0,
                        name: "ISMP Profile",
                        desc: "- Specify ISMF User Profile"
                    },
                    {
                        cmd: 1,
                        name: "Data Set",
                        desc: "- Perform Functions Against Data Sets"
                    },
                    {
                        cmd: 2,
                        name: "Volume",
                        desc: "- Perform Functions Against Volumes"
                    },
                    {
                        cmd: 3,
                        name: "Management Class",
                        desc: "- Specify Data Set Backup and Migration Criteria"
                    },
                    {
                        cmd: 4,
                        name: "Data Class",
                        desc: "- Specify Data Set Allocation Parameters"
                    },
                    {
                        cmd: 5,
                        name: "Storage Class",
                        desc: "- Specify Data Set Performance and Availability"
                    },
                    {
                        cmd: 6,
                        name: "Storage Group",
                        desc: "- Specify Volume Names and Free Space Thresholds"
                    },
                    {
                        cmd: 7,
                        name: "Automatic Class Selection",
                        desc: "- Specify ACS Routines and Test Criteria"
                    },
                    {
                        cmd: 8,
                        name: "Control Data Set",
                        desc: "- Specify System Names and Default Criteria"
                    },
                    {
                        cmd: 9,
                        name: "Aggregate Group",
                        desc: "- Specify Data Set Recovery Parameters"
                    }
                ]
            };
        },
        methods: {
            onEnter(e) {
                if (e.target.value) {
                    const panel = `is_${e.target.value.trim()}`
                        .replace(/\./g, "_")
                        .toLowerCase();
                    this.$store.commit("ispf/SET_PANEL", panel);
                }
            }
        }
    };
</script>
