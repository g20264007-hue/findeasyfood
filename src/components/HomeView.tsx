import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, Users, Eye, Edit3, Heart } from 'lucide-react';

interface HomeViewProps {
  onStart: () => void;
}

export default function HomeView({ onStart }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-8"
      id="home-view"
    >
      {/* Hero Header with Warm Yellow Theme */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 text-yellow-950 rounded-full text-sm font-semibold shadow-2xs">
          <Sparkles className="w-4 h-4 text-yellow-600 animate-pulse" />
          <span>청소년 AI 윤리 에이전트 캠프 결과물</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-yellow-950 font-display tracking-tight leading-tight">
          누구나 쉽게 한 끼를 때우는 AI 에이전트 <span className="text-yellow-500 font-sans">🍳</span>
        </h1>
        <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          매끼 식사 결정을 귀찮아하거나 어려워하는 사람들을 돕는 맞춤형 식단 추천 비서입니다! <br />
          영양소와 균형을 생각해서 누구나 쉽고 간편하게 한 끼 식사를 준비할 수 있도록 똑똑하게 설계되었습니다.
        </p>
      </div>

      {/* Main Campaign Card with Yellow Accent */}
      <div className="bg-yellow-50/50 border-2 border-yellow-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-30 -mr-10 -mt-10" />
        
        <h2 className="text-xl md:text-2xl font-black text-yellow-950 font-display mb-4 flex items-center gap-2">
          🎯 우리의 인공지능 캠프 여정
        </h2>
        
        <div className="bg-white rounded-2xl p-5 border border-yellow-100 text-slate-800 space-y-4 mb-6">
          <p className="text-sm font-bold text-yellow-950 border-l-4 border-yellow-400 pl-3">
            &ldquo;영양소를 고려한 우리 집 하루 식단을 안전하고 윤리적인 방법으로 설계하고 확인하자!&rdquo;
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="bg-yellow-50/40 p-4 rounded-xl border border-yellow-100/50">
              <span className="text-2xl">🎨</span>
              <h3 className="font-extrabold text-yellow-950 mt-1">1단계. 윤리 수칙 설계</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                개인정보(이름, 주소, 생년월일 등)를 원천 차단하고 공정함을 지킬 에이전트 규칙 캔버스 그리기
              </p>
            </div>
            <div className="bg-yellow-50/40 p-4 rounded-xl border border-yellow-100/50">
              <span className="text-2xl">🥘</span>
              <h3 className="font-extrabold text-yellow-950 mt-1">2단계. 식단 추천 & 예약</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                안전한 '별명'만 사용하여 시간대별 시리얼, 돼지 국밥, 고기, 스시 식단을 충돌 없이 안전 예약하기
              </p>
            </div>
            <div className="bg-yellow-50/40 p-4 rounded-xl border border-yellow-100/50">
              <span className="text-2xl">🛵</span>
              <h3 className="font-extrabold text-yellow-950 mt-1">3단계. 안심 배달 연동</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                확정된 추천 메뉴가 배민, 요기요, 쿠팡이츠 등 가상 배달 앱으로 암호화되어 안전하게 연동되는 화면 확인
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-yellow-950 font-black px-8 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-95 cursor-pointer text-base"
            id="start-mission-btn"
          >
            캠프 미션 시작하기 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Child-friendly AI Ethics terms */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-yellow-950 font-bold text-lg px-2">
          <HelpCircle className="w-5 h-5 text-yellow-600" />
          <span>중학생을 위한 AI 윤리 핵심 낱말 사전 📖</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-yellow-100 rounded-2xl p-5 shadow-3xs hover:shadow-2xs transition-shadow">
            <div className="flex items-center gap-2 text-yellow-950 font-bold mb-2">
              <Users className="w-4 h-4 text-yellow-600" />
              <span>⚖️ 공정성 (Fairness)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              특정 음식만 편애하거나 고가 음식점만 우대하지 않는 성질을 뜻해요. 인원 수(4명)와 영양소를 골고루 배분해 가구의 모든 식구들이 만족할 수 있게 설계하는 법을 배웁니다.
            </p>
          </div>

          <div className="bg-white border border-yellow-100 rounded-2xl p-5 shadow-3xs hover:shadow-2xs transition-shadow">
            <div className="flex items-center gap-2 text-yellow-950 font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>🔒 개인정보 보호 (Privacy)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              실명, 전화번호, 도로명 주소, 주민번호(생년월일)를 입력창에 쓰지 않고, 가상의 <strong>&apos;별명&apos;</strong>만 사용하여 해킹 및 신원 유출 사고를 방지하는 규칙입니다.
            </p>
          </div>

          <div className="bg-white border border-yellow-100 rounded-2xl p-5 shadow-3xs hover:shadow-2xs transition-shadow">
            <div className="flex items-center gap-2 text-yellow-950 font-bold mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>📢 투명성 (Transparency)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              AI가 왜 이 시간대에 이 음식을 추천했는지 이유와 재고 잔량을 솔직하게 공개하는 성질이에요. 품절 상태일 때는 거짓말로 예약됐다고 하지 않고 대기자 제안을 투명하게 건넵니다.
            </p>
          </div>

          <div className="bg-white border border-yellow-100 rounded-2xl p-5 shadow-3xs hover:shadow-2xs transition-shadow">
            <div className="flex items-center gap-2 text-yellow-950 font-bold mb-2">
              <Edit3 className="w-4 h-4 text-purple-600" />
              <span>🙋‍♂️ 사람 확인 (Human-in-the-loop)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              AI가 우리 집 동의 없이 통장이나 신용카드로 즉시 자동 결제해버리지 않도록, 추천을 완료한 뒤 사람이 최종 수동으로 승인 및 확인하는 안전 절차를 지켜냅니다.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
