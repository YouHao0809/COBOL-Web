import PlaygroundLayout from "@/components/layouts/PlaygroundLayout";

export default {
    path: "/playground",
    component: PlaygroundLayout,
    children: [
        {
            path: "",
            component: () => import("@/components/Reports")
        },
        {
            path: "subroutine/:subLab",
            component: () => import("@/components/Subroutine")
        },
        {
            path: "ispf",
            component: () => import("@/components/common/ispf/ISPF")
        }
    ]
};
