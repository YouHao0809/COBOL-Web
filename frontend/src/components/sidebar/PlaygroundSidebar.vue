<template>
    <div class="menu-container">
        <a-menu
                style="background: #E6F7FF"
                :defaultOpenKeys="defaultOpenKeys"
                @click="handleMenuClick"
                mode="inline"
                theme="white"
                v-model="selectedKeys"
        >
            <a-sub-menu :key="'/playground/' + menu.path" v-for="menu in menuConfig">
        <span slot="title">
          <a-icon :type="menu.icon"/>
          <span>{{ menu.name }}</span>
        </span>
                <a-menu-item
                        :key="`/playground/${menu.path}/${submenu.path}`"
                        :title="submenu.name"
                        v-for="submenu in menu.children"
                >{{ submenu.name }}
                </a-menu-item
                >
            </a-sub-menu>
            <a-menu-item :key="'/playground/ispf'"
            >
                <a-icon type="menu"/>
                <span>ISPF</span></a-menu-item
            >
        </a-menu>
    </div>
</template>

<script>
    export default {
        name: "SidebarMenu",
        data() {
            return {
                selectedKeys: [this.$route.path],
                defaultOpenKeys: [
                    this.$route.path
                        .split("/")
                        .slice(0, -1)
                        .join("/")
                ],
                menuConfig: [
                    {
                        name: "COBOL子程序实验",
                        path: "catalog",
                        icon: "inbox",
                        children: [
                            {name: "实验介绍", path: "intro"},
                            {name: "实验一：外部子程序实验", path: "lab1"},
                            {name: "实验二：内部实验", path: "lab2"}
                        ]
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
                this.$router.push(e.key);
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
