import React, { useState } from 'react';
import { Card3D } from './Card3D';
import {
  Layers,
  Play,
  RotateCcw,
  Server,
  Database,
  Cpu,
  Box
} from 'lucide-react';

export const FullStackBuilderSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number>(0);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([
    "✓ Initialized architecture workspace: Amit Kumar Full-Stack Suite",
    "✓ Loaded production configuration (Docker + Node.js + PostgreSQL)",
    "Ready to simulate production compile & deployment test suite."
  ]);
  const [telemetry, setTelemetry] = useState({
    bundleSize: "46.2 kB",
    latency: "32 ms",
    uptime: "99.98%",
    passRate: "48 / 48 (100%)",
  });

  const tiers = [
    {
      name: "Frontend Presentation",
      tech: "React 18 • TypeScript • Tailwind CSS",
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      description: "Optimized client tier featuring concurrent rendering, memoized state pipelines, and accessible reactive UI components.",
      stats: "FCP: 0.6s • Bundle: 46.2kB gzip",
    },
    {
      name: "API Gateway & Security",
      tech: "Node.js • Express • JWT RBAC",
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      description: "Secure gateway with 20+ RESTful endpoints, token authentication, IP rate limiting, and structured validation schemas.",
      stats: "Avg Latency: 32ms • QPS: 12,500+",
    },
    {
      name: "Async Queue & Caching",
      tech: "Redis • BullMQ Worker Queues",
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      description: "Distributed in-memory message broker handling async background notifications, report generation, and cache-aside read pipelines.",
      stats: "Delivery Latency: <15ms • 0% Packet Loss",
    },
    {
      name: "Relational Persistence",
      tech: "PostgreSQL • 21+ Relational Tables",
      icon: <Database className="w-5 h-5 text-blue-400" />,
      description: "Normalized PostgreSQL schema enforcing multi-step business logic gates, indexing on active foreign keys, and audit logging.",
      stats: "Query Time: 4.2ms • ACID Compliant",
    },
    {
      name: "Container Infrastructure",
      tech: "Docker Compose • MinIO S3",
      icon: <Box className="w-5 h-5 text-purple-400" />,
      description: "Multi-container orchestration isolating database, object store, queue broker, and microservices into unified reproducible stacks.",
      stats: "Setup Time Cut: 70% • 1-Command Up",
    },
  ];

  const handleRunBuild = () => {
    setIsBuilding(true);
    setBuildLogs(["[START] Initiating full-stack compilation & health validation..."]);

    const steps = [
      "» Validating TypeScript AST & type constraints... OK",
      "» Bundling client assets with Vite ESBuild tree-shaking... OK (46.2 kB)",
      "» Checking Express REST API route schema definitions... 24 endpoints verified",
      "» Pinging Redis pub/sub queue channels & BullMQ workers... 100% active",
      "» Executing PostgreSQL migration scripts & schema constraints... 21 tables verified",
      "» Running Jest & Mockito test suite... 48/48 passed",
      "✓ [SUCCESS] Production build complete. Zero regressions detected. Latency: 31ms."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setBuildLogs((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsBuilding(false);
          setTelemetry({
            bundleSize: "45.8 kB",
            latency: "28 ms",
            uptime: "99.99%",
            passRate: "48 / 48 (100%)",
          });
        }
      }, (index + 1) * 350);
    });
  };

  const handleReset = () => {
    setBuildLogs([
      "✓ Initialized architecture workspace: Amit Kumar Full-Stack Suite",
      "Ready to simulate production compile & deployment test suite."
    ]);
    setIsBuilding(false);
  };

  return (
    <section id="fullstack-builder" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Full-Stack Build Studio
              </h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
            Interactive multi-tier architecture visualizer and live compilation simulator.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Architecture Tiers */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
              System Architecture Tiers
            </span>
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTier(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  activeTier === idx
                    ? 'bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-[#060b19]/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {tier.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{tier.name}</h4>
                    <span className="text-[11px] font-mono text-emerald-400 shrink-0">Tier {idx + 1}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">{tier.tech}</div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Telemetry & Live Terminal */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Metrics Telemetry Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#060b19] border border-slate-800 flex flex-col">
                <span className="text-[11px] uppercase font-mono text-slate-400">Bundle Size</span>
                <span className="text-lg font-bold text-cyan-400 mt-1">{telemetry.bundleSize}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#060b19] border border-slate-800 flex flex-col">
                <span className="text-[11px] uppercase font-mono text-slate-400">Avg Latency</span>
                <span className="text-lg font-bold text-emerald-400 mt-1">{telemetry.latency}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#060b19] border border-slate-800 flex flex-col">
                <span className="text-[11px] uppercase font-mono text-slate-400">System Uptime</span>
                <span className="text-lg font-bold text-amber-400 mt-1">{telemetry.uptime}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#060b19] border border-slate-800 flex flex-col">
                <span className="text-[11px] uppercase font-mono text-slate-400">Unit Tests</span>
                <span className="text-lg font-bold text-emerald-400 mt-1">{telemetry.passRate}</span>
              </div>
            </div>

            {/* Interactive Terminal Simulator */}
            <Card3D maxTilt={4}>
              <div className="rounded-2xl bg-[#030611] border border-slate-800 hover:border-emerald-500/40 p-5 shadow-2xl overflow-hidden font-mono text-xs">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-400 ml-2 text-xs">amit@fullstack-builder: ~</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRunBuild}
                      disabled={isBuilding}
                      className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isBuilding ? 'Building...' : 'Simulate Build'}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="Clear Terminal"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="space-y-1.5 min-h-[220px] max-h-[300px] overflow-y-auto text-slate-300 select-text">
                  {buildLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        log.includes('SUCCESS')
                          ? 'text-emerald-400 font-bold'
                          : log.includes('START')
                          ? 'text-cyan-400 font-semibold'
                          : 'text-slate-300'
                      }
                    >
                      {log}
                    </div>
                  ))}
                  {isBuilding && (
                    <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse">
                      <span>» executing pipeline worker tasks</span>
                      <span className="w-1.5 h-3.5 bg-emerald-400" />
                    </div>
                  )}
                </div>

              </div>
            </Card3D>

          </div>
        </div>

      </div>
    </section>
  );
};
