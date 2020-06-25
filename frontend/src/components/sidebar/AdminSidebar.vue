<template>
    <div class="menu-container">
        <a-menu
                @click="handleMenuClick"
                mode="inline"
                theme="dark"
                v-model="selectedKeys"
        >
            <a-menu-item
                    :key="
          (menu.path && '/administration/' + menu.path) || '/administration'
        "
                    v-for="menu in menuConfig"
            >
                <a-icon :type="menu.icon"/>
                <!-- 没有 span 收起来时字还会有 -->
                <span>{{ menu.name }}</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    export default {
        name: "SidebarMenu",
        data() {
            return {
                selectedKeys: [this.$route.path],
                menuConfig: [
                    {
                        name: "实验总览",
                        path: "",
                        icon: "home"
                    },
                    {
                        name: "安全管理（RACF）",
                        path: "racf",
                        icon: "safety"
                    },
                    {
                        name: "存储管理（SMS）",
                        path: "sms",
                        icon: "hdd"
                    },
                    {
                        name: "目录管理（Catalog）",
                        path: "catalog",
                        icon: "inbox"
                    },
                    {
                        name: "系统命令（MVS）",
                        path: "mvs",
                        icon: "code"
                    },
                    {
                        name: "SMP",
                        path: "smp",
                        icon: "code"
                    },
                    {
                        name: "脚本语言（REXX）",
                        path: "rexx",
                        icon: "snippets"
                    }
                ]
            };
        },
        computed: {
            path() {
                return this.$route.path;
            }
        },
        watch: {
            path(v) {
                this.selectedKeys = [v];
            }
        },
        methods: {
            handleMenuClick(e) {
                if (e.key) this.$router.push(e.key);
                else this.$router.push("/administration");
            }
        }
    };
</script>

<style scoped>
    .menu-container {
        height: 92%;
        overflow: auto;
    }
</style>
