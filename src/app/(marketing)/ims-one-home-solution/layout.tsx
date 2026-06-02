import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMS One Home Solution | Luxury Home Transformation",
  description: "Experience luxury living with IMS One Home Solution - Complete home solutions under one roof",
};

export default function IMSOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ims-one-theme">
      <style>{`
        body:has(.ims-one-theme) > nav,
        body:has(.ims-one-theme) > footer,
        body:has(.ims-one-theme) > canvas,
        body:has(.ims-one-theme) > div[class*="cursor"] {
          display: none !important;
        }
        body:has(.ims-one-theme) {
          background-color: #FDFBF7;
        }
        body:has(.ims-one-theme) h1,
        body:has(.ims-one-theme) h2,
        body:has(.ims-one-theme) h3,
        body:has(.ims-one-theme) h4,
        body:has(.ims-one-theme) h5,
        body:has(.ims-one-theme) h6 {
          color: inherit;
        }
        body:has(.ims-one-theme) ::selection {
          background: #E8761A;
          color: white;
        }
      `}</style>
      {children}
    </div>
  );
}
