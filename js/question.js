var category = {
    // 10대(청소년)
    "A1MF" : {
        "selectionNum": 3,
        "A" : "수면/스트레스",
        "B" : "눈",
        "C" : "두뇌 활동"
    },
    // 2030(청년)
    "A2MF" : {
        "selectionNum": 5,
        "A" : "수면/스트레스",
        "B" : "눈",
        "C" : "피로/간",
        "D" : "체지방/운동능력",
        "E" : "피부 관리"
    },
    // 4050(중장년) + 남성
    "A3M" : {
        "selectionNum": 4,
        "A" : "수면/스트레스",
        "B" : "눈",
        "C" : "피로/간",
        "D" : "뼈/관절"
    },
    // 4050(중장년) + 여성
    "A3F" : {
        "selectionNum": 4,
        "A" : "수면/스트레스",
        "B" : "눈",
        "C" : "피로/간",
        "D" : "뼈/관절",
        "E" : "여성 건강(갱년기)"
    },
    // 60대 이상(노년)
    "A4MF" : {
        "selectionNum": 4,
        "A" : "수면/스트레스",
        "B" : "눈",
        "C" : "치아/잇몸",
        "D" : "뼈/관절"
    }
}

function recommendCategory(){
    var age = localStorage.getItem("age");
    var sex = localStorage.getItem("sex");
    var category = "";

    if(age == "청소년(10대)"){
        category = "A1MF";
    }
    else if(age == "청년(20-30대)"){
        category = "A2MF";
    }
    else if(age == "중장년(40-50대)"){
        if(sex == "남성"){
            category = "A3M"
        }

        if(sex == "여성"){
            category = "A3F"
        } 
    }
    else {
        category = "A4MF"
    }

    return category
};

function selectionNum(){
    var category = recommendCategory();
    var selectionNum = category["category"]["selectionNum"];

    return selectionNum
}




var q = {
    1: {
        "title": "선물 받으실 분의 성별을 선택해주세요.",
        "question-type": "sex",
        "selectionNum": 2,
        "A": "남성",
        "B": "여성"
    },
    2: {
        "title": "선물 받으실 분의 연령대를 선택해주세요.",
        "question-type": "age",
        "selectionNum": 4,
        "A": "청소년(10대)",
        "B": "청년(20-30대)",
        "C": "중장년(40-50대)",
        "D": "노년(60대 이상)"
    },
    3: {
        "title": "선물하고자 하는 건강기능식품 카테고리를 선택해주세요.",
        "question-type": "category",
        "selectionNum": selectionNum(),
        "A": "학생/수험생",
        "B": "사무직/실내 근로자",
        "C": "실외 근로자"
    },
    4: {
        "title": "원하시는 가격대가 있다면 선택해주세요.",
        "question-type": "price",
        "selectionNum": 3,
        "A": "10만원 미만",
        "B": "10만원 이상",
        "C": "전체"
    }
};