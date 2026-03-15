// ===== SAMPLE QUESTIONS FOR ALL ROUNDS =====
const SAMPLE_QUESTIONS = {
  round1: [
    {
      id: "r1q1", text: "Which international organization was established by the Treaty of Washington in 1949?",
      options: ["United Nations", "NATO", "European Union", "ASEAN"], answer: 1, points: 10
    },
    {
      id: "r1q2", text: "The Siachen Glacier, the world's highest battlefield, is located in which mountain range?",
      options: ["Himalayas", "Karakoram", "Hindu Kush", "Pamir"], answer: 1, points: 10
    },
    {
      id: "r1q3", text: "Which Article of the Indian Constitution deals with the imposition of President's Rule?",
      options: ["Article 352", "Article 356", "Article 360", "Article 370"], answer: 1, points: 10
    },
    {
      id: "r1q4", text: "The INS Vikrant, India's first indigenous aircraft carrier, was commissioned in which year?",
      options: ["2020", "2021", "2022", "2023"], answer: 2, points: 10
    },
    {
      id: "r1q5", text: "Which defense exercise is conducted jointly by India and the United States?",
      options: ["Malabar", "Yudh Abhyas", "Garuda Shakti", "SIMBEX"], answer: 1, points: 10
    },
    {
      id: "r1q6", text: "The Agni-V missile has an approximate range of:",
      options: ["2000 km", "3500 km", "5000 km", "8000 km"], answer: 2, points: 10
    },
    {
      id: "r1q7", text: "Which country shares the longest land border with India?",
      options: ["China", "Pakistan", "Bangladesh", "Nepal"], answer: 2, points: 10
    },
    {
      id: "r1q8", text: "The BrahMos missile is a joint venture between India and which country?",
      options: ["France", "Israel", "Russia", "USA"], answer: 2, points: 10
    },
    {
      id: "r1q9", text: "Which Indian state has the maximum number of international borders?",
      options: ["Jammu & Kashmir", "West Bengal", "Arunachal Pradesh", "Sikkim"], answer: 0, points: 10
    },
    {
      id: "r1q10", text: "The Kargil War took place in which year?",
      options: ["1971", "1995", "1999", "2001"], answer: 2, points: 10
    }
  ],
  round2: {
    history: [
      { id: "r2h10", category: "History", points: 10, text: "In which year did India conduct its first nuclear test (Smiling Buddha)?", options: ["1971", "1974", "1980", "1998"], answer: 1 },
      { id: "r2h20", category: "History", points: 20, text: "Who was the Commander-in-Chief of Indian Army during the 1971 war?", options: ["Sam Manekshaw", "K.M. Cariappa", "Arjan Singh", "J.N. Chaudhuri"], answer: 0 },
      { id: "r2h30", category: "History", points: 30, text: "The Battle of Longewala (1971) was fought in which Indian state?", options: ["Punjab", "Rajasthan", "Gujarat", "Jammu & Kashmir"], answer: 1 },
      { id: "r2h40", category: "History", points: 40, text: "Which was the first war in which Indian Air Force was used in combat operations?", options: ["Indo-Pak 1947", "Hyderabad 1948", "Sino-Indian 1962", "Indo-Pak 1965"], answer: 0 }
    ],
    geography: [
      { id: "r2g10", category: "Geography", points: 10, text: "The Palk Strait separates India from which country?", options: ["Sri Lanka", "Maldives", "Myanmar", "Indonesia"], answer: 0 },
      { id: "r2g20", category: "Geography", points: 20, text: "Which Indian island territory is closest to Indonesia?", options: ["Lakshadweep", "Andaman & Nicobar", "Diu", "Minicoy"], answer: 1 },
      { id: "r2g30", category: "Geography", points: 30, text: "The Siliguri Corridor (Chicken's Neck) connects mainland India to which region?", options: ["Kashmir", "Northeast India", "Kutch", "Ladakh"], answer: 1 },
      { id: "r2g40", category: "Geography", points: 40, text: "Which mountain pass connects Leh to Srinagar?", options: ["Khardung La", "Rohtang Pass", "Zoji La", "Nathu La"], answer: 2 }
    ],
    polity: [
      { id: "r2p10", category: "Polity", points: 10, text: "Who is the Supreme Commander of Indian Armed Forces?", options: ["Prime Minister", "President", "Defence Minister", "Chief of Defence Staff"], answer: 1 },
      { id: "r2p20", category: "Polity", points: 20, text: "Under which schedule of the Constitution are the subjects of Union, State, and Concurrent lists?", options: ["5th Schedule", "6th Schedule", "7th Schedule", "8th Schedule"], answer: 2 },
      { id: "r2p30", category: "Polity", points: 30, text: "The National Security Council of India is chaired by:", options: ["President", "Prime Minister", "Defence Minister", "NSA"], answer: 1 },
      { id: "r2p40", category: "Polity", points: 40, text: "Which Constitutional Amendment lowered the voting age from 21 to 18?", options: ["42nd", "44th", "61st", "73rd"], answer: 2 }
    ],
    ir: [
      { id: "r2i10", category: "IR", points: 10, text: "India is a member of which of these groups?", options: ["G7", "BRICS", "NATO", "AUKUS"], answer: 1 },
      { id: "r2i20", category: "IR", points: 20, text: "The Simla Agreement was signed between India and Pakistan in which year?", options: ["1966", "1971", "1972", "1975"], answer: 2 },
      { id: "r2i30", category: "IR", points: 30, text: "Which organization's headquarters is in Kathmandu, Nepal?", options: ["SAARC", "BIMSTEC", "SCO", "ASEAN"], answer: 0 },
      { id: "r2i40", category: "IR", points: 40, text: "The Indus Waters Treaty is between India and Pakistan, mediated by:", options: ["United Nations", "World Bank", "ICJ", "USA"], answer: 1 }
    ]
  },
  round3: [
    {
      id: "r3q1", category: "Defence", text: "Which Indian Air Force aircraft is known as the 'Balakot striker'?",
      options: ["Rafale", "Mirage 2000", "Su-30MKI", "Tejas"], answer: 1
    },
    {
      id: "r3q2", category: "Strategy", text: "India's 'No First Use' policy relates to which domain?",
      options: ["Chemical weapons", "Nuclear weapons", "Cyber warfare", "Biological weapons"], answer: 1
    },
    {
      id: "r3q3", category: "Defence", text: "Which is the highest gallantry award in India during peacetime?",
      options: ["Param Vir Chakra", "Ashoka Chakra", "Maha Vir Chakra", "Kirti Chakra"], answer: 1
    },
    {
      id: "r3q4", category: "Strategy", text: "The Line of Actual Control (LAC) is the border between India and which country?",
      options: ["Pakistan", "China", "Myanmar", "Nepal"], answer: 1
    },
    {
      id: "r3q5", category: "Defence", text: "DRDO stands for:",
      options: ["Defence Research Department Organisation", "Defence Research and Development Organisation", "Defence Resource and Development Office", "Department of Research and Defence Operations"], answer: 1
    },
    {
      id: "r3q6", category: "Strategy", text: "Operation Vijay is associated with which conflict?",
      options: ["1965 War", "1971 War", "Kargil War", "Goa Liberation"], answer: 2
    }
  ],
  round4: [
    {
      id: "r4q1", text: "What is the motto of the Indian Army?",
      options: ["Jai Hind", "Service Before Self", "Satyameva Jayate", "Seva Paramo Dharma"], answer: 1
    },
    {
      id: "r4q2", text: "Which is the largest paramilitary force in the world?",
      options: ["BSF", "CRPF", "ITBP", "NSG"], answer: 1
    },
    {
      id: "r4q3", text: "Who was the first Field Marshal of India?",
      options: ["K.M. Cariappa", "Sam Manekshaw", "Arjan Singh", "Kodandera Subayya Thimayya"], answer: 1
    },
    {
      id: "r4q4", text: "INS Arihant is India's first:",
      options: ["Aircraft carrier", "Nuclear submarine", "Destroyer", "Stealth frigate"], answer: 1
    },
    {
      id: "r4q5", text: "The surgical strike of 2016 was conducted across the:",
      options: ["LAC", "LoC", "International Border", "McMahon Line"], answer: 1
    },
    {
      id: "r4q6", text: "Which Indian missile is known as the 'Fire and Forget' missile?",
      options: ["Nag", "Trishul", "Akash", "Prithvi"], answer: 0
    },
    {
      id: "r4q7", text: "The Andaman and Nicobar Command is India's only:",
      options: ["Naval Command", "Air Command", "Tri-service Command", "Army Command"], answer: 2
    },
    {
      id: "r4q8", text: "Which country gifted the INS Vikramaditya to India?",
      options: ["USA", "France", "Russia", "UK"], answer: 2
    },
    {
      id: "r4q9", text: "Exercise Pitch Black is conducted by the air force of which country?",
      options: ["USA", "UK", "Australia", "France"], answer: 2
    },
    {
      id: "r4q10", text: "Tejas is a product of which organization?",
      options: ["DRDO", "HAL", "BEL", "ISRO"], answer: 1
    },
    {
      id: "r4q11", text: "The Param Vir Chakra is equivalent to which British military honor?",
      options: ["Distinguished Service Order", "Military Cross", "Victoria Cross", "George Cross"], answer: 2
    },
    {
      id: "r4q12", text: "Which Indian state hosts the Pokhran nuclear test site?",
      options: ["Gujarat", "Rajasthan", "Maharashtra", "Madhya Pradesh"], answer: 1
    },
    {
      id: "r4q13", text: "The CDS (Chief of Defence Staff) post was created in which year?",
      options: ["2018", "2019", "2020", "2021"], answer: 2
    },
    {
      id: "r4q14", text: "What is the codename of India's anti-satellite missile test?",
      options: ["Mission Shakti", "Mission Divya", "Mission Astra", "Mission Vajra"], answer: 0
    },
    {
      id: "r4q15", text: "Which regiment is the oldest in the Indian Army?",
      options: ["Madras Regiment", "Punjab Regiment", "Gorkha Rifles", "Rajputana Rifles"], answer: 0
    },
    {
      id: "r4q16", text: "The Indian Coast Guard was established in:",
      options: ["1974", "1978", "1982", "1986"], answer: 1
    },
    {
      id: "r4q17", text: "Which operation evacuated Indians from Yemen in 2015?",
      options: ["Op Sankat Mochan", "Op Rahat", "Op Maitri", "Op Madad"], answer: 1
    },
    {
      id: "r4q18", text: "India's first Chief of Defence Staff was:",
      options: ["Gen. M.M. Naravane", "Gen. Bipin Rawat", "Gen. Dalbir Singh", "Gen. Anil Chauhan"], answer: 1
    },
    {
      id: "r4q19", text: "Which helicopter is manufactured by HAL for the Indian military?",
      options: ["Apache", "Chinook", "Dhruv", "Kamov"], answer: 2
    },
    {
      id: "r4q20", text: "The Indian Navy Day is celebrated on:",
      options: ["October 8", "November 19", "December 4", "January 15"], answer: 2
    },
    {
      id: "r4q21", text: "Which strait is critical for Indian Ocean trade and security?",
      options: ["Strait of Hormuz", "Strait of Malacca", "Both A and B", "Strait of Dover"], answer: 2
    },
    {
      id: "r4q22", text: "Project 75I deals with the construction of:",
      options: ["Aircraft carriers", "Submarines", "Frigates", "Corvettes"], answer: 1
    },
    {
      id: "r4q23", text: "MARCOS is a special force of which service?",
      options: ["Indian Army", "Indian Navy", "Indian Air Force", "NSG"], answer: 1
    },
    {
      id: "r4q24", text: "Which country is NOT a member of the Quad?",
      options: ["India", "Australia", "UK", "Japan"], answer: 2
    },
    {
      id: "r4q25", text: "The Rafale fighter jets were acquired from which country?",
      options: ["USA", "Russia", "France", "Sweden"], answer: 2
    },
    {
      id: "r4q26", text: "The S-400 missile defense system was purchased from:",
      options: ["Israel", "USA", "Russia", "France"], answer: 2
    },
    {
      id: "r4q27", text: "Which amendment to the Army Act introduced the concept of Cantonment Boards?",
      options: ["1924 Act", "1950 Act", "Cantonments Act 2006", "1962 Amendment"], answer: 2
    },
    {
      id: "r4q28", text: "The National War Memorial is located in:",
      options: ["Mumbai", "Pune", "New Delhi", "Dehradun"], answer: 2
    },
    {
      id: "r4q29", text: "Nirbhay is India's:",
      options: ["Ballistic missile", "Cruise missile", "Anti-ship missile", "Air defense system"], answer: 1
    },
    {
      id: "r4q30", text: "Which is India's primary battle tank?",
      options: ["T-90 Bhishma", "Arjun Mk2", "Both in service", "Leopard 2A"], answer: 2
    }
  ],
  tiebreaker: [
    {
      id: "tbq1", text: "In which year was the Indian National Defence University proposal first announced?",
      options: ["2010", "2013", "2008", "2015"], answer: 1
    }
  ]
};
