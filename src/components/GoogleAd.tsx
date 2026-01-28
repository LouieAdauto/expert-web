"use client"; //
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAd() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // @ts-expect-error Verificamos que el script de AdSense ya esté cargado en el window
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-expect-error Verificamos que el script de AdSense ya esté cargado en el window
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [pathname]);

  return (
    <div key={pathname} aria-hidden="true" className="ad-container h-45">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-2750583274550813"
        data-ad-slot="5353648738"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
