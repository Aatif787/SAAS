// Proxy middleware for Next.js 16 to route requests to the nested Hono estate backend
import { NextRequest, NextResponse } from "next/server";

type SessionPayload = {
  userId: string;
  email: string;
  role: string;
  exp?: number;
};

function decodeToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad) {
      base64 += "=".repeat(4 - pad);
    }
    
    const payloadJson = atob(base64);
    const payload = JSON.parse(payloadJson);
    
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

const ESTATE_BACKEND = process.env.ESTATE_BACKEND || "http://localhost:3005";
const protectedRoutes = ["/dashboard", "/admin"];

// Vite dev server paths that need proxying when referenced from estate pages
const VITE_PATHS = ["/@vite/", "/@fs/", "/@react-refresh", "/node_modules/.vite/", "/node_modules/", "/src/"];
// Static asset paths from estate's public directory
const ESTATE_ASSET_PATHS = ["/images/", "/videos/"];

function isEstateReferer(request: NextRequest): boolean {
  const referer = request.headers.get("referer") || "";
  try {
    const url = new URL(referer);
    const refPath = url.pathname;
    return (
      refPath.startsWith("/estate") ||
      refPath.startsWith("/node_modules/") ||
      refPath.startsWith("/src/") ||
      refPath.startsWith("/@vite/") ||
      refPath.startsWith("/@fs/") ||
      refPath.startsWith("/@react-refresh")
    );
  } catch {
    return referer.includes("/estate");
  }
}

async function proxyToEstate(targetPath: string, request: NextRequest): Promise<NextResponse> {
  const targetUrl = `${ESTATE_BACKEND}${targetPath}${request.nextUrl.search}`;

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") {
      headers[key] = value;
    }
  });

  const fetchInit: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    fetchInit.body = await request.arrayBuffer();
  }

  const proxyRes = await fetch(targetUrl, fetchInit);

  const response = new NextResponse(proxyRes.body, {
    status: proxyRes.status,
    statusText: proxyRes.statusText,
  });

  const skipHeaders = new Set(["content-encoding", "transfer-encoding"]);
  proxyRes.headers.forEach((value, key) => {
    if (!skipHeaders.has(key.toLowerCase())) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Auth Protection for /dashboard and /admin
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtected) {
    const token = request.cookies.get("session_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = decodeToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session_token");
      return response;
    }

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 2) /estate and /estate/* requests
  if (pathname === "/estate" || pathname.startsWith("/estate/")) {
    const backendPath = pathname === "/estate" ? "/" : pathname.slice("/estate".length);

    try {
      const targetUrl = `${ESTATE_BACKEND}${backendPath}${request.nextUrl.search}`;

      const headers: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "host") {
          headers[key] = value;
        }
      });

      const proxyRes = await fetch(targetUrl, {
        method: request.method,
        headers,
      });

      const contentType = proxyRes.headers.get("content-type") || "";

      if (contentType.includes("text/html")) {
        let html = await proxyRes.text();

        // Rewrite script src attributes
        html = html.replace(
          /(<script[^>]*\ssrc=")\/(src\/|@vite\/|@react-refresh)/g,
          '$1/estate/$2'
        );

        // Rewrite inline imports in <script> blocks
        html = html.replace(
          /from\s+"\/(@react-refresh|@vite\/[^"]*|src\/[^"]*)"/g,
          'from "/estate/$1"'
        );
        html = html.replace(
          /import\s+"\/(@react-refresh|@vite\/[^"]*|src\/[^"]*)"/g,
          'import "/estate/$1"'
        );

        const response = new NextResponse(html, {
          status: proxyRes.status,
          statusText: proxyRes.statusText,
        });

        proxyRes.headers.forEach((value, key) => {
          if (!["content-encoding", "content-length", "transfer-encoding"].includes(key.toLowerCase())) {
            response.headers.set(key, value);
          }
        });
        response.headers.set("content-type", "text/html; charset=utf-8");
        return response;
      }

      return await proxyToEstate(backendPath, request);
    } catch {
      return new NextResponse("Estate service unavailable", { status: 502 });
    }
  }

  // 3) Vite dev paths referenced from estate context
  const matchesVitePath = VITE_PATHS.some((p) => pathname.startsWith(p));
  if (matchesVitePath) {
    try {
      return await proxyToEstate(pathname, request);
    } catch {
      return NextResponse.next();
    }
  }

  // 4) Static assets from estate context
  const matchesAssetPath = ESTATE_ASSET_PATHS.some((p) => pathname.startsWith(p));
  if (matchesAssetPath && isEstateReferer(request)) {
    try {
      return await proxyToEstate(pathname, request);
    } catch {
      return NextResponse.next();
    }
  }

  // 5) API tRPC from estate context
  if (pathname.startsWith("/api/trpc") && isEstateReferer(request)) {
    try {
      return await proxyToEstate(pathname, request);
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Auth routes
    "/dashboard/:path*",
    "/admin/:path*",
    // Estate app
    "/estate",
    "/estate/:path*",
    // Vite dev server paths
    "/@vite/:path*",
    "/@fs/:path*",
    "/@react-refresh",
    "/node_modules/:path*",
    "/src/:path*",
    // Static assets
    "/images/:path*",
    "/videos/:path*",
    // Estate API
    "/api/trpc/:path*",
  ],
};
