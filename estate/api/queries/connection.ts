import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";
import * as fs from "fs";
import * as path from "path";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

// ─── Persistent Mock Database for Development ────────────────
const MOCK_DB_PATH = path.resolve(process.cwd(), "db/mock_db.json");

function getMockData(tableName: string): any[] {
  let dbData: any = {};
  if (fs.existsSync(MOCK_DB_PATH)) {
    try {
      dbData = JSON.parse(fs.readFileSync(MOCK_DB_PATH, "utf-8"));
    } catch (e) {
      dbData = {};
    }
  }

  // Self-seed if missing
  if (!dbData[tableName]) {
    if (tableName === "agents") {
      dbData.agents = [
        {
          id: 1,
          name: "Shay Trotsky",
          title: "Founder & CEO",
          email: "shay@troitsky.re",
          phone: "+972-50-123-4567",
          whatsapp: "+972-50-123-4567",
          bio: "With over 15 years of experience in luxury real estate, Shay has built a reputation for unmatched market knowledge and personalized service. His passion for architecture and design drives the agency's curated approach to property selection.",
          photo: "/images/img8.jpg",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Dana Cohen",
          title: "Senior Agent",
          email: "dana@troitsky.re",
          phone: "+972-50-234-5678",
          whatsapp: "+972-50-234-5678",
          bio: "Dana specializes in luxury waterfront properties and has facilitated over ₪1 billion in transactions. Her deep understanding of Netanya's coastal neighborhoods makes her an invaluable resource for discerning buyers.",
          photo: null,
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Ron Levy",
          title: "Property Consultant",
          email: "ron@troitsky.re",
          phone: "+972-50-345-6789",
          whatsapp: "+972-50-345-6789",
          bio: "Ron's expertise spans investment properties and new developments. He provides data-driven insights to help clients make informed decisions in Netanya's dynamic real estate market.",
          photo: null,
          createdAt: new Date().toISOString(),
        },
      ];
    } else if (tableName === "properties") {
      dbData.properties = [
        {
          id: 1,
          title: "Villa Iris",
          slug: "villa-iris",
          description: "An extraordinary Mediterranean villa perched on Netanya's most prestigious cliffside. Villa Iris features six en-suite bedrooms, a private infinity pool, wine cellar, cinema room, and a 360-degree rooftop terrace with panoramic sea views. The interior showcases imported Italian marble, bespoke woodwork, and smart home automation throughout. The landscaped gardens include an olive grove, outdoor kitchen, and direct beach access via private staircase.",
          shortDescription: "Mediterranean cliffside villa with infinity pool and panoramic sea views",
          address: "12 HaYam Road",
          neighborhood: "Kiryat Hasharon",
          city: "Netanya",
          price: 18500000,
          bedrooms: 6,
          bathrooms: 5,
          areaSqm: 520,
          yearBuilt: 2021,
          propertyType: "villa",
          status: "available",
          featured: true,
          mainImage: "/images/img1.jpg",
          images: ["/images/img2.jpg", "/images/img6.jpg", "/images/img7.jpg"],
          amenities: ["Infinity Pool", "Sea View", "Smart Home", "Wine Cellar", "Cinema Room", "Private Beach Access", "Garden", "Parking"],
          latitude: "32.3251",
          longitude: "34.8530",
          agentId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Penthouse Marina",
          slug: "penthouse-marina",
          description: "The crown jewel of Netanya's seafront, this 340 sqm penthouse offers unobstructed 180-degree Mediterranean views through floor-to-ceiling windows. Four bedrooms, three bathrooms, and an open-plan living area lead to a 120 sqm private terrace with a jacuzzi and outdoor dining area. Imported designer finishes, home automation, and concierge service complete this unparalleled residence.",
          shortDescription: "Seafront penthouse with 180-degree Mediterranean views and private terrace",
          address: "45 HaTayelet Boulevard",
          neighborhood: "Seafront",
          city: "Netanya",
          price: 12800000,
          bedrooms: 4,
          bathrooms: 3,
          areaSqm: 340,
          yearBuilt: 2023,
          propertyType: "penthouse",
          status: "available",
          featured: true,
          mainImage: "/images/img4.jpg",
          images: ["/images/img2.jpg", "/images/img5.jpg"],
          amenities: ["Sea View", "Terrace", "Jacuzzi", "Concierge", "Smart Home", "Parking", "Gym Access"],
          latitude: "32.3285",
          longitude: "34.8515",
          agentId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Garden Apartment Noga",
          slug: "garden-noga",
          description: "A charming garden apartment in the heart of the Noga neighborhood. This 145 sqm home features three bedrooms, two bathrooms, and a private 80 sqm garden perfect for outdoor entertaining. Recently renovated with premium finishes, the apartment offers a perfect blend of indoor comfort and outdoor living in one of Netanya's most vibrant areas.",
          shortDescription: "Garden apartment with private outdoor space in vibrant Noga neighborhood",
          address: "8 Noga Street",
          neighborhood: "Noga",
          city: "Netanya",
          price: 4500000,
          bedrooms: 3,
          bathrooms: 2,
          areaSqm: 145,
          yearBuilt: 2018,
          propertyType: "apartment",
          status: "available",
          featured: false,
          mainImage: "/images/img2.jpg",
          images: ["/images/img6.jpg"],
          amenities: ["Garden", "Renovated", "Parking", "Storage"],
          latitude: "32.3200",
          longitude: "34.8580",
          agentId: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 4,
          title: "Luxury Duplex Ramat Poleg",
          slug: "duplex-poleg",
          description: "A stunning duplex in Ramat Poleg offering 280 sqm of luxury living across two floors. Five bedrooms, four bathrooms, and expansive living spaces make this ideal for families. The home features a private elevator, rooftop terrace with sea glimpses, and proximity to top schools and the beach.",
          shortDescription: "Family duplex with private elevator and rooftop terrace",
          address: "23 Poleg Heights",
          neighborhood: "Ramat Poleg",
          city: "Netanya",
          price: 7200000,
          bedrooms: 5,
          bathrooms: 4,
          areaSqm: 280,
          yearBuilt: 2020,
          propertyType: "duplex",
          status: "available",
          featured: true,
          mainImage: "/images/img5.jpg",
          images: ["/images/img1.jpg", "/images/img7.jpg"],
          amenities: ["Private Elevator", "Rooftop Terrace", "Sea View", "Parking", "Storage"],
          latitude: "32.2750",
          longitude: "34.8350",
          agentId: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 5,
          title: "Sea View Studio",
          slug: "studio-sea",
          description: "A compact luxury studio in a prime seafront building, perfect as a vacation home or investment property. The 55 sqm space has been intelligently designed to maximize comfort and views, with a Murphy bed system, fully equipped kitchen, and balcony overlooking the Mediterranean.",
          shortDescription: "Compact luxury studio with sea views, ideal vacation home",
          address: "67 HaTayelet Boulevard",
          neighborhood: "Seafront",
          city: "Netanya",
          price: 2800000,
          bedrooms: 1,
          bathrooms: 1,
          areaSqm: 55,
          yearBuilt: 2022,
          propertyType: "studio",
          status: "available",
          featured: false,
          mainImage: "/images/img3.jpg",
          images: [],
          amenities: ["Sea View", "Balcony", "Furnished", "Gym Access"],
          latitude: "32.3290",
          longitude: "34.8520",
          agentId: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 6,
          title: "Modern Family Home",
          slug: "family-home",
          description: "A contemporary family residence in Kiryat Hasharon featuring five bedrooms, three bathrooms, and 380 sqm of living space. The home centers around an open-plan kitchen and living area with sliding glass doors opening to a covered patio and landscaped garden. Premium finishes include underfloor heating, solar panels, and a double garage.",
          shortDescription: "Contemporary family home with garden and premium finishes",
          address: "18 HaZahav Street",
          neighborhood: "Kiryat Hasharon",
          city: "Netanya",
          price: 9800000,
          bedrooms: 5,
          bathrooms: 3,
          areaSqm: 380,
          yearBuilt: 2022,
          propertyType: "villa",
          status: "available",
          featured: true,
          mainImage: "/images/img7.jpg",
          images: ["/images/img6.jpg", "/images/img2.jpg"],
          amenities: ["Garden", "Underfloor Heating", "Solar Panels", "Double Garage", "Covered Patio"],
          latitude: "32.3260",
          longitude: "34.8540",
          agentId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 7,
          title: "Executive Apartment",
          slug: "exec-apartment",
          description: "An elegant three-bedroom apartment in Netanya's city center, ideal for professionals seeking luxury and convenience. The 160 sqm residence features a chef's kitchen, master suite with walk-in closet, and a spacious balcony. Walking distance to cafes, boutiques, and the promenade.",
          shortDescription: "Elegant city-center apartment steps from the promenade",
          address: "5 Herzl Street",
          neighborhood: "City Center",
          city: "Netanya",
          price: 5600000,
          bedrooms: 3,
          bathrooms: 2,
          areaSqm: 160,
          yearBuilt: 2019,
          propertyType: "apartment",
          status: "available",
          featured: false,
          mainImage: "/images/img6.jpg",
          images: ["/images/img5.jpg"],
          amenities: ["City Center", "Balcony", "Walk-in Closet", "Chef Kitchen", "Parking"],
          latitude: "32.3220",
          longitude: "34.8560",
          agentId: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 8,
          title: "Beachfront Penthouse",
          slug: "beach-penthouse",
          description: "The ultimate beachfront penthouse spanning 400 sqm with four bedrooms, four bathrooms, and a 200 sqm wraparound terrace. Direct beach access, private pool, outdoor kitchen, and uninterrupted sea views make this Netanya's most coveted address. Interior design by renowned studio with imported materials.",
          shortDescription: "Ultimate beachfront penthouse with private pool and direct beach access",
          address: "1 Tayelet Ha'ir",
          neighborhood: "Seafront",
          city: "Netanya",
          price: 15800000,
          bedrooms: 4,
          bathrooms: 4,
          areaSqm: 400,
          yearBuilt: 2024,
          propertyType: "penthouse",
          status: "available",
          featured: true,
          mainImage: "/images/img1.jpg",
          images: ["/images/img4.jpg", "/images/img7.jpg", "/images/img2.jpg"],
          amenities: ["Private Pool", "Direct Beach Access", "Sea View", "Terrace", "Outdoor Kitchen", "Smart Home", "Concierge"],
          latitude: "32.3300",
          longitude: "34.8500",
          agentId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    } else if (tableName === "blogPosts") {
      dbData.blogPosts = [
        {
          id: 1,
          title: "2026 Netanya Real Estate Market Outlook",
          slug: "market-outlook-2026",
          excerpt: "An in-depth analysis of Netanya's luxury property market trends for 2026, including price forecasts and emerging neighborhoods.",
          content: "Netanya's luxury real estate market continues to show remarkable resilience and growth potential as we enter 2026. After a period of stabilization, premium properties in coastal neighborhoods have seen average price increases of 8-12% year-over-year. The demand for seafront properties remains exceptionally strong, with limited inventory driving competitive bidding situations. Emerging neighborhoods like Ramat Poleg and Noga are attracting increased interest from both domestic and international buyers seeking value without compromising on lifestyle amenities. Infrastructure improvements, including the expanded coastal promenade and upgraded transportation links, are expected to further enhance property values across all segments.",
          category: "Market Insights",
          coverImage: "/images/img11.jpg",
          authorId: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Guide to Buying Property in Israel",
          slug: "buying-guide-israel",
          excerpt: "Everything international buyers need to know about purchasing property in Israel, from legal requirements to financing options.",
          content: "Purchasing property in Israel as a foreign buyer involves navigating specific legal and financial frameworks that differ from many other countries. The process typically begins with engaging a licensed real estate agent and attorney who specializes in international transactions. Key considerations include understanding the purchase tax structure, which varies based on residency status and property value, securing financing through Israeli banks that offer competitive mortgage rates, and conducting thorough due diligence on property titles and any existing liens. Foreign buyers are generally permitted to purchase most residential properties without restrictions, though properties classified as agricultural land may require special approval.",
          category: "Buying Guide",
          coverImage: "/images/img13.jpg",
          authorId: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Top Neighborhoods in Netanya",
          slug: "top-neighborhoods-netanya",
          excerpt: "Discover Netanya's most desirable neighborhoods, each offering a unique lifestyle and property investment potential.",
          content: "Netanya's diverse neighborhoods each offer distinct characters and lifestyle advantages. Kiryat Hasharon, perched on the northern cliffs, is renowned for its luxury villas and breathtaking sea views. The Seafront district features high-end apartments and penthouses with direct beach access and vibrant promenade life. Ramat Poleg in the south attracts families with its newer developments, excellent schools, and spacious properties. The revitalized Noga neighborhood offers a trendy urban atmosphere with boutique residences and proximity to the city's cultural heart. For those seeking tranquility, the surrounding areas provide more affordable options while maintaining easy access to the city center.",
          category: "Neighborhoods",
          coverImage: "/images/img3.jpg",
          authorId: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 4,
          title: "Investment Properties: What to Look For",
          slug: "investment-properties-guide",
          excerpt: "Key factors to consider when evaluating investment properties in Netanya's competitive real estate market.",
          content: "Successful real estate investment in Netanya requires a strategic approach that balances location, property type, and market timing. Properties in established luxury areas like Kiryat Hasharon and the Seafront have historically demonstrated strong capital appreciation, while emerging neighborhoods offer higher rental yield potential. Investors should prioritize properties with unique features that differentiate them in the market — sea views, proximity to beaches, modern amenities, and quality construction. Short-term vacation rentals are increasingly popular, particularly for seafront studios and penthouses, generating attractive returns during peak seasons. Working with an experienced local agent who understands market dynamics is essential for identifying undervalued opportunities.",
          category: "Investment",
          coverImage: "/images/img14.jpg",
          authorId: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    } else {
      dbData[tableName] = [];
    }
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(dbData, null, 2), "utf-8");
  }

  return dbData[tableName];
}

function saveMockData(tableName: string, data: any[]) {
  let dbData: any = {};
  if (fs.existsSync(MOCK_DB_PATH)) {
    try {
      dbData = JSON.parse(fs.readFileSync(MOCK_DB_PATH, "utf-8"));
    } catch (e) {
      dbData = {};
    }
  }
  dbData[tableName] = data;
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(dbData, null, 2), "utf-8");
}

function getTableName(table: any): string {
  if (table === schema.users) return "users";
  if (table === schema.agents) return "agents";
  if (table === schema.properties) return "properties";
  if (table === schema.blogPosts) return "blogPosts";
  if (table === schema.inquiries) return "inquiries";
  if (table === schema.contactSubmissions) return "contactSubmissions";
  return "unknown";
}

function extractValue(operand: any): any {
  if (operand === null || operand === undefined) return operand;
  if (typeof operand === "object") {
    if ("value" in operand) return operand.value;
  }
  return operand;
}

function evaluateCondition(item: any, cond: any): boolean {
  if (!cond) return true;
  
  if (Array.isArray(cond.conditions)) {
    const isOr = cond.operator === "or" || cond.constructor?.name === "Or";
    if (isOr) {
      return cond.conditions.some((c: any) => evaluateCondition(item, c));
    } else {
      return cond.conditions.every((c: any) => evaluateCondition(item, c));
    }
  }
  
  const leftName = cond.left?.name;
  if (!leftName) return true;
  
  const rightVal = extractValue(cond.right);
  const itemVal = item[leftName];
  
  const op = cond.operator || cond.constructor?.name;
  
  if (op === "=" || op === "Eq") {
    return itemVal === rightVal;
  }
  if (op === ">=" || op === "Gte") {
    return itemVal >= rightVal;
  }
  if (op === "<=" || op === "Lte") {
    return itemVal <= rightVal;
  }
  if (op === "like" || op === "Like") {
    if (typeof rightVal !== "string") return false;
    const searchPattern = rightVal.replace(/%/g, "").toLowerCase();
    return String(itemVal || "").toLowerCase().includes(searchPattern);
  }
  
  return true;
}

class QueryBuilder {
  private tableName: string = "unknown";
  private selectFields: any;
  private whereClause: any;
  private orderClause: any;
  private limitCount: number | null = null;
  private offsetCount: number | null = null;
  private groupClause: any;

  constructor(selectFields: any) {
    this.selectFields = selectFields;
  }

  from(table: any) {
    this.tableName = getTableName(table);
    return this;
  }

  where(clause: any) {
    this.whereClause = clause;
    return this;
  }

  orderBy(clause: any) {
    this.orderClause = clause;
    return this;
  }

  limit(n: number) {
    this.limitCount = n;
    return this;
  }

  offset(n: number) {
    this.offsetCount = n;
    return this;
  }

  groupBy(clause: any) {
    this.groupClause = clause;
    return this;
  }

  async then(resolve: any, reject?: any) {
    try {
      const data = getMockData(this.tableName);
      let results = [...data];

      if (this.whereClause) {
        results = results.filter(item => evaluateCondition(item, this.whereClause));
      }

      if (this.groupClause) {
        if (this.tableName === "blogPosts") {
          const cats = Array.from(new Set(results.map(r => r.category)));
          return resolve(cats.map(cat => ({ category: cat })));
        } else if (this.tableName === "properties") {
          const isNeighborhood = this.selectFields && "name" in this.selectFields;
          const isType = this.selectFields && "type" in this.selectFields;
          if (isNeighborhood) {
            const counts: Record<string, number> = {};
            results.forEach(p => {
              counts[p.neighborhood] = (counts[p.neighborhood] || 0) + 1;
            });
            const mapped = Object.entries(counts).map(([name, count]) => ({ name, count }));
            mapped.sort((a, b) => b.count - a.count);
            return resolve(mapped);
          } else if (isType) {
            const counts: Record<string, number> = {};
            results.forEach(p => {
              counts[p.propertyType] = (counts[p.propertyType] || 0) + 1;
            });
            const mapped = Object.entries(counts).map(([type, count]) => ({ type, count }));
            mapped.sort((a, b) => b.count - a.count);
            return resolve(mapped);
          }
        }
      }

      const isCountQuery = this.selectFields && 
        Object.values(this.selectFields).some((val: any) => 
          val && (val.constructor?.name === "Count" || typeof val === "function" || (val.map && typeof val.map === "function") || (typeof val === "object" && val.name === "count"))
        );
      
      if (isCountQuery) {
        return resolve([{ value: results.length }]);
      }

      if (this.orderClause) {
        let columnName = "createdAt";
        let isDesc = false;

        const clause = Array.isArray(this.orderClause) ? this.orderClause[0] : this.orderClause;
        if (clause) {
          if (clause.column?.name) {
            columnName = clause.column.name;
            isDesc = clause.direction === "desc" || clause.constructor?.name === "Desc";
          } else if (clause.name) {
            columnName = clause.name;
          }
        }

        results.sort((a, b) => {
          let valA = a[columnName];
          let valB = b[columnName];

          if (valA instanceof Date) valA = valA.getTime();
          if (valB instanceof Date) valB = valB.getTime();

          if (valA === valB) return 0;
          if (valA < valB) return isDesc ? 1 : -1;
          return isDesc ? -1 : 1;
        });
      }

      if (this.offsetCount !== null) {
        results = results.slice(this.offsetCount);
      }

      if (this.limitCount !== null) {
        results = results.slice(0, this.limitCount);
      }

      resolve(results);
    } catch (err) {
      if (reject) reject(err);
      else throw err;
    }
  }
}

class InsertBuilder {
  private tableName: string;
  constructor(table: any) {
    this.tableName = getTableName(table);
  }

  values(data: any) {
    const dataArray = Array.isArray(data) ? data : [data];
    const mockData = getMockData(this.tableName);

    const insertedRows: any[] = [];
    for (const item of dataArray) {
      const newId = mockData.length > 0 ? Math.max(...mockData.map(r => r.id || 0)) + 1 : 1;
      const newItem = {
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...item
      };
      mockData.push(newItem);
      insertedRows.push(newItem);
    }

    saveMockData(this.tableName, mockData);

    const resultObj = [{ insertId: String(insertedRows[0]?.id || 0) }];
    
    return {
      then: (resolve: any) => resolve(resultObj),
      onDuplicateKeyUpdate: ({ set }: any) => {
        const unionId = dataArray[0]?.unionId;
        const existingIndex = mockData.findIndex(r => r.unionId === unionId);
        if (existingIndex !== -1) {
          mockData[existingIndex] = {
            ...mockData[existingIndex],
            ...set,
            updatedAt: new Date().toISOString()
          };
          saveMockData(this.tableName, mockData);
        } else {
          const newId = mockData.length > 0 ? Math.max(...mockData.map(r => r.id || 0)) + 1 : 1;
          mockData.push({
            id: newId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...dataArray[0]
          });
          saveMockData(this.tableName, mockData);
        }
        return {
          then: (resolve: any) => resolve([{ insertId: "0" }])
        };
      }
    };
  }
}

class UpdateBuilder {
  private tableName: string;
  private updateData: any;
  private whereClause: any;

  constructor(table: any) {
    this.tableName = getTableName(table);
  }

  set(data: any) {
    this.updateData = data;
    return this;
  }

  where(clause: any) {
    this.whereClause = clause;
    return this;
  }

  async then(resolve: any, reject?: any) {
    try {
      const mockData = getMockData(this.tableName);
      let updatedCount = 0;

      for (let i = 0; i < mockData.length; i++) {
        if (!this.whereClause || evaluateCondition(mockData[i], this.whereClause)) {
          mockData[i] = {
            ...mockData[i],
            ...this.updateData,
            updatedAt: new Date().toISOString()
          };
          updatedCount++;
        }
      }

      saveMockData(this.tableName, mockData);
      resolve({ affectedRows: updatedCount });
    } catch (err) {
      if (reject) reject(err);
      else throw err;
    }
  }
}

class DeleteBuilder {
  private tableName: string;
  private whereClause: any;

  constructor(table: any) {
    this.tableName = getTableName(table);
  }

  where(clause: any) {
    this.whereClause = clause;
    return this;
  }

  async then(resolve: any, reject?: any) {
    try {
      const mockData = getMockData(this.tableName);
      const originalLength = mockData.length;
      
      const filtered = mockData.filter(item => {
        if (this.whereClause && evaluateCondition(item, this.whereClause)) {
          return false;
        }
        return true;
      });

      saveMockData(this.tableName, filtered);
      resolve({ affectedRows: originalLength - filtered.length });
    } catch (err) {
      if (reject) reject(err);
      else throw err;
    }
  }
}

const mockDb = {
  select: (fields: any) => new QueryBuilder(fields),
  insert: (table: any) => new InsertBuilder(table),
  update: (table: any) => new UpdateBuilder(table),
  delete: (table: any) => new DeleteBuilder(table),
};

export function getDb() {
  if (!env.databaseUrl) {
    return mockDb as any;
  }
  if (!instance) {
    instance = drizzle(env.databaseUrl, {
      mode: "planetscale",
      schema: fullSchema,
    });
  }
  return instance;
}
