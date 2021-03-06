//**********************************
//Misc Stuff
//**********************************
var genderBoy = 0;
var genderGirl = 0;
var genderTotal = 0;

var schoolSIS = 0;
var schoolSOB = 0;
var schoolSOA = 0;
var schoolSOL = 0;
var schoolSOE = 0;
var schoolSOSS = 0;

var year2013 = 0;
var year2014 = 0;
var year2015 = 0;
var year2016 = 0;
var year2017 = 0;

var expertiseNewbie = 0;
var expertiseBeginner = 0;
var expertiseIntermediate = 0;
var expertiseAdvanced = 0;
var expertiseExpert = 0;

var vivace12 = 0;
var vivace13 = 0;
var vivace14 = 0;
var vivace15 = 0;
var vivace16 = 0;
var vivace17 = 0;
var vivace18 = 0;

var newTotalData = 0;

$(document).ready(function () {
    //Upon start, the script would retrieve data from the google sheets
    retrieveData();

    //This repeated function is to check if the data has changed. If the data has changed, then you need to retrieve the data again and redraw the whole visualisation.
    setInterval(function () {
        console.log("refresh")
        if (genderTotal != newTotalData) {
            retrieveData();
        }
    }, 10000);
})

//This function is uses Google Sheets API to retrieve the information from the google sheets.
//It takes in timestamp, email, expertise and gender.
function retrieveData() {
    $.ajax({
        url: 'https://script.googleusercontent.com/macros/echo?user_content_key=HxT-DbOgAx-G2CZDsP85M_UdCKj-7UJzndsGZBJ9a0v_8dqJaclSY-ZfO90gJbDMV2yZYTwHlrqWdKSSsJhGVSp7MD3Mg28EOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa1ZsYSbt7G4nMhEEDL32U4DxjO7V7yvmJPXJTBuCiTGh3rUPjpYM_V0PJJG7TIaKpzjnW7fDIdJvUc6S6oej-Uzzg-zYw7TrH--epZcnP5y2K8CuVI6Yu3Y5keLGnWsT4sgJ3ttE15malo-KUAPQVXM&lib=MbpKbbfePtAVndrs259dhPT7ROjQYJ8yx',
        success: function (responseText) {
            console.log(responseText)
            var data = responseText.Response;
            resetData();
            for (var i = 0; i < data.length; i++) {
                //here, the person would be categoried into the appropriate places
                newTotalData = data.length;
                genderSwitch(data[i].Gender);
                yearSwitch(data[i]["School_Email_(Please_include_your_school)"]);
                schoolSwitch(data[i]["School_Email_(Please_include_your_school)"]);
                expertSwitch(data[i]["What_is_your_experience_with_Business_Intelligence_and_Data_Analytics?_"]);
                timeSwitch(new Date((data[i].Timestamp - 25567.35-2)*86400*1000));
            }
            //after all the variables are added accordingly, this functions would populate the various fields of the data visualisation.
            genderPopulate();
            schoolPopulate();
            yearPopulate();
            expertisePopulate();
            timePopulate();
        }
    });
}

//increment the gender variable accordingly.
function genderSwitch(gender) {
    if (gender == 'Female') {
        genderGirl++;
    } else {
        genderBoy++;
    }
}

//increment the year variable accordingly to the email year.
function yearSwitch(email) {
    //example: minghao.ong.2014@sis.smu.edu.sg
    switch (email.substr(email.indexOf("@") - 4, 4)) {
        case '2013':
            year2013++;
            break;
        case '2014':
            year2014++;
            break;
        case '2015':
            year2015++;
            break;
        case '2016':
            year2016++;
            break;
        case '2017':
            year2017++;
            break;
    }
}

//increment the expertise variable accordingly.
function expertSwitch(expertise) {
    //"Newbie",Beginner,Intermediate,Advanced,Expert
    switch (expertise) {
        case "Newbie":
            expertiseNewbie++;
            break;
        case "Beginner":
            expertiseBeginner++;
            break;
        case "Intermediate":
            expertiseIntermediate++;
            break;
        case "Advanced":
            expertiseAdvanced++;
            break;
        case "Expert":
            expertiseExpert++;
            break;
    }
}

