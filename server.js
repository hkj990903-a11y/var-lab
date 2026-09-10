require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { question, caseContext } = req.body;

    if (!question || !caseContext) {
      return res.status(400).json({ error: 'question과 caseContext가 필요합니다.' });
    }

    const systemPrompt = `당신은 축구 VAR(비디오 판독) 판정을 분석하는 전문 AI입니다.
아래는 현재 사용자가 보고 있는 사례 정보입니다. 이 정보를 바탕으로 IFAB 경기 규정에 근거해 정확하고 간결하게 답변하세요.

[사례 정보]
- 케이스 번호: ${caseContext.number}
- 제목: ${caseContext.title}
- 대회: ${caseContext.competitionLabel}
- 날짜: ${caseContext.date}
- 장소: ${caseContext.venue}
- 요약: ${caseContext.summary}
- 최종 판정: ${caseContext.verdict}
- 참고 설명: ${caseContext.aiIntro || ''}

답변은 한국어로, 친절하지만 전문적으로 작성하세요.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.4,
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI 응답 생성 중 오류가 발생했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`VAR Lab 서버 실행 중: http://localhost:${PORT}`);
});