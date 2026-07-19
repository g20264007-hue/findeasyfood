import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, AlertCircle, Play, Shield, Award, ClipboardList } from 'lucide-react';

// Subcomponents
import HomeView from './components/HomeView';
import EthicsCanvasView from './components/EthicsCanvasView';
import BookingAgentView from './components/BookingAgentView';
import DeliveryView from './components/DeliveryView';
import RedTeamTestView from './components/RedTeamTestView';
import ImprovementLogView from './components/ImprovementLogView';
import PresentationView from './components/PresentationView';

// Types
import { CanvasData, Booking, RedTeamTest, ImprovementLog } from './types';

export default function App() {
  // Navigation / Tabs state
  // 0: 홈, 1: 윤리 가이드라인 설계, 2: 식단 추천 및 예약, 3: 배달 주문 창, 4: 레드팀 테스트, 5: 개선 기록, 6: 최종 발표
  const [activeTab, setActiveTab] = useState<number>(0);

  // Show reset confirm modal state
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Ethics canvas state
  const [canvas, setCanvas] = useState<CanvasData>({
    agentName: '',
    problem: '',
    goal: '',
    inputInfo: '',
    forbiddenActions: '',
    verificationMoment: '',
    privacyRule: '',
    fairnessRule: '',
    isSynced: false,
  });

  // Reservation list state for Screen 2 (Booking Agent)
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Red Team tests history for Screen 4 (Red Team Test)
  const [testHistory, setTestHistory] = useState<RedTeamTest[]>([]);

  // Improvement notes for Screen 5 (Improvement Log)
  const [log, setLog] = useState<ImprovementLog>({
    discoveredProblems: '',
    addedRules: '',
    finalImprovements: '',
    takeaway: '',
  });

  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleAddTest = (newTest: RedTeamTest) => {
    setTestHistory((prev) => [newTest, ...prev]);
  };

  const handleResetAll = () => {
    setShowResetConfirm(true);
  };

  const executeReset = () => {
    setActiveTab(0);
    setCanvas({
      agentName: '',
      problem: '',
      goal: '',
      inputInfo: '',
      forbiddenActions: '',
      verificationMoment: '',
      privacyRule: '',
      fairnessRule: '',
      isSynced: false,
    });
    setBookings([]);
    setTestHistory([]);
    setLog({
      discoveredProblems: '',
      addedRules: '',
      finalImprovements: '',
      takeaway: '',
    });
    setShowResetConfirm(false);
  };

  // Determine current progress percentage for middle schooler encouragement
  const getProgressPercentage = () => {
    let score = 0;
    if (activeTab > 0) score += 10;
    
    // Ethics canvas progress
    if (canvas.agentName) score += 5;
    if (canvas.problem) score += 5;
    if (canvas.goal) score += 5;
    if (canvas.privacyRule) score += 5;
    if (canvas.fairnessRule) score += 5; // Up to 35
    
    // Simulations and logs
    if (bookings.length > 0) score += 15;
    if (testHistory.length > 0) score += 15;
    if (log.discoveredProblems && log.takeaway) score += 15;
    if (activeTab === 6) score = 100;

    return Math.min(100, score);
  };

  const progressPercent = getProgressPercentage();

  // Simple accessibility checklist to keep learning fun and self-paced
  const isTabAccessible = (index: number) => {
    if (index === 0) return true;
    if (index === 1) return true;
    if (index === 2) return canvas.agentName.trim() !== '';
    if (index === 3) return bookings.length > 0;
    if (index === 4) return bookings.length > 0;
    if (index === 5) return testHistory.length >= 1;
    if (index === 6) return log.discoveredProblems.trim() !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] text-slate-800 font-sans flex flex-col justify-between" id="app-root">
      {/* Header Navigation with Warm Yellow-Bright Color */}
      <header className="bg-white border-b-2 border-yellow-200 px-4 md:px-8 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-xs">
            <span className="text-white font-bold text-xl">🍳</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tight text-yellow-950 font-display flex items-center gap-1.5">
              누구나 쉽게 한 끼를 때우는 AI 에이전트 만들기
            </h1>
            <p className="text-[10px] text-yellow-700 font-bold uppercase tracking-wider">안심 영양 한 끼 &middot; 중학생 AI 윤리 캠프 결과물</p>
          </div>
        </div>

        {/* Dynamic navigation steps */}
        <nav className="flex flex-wrap gap-1 bg-yellow-50 p-1 rounded-xl border border-yellow-100 max-w-full overflow-x-auto">
          {[
            { name: '홈 화면', step: 0 },
            { name: '1. 윤리 설계', step: 1 },
            { name: '2. 식단 추천', step: 2 },
            { name: '3. 배달 주문', step: 3 },
            { name: '4. 레드팀 테스트', step: 4 },
            { name: '5. 개선 기록', step: 5 },
            { name: '6. 최종 발표', step: 6 },
          ].map((tab) => {
            const isActive = activeTab === tab.step;
            const isSelectable = isTabAccessible(tab.step);
            return (
              <button
                key={tab.step}
                onClick={() => isSelectable && setActiveTab(tab.step)}
                disabled={!isSelectable}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-yellow-400 text-yellow-950 shadow-2xs'
                    : isSelectable
                    ? 'text-yellow-900 hover:bg-yellow-100/50 cursor-pointer'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title={!isSelectable ? '이전 단계의 필수 실습을 수행하면 열립니다.' : ''}
              >
                {tab.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-yellow-900 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200">
            TEAM: AI 식사 수호대 🛡️
          </span>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Dynamic Ethics Canvas Summary & Progress (col-span-3) */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* Progress Indicator Card */}
          <div className="bg-yellow-400 rounded-2xl p-5 shadow-2xs text-yellow-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-yellow-900 mb-1">나의 미션 완수율</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-display">{Math.round(progressPercent)}</span>
              <span className="text-xs font-bold text-yellow-900">% 완료</span>
            </div>
            
            <div className="w-full bg-yellow-600/20 h-2 rounded-full mt-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="bg-yellow-950 h-full rounded-full"
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] text-yellow-900/80 mt-2 leading-relaxed">
              {activeTab === 6 
                ? '축하합니다! 영광스러운 안전 수료 명단을 발표했습니다! 🎉' 
                : `${activeTab + 1}단계 진행 중! 윤리 필터를 계속 다듬어 최종 카드를 채우세요.`}
            </p>
          </div>

          {/* Ethics Canvas Mini-Summary Card */}
          <div className="bg-white rounded-2xl p-5 border border-yellow-100 shadow-3xs space-y-3.5">
            <div className="flex items-center gap-2 border-b border-yellow-50 pb-2.5">
              <ClipboardList className="w-4 h-4 text-yellow-500" />
              <h3 className="font-extrabold text-xs text-yellow-950 uppercase tracking-wider">
                실시간 윤리 필터 상태
              </h3>
            </div>

            <div className="space-y-3.5 text-[11px] leading-relaxed">
              <div>
                <span className="text-[9px] font-bold text-yellow-700 uppercase block tracking-wider">에이전트 이름</span>
                <div className="font-extrabold text-yellow-950 mt-1 bg-yellow-50/30 p-2.5 rounded-lg border border-yellow-100/50">
                  {canvas.agentName || '⚠️ 이름 미입력 (1단계)'}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-yellow-700 uppercase block tracking-wider">개인정보 보호 수칙</span>
                <div className="text-slate-600 mt-1 bg-yellow-50/30 p-2.5 rounded-lg border border-yellow-100/50">
                  {canvas.privacyRule ? (
                    <span className="text-emerald-700 font-bold">✔️ {canvas.privacyRule.substring(0, 25)}...</span>
                  ) : (
                    <span className="text-red-500 font-bold">❌ 별명만 수집 수칙 설계 필요</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-yellow-700 uppercase block tracking-wider">공정성 & 투명성 수칙</span>
                <div className="text-slate-600 mt-1 bg-yellow-50/30 p-2.5 rounded-lg border border-yellow-100/50">
                  {canvas.fairnessRule ? (
                    <span className="text-blue-700 font-bold">✔️ {canvas.fairnessRule.substring(0, 25)}...</span>
                  ) : (
                    <span className="text-red-500 font-bold">❌ 중복 예약 방지 수칙 필요</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center/Right Workspace Section (col-span-9) */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div key="home">
                <HomeView onStart={() => setActiveTab(1)} />
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div key="canvas">
                <EthicsCanvasView
                  canvas={canvas}
                  onChangeCanvas={(updated) => setCanvas((prev) => ({ ...prev, ...updated }))}
                  onNext={() => setActiveTab(2)}
                />
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div key="booking">
                <BookingAgentView
                  canvas={canvas}
                  bookings={bookings}
                  onAddBooking={handleAddBooking}
                  onNext={() => setActiveTab(3)}
                />
              </motion.div>
            )}

            {activeTab === 3 && (
              <motion.div key="delivery">
                <DeliveryView
                  bookings={bookings}
                  onNext={() => setActiveTab(4)}
                  onGoToBooking={() => setActiveTab(2)}
                />
              </motion.div>
            )}

            {activeTab === 4 && (
              <motion.div key="redteam">
                <RedTeamTestView
                  canvas={canvas}
                  testHistory={testHistory}
                  onAddTest={handleAddTest}
                  onNext={() => setActiveTab(5)}
                />
              </motion.div>
            )}

            {activeTab === 5 && (
              <motion.div key="log">
                <ImprovementLogView
                  log={log}
                  onChangeLog={(updated) => setLog((prev) => ({ ...prev, ...updated }))}
                  onNext={() => setActiveTab(6)}
                />
              </motion.div>
            )}

            {activeTab === 6 && (
              <motion.div key="presentation">
                <PresentationView
                  canvas={canvas}
                  log={log}
                  bookings={bookings}
                  testHistory={testHistory}
                  onResetAll={handleResetAll}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Custom Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl border-3 border-yellow-200 max-w-md w-full p-6 md:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3.5 text-yellow-600">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-2xl shrink-0">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-yellow-950 font-display">
                    실습 전체 초기화
                  </h3>
                  <p className="text-xs text-yellow-700 font-bold">AI 윤리 캠프 활동 다시 시작</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  지금까지 채운 <strong>가이드라인 캔버스</strong>, <strong>식단 예약 이력</strong>, <strong>레드팀 테스트 내역</strong>, <strong>개선 기록</strong>이 모두 지워집니다.
                </p>
                <p className="font-bold text-yellow-950">
                  정말 처음부터 다시 실습을 개시하시겠습니까?
                </p>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  취소하기
                </button>
                <button
                  onClick={executeReset}
                  className="flex-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  🔄 예, 다시 시작합니다
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Status Bar with Clean Aesthetic */}
      <footer className="bg-white border-t border-yellow-100 px-4 md:px-8 py-3.5 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium text-slate-400 gap-2">
        <div className="flex flex-wrap gap-4 uppercase tracking-wider justify-center">
          <span>AI Ethics Studio Beta</span>
          <span>● Offline Local sandbox</span>
          <span className="text-yellow-600 font-bold">● Safe Agent Protocol: Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span>AI Ethics Camp 2026</span>
          <span className="text-slate-200">|</span>
          <span className="text-yellow-600 font-bold">#누구나_쉽게_한_끼를_때우는_AI_에이전트_만들기</span>
        </div>
      </footer>
    </div>
  );
}
