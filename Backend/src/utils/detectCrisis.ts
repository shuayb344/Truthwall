const crisisKeywords = [
  "kill myself",
  "end my life",
  "want to die",
  "suicide",
  "suicidal",
  "self harm",
  "self-harm",
  "cut myself",
  "don't want to be here",
  "dont want to be here",
  "no reason to live",
  "better off dead",
  "can't go on",
  "cant go on",
  "give up on life",
  "not worth living",
  "end it all",
  "hurt myself",
];
 
interface CrisisResult {
  crisis: boolean;
  severity: "low" | "medium" | "high" | null;
}
 
const detectCrisis = (content: string): CrisisResult => {
  const lower = content.toLowerCase();
  const found = crisisKeywords.some((keyword) => lower.includes(keyword));
 
  return {
    crisis: found,
    severity: found ? "high" : null,
  };
};
 
export default detectCrisis;
