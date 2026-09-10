// team-index.js
// 팀 태그 = 약어 + 리그 anchor (예: BRE-PL, BRE-SA, BRE-L1) → 약어 충돌 방지
// 리그 색상은 팀의 "소속 리그"를 시각적으로 표시
// 대회 태그(competitionMeta)는 별도 축: 이 사례가 실제로 열린 대회
// 대륙연맹 색상(confederationMeta)은 WC 국가 태그에만 적용되는 별도 축

const leagueMeta = {
  PL: { label: "Premier League", bg: "#3D195B", text: "#FFFFFF" },
  LL: { label: "La Liga", bg: "#FF4B44", text: "#1A0000" },
  SA: { label: "Serie A", bg: "#024494", text: "#FFFFFF" },
  BL: { label: "Bundesliga", bg: "#D3010C", text: "#FFFFFF" },
  L1: { label: "Ligue 1", bg: "#12233F", text: "#FFFFFF" },
  WC: { label: "World Cup", bg: "#0A4F90", text: "#FFFFFF" }
};

const competitionMeta = {
  PL: { label: "Premier League", bg: "#3D195B", text: "#FFFFFF" },
  LL: { label: "La Liga", bg: "#FF4B44", text: "#1A0000" },
  SA: { label: "Serie A", bg: "#024494", text: "#FFFFFF" },
  BL: { label: "Bundesliga", bg: "#D3010C", text: "#FFFFFF" },
  L1: { label: "Ligue 1", bg: "#12233F", text: "#FFFFFF" },
  WC: { label: "FIFA World Cup", bg: "#0A4F90", text: "#FFFFFF" },
  UCL: { label: "UEFA Champions League", bg: "#57218F", text: "#FFFFFF" },
  UEL: { label: "UEFA Europa League", bg: "#F18800", text: "#1A0F00" },
  UECL: { label: "UEFA Europa Conference League", bg: "#00A651", text: "#FFFFFF" }
};

// 대륙별 축구 연맹 색상: WC 국가 태그에만 적용 (리그 소속이 없는 국가대표팀 구분용)
const confederationMeta = {
  AFC:      { label: "AFC (아시아)",      bg: "#C8102E", text: "#FFFFFF" },
  CAF:      { label: "CAF (아프리카)",    bg: "#006B3F", text: "#FFFFFF" },
  CONCACAF: { label: "CONCACAF (북중미)", bg: "#003DA5", text: "#FFFFFF" },
  CONMEBOL: { label: "CONMEBOL (남미)",   bg: "#1A3E72", text: "#FFFFFF" },
  OFC:      { label: "OFC (오세아니아)",  bg: "#00A9E0", text: "#1A0000" },
  UEFA:     { label: "UEFA (유럽)",       bg: "#00088E", text: "#FFFFFF" }
};

