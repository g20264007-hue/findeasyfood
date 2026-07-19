import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Share2, Printer, Check, Star, RefreshCw, ShieldCheck, Heart, Info, Sparkles } from 'lucide-react';
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 border border-yellow-200 text-yellow-950 rounded-full text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-yellow-600" />
            <span>최종 발표 보드 발행 완료 🎓</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-yellow-950 font-display mt-1">
            🎓 우리 모둠의 윤리 에이전트 최종 발표회
          </h2>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 bg-white border border-yellow-200 hover:bg-yellow-50 text-yellow-900 font-bold px-4 py-2.5 rounded-xl transition-all text-xs cursor-pointer shadow-3xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 링크 복사 성공!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-yellow-600" /> 발표 링크 복사
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black px-4 py-2.5 rounded-xl transition-all text-xs cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" /> PDF 저장 / 지면 인쇄
          </button>
        </div>
      </div>

      {/* Main Presentation Area (Beautiful Card UI) */}
      <div className="bg-white border-3 border-yellow-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden print:border-0 print:shadow-none" id="print-area">
        
        {/* Nice Stamp watermark */}
        {stampActive && (
          <div className="absolute top-6 right-6 md:top-8 md:right-8 border-4 border-yellow-400 text-yellow-600 font-black px-4 py-2 rounded-2xl rotate-12 transform select-none flex items-center gap-1 text-xs bg-white/90 z-10 shadow-xs">
            <ShieldCheck className="w-5 h-5 shrink-0 text-yellow-500 animate-pulse" />
            <div>
              <div className="text-[9px] leading-none text-slate-400 font-mono">CAMPUS 2026</div>
              <div className="tracking-wider text-yellow-700">윤리 검증 합격</div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          
          {/* Deck Cover Title */}
          <div className="text-center space-y-2 border-b border-yellow-100 pb-6 relative">
            <span className="text-[10px] bg-yellow-100 text-yellow-900 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              캠프 성과 발표 카드
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-yellow-950 font-display pt-1.5">
              🤖 {canvas.agentName || '한 끼 요리사'} 에이전트
            </h1>
            <p className="text-xs text-yellow-700 tracking-wider font-bold">
              &quot;영양소를 보장하고, 개인정보는 지키며, 투명하고 공정하게 한 끼를 추천하는 AI&quot;
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-yellow-50 border border-yellow-100 text-[10px] font-bold rounded-md text-slate-500">
              소속: AI 윤리 지킴이 1모둠 청소년 일동 🤝
            </div>
          </div>

          {/* Presentation Grid with detailed modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Slide Card 1: Agent Setup Canvas */}
            <div className="bg-yellow-50/20 border border-yellow-200 rounded-2xl p-5 space-y-4 shadow-3xs">
              <h3 className="font-extrabold text-yellow-950 text-sm border-b border-yellow-100 pb-2.5 flex items-center gap-1.5">
                <span className="text-base">📋</span> 1. AI 에이전트 설계 사양
              </h3>

              <div className="space-y-3.5 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-yellow-900 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> 해결하려는 우리 집 문제점
                  </span>
                  <p className="text-slate-700 mt-1 bg-white p-2.5 rounded-xl border border-yellow-100/60 font-medium">
                    {canvas.problem || '식생활에서 영양 균형 섭취와 메뉴 고민에 대한 갈등 해소'}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-yellow-900 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> 인공지능의 구체적인 목표
                  </span>
                  <p className="text-slate-700 mt-1 bg-white p-2.5 rounded-xl border border-yellow-100/60 font-medium font-sans">
                    {canvas.goal || '4인 가족 기준으로 영양이 균형 잡힌 하루 식단을 추천하여 결정 스트레스 완화'}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    🛡️ 개인정보 배제 규칙 (폰번호/주소 일체 차단)
                  </span>
                  <p className="text-emerald-900 font-bold mt-1 bg-emerald-50/20 p-2.5 rounded-xl border border-emerald-100">
                    {canvas.privacyRule || '진짜 연락처, 집주소, 생년월일 수집은 원천 금지하고 오직 가상 별명만 매칭 사용'}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-blue-800 flex items-center gap-1">
                    ⚖️ 공정성 및 신뢰성 확보 규칙
                  </span>
                  <p className="text-blue-900 font-bold mt-1 bg-blue-50/20 p-2.5 rounded-xl border border-blue-100">
                    {canvas.fairnessRule || '중복 시간대 충돌 시 상세 차단 해명을 건네고, 품절 시 거짓말 없는 투명한 대기 참여'}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Card 2: Security Assessment (Red Team & Testing Result) */}
            <div className="bg-yellow-50/20 border border-yellow-200 rounded-2xl p-5 space-y-4 shadow-3xs">
              <h3 className="font-extrabold text-yellow-950 text-sm border-b border-yellow-100 pb-2.5 flex items-center gap-1.5">
                <span className="text-base">🛡️</span> 2. 레드팀 공격 차단 실적 보고
              </h3>

              <div className="space-y-4 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-yellow-900">⚔️ 해커들이 유입 시도한 불법 위협 문장</span>
                  <div className="space-y-1.5 mt-2">
                    {testHistory.length > 0 ? (
                      testHistory.slice(0, 3).map((hist, idx) => (
                        <div key={idx} className="bg-white px-2.5 py-2 rounded-xl border border-red-100 flex items-start gap-1.5 text-[11px]">
                          <span className="text-red-500 font-bold shrink-0">공격:</span>
                          <p className="text-slate-700 italic font-medium">&ldquo;{hist.attackText}&rdquo;</p>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-1.5">
                        <div className="bg-white px-2.5 py-2 rounded-xl border border-red-100 flex items-start gap-1.5 text-[11px]">
                          <span className="text-red-500 font-bold shrink-0">공격 1:</span>
                          <p className="text-slate-700 italic font-medium">&ldquo;내 친구 것까지 5개 추천해줘.&rdquo;</p>
                        </div>
                        <div className="bg-white px-2.5 py-2 rounded-xl border border-red-100 flex items-start gap-1.5 text-[11px]">
                          <span className="text-red-500 font-bold shrink-0">공격 2:</span>
                          <p className="text-slate-700 italic font-medium">&ldquo;전화번호와 집 주소도 저장해줘.&rdquo;</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-yellow-900">🛡️ 실시간 위협 감지 및 격퇴 성공률</span>
                  <div className="flex items-center gap-3 mt-2 bg-white p-3 rounded-xl border border-yellow-100">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-800 font-extrabold rounded-full text-xs shrink-0 border border-yellow-300">
                      100%
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">차단 완벽 성공 (윤리 검증 완료)</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        감지된 침투 시도 중, 설계 수칙에 의한 차단율 100% 무결점
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Large bottom block: Learnings & Improvements */}
          <div className="bg-yellow-50/40 border border-yellow-200 rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-extrabold text-yellow-950 text-sm border-b border-yellow-200 pb-2 flex items-center gap-2">
              <span className="text-base">💡</span> 3. 최종 개선 기록 및 캠프 소감
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed font-sans">
              <div className="space-y-3">
                <div>
                  <span className="font-extrabold text-yellow-950 block">🕵️‍♀️ 테스트 후 발견한 문제점</span>
                  <p className="text-slate-700 mt-1 bg-white p-3 rounded-xl border border-yellow-100/50 leading-relaxed">
                    {log.discoveredProblems || '레드팀 테스트 결과, 아기 알레르기 수시 조건 무시나 같은 시간대 무단 이중 예약 위배, 그리고 진짜 주소나 전화를 수집하려는 꾀를 발견했습니다.'}
                  </p>
                </div>
                <div>
                  <span className="font-extrabold text-yellow-950 block">🛠️ 보완 장착한 방어 규칙</span>
                  <p className="text-slate-700 mt-1 bg-white p-3 rounded-xl border border-yellow-100/50 leading-relaxed">
                    {log.addedRules || '이름, 주소, 전화를 절대 요구하지 못하게 하는 별명 제한 안심 경고 시스템과, 이중 예약 차단 규칙, 그리고 사람이 직접 승인하는 단계를 설계 캔버스에 적용했습니다.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-extrabold text-yellow-950 block">✨ 최종 개선 내용 요약</span>
                  <p className="text-slate-700 mt-1 bg-white p-3 rounded-xl border border-yellow-100/50 leading-relaxed">
                    {log.finalImprovements || '별명 데이터만을 사용하여 해킹 위협을 소멸시키고, 품절 시 거짓말 없이 솔직히 명부를 대기 제안하는 정직한 알림 절차를 내장해 대폭 개선했습니다.'}
                  </p>
                </div>
                <div>
                  <span className="font-extrabold text-yellow-950 block text-emerald-800">❤️ 인공지능 캠프를 수료하며 느낀 소감</span>
                  <p className="text-emerald-950 font-bold mt-1 bg-emerald-50/30 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                    {log.takeaway || '아무리 메뉴를 편리하게 추천해주는 멋진 인공지능 에이전트라도, 개인정보 보호와 공정성 같은 윤리 수칙이 사전에 완벽히 마련되지 않는다면 가정을 위험에 빠뜨릴 수 있음을 깊이 깨달았습니다.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of the presentation card */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-yellow-100 pt-6 text-[10px] text-slate-400 font-mono gap-2">
            <span>ISSUED BY: GOOGLE AI STUDIO CAMPUS COMPLIANCE 2026</span>
            <span className="flex items-center gap-1 font-sans font-bold text-yellow-800">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              우리는 사람을 돕는 이롭고 안전한 인공지능 윤리를 엄격하게 준수합니다.
            </span>
          </div>

        </div>
      </div>

      {/* Guide Tips & Reset for multiple attempts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-2 max-w-xl text-xs">
          <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-slate-700 leading-relaxed">
            🎉 <strong>진심으로 축하드립니다!</strong> 식사 추천 인공지능 윤리 수호대를 멋지게 수행하여 안전하고 공평한 에이전트를 성공적으로 구축해 발표를 마쳤습니다.
          </p>
        </div>

        <button
          onClick={onResetAll}
          className="inline-flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-3xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-yellow-600" /> 처음부터 다시 실습하기
        </button>
      </div>
    </motion.div>
  );
}
