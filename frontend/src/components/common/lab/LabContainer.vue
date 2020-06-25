<template>
    <div class="lab-container">
        <div class="left">
            <a-spin :spinning="this.isLoadingDoc" size="large">
                <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
                <LabContent :content="content"/>
            </a-spin>
        </div>
        <div class="divider" v-if="this.subLab !== 'intro'"></div>
        <div class="right" v-if="this.subLab !== 'intro'">
            <h2 v-if="steps[stepIndex]">步骤 {{ steps[stepIndex] }}</h2>
            <a-spin :spinning="this.isLoading">
                <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
                <Question ref="question"/>
            </a-spin>
            <div>
        <span>
          <a-button
                  :disabled="stepIndex === 0"
                  @click="stepIndex--"
                  icon="left-circle"
                  style="margin-right: 10px"
          >上一步</a-button
          >
          <a-button
                  :disabled="stepIndex >= steps.length - 1"
                  @click="stepIndex++"
                  icon="right-circle"
          >下一步</a-button
          >
        </span>
                <span style="float: right">
          <a-popover style="margin-right: 10px">
            <template slot="content">
              保存了回答后才可以提交实验报告。
            </template>
            <a-icon style="cursor: pointer" type="question-circle"/>
          </a-popover>
          <a-button
                  :disabled="$store.state.lab.labStatus === 'submitted'"
                  @click="this.saveToDrafts"
                  style="margin-right: 10px"
                  type="primary"
          >保存本页</a-button
          >
        </span>
            </div>
            <a-divider/>
            <slot>
                <!-- default content -->
                <Console/>
            </slot>
        </div>
    </div>
</template>

<script>
    import LabContent from "@/components/common/lab/LabContent";
    import Question from "@/components/common/lab/Question";
    import Console from "@/components/common/console/Console";

    export default {
        components: {LabContent, Question, Console},
        props: {
            labName: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                stepIndex: 0
            };
        },
        computed: {
            content() {
                return this.$store.state.lab.labContent;
            },
            subLab() {
                return this.$route.params.subLab;
            },
            steps() {
                return this.$store.state.lab.subLabQuestions.steps;
            },
            isLoadingDoc() {
                return this.$store.state.lab.isLoadingDoc;
            },
            isLoading() {
                return (
                    this.$store.state.lab.isLoadingQuestions ||
                    this.$store.state.lab.isLoadingDrafts ||
                    this.$store.state.lab.isSavingDrafts
                );
            }
        },
        // init data
        created() {
            this.$store.dispatch("lab/initLab", this.labName);
            this.$store.dispatch("lab/initSubLab", this.subLab);
        },
        methods: {
            saveToDrafts() {
                this.$store.dispatch("lab/saveToDrafts", this.$refs.question.draftsTemp);
            }
        },
        watch: {
            subLab() {
                this.stepIndex = 0;
                this.$store.dispatch("lab/initSubLab", this.subLab);
            },
            stepIndex(newValue) {
                const s = this.$store.state.lab.subLabQuestions.steps[newValue];
                if (s !== undefined) {
                    this.$store.commit("lab/SET_STEP", s);
                    this.$store.dispatch("lab/updateStepDrafts", s);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .lab-container {
        display: flex;
        justify-content: center;
        position: relative;

        height: 100%;

        .left,
        .right {
            flex: 1 1 0;
            overflow: auto;
        }

        .divider {
            position: relative;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #ddd;
            margin: 0 10px;
        }
    }
</style>
