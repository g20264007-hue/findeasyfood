import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Smartphone, ExternalLink, ShieldCheck, Heart, AlertCircle, Sparkles, Navigation, Clock, CreditCard } from 'lucide-react';
import { Booking } from '../types';

interface DeliveryViewProps {
  bookings: Booking[];
  onNext: () => void;
  onGoToBooking: () => void;
}

interface DeliveryAppConfig {
  appName: string;
  color: string;
  textColor: string;
  headerBg: string;
  logoEmoji: string;
  desc: string;
  storeName: string;
  deliveryFee: string;
  deliveryTime: string;
  rating: string;
  price: string;
}

const DELIVERY_APPS: Record<string, DeliveryAppConfig> = {
  '시리얼': {
    appName: '쿠팡 로켓프레시',
    color: 'border-cyan-500',
    textColor: 'text-cyan-600',
    headerBg: 'bg-[#0073E6]',
    logoEmoji: '🚀',
    desc: '신선한 우유와 아침 전용 시리얼 패키지를 내 집 현관 앞으로 가장 빠르게 직배송합니다.',
    storeName: '쿠팡 프레시 물류센터 (온라인 마트)',
    deliveryFee: '0원 (와우회원 무료배송)',
    deliveryTime: '내일 새벽 7시 전 도착 보장',
    rating: '⭐ 4.9 (리뷰 12,450개)',
    price: '14,800원 (시리얼 1박스 + 서울우유 1L)'
  },
  '돼지 국밥': {
    appName: '배달의민족',
    color: 'border-[#2AC1BC]',
    textColor: 'text-[#2AC1BC]',
    headerBg: 'bg-[#2AC1BC]',
    logoEmoji: '🛵',
    desc: '뜨끈하고 진한 육수의 돼지 국밥을 배민배달로 정성껏 포장하여 따뜻하게 배달해 드립니다.',
    storeName: '본가 명품 가마솥 돼지국밥',
    deliveryFee: '2,500원 (한 알뜰배달)',
    deliveryTime: '25~35분 소요 예상',
    rating: '⭐ 4.8 (리뷰 890개)',
    price: '36,000원 (4인분 완조리 팩 + 깍두기, 겉절이)'
  },
  '고기': {
    appName: '요기요',
    color: 'border-[#FA0050]',
    textColor: 'text-[#FA0050]',
    headerBg: 'bg-[#FA0050]',
    logoEmoji: '🎈',
    desc: '지글지글 알맞게 구워 겉바속촉 삼겹살 세트를 쌈채소와 함께 요기배달로 안전하게 보내 드립니다.',
    storeName: '삼겹시대 직화 삼겹살구이 전문점',
    deliveryFee: '1,500원 (요기패스 무료)',
    deliveryTime: '30~40분 소요 예상',
    rating: '⭐ 4.7 (리뷰 1,230개)',
    price: '48,000원 (온가족 삼겹살 1kg 세트 + 김치찌개 서비스)'
  },
  '스시': {
    appName: '쿠팡이츠',
    color: 'border-[#00A5E2]',
    textColor: 'text-[#00A5E2]',
    headerBg: 'bg-[#00A5E2]',
    logoEmoji: '🍣',
    desc: '신선한 생선회와 갓 지은 밥으로 만든 프리미엄 스시를 와우 무료배달로 짓눌림 없이 안전하게 배달합니다.',
    storeName: '가도스시 프리미엄 초밥전문점',
    deliveryFee: '0원 (세이브배달 무료)',
    deliveryTime: '20~30분 소요 예상',
    rating: '⭐ 4.9 (리뷰 2,150개)',
    price: '65,000원 (가족 특선 초밥 40pcs)'
  }
};