//increment the school variable accordingly to the email school.
function schoolSwitch(email) {
    //example: minghao.ong.2014@sis.smu.edu.sg
    switch (email.substr(email.indexOf("@") + 1, 3)) {
        case 'sis':
            schoolSIS++;
            break;
        case 'bus':
            schoolSOB++;
            break;
        case 'acc':
            schoolSOA++;
            break;
        case 'eco':
            schoolSOE++;
            break;
        case 'soc':
            schoolSOSS++;
            break;
        default:
            schoolSOL++;
    }
}

//increment the time variable accordingly to vivace start and end time.
function timeSwitch(datetime) {
    if (datetime.getDate() == 18) {
        if (datetime.getHours() <= 12) {
            vivace12++;
        } else if (datetime.getHours() >= 18) {
            vivace18++;
        } else {
            switch (datetime.getHours()) {
                case 13:
                    vivace13++;
                    break;
                case 14:
                    vivace14++;
                    break;
                case 15:
                    vivace15++;
                    break;
                case 16:
                    vivace16++;
                    break;
                case 17:
                    vivace17++;
                    break;
            }
        }
    }
}

//This function populates the expertise visualisation
function expertisePopulate() {
    var experienced = expertiseIntermediate + expertiseAdvanced + expertiseExpert;
    $("#experience-newbie").text(expertiseNewbie);
    $("#experience-novice").text(expertiseBeginner);
    $("#experience-experience").text(experienced);
}

//This function populates the gender visualisation
function genderPopulate() {
    genderTotal = genderBoy + genderGirl;
    $("#gender-female").text(genderGirl);
    $("#gender-male").text(genderBoy);
    $("#gender-female-percent").text("(" + (parseFloat(genderGirl / genderTotal) * 100).toString().substr(0, 4) + "%)");
    $("#gender-male-percent").text("(" + (parseFloat(genderBoy / genderTotal) * 100).toString().substr(0, 4) + "%)");
}

//This function populates the year visualisation
function yearPopulate() {
    var chart = new CanvasJS.Chart("yearChart", {
        backgroundColor: "transparent",
        axisX: {
            gridColor: "transparent",
            tickColor: "transparent",
            lineColor: "#fff",
            lineThickness: 2,
            labelFontSize: 25,
            labelFontColor: "#fff",
            labelFontFamily: "Source Sans Pro"
        },
        axisY: {
            gridColor: "transparent",
            tickColor: "#fff",
            labelFontColor: "#fff",
            lineColor: "#fff",
            lineThickness: 2,
            labelFontSize: 25,
            labelFontColor: "#fff",
            labelFontFamily: "Source Sans Pro"
        },
        data: [
            {
                type: "column",
                indexLabel: "{y}",
                indexLabelFontFamily: "Bebas Neue",
                indexLabelFontColor: "#33353e",
                indexLabelFontWeight: "bold",
                indexLabelFontSize: 60,
                color: "#ffffff",
                indexLabelPlacement: "inside",

                dataPoints: [
                    {
                        y: year2017,
                        label: "FRESHMAN"
                    },
                    {
                        y: year2016,
                        label: "SOPHOMORE"
                    },
                    {
                        y: year2015,
                        label: "JUNIOR"
                    },
                    {
                        y: year2014 + year2013,
                        label: "SENIOR"
                    }
			]
		}
		]
    });
    chart.render();
}

//This function populates the school visualisation
function schoolPopulate() {
    schoolTotal = schoolSOSS + schoolSOE + schoolSOA + schoolSOB + schoolSIS + schoolSOL;
    $("#soss-total").text(schoolSOSS);
    $("#soss-percent").text("(" + (parseFloat(schoolSOSS / schoolTotal) * 100).toString().substr(0, 4) + "%)");

    $("#soe-total").text(schoolSOE);
    $("#soe-percent").text("(" + (parseFloat(schoolSOE / schoolTotal) * 100).toString().substr(0, 4) + "%)");

    $("#soa-total").text(schoolSOA);
    $("#soa-percent").text("(" + (parseFloat(schoolSOA / schoolTotal) * 100).toString().substr(0, 4) + "%)");

    $("#sob-total").text(schoolSOB);
    $("#sob-percent").text("(" + (parseFloat(schoolSOB / schoolTotal) * 100).toString().substr(0, 4) + "%)");

    $("#sis-total").text(schoolSIS);
    $("#sis-percent").text("(" + (parseFloat(schoolSIS / schoolTotal) * 100).toString().substr(0, 4) + "%)");

    $("#school-total").text(schoolSOSS + schoolSOE + schoolSOA + schoolSOB + schoolSIS + schoolSOL);
}

