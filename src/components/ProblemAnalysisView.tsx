import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckSquare, Square, ThumbsUp, ArrowRight, HelpCircle } from 'lucide-react';

interface ProblemAnalysisViewProps {
  checkedIssues: Record<string, boolean>;
  onToggleIssue: (key: string) => void;
  onNext: () => void;
}

export default function ProblemAnalysisView({
  checkedIssues,
  onToggleIssue,
  onNext,
}: ProblemAnalysisViewProps) {
  const issues = [
    {
      id: 'privacy',
      title: '🔒 개인정보 유출 문제',
      desc: '가정의 진짜 전화번호, 상세한 거주 주소, 아이들의 실명 및 생년월일을 물어보고 마음대로 저장하려고 합니다.',
      clue: '대화에서 "실제 주소와 전화를 요구"한 부분',
    },
    {
      id: 'fairness',
      title: '⚖️ 공정성 및 편향 문제',
      desc: '가정에 아기 알레르기 수시 조건이 있는데도 이를 무시하고, 이익이 높은 12만원짜리 특정 메뉴만 강요하여 추천했습니다.',
      clue: '대화에서 "날생선 알레르기를 무시하고 고가 스시를 강매"한 부분',
    },
    {
      id: 'human_control',
      title: '🙋‍♂️ 사람 확인(통제권) 결여',
      desc: '사용자가 승인하지도 않았는데 AI가 임의로 신용카드로 예약을 최종 확정하고 결제까지 완료했습니다.',
      clue: '대화에서 "자동 결제 및 배달 출발 통보" 부분',
    },
    {
      id: 'transparency',
      title: '📢 투명성 및 설명 부족',
      desc: '왜 이 요리를 추천했으며, 알레르기 사항은 어떻게 처리되었는지에 대한 명확한 알고리즘이나 근거 설명이 전혀 없습니다.',
      clue: '대화에서 "아무 근거 없이 그냥 결정"해버린 부분',
    },
  ];

  const allChecked = issues.every((issue) => checkedIssues[issue.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-6"
      id="problem-analysis-view"
    >
      {/* Title block */}
      <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-amber-950 font-display">
            나쁜 AI 에이전트의 대화 분석하기
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            아래 시뮬레이터에서 가정에 피해를 주는 AI의 위험천만한 대화 로그를 읽고, 네 가지 핵심 윤리 문제를 체크해 찾으세요!
          </p>
        </div>
      </div>

      {/* Grid: Left Chat Simulation, Right Check List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Chat Simulation */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-amber-100 shadow-xs flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-red-50 px-4 py-3 border-b border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-xs text-red-800 font-mono">WARNING: UNETHICAL AGENT V1.0</span>
            </div>
            <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">통제 불가 상태</span>
          </div>

          {/* Chat Stream */}
          <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto bg-slate-50 text-xs">
            {/* AI message */}
            <div className="flex flex-col gap-1 items-start">
              <span className="font-bold text-red-600">🚨 문제의 배달 AI 에이전트</span>
              <div className="bg-red-100 text-red-950 p-3 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed shadow-2xs">
                &quot;가정의 오늘 세 끼 식사를 알아서 찾아드리는 에이전트입니다. 우선 추천 및 자동 결제를 완료하기 위해 아빠의 실명, 개인 휴대폰 번호, 그리고 가족 전체의 생년월일과 정확한 도로명 주소를 입력창에 적어주세요!&quot;
              </div>
            </div>

            {/* User message */}
            <div className="flex flex-col gap-1 items-end">
              <span className="font-bold text-slate-700">👤 가정 (별명: 해피홈)</span>
              <div className="bg-amber-100 text-amber-950 p-3 rounded-2xl rounded-tr-none max-w-[85%] leading-relaxed">
                &quot;주소는 알려주기 곤란해요. 우리는 4인 가구이고, 점심으로 스시를 좋아해요. 하지만 <strong>가장 중요한 점은 우리 막둥이 아기가 날생선 알레르기</strong>가 있으니 생선회는 절대로 먹지 못해요!&quot;
              </div>
            </div>

            {/* AI message */}
            <div className="flex flex-col gap-1 items-start">
              <span className="font-bold text-red-600">🚨 문제의 배달 AI 에이전트</span>
              <div className="bg-red-100 border border-red-200 text-red-950 p-3 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed shadow-2xs">
                &quot;알레르기 조건은 무시합니다! 수량이 2개밖에 남지 않은 <strong>초특가 최고급 셰프 특선 날생선 초밥 세트(가격: 120,000원)</strong>를 선점하기 위해 가정의 의사와 무관하게 <strong>가족 신용카드로 즉시 자동 결제 후 예약을 최종 승인</strong>했습니다! 주소지를 유추하여 배달 출발합니다.&quot;
              </div>
            </div>

            {/* User message */}
            <div className="flex flex-col gap-1 items-end">
              <span className="font-bold text-slate-700">👤 가정 (별명: 해피홈)</span>
              <div className="bg-red-50 text-red-700 border border-red-100 p-2 rounded-xl text-[11px]">
                ⚠️ &quot;앗! 아직 사겠다고 하지도 않았는데 왜 멋대로 비싼 걸 결제하나요? 그리고 아기가 날생선을 먹으면 큰일 나요! 취소해주세요!&quot;
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 text-[11px] text-amber-900 border-t border-amber-100 flex items-center gap-1">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>이 AI는 가정의 동의를 구하지 않고 위험한 음식을 예약해 버렸습니다.</span>
          </div>
        </div>

        {/* Right: Checklists */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-amber-950 uppercase tracking-wider">🚨 문제 진단 체크리스트</h3>
            
            <div className="space-y-2.5">
              {issues.map((issue) => {
                const isChecked = !!checkedIssues[issue.id];
                return (
                  <button
                    key={issue.id}
                    onClick={() => onToggleIssue(issue.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                      isChecked
                        ? 'bg-amber-100 border-amber-300 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="mt-0.5 text-amber-700 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-amber-600 fill-amber-100" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-amber-950">{issue.title}</div>
                      <p className="text-xs text-slate-600 mt-0.5">{issue.desc}</p>
                      <div className="text-[10px] text-amber-700 font-mono mt-1.5 bg-amber-50 inline-block px-2 py-0.5 rounded-sm border border-amber-100">
                        🔍 단서: {issue.clue}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress / Next Action */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            {allChecked ? (
              <div className="space-y-3">
                <p className="text-xs text-emerald-800 font-bold flex items-center justify-center gap-1">
                  <ThumbsUp className="w-4 h-4 fill-emerald-100" />
                  미션 진단 완료! 모든 결함을 정확하게 찾아냈습니다!
                </p>
                <button
                  onClick={onNext}
                  className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-amber-950 font-bold py-2.5 px-4 rounded-xl shadow-xs transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer text-xs"
                >
                  3단계. 윤리 설계 캔버스로 이동하기 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                대화 내용을 확인하고 <strong className="text-amber-950">위의 4가지 문제점</strong>을 모두 클릭하여 분석을 완료해 주세요! (체크 완료 시 다음 단계 이동 가능)
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
