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
      path: "catalog/:subLab",
      component: () => import("@/components/Catalog")
    },
    {
      path: "ispf",
      component: () => import("@/components/common/ispf/ISPF")
    }
  ]
};