//This function populates the time visualisation
function timePopulate() {
    var chart = new CanvasJS.Chart("timeChart", {
        backgroundColor: "transparent",
        axisX: {
            gridColor: "transparent",
            tickColor: "transparent",
            lineColor: "#fff",
            lineThickness: 2,
            labelFontSize: 25,
            labelFontColor: "#fff",
            labelFontFamily: "Source Sans Pro"
        },
        toolTip: {
            shared: false
        },
        axisY: {
            gridColor: "transparent",
            tickColor: "transparent",
            labelFontColor: "transparent",
            lineColor: "transparent"
        },
        data: [
            {
                type: "spline",
                fillOpacity: 0.7,
                indexLabel: "{y}",
                indexLabelFontFamily: "Bebas Neue",
                indexLabelFontColor: "#ffffff",
                indexLabelFontWeight: "bold",
                indexLabelFontSize: 60,
                indexLabelPlacement: "outside",
                lineThickness: 6,
                markerType: "circle",
                markerSize: 20,
                markerBorderColor: "#33353e", //change color here
                markerBorderThickness: 6,
                color: "#ffffff",
                dataPoints: [
                    {
                        label: "12pm",
                        y: vivace12
                    },
                    {
                        label: "1pm",
                        y: vivace13
                    },
                    {
                        label: "2pm",
                        y: vivace14
                    },
                    {
                        label: "3pm",
                        y: vivace15
                    },
                    {
                        label: "4pm",
                        y: vivace16
                    },
                    {
                        label: "5pm",
                        y: vivace17
                    },
                    {
                        label: "6pm",
                        y: vivace18
                    }
				]
			}
			],
        legend: {
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
    });

    chart.render();
}

//breadcrumb to check all the variables.
function printAll() {
    console.log(" genderBoy = " + genderBoy);
    console.log(" genderGirl = " + genderGirl);

    console.log(" schoolSIS = " + schoolSIS);
    console.log(" schoolSOB  = " + schoolSOB);
    console.log(" schoolSOA = " + schoolSOA);
    console.log(" schoolSOL  = " + schoolSOL);
    console.log(" schoolSOE  = " + schoolSOE);
    console.log(" schoolSOSS  = " + schoolSOSS);

    console.log(" year2013 = " + year2013);
    console.log(" year2014 = " + year2014);
    console.log(" year2015 = " + year2015);
    console.log(" year2016 = " + year2016);
    console.log(" year2017 = " + year2017);

    console.log(" expertiseNewbie = " + expertiseNewbie);
    console.log(" expertiseBeginner = " + expertiseBeginner);
    console.log(" expertiseIntermediate = " + expertiseIntermediate);
    console.log(" expertiseAdvanced = " + expertiseAdvanced);
    console.log(" expertiseExpert = " + expertiseExpert);

    console.log(" vivace12 = " + vivace12);
    console.log(" vivace13 = " + vivace13);
    console.log(" vivace14 = " + vivace14);
    console.log(" vivace15 = " + vivace15);
    console.log(" vivace16 = " + vivace16);
    console.log(" vivace17 = " + vivace17);
    console.log(" vivace18 = " + vivace18);
}

//reset all data
function resetData() {
    genderBoy = 0;
    genderGirl = 0;
    genderTotal = 0;

    schoolSIS = 0;
    schoolSOB = 0;
    schoolSOA = 0;
    schoolSOL = 0;
    schoolSOE = 0;
    schoolSOSS = 0;

    year2013 = 0;
    year2014 = 0;
    year2015 = 0;
    year2016 = 0;
    year2017 = 0;

    expertiseNewbie = 0;
    expertiseBeginner = 0;
    expertiseIntermediate = 0;
    expertiseAdvanced = 0;
    expertiseExpert = 0;

    vivace12 = 0;
    vivace13 = 0;
    vivace14 = 0;
    vivace15 = 0;
    vivace16 = 0;
    vivace17 = 0;
    vivace18 = 0;

    newTotalData = 0;
}
