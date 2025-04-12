'use client';

import { Suspense } from "react";
import VerifyCodeContent from "./VerifyCodeContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">加载中...</div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}
