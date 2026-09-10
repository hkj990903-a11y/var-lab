document.addEventListener("DOMContentLoaded", () => {
  // ===== 사례 데이터: club(팀 태그) / competition(대회 태그) / year(연도) 3축 구조 =====
  const caseData = {
    PL_2324_C1: {
      number: "Case No. 001",
      title: "Possible Penalty",
      competitionLabel: "Premier League",
      date: "2023.07.16",
      venue: "London",
      summary: "수비수가 박스 안에서 공격수와 접촉한 장면.",
      verdict: "최종 판정: No Penalty / 정심 여부 검토 필요",
      aiIntro: "이 장면은 접촉 강도, 볼 선점 여부, 파울의 명확성을 중심으로 검토할 수 있습니다.",
      category: "penalty",
      clubTags: ["ARS-PL"],
      competitionTag: "PL",
      year: "2023"
    },
    WC_2026_C2: {
      number: "Case No. 002",
      title: "Possible Penalty",
      competitionLabel: "Premier League",
      date: "2023.07.16",
      venue: "London",
      summary: "수비수가 박스 안에서 공격수와 접촉한 장면.",
      verdict: "최종 판정: No Penalty / 정심 여부 검토 필요",
      aiIntro: "이 장면은 접촉 강도, 볼 선점 여부, 파울의 명확성을 중심으로 검토할 수 있습니다.",
      category: "penalty",
      clubTags: ["ARS-PL"],
      competitionTag: "PL",
      year: "2023"
    },
    PL_2324_C3: {
      number: "Case No. 003",
      title: "Anthony Gordon Controversial Winner",
      competitionLabel: "Premier League",
      date: "2023.11.04",
      venue: "St James' Park",
      summary: "63분, 뉴캐슬의 윌록이 크로스를 올렸고 볼은 조엘린통(뉴캐슬)과 가브리엘(아스날)이 공중에서 경합하는 과정에서 조엘린통에게 맞고 떨어졌다. 이 볼이 오프사이드 포지션에 있던 앤서니 고든에게 연결되어 골로 마무리됐다. VAR(앤디 매들리)은 골이 선언된 직후 세 가지를 순차적으로 검토했다: ① 크로스 전 볼이 완전히 터치라인을 넘어 아웃 오브 플레이였는지, ② 조엘린통이 가브리엘을 밀친 것이 파울에 해당하는지, ③ 조엘린통에게 볼이 튕긴 것이 IFAB Law 11의 '고의적 플레이(deliberate play)'에 해당해 고든의 오프사이드 포지션을 리셋시키는지. 세 쟁점 모두 화면상 100% 명백하다고 볼 근거가 부족했고, 특히 오프사이드는 SAOT(반자동 오프사이드 기술)가 아직 도입되지 않은 시점이라 정확한 라인을 그릴 수 있는 카메라 앵글 자체가 없었다.",
      verdict: "최종 판정: 골 인정. VAR은 '명백하고 확실한 오류(clear and obvious error)'가 없다는 이유로 온필드 판정을 그대로 유지했다. 특히 오프사이드 쟁점은 '오심이 아니다'가 아니라 '판독이 불가능해 개입 근거가 없다'는 절차적 결론이었다는 점이 이 사례의 핵심 쟁점이다.",
      aiIntro: "이 사례는 세 가지 규정을 동시에 학습할 수 있습니다. 첫째, IFAB Law 11의 'deliberate play' 가이드라인: 상대 선수에게 볼이 단순히 튕기거나 굴절된 경우는 '고의적 플레이'로 인정되지 않아 오프사이드 포지션이 리셋되지 않습니다. 둘째, VAR 개입 기준인 '명백하고 확실한 오류' 원칙: VAR은 재검토가 아니라 오류가 확실할 때만 개입합니다. 셋째, 판정 우선순위: 파울이 성립했다면 오프사이드 여부와 무관하게 골이 취소될 수 있었던 상황이었습니다. 이 세 가지 규정이 어떻게 연결되어 최종 판정에 이르는지 함께 검토해봅시다.",
      categories: ["offside", "foul"],
      clubTags: ["NEW-PL", "ARS-PL"],
      competitionTag: "PL",
      year: "2023",
            media: {
        type: "local-video",
        src: "./PL-2324-Gordon-Goal.mp4",,
        poster: "images/var-room-logo.webp",
        startSeconds: 0,
        caption: "63분 앤서니 고든 결승골 및 VAR 판독 장면 (아스날 공식 하이라이트) — 클릭 시 해당 장면부터 재생"
      },
      sourceNote: "출처: Premier League 공식 VAR 설명, Sky Sports VAR 판정 전문 공개 (2023.11.14)"
    },
    PL_2324_C4: {
      number: "Case No. 004",
      title: "Controversial Offside",
      competitionLabel: "Premier League",
      date: "2023.09.14",
      venue: "Liverpool",
      summary: "득점 직전 오프사이드 개입 여부가 논란이 된 장면.",
      verdict: "최종 판정: 논란 장면 / 판정 근거 비교 필요",
      aiIntro: "이 사례는 단순 위치 판정이 아니라 공격수의 플레이 개입 여부까지 포함해 검토해야 합니다.",
      category: "offside",
      clubTags: ["BRE-PL"],
      competitionTag: "PL",
      year: "2023"
    },
    UCL_2324_C5: {
      number: "Case No. 005",
      title: "Possible Handball",
      competitionLabel: "UEFA Champions League",
      date: "2024.03.12",
      venue: "Madrid",
      summary: "크로스 상황에서 수비수 팔에 공이 맞은 장면.",
      verdict: "최종 판정: Handball 여부 논란",
      aiIntro: "핸드볼 판단에서는 팔의 위치, 몸의 확장 여부, 의도성이 핵심입니다.",
      category: "handball",
      clubTags: ["ATM-LL"],
      competitionTag: "UCL",
      year: "2024"
    },
    UCL_2324_C6: {
      number: "Case No. 006",
      title: "Handball Review",
      competitionLabel: "UEFA Champions League",
      date: "2024.03.18",
      venue: "Barcelona",
      summary: "팔의 위치와 몸의 확장 여부가 쟁점인 장면.",
      verdict: "최종 판정: Deliberate Handball 여부 검토 필요",
      aiIntro: "팔이 자연스러운 위치였는지, 신체를 부자연스럽게 넓혔는지를 중심으로 판단할 수 있습니다.",
      category: "handball",
      clubTags: ["BAR-LL"],
      competitionTag: "UCL",
      year: "2024"
    },
    UCL_2425_C7: {
      number: "Case No. 007",
      title: "Controversial Handball",
      competitionLabel: "UEFA Champions League",
      date: "2024.04.02",
      venue: "Munich",
      summary: "짧은 거리에서 팔 접촉이 발생한 장면.",
      verdict: "최종 판정: No Handball 가능성 / 정심 여부 검토 필요",
      aiIntro: "거리와 반응 시간은 핸드볼 판정에서 중요한 맥락 요소입니다.",
      category: "handball",
      clubTags: ["FCB-BL"],
      competitionTag: "UCL",
      year: "2024"
    },
    PL_2425_C8: {
      number: "Case No. 008",
      title: "Indirect Free Kick",
      competitionLabel: "VAR Lab Archive",
      date: "2025.01.11",
      venue: "Archive Room",
      summary: "골키퍼 처리와 간접 프리킥 재개 기준을 검토하는 사례.",
      verdict: "최종 판정: Indirect Free Kick 적용 가능",
      aiIntro: "재개 방식 판단에서는 위반 유형과 경기 재개 규정을 정확히 연결해야 합니다.",
      category: "indirect-free-kick",
      clubTags: [],
      competitionTag: "PL",
      year: "2025"
    },
    BL_2324_C9: {
      number: "Case No. 009",
      title: "Indirect Free Kick Review",
      competitionLabel: "VAR Lab Archive",
      date: "2024.01.18",
      venue: "Archive Room",
      summary: "위험한 플레이와 재개 방식이 함께 논의되는 장면.",
      verdict: "최종 판정: 재개 방식 재검토 필요",
      aiIntro: "간접 프리킥 상황은 파울의 성격과 실제 제재 수위를 함께 봐야 합니다.",
      category: "indirect-free-kick",
      clubTags: [],
      competitionTag: "BL",
      year: "2024"
    },
    PL_2425_C10: {
      number: "Case No. 010",
      title: "Declan Rice Second Yellow Card Controversy",
      competitionLabel: "Premier League",
      date: "2024.09.15",
      venue: "Emirates Stadium",
      summary: "아스날 vs 브라이튼 경기 중, 브라이튼의 프리킥 재개 상황에서 데클란 라이스(아스날)가 공을 걷어차 경기 재개를 지연시킨 장면. 주심 크리스 카바나그는 이를 두 번째 옐로카드(퇴장) 대상으로 판단했다. VAR(앤디 매들리)은 라이스가 상대 선수(벨트만)를 보지 못한 채 볼을 플레이하려던 동작이었는지를 검토했고, '고의적 반칙/폭력적 행위'는 아니라고 판단해 온필드 판정을 그대로 유지했다.",
      verdict: "최종 판정: Foul 가능성 높음 / 정심 여부 검토 필요최종 판정: 2차 경고 및 퇴장 유지. VAR은 '체크 후 확정(checked and cleared)' 처리했으며, 카바나그 주심은 '선택의 여지가 없었다(I had no choice)'고 언급했다. PGMOL 수장 하워드 웹도 이 판정을 공개 지지했다.",
      aiIntro: "이 사례는 '경기 재개 지연 행위(delaying the restart)'에 대한 두 번째 경고 기준과, VAR이 개입할 수 있는 범위를 함께 학습할 수 있습니다. 특히 심판이 이미 카드를 준 상황에서 VAR이 '판정 번복'이 아니라 '판정 근거 확인'만 수행한다는 점이 핵심 쟁점입니다.",
      category: "foul",
      clubTags: ["ARS-PL", "BHA-PL"],
      competitionTag: "PL",
      year: "2024"
    },
    UCL_2324_C11: {
      number: "Case No. 011",
      title: "Controversial Foul",
      competitionLabel: "UEFA Champions League",
      date: "2024.02.10",
      venue: "Milan",
      summary: "접촉 강도와 도전 방식 해석에 따라 판정이 갈릴 수 있는 장면.",
      verdict: "최종 판정: 논란 장면 / 추가 해석 필요",
      aiIntro: "접촉의 강도와 도전의 안전성 여부가 판정의 핵심 쟁점입니다.",
      category: "foul",
      clubTags: ["MIL-SA"],
      competitionTag: "UCL",
      year: "2024"
    },
    BL_2324_C12: {
      number: "Case No. 012",
      title: "DOGSO Review",
      competitionLabel: "VAR Lab Archive",
      date: "2024.04.21",
      venue: "Archive Room",
      summary: "명백한 득점 기회 저지 여부를 검토하는 사례.",
      verdict: "최종 판정: DOGSO 성립 가능",
      aiIntro: "DOGSO 판단에서는 거리, 방향, 수비수 수, 공 컨트롤 가능성을 함께 따져야 합니다.",
      category: "DOGSO",
      clubTags: ["KOE-BL"],
      competitionTag: "BL",
      year: "2024"
    },
    WC_2022_C13: {
      number: "Case No. 013",
      title: "DOGSO Debate",
      competitionLabel: "VAR Lab Archive",
      date: "2022.12.04",
      venue: "Archive Room",
      summary: "거리, 수비수 수, 공의 방향을 종합해 DOGSO 여부를 판단하는 사례.",
      verdict: "최종 판정: DOGSO 여부 논쟁 가능",
      aiIntro: "이 사례는 명백한 득점 기회인지에 대한 해석 차이가 핵심입니다.",
      category: "DOGSO",
      clubTags: ["ARG-WC"],
      competitionTag: "WC",
      year: "2022"
    }
  };

  const categoryLabels = {
    penalty: "페널티킥 / 노파울",
    offside: "오프사이드",
    handball: "핸드볼",
    "indirect-free-kick": "간접 프리킥",
    foul: "파울",
    DOGSO: "DOGSO"
  };

  const TEAM_INDEX = typeof teamIndex !== "undefined" ? teamIndex : [];
  const LEAGUE_META = typeof leagueMeta !== "undefined" ? leagueMeta : {};
  const COMPETITION_META = typeof competitionMeta !== "undefined" ? competitionMeta : {};
  const CONFEDERATION_META = typeof confederationMeta !== "undefined" ? confederationMeta : {};
  const YEAR_BADGE = { bg: "#000000", text: "#FFFFFF" };

  const competitionIndex = [
    { tag: "PL", officialName: "Premier League", koreanName: "프리미어리그", aliases: ["피엘"] },
    { tag: "LL", officialName: "La Liga", koreanName: "라리가", aliases: [] },
    { tag: "BL", officialName: "Bundesliga", koreanName: "분데스리가", aliases: ["분데스"] },
    { tag: "SA", officialName: "Serie A", koreanName: "세리에A", aliases: [] },
    { tag: "L1", officialName: "Ligue 1", koreanName: "리그1", aliases: ["리그앙"] },
    { tag: "WC", officialName: "World Cup", koreanName: "월드컵", aliases: [] },
    { tag: "UCL", officialName: "UEFA Champions League", koreanName: "UEFA 챔피언스리그", aliases: ["챔피언스리그", "챔스", "유에파 챔피언스리그", "유에파 챔스"] },
    { tag: "UEL", officialName: "UEFA Europa League", koreanName: "UEFA 유로파리그", aliases: ["유로파리그", "유에파 유로파리그"] },
    { tag: "UECL", officialName: "UEFA Conference League", koreanName: "UEFA 컨퍼런스리그", aliases: ["컨퍼런스리그", "유에파 컨퍼런스리그"] }
  ];

  function isKorean(str) {
    return /[가-힣]/.test(str);
  }

  function normalizeQuery(q) {
    return String(q).trim().toLowerCase();
  }

  function getTeamByTag(tag) {
    return TEAM_INDEX.find((t) => t.tag === tag);
  }

  function renderClubBadge(tag) {
    const team = getTeamByTag(tag);
    if (!team) return `<span class="badge">#${tag}</span>`;

    let meta;
    if (team.league === "WC" && team.confederation) {
      meta = CONFEDERATION_META[team.confederation] || { bg: "#555", text: "#fff" };
    } else {
      meta = LEAGUE_META[team.league] || { bg: "#555", text: "#fff" };
    }

    return `<span class="league-badge" style="background:${meta.bg};color:${meta.text}" title="${team.officialName}">${team.abbreviation}</span>`;
  }

  function renderCompetitionBadge(tag) {
    const meta = COMPETITION_META[tag];
    if (!meta) return `<span class="badge">#${tag}</span>`;
    return `<span class="competition-badge" style="background:${meta.bg};color:${meta.text}" title="${meta.label}">${tag}</span>`;
  }

  function renderYearBadge(year) {
    return `<span class="year-badge" style="background:${YEAR_BADGE.bg};color:${YEAR_BADGE.text}">${year}</span>`;
  }

  function renderAllTagsHtml(item) {
    const clubHtml = (item.clubTags || []).map(renderClubBadge).join("");
    const compHtml = item.competitionTag ? renderCompetitionBadge(item.competitionTag) : "";
    const yearHtml = item.year ? renderYearBadge(item.year) : "";
    return clubHtml + compHtml + yearHtml;
  }

  function getCaseCategories(item) {
    if (item.categories && item.categories.length) return item.categories;
    return [item.category || "uncategorized"];
  }

  function getFilterTags(item) {
    const tags = [];

    (item.clubTags || []).forEach((tag) => {
      tags.push(tag);
      const team = getTeamByTag(tag);
      if (team) {
        if (team.league) tags.push(team.league);
        if (team.league === "WC" && team.confederation) tags.push(team.confederation);
      }
    });

    if (item.competitionTag) tags.push(item.competitionTag);
    if (item.year) tags.push(item.year);

    return tags;
  }

  const caseNo = document.querySelector(".case-no");
  const caseTitle = document.querySelector(".case-title");
  const caseMetaRight = document.querySelector(".case-meta-right");
  const caseSubtitle = document.querySelector(".case-subtitle");
  const caseSummary = document.querySelector(".case-summary");
  const verdictBox = document.querySelector(".verdict-content");
  const caseHeaderTags = document.getElementById("caseHeaderTags");

  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.querySelector(".chat-input-bar");
  const chatInput = document.getElementById("userInput");
  const quickButtons = document.querySelectorAll(".quick-questions .chip");

  const caseListContainer = document.getElementById("caseListContainer");
  const caseSearchInput = document.getElementById("caseSearch");
  const tagFilterList = document.getElementById("tagFilterList");
  const activeFilterBar = document.getElementById("activeFilterBar");
  const teamSuggestionBox = document.getElementById("teamSuggestionBox");

  const savedCaseId = localStorage.getItem('varlab_lastCaseId');
let currentCaseId = (savedCaseId && caseData[savedCaseId]) ? savedCaseId : "PL_2223_C1";
  let activeTags = [];
  let searchKeyword = "";

  function addMessage(text, sender = "user") {
    if (!chatMessages || !text) return;
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function resetChat(aiText) {
    if (!chatMessages) return;
    chatMessages.innerHTML = "";
    addMessage(aiText, "ai");
  }

  // ===== 영상 카드 렌더링: 캡션은 .video-card 밖의 별도 요소(#videoCaption)에 렌더링 =====
  function renderVideoCard(data) {
    const videoCard = document.querySelector(".video-card");
    const videoCaption = document.getElementById("videoCaption");
    if (!videoCard) return;

    const media = data.media;

   if (media && media.type === "youtube-embed" && media.youtubeId) {
  const start = media.startSeconds ? `&start=${media.startSeconds}` : "";
  const origin = encodeURIComponent(window.location.origin);
  videoCard.innerHTML = `
    <div class="video-embed-wrap">
      <iframe
        src="https://www.youtube.com/embed/${media.youtubeId}?enablejsapi=1&origin=${origin}${start}"
        title="${media.caption || data.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  `;
    } else if (media && media.type === "local-video" && media.src) {
      videoCard.innerHTML = `
        <div class="video-embed-wrap local-video-wrap">
          <div class="video-poster-overlay" id="videoPosterOverlay">
            ${media.poster ? `<img src="${media.poster}" alt="${media.caption || data.title}" class="video-poster-img" />` : ""}
            <button type="button" class="video-play-btn" id="videoPlayBtn" aria-label="영상 재생">▶</button>
          </div>
        </div>
      `;

      const wrap = videoCard.querySelector(".local-video-wrap");
      const overlay = videoCard.querySelector("#videoPosterOverlay");
      const playBtn = videoCard.querySelector("#videoPlayBtn");

      const startVideo = () => {
        wrap.innerHTML = `
          <video id="localVideoPlayer" controls autoplay style="width:100%; height:100%; background:#1A1A1A;">
            <source src="${media.src}" type="video/mp4" />
            이 브라우저는 video 태그를 지원하지 않습니다.
          </video>
        `;
        const videoEl = wrap.querySelector("#localVideoPlayer");
        if (videoEl && media.startSeconds) {
          videoEl.addEventListener("loadedmetadata", () => {
            try { videoEl.currentTime = media.startSeconds; } catch (err) {}
          }, { once: true });
        }
      };

      if (overlay) overlay.addEventListener("click", startVideo);
      if (playBtn) playBtn.addEventListener("click", (e) => { e.stopPropagation(); startVideo(); });
    } else {
      videoCard.innerHTML = `
        <div class="video-placeholder">
          <p>[ Video / Multi-angle scene placeholder ]</p>
        </div>
      `;
    }

    if (videoCaption) {
      videoCaption.textContent = media && media.caption ? media.caption : "";
      videoCaption.style.display = media && media.caption ? "block" : "none";
    }
  }

  function renderCase(caseId) {
    localStorage.setItem('varlab_lastCaseId', caseId);
    const data = caseData[caseId];
    if (!data) return;

    currentCaseId = caseId;

    if (caseNo) caseNo.textContent = data.number;
    if (caseTitle) caseTitle.textContent = data.title;

    if (caseSubtitle) {
      const cats = getCaseCategories(data).map((c) => categoryLabels[c] || c);
      caseSubtitle.textContent = cats.join(" · ");
    }

    if (caseSummary) caseSummary.textContent = data.summary;
    if (verdictBox) verdictBox.textContent = data.verdict;
    if (caseHeaderTags) caseHeaderTags.innerHTML = renderAllTagsHtml(data);

    if (caseMetaRight) {
      caseMetaRight.innerHTML = `
        <p class="case-competition">Competition: ${data.competitionLabel}</p>
        <p class="case-date">Date: ${data.date}</p>
        <p class="case-venue">Venue: ${data.venue}</p>
      `;
    }

    renderVideoCard(data);

    resetChat(data.aiIntro || "이 사례를 함께 검토해봅시다.");

    document.querySelectorAll(".case-link[data-case-id]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.caseId === caseId);
    });
  }

  async function sendQuestion(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  addMessage(cleanText, "user");

  const current = caseData[currentCaseId];
  if (!current) {
    addMessage("현재 선택된 사례 정보를 찾을 수 없습니다.", "ai");
    return;
  }

  // 로딩 표시
  const loadingId = "loading-" + Date.now();
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message ai";
  loadingDiv.id = loadingId;
  loadingDiv.textContent = "답변을 생성하는 중...";
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: cleanText,
        caseContext: {
          number: current.number,
          title: current.title,
          competitionLabel: current.competitionLabel,
          date: current.date,
          venue: current.venue,
          summary: current.summary,
          verdict: current.verdict,
          aiIntro: current.aiIntro
        }
      })
    });

    if (!response.ok) {
      throw new Error("서버 응답 오류: " + response.status);
    }

    const data = await response.json();

    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();

    addMessage(data.answer, "ai");
  } catch (err) {
    console.error(err);
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    addMessage("죄송합니다. AI 응답을 가져오는 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.", "ai");
  }
}
  function searchCompetitions(query) {
    const q = normalizeQuery(query);
    if (!q) return [];

    const exact = [];
    const prefix = [];

    competitionIndex.forEach((comp) => {
      const fields = [comp.officialName, comp.koreanName, ...comp.aliases].filter(Boolean);
      let isExact = false;
      let isPrefix = false;

      if (comp.tag.toLowerCase() === q) isExact = true;

      fields.forEach((f) => {
        const fl = f.toLowerCase();
        if (fl === q) {
          isExact = true;
        } else {
          const minLen = isKorean(f) ? 2 : 3;
          if (q.length >= minLen && fl.startsWith(q)) isPrefix = true;
        }
      });

      if (isExact) exact.push(comp);
      else if (isPrefix) prefix.push(comp);
    });

    return [...exact, ...prefix]
      .filter((c, idx, arr) => arr.findIndex((x) => x.tag === c.tag) === idx)
      .slice(0, 5);
  }

  function matchLeagueOrCompetitionTags(keyword) {
    return searchCompetitions(keyword).map((c) => c.tag);
  }

  function getFilteredCases() {
    return Object.entries(caseData).filter(([caseId, item]) => {
      const keyword = searchKeyword.trim().toLowerCase();
      const filterTags = getFilterTags(item);
      const nonYearTags = filterTags.filter((tag) => tag !== item.year);

      const searchBase = [
        caseId,
        item.number,
        item.title,
        item.competitionLabel,
        item.date,
        item.venue,
        item.summary,
        item.verdict,
        ...nonYearTags
      ]
        .join(" ")
        .toLowerCase();

      const matchedMetaTags = keyword ? matchLeagueOrCompetitionTags(keyword) : [];
      const matchesMeta = matchedMetaTags.some((tag) => filterTags.includes(tag));

      const matchesExactYear = !!(keyword && item.year && keyword === item.year);

      const matchesSearch = !keyword || searchBase.includes(keyword) || matchesMeta || matchesExactYear;

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => filterTags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }

  function groupCasesByCategory(filteredCases) {
    return filteredCases.reduce((acc, [caseId, item]) => {
      const cats = getCaseCategories(item);
      cats.forEach((category) => {
        if (!acc[category]) acc[category] = [];
        acc[category].push([caseId, item]);
      });
      return acc;
    }, {});
  }

  function renderTagState() {
    if (!tagFilterList) return;

    tagFilterList.querySelectorAll(".tag-chip").forEach((chip) => {
      const tag = chip.dataset.tag;
      chip.classList.toggle("is-active", activeTags.includes(tag));
    });
  }

  function renderActiveFilters() {
    if (!activeFilterBar) return;

    if (!searchKeyword && activeTags.length === 0) {
      activeFilterBar.innerHTML = "";
      return;
    }

    const keywordHtml = searchKeyword
      ? `<span class="active-keyword">검색어: "${searchKeyword}"</span>`
      : "";

    const tagsHtml = activeTags
      .map(
        (tag) =>
          `<button class="active-filter-chip" data-remove-tag="${tag}" type="button">#${tag} ×</button>`
      )
      .join("");

    activeFilterBar.innerHTML = `
      ${keywordHtml}
      ${tagsHtml}
      <button class="clear-filters-btn" id="clearFiltersBtn" type="button">필터 초기화</button>
    `;

    const clearBtn = document.getElementById("clearFiltersBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        activeTags = [];
        searchKeyword = "";
        if (caseSearchInput) caseSearchInput.value = "";
        renderTagState();
        renderCaseList();
      });
    }

    activeFilterBar.querySelectorAll("[data-remove-tag]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tag = btn.dataset.removeTag;
        activeTags = activeTags.filter((item) => item !== tag);
        renderTagState();
        renderCaseList();
      });
    });
  }

  function renderCaseList() {
    if (!caseListContainer) return;

    const filteredCases = getFilteredCases();
    const grouped = groupCasesByCategory(filteredCases);
    const categories = Object.keys(grouped);

    if (categories.length === 0) {
      caseListContainer.innerHTML = `
        <div class="empty-case-result">
          조건에 맞는 사례가 없습니다.
        </div>
      `;
      renderActiveFilters();
      return;
    }

    caseListContainer.innerHTML = categories
      .map((category) => {
        const items = grouped[category];

        return `
          <div class="case-group">
            <button class="group-btn" type="button">
              <span class="group-label">${categoryLabels[category] || category}</span>
              <span class="group-count">${items.length}</span>
              <span class="group-arrow" aria-hidden="true">▾</span>
            </button>
            <div class="group-items">
              ${items
                .map(([caseId, item]) => {
                  return `
                    <button
                      class="case-link ${caseId === currentCaseId ? "is-active" : ""}"
                      type="button"
                      data-case-id="${caseId}"
                    >
                      <span class="case-link-title">${caseId}</span>
                      <span class="case-link-tags">
                        ${renderAllTagsHtml(item)}
                      </span>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    caseListContainer.querySelectorAll(".group-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.closest(".case-group");
        if (!group) return;
        group.classList.toggle("open");
      });
    });

    caseListContainer.querySelectorAll(".case-link[data-case-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const caseId = button.dataset.caseId;
        if (!caseId) return;
        renderCase(caseId);
        renderCaseList();
      });
    });

    renderActiveFilters();
  }

  function searchTeams(query) {
    const q = normalizeQuery(query);
    if (!q) return [];

    const exact = [];
    const prefix = [];

    TEAM_INDEX.forEach((team) => {
            const fields = [team.koreanName, team.officialName, team.abbreviation, ...(team.tokens || [])]
        .filter(Boolean)
        .map((v) => String(v).toLowerCase());

      if (fields.includes(q)) {
        exact.push(team);
      } else if (fields.some((v) => v.startsWith(q))) {
        prefix.push(team);
      }
    });

    return [...exact, ...prefix]
      .filter((team, idx, arr) => arr.findIndex((t) => t.tag === team.tag) === idx)
      .slice(0, 8);
  }

  function renderTeamSuggestions(query) {
    if (!teamSuggestionBox) return;

    const teamResults = searchTeams(query);
    const compResults = searchCompetitions(query);

    if (!query.trim() || (teamResults.length === 0 && compResults.length === 0)) {
      teamSuggestionBox.innerHTML = "";
      teamSuggestionBox.style.display = "none";
      return;
    }

    const compHtml = compResults
      .map((comp) => {
        const meta = COMPETITION_META[comp.tag] || { bg: "#555", text: "#fff" };
        return `
          <button class="team-suggestion-item" type="button" data-tag="${comp.tag}" title="${comp.officialName}">
            <div class="suggestion-text">
              <div class="team-suggestion-name">${comp.officialName}</div>
              <div class="team-suggestion-kor">${comp.koreanName}</div>
            </div>
            <span class="team-suggestion-meta">
              <span class="competition-badge" style="background:${meta.bg};color:${meta.text}">${comp.tag}</span>
            </span>
          </button>
        `;
      })
      .join("");

    const teamHtml = teamResults
      .map((team) => {
        let meta;
        if (team.league === "WC" && team.confederation) {
          meta = CONFEDERATION_META[team.confederation] || { label: team.confederation, bg: "#555", text: "#fff" };
        } else {
          meta = LEAGUE_META[team.league] || { label: team.league, bg: "#555", text: "#fff" };
        }
        return `
          <button class="team-suggestion-item" type="button" data-tag="${team.tag}" title="${meta.label}">
            <div class="suggestion-text">
              <div class="team-suggestion-name">${team.officialName}</div>
              <div class="team-suggestion-kor">${team.koreanName}</div>
            </div>
            <span class="team-suggestion-meta">
              <span class="league-badge" style="background:${meta.bg};color:${meta.text}">${team.abbreviation}</span>
            </span>
          </button>
        `;
      })
      .join("");

    teamSuggestionBox.innerHTML = compHtml + teamHtml;
    teamSuggestionBox.style.display = "block";

    teamSuggestionBox.querySelectorAll(".team-suggestion-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tag = btn.dataset.tag;
        if (tag && !activeTags.includes(tag)) {
          activeTags.push(tag);
        }
        teamSuggestionBox.style.display = "none";
        if (caseSearchInput) caseSearchInput.value = "";
        searchKeyword = "";
        renderTagState();
        renderCaseList();
      });
    });
  }

  if (caseSearchInput) {
    caseSearchInput.addEventListener("input", (e) => {
      const val = e.target.value || "";
      searchKeyword = val;
      renderCaseList();
      renderTeamSuggestions(val);
    });

    caseSearchInput.addEventListener("focus", (e) => {
      if (e.target.value) renderTeamSuggestions(e.target.value);
    });
  }

  document.addEventListener("click", (e) => {
    if (
      teamSuggestionBox &&
      !teamSuggestionBox.contains(e.target) &&
      e.target !== caseSearchInput
    ) {
      teamSuggestionBox.style.display = "none";
    }
  });

  if (tagFilterList) {
    tagFilterList.addEventListener("click", (e) => {
      const chip = e.target.closest(".tag-chip");
      if (!chip) return;

      const tag = chip.dataset.tag;
      if (!tag) return;

      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter((item) => item !== tag);
      } else {
        activeTags.push(tag);
      }

      renderTagState();
      renderCaseList();
    });
  }

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sendQuestion(button.textContent.trim());
    });
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      sendQuestion(text);
      chatInput.value = "";
      chatInput.focus();
    });
  }

  renderCaseList();
  renderCase(currentCaseId);
});
