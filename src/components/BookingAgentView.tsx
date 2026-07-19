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
  { name: '시리얼', description: '바삭하고 고소해 우유와 간편하고 빠르게 영양을 보충하는 아침 단골 식단', portionsLeft: 3, imageEmoji: '🥣', maxPortions: 3 },
  { name: '돼지 국밥', description: '진하고 따끈한 육수로 소화가 잘 되고 속을 든든하게 채우는 인기 한식', portionsLeft: 4, imageEmoji: '🥘', maxPortions: 4 },
  { name: '고기', description: '온 가족이 지글지글 구워 든든하게 고단백질을 채울 수 있는 삼겹살 세트', portionsLeft: 2, imageEmoji: '🥩', maxPortions: 2 },
  { name: '스시', description: '신선한 해산물과 알맞은 초밥으로 깔끔하게 미각을 만족시키는 고급 초밥', portionsLeft: 3, imageEmoji: '🍣', maxPortions: 3 },
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

  // Validate inputs for real-life privacy info to enforce crucial conditions
  const checkPrivacyViolation = (val: string): boolean => {
    // Basic regex checks for phone, address keywords, real full names, birthdates
    const phoneRegex = /(010|02|031|051)-\d{3,4}-\d{4}|\d{10,11}/;
    const addressKeywords = ['동', '구', '시', '대로', '아파트', '빌라', '번지', '길'];
    const hasAddress = addressKeywords.some(keyword => val.includes(keyword)) && val.length > 3;
    const birthdateRegex = /\d{6}|\d{4}년|\d{2}년|\d{2}\/\d{2}/;
    
    // Check if they put a potential real full name (2-4 Korean chars, very simple check)
    const isKoreanName = /^[가-힣]{2,4}$/.test(val) && !['해피', '냠냠', '초코', '식사', '별명', '요리', '수호', '캠프', '체험'].some(k => val.includes(k));

    if (phoneRegex.test(val)) {
      setPrivacyWarning('⚠️ 개인정보 위반 경고: 연락처 패턴이 발견되었습니다! 안전 조건에 따라 실명, 전화번호, 주소, 생년월일은 절대 입력 항목에 포함될 수 없습니다. 오직 "별명"만 사용해 주세요!');
      return true;
    }
    if (hasAddress) {
      setPrivacyWarning('⚠️ 개인정보 위반 경고: 상세 주소 키워드가 감지되었습니다! 안전 조건에 따라 실제 집 주소는 절대 저장하지 않습니다. 오직 "별명"만 입력해 주세요!');
      return true;
    }
    if (birthdateRegex.test(val)) {
      setPrivacyWarning('⚠️ 개인정보 위반 경고: 생년월일 패턴이 발견되었습니다! 안전 조건에 따라 생년월일은 입력받지 않습니다. 가상의 "별명"만 사용해 주세요!');
      return true;
    }
    if (isKoreanName && val.length >= 3) {
      setPrivacyWarning('⚠️ 개인정보 위반 경고: 실제 이름 형식과 유사합니다! 안전 조건에 따라 이름은 절대 포함하지 않습니다. 귀여운 가상의 "별명"으로 고쳐 적어주세요!');
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
      alert('가정의 가상 별명을 입력해 주세요.');
      return;
    }
    if (!selectedFood) {
      alert('추천 및 예약을 원하시는 음식을 선택해 주세요.');
      return;
    }

    if (checkPrivacyViolation(nickname)) {
      return;
    }

    setAiAnalysis({ status: 'analyzing', reason: '설계된 윤리 안전 필터를 적용하여 식단 추천 및 시간대 예약을 조율 중입니다...', suggestedWaitlist: false });

    setTimeout(() => {
      // 1. Check double booking for the same time slot
      // "이미 같은 시간대에 다른 음식를 예약한 음식이면 예약을 거부하고 이유를 설명해줘."
      const alreadyBookedThisSlot = bookings.find(
        (b) => b.nickname === nickname && b.timeSlot === timeSlot && b.status === '확정'
      );

      if (alreadyBookedThisSlot) {
        setAiAnalysis({
          status: 'blocked',
          reason: `❌ 추천 및 예약 거부 [시간 중복 방지 규칙 작동]
          
별명 "${nickname}"님은 이미 [${timeSlot}] 시간대에 "${alreadyBookedThisSlot.foodName}" 식단을 예약하셨습니다!
공정성 및 효율성 규칙에 따라 같은 시간대에 다른 식단을 이중으로 예약할 수는 없습니다. 한 끼 식사 시간대에는 하나의 메뉴만 신중하게 추천 예약해 주시기 바랍니다.`,
          suggestedWaitlist: false,
        });
        return;
      }

      // 2. Check food remaining portions
      const targetFood = foods.find(f => f.name === selectedFood);
      if (!targetFood || targetFood.portionsLeft <= 0) {
        setAiAnalysis({
          status: 'blocked',
          reason: `❌ 추천 보류 [품절 상태 알림 원칙 작동]
          
선택하신 "${selectedFood}" 요리는 오늘 가용 가능한 4인용 식사 세트 물량이 모두 예약 완료되었습니다!
정직성과 투명성 규칙에 따라 품절인데도 억지로 예약 승인을 속이지 않으며, 공정하게 대기자로 등록해 주시기를 정중히 제안드립니다.`,
          suggestedWaitlist: true,
        });
        return;
      }

      // 3. Success -> show "Confirmation before booking reservation" (예약 확정 전 확인) stage
      setAiAnalysis({
        status: 'confirm_pending',
        reason: `✨ AI 식단 추천 및 예약 검토 성공!
        
• 예약 가구 별명: ${nickname}
• 추천 식단 종류: ${selectedFood} (4인 가족 한 끼 영양 패키지)
• 희망 식사 시간: [${timeSlot}]

🔔 [예약 확정 전 최종 승인 확인 단계]
에이전트가 가구 몰래 마음대로 최종 결제 및 승인하지 않도록, 아래의 "예약 확정 완료" 버튼을 사용자가 직접 클릭해야만 최종 명부에 전송 기록됩니다!`,
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
      reason: `성공적으로 윤리적 사람 승인을 마쳤습니다. 개인정보가 철저히 배제된 안전 식단 예약입니다.`,
      timestamp: new Date().toLocaleTimeString(),
    };

    onAddBooking(newBooking);
    setAiAnalysis({
      status: 'success',
      reason: `🎉 예약 최종 확정 완료!
      
별명 "${nickname}" 가구의 [${timeSlot}] 식사로 "${selectedFood}" 4인 식탁 매칭이 완전히 승인 완료되었습니다.
개인정보 수집이 차단되어 해킹에도 끄떡없으며, 다음 3단계인 "배달 주문 창" 탭에서 매칭된 배달 화면을 확인하실 수 있습니다!`,
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
      reason: `품절된 식사에 대한 대기자 명단에 순서대로 공정하게 접수되었습니다.`,
      timestamp: new Date().toLocaleTimeString(),
    };

    onAddBooking(newBooking);
    setAiAnalysis({
      status: 'success',
      reason: `📝 대기자 수신 완료!
      
"${nickname}" 가정이 "${selectedFood}"의 [${timeSlot}] 대기 등록에 순응하셨습니다. 자리가 비는 대로 공정성에 맞추어 순서 알림을 발송합니다.`,
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
      {/* Explanation Banner */}
      <div className="bg-yellow-100/60 border-2 border-yellow-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 bg-yellow-400 text-yellow-950 rounded-xl">
          <Utensils className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-950 font-display">
            🥘 2단계. 식단 선호도 선택 및 하루 식단 추천 예약 창
          </h2>
          <p className="text-xs text-yellow-900 mt-1 leading-relaxed">
            평소에 즐겨 드시는 <strong>4종의 음식 메뉴</strong> 중 선호 요리를 선택하고 희망하는 시간대를 배정해 보세요! <br />
            각 식사는 <strong>4인 기준의 패키지</strong>로 조리 예약됩니다. 실명이나 집 주소 없이 <strong>오직 별명만 입력하여</strong> 예약 가능 여부를 테스트해 보세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form & Menu Select (col-span-7) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-yellow-100 p-6 shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-yellow-50 pb-3">
              <h3 className="font-extrabold text-sm text-yellow-950 flex items-center gap-2">
                📂 맛있는 식사 예약 설정하기
              </h3>
              <span className="text-[10px] bg-yellow-400 text-yellow-950 font-bold px-2.5 py-0.5 rounded-full">
                가구 인원: 4인 기준 자동 세팅
              </span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-yellow-900 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  우리 집 전용 별명 (닉네임)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="예: 초코쿠키가족 (이름/주소 금지)"
                  className="w-full text-xs p-2.5 bg-yellow-50/20 border border-yellow-100 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-yellow-400 text-yellow-950 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-yellow-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  원하는 한 끼 시간대
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['아침', '점심', '저녁'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`text-xs py-2 rounded-xl font-bold transition-all border ${
                        timeSlot === slot
                          ? 'bg-yellow-400 border-yellow-400 text-yellow-950 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-yellow-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Info Warning Badge */}
            <AnimatePresence>
              {privacyWarning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3.5 text-xs leading-relaxed"
                >
                  {privacyWarning}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Food Menu Selections */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-yellow-900 flex items-center gap-1">
                🥑 추천받고 싶은 음식 메뉴 선택
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
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
                          ? 'bg-yellow-50 border-2 border-yellow-400 shadow-3xs'
                          : 'bg-white border-slate-200 hover:border-yellow-200 cursor-pointer'
                      }`}
                    >
                      <span className="text-3xl bg-yellow-50 p-2 rounded-xl shrink-0">{food.imageEmoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-sm text-yellow-950 truncate">{food.name}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isOutOfStock 
                              ? 'bg-red-100 text-red-700' 
                              : food.portionsLeft === 1 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isOutOfStock ? '품절' : `잔량: ${food.portionsLeft}세트`}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{food.description}</p>
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
                disabled={!nickname.trim() || !selectedFood || aiAnalysis.status === 'analyzing' || !!privacyWarning}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 disabled:text-slate-400 text-yellow-950 font-black py-3 px-4 rounded-xl transition-all shadow-2xs cursor-pointer text-xs"
              >
                {aiAnalysis.status === 'analyzing' ? '윤리 점검 엔진 구동 중...' : '식단 추천 및 예약 심사 받기'}
              </button>
              
              <button
                type="button"
                onClick={handleResetSimulator}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-4 rounded-xl text-xs"
              >
                초기화
              </button>
            </div>
          </div>

          {/* Detailed rule hint for kids */}
          <div className="bg-yellow-50/40 border border-yellow-100 rounded-xl p-4 text-[11px] text-slate-600 leading-relaxed space-y-1">
            <h4 className="font-bold text-yellow-950">💡 AI 윤리 전문가 퀴즈 단서:</h4>
            <p>&bull; <strong>중복 시간 예약 방지:</strong> 이미 '아침' 식단을 한 가지 완료했다면, 그 아침에 다른 음식을 또 예약해 먹는 과소비를 막아 공정함을 보증합니다.</p>
            <p>&bull; <strong>품절 알림 가치:</strong> 잔량이 부족한데 억지로 속여 "예약이 됐다"고 하는 비정직을 방어해 신뢰를 쌓습니다.</p>
          </div>
        </div>

        {/* Right Column: AI Response Pane (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-xs font-mono">
          
          {/* Active AI Agent Monitor Panel */}
          <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-800 flex-1 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[9px] text-slate-500 font-bold">
              AI_FILTER_STREAM V2.0
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <span className="text-[10px] font-bold text-slate-400">윤리 필터 작동 모니터</span>
              </div>

              {/* Chat-like box in terminal style */}
              <div className="space-y-3 leading-relaxed max-h-[300px] overflow-y-auto text-slate-300">
                {aiAnalysis.status === 'idle' ? (
                  <div className="text-slate-500 italic py-12 text-center font-sans">
                    왼쪽 양식을 입력하고 추천 받기 버튼을 누르면, 설계한 에이전트({canvas.agentName || '미지정'})의 이중 예약 및 품절 윤리 분석 결과가 여기에 출력됩니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[10px] text-yellow-400 font-bold">
                      &gt; [SYSTEM] 윤리 필터링 규칙 점검 개시...
                    </p>
                    <p className="text-[10px] text-slate-400 leading-none">
                      &bull; 개인정보 필터링: [통과] {canvas.privacyRule ? '안심 수칙 장착됨' : '별명만 허용 규칙'}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-none">
                      &bull; 이중 예약 방어: [가동] 시간대별 식단 제한 필터
                    </p>
                    <p className="text-[10px] text-slate-400 leading-none">
                      &bull; 재고 투명성 제어: [가동] 품절 정직 알림 필터
                    </p>
                    
                    <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-sans text-slate-100 mt-2 whitespace-pre-line text-xs">
                      {aiAnalysis.reason}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action panel inside the screen */}
            {aiAnalysis.status === 'confirm_pending' && (
              <div className="mt-4 p-3.5 bg-yellow-400/10 border-2 border-yellow-400 rounded-2xl space-y-3 font-sans">
                <div className="text-[11px] text-yellow-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  사람의 최종 수동 동의 필요 (Human Confirmation)
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  인공지능이 멋대로 예약 결제하지 않았습니다. 가족 구성원이 정말 해당 음식을 먹을 것인지 최종 확정해 주세요.
                </p>
                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-2 px-3 rounded-xl transition-all shadow-xs text-xs cursor-pointer"
                >
                  🙋‍♂️ 예, 우리 가족 식사를 최종 예약 확정합니다!
                </button>
              </div>
            )}

            {aiAnalysis.suggestedWaitlist && (
              <div className="mt-4 p-3.5 bg-blue-500/10 border border-blue-400 rounded-2xl space-y-3 font-sans">
                <div className="text-[11px] text-blue-300 font-bold">
                  ℹ️ 정직한 품절 알림으로 인한 대기 등록
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  자리가 매진되어 예약을 억지로 잡지 못합니다. 대기자 명단에 공정하게 등재하시겠습니까?
                </p>
                <button
                  type="button"
                  onClick={handleRegisterWaitlist}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-xl transition-all text-xs cursor-pointer"
                >
                  📝 예, 정직한 대기 등록에 참여하겠습니다
                </button>
              </div>
            )}

            {aiAnalysis.status === 'success' && (
              <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500 rounded-xl flex items-start gap-2 font-sans text-xs">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-300">윤리 필터 검토 무결점 완료!</h4>
                  <p className="text-[10px] text-slate-300 mt-1">
                    추천 식사 명부에 완전히 전송되었습니다. 3단계 "배달 식당 주문 창"에서 이 훌륭한 식단을 배달시킬 수 있습니다.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bookings Tracker */}
          <div className="bg-white rounded-2xl border border-yellow-100 p-4 shadow-3xs space-y-2 font-sans">
            <h4 className="font-bold text-xs text-yellow-950 flex items-center gap-1.5">
              📋 현재 우리 가문 식단 예약 원장 ({bookings.length}건)
            </h4>
            
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {bookings.length === 0 ? (
                <div className="text-slate-400 text-[10px] text-center py-6">
                  추천 및 확정된 식사 예약 이력이 없습니다.
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex justify-between items-center p-2 bg-yellow-50/30 rounded-lg border border-yellow-100 text-[11px]"
                  >
                    <div>
                      <div className="font-bold text-yellow-950">
                        {booking.nickname} <span className="font-normal text-slate-500">(가족 {booking.familySize}명 식사)</span>
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        {booking.timeSlot} 시간 &bull; <strong className="text-yellow-700">{booking.foodName}</strong>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        booking.status === '대기중' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {booking.status}
                      </span>
                      <div className="text-[8px] text-slate-400 mt-1">{booking.timestamp}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Next Button when reservation exists */}
          {bookings.length > 0 && (
            <button
              onClick={onNext}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black py-3 px-4 rounded-xl shadow-xs transition-transform hover:scale-[1.01] cursor-pointer text-xs"
            >
              다음 단계: 3단계 배달 주문 확인창 가기 <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </div>
    </motion.div>
  );
}
