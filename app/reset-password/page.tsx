'use client';

import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">加载中...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