export default function DeliveryView({ bookings, onNext, onGoToBooking }: DeliveryViewProps) {
  // Find only confirmed bookings
  const confirmedBookings = bookings.filter(b => b.status === '확정');
  
  // Set selected booking or use a fallback for preview
  const [selectedBookingId, setSelectedBookingId] = useState<string>('');
  const [previewFood, setPreviewFood] = useState<string>('돼지 국밥');
  const [orderStep, setOrderStep] = useState<'details' | 'ordering' | 'completed'>('details');

  useEffect(() => {
    if (confirmedBookings.length > 0) {
      setSelectedBookingId(confirmedBookings[0].id);
    }
  }, [bookings]);

  const activeBooking = confirmedBookings.find(b => b.id === selectedBookingId);
  const activeFood = activeBooking ? activeBooking.foodName : previewFood;
  const appConfig = DELIVERY_APPS[activeFood] || DELIVERY_APPS['돼지 국밥'];

  const handleSimulateOrder = () => {
    setOrderStep('ordering');
    setTimeout(() => {
      setOrderStep('completed');
    }, 2000);
  };

  const handleResetOrder = () => {
    setOrderStep('details');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-5xl mx-auto space-y-6"
      id="delivery-view"
    >
      {/* Top Banner with easy explanations */}
      <div className="bg-yellow-100/60 border-2 border-yellow-200 rounded-2xl p-5 flex items-start gap-4 shadow-2xs">
        <div className="p-3 bg-yellow-400 text-yellow-950 rounded-xl">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-950 font-display">
            🛵 3단계. 배달 식당 메뉴 매칭 및 주문 창 (연동 시뮬레이션)
          </h2>
          <p className="text-xs text-yellow-900 mt-1 leading-relaxed">
            축하합니다! 예약이 확정된 <strong>식재료/음식 식단</strong>이 가상 배달 앱에 어떻게 매칭되어 뜨는지 모바일 화면으로 체험해 봅시다.<br />
            진짜 개인 주소나 실명 정보 없이 오직 <strong>안전한 가상 별명</strong>만 배달 앱으로 연동되어 개인정보를 철저히 지키게 됩니다!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Select Booking or Preview (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Linked Reservations List */}
          <div className="bg-white rounded-2xl border border-yellow-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-yellow-50 pb-2.5">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <h3 className="font-extrabold text-sm text-yellow-950">배달 앱 연동 데이터</h3>
            </div>

            {confirmedBookings.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500 font-medium">
                  현재 예약 확정된 식단 목록입니다. 아래에서 하나를 선택하면 오른쪽에 해당 배달 앱 화면이 로드됩니다!
                </p>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {confirmedBookings.map((b) => {
                    const isSelected = b.id === selectedBookingId;
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          setSelectedBookingId(b.id);
                          setOrderStep('details');
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                          isSelected
                            ? 'bg-yellow-50 border-2 border-yellow-400 shadow-2xs font-bold'
                            : 'bg-white border-slate-200 hover:border-yellow-300'
                        }`}
                      >
                        <div>
                          <div className="text-yellow-950 flex items-center gap-1.5">
                            <span className="text-sm">🍳</span>
                            <span>{b.nickname} 가구의 식단</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {b.timeSlot} 식사 &bull; <strong className="text-yellow-700">{b.foodName}</strong>
                          </div>
                        </div>
                        <span className="text-[9px] bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded-full">
                          선택중
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 py-4">
                <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100/80 text-center">
                  <p className="text-xs text-yellow-950 font-bold">
                    🔔 확정된 식단 예약이 아직 없습니다!
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    2단계 '식단 추천 및 예약' 단계에서 먼저 별명을 입력하고 식단을 예약 확정해 보세요.
                  </p>
                </div>
                
                <button
                  onClick={onGoToBooking}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  식단 추천 받으러 가기 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Sandbox Selector (if no reservations, or for exploring other foods) */}
          <div className="bg-white rounded-2xl border border-yellow-200 p-5 shadow-2xs space-y-3">
            <h4 className="font-extrabold text-xs text-yellow-950">🍱 배달 앱 미리보기 맛보기</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              확정된 식단이 없어도 다양한 메뉴별 가상 배달 화면을 미리 구경할 수 있습니다. 아래에서 음식을 골라보세요:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {['시리얼', '돼지 국밥', '고기', '스시'].map((food) => {
                const isSelected = !activeBooking && previewFood === food;
                const config = DELIVERY_APPS[food];
                return (
                  <button
                    key={food}
                    onClick={() => {
                      setSelectedBookingId('');
                      setPreviewFood(food);
                      setOrderStep('details');
                    }}
                    className={`text-left p-2 rounded-lg border text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-yellow-400 border-yellow-400 text-white font-bold'
                        : 'bg-slate-50 hover:bg-yellow-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-lg shrink-0">{config.logoEmoji}</span>
                    <span className="truncate">{food}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Educational Note - Terms explanation */}
          <div className="bg-yellow-50/40 border border-yellow-100 rounded-xl p-4 text-[11px] space-y-1.5 leading-relaxed text-slate-600">
            <p className="font-bold text-yellow-950 flex items-center gap-1">
              💡 어려운 용어 설명: 연동 (Integration)
            </p>
            <p>
              "연동"이란 한 프로그램의 데이터가 다른 프로그램으로 안전하게 넘어가는 과정을 뜻해요. <br />
              여기서는 추천 AI 에이전트가 정한 식사 데이터가 <strong>배달 앱 주문 화면</strong>으로 자동으로 전달되어, 사용자가 번거롭게 다시 검색하지 않아도 되게 도와줍니다.
            </p>
            <p className="font-bold text-emerald-800">
              ✔️ 이때 이름/주소 등 실제 개인정보는 일체 배출하지 않고 가상 별명('해피냠냠' 등)만 사용하여 해커의 침입으로부터 보호를 받습니다!
            </p>
          </div>
        </div>

        {/* Right Section: Interactive Smartphone Simulator Frame (col-span-7) */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Smartphone Frame Wrapper */}
          <div className="w-full max-w-[360px] bg-slate-900 rounded-[40px] p-3.5 shadow-xl border-4 border-slate-800 relative">
            
            {/* Phone Camera Notch */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-20 flex items-center justify-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <div className="w-8 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Inner Phone Screen */}
            <div className="bg-white rounded-[32px] overflow-hidden min-h-[560px] flex flex-col justify-between relative shadow-inner z-10">
              
              {/* Phone Status Bar */}
              <div className="bg-slate-50 h-8 px-5 pt-2 text-[10px] text-slate-500 flex justify-between items-center shrink-0">
                <span className="font-bold">12:00 PM</span>
                <div className="flex items-center gap-1">
                  <span>📶 5G</span>
                  <span>🔋 99%</span>
                </div>
              </div>

              {/* Delivery App Header */}
              <div className={`${appConfig.headerBg} px-4 py-3 flex items-center justify-between text-white shadow-xs`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl animate-bounce">{appConfig.logoEmoji}</span>
                  <div>
                    <h3 className="font-bold text-xs tracking-tight leading-tight">{appConfig.appName}</h3>
                    <p className="text-[8px] opacity-80 leading-none mt-0.5">식사 제안 자동 연동 서비스</p>
                  </div>
                </div>
                <span className="text-[8px] bg-white/20 px-2 py-0.5 rounded-full border border-white/30 font-bold">
                  안전 연결 중
                </span>
              </div>

              {/* Delivery Screen Content Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50">
                
                {orderStep === 'details' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Store Title Card */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-3xs space-y-1.5">
                      <span className="text-[9px] text-yellow-600 font-bold block uppercase">추천 연동 맛집</span>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{appConfig.storeName}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                        <span>{appConfig.rating}</span>
                        <span>&bull;</span>
                        <span className="text-emerald-600 font-bold">배달 수수료 {appConfig.deliveryFee}</span>
                      </div>
                    </div>

                    {/* Menu Item Detail */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-3xs space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">주문 식단</span>
                          <h5 className="font-bold text-slate-800 text-sm mt-1">{activeFood} (가정의 4인분 추천 세트)</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{appConfig.desc}</p>
                        </div>
                        <span className="text-4xl p-2 bg-yellow-50 rounded-xl shrink-0">{appConfig.logoEmoji}</span>
                      </div>

                      <div className="border-t border-slate-100 pt-2.5 flex justify-between items-baseline">
                        <span className="font-bold text-slate-800">실 결제 금액</span>
                        <span className="font-black text-amber-600 text-sm">{appConfig.price}</span>
                      </div>
                    </div>

                    {/* Secure Delivery Info */}
                    <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-2xl space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-[11px]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>개인정보 안심 보호 시스템</span>
                      </div>
                      <div className="text-[10px] text-emerald-900/80 space-y-1 leading-relaxed">
                        <p>&bull; <strong>배달 별명:</strong> {activeBooking ? activeBooking.nickname : '안심손님 (임시별명)'}</p>
                        <p>&bull; <strong>고객 전화번호:</strong> <span className="font-mono text-emerald-700 bg-emerald-100/50 px-1.5 py-0.5 rounded font-bold">개인정보 차단 (안심번호 자동 연동)</span></p>
                        <p>&bull; <strong>상세 주소:</strong> <span className="text-emerald-700 font-bold bg-emerald-100/50 px-1.5 py-0.5 rounded">가까운 라이더 수령 기지 보관</span></p>
                      </div>
                    </div>

                    {/* Order Action Button */}
                    <button
                      type="button"
                      onClick={handleSimulateOrder}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold py-3.5 px-4 rounded-xl text-xs transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>🛵 안전 결제 및 가상 배달 주문하기</span>
                    </button>
                  </motion.div>
                )}

                {orderStep === 'ordering' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 space-y-4"
                  >
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto border-2 border-yellow-400 animate-pulse">
                      <Clock className="w-8 h-8 text-yellow-600 animate-spin" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-black text-slate-800 text-sm">에이전트 보안 트랜잭션 전송 중...</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                        개인정보 유출 차단 필터를 장착하여 배달 가맹점과 통신을 시도하고 있습니다.
                      </p>
                    </div>
                  </motion.div>
                )}

                {orderStep === 'completed' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 text-3xl">
                      🎉
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-emerald-800 text-sm">가상 배달 주문 완료!</h4>
                      <p className="text-[10px] text-slate-500">배달 완료 예정 시각: {appConfig.deliveryTime}</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-left space-y-1.5 text-[10px]">
                      <div className="flex justify-between border-b border-slate-50 pb-1.5 font-bold text-slate-700">
                        <span>주문 상점</span>
                        <span>{appConfig.storeName}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>선택 메뉴</span>
                        <span>{activeFood} 4인분</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>개인정보 상태</span>
                        <span className="text-emerald-600 font-bold">암호화 차단 완료 (안심)</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetOrder}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      다시 보기
                    </button>
                  </motion.div>
                )}

              </div>

              {/* Phone Footer Bar */}
              <div className="bg-slate-50 border-t border-slate-100 py-3 text-center shrink-0 flex items-center justify-center">
                <div className="w-24 h-1 bg-slate-300 rounded-full" />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Navigation button at the bottom right */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs"
        >
          다음 미션 완료! 4단계: 레드팀 공격 해보기 <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </motion.div>
  );
}
