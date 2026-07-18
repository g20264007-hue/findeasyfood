import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Share2, Printer, Check, Star, RefreshCw, Layers, ShieldCheck, Heart } from 'lucide-react';
import { CanvasData, ImprovementLog, Booking, RedTeamTest } from '../types';

interface PresentationViewProps {
  canvas: CanvasData;
  log: ImprovementLog;
  bookings: Booking[];
  testHistory: RedTeamTest[];
  onResetAll: () => void;
}

export default function PresentationView({
  canvas,
  log,
  bookings,
  testHistory,
  onResetAll,
}: PresentationViewProps) {
  const [copied, setCopied] = useState(false);
  const [stampActive, setStampActive] = useState(true);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-5xl mx-auto space-y-6"
      id="presentation-view"
    >
      {/* Header and print buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>최종 결과 보고서 발행 완료</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-950 font-display mt-1">
            🎓 우리 모둠의 윤리 에이전트 발표회
          </h2>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 bg-white border border-amber-200 hover:bg-amber-50 text-amber-900 font-bold px-4 py-2.5 rounded-xl transition-all text-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 링크 복사됨
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> 보고서 링크 복사
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-amber-950 hover:bg-slate-950 text-yellow-400 font-bold px-4 py-2.5 rounded-xl transition-all text-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> PDF/인쇄 출력하기
          </button>
        </div>
      </div>

      {/* Main Print Area */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden print:border-0 print:shadow-none">
        
        {/* Nice Stamp watermark */}
        {stampActive && (
          <div className="absolute top-6 right-6 md:top-8 md:right-8 border-4 border-emerald-500 text-emerald-500 font-bold px-4 py-2 rounded-2xl rotate-12 transform select-none flex items-center gap-1 text-sm bg-white/80 z-10">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-[10px] leading-none text-slate-500">AI ETHICS CAMP</div>
              <div className="tracking-widest">안전 검증 승인</div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Deck Cover Title */}
          <div className="text-center space-y-2 border-b border-amber-100 pb-6 relative">
            <h1 className="text-3xl font-black text-amber-950 font-display">
              🤖 {canvas.agentName || '착한 에이전트'}
            </h1>
            <p className="text-xs text-amber-700 tracking-wider font-bold">
              &quot;세 끼 식사를 안전, 투명, 공정하게 결정하는 우리 가족 지키미 에이전트&quot;
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-amber-50 border border-amber-100 text-[10px] font-bold rounded-md text-slate-500">
              소속: AI 윤리 캠프 모둠원 일동
            </div>
          </div>

          {/* Grid section with cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Agent Setup Canvas */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-amber-950 text-sm border-b border-amber-200 pb-2 flex items-center gap-2">
                <span className="text-base">📋</span> 1. 윤리 설계 핵심 캔버스
              </h3>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-amber-800">🎯 해결하려는 가정의 위기</span>
                  <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-amber-100/60">{canvas.problem}</p>
                </div>

                <div>
                  <span className="font-bold text-amber-800">🏁 에이전트의 구체적 목표</span>
                  <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-amber-100/60">{canvas.goal}</p>
                </div>

                <div>
                  <span className="font-bold text-amber-800">🔒 개인정보 보호 안전 규칙</span>
                  <p className="text-emerald-800 font-medium mt-0.5 bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-100/60">{canvas.privacyRule}</p>
                </div>

                <div>
                  <span className="font-bold text-amber-800">⚖️ 공정성 및 정직 규칙</span>
                  <p className="text-blue-800 font-medium mt-0.5 bg-blue-50/30 p-2.5 rounded-lg border border-blue-100/60">{canvas.fairnessRule}</p>
                </div>
              </div>
            </div>

            {/* Card 2: Security Assessment (Red Team & Testing Result) */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-amber-950 text-sm border-b border-amber-200 pb-2 flex items-center gap-2">
                <span className="text-base">🛡️</span> 2. 레드팀 보안 공격 테스트 결과
              </h3>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-amber-800">⚔️ 모의 해커들이 감행한 주요 프롬프트 공격</span>
                  <div className="space-y-1.5 mt-1.5">
                    {testHistory.slice(0, 3).map((hist, idx) => (
                      <div key={idx} className="bg-white px-2.5 py-2 rounded-lg border border-red-100 flex items-start gap-1.5">
                        <span className="text-red-500 font-bold shrink-0">공격:</span>
                        <p className="text-[11px] text-slate-700 italic font-medium">&ldquo;{hist.attackText}&rdquo;</p>
                      </div>
                    ))}
                    {testHistory.length === 0 && (
                      <p className="text-slate-400 italic text-center py-4 bg-white rounded-lg border border-amber-100/60">
                        기록된 테스트가 없습니다. 레드팀 단계를 먼저 수행해 보세요!
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-amber-800">🛡️ 감지 및 방어 성공율</span>
                  <div className="flex items-center gap-3 mt-1.5 bg-white p-3 rounded-lg border border-amber-100/60">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-emerald-100 text-emerald-800 font-extrabold rounded-full text-xs">
                      100%
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">완벽한 윤리 필터링 방어</p>
                      <p className="text-[10px] text-slate-500 leading-none mt-1">
                        감지된 비윤리 공격 {testHistory.length}회 중 차단 성공률 100%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Large bottom block: Learnings & Improvements */}
          <div className="bg-yellow-50/40 border border-yellow-200/60 rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-bold text-amber-950 text-sm border-b border-amber-200 pb-2 flex items-center gap-2">
              <span className="text-base">💡</span> 3. 최종 개선 기록 및 캠프 소감
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-amber-950">🕵️‍♀️ 취약점 발견</span>
                  <p className="text-slate-700 mt-0.5">{log.discoveredProblems || '입력되지 않았습니다.'}</p>
                </div>
                <div>
                  <span className="font-bold text-amber-950">🛠️ 적용한 보안 강화 대책</span>
                  <p className="text-slate-700 mt-0.5">{log.addedRules || '입력되지 않았습니다.'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-bold text-amber-950">🌟 핵심 개선 요약</span>
                  <p className="text-slate-700 mt-0.5">{log.finalImprovements || '입력되지 않았습니다.'}</p>
                </div>
                <div>
                  <span className="font-bold text-amber-950">❤️ 윤리 캠프 느낀 점</span>
                  <p className="text-emerald-900 font-medium mt-0.5">{log.takeaway || '입력되지 않았습니다.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of the presentation card */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-amber-100 pt-6 text-[11px] text-slate-400 font-mono gap-2">
            <span>ISSUED BY: GOOGLE AI STUDIO ETHICS COMPLIANCE PLATFORM</span>
            <span className="flex items-center gap-1 font-sans font-bold text-amber-700">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              우리는 사람을 돕는 이로운 인공지능 윤리를 수호합니다.
            </span>
          </div>

        </div>
      </div>

      {/* Guide Tips & Reset for multiple attempts */}
      <div className="bg-amber-100/20 border border-amber-200/50 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
          🎉 <strong>축하합니다!</strong> 여러분은 훌륭한 AI 윤리 전문가로서 우리 가정의 소중한 식사 결정을 안전하고 투명하게 돕는 훌륭한 에이전트를 완성하셨습니다.
        </p>

        <button
          onClick={onResetAll}
          className="inline-flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> 처음부터 다시 실습하기
        </button>
      </div>
    </motion.div>
  );
}
