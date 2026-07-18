import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, AlertCircle, Play, Shield, Award, ClipboardList } from 'lucide-react';

// Subcomponents
import HomeView from './components/HomeView';
import ProblemAnalysisView from './components/ProblemAnalysisView';
import EthicsCanvasView from './components/EthicsCanvasView';
import BookingAgentView from './components/BookingAgentView';
import RedTeamTestView from './components/RedTeamTestView';
import ImprovementLogView from './components/ImprovementLogView';
import PresentationView from './components/PresentationView';

// Types
import { CanvasData, Booking, RedTeamTest, ImprovementLog } from './types';

export default function App() {
  // Navigation / Tabs state
  // 0: 홈, 1: AI 분석, 2: 윤리 설계, 3: 예약 시뮬레이션, 4: 레드팀 테스트, 5: 개선 기록, 6: 최종 발표
  const [activeTab, setActiveTab] = useState<number>(0);

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

  // Checklist state for Screen 2 (Problem Analysis)
  const [checkedIssues, setCheckedIssues] = useState<Record<string, boolean>>({
    privacy: false,
    fairness: false,
    human_control: false,
    transparency: false,
  });

  // Reservation list state for Screen 4 (Booking Agent)
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Red Team tests history for Screen 5 (Red Team Test)
  const [testHistory, setTestHistory] = useState<RedTeamTest[]>([]);

  // Improvement notes for Screen 6 (Improvement Log)
  const [log, setLog] = useState<ImprovementLog>({
    discoveredProblems: '',
    addedRules: '',
    finalImprovements: '',
    takeaway: '',
  });

  const handleToggleIssue = (key: string) => {
    setCheckedIssues((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleAddTest = (newTest: RedTeamTest) => {
    setTestHistory((prev) => [newTest, ...prev]);
  };

  const handleResetAll = () => {
    if (confirm('모든 실습 데이터를 초기화하고 처음부터 다시 시작하시겠습니까?')) {
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
      setCheckedIssues({
        privacy: false,
        fairness: false,
        human_control: false,
        transparency: false,
      });
      setBookings([]);
      setTestHistory([]);
      setLog({
        discoveredProblems: '',
        addedRules: '',
        finalImprovements: '',
        takeaway: '',
      });
    }
  };

  // Determine current progress percentage
  const getProgressPercentage = () => {
    let score = 0;
    if (activeTab > 0) score += 10;
    // Problem checked
    const totalChecked = Object.values(checkedIssues).filter(Boolean).length;
    score += totalChecked * 2.5; // Up to 10
    // Ethics canvas progress
    if (canvas.agentName) score += 5;
    if (canvas.problem) score += 5;
    if (canvas.goal) score += 5;
    if (canvas.privacyRule) score += 5;
    if (canvas.fairnessRule) score += 5; // Up to 25
    // Simulations and logs
    if (bookings.length > 0) score += 15;
    if (testHistory.length > 0) score += 15;
    if (log.discoveredProblems && log.takeaway) score += 15;
    if (activeTab === 6) score = 100;

    return Math.min(100, score);
  };

  const progressPercent = getProgressPercentage();

  // Helper check to enforce sequence progress if desired,
  // but let them click tabs freely if they've met minimums
  const isTabAccessible = (index: number) => {
    if (index === 0) return true;
    if (index === 1) return true;
    if (index === 2) return Object.values(checkedIssues).every(Boolean);
    if (index === 3) return canvas.isSynced || (canvas.agentName.trim() !== '' && canvas.privacyRule.trim() !== '');
    if (index === 4) return bookings.length > 0;
    if (index === 5) return testHistory.length >= 2;
    if (index === 6) return log.discoveredProblems.trim() !== '' && log.takeaway.trim() !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-[#FFF9EC] text-slate-800 font-sans flex flex-col justify-between" id="app-root">
      {/* Header Navigation */}
      <header className="bg-white border-b border-amber-200 px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shadow-xs">
            <span className="text-white font-bold text-xl">🍳</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-amber-950 font-display flex items-center gap-1.5">
              찾기 쉬운 세 끼
            </h1>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">우리 집 AI 식사 에이전트 윤리 캠프</p>
          </div>
        </div>

        {/* Dynamic navigation steps */}
        <nav className="flex flex-wrap gap-1 bg-amber-50 p-1 rounded-xl border border-amber-100 max-w-full overflow-x-auto">
          {[
            { name: '홈', step: 0 },
            { name: 'AI 분석', step: 1 },
            { name: '윤리 설계', step: 2 },
            { name: '예약 시뮬', step: 3 },
            { name: '레드팀', step: 4 },
            { name: '개선 기록', step: 5 },
            { name: '최종 발표', step: 6 },
          ].map((tab) => {
            const isActive = activeTab === tab.step;
            const isSelectable = isTabAccessible(tab.step);
            return (
              <button
                key={tab.step}
                onClick={() => isSelectable && setActiveTab(tab.step)}
                disabled={!isSelectable}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber-400 text-white shadow-xs'
                    : isSelectable
                    ? 'text-amber-800 hover:bg-amber-100/50 cursor-pointer'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title={!isSelectable ? '이전 미션 단계를 완료하면 열립니다.' : ''}
              >
                {tab.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
            TEAM: 식사윤리 수호대 🛡️
          </span>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Dynamic Ethics Canvas Summary & Progress (col-span-3 or 4) */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* Progress Indicator Card */}
          <div className="bg-amber-400 rounded-2xl p-5 shadow-sm text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-100 mb-1">나의 미션 진행률</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-display">{Math.round(progressPercent)}</span>
              <span className="text-sm font-semibold text-amber-100">% 완료</span>
            </div>
            
            <div className="w-full bg-amber-600/30 h-2.5 rounded-full mt-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="bg-white h-full rounded-full"
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] text-amber-100 mt-2 leading-relaxed">
              {activeTab === 6 
                ? '축하합니다! 훌륭하게 안전 에이전트를 발표했습니다! 🎉' 
                : `${activeTab + 1}단계 진행 중! 윤리 필터를 계속 장착하고 개선해보세요.`}
            </p>
          </div>

          {/* Ethics Canvas Mini-Summary Card */}
          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 border-b border-amber-50 pb-2">
              <ClipboardList className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-xs text-amber-950 uppercase tracking-wider">
                실시간 윤리 장치 모니터
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase block tracking-wider">에이전트 이름</span>
                <div className="font-bold text-amber-950 mt-0.5 bg-amber-50/50 p-2 rounded-lg border border-amber-100/50">
                  {canvas.agentName || '⚠️ 이름 미설계 (3단계)'}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase block tracking-wider">금지 행동 규칙</span>
                <div className="text-slate-600 mt-0.5 bg-amber-50/50 p-2 rounded-lg border border-amber-100/50 italic">
                  {canvas.forbiddenActions || '⚠️ 규칙 미등록 (3단계)'}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase block tracking-wider">개인정보 수칙</span>
                <div className="text-slate-600 mt-0.5 bg-amber-50/50 p-2 rounded-lg border border-amber-100/50">
                  {canvas.privacyRule ? (
                    <span className="text-emerald-700 font-medium">✔️ {canvas.privacyRule.substring(0, 30)}...</span>
                  ) : (
                    <span className="text-red-500">❌ 개인정보 유출 방지 필요</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase block tracking-wider">공정성 수칙</span>
                <div className="text-slate-600 mt-0.5 bg-amber-50/50 p-2 rounded-lg border border-amber-100/50">
                  {canvas.fairnessRule ? (
                    <span className="text-blue-700 font-medium">✔️ {canvas.fairnessRule.substring(0, 30)}...</span>
                  ) : (
                    <span className="text-red-500">❌ 공정성 가이드라인 필요</span>
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
              <div key="home">
                <HomeView onStart={() => setActiveTab(1)} />
              </div>
            )}

            {activeTab === 1 && (
              <div key="problem">
                <ProblemAnalysisView
                  checkedIssues={checkedIssues}
                  onToggleIssue={handleToggleIssue}
                  onNext={() => setActiveTab(2)}
                />
              </div>
            )}

            {activeTab === 2 && (
              <div key="canvas">
                <EthicsCanvasView
                  canvas={canvas}
                  onChangeCanvas={(updated) => setCanvas((prev) => ({ ...prev, ...updated }))}
                  onNext={() => setActiveTab(3)}
                />
              </div>
            )}

            {activeTab === 3 && (
              <div key="booking">
                <BookingAgentView
                  canvas={canvas}
                  bookings={bookings}
                  onAddBooking={handleAddBooking}
                  onNext={() => setActiveTab(4)}
                />
              </div>
            )}

            {activeTab === 4 && (
              <div key="redteam">
                <RedTeamTestView
                  canvas={canvas}
                  testHistory={testHistory}
                  onAddTest={handleAddTest}
                  onNext={() => setActiveTab(5)}
                />
              </div>
            )}

            {activeTab === 5 && (
              <div key="log">
                <ImprovementLogView
                  log={log}
                  onChangeLog={(updated) => setLog((prev) => ({ ...prev, ...updated }))}
                  onNext={() => setActiveTab(6)}
                />
              </div>
            )}

            {activeTab === 6 && (
              <div key="presentation">
                <PresentationView
                  canvas={canvas}
                  log={log}
                  bookings={bookings}
                  testHistory={testHistory}
                  onResetAll={handleResetAll}
                />
              </div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer Status Bar */}
      <footer className="bg-white border-t border-amber-100 px-4 md:px-8 py-3 mt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-slate-400 gap-2">
        <div className="flex flex-wrap gap-4 uppercase tracking-wider justify-center">
          <span>AI Ethics Studio Beta</span>
          <span>● Offline Local sandbox</span>
          <span className="text-amber-600 font-bold">● Safe Agent Protocol: Enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <span>AI Ethics Camp 2026</span>
          <span className="text-slate-200">|</span>
          <span className="text-amber-600 font-bold">#찾기_쉬운_세_끼</span>
        </div>
      </footer>
    </div>
  );
}
