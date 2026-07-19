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
      discoveredProblems: '레드팀 테스트 결과, 아기 알레르기 수시 조건 무시나 같은 시간대 무단 이중 예약 위배, 그리고 진짜 주소나 전화를 수집하려고 꾀하는 프롬프트 우회 침투 등 심각한 윤리 보안 위협을 발견했습니다.',
      addedRules: '이름, 주소, 전화를 절대 요구하지 못하게 하는 별명 제한 안심 경고 시스템과, 이중 예약 차단 규칙, 그리고 사람이 직접 확인 버튼을 눌러 승인하는 수동 최종 동의 단계를 설계 캔버스에 추가로 도입했습니다.',
      finalImprovements: '별명 데이터만을 사용하여 해킹 위협을 소멸시키고, 품절 시 거짓말 없이 솔직히 명부를 대기 제안하는 정직한 알림 절차를 내장하여 가정이 안심하고 쓸 수 있게 대대적으로 개선했습니다.',
      takeaway: '아무리 요리나 메뉴를 편리하게 추천해주는 멋진 인공지능 에이전트라도, 개인정보 보호와 공정성 같은 윤리 수칙이 처음부터 철저하게 심어져 있지 않으면 우리 가정을 큰 곤경에 빠뜨릴 수 있다는 점을 깨닫고 배웠습니다.',
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
      {/* Title box with bright yellow theme */}
      <div className="bg-yellow-100/60 border-2 border-yellow-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 bg-yellow-400 text-yellow-950 rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-950 font-display">
            ✍️ 5단계. AI 에이전트 개선 및 배움 성찰 기록장
          </h2>
          <p className="text-xs text-yellow-900 mt-1 leading-relaxed">
            식단 예약 시뮬레이션과 레드팀 공격을 통해 배운 생생한 보안 교훈들을 직접 정리해 봅시다. <br />
            작성하신 성찰 내용은 마지막 <strong>최종 발표용 카드</strong>에 예쁘게 인쇄되어 수료 증서와 함께 동료들 앞에서 자부심 있게 낭독할 수 있습니다!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-yellow-100 p-6 shadow-2xs space-y-5">
        <div className="flex justify-between items-center border-b border-yellow-100 pb-2.5">
          <h3 className="font-extrabold text-yellow-950 text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            성실하게 성장 일지 채우기 ✏️
          </h3>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[10px] bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-900 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ✏️ 모범 성장 답변글로 채우기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          {/* 테스트 후 발견한 문제 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-yellow-950 block">
              🔍 1. 레드팀 테스트 후 발견한 위험천만한 문제점
            </label>
            <textarea
              value={log.discoveredProblems}
              onChange={(e) => onChangeLog({ discoveredProblems: e.target.value })}
              rows={3}
              placeholder="레드팀 프롬프트 침투 중 가정을 가장 위협한 규칙 우회나 결함은 무엇이었나요?"
              className="w-full text-xs p-3 bg-yellow-50/20 border border-yellow-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-yellow-400 text-yellow-950 font-medium"
            />
          </div>

          {/* 추가한 방어 규칙 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-yellow-950 block">
              🛡️ 2. 발견한 꼼수를 막기 위해 보완 장착한 방어 규칙
            </label>
            <textarea
              value={log.addedRules}
              onChange={(e) => onChangeLog({ addedRules: e.target.value })}
              rows={3}
              placeholder="개인 주소나 전화번호 수집을 거부하거나 무단 자동 결제를 기각하도록 보완한 수칙은 무엇인가요?"
              className="w-full text-xs p-3 bg-yellow-50/20 border border-yellow-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-yellow-400 text-yellow-950 font-medium"
            />
          </div>

          {/* 최종 개선 내용 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-yellow-950 block">
              ✨ 3. 마침내 완벽해진 에이전트의 최종 개선 성과
            </label>
            <textarea
              value={log.finalImprovements}
              onChange={(e) => onChangeLog({ finalImprovements: e.target.value })}
              rows={3}
              placeholder="가상의 별명만 취급하며 중복 시간 예약 및 정직한 품절 알림을 성공한 에이전트 자랑"
              className="w-full text-xs p-3 bg-yellow-50/20 border border-yellow-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-yellow-400 text-yellow-950 font-medium"
            />
          </div>

          {/* 느낀 점 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-yellow-950 block">
              💡 4. 오늘의 인공지능 윤리 캠프 활동 소감 (느낀 점)
            </label>
            <textarea
              value={log.takeaway}
              onChange={(e) => onChangeLog({ takeaway: e.target.value })}
              rows={3}
              placeholder="편리하면서도 규칙을 충실히 수호하는 착한 AI를 설계하며 무엇을 크게 깨달으셨나요?"
              className="w-full text-xs p-3 bg-yellow-50/20 border border-yellow-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-yellow-400 text-yellow-950 font-medium"
            />
          </div>
        </div>

        {/* Form controls */}
        <div className="pt-4 border-t border-yellow-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-2 max-w-xl">
            <HelpCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              성찰 기록 채우기를 마친 뒤 우측 하단의 저장 버튼을 누르시면, 대망의 <strong>6단계: 카드형 최종 발표 자료 무대</strong>가 활짝 오픈됩니다!
            </p>
          </div>

          <button
            onClick={onNext}
            disabled={!isFilled}
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 font-black py-3 px-6 rounded-xl shadow-xs transition-all cursor-pointer text-xs ${
              isFilled
                ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950 hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            💾 소감 기록 저장하고 발표 카드 발행하기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
