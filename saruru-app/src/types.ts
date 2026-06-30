export type ReframeResult = {
  neutral_summary: string;
  possible_interpretation: string;
  not_your_responsibility: string;
  why_it_stung: string;
  closure_reframe: string;
  boundary_line: string | null;
  melt_line: string; // 녹는 동안 보여줄 짧은 한 줄
  safety: { flag: boolean; reason: string | null };
};

export type Incident = {
  text: string;
  emotions: string[];
  reframe?: ReframeResult;
};
