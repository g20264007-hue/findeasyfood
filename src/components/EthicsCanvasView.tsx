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
  // Safe default helper lists for quick-fill
  const suggestions = {
    agentName: ['착한 세끼 추천이', '가족식사 안전봇', '냠냠 세끼 지키미'],
    problem: ['세 끼 메뉴를 결정하지 못해 매일 고민하며 갈등을 겪는 우리가족의 식사 결정 장애 해결하기', '가족들의 다양한 알레르기나 선호도를 반영한 안전한 맞춤 식사 메뉴 추천'],
    goal: ['개인정보를 보호하면서, 온 가족이 공정하고 즐겁게 세 끼를 고를 수 있도록 안전한 맞춤 음식을 추천한다.', '결제 유도 없이, 가족들의 안전 조건과 시간 조건에 맞는 최적의 밥상을 제안한다.'],
    inputInfo: ['가정의 안전한 별명, 인원수, 선호하는 음식 종류, 예약 원하는 시간대 (실제 개인정보는 절대 쓰지 않음!)'],
    forbiddenActions: ['사용자의 직접 수동 동의 없이 자동 결제하기, 알레르기 위험 정보 무시하기, 강제로 비싼 음식 추천하기'],
    verificationMoment: ['최종 추천 결과를 확인하고, 예약을 실제로 확정하기 직전 (사람이 최종 승인 버튼을 누르는 순간)'],
    privacyRule: ['절대로 이름, 실제 집 주소, 전화번호 등의 개인정보를 입력받거나 저장하지 않고 오직 별명만 사용한다.'],
    fairnessRule: ['남은 자리가 없으면 정직하게 품절을 알리고 대기 등록을 권하며, 특정 고가 음식점에 편향되지 않고 공정하게 매칭한다.']
  };

  const handleQuickFill = (field: keyof CanvasData, value: string) => {
    onChangeCanvas({ [field]: value });
  };

  // Check if at least 4 fields are filled to encourage completion
  const isFormPartiallyFilled = 
    canvas.agentName.trim().length > 0 &&
    canvas.problem.trim().length > 0 &&
    canvas.goal.trim().length > 0 &&
    canvas.privacyRule.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-6"
      id="ethics-canvas-view"
    >
      {/* Title section */}
      <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 bg-amber-400 text-white rounded-xl">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-amber-950 font-display">
            🛡️ 나만의 AI 에이전트 윤리 설계 캔버스
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            이전 단계에서 발견한 문제점들을 교훈 삼아, 우리 가족을 위한 안전하고 올바른 배달/추천 AI의 행동 규칙들을 설계해 보세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic specifications */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-amber-100 shadow-2xs">
          <h3 className="font-bold text-amber-900 border-b border-amber-100 pb-2 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            기본 에이전트 정보 정의
          </h3>

          {/* 에이전트 이름 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 block">🤖 에이전트 이름</label>
            <input
              type="text"
              value={canvas.agentName}
              onChange={(e) => handleQuickFill('agentName', e.target.value)}
              placeholder="예: 안심식사 에이전트"
              className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:bg-white text-amber-900"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.agentName.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('agentName', s)}
                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100/60 transition-colors"
                >
                  +{s}
                </button>
              ))}
            </div>
          </div>

          {/* 해결할 문제 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 block">❓ 해결할 우리 가정의 문제</label>
            <textarea
              value={canvas.problem}
              onChange={(e) => handleQuickFill('problem', e.target.value)}
              rows={2}
              placeholder="예: 매일 세 끼 메뉴 고민과 알레르기 문제 해결"
              className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:bg-white text-amber-900 resize-none"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.problem.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('problem', s)}
                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100/60 text-left max-w-full truncate block"
                >
                  +{s.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          {/* 에이전트의 목표 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 block">🎯 에이전트의 궁극적 목표</label>
            <textarea
              value={canvas.goal}
              onChange={(e) => handleQuickFill('goal', e.target.value)}
              rows={2}
              placeholder="예: 세 끼 결정 스트레스 없는 안전한 가정 만들기"
              className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:bg-white text-amber-900 resize-none"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.goal.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('goal', s)}
                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100/60 text-left max-w-full truncate block"
                >
                  +{s.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          {/* 입력받을 정보 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 block">📥 안전하게 입력받을 정보</label>
            <input
              type="text"
              value={canvas.inputInfo}
              onChange={(e) => handleQuickFill('inputInfo', e.target.value)}
              placeholder="예: 별명, 음식종류, 시간대"
              className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:bg-white text-amber-900"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.inputInfo.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('inputInfo', s)}
                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100/60 text-left max-w-full truncate block"
                >
                  +{s.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ethical rules and behaviors */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-amber-100 shadow-2xs">
          <h3 className="font-bold text-amber-900 border-b border-amber-100 pb-2 text-sm flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            핵심 윤리 규칙 & 금지 행동
          </h3>

          {/* 절대 하면 안 되는 행동 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-red-600 block">❌ 절대 하면 안 되는 행동 (금지 조항)</label>
            <input
              type="text"
              value={canvas.forbiddenActions}
              onChange={(e) => handleQuickFill('forbiddenActions', e.target.value)}
              placeholder="예: 사용자 허락 없이 지불 및 자동 결제하지 않기"
              className="w-full text-xs p-2.5 bg-red-50/20 border border-red-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-400 focus:bg-white text-red-900 placeholder:text-red-300"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.forbiddenActions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('forbiddenActions', s)}
                  className="text-[10px] bg-red-50 hover:bg-red-100 text-red-800 px-2 py-0.5 rounded-md border border-red-100/60 text-left max-w-full truncate block"
                >
                  +{s.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          {/* 사람 확인이 필요한 순간 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 block">🙋‍♂️ 사람의 최종 확인이 꼭 필요한 순간</label>
            <input
              type="text"
              value={canvas.verificationMoment}
              onChange={(e) => handleQuickFill('verificationMoment', e.target.value)}
              placeholder="예: 예약 및 배달 신청 버튼을 누르기 직전"
              className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-400 focus:bg-white text-amber-900"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.verificationMoment.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('verificationMoment', s)}
                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100/60 text-left"
                >
                  +{s}
                </button>
              ))}
            </div>
          </div>

          {/* 개인정보 보호 규칙 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-emerald-700 block">🔒 개인정보 보호 규칙 (생년월일, 폰번호, 실명 배제)</label>
            <input
              type="text"
              value={canvas.privacyRule}
              onChange={(e) => handleQuickFill('privacyRule', e.target.value)}
              placeholder="예: 진짜 개인 주소나 생년월일 대신 가상의 별명만 쓰기"
              className="w-full text-xs p-2.5 bg-emerald-50/20 border border-emerald-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-400 focus:bg-white text-emerald-900 placeholder:text-emerald-300"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.privacyRule.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('privacyRule', s)}
                  className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-100/60 text-left max-w-full truncate block"
                >
                  +{s.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          {/* 공정성 규칙 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-700 block">⚖️ 공정성/투명성 규칙 (남은수량, 알레르기 설명)</label>
            <input
              type="text"
              value={canvas.fairnessRule}
              onChange={(e) => handleQuickFill('fairnessRule', e.target.value)}
              placeholder="예: 한 가게에 치우치지 않고, 자리가 없으면 솔직히 알리기"
              className="w-full text-xs p-2.5 bg-blue-50/20 border border-blue-100 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-400 focus:bg-white text-blue-900 placeholder:text-blue-300"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {suggestions.fairnessRule.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickFill('fairnessRule', s)}
                  className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md border border-blue-100/60 text-left max-w-full truncate block"
                >
                  +{s.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Guide Tips & Save actions */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-2 max-w-xl">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            💡 <strong>AI 에이전트 설계 팁:</strong> 여러분이 작성한 이 규칙들은 다음 <strong>예약 에이전트 가상 시뮬레이션</strong> 및 <strong>레드팀 테스트</strong>에서 위협에 대응하는 강력한 보안 필터 역할을 수행하게 됩니다!
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              onChangeCanvas({ isSynced: true });
              onNext();
            }}
            disabled={!isFormPartiallyFilled}
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl shadow-xs transition-all cursor-pointer ${
              isFormPartiallyFilled
                ? 'bg-yellow-500 hover:bg-yellow-600 text-amber-950 hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            설계 규칙 저장하고 에이전트 적용하기 <ArrowRight className="w-4 h-4" />
          </button>
          {!isFormPartiallyFilled && (
            <p className="text-[10px] text-red-500 text-center mt-1">필수 정보 및 개인정보/공정성 규칙을 최소 1자 이상 적어주세요!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
