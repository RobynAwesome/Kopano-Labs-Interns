import {
  getRouteNodes,
  isRouteActive,
  networkDistricts,
  networkNodes,
  networkRoutes,
  projectToStatic,
} from '../spatial/network-model.js'

function StaticRoute({ route, activeLane }) {
  const { from, to } = getRouteNodes(route)
  const [x1, y1] = projectToStatic(from.position)
  const [x2, y2] = projectToStatic(to.position)
  const active = isRouteActive(route, activeLane)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={active ? '#dff9e8' : '#9de2c2'}
        strokeOpacity={active ? '.62' : '.26'}
        strokeWidth={active ? '.065' : '.045'}
      />
      <g transform={`translate(${mx} ${my}) rotate(${angle})`}>
        <path
          d="M-.16 -.11 L.14 0 L-.16 .11 Z"
          fill={active ? '#f7fff9' : '#a7f3d0'}
          fillOpacity={active ? '.94' : '.52'}
        />
        <ellipse cx="-.2" cy="-.1" rx=".14" ry=".055" fill="#a7f3d0" fillOpacity={active ? '.7' : '.32'} transform="rotate(-28 -.2 -.1)" />
        <ellipse cx="-.2" cy=".1" rx=".14" ry=".055" fill="#a7f3d0" fillOpacity={active ? '.7' : '.32'} transform="rotate(28 -.2 .1)" />
      </g>
    </g>
  )
}

export default function StaticNetwork({ activeLane = 'learn' }) {
  return (
    <div className="static-world" aria-hidden="true" data-spatial-renderer="static">
      <svg viewBox="-5 -3 10 6" role="presentation">
        <defs>
          <radialGradient id="networkGlow">
            <stop offset="0" stopColor="#1c4a35" stopOpacity="0.85" />
            <stop offset="1" stopColor="#08130f" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r="4.8" fill="url(#networkGlow)" />

        {networkRoutes.map((route) => (
          <StaticRoute key={route.id} route={route} activeLane={activeLane} />
        ))}

        {networkDistricts.map((district) => {
          const [x, y] = projectToStatic(district.position)
          const active = district.nodeId === activeLane
          return (
            <circle
              key={district.id}
              cx={x}
              cy={y}
              r={active ? '.74' : '.58'}
              fill={district.tone}
              fillOpacity={active ? '.075' : '.028'}
              stroke={district.tone}
              strokeOpacity={active ? '.4' : '.14'}
              strokeWidth=".035"
            />
          )
        })}

        {networkNodes.map((node) => {
          const [x, y] = projectToStatic(node.position)
          const active = node.id === activeLane
          return (
            <g key={node.id} transform={`translate(${x} ${y})`} data-spatial-node={node.id}>
              <circle r={active ? '.52' : '.39'} fill="none" stroke={node.tone} strokeOpacity={active ? '.95' : '.34'} strokeWidth=".04" />
              <circle r={active ? '.29' : '.22'} fill={node.tone} fillOpacity={active ? '.2' : '.1'} />
              <path d="M0 -.23 L.2 0 L0 .23 L-.2 0 Z" fill="#f7fff9" stroke={node.tone} strokeWidth=".035" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