// 팀/국가 검색 인덱스 원본 데이터 (207개: 5대리그 149 + 월드컵 58)
const teamIndexRaw = [
{ tag: "BOU-PL", officialName: "AFC Bournemouth", abbreviation: "BOU", koreanName: "AFC 본머스", league: "PL", aliases: ["본머스"] },
{ tag: "ARS-PL", officialName: "Arsenal FC", abbreviation: "ARS", koreanName: "아스날", league: "PL", aliases: ["아스널"] },
{ tag: "AVL-PL", officialName: "Aston Villa FC", abbreviation: "AVL", koreanName: "애스턴 빌라", league: "PL", aliases: ["아스톤 빌라", "AV"] },
{ tag: "BRE-PL", officialName: "Brentford FC", abbreviation: "BRE", koreanName: "브렌트퍼드", league: "PL", aliases: ["브랜트포드", "브렌트포드"] },
{ tag: "BHA-PL", officialName: "Brighton & Hove Albion", abbreviation: "BHA", koreanName: "브라이턴 앤 호브 앨비언", league: "PL", aliases: ["브라이튼 앤 호브 알비온", "브라이튼 앤 호브 앨비온"] },
{ tag: "BUR-PL", officialName: "Burnley FC", abbreviation: "BUR", koreanName: "번리", league: "PL", aliases: [] },
{ tag: "CAR-PL", officialName: "Cardiff City", abbreviation: "CAR", koreanName: "카디프 시티", league: "PL", aliases: [] },
{ tag: "CHE-PL", officialName: "Chelsea FC", abbreviation: "CHE", koreanName: "첼시", league: "PL", aliases: [] },
{ tag: "CRY-PL", officialName: "Crystal Palace", abbreviation: "CRY", koreanName: "크리스털 팰리스", league: "PL", aliases: ["크리스탈 팰리스"] },
{ tag: "EVE-PL", officialName: "Everton FC", abbreviation: "EVE", koreanName: "에버턴", league: "PL", aliases: ["에버튼", "애버튼"] },
{ tag: "FUL-PL", officialName: "Fulham FC", abbreviation: "FUL", koreanName: "풀럼", league: "PL", aliases: [] },
{ tag: "HUD-PL", officialName: "Huddersfield Town", abbreviation: "HUD", koreanName: "허더즈필드 타운", league: "PL", aliases: ["허더스필드 타운"] },
{ tag: "IPS-PL", officialName: "Ipswich Town", abbreviation: "IPS", koreanName: "입스위치 타운", league: "PL", aliases: [] },
{ tag: "LEE-PL", officialName: "Leeds United", abbreviation: "LEE", koreanName: "리즈 유나이티드", league: "PL", aliases: ["리즈"] },
{ tag: "LEI-PL", officialName: "Leicester City", abbreviation: "LEI", koreanName: "레스터 시티", league: "PL", aliases: [] },
{ tag: "LIV-PL", officialName: "Liverpool FC", abbreviation: "LIV", koreanName: "리버풀", league: "PL", aliases: [] },
{ tag: "LUT-PL", officialName: "Luton Town", abbreviation: "LUT", koreanName: "루턴 타운", league: "PL", aliases: ["루튼 타운"] },
{ tag: "MCI-PL", officialName: "Manchester City", abbreviation: "MCI", koreanName: "맨체스터 시티", league: "PL", aliases: ["맨시티"] },
{ tag: "MUN-PL", officialName: "Manchester United", abbreviation: "MUN", koreanName: "맨체스터 유나이티드", league: "PL", aliases: ["맨유"] },
{ tag: "NEW-PL", officialName: "Newcastle United", abbreviation: "NEW", koreanName: "뉴캐슬 유나이티드", league: "PL", aliases: [] },
{ tag: "NOR-PL", officialName: "Norwich City", abbreviation: "NOR", koreanName: "노리치 시티", league: "PL", aliases: [] },
{ tag: "NFO-PL", officialName: "Nottingham Forest", abbreviation: "NFO", koreanName: "노팅엄 포리스트", league: "PL", aliases: [] },
{ tag: "SHU-PL", officialName: "Sheffield United", abbreviation: "SHU", koreanName: "셰필드 유나이티드", league: "PL", aliases: [] },
{ tag: "SOU-PL", officialName: "Southampton FC", abbreviation: "SOU", koreanName: "사우샘프턴", league: "PL", aliases: ["사우스햄튼", "소튼"] },
{ tag: "SUN-PL", officialName: "Sunderland AFC", abbreviation: "SUN", koreanName: "선덜랜드", league: "PL", aliases: [] },
{ tag: "TOT-PL", officialName: "Tottenham Hotspur", abbreviation: "TOT", koreanName: "토트넘 홋스퍼", league: "PL", aliases: [] },
{ tag: "WAT-PL", officialName: "Watford FC", abbreviation: "WAT", koreanName: "왓퍼드", league: "PL", aliases: ["왓포드"] },
{ tag: "WBA-PL", officialName: "West Bromwich Albion", abbreviation: "WBA", koreanName: "웨스트 브로미치 앨비언", league: "PL", aliases: ["웨스트브롬"] },
{ tag: "WHU-PL", officialName: "West Ham United", abbreviation: "WHU", koreanName: "웨스트햄 유나이티드", league: "PL", aliases: [] },
{ tag: "WOL-PL", officialName: "Wolverhampton Wanderers", abbreviation: "WOL", koreanName: "울버햄프턴 원더러스", league: "PL", aliases: [] },
{ tag: "ALA-LL", officialName: "Alavés", abbreviation: "ALA", koreanName: "알라베스", league: "LL", aliases: [] },
{ tag: "ALM-LL", officialName: "Almería", abbreviation: "ALM", koreanName: "알메리아", league: "LL", aliases: [] },
{ tag: "ATH-LL", officialName: "Athletic Club", abbreviation: "ATH", koreanName: "아틀레틱 클루브", league: "LL", aliases: ["빌바오"] },
{ tag: "ATM-LL", officialName: "Atlético de Madrid", abbreviation: "ATM", koreanName: "아틀레티코 마드리드", league: "LL", aliases: ["알레띠", "꼬마 "] },
{ tag: "BAR-LL", officialName: "FC Barcelona", abbreviation: "BAR", koreanName: "바르셀로나", league: "LL", aliases: ["바르샤"] },
{ tag: "CEL-LL", officialName: "Celta Vigo", abbreviation: "CEL", koreanName: "셀타 비고", league: "LL", aliases: [] },
{ tag: "CAD-LL", officialName: "Cádiz", abbreviation: "CAD", koreanName: "카디스", league: "LL", aliases: [] },
{ tag: "EIB-LL", officialName: "Eibar", abbreviation: "EIB", koreanName: "에이바르", league: "LL", aliases: [] },
{ tag: "ELC-LL", officialName: "Elche", abbreviation: "ELC", koreanName: "엘체", league: "LL", aliases: [] },
{ tag: "ESP-LL", officialName: "Espanyol", abbreviation: "ESP", koreanName: "에스파뇰", league: "LL", aliases: [] },
{ tag: "GET-LL", officialName: "Getafe CF", abbreviation: "GET", koreanName: "헤타페", league: "LL", aliases: [] },
{ tag: "GIR-LL", officialName: "Girona FC", abbreviation: "GIR", koreanName: "지로나", league: "LL", aliases: [] },
{ tag: "GRA-LL", officialName: "Granada CF", abbreviation: "GRA", koreanName: "그라나다", league: "LL", aliases: [] },
{ tag: "HUE-LL", officialName: "Huesca", abbreviation: "HUE", koreanName: "우에스카", league: "LL", aliases: [] },
{ tag: "LPA-LL", officialName: "Las Palmas", abbreviation: "LPA", koreanName: "라스팔마스", league: "LL", aliases: [] },
{ tag: "LEG-LL", officialName: "CD Leganés", abbreviation: "LEG", koreanName: "레가네스", league: "LL", aliases: [] },
{ tag: "LEV-LL", officialName: "Levante", abbreviation: "LEV", koreanName: "레반테", league: "LL", aliases: [] },
{ tag: "MLL-LL", officialName: "RCD Mallorca", abbreviation: "MLL", koreanName: "마요르카", league: "LL", aliases: [] },
{ tag: "OSA-LL", officialName: "CA Osasuna", abbreviation: "OSA", koreanName: "오사수나", league: "LL", aliases: [] },
{ tag: "OVI-LL", officialName: "Real Oviedo", abbreviation: "OVI", koreanName: "오비에도", league: "LL", aliases: [] },
{ tag: "RAY-LL", officialName: "Rayo Vallecano", abbreviation: "RAY", koreanName: "라요 바예카노", league: "LL", aliases: [] },
{ tag: "BET-LL", officialName: "Real Betis", abbreviation: "BET", koreanName: "레알 베티스", league: "LL", aliases: [] },
{ tag: "RMA-LL", officialName: "Real Madrid", abbreviation: "RMA", koreanName: "레알 마드리드", league: "LL", aliases: [] },
{ tag: "RSO-LL", officialName: "Real Sociedad", abbreviation: "RSO", koreanName: "레알 소시에다드", league: "LL", aliases: [] },
{ tag: "VLL-LL", officialName: "Real Valladolid", abbreviation: "VLL", koreanName: "레알 바야돌리드", league: "LL", aliases: [] },
{ tag: "SEV-LL", officialName: "Sevilla FC", abbreviation: "SEV", koreanName: "세비야", league: "LL", aliases: [] },
{ tag: "VAL-LL", officialName: "Valencia CF", abbreviation: "VAL", koreanName: "발렌시아", league: "LL", aliases: [] },
{ tag: "VIL-LL", officialName: "Villarreal CF", abbreviation: "VIL", koreanName: "비야레알", league: "LL", aliases: [] },
{ tag: "MIL-SA", officialName: "AC Milan", abbreviation: "MIL", koreanName: "AC 밀란", league: "SA", aliases: [] },
{ tag: "ATA-SA", officialName: "Atalanta BC", abbreviation: "ATA", koreanName: "아탈란타", league: "SA", aliases: [] },
{ tag: "BEN-SA", officialName: "Benevento Calcio", abbreviation: "BEN", koreanName: "베네벤토", league: "SA", aliases: [] },
{ tag: "BOL-SA", officialName: "Bologna FC 1909", abbreviation: "BOL", koreanName: "볼로냐", league: "SA", aliases: [] },
{ tag: "BRE-SA", officialName: "Brescia Calcio", abbreviation: "BRE", koreanName: "브레시아", league: "SA", aliases: [] },
{ tag: "CAG-SA", officialName: "Cagliari Calcio", abbreviation: "CAG", koreanName: "칼리아리", league: "SA", aliases: [] },
{ tag: "CHI-SA", officialName: "Chievo Verona", abbreviation: "CHI", koreanName: "키에보 베로나", league: "SA", aliases: [] },
{ tag: "COM-SA", officialName: "Como 1907", abbreviation: "COM", koreanName: "코모", league: "SA", aliases: [] },
{ tag: "CRE-SA", officialName: "US Cremonese", abbreviation: "CRE", koreanName: "크레모네세", league: "SA", aliases: [] },
{ tag: "CRO-SA", officialName: "FC Crotone", abbreviation: "CRO", koreanName: "크로토네", league: "SA", aliases: [] },
{ tag: "EMP-SA", officialName: "Empoli FC", abbreviation: "EMP", koreanName: "엠폴리", league: "SA", aliases: [] },
{ tag: "FIO-SA", officialName: "ACF Fiorentina", abbreviation: "FIO", koreanName: "피오렌티나", league: "SA", aliases: [] },
{ tag: "FRO-SA", officialName: "Frosinone Calcio", abbreviation: "FRO", koreanName: "프로시노네", league: "SA", aliases: [] },
{ tag: "GEN-SA", officialName: "Genoa CFC", abbreviation: "GEN", koreanName: "제노아", league: "SA", aliases: [] },
{ tag: "VER-SA", officialName: "Hellas Verona", abbreviation: "VER", koreanName: "엘라스 베로나", league: "SA", aliases: ["헬라스 베로나"] },
{ tag: "INT-SA", officialName: "FC Internazionale Milano", abbreviation: "INT", koreanName: "인터 밀란", league: "SA", aliases: [] },
{ tag: "JUV-SA", officialName: "Juventus FC", abbreviation: "JUV", koreanName: "유벤투스", league: "SA", aliases: [] },
{ tag: "LAZ-SA", officialName: "SS Lazio", abbreviation: "LAZ", koreanName: "라치오", league: "SA", aliases: [] },
{ tag: "LEC-SA", officialName: "US Lecce", abbreviation: "LEC", koreanName: "레체", league: "SA", aliases: [] },
{ tag: "MON-SA", officialName: "AC Monza", abbreviation: "MON", koreanName: "몬차", league: "SA", aliases: [] },
{ tag: "NAP-SA", officialName: "SSC Napoli", abbreviation: "NAP", koreanName: "나폴리", league: "SA", aliases: [] },
{ tag: "PAR-SA", officialName: "Parma Calcio 1913", abbreviation: "PAR", koreanName: "파르마", league: "SA", aliases: [] },
{ tag: "PIS-SA", officialName: "Pisa SC", abbreviation: "PIS", koreanName: "피사", league: "SA", aliases: [] },
{ tag: "ROM-SA", officialName: "AS Roma", abbreviation: "ROM", koreanName: "로마", league: "SA", aliases: [] },
{ tag: "SAL-SA", officialName: "US Salernitana 1919", abbreviation: "SAL", koreanName: "살레르니타나", league: "SA", aliases: [] },
{ tag: "SAM-SA", officialName: "UC Sampdoria", abbreviation: "SAM", koreanName: "삼프도리아", league: "SA", aliases: [] },
{ tag: "SAS-SA", officialName: "US Sassuolo Calcio", abbreviation: "SAS", koreanName: "사수올로", league: "SA", aliases: [] },
{ tag: "SPA-SA", officialName: "SPAL", abbreviation: "SPA", koreanName: "SPAL", league: "SA", aliases: [] },
{ tag: "SPE-SA", officialName: "Spezia Calcio", abbreviation: "SPE", koreanName: "스페치아", league: "SA", aliases: [] },
{ tag: "TOR-SA", officialName: "Torino FC", abbreviation: "TOR", koreanName: "토리노", league: "SA", aliases: [] },
{ tag: "UDI-SA", officialName: "Udinese Calcio", abbreviation: "UDI", koreanName: "우디네세", league: "SA", aliases: [] },
{ tag: "VEN-SA", officialName: "Venezia FC", abbreviation: "VEN", koreanName: "베네치아", league: "SA", aliases: [] },
{ tag: "KOE-BL", officialName: "1. FC Köln", abbreviation: "KOE", koreanName: "1. FC 쾰른", league: "BL", aliases: ["쾰른"] },
{ tag: "FCN-BL", officialName: "1. FC Nürnberg", abbreviation: "FCN", koreanName: "1. FC 뉘른베르크", league: "BL", aliases: [] },
{ tag: "DSC-BL", officialName: "DSC Arminia Bielefeld", abbreviation: "DSC", koreanName: "아르미니아 빌레펠트", league: "BL", aliases: ["빌레펠트"] },
{ tag: "B04-BL", officialName: "Bayer Leverkusen", abbreviation: "B04", koreanName: "바이어 레버쿠젠", league: "BL", aliases: [] },
{ tag: "FCB-BL", officialName: "FC Bayern Munich", abbreviation: "FCB", koreanName: "바이에른 뮌헨", league: "BL", aliases: [] },
{ tag: "BVB-BL", officialName: "BV Borussia Dortmund", abbreviation: "BVB", koreanName: "보루시아 도르트문트", league: "BL", aliases: [] },
{ tag: "BMG-BL", officialName: "Borussia Mönchen gladbach", abbreviation: "BMG", koreanName: "보루시아 묀헨글라트바흐", league: "BL", aliases: [] },
{ tag: "D98-BL", officialName: "Darmstadt 98", abbreviation: "D98", koreanName: "다름슈타트 98", league: "BL", aliases: [] },
{ tag: "SGE-BL", officialName: "Eintracht Frankfurt", abbreviation: "SGE", koreanName: "아인트라흐트 프랑크푸르트", league: "BL", aliases: [] },
{ tag: "FCA-BL", officialName: "FC Augsburg", abbreviation: "FCA", koreanName: "FC 아우크스부르크", league: "BL", aliases: [] },
{ tag: "STP-BL", officialName: "FC St. Pauli", abbreviation: "STP", koreanName: "FC 장크트파울리", league: "BL", aliases: [] },
{ tag: "F95-BL", officialName: "Fortuna Düsseldorf 1895", abbreviation: "F95", koreanName: "포르투나 뒤셀도르프", league: "BL", aliases: [] },
{ tag: "SGF-BL", officialName: "SpVgg Greuther Fürth", abbreviation: "SGF", koreanName: "그로이터 퓌르트", league: "BL", aliases: [] },
{ tag: "HSV-BL", officialName: "Hamburger SV", abbreviation: "HSV", koreanName: "함부르거 SV", league: "BL", aliases: [] },
{ tag: "H96-BL", officialName: "Hannover 96", abbreviation: "H96", koreanName: "하노버 96", league: "BL", aliases: [] },
{ tag: "HDH-BL", officialName: "1. FC Heidenheim", abbreviation: "HDH", koreanName: "하이덴하임", league: "BL", aliases: [] },
{ tag: "BSC-BL", officialName: "Hertha BSC", abbreviation: "BSC", koreanName: "헤르타 BSC", league: "BL", aliases: [] },
{ tag: "KSV-BL", officialName: "Holstein Kiel", abbreviation: "KSV", koreanName: "홀슈타인 킬", league: "BL", aliases: [] },
{ tag: "M05-BL", officialName: "1. FSV Mainz 05", abbreviation: "M05", koreanName: "마인츠 05", league: "BL", aliases: [] },
{ tag: "RBL-BL", officialName: "RB Leipzig", abbreviation: "RBL", koreanName: "RB 라이프치히", league: "BL", aliases: [] },
{ tag: "SCF-BL", officialName: "SC Freiburg", abbreviation: "SCF", koreanName: "SC 프라이부르크", league: "BL", aliases: [] },
{ tag: "SCP-BL", officialName: "SC Paderborn", abbreviation: "SCP", koreanName: "SC 파더보른", league: "BL", aliases: [] },
{ tag: "S04-BL", officialName: "FC Schalke 04", abbreviation: "S04", koreanName: "샬케 04", league: "BL", aliases: [] },
{ tag: "TSG-BL", officialName: "TSG Hoffenheim", abbreviation: "TSG", koreanName: "TSG 호펜하임", league: "BL", aliases: [] },
{ tag: "FCU-BL", officialName: "1. FC Union Berlin", abbreviation: "FCU", koreanName: "우니온 베를린", league: "BL", aliases: [] },
{ tag: "VFB-BL", officialName: "VfB Stuttgart", abbreviation: "VFB", koreanName: "VfB 슈투트가르트", league: "BL", aliases: [] },
{ tag: "BOC-BL", officialName: "VfL Bochum", abbreviation: "BOC", koreanName: "VfL 보훔", league: "BL", aliases: [] },
{ tag: "WOB-BL", officialName: "VfL Wolfsburg", abbreviation: "WOB", koreanName: "VfL 볼프스부르크", league: "BL", aliases: [] },
{ tag: "SVW-BL", officialName: "SV Werder Bremen", abbreviation: "SVW", koreanName: "베르더 브레멘", league: "BL", aliases: [] },
{ tag: "AJA-L1", officialName: "AC Ajaccio", abbreviation: "AJA", koreanName: "AC 아작시오", league: "L1", aliases: [] },
{ tag: "AMI-L1", officialName: "Amiens SC", abbreviation: "AMI", koreanName: "아미앵 SC", league: "L1", aliases: [] },
{ tag: "ANG-L1", officialName: "Angers SCO", abbreviation: "ANG", koreanName: "앙제 SCO", league: "L1", aliases: [] },
{ tag: "MON-L1", officialName: "AS Monaco", abbreviation: "MON", koreanName: "AS 모나코", league: "L1", aliases: [] },
{ tag: "STE-L1", officialName: "AS Saint-Étienne", abbreviation: "STE", koreanName: "AS 생테티엔", league: "L1", aliases: [] },
{ tag: "AUX-L1", officialName: "AJ Auxerre", abbreviation: "AUX", koreanName: "오세르", league: "L1", aliases: [] },
{ tag: "BOR-L1", officialName: "FC Girondins de Bordeaux", abbreviation: "BOR", koreanName: "보르도", league: "L1", aliases: [] },
{ tag: "BRE-L1", officialName: "Stade Brestois 29", abbreviation: "BRE", koreanName: "브레스트", league: "L1", aliases: [] },
{ tag: "CAE-L1", officialName: "SM Caen", abbreviation: "CAE", koreanName: "캉", league: "L1", aliases: [] },
{ tag: "CLE-L1", officialName: "Clermont Foot", abbreviation: "CLE", koreanName: "클레르몽 푸트", league: "L1", aliases: [] },
{ tag: "DIJ-L1", officialName: "Dijon FCO", abbreviation: "DIJ", koreanName: "디종", league: "L1", aliases: [] },
{ tag: "GUI-L1", officialName: "EA Guingamp", abbreviation: "GUI", koreanName: "갱강", league: "L1", aliases: [] },
{ tag: "HAV-L1", officialName: "Le Havre AC", abbreviation: "HAV", koreanName: "르아브르", league: "L1", aliases: [] },
{ tag: "RCL-L1", officialName: "RC Lens", abbreviation: "RCL", koreanName: "랑스", league: "L1", aliases: [] },
{ tag: "LIL-L1", officialName: "LOSC Lille", abbreviation: "LIL", koreanName: "릴", league: "L1", aliases: [] },
{ tag: "LOR-L1", officialName: "FC Lorient", abbreviation: "LOR", koreanName: "로리앙", league: "L1", aliases: [] },
{ tag: "LYO-L1", officialName: "Olympique Lyonnais", abbreviation: "LYO", koreanName: "리옹", league: "L1", aliases: [] },
{ tag: "MAR-L1", officialName: "Olympique de Marseille", abbreviation: "MAR", koreanName: "마르세유", league: "L1", aliases: [] },
{ tag: "MET-L1", officialName: "FC Metz", abbreviation: "MET", koreanName: "메스", league: "L1", aliases: [] },
{ tag: "MONP-L1", officialName: "Montpellier HSC", abbreviation: "MONP", koreanName: "몽펠리에", league: "L1", aliases: [] },
{ tag: "NAN-L1", officialName: "FC Nantes", abbreviation: "NAN", koreanName: "낭트", league: "L1", aliases: [] },
{ tag: "NIC-L1", officialName: "OGC Nice", abbreviation: "NIC", koreanName: "니스", league: "L1", aliases: [] },
{ tag: "NIM-L1", officialName: "Nîmes Olympique", abbreviation: "NIM", koreanName: "님 올랭피크", league: "L1", aliases: [] },
{ tag: "PFC-L1", officialName: "Paris FC", abbreviation: "PFC", koreanName: "파리 FC", league: "L1", aliases: [] },
{ tag: "PSG-L1", officialName: "Paris Saint-Germain", abbreviation: "PSG", koreanName: "파리 생제르맹", league: "L1", aliases: [] },
{ tag: "REI-L1", officialName: "Stade de Reims", abbreviation: "REI", koreanName: "랭스", league: "L1", aliases: [] },
{ tag: "REN-L1", officialName: "Stade Rennais FC", abbreviation: "REN", koreanName: "렌", league: "L1", aliases: [] },
{ tag: "STR-L1", officialName: "RC Strasbourg Alsace", abbreviation: "STR", koreanName: "스트라스부르", league: "L1", aliases: [] },
{ tag: "TOU-L1", officialName: "Toulouse FC", abbreviation: "TOU", koreanName: "툴루즈", league: "L1", aliases: [] },
{ tag: "TRO-L1", officialName: "ES Troyes AC", abbreviation: "TRO", koreanName: "트루아", league: "L1", aliases: [] },
{ tag: "ALG-WC", officialName: "Algeria", abbreviation: "ALG", koreanName: "알제리", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "ARG-WC", officialName: "Argentina", abbreviation: "ARG", koreanName: "아르헨티나", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "AUS-WC", officialName: "Australia", abbreviation: "AUS", koreanName: "호주", league: "WC", confederation: "AFC", aliases: ["오스트레일리아"] },
{ tag: "AUT-WC", officialName: "Austria", abbreviation: "AUT", koreanName: "오스트리아", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "BEL-WC", officialName: "Belgium", abbreviation: "BEL", koreanName: "벨기에", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "BIH-WC", officialName: "Bosnia and Herzegovina", abbreviation: "BIH", koreanName: "보스니아 헤르체고비나", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "BRA-WC", officialName: "Brazil", abbreviation: "BRA", koreanName: "브라질", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "CMR-WC", officialName: "Cameroon", abbreviation: "CMR", koreanName: "카메룬", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "CAN-WC", officialName: "Canada", abbreviation: "CAN", koreanName: "캐나다", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "CPV-WC", officialName: "Cape Verde", abbreviation: "CPV", koreanName: "카보베르데", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "COL-WC", officialName: "Colombia", abbreviation: "COL", koreanName: "콜롬비아", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "COD-WC", officialName: "Congo DR", abbreviation: "COD", koreanName: "콩고 민주공화국", league: "WC", confederation: "CAF", aliases: ["DR 콩고"] },
{ tag: "CRC-WC", officialName: "Costa Rica", abbreviation: "CRC", koreanName: "코스타리카", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "CRO-WC", officialName: "Croatia", abbreviation: "CRO", koreanName: "크로아티아", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "CUW-WC", officialName: "Curaçao", abbreviation: "CUW", koreanName: "퀴라소", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "CZE-WC", officialName: "Czechia", abbreviation: "CZE", koreanName: "체코", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "CIV-WC", officialName: "Côte d'Ivoire", abbreviation: "CIV", koreanName: "코트디부아르", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "DEN-WC", officialName: "Denmark", abbreviation: "DEN", koreanName: "덴마크", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "ECU-WC", officialName: "Ecuador", abbreviation: "ECU", koreanName: "에콰도르", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "EGY-WC", officialName: "Egypt", abbreviation: "EGY", koreanName: "이집트", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "ENG-WC", officialName: "England", abbreviation: "ENG", koreanName: "잉글랜드", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "FRA-WC", officialName: "France", abbreviation: "FRA", koreanName: "프랑스", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "GER-WC", officialName: "Germany", abbreviation: "GER", koreanName: "독일", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "GHA-WC", officialName: "Ghana", abbreviation: "GHA", koreanName: "가나", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "HAI-WC", officialName: "Haiti", abbreviation: "HAI", koreanName: "아이티", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "ISL-WC", officialName: "Iceland", abbreviation: "ISL", koreanName: "아이슬란드", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "IRN-WC", officialName: "Iran", abbreviation: "IRN", koreanName: "이란", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "IRQ-WC", officialName: "Iraq", abbreviation: "IRQ", koreanName: "이라크", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "JPN-WC", officialName: "Japan", abbreviation: "JPN", koreanName: "일본", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "JOR-WC", officialName: "Jordan", abbreviation: "JOR", koreanName: "요르단", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "KOR-WC", officialName: "Korea Republic", abbreviation: "KOR", koreanName: "대한민국", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "MEX-WC", officialName: "Mexico", abbreviation: "MEX", koreanName: "멕시코", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "MAR-WC", officialName: "Morocco", abbreviation: "MAR", koreanName: "모로코", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "NED-WC", officialName: "Netherlands", abbreviation: "NED", koreanName: "네덜란드", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "NZL-WC", officialName: "New Zealand", abbreviation: "NZL", koreanName: "뉴질랜드", league: "WC", confederation: "OFC", aliases: [] },
{ tag: "NGA-WC", officialName: "Nigeria", abbreviation: "NGA", koreanName: "나이지리아", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "NOR-WC", officialName: "Norway", abbreviation: "NOR", koreanName: "노르웨이", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "PAN-WC", officialName: "Panama", abbreviation: "PAN", koreanName: "파나마", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "PAR-WC", officialName: "Paraguay", abbreviation: "PAR", koreanName: "파라과이", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "PER-WC", officialName: "Peru", abbreviation: "PER", koreanName: "페루", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "POL-WC", officialName: "Poland", abbreviation: "POL", koreanName: "폴란드", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "POR-WC", officialName: "Portugal", abbreviation: "POR", koreanName: "포르투갈", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "QAT-WC", officialName: "Qatar", abbreviation: "QAT", koreanName: "카타르", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "RUS-WC", officialName: "Russia", abbreviation: "RUS", koreanName: "러시아", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "KSA-WC", officialName: "Saudi Arabia", abbreviation: "KSA", koreanName: "사우디아라비아", league: "WC", confederation: "AFC", aliases: [] },
{ tag: "SCO-WC", officialName: "Scotland", abbreviation: "SCO", koreanName: "스코틀랜드", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "SEN-WC", officialName: "Senegal", abbreviation: "SEN", koreanName: "세네갈", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "SRB-WC", officialName: "Serbia", abbreviation: "SRB", koreanName: "세르비아", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "RSA-WC", officialName: "South Africa", abbreviation: "RSA", koreanName: "남아프리카 공화국", league: "WC", confederation: "CAF", aliases: ["남아공"] },
{ tag: "ESP-WC", officialName: "Spain", abbreviation: "ESP", koreanName: "스페인", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "SWE-WC", officialName: "Sweden", abbreviation: "SWE", koreanName: "스웨덴", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "SUI-WC", officialName: "Switzerland", abbreviation: "SUI", koreanName: "스위스", league: "WC", confederation: "UEFA", aliases: [] },
{ tag: "TUN-WC", officialName: "Tunisia", abbreviation: "TUN", koreanName: "튀니지", league: "WC", confederation: "CAF", aliases: [] },
{ tag: "TUR-WC", officialName: "Türkiye", abbreviation: "TUR", koreanName: "튀르키예", league: "WC", confederation: "UEFA", aliases: ["터키"] },
{ tag: "USA-WC", officialName: "United States", abbreviation: "USA", koreanName: "미국", league: "WC", confederation: "CONCACAF", aliases: [] },
{ tag: "URU-WC", officialName: "Uruguay", abbreviation: "URU", koreanName: "우루과이", league: "WC", confederation: "CONMEBOL", aliases: [] },
{ tag: "UZB-WC", officialName: "Uzbekistan", abbreviation: "UZB", koreanName: "우즈베키스탄", league: "WC", confederation: "AFC", aliases: ["우즈벡"] },
{ tag: "WAL-WC", officialName: "Wales", abbreviation: "WAL", koreanName: "웨일스", league: "WC", confederation: "UEFA", aliases: [] }
];

