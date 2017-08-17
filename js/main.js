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
    retrieveData();

    setInterval(function () {
        //console.log("interval~" + genderTotal + "vs." + newTotalData)
        if (checkData(genderTotal, newTotalData)) {
            retrieveData();
        }
    }, 10000);


})

function checkData(oldAmt, newAmt) {
    //console.log("old=" + oldAmt + " new=" + newAmt);
    if (oldAmt != newAmt) {
        return false;
    } else {
        return true;
    }
}

function expertisePopulate() {
    var experienced = expertiseIntermediate + expertiseAdvanced + expertiseExpert;
    $("#experience-newbie").text(expertiseNewbie);
    $("#experience-novice").text(expertiseBeginner);
    $("#experience-experience").text(experienced);
}

function genderPopulate() {
    genderTotal = genderBoy + genderGirl;
    $("#gender-female").text(genderGirl);
    $("#gender-male").text(genderBoy);
    $("#gender-female-percent").text("(" + (parseFloat(genderGirl / genderTotal) * 100).toString().substr(0, 4) + "%)");
    $("#gender-male-percent").text("(" + (parseFloat(genderBoy / genderTotal) * 100).toString().substr(0, 4) + "%)");
}

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



function retrieveData() {
    //This is for emergency use only. (make sure to remove the commented line below as well).
    //setInterval(function () {
    $.ajax({
        url: 'https://script.googleusercontent.com/macros/echo?user_content_key=x72DBi7PnP-krZmTlckfJ41U0-Va694QrJl83V61ltzpLJTjxFPiNnm-PbXP9E5jSFL1EiEG0ouTuGpHG1LdzFqsWYzNv3w8OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa1ZsYSbt7G4nMhEEDL32U4DxjO7V7yvmJPXJTBuCiTGh3rUPjpYM_V0PJJG7TIaKpzjnW7fDIdJvUc6S6oej-Uzzg-zYw7TrH--epZcnP5y2K8CuVI6Yu3Y5keLGnWsT4sgJ3ttE15malo-KUAPQVXM&lib=MbpKbbfePtAVndrs259dhPT7ROjQYJ8yx',
        success: function (responseText) {
            var data = responseText.Response;
            resetData();
            for (var i = 0; i < data.length; i++) {
                newTotalData = data.length;
                genderSwitch(data[i].Gender);
                yearSwitch(data[i].Email);
                schoolSwitch(data[i].Email);
                expertSwitch(data[i].Expertise);
                timeSwitch(new Date(data[i].Timestamp));

            }
            genderPopulate();
            schoolPopulate();
            yearPopulate();
            expertisePopulate();
            timePopulate();
        }
    });
    //}, 30000);
}

function genderSwitch(gender) {
    if (gender == 'Female') {
        genderGirl++;
    } else {
        genderBoy++;
    }
}

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

function expertSwitch(expertise) {
    //"Newbie",Beginner,Intermediate,Advanced,Expert
    switch (expertise) {
        case 'Newbie':
            expertiseNewbie++;
            break;
        case 'Beginner':
            expertiseBeginner++;
            break;
        case 'Intermediate':
            expertiseIntermediate++;
            break;
        case 'Advanced':
            expertiseAdvanced++;
            break;
        case 'Expert':
            expertiseExpert++;
            break;
    }
}

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
