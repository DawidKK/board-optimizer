import { Edges, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo, useEffect, useMemo, useState } from 'react'

type CabinetPart = {
  key: string
  name: string
  position: [number, number, number]
  size: [number, number, number]
}

const CABINET_PARTS: CabinetPart[] = [
  {
    key: 'left-side',
    name: 'lewy bok',
    position: [-0.92, 0, 0],
    size: [0.08, 2.2, 1.2],
  },
  {
    key: 'right-side',
    name: 'prawy bok',
    position: [0.92, 0, 0],
    size: [0.08, 2.2, 1.2],
  },
  {
    key: 'bottom',
    name: 'dół',
    position: [0, -1.06, 0],
    size: [1.76, 0.08, 1.2],
  },
  {
    key: 'top',
    name: 'góra',
    position: [0, 1.06, 0],
    size: [1.76, 0.08, 1.2],
  },
  {
    key: 'back',
    name: 'plecy',
    position: [0, 0, -0.56],
    size: [1.76, 2.2, 0.05],
  },
  {
    key: 'shelf',
    name: 'półka',
    position: [0, 0.18, 0],
    size: [1.7, 0.08, 1.12],
  },
  {
    key: 'front',
    name: 'front',
    position: [0, 0, 0.58],
    size: [1.76, 2.16, 0.05],
  },
]

const HIGHLIGHT_COLOR = '#ff7a1a'
const BASE_COLOR = '#98a2ad'
const STEP_MS = 1500

function toMillimeters(value: number) {
  return Math.round(value * 1000)
}

function formatDimensions(size: [number, number, number]) {
  const [width, height, depth] = size
  return `${toMillimeters(width)} x ${toMillimeters(height)} x ${toMillimeters(depth)} mm`
}

function CabinetMeshes({ activeKey }: { activeKey: string }) {
  return (
    <group>
      {CABINET_PARTS.map((part) => {
        const isActive = part.key === activeKey

        return (
          <mesh key={part.key} position={part.position}>
            <boxGeometry args={part.size} />
            <meshStandardMaterial
              color={isActive ? HIGHLIGHT_COLOR : BASE_COLOR}
              transparent
              opacity={isActive ? 0.82 : 0.48}
              roughness={0.3}
              metalness={0.18}
            />
            <Edges color={isActive ? HIGHLIGHT_COLOR : '#4f5963'} threshold={15} />
          </mesh>
        )
      })}
    </group>
  )
}

function CabinetScene({ activeKey }: { activeKey: string }) {
  return (
    <>
      <color attach="background" args={['#f5f7fa']} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <directionalLight position={[-4, -2, -2]} intensity={0.35} />
      <CabinetMeshes activeKey={activeKey} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.45}
        minPolarAngle={0.95}
        maxPolarAngle={2.2}
      />
    </>
  )
}

function CabinetPreviewComponent() {
  const parts = useMemo(() => CABINET_PARTS, [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [dotCount, setDotCount] = useState(1)
  const [resolvedKeys, setResolvedKeys] = useState<string[]>([])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % parts.length)
    }, STEP_MS)

    return () => window.clearInterval(interval)
  }, [parts.length])

  useEffect(() => {
    const dotsInterval = window.setInterval(() => {
      setDotCount((current) => (current % 3) + 1)
    }, 320)

    return () => window.clearInterval(dotsInterval)
  }, [])

  useEffect(() => {
    const activePart = parts[activeIndex]

    if (activeIndex === 0 && resolvedKeys.length === parts.length) {
      setResolvedKeys([])
      return
    }

    const resolveTimeout = window.setTimeout(() => {
      setResolvedKeys((current) =>
        current.includes(activePart.key) ? current : [...current, activePart.key],
      )
    }, Math.round(STEP_MS * 0.62))

    return () => window.clearTimeout(resolveTimeout)
  }, [activeIndex, parts, resolvedKeys.length])

  const activePart = parts[activeIndex]
  const loadingDots = '.'.repeat(dotCount)
  const computedParts = parts.filter((part) => resolvedKeys.includes(part.key))

  return (
    <div className="space-y-4">
      <div
        className="h-[360px] w-full overflow-hidden border border-[#dbe1e7] bg-[#f5f7fa]"
        style={{ clipPath: 'inset(0 round 20px)' }}
      >
        <Canvas camera={{ position: [2.8, 2, 3], fov: 42 }}>
          <CabinetScene activeKey={activePart.key} />
        </Canvas>
      </div>
      <div className="space-y-3 border border-[#dbe1e7] bg-[#111418] p-4 text-[#e8edf3]">
        <p className="font-mono text-xs tracking-wide">
          <span className="text-[#ff7a1a]">[RUN]</span> Generowanie: {activePart.name}
          {loadingDots}
        </p>
        <div className="overflow-hidden border border-[#2f3842]">
          <table className="w-full border-collapse font-mono text-[0.7rem]">
            <thead className="bg-[#1a2027] text-[#94a0ad]">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium">Element</th>
                <th className="px-2 py-1.5 text-left font-medium">Wymiar</th>
                <th className="px-2 py-1.5 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {computedParts.map((part, index) => (
                <tr key={part.key} className={index % 2 === 0 ? 'bg-[#12171d]' : 'bg-[#151b22]'}>
                  <td className="px-2 py-1.5 text-[#d6dde6]">{part.name}</td>
                  <td className="px-2 py-1.5 text-[#b9c4cf]">{formatDimensions(part.size)}</td>
                  <td className="px-2 py-1.5 text-[#63d186]">wyliczono</td>
                </tr>
              ))}
              {computedParts.length === 0 && (
                <tr className="bg-[#12171d]">
                  <td className="px-2 py-2 text-[#7d8894]" colSpan={3}>
                    Oczekiwanie na pierwsze wyliczenia...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const CabinetPreview = memo(CabinetPreviewComponent)
