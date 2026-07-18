import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, AlertTriangle, CheckCircle, HelpCircle, User, Clock, Users, ArrowRight } from 'lucide-react';
import { CanvasData, Booking, FoodOption } from '../types';

interface BookingAgentViewProps {
  canvas: CanvasData;
  bookings: Booking[];
  onAddBooking: (booking: Booking) => void;
  onNext: () => void;
}

const INITIAL_FOODS: FoodOption[] = [
  { name: '스파게티', description: '토마토와 크림 소스가 잘 어우러진 이탈리아 면 요리', portionsLeft: 3, imageEmoji: '🍝', maxPortions: 3 },
  { name: '돼지 국밥', description: '부산식의 진하고 부드러운 돼지고기 육수 국밥', portionsLeft: 4, imageEmoji: '🥘', maxPortions: 4 },
  { name: '탕수육', description: '바삭하게 튀긴 돼지고기에 달콤새콤한 과일 소스', portionsLeft: 1, imageEmoji: '🍤', maxPortions: 1 },
  { name: '스시', description: '싱싱한 해산물과 신선한 밥으로 빚은 스시 (알레르기 주의)', portionsLeft: 0, imageEmoji: '🍣', maxPortions: 3 }, // Out of stock on purpose to test waitlist
];

export default function BookingAgentView({
  canvas,
  bookings,
  onAddBooking,
  onNext,
}: BookingAgentViewProps) {
  // Foods state
  const [foods, setFoods] = useState<FoodOption[]>(INITIAL_FOODS);
  
  // Inputs
  const [nickname, setNickname] = useState('');
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<'아침' | '점심' | '저녁'>('점심');
  
  // Evaluation States
  const [aiAnalysis, setAiAnalysis] = useState<{
    status: 'idle' | 'analyzing' | 'blocked' | 'confirm_pending' | 'success';
    reason: string;
    suggestedWaitlist: boolean;
  }>({ status: 'idle', reason: '', suggestedWaitlist: false });

  // Privacy violation feedback state (for educational warnings)
  const [privacyWarning, setPrivacyWarning] = useState<string | null>(null);

  // Validate inputs for real-life privacy info
  const checkPrivacyViolation = (val: string): boolean => {
    // Basic regex checks for phone, address keywords, real full names (3 Korean letters), birthdates
    const phoneRegex = /(010|02|031|051)-\d{3,4}-\d{4}|\d{10,11}/;
    const addressKeywords = ['동', '구', '시', '대로', '아파트', '빌라', '번지'];
    const hasAddress = addressKeywords.some(keyword => val.includes(keyword)) && val.length > 5;
    const birthdateRegex = /\d{6}|\d{4}년|\d{2}년|\d{2}\/\d{2}/;
    
    if (phoneRegex.test(val)) {
      setPrivacyWarning('⚠️ 개인정보 경고: 전화번호 형식의 값을 감지했습니다! 개인정보 보호 규칙에 따라 "안전한 별명"만 입력해 주세요.');
      return true;
    }
    if (hasAddress) {
      setPrivacyWarning('⚠️ 개인정보 경고: 상세 주소지 단어가 감지되었습니다! 개인정보 보호 규칙에 따라 개인정보를 제외하고 오직 "별명"만 사용하세요.');
      return true;
    }
    if (birthdateRegex.test(val)) {
      setPrivacyWarning('⚠️ 개인정보 경고: 생년월일이나 날짜 패턴이 발견되었습니다! 개인정보 보호를 위해 실제 정보를 지워주세요.');
      return true;
    }
    
    setPrivacyWarning(null);
    return false;
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNickname(val);
    checkPrivacyViolation(val);
  };

  const handleRecommend = () => {
    if (!nickname.trim()) {
      alert('가정의 안전한 별명을 입력해 주세요.');
      return;
    }
    if (!selectedFood) {
      alert('추천을 원하시는 음식을 하나 선택해 주세요.');
      return;
    }

    if (checkPrivacyViolation(nickname)) {
      return;
    }

    setAiAnalysis({ status: 'analyzing', reason: 'AI 에이전트가 윤리 규칙 필터를 거치며 추천을 검토 중입니다...', suggestedWaitlist: false });

    setTimeout(() => {
      // 1. Check double booking for the same time slot
      const alreadyBookedThisSlot = bookings.find(
        (b) => b.nickname === nickname && b.timeSlot === timeSlot && b.status === '확정'
      );

      if (alreadyBookedThisSlot) {
        setAiAnalysis({
          status: 'blocked',
          reason: `❌ 추천 거부: [중복 시간 예약 방지 규칙 적용] 별명 "${nickname}" 가정은 이미 "${timeSlot}" 시간대에 "${alreadyBookedThisSlot.foodName}"을 예약하셨습니다. 공정성 규칙에 따라 같은 시간대에는 한 개의 요리만 예약할 수 있습니다.`,
          suggestedWaitlist: false,
        });
        return;
      }

      // 2. Check food remaining portions
      const targetFood = foods.find(f => f.name === selectedFood);
      if (!targetFood || targetFood.portionsLeft <= 0) {
        setAiAnalysis({
          status: 'blocked',
          reason: `❌ 추천 보류: 선택하신 요리 "${selectedFood}"는 오늘 준비된 자리가 모두 예약되었습니다. 공정성 규칙에 따라 거짓으로 예약을 약속하지 않고 정직하게 대기자 등록만 안내합니다.`,
          suggestedWaitlist: true,
        });
        return;
      }

      // 3. Success -> pending confirmation (Human in the loop requirement)
      setAiAnalysis({
        status: 'confirm_pending',
        reason: `✨ AI 추천 성공! "${nickname}"님을 위한 [${timeSlot}] 식사로 "${selectedFood}"를 찾았습니다. (4인 가구 기준)\n\n🔔 [${canvas.verificationMoment || '사람의 최종 확인 단계'}] 에이전트가 마음대로 결제하지 않도록 아래의 "최종 예약 확정" 버튼을 가정이 직접 눌러 완료해 주세요!`,
        suggestedWaitlist: false,
      });

    }, 1000);
  };

  const handleConfirmReservation = () => {
    // Subtract stock
    setFoods(prev =>
      prev.map(f => (f.name === selectedFood ? { ...f, portionsLeft: f.portionsLeft - 1 } : f))
    );

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      nickname,
      foodName: selectedFood,
      timeSlot,
      familySize: 4,
      status: '확정',
      reason: `성공적으로 윤리 규칙 필터를 통과하여 예약을 확정했습니다. (${canvas.privacyRule})`,
      timestamp: new Date().toLocaleTimeString(),
    };

    onAddBooking(newBooking);
    setAiAnalysis({
      status: 'success',
      reason: `🎉 예약 최종 완료! "${nickname}" 가정이 최종 버튼을 클릭하여 예약을 확정하였습니다. (사람 확인 및 투명성 보장 완료!)`,
      suggestedWaitlist: false,
    });
  };

  const handleRegisterWaitlist = () => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      nickname,
      foodName: selectedFood,
      timeSlot,
      familySize: 4,
      status: '대기중',
      reason: `남은 자리가 없어서 대기자 명단에 공정하게 등록되었습니다.`,
      timestamp: new Date().toLocaleTimeString(),
    };

    onAddBooking(newBooking);
    setAiAnalysis({
      status: 'success',
      reason: `📝 대기자 등록 완료! 빈자리가 생기면 공정성 규칙에 따라 순서대로 안내를 도와드릴게요.`,
      suggestedWaitlist: false,
    });
  };

  const handleResetSimulator = () => {
    setNickname('');
    setSelectedFood('');
    setTimeSlot('점심');
    setAiAnalysis({ status: 'idle', reason: '', suggestedWaitlist: false });
    setPrivacyWarning(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-5xl mx-auto space-y-6"
      id="booking-agent-view"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form & Menu Select (col-span-7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Reservation Panel */}
          <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-amber-100 pb-3">
              <h2 className="font-bold text-amber-950 flex items-center gap-2 font-display">
                <Utensils className="w-5 h-5 text-amber-500" />
                식사 추천 및 가상 예약 시뮬레이터
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                정상 가동 중
              </span>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  우리 가정 별명 입력
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="예: 해피냠냠 (진짜 정보 제외)"
                  className="w-full text-xs p-2.5 bg-amber-50/40 border border-amber-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-amber-950 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  원하는 식사 시간대
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['아침', '점심', '저녁'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`text-xs py-2 rounded-xl font-bold transition-all border ${
                        timeSlot === slot
                          ? 'bg-amber-400 border-amber-400 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy Warning Banner */}
            <AnimatePresence>
              {privacyWarning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-xs leading-relaxed"
                >
                  {privacyWarning}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Food Menu Selections */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                원하는 음식 선택 <span className="text-[10px] text-slate-500 font-normal">(가정 인원: 4명 기준 자동 세팅)</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {foods.map((food) => {
                  const isOutOfStock = food.portionsLeft <= 0;
                  const isSelected = selectedFood === food.name;
                  return (
                    <button
                      key={food.name}
                      type="button"
                      onClick={() => !isOutOfStock && setSelectedFood(food.name)}
                      className={`text-left p-3.5 rounded-xl border transition-all relative flex items-center gap-3 ${
                        isOutOfStock
                          ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-amber-50 border-2 border-amber-400 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-amber-200 cursor-pointer'
                      }`}
                    >
                      <span className="text-3xl bg-amber-50 p-1.5 rounded-xl shrink-0">{food.imageEmoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-amber-950 truncate">{food.name}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isOutOfStock 
                              ? 'bg-red-100 text-red-700' 
                              : food.portionsLeft === 1 
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isOutOfStock ? '품절' : `남은 분량: ${food.portionsLeft}개`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{food.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleRecommend}
                disabled={!nickname.trim() || !selectedFood || aiAnalysis.status === 'analyzing'}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-200 disabled:text-slate-400 text-amber-950 font-bold py-3 px-4 rounded-xl transition-all shadow-xs cursor-pointer text-sm"
              >
                {aiAnalysis.status === 'analyzing' ? '에이전트가 검토 중...' : 'AI 에이전트의 추천 받기'}
              </button>
              
              <button
                type="button"
                onClick={handleResetSimulator}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold px-4 rounded-xl text-xs"
              >
                초기화
              </button>
            </div>
          </div>

          {/* Guidelines info */}
          <div className="bg-amber-100/30 border border-amber-200/50 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-amber-950">💡 윤리 규칙 작동 안내:</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>실제 개인 휴대폰, 생년월일, 도로명 주소를 쓰면 경고 필터가 감지합니다.</li>
              <li>동일 별명으로 같은 시간대에 예약을 연속해서 시도하면 "중복 방지 규칙"이 승인을 차단합니다.</li>
              <li>선택한 음식의 재고가 없을 시엔 정직하게 대기자 제안만 띄워 속임수가 발생하지 않습니다.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: AI Response Pane (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Active AI Agent Monitor Panel */}
          <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-800 flex-1 flex flex-col justify-between shadow-lg font-mono relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-slate-500 font-bold">
              SYS_MONITOR V1.0
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-400">에이전트 판단 스트림</span>
              </div>

              {/* Chat-like box in terminal style */}
              <div className="space-y-3 text-xs leading-relaxed max-h-[300px] overflow-y-auto pr-1">
                {aiAnalysis.status === 'idle' ? (
                  <div className="text-slate-500 italic py-8 text-center font-sans">
                    왼쪽 양식을 입력하고 추천 받기 버튼을 누르면, 설계한 에이전트({canvas.agentName || '미지정'})의 실시간 윤리 분석 로그가 여기에 출력됩니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[11px] text-yellow-400 font-bold">
                      &gt; [SYSTEM] 윤리 필터링 규칙 점검 개시...
                    </p>
                    <p className="text-[11px] text-slate-300">
                      &bull; {canvas.privacyRule ? `개인정보 필터링: [통과] ${canvas.privacyRule}` : '개인정보 필터 미장착'}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      &bull; {canvas.fairnessRule ? `공정성 필터링: [통과] ${canvas.fairnessRule}` : '공정성 필터 미장착'}
                    </p>
                    
                    <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 font-sans text-slate-200 mt-2 whitespace-pre-line">
                      {aiAnalysis.reason}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action panel inside the screen */}
            {aiAnalysis.status === 'confirm_pending' && (
              <div className="mt-4 p-4 bg-amber-500/10 border-2 border-amber-500 rounded-2xl space-y-3 font-sans">
                <div className="text-xs text-amber-200 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  최종 확인 대기중 (Human-In-The-Loop)
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  자동 결제가 차단되었습니다. 식사를 확정하려면 가족 구성원이 직접 최종 확인 버튼을 눌러주셔야 합니다.
                </p>
                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-2 px-3 rounded-xl transition-all shadow-xs text-xs cursor-pointer"
                >
                  🙋‍♂️ 예, 우리 가족 식사 예약을 확정합니다!
                </button>
              </div>
            )}

            {aiAnalysis.suggestedWaitlist && (
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500 rounded-2xl space-y-3 font-sans">
                <div className="text-xs text-blue-300 font-bold">
                  ℹ️ 품절로 인한 공정 대기 등록 제안
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  남은 자리가 없으므로 예약을 무리하게 받지 않습니다. 대기자 명단에 등록하시겠습니까?
                </p>
                <button
                  type="button"
                  onClick={handleRegisterWaitlist}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-xl transition-all text-xs cursor-pointer"
                >
                  📝 예, 대기 등록자로 들어가겠습니다
                </button>
              </div>
            )}

            {aiAnalysis.status === 'success' && (
              <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500 rounded-xl flex items-start gap-2 font-sans">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-200">윤리적 예약 처리 성공!</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    예약 데이터베이스에 성공적으로 안전하게 기록되었습니다. 아래 목록에서 실시간 이력을 볼 수 있습니다.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bookings Tracker */}
          <div className="bg-white rounded-2xl border border-amber-100 p-4 shadow-2xs space-y-2">
            <h3 className="font-bold text-xs text-amber-950 uppercase tracking-wider">
              📋 현재 안전 예약 대장 (모의 이력)
            </h3>
            
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {bookings.length === 0 ? (
                <div className="text-slate-400 text-[11px] text-center py-6">
                  등록된 추천/예약 이력이 없습니다.
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex justify-between items-center p-2 bg-amber-50/50 rounded-lg border border-amber-100 text-xs"
                  >
                    <div>
                      <div className="font-bold text-amber-950">
                        {booking.nickname} <span className="font-normal text-slate-500">({booking.familySize}명)</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {booking.timeSlot} 식사 &bull; {booking.foodName}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        booking.status === '대기중' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {booking.status}
                      </span>
                      <div className="text-[9px] text-slate-400 mt-1">{booking.timestamp}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Next Section Switch */}
          {bookings.length > 0 && (
            <button
              onClick={onNext}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-950 hover:bg-slate-900 text-yellow-400 font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-xs"
            >
              성공적으로 완료! 5단계: 레드팀 유도 테스트 하러가기 <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </div>
    </motion.div>
  );
}
