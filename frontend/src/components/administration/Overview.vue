<template>
    <div class="teacher-home">
        <h1>实验总览</h1>
        <a-spin :spinning="isLoading" size="large">
            <a-icon :spin="true" slot="indicator" type="loading-3-quarters"/>
            <a-list :dataSource="data" class="overview-list" itemLayout="horizontal">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-button
                            @click="$router.push(`/administration/${item.path}`)"
                            slot="actions"
                            type="primary"
                    >查看详情
                    </a-button
                    >
                    <a-list-item-meta :description="`已有 ${item.submit} 人提交`">
                        <a :href="`/administration/${item.path}`" slot="title">
                            {{ item.name }}
                        </a>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </a-spin>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: true,
                data: [
                    {
                        name: "子程序调用实验",
                        path: "subroutine",
                        submit: "x",
                        review: 5
                    }
                ]
            };
        },
        async created() {
            this.isLoading = true;
            await this.data.map(async lab => {
                const res = await this.$http.get(`/api/db/submitted`, {
                    params: {
                        lab: lab.path.toUpperCase()
                    }
                });
                if (res.status === 200) {
                    lab.submit = res.body.length;
                }
            });
            this.isLoading = false;
        }
    };
</script>
