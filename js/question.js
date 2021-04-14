var category = {
    // 10대(청소년)
    "A1MF" : {
        "answerNum": 3,
        "W1" : "수면/스트레스", 
        "W2" : "눈",
        "W3" : "두뇌 활동"
    },
    // 2030(청년)
    "A2MF" : {
        "answerNum": 5,
        "W1" : "수면/스트레스",
        "W2" : "눈",
        "W3" : "피로/간",
        "W4" : "체지방/운동능력",
        "W5" : "피부 관리"
    },
    // 4050(중장년) + 남성
    "A3M" : {
        "answerNum": 4,
        "W1" : "수면/스트레스",
        "W2" : "눈",
        "W3" : "피로/간",
        "W4" : "뼈/관절"
    },
    // 4050(중장년) + 여성
    "A3F" : {
        "answerNum": 5,
        "W1" : "수면/스트레스",
        "W2" : "눈",
        "W3" : "피로/간",
        "W4" : "뼈/관절",
        "W5" : "여성 건강(갱년기)"
    },
    // 60대 이상(노년)
    "A4MF" : {
        "answerNum": 4,
        "W1" : "수면/스트레스",
        "W2" : "눈",
        "W3" : "면역/항산화",
        "W4" : "뼈/관절"
    }
}

var q = {
    1:{
        "title": "<b style='color: #3A5FCB'>선물 받으실 분</b>의 성함을 입력해주세요.",
        "question-type": "name",
        "selectionNum": 0
    },
    2: {
        "title": "<b style='color: #3A5FCB'>선물 받으실 분</b>의 성별을 선택해주세요.",
        "question-type": "sex",
        "selectionNum": 2,
        "A": "남성",
        "B": "여성"
    },
    3: {
        "title": "<b style='color: #3A5FCB'>선물 받으실 분</b>의 연령대를 선택해주세요.",
        "question-type": "age",
        "selectionNum": 4,
        "A": "청소년(10대)",
        "B": "청년(20-30대)",
        "C": "중장년(40-50대)",
        "D": "노년(60대 이상)"
    },
    4: {
        "title": "<b style='color: #3A5FCB'>선물하고자 하는</b> 건강기능식품 카테고리를 선택해주세요.",
        "question-type": "category",
        "selectionNum": "0",
        "A": "선택 1",
        "B": "선택 2",
        "C": "선택 3",
        "D": "선택 4",
        "E": "선택 5"
    },
    5: {
        "title": "원하시는 가격대가 있다면 선택해주세요.",
        "question-type": "price",
        "selectionNum": 3,
        "A": "10만원 미만",
        "B": "10만원 이상",
        "C": "전체"
    }
}