function buildTokens(item) {
  const raw = [item.officialName, item.abbreviation, item.koreanName, ...(item.aliases || [])];
  const toks = new Set();
  raw.forEach((n) => {
    if (!n) return;
    const s = String(n).trim();
    if (!s) return;
    toks.add(s);
    toks.add(s.toLowerCase());
    toks.add(s.toLowerCase().replace(/[\s.]/g, ""));
    s.split(/[\s.]+/).forEach((w) => {
      if (w) toks.add(w.toLowerCase());
    });
  });
  return Array.from(toks).filter(Boolean);
}

const teamIndex = teamIndexRaw.map((item) => ({
  ...item,
  tokens: buildTokens(item)
}));

function findTeamTags(query) {
  if (!query) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return teamIndex
    .filter((item) => item.tokens.some((t) => t.toLowerCase() === q || t.toLowerCase().includes(q)))
    .map((item) => item.tag);
}

function findTeamEntries(query) {
  if (!query) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return teamIndex.filter((item) =>
    item.tokens.some((t) => t.toLowerCase() === q || t.toLowerCase().includes(q))
  );
}

// 태그(예: "ARS-PL")에서 리그 코드만 추출 → leagueMeta 색상 조회에 사용
function getLeagueFromTag(tag) {
  if (!tag || typeof tag !== "string") return null;
  const parts = tag.split("-");
  return parts[parts.length - 1];
}

