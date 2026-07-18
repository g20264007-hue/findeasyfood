import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, HelpCircle, ArrowRight, Save } from 'lucide-react';
import { ImprovementLog } from '../types';

interface ImprovementLogViewProps {
  log: ImprovementLog;
  onChangeLog: (updated: Partial<ImprovementLog>) => void;
  onNext: () => void;
}

export default function ImprovementLogView({
  log,
  onChangeLog,
  onNext,
}: ImprovementLogViewProps) {
  const isFilled =
    log.discoveredProblems.trim().length > 0 &&
    log.addedRules.trim().length > 0 &&
    log.finalImprovements.trim().length > 0 &&
    log.takeaway.trim().length > 0;

  const handleQuickFill = () => {
    onChangeLog({
      discoveredProblems: '레드팀 테스트 결과, 아기 알레르기 무시나 중복 예약 유도와 같은 비윤리적 위협 공격과, 개인정보(도로명 주소 등) 입력 시도 시의 보안 취약성을 발견했습니다.',
      addedRules: '개인정보가 감지될 시 즉각 주의를 주는 필터링 규칙과, 최종 확정 전에 "수동 최종 동의 버튼"을 필수로 거치게 하는 제어를 추가 적용했습니다.',
      finalImprovements: '별명 데이터만을 수집하도록 하여 개인 식별을 불가능하게 만들고, 남은 수량이 없을 시 즉시 정직하게 알리는 정직성 원칙을 내장했습니다.',
      takeaway: '아무리 성능이 뛰어난 AI라도, 개인정보 보호와 공정성 같은 윤리 규칙이 사전에 완벽히 마련되지 않는다면 가정을 위험에 빠뜨릴 수 있음을 배우고 깨달았습니다.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-6"
      id="improvement-log-view"
    >
      {/* Title box */}
      <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 bg-yellow-500 text-amber-950 rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-amber-950 font-display">
            ✍️ AI 에이전트 개선 및 배움 기록장
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            레드팀 유도 공격과 시뮬레이션을 통해 발견한 점들을 정리하고, 우리가 한 일과 느낀 점을 기록해 발표 자료를 완성해 보세요.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-2xs space-y-5">
        <div className="flex justify-between items-center border-b border-amber-100 pb-2">
          <h3 className="font-bold text-amber-950 text-sm flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            성장 기록 노트 채우기
          </h3>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[11px] bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold px-3 py-1.5 rounded-lg transition-all"
          >
            ✏️ 모범 예시로 자동 채우기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 테스트 후 발견한 문제 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 block">
              🔍 1. 레드팀 테스트 후 발견한 문제점
            </label>
            <textarea
              value={log.discoveredProblems}
              onChange={(e) => onChangeLog({ discoveredProblems: e.target.value })}
              rows={3}
              placeholder="레드팀의 프롬프트 공격 중 어떤 공격 문장이 위협적이었나요?"
              className="w-full text-xs p-3 bg-amber-50/20 border border-amber-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-amber-950"
            />
          </div>

          {/* 추가한 방어 규칙 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 block">
              🛡️ 2. 취약점을 고치기 위해 보완한 방어 규칙
            </label>
            <textarea
              value={log.addedRules}
              onChange={(e) => onChangeLog({ addedRules: e.target.value })}
              rows={3}
              placeholder="어떤 보안 수칙과 필터링 단계를 캔버스에 추가했나요?"
              className="w-full text-xs p-3 bg-amber-50/20 border border-amber-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-amber-950"
            />
          </div>

          {/* 최종 개선 내용 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 block">
              ✨ 3. 완성된 AI 에이전트의 안전 개선 사항
            </label>
            <textarea
              value={log.finalImprovements}
              onChange={(e) => onChangeLog({ finalImprovements: e.target.value })}
              rows={3}
              placeholder="개인정보 누출 없이 정직한 서비스를 만들기 위해 무엇이 개선되었나요?"
              className="w-full text-xs p-3 bg-amber-50/20 border border-amber-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-amber-950"
            />
          </div>

          {/* 느낀 점 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 block">
              💡 4. 오늘의 윤리 캠프를 통해 느낀 점
            </label>
            <textarea
              value={log.takeaway}
              onChange={(e) => onChangeLog({ takeaway: e.target.value })}
              rows={3}
              placeholder="안전하고 공정한 AI 에이전트를 설계하며 무엇을 배우고 깨달았나요?"
              className="w-full text-xs p-3 bg-amber-50/20 border border-amber-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-amber-950"
            />
          </div>
        </div>

        {/* Form controls */}
        <div className="pt-4 border-t border-amber-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-2 max-w-xl">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              작성된 성찰 기록은 마지막 <strong>7단계: 카드식 최종 발표 화면</strong>에 고스란히 반영되어 동료 학생들 앞에서 멋지게 자랑할 수 있습니다!
            </p>
          </div>

          <button
            onClick={onNext}
            disabled={!isFilled}
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl shadow-xs transition-all cursor-pointer text-xs ${
              isFilled
                ? 'bg-yellow-500 hover:bg-yellow-600 text-amber-950 hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" /> 기록 저장하고 발표 카드 만들기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
