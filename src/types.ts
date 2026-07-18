export interface CanvasData {
  agentName: string;
  problem: string;
  goal: string;
  inputInfo: string;
  forbiddenActions: string;
  verificationMoment: string;
  privacyRule: string;
  fairnessRule: string;
  isSynced: boolean;
}

export interface Booking {
  id: string;
  nickname: string;
  foodName: string;
  timeSlot: '아침' | '점심' | '저녁';
  familySize: number;
  status: '대기중' | '승인대기(최종확인필요)' | '확정' | '거부';
  reason: string;
  timestamp: string;
}

export interface RedTeamTest {
  id: string;
  attackText: string;
  agentResponse: string;
  defenseStatus: '성공' | '우회됨';
  triggeredRule: string;
  timestamp: string;
}

export interface ImprovementLog {
  discoveredProblems: string;
  addedRules: string;
  finalImprovements: string;
  takeaway: string;
}

export interface FoodOption {
  name: string;
  description: string;
  portionsLeft: number;
  imageEmoji: string;
  maxPortions: number;
}
