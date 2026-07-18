import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, Users, Eye, Edit3 } from 'lucide-react';

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
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 text-amber-900 rounded-full text-sm font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>청소년 AI 윤리 에이전트 설계 캠프</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-950 font-display tracking-tight leading-tight">
          찾기 쉬운 세 끼 <span className="text-yellow-600 font-sans">🍳</span>
        </h1>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
          세 끼 식사 메뉴 결정을 어려워하는 가정을 도와주는 AI 추천 에이전트! <br />
          윤리적 문제를 일으키는 AI를 분석하고, 올바른 설계 규칙을 반영하여 똑똑하고 안전한 우리 집 식사 도우미를 직접 만들어 봅시다!
        </p>
      </div>

      {/* Main Campaign Card */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-30 -mr-10 -mt-10" />
        
        <h2 className="text-xl md:text-2xl font-bold text-amber-900 font-display mb-4 flex items-center gap-2">
          🎯 오늘의 미션 안내
        </h2>
        
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-amber-100 text-slate-800 space-y-4 mb-6">
          <p className="text-lg font-semibold text-amber-950 border-l-4 border-yellow-500 pl-3">
            &ldquo;문제를 일으키는 AI를 고쳐서 빠르게 가정의 입맛에 맞는 요리를 찾는 안전한 에이전트를 만들자!&rdquo;
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
              <span className="text-2xl">🚨</span>
              <h3 className="font-bold text-amber-900 mt-1 text-sm">1단계. 문제 분석</h3>
              <p className="text-xs text-slate-600 mt-1">우리 가정을 곤란하게 만드는 나쁜 AI 에이전트의 행동을 조목조목 짚어내기</p>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
              <span className="text-2xl">🎨</span>
              <h3 className="font-bold text-amber-900 mt-1 text-sm">2단계. 윤리 설계</h3>
              <p className="text-xs text-slate-600 mt-1">개인정보를 노출하지 않고 공정하게 동작하도록 안전 규칙 캔버스 완성하기</p>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-bold text-amber-900 mt-1 text-sm">3단계. 공격 및 개선</h3>
              <p className="text-xs text-slate-600 mt-1">레드팀이 되어 AI 에이전트를 유도 공격해보고 튼튼하게 방어하도록 튜닝하기</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-amber-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-lg"
            id="start-mission-btn"
          >
            캠프 미션 시작하기 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick AI Ethics Dictionary */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-lg px-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <span>중학생을 위한 AI 윤리 핵심 용어 사전</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-amber-100 rounded-2xl p-5 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>⚖️ 공정성 (Fairness)</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              특정 음식점만 편애하거나 편향된 조건으로 추천하지 않는 것을 의미해요. 모든 요리와 가정이 평등하고 합리적인 기준에 따라 매칭되도록 돕습니다.
            </p>
          </div>

          <div className="bg-white border border-amber-100 rounded-2xl p-5 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>🔒 개인정보 보호 (Privacy)</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              이름, 상세 주소, 진짜 전화번호 등 실제 가정을 특정할 수 있는 비밀 정보를 묻거나 보관하지 않는 규칙이에요. 안전한 별명으로만 대화해요.
            </p>
          </div>

          <div className="bg-white border border-amber-100 rounded-2xl p-5 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>📢 투명성 (Transparency)</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              AI 에이전트가 어떤 알고리즘과 어떤 이유(남은 수량, 선점 여부 등)로 해당 음식을 추천했는지 상세히 밝혀서, 사용자가 납득할 수 있게 하는 성질입니다.
            </p>
          </div>

          <div className="bg-white border border-amber-100 rounded-2xl p-5 hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
              <Edit3 className="w-5 h-5 text-purple-600" />
              <span>🙋‍♂️ 사람 확인 (Human-in-the-loop)</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              AI가 알아서 주문과 결제를 최종 확정하는 것이 아니라, 예약 전 가정이 버튼을 직접 눌러 승인하는 최종 확인 절차를 갖춰 실수를 예방해요.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
