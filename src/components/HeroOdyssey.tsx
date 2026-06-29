import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 217,
  xOffset = 0,
  speed = 1.6,
  intensity = 0.6,
  size = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      #define OCTAVE_COUNT 10
      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }
      float hash11(float p) { p=fract(p*.1031); p*=p+33.33; p*=p+p; return fract(p); }
      float hash12(vec2 p) {
        vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33);
        return fract((p3.x+p3.y)*p3.z);
      }
      mat2 rotate2d(float theta) { float c=cos(theta),s=sin(theta); return mat2(c,-s,s,c); }
      float noise(vec2 p) {
        vec2 ip=floor(p),fp=fract(p);
        float a=hash12(ip),b=hash12(ip+vec2(1,0)),c2=hash12(ip+vec2(0,1)),d=hash12(ip+vec2(1,1));
        vec2 t=smoothstep(0.0,1.0,fp);
        return mix(mix(a,b,t.x),mix(c2,d,t.x),t.y);
      }
      float fbm(vec2 p) {
        float value=0.0,amplitude=0.5;
        for(int i=0;i<OCTAVE_COUNT;++i){value+=amplitude*noise(p);p*=rotate2d(0.45);p*=2.0;amplitude*=0.5;}
        return value;
      }
      void main() {
        vec2 uv=gl_FragCoord.xy/iResolution.xy;
        uv=2.0*uv-1.0; uv.x*=iResolution.x/iResolution.y; uv.x+=uXOffset;
        uv+=2.0*fbm(uv*uSize+0.8*iTime*uSpeed)-1.0;
        float dist=abs(uv.x);
        vec3 baseColor=hsv2rgb(vec3(uHue/360.0,0.7,0.9));
        vec3 col=baseColor*pow(mix(0.0,0.07,hash11(iTime*uSpeed))/dist,1.0)*uIntensity;
        gl_FragColor=vec4(col,1.0);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uHueLoc = gl.getUniformLocation(program, "uHue");
    const uXOff = gl.getUniformLocation(program, "uXOffset");
    const uSpd = gl.getUniformLocation(program, "uSpeed");
    const uInt = gl.getUniformLocation(program, "uIntensity");
    const uSz = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    let rafId: number;
    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - startTime) / 1000);
      gl.uniform1f(uHueLoc, hue);
      gl.uniform1f(uXOff, xOffset);
      gl.uniform1f(uSpd, speed);
      gl.uniform1f(uInt, intensity);
      gl.uniform1f(uSz, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafId);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};
const item = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

interface HeroOdysseyProps {
  typingText: string;
  onCta: () => void;
  onPricing: () => void;
}

export const HeroOdyssey: React.FC<HeroOdysseyProps> = ({ typingText, onCta, onPricing }) => {
  const SORA: React.CSSProperties = { fontFamily: "'Sora', sans-serif" };
  const INTER: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#030812", overflow: "hidden" }}>
      {/* WebGL Lightning background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(3,8,18,0.72)" }} />
        {/* Glow sphere */}
        <div style={{ position: "absolute", top: "52%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle at 25% 90%, hsl(217,60%,14%) 15%, #000000de 70%, #000000ed 100%)", backdropFilter: "blur(48px)", zIndex: 1 }} />
        {/* Lightning shader */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", height: "100%", zIndex: 2 }}>
          <Lightning hue={217} xOffset={0} speed={0.6} intensity={0.35} size={2} />
        </div>
        {/* Second lightning offset */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", height: "100%", zIndex: 2, opacity: 0.25 }}>
          <Lightning hue={263} xOffset={0.3} speed={0.45} intensity={0.28} size={2.4} />
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(100px,14vw,160px) 24px 60px" }}>
        <motion.div variants={container} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 820 }}>

          {/* Badge */}
          <motion.div variants={item}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "6px 16px", borderRadius: 999, border: "1px solid hsl(217,91%,60%,0.25)", background: "hsl(217,91%,60%,0.08)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(217,91%,60%)", boxShadow: "0 0 8px hsl(217,91%,60%)" }} />
              <span style={{ ...INTER, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(217,91%,65%)" }}>Agence Web</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={item} style={{ ...SORA, fontSize: "clamp(52px,8vw,96px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 4px" }}>
            Votre site
          </motion.h1>

          {/* Typing line */}
          <motion.div variants={item} style={{ minHeight: "clamp(56px,8vw,100px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
            <span style={{ ...SORA, fontSize: "clamp(44px,7vw,84px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,80%,72%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {typingText || " "}
              <span style={{ display: "inline-block", width: "0.08em", height: "1em", background: "hsl(217,91%,66%)", borderRadius: 2, marginLeft: "0.05em", animation: "blink 1s step-end infinite", verticalAlign: "text-bottom", WebkitTextFillColor: "initial" }} />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={item} style={{ ...INTER, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.75, color: "hsl(215,20%,62%)", maxWidth: 620, margin: "0 0 44px" }}>
            Artisan, indépendant ou petite structure.&nbsp;
            <span style={{ color: "hsl(210,40%,92%)", fontWeight: 500 }}>Fluxa conçoit votre site professionnel</span>, rapide et soigné, livré clé en main.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
            <button onClick={onCta} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 14, fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,hsl(217,91%,58%),hsl(217,77%,44%))", boxShadow: "0 16px 40px -12px hsl(217,91%,60%,.55)", border: "none", cursor: "pointer", overflow: "hidden", transition: "all .3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              Demander un devis gratuit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={onPricing} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 28px", borderRadius: 14, fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600, color: "hsl(210,40%,92%)", background: "hsl(217,91%,60%,.06)", border: "1px solid hsl(217,91%,60%,.18)", cursor: "pointer", transition: "all .25s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = "hsl(217,91%,60%,.12)"; e.currentTarget.style.borderColor = "hsl(217,91%,60%,.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "hsl(217,91%,60%,.06)"; e.currentTarget.style.borderColor = "hsl(217,91%,60%,.18)"; }}>
              Voir les tarifs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 20 }}>
            {[
              { icon: "📱", label: "100% responsive" },
              { icon: "📈", label: "Visible sur Google" },
              { icon: "💰", label: "À partir de 890 € tout compris" },
            ].map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", background: "hsl(215,20%,22%)" }} />}
                <span style={{ ...INTER, fontSize: 12, fontWeight: 500, color: "hsl(215,20%,45%)" }}>{b.label}</span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
