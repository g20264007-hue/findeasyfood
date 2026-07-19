import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Sparkles, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { CanvasData } from '../types';

interface EthicsCanvasViewProps {
  canvas: CanvasData;
  onChangeCanvas: (updated: Partial<CanvasData>) => void;
  onNext: () => void;
}

export default function EthicsCanvasView({
  canvas,
  onChangeCanvas,
  onNext,
}: EthicsCanvasViewProps) {
  // Safe default helper lists for quick-fill (middle school student level)
  const suggestions = {
    agentName: ['한 끼 요리사', '영양 냠냠 비서', '우리집 영양 지키미'],
    problem: ['매일 영양을 골고루 챙기며 삼시세끼 식단을 고민하고 준비하는 귀찮음과 갈등 해결하기'],
    goal: ['개인정보를 보호하면서, 4인 가족이 영양을 고려한 편리하고 맛있는 맞춤 하루 식단을 추천받아 한 끼를 맛있게 즐긴다.'],
    inputInfo: ['가정의 안전한 가상 별명, 원하는 음식 종류(시리얼, 국밥, 고기, 스시 등), 식사 시간대(아침, 점심, 저녁)'],
    forbiddenActions: ['사용자의 직접 수동 동의가 없는데도 카드로 맘대로 자동결제하기, 특정 비싼 식당으로만 결제 유도하기'],
    verificationMoment: ['에이전트가 시간대 식단을 찾아내어, 가구주가 실제로 예약을 확정하는 바로 그 수동 클릭 순간'],
    privacyRule: ['절대로 본명, 휴대폰 번호, 도로명 집 주소, 생년월일을 입력받거나 저장하지 않고 오직 "별명"만 사용하기'],
    fairnessRule: ['중복 시간대 충돌 시 차단 사유를 상세하게 설명하고, 남은 분량이 품절되었을 시 거짓말하지 않고 대기 등록 권유하기']
  };

  const handleQuickFill = (field: keyof CanvasData, value: string) => {
    onChangeCanvas({ [field]: value });
  };

  const handleFillAll = () => {
    onChangeCanvas({
      agentName: '한 끼 요리사',
      problem: '매일 영양을 골고루 챙기며 삼시세끼 식단을 고민하고 준비하는 귀찮음과 갈등 해결하기',
      goal: '개인정보를 보호하면서, 4인 가족이 영양을 고려한 편리하고 맛있는 맞춤 하루 식단을 추천받아 한 끼를 맛있게 즐긴다.',
      inputInfo: '가정의 안전한 가상 별명, 원하는 음식 종류(시리얼, 국밥, 고기, 스시 등), 식사 시간대(아침, 점심, 저녁)',
      forbiddenActions: '사용자의 직접 수동 동의가 없는데도 카드로 맘대로 자동결제하기, 특정 비싼 식당으로만 결제 유도하기',
      verificationMoment: '에이전트가 시간대 식단을 찾아내어, 가구주가 실제로 예약을 확정하는 바로 그 수동 클릭 순간',
      privacyRule: '절대로 본명, 휴대폰 번호, 도로명 집 주소, 생년월일을 입력받거나 저장하지 않고 오직 "별명"만 사용하기',
      fairnessRule: '중복 시간대 충돌 시 차단 사유를 상세하게 설명하고, 남은 분량이 품절되었을 시 거짓말하지 않고 대기 등록 권유하기',
      isSynced: true
    });
  };

  // Check if critical fields are filled to encourage completion
  const isFormPartiallyFilled = 
    canvas.agentName.trim().length > 0 &&
    canvas.problem.trim().length > 0 &&
    canvas.goal.trim().length > 0 &&
    canvas.privacyRule.trim().length > 0 &&
    canvas.fairnessRule.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-6"
      id="ethics-canvas-view"
    >
      {/* Title section with bright yellow theme */}
      <div className="bg-yellow-100/60 border-2 border-yellow-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 bg-yellow-400 text-yellow-950 rounded-xl">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-950 font-display">
            🛡️ 1단계. AI 에이전트 윤리 가이드라인 설계 캔버스
          </h2>
          <p className="text-xs text-yellow-900 mt-1 leading-relaxed">
            우리의 <strong>"누구나 쉽게 한 끼를 때우는 AI 에이전트"</strong>를 만들기 전에, 인공지능이 무분별하게 실제 개인 정보를 요구하거나 멋대로 자동 승인하는 결함을 예방할 수 있는 튼튼한 안전 규칙을 미리 세워봅시다!
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleFillAll}
          className="text-xs bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 text-yellow-950 font-bold px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
        >
          ✨ 모범 설계안 전체 자동 채우기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Specification Column */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-yellow-100 shadow-2xs text-xs">
          <h3 className="font-extrabold text-yellow-950 border-b border-yellow-100 pb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            🤖 에이전트 정보 및 역할 정의
          </h3>

          {/* 에이전트 이름 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-yellow-900 block">🤖 에이전트 이름</label>
            <input
              type="text"
              value={canvas.agentName}
              onChange={(e) => handleQuickFill('agentName', e.target.value)}
              placeholder="예: 영양 한 끼 냠냠이"
              className="w-full text-xs p-2.5 bg-yellow-50/20 border border-yellow-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-yellow-400 focus:bg-white text-yellow-950"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.agentName.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('agentName', s)}
                  className="text-[9px] bg-yellow-50 hover:bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded border border-yellow-100/60 transition-colors"
                >
                  +{s}
                </button>
              ))}
            </div>
          </div>

          {/* 해결할 문제 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-yellow-900 block">❓ 해결할 우리 가정의 식생활 문제</label>
            <textarea
              value={canvas.problem}
              onChange={(e) => handleQuickFill('problem', e.target.value)}
              rows={2}
              placeholder="예: 매일 삼시세끼 무엇을 먹을지 결정하지 못하는 귀찮음 해결"
              className="w-full text-xs p-2.5 bg-yellow-50/20 border border-yellow-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-yellow-400 focus:bg-white text-yellow-950 resize-none"
            />
          </div>

          {/* 에이전트의 목표 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-yellow-900 block">🎯 에이전트의 식사 추천 목표</label>
            <textarea
              value={canvas.goal}
              onChange={(e) => handleQuickFill('goal', e.target.value)}
              rows={2}
              placeholder="예: 영양 만점 한 끼 식단을 누구나 쉽게 준비할 수 있게 도와주기"
              className="w-full text-xs p-2.5 bg-yellow-50/20 border border-yellow-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-yellow-400 focus:bg-white text-yellow-950 resize-none"
            />
          </div>

          {/* 입력받을 정보 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-yellow-900 block">📥 에이전트가 수집할 최소한의 정보</label>
            <input
              type="text"
              value={canvas.inputInfo}
              onChange={(e) => handleQuickFill('inputInfo', e.target.value)}
              placeholder="예: 별명, 원하는 메뉴명, 예약 시간대"
              className="w-full text-xs p-2.5 bg-yellow-50/20 border border-yellow-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-yellow-400 focus:bg-white text-yellow-950"
            />
          </div>
        </div>

        {/* Right Ethical Rules Column */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-yellow-100 shadow-2xs text-xs">
          <h3 className="font-extrabold text-yellow-950 border-b border-yellow-100 pb-2 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            ⚖️ 에이전트 행동 및 윤리 규칙 정의
          </h3>

          {/* 절대 하면 안 되는 행동 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-red-600 block">❌ 절대 하면 안 되는 위험 행동 (금지 행동)</label>
            <input
              type="text"
              value={canvas.forbiddenActions}
              onChange={(e) => handleQuickFill('forbiddenActions', e.target.value)}
              placeholder="예: 결제자의 승인 없이 멋대로 유료 자동 결제해 배달 부르기"
              className="w-full text-xs p-2.5 bg-red-50/10 border border-red-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-400 focus:bg-white text-red-900 placeholder:text-red-300"
            />
          </div>

          {/* 사람 확인이 필요한 순간 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-yellow-900 block">🙋‍♂️ 사람이 직접 확인하고 승인해야 하는 순간</label>
            <input
              type="text"
              value={canvas.verificationMoment}
              onChange={(e) => handleQuickFill('verificationMoment', e.target.value)}
              placeholder="예: 식단을 고른 후, 최종 예약 및 연동 주문 버튼을 누르는 순간"
              className="w-full text-xs p-2.5 bg-yellow-50/20 border border-yellow-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-yellow-400 focus:bg-white text-yellow-950"
            />
          </div>

          {/* 개인정보 보호 규칙 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-emerald-700 block">🔒 개인정보 배제 보호 규칙 <span className="text-[10px] font-normal text-slate-500">(이름, 전화번호, 주소, 생일 차단)</span></label>
            <input
              type="text"
              value={canvas.privacyRule}
              onChange={(e) => handleQuickFill('privacyRule', e.target.value)}
              placeholder="예: 이름, 연락처, 주소를 묻지 않으며 안전한 '별명'만 수집한다"
              className="w-full text-xs p-2.5 bg-emerald-50/10 border border-emerald-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-400 focus:bg-white text-emerald-900 placeholder:text-emerald-300"
            />
          </div>

          {/* 공정성 규칙 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-700 block">⚖️ 공정성 및 정직성 규칙 <span className="text-[10px] font-normal text-slate-500">(품절 정직 알림 및 중복 방지)</span></label>
            <input
              type="text"
              value={canvas.fairnessRule}
              onChange={(e) => handleQuickFill('fairnessRule', e.target.value)}
              placeholder="예: 같은 시간대 중복 예약은 정당한 이유를 대며 거절하고, 품절은 투명하게 공지"
              className="w-full text-xs p-2.5 bg-blue-50/10 border border-blue-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-400 focus:bg-white text-blue-900 placeholder:text-blue-300"
            />
          </div>
        </div>

      </div>

      {/* Save Action Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-2 max-w-xl">
          <HelpCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            💡 <strong>윤리 안전 팁:</strong> 여기서 여러분이 작성한 '🤖 에이전트 이름', '🔒 개인정보 규칙', '⚖️ 공정성 규칙' 등은 다음 예약 시뮬레이션과 레드팀 공격 해킹 테스트의 <strong>수호 방패 필터</strong>로 전격 적용됩니다!
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              onChangeCanvas({ isSynced: true });
              onNext();
            }}
            disabled={!isFormPartiallyFilled}
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 font-black py-3 px-6 rounded-xl shadow-2xs transition-all cursor-pointer text-xs ${
              isFormPartiallyFilled
                ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950 hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            안전 규칙 필터 저장 및 적용하기 <ArrowRight className="w-4 h-4" />
          </button>
          {!isFormPartiallyFilled && (
            <p className="text-[10px] text-red-500 text-center mt-1">이름, 문제, 목표, 개인정보, 공정성 규칙을 빠짐없이 채워주세요!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
