"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SteelWebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup ThreeJS Environment
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Custom GLSL Shader Material for Liquid Chrome Nanotech Grid
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;
      varying vec2 vUv;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        vec3 col = 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
        
        // Displace coordinate space by mouse and scroll
        vec2 mouseDist = uv - uMouse;
        float mouseForce = 1.0 / (dot(mouseDist, mouseDist) * 12.0 + 1.0);
        vec2 displacedUv = uv + mouseDist * mouseForce * 0.15;
        
        // Dynamic fractal movement
        float noise = snoise(displacedUv * 1.5 + vec2(0.0, uTime * 0.2));
        noise += snoise(displacedUv * 3.0 - vec2(uTime * 0.1, uTime * 0.15)) * 0.5;
        noise += snoise(displacedUv * 6.0 + vec2(uTime * 0.3, 0.0)) * 0.25;
        noise = noise * 0.5 + 0.5;

        // Normal map creation from noise
        vec2 eps = vec2(0.01, 0.0);
        float n_l = snoise((displacedUv - eps) * 1.5);
        float n_r = snoise((displacedUv + eps) * 1.5);
        float n_d = snoise((displacedUv - eps.yx) * 1.5);
        float n_u = snoise((displacedUv + eps.yx) * 1.5);
        vec3 normal = normalize(vec3(n_l - n_r, n_d - n_u, 0.2));

        // Light setups (Futuristic Orange & Slate reflection)
        vec3 lightPos1 = vec3(2.0, 3.0, 5.0);
        vec3 lightPos2 = vec3(-3.0, -2.0, 4.0);
        
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 lightDir1 = normalize(lightPos1 - vec3(uv, 0.0));
        vec3 lightDir2 = normalize(lightPos2 - vec3(uv, 0.0));
        
        float diff1 = max(dot(normal, lightDir1), 0.0);
        float diff2 = max(dot(normal, lightDir2), 0.0);
        
        // Chromatic reflection calculations
        vec3 orangeLight = vec3(0.917, 0.345, 0.047); // Corporate EA580C
        vec3 greenGlow = vec3(0.0, 0.78, 0.32);
        
        // Liquid Chrome Base color (hyper-realistic reflecting environment)
        vec3 baseChrome = vec3(0.96, 0.96, 0.98);
        vec3 metalColor = mix(baseChrome, orangeLight, diff1 * 0.8 + uScroll * 0.4);
        metalColor = mix(metalColor, greenGlow, diff2 * 0.5);

        // Specular reflections
        vec3 halfDir1 = normalize(lightDir1 + viewDir);
        float spec1 = pow(max(dot(normal, halfDir1), 0.0), 32.0);
        metalColor += vec3(1.0) * spec1 * 0.8;

        // Holographic Architectural Laser Grid overlay
        vec2 gridUv = fract(displacedUv * 8.0 - vec2(0.0, uScroll * 2.0));
        float gridLine = smoothstep(0.98, 1.0, gridUv.x) + smoothstep(0.98, 1.0, gridUv.y);
        vec3 gridColor = orangeLight * gridLine * (0.15 + mouseForce * 0.6);

        vec3 finalColor = mix(metalColor, gridColor, gridLine * 0.4);
        
        // Ambient glow around mouse intersection
        float glow = smoothstep(0.8, 0.0, length(mouseDist));
        finalColor += orangeLight * glow * 0.22;

        // Soft vignetting
        vec2 uvVignette = gl_FragCoord.xy / uResolution.xy;
        float vignette = uvVignette.x * uvVignette.y * (1.0 - uvVignette.x) * (1.0 - uvVignette.y);
        vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor * vignette, 0.38); // Blend with page
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(-9999, -9999) },
      uScroll: { value: 0 },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(mesh);

    // 3. Floating Interactive Spline Particles over the chrome plane
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = 0;
      speeds[i] = 0.002 + Math.random() * 0.003;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xea580c,
      size: 0.008,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Input Listeners
    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);
    onResize();

    let targetMouse = new THREE.Vector2(-9999, -9999);
    const onMouseMove = (e: MouseEvent) => {
      // Map to -1 to 1 based on screen resolution aspect ratio
      const aspect = container.clientWidth / container.clientHeight;
      targetMouse.x = ((e.clientX / window.innerWidth) * 2 - 1) * aspect;
      targetMouse.y = (-(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let targetScroll = 0;
    const onScroll = () => {
      targetScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 5. Render/Animation Loop
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth interpolations
      uniforms.uTime.value = elapsed;
      uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.08;
      
      if (targetMouse.x !== -9999) {
        uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.08;
        uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.08;
      }

      // Update particle positions (downward industrial flow)
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] -= speeds[i] + uniforms.uScroll.value * 0.01; // Scroll speed multiplier
        if (posArray[i * 3 + 1] < -1) {
          posArray[i * 3 + 1] = 1;
          posArray[i * 3] = (Math.random() - 0.5) * 2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      shaderMaterial.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.45]"
    />
  );
}
