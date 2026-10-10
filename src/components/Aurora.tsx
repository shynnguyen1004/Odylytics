// Adapted from React Bits <Aurora /> (https://reactbits.dev, MIT): plain CSS instead of
// Tailwind, ResizeObserver sizing, paused while off-screen, single frame under reduced motion.
import { useEffect, useRef, useState } from 'react'
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;
uniform float uFlip;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  if (uFlip > 0.5) uv.y = 1.0 - uv.y;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`

const DEFAULT_STOPS: [string, string, string] = ['#FF8C00', '#AE0BFF', '#AE0BFF']

type AuroraProps = {
  /** Three hex colours, left → right. */
  colorStops?: [string, string, string]
  amplitude?: number
  blend?: number
  speed?: number
  lightMode?: boolean
  /** Anchor the aurora to the bottom edge instead of the top. */
  flip?: boolean
  /** Render one still frame instead of animating. */
  paused?: boolean
  className?: string
}

function supportsWebgl2() {
  const gl = document.createElement('canvas').getContext('webgl2')
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
  return gl !== null
}

const toRgb = (stops: readonly string[]) =>
  stops.map((hex) => {
    const c = new Color(hex)
    return [c.r, c.g, c.b]
  })

export function Aurora(props: AuroraProps) {
  const { className = '' } = props
  const propsRef = useRef(props)
  const ctnRef = useRef<HTMLDivElement>(null)
  const redrawRef = useRef<(() => void) | null>(null)
  // Without WebGL2 the shader can't compile; fall back to the CSS .aurora gradient.
  const [unsupported] = useState(() => !supportsWebgl2())

  useEffect(() => {
    propsRef.current = props
  })

  useEffect(() => {
    const ctn = ctnRef.current
    if (!ctn || unsupported) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    const initial = propsRef.current
    let stopsKey = (initial.colorStops ?? DEFAULT_STOPS).join()
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: initial.amplitude ?? 1 },
        uColorStops: { value: toRgb(initial.colorStops ?? DEFAULT_STOPS) },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: initial.blend ?? 0.5 },
        uLightMode: { value: initial.lightMode ? 1 : 0 },
        uFlip: { value: initial.flip ? 1 : 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas)

    const render = (t: number) => {
      const { speed = 1, amplitude = 1, blend = 0.5, lightMode = false, flip = false, colorStops = DEFAULT_STOPS } = propsRef.current
      program.uniforms.uTime.value = t * 0.01 * speed * 0.1
      program.uniforms.uAmplitude.value = amplitude
      program.uniforms.uBlend.value = blend
      program.uniforms.uLightMode.value = lightMode ? 1 : 0
      program.uniforms.uFlip.value = flip ? 1 : 0
      const key = colorStops.join()
      if (key !== stopsKey) {
        stopsKey = key
        program.uniforms.uColorStops.value = toRgb(colorStops)
      }
      renderer.render({ scene: mesh })
    }

    const resize = () => {
      const width = ctn.offsetWidth
      const height = ctn.offsetHeight
      renderer.setSize(width, height)
      program.uniforms.uResolution.value = [width, height]
      render(performance.now())
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(ctn)

    let frame = 0
    let visible = true
    const loop = (t: number) => {
      render(t)
      frame = propsRef.current.paused || !visible ? 0 : requestAnimationFrame(loop)
    }
    const start = () => {
      if (!frame && !propsRef.current.paused && visible) frame = requestAnimationFrame(loop)
    }
    // Stop the GPU loop while the hero is scrolled away.
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    intersection.observe(ctn)
    resize()
    start()
    redrawRef.current = () => {
      render(performance.now())
      start()
    }

    return () => {
      redrawRef.current = null
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [unsupported])

  // Prop changes (theme, reduced motion) need a redraw even while the loop is stopped.
  useEffect(() => {
    redrawRef.current?.()
  }, [props.paused, props.lightMode, props.flip, props.colorStops, props.amplitude, props.blend])

  return <div ref={ctnRef} className={`aurora-gl${unsupported ? ' aurora' : ''} ${className}`.trim()} aria-hidden="true" />
}
