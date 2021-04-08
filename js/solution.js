function goEland(){
    var giftCategory = localStorage.getItem("category");
    var giftPrice = localStorage.getItem("price");

    if(giftCategory == "수면/스트레스"){giftCategory = "C1"}
    else if(giftCategory == "눈"){giftCategory = "C2"}
    else if(giftCategory == "두뇌 활동"){giftCategory = "C3"}
    else if(giftCategory == "피로/간"){giftCategory = "C4"}
    else if(giftCategory == "체지방/운동능력"){giftCategory = "C5"}
    else if(giftCategory == "피부 관리"){giftCategory = "C6"}
    else if(giftCategory == "뼈/관절"){giftCategory = "C7"}
    else if(giftCategory == "여성 건강(갱년기)"){giftCategory = "C8"}
    else {giftCategory = "C9"}

    // console.log(giftCategory);
    // console.log(giftPrice);

    if(giftPrice == "전체"){location.href = purchase[giftCategory]["T"];}
    if(giftPrice == "10만원 이상"){location.href = purchase[giftCategory]["H"];}
    if(giftPrice == "10만원 미만"){location.href = purchase[giftCategory]["L"];}
}

var purchase = {
    // 수면/스트레스
    "C1" : {
        "T" : "https://www.naver.com",
        "H" : "",
        "L" : ""
    },

    // 눈
    "C2" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 두뇌 활동
    "C3" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 피로/간
    "C4" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 체지방/운동능력
    "C5" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 피부 관리
    "C6" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 뼈/관절
    "C7" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 여성 건강(갱년기)
    "C8" : {
        "T" : "",
        "H" : "",
        "L" : ""
    },

    // 치아/잇몸
    "C9" : {
        "T" : "",
        "H" : "",
        "L" : ""
    }
}