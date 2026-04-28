import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Template } from "@/models/Template";

const seedTemplates = [
  { name: "Apex Corporate", category: "Business", previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200", description: "High-converting corporate website template." },
  { name: "ShopFlow Pro", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200", description: "Premium ecommerce storefront experience." },
  { name: "Creator Vault", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200", description: "Showcase portfolio with storytelling sections." },
  { name: "LaunchPad X", category: "Landing", previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200", description: "Fast campaign landing page template." },
  { name: "Venture Elite", category: "Business", previewImage: "https://images.unsplash.com/photo-1454165833762-b201c0029f8a?w=1200", description: "Modern venture capital and investment firm layout." },
  { name: "Artisanal Hub", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200", description: "Minimalist marketplace for handcrafted goods." },
  { name: "Minimalist Mono", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200", description: "Ultra-clean black and white design portfolio." },
  { name: "Growth Engine", category: "Landing", previewImage: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=1200", description: "SaaS growth-focused landing page with data visuals." },
  { name: "Stellar Agency", category: "Business", previewImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200", description: "Dynamic creative agency showcase template." },
  { name: "Luxe Fashion", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=1200", description: "High-end fashion retail experience." },
  { name: "Narrative Arc", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200", description: "Story-focused portfolio for writers and journalists." },
  { name: "Beta Boost", category: "Landing", previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200", description: "Early-access waitlist template for tech startups." },
  { name: "Global Reach", category: "Business", previewImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200", description: "Logistics and international business template." },
  { name: "Gadget Grid", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", description: "Tech-focused electronic commerce layout." },
  { name: "Visualist Pro", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200", description: "Grid-heavy layout for photographers and artists." },
  { name: "Summit Event", category: "Landing", previewImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200", description: "Professional conference and webinar registration page." },
  { name: "Health Hub", category: "Business", previewImage: "https://images.unsplash.com/photo-1505751172107-596225a466a5?w=1200", description: "Clean medical and wellness practice template." },
  { name: "Organic Grocer", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200", description: "Fresh produce and grocery delivery storefront." },
  { name: "Code Studio", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200", description: "Technical portfolio for developers and engineers." },
  { name: "Flash Sales", category: "Landing", previewImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200", description: "High-urgency promotional landing page." },
  { name: "Zen Interior", category: "Business", previewImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200", description: "Elegant interior design studio presentation." },
  { name: "Fit Fuel", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200", description: "Subscription-based fitness and health store." },
  { name: "Crypto Wave", category: "Business", previewImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200", description: "Blockchain and cryptocurrency financial dashboard." },
  { name: "Green Horizon", category: "Business", previewImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200", description: "Renewable energy and solar power solution template." },
  { name: "Pixel Perfect", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200", description: "High-fidelity creative design and illustration portfolio." },
  { name: "Urban Pulse", category: "Landing", previewImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200", description: "Modern real estate and urban development landing page." },
  { name: "Gourmet Delight", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200", description: "Premium food delivery and restaurant storefront." },
  { name: "Tech Titan", category: "Business", previewImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200", description: "Enterprise software and technology hardware solution." },
  { name: "Wellness Way", category: "Business", previewImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200", description: "Holistic health and yoga studio presentation." },
  { name: "Sonic Studio", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200", description: "Music production and sound design portfolio." },
  { name: "Fast Lane", category: "Landing", previewImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200", description: "Automotive and car rental high-speed landing page." },
  { name: "Ocean Deep", category: "Portfolio", previewImage: "https://images.unsplash.com/photo-1544551763-47a0160c1e94?w=1200", description: "Underwater photography and marine life showcase." },
  { name: "Zenith Fashion", category: "E-commerce", previewImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200", description: "Ultra-luxury fashion and accessory retail." }
];

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const query = req.nextUrl.searchParams.get("q")?.trim();
    const category = req.nextUrl.searchParams.get("category")?.trim();

    const count = await Template.countDocuments();
    if (count < seedTemplates.length) {
      await Template.deleteMany({});
      await Template.insertMany(seedTemplates);
    }

    const filter: Record<string, unknown> = {};
    if (query) filter.name = { $regex: query, $options: "i" };
    if (category && category !== "All") filter.category = category;

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: { templates } });
  } catch (error) {
    console.error("Templates API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