// 태그로 팀 항목을 찾아 confederation 필드 확인 (WC 국가 전용)
function getConfederationFromTag(tag) {
  const entry = teamIndex.find((t) => t.tag === tag);
  return entry && entry.confederation ? entry.confederation : null;
}

// 태그를 색상으로 스타일링할 때 사용
// WC 국가(confederation 있음)는 대륙연맹 색상, 그 외 클럽은 리그 색상
function getTagStyle(tag) {
  const league = getLeagueFromTag(tag);
  if (league === "WC") {
    const conf = getConfederationFromTag(tag);
    const confMeta = conf ? confederationMeta[conf] : null;
    if (confMeta) return { backgroundColor: confMeta.bg, color: confMeta.text };
  }
  const meta = leagueMeta[league];
  return meta
    ? { backgroundColor: meta.bg, color: meta.text }
    : { backgroundColor: "#999999", color: "#FFFFFF" };
}

// 대회 태그(competitionMeta)는 리그 suffix 없이 그대로 키로 쓰임
function getCompetitionStyle(compTag) {
  const meta = competitionMeta[compTag];
  return meta
    ? { backgroundColor: meta.bg, color: meta.text }
    : { backgroundColor: "#999999", color: "#FFFFFF" };
}

if (typeof module !== "undefined") {
  module.exports = {
    teamIndex, leagueMeta, competitionMeta, confederationMeta,
    findTeamTags, findTeamEntries, buildTokens,
    getLeagueFromTag, getConfederationFromTag, getTagStyle, getCompetitionStyle
  };
}