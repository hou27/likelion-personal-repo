import readline from "readline/promises";

export const input = async (question?: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(question ?? "");
  rl.close();
  return answer;
};
