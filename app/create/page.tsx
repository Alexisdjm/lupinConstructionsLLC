import type { Metadata } from "next";
import { PoolBuilder } from "@/src/components/PoolBuilder";

export const metadata: Metadata = {
  title: "Design Your Pool | Lupin Construction",
  description:
    "Configure the shape, interior, coping, and extras for your South Florida pool, then request a custom proposal.",
};

export default function CreatePage() {
  return <PoolBuilder />;
}
