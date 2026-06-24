"use client";
import { useEffect } from "react";

export default function EnvDebug() {
  useEffect(() => {
    console.log("[ENV] NEXT_PUBLIC_ONECONNECT_API_BASE:", process.env.NEXT_PUBLIC_ONECONNECT_API_BASE);
  }, []);
  return null;
}
