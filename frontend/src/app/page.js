'use client';

import { useState } from 'react';

import axios from 'axios';

import ReactMarkdown from 'react-markdown';

import { motion, AnimatePresence } from 'framer-motion';

import {
  Upload,
  FileText,
  Sparkles,
  BrainCircuit,
  Copy,
  Check,
} from 'lucide-react';

export default function AIDocAnalyzerLanding() {

  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] = useState({
    success: false,
    filename: '',
    summary: '',
    insights: [],
    analysis: '',
  });

  const [loading, setLoading] = useState(false);

  const [dragging, setDragging] = useState(false);

  const [progress, setProgress] = useState(0);

  const [activeTab, setActiveTab] =
    useState('summary');

  const [copied, setCopied] = useState('');

  const handleFile = (selectedFile) => {

    if (!selectedFile) return;

    // PDF validation
    if (
      selectedFile.type !==
      'application/pdf'
    ) {

      alert(
        'Only PDF files are allowed'
      );

      return;
    }

    // 5MB limit
    const maxSize =
      5 * 1024 * 1024;

    if (
      selectedFile.size > maxSize
    ) {

      alert(
        'File size must be less than 5MB'
      );

      return;
    }

    setFile(selectedFile);
  };

  const copyToClipboard = async (
    text,
    type
  ) => {

    try {

      await navigator.clipboard.writeText(
        text
      );

      setCopied(type);

      setTimeout(() => {
        setCopied('');
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {

    if (!file) {

      alert('Please select a PDF');
      return;
    }

    setLoading(true);

    setProgress(0);

    const formData = new FormData();

    formData.append('file', file);

    try {

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },

          onUploadProgress: (event) => {

            const percent = Math.round(
              (event.loaded * 100) /
              event.total
            );

            setProgress(percent);
          },
        }
      );

      if (response.data.success) {

        setAnalysis({
          success: response.data.success,
          filename:
            response.data.filename,
          summary:
            response.data.summary,
          insights:
            response.data.insights,
          analysis:
            response.data.analysis,
        });
      }

    } catch (err) {

      console.error(err);

      alert(
        'Error processing document'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-100px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <h1 className="text-xl font-black tracking-tight">
              NeuralDocs AI
            </h1>

            <p className="text-xs text-slate-400">
              Local AI Document
              Intelligence
            </p>
          </motion.div>

          <motion.a
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.98,
            }}
            href="#upload"
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
          >
            Try Demo
          </motion.a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-20 text-center">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-6 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-sm"
        >
          FastAPI • Ollama • Docker •
          Next.js
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.6,
          }}
          className="max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl"
        >
          Analyze Documents

          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {' '}with Local AI
          </span>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
        >
          Upload PDFs and instantly
          generate summaries, insights,
          and structured analysis using
          locally hosted LLMs.
        </motion.p>

        {/* Main Grid */}
        <div className="mt-16 grid w-full max-w-6xl gap-6 lg:grid-cols-2">

          {/* Upload Panel */}
          <motion.div
            id="upload"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            onDragOver={(e) => {

              e.preventDefault();

              setDragging(true);
            }}
            onDragLeave={() =>
              setDragging(false)
            }
            onDrop={(e) => {

              e.preventDefault();

              setDragging(false);

              const droppedFile =
                e.dataTransfer.files[0];

              handleFile(droppedFile);
            }}
            className={`rounded-3xl border bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 ${dragging
                ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]'
                : 'border-white/10'
              }`}
          >

            <div className="flex flex-col items-center justify-center text-center">

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="mb-6 rounded-3xl bg-cyan-400/10 p-5"
              >
                <Upload className="h-12 w-12 text-cyan-300" />
              </motion.div>

              <h3 className="text-3xl font-black">
                Upload PDF
              </h3>

              <p className="mt-3 max-w-sm text-sm text-slate-400">
                Drag & drop your PDF
                document or click below
                to analyze with local AI.
              </p>

              <label className="mt-8 cursor-pointer rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">

                Choose PDF

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(
                      e.target.files[0]
                    )
                  }
                />
              </label>

              {/* File Preview */}
              <AnimatePresence>

                {file && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <FileText className="h-6 w-6 text-cyan-300" />

                        <div className="text-left">

                          <p className="text-sm font-medium">
                            {file.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {(
                              file.size /
                              1024 /
                              1024
                            ).toFixed(2)}{' '}
                            MB
                          </p>
                        </div>
                      </div>

                      <Check className="h-5 w-5 text-emerald-400" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Bar */}
              {loading && (

                <div className="mt-6 w-full">

                  <div className="mb-2 flex justify-between text-sm text-slate-400">

                    <span>
                      Uploading
                    </span>

                    <span>
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${progress}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                    />
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={uploadFile}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition"
              >
                {loading
                  ? 'Processing...'
                  : 'Analyze Document'}
              </motion.button>
            </div>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >

            <div className="flex items-center justify-between border-b border-white/10 pb-5">

              <div>

                <h3 className="text-2xl font-black">
                  AI Analysis
                </h3>

                <p className="text-sm text-slate-400">
                  Generated using local
                  LLM inference
                </p>
              </div>

              <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                Live
              </div>
            </div>

            {/* Empty State */}
            {!analysis.success &&
              !loading && (

                <div className="flex flex-col items-center justify-center py-24 text-center">

                  <div className="mb-5 rounded-full bg-white/5 p-5">

                    <FileText className="h-12 w-12 text-cyan-300" />
                  </div>

                  <h3 className="text-xl font-bold">
                    No Analysis Yet
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                    Upload a PDF document
                    to generate AI-powered
                    insights, summaries,
                    and structured
                    analysis.
                  </p>
                </div>
              )}

            {/* Loading Skeleton */}
            {loading && (

              <div className="mt-8 animate-pulse space-y-5">

                <div className="h-6 w-1/3 rounded bg-white/10" />

                <div className="h-28 rounded-2xl bg-white/5" />

                <div className="h-20 rounded-2xl bg-white/5" />

                <div className="h-20 rounded-2xl bg-white/5" />
              </div>
            )}

            {/* Results */}
            {analysis.success &&
              !loading && (

                <div className="mt-6">

                  {/* File Info */}
                  <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <FileText className="h-5 w-5 text-cyan-300" />

                        <div>

                          <p className="text-sm font-semibold">
                            {
                              analysis.filename
                            }
                          </p>

                          <p className="text-xs text-slate-400">
                            AI analysis
                            completed
                          </p>
                        </div>
                      </div>

                      <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                        Success
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mb-6 flex gap-3 overflow-x-auto">

                    {[
                      'summary',
                      'insights',
                      'analysis',
                    ].map((tab) => (

                      <button
                        key={tab}
                        onClick={() =>
                          setActiveTab(tab)
                        }
                        className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${activeTab ===
                            tab
                            ? 'bg-cyan-400 text-slate-950'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  {activeTab ===
                    'summary' && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6"
                      >

                        <div className="mb-5 flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            <Sparkles className="h-5 w-5 text-cyan-300" />

                            <h4 className="text-lg font-bold">
                              Summary
                            </h4>
                          </div>

                          <button
                            onClick={() =>
                              copyToClipboard(
                                analysis.summary,
                                'summary'
                              )
                            }
                            className="rounded-lg bg-white/5 p-2 transition hover:bg-white/10"
                          >

                            {copied ===
                              'summary' ? (

                              <Check className="h-4 w-4 text-emerald-400" />

                            ) : (

                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        <div className="prose prose-invert max-w-none text-slate-300">

                          <ReactMarkdown>
                            {
                              analysis.summary
                            }
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}

                  {/* Insights */}
                  {activeTab ===
                    'insights' && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="space-y-4"
                      >

                        {analysis.insights?.map(
                          (
                            insight,
                            index
                          ) => (

                            <div
                              key={index}
                              className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5"
                            >

                              <div className="flex items-start gap-3">

                                <div className="rounded-full bg-violet-400/20 p-2">

                                  <BrainCircuit className="h-4 w-4 text-violet-300" />
                                </div>

                                <div>

                                  <h4 className="font-semibold text-violet-200">

                                    Insight{' '}
                                    {index +
                                      1}
                                  </h4>

                                  <p className="mt-2 leading-relaxed text-slate-300">

                                    {
                                      insight
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </motion.div>
                    )}

                  {/* Full Analysis */}
                  {activeTab ===
                    'analysis' && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="rounded-3xl border border-white/10 bg-black/40 p-6"
                      >

                        <div className="mb-5 flex items-center justify-between">

                          <h4 className="text-lg font-bold">
                            Full Analysis
                          </h4>

                          <button
                            onClick={() =>
                              copyToClipboard(
                                analysis.analysis,
                                'analysis'
                              )
                            }
                            className="rounded-lg bg-white/5 p-2 transition hover:bg-white/10"
                          >

                            {copied ===
                              'analysis' ? (

                              <Check className="h-4 w-4 text-emerald-400" />

                            ) : (

                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        <div className="prose prose-invert max-w-none max-h-[600px] overflow-y-auto text-slate-300">

                          <ReactMarkdown>
                            {
                              analysis.analysis
                            }
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                </div>
              )}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">

        <div className="grid gap-6 md:grid-cols-3">

          {[
            {
              title:
                'Local AI Inference',
              desc:
                'Runs fully on local infrastructure using Ollama and lightweight LLMs.',
            },
            {
              title:
                'Production Backend',
              desc:
                'Built with FastAPI, Docker, and modular architecture.',
            },
            {
              title:
                'Self Hosted',
              desc:
                'Deployable on VPS, Proxmox, or local infrastructure.',
            },
          ].map((feature) => (

            <motion.div
              key={feature.title}
              whileHover={{
                y: -5,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >

              <h3 className="text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">

        Built with FastAPI,
        Docker, Ollama, Next.js,
        and local LLM inference.
      </footer>
    </div>
  );
}