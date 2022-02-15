// **** baseUrl은 설치된 api 서버 호스트에 따라 변경될 수 있음.
// bindData : 바인딩 데이터 호출, viewData : 데이터 보기
const apprApi = {
    // baseUrl: "http://118.36.154.135:8081",
    // baseUrl : "http://10.35.0.174:4600",
    // baseUrl : "http://10.7.200.97:3000/",
    // baseUrl : "http://192.168.20.38:4600",
    baseUrl : "http://35.199.148.128:3000",
    bindData: "/apprBindData"
};

// =============================================
const tplInfo = [

    location.origin + "/AIMS_test/hwp/cover.hwp",
    // location.origin + "/AIMS_test/hwp/p01-apprisal.hwp",
    location.origin + "/AIMS_test/hwp/apprr.hwp"
    // location.origin + "/AIMS_test/hwp/p01-apprisal.hwp",
    // location.origin + "/AIMS_test/hwp/appraisal.hwp"
];

const fieldInfo = {};

// NaraCtrlManager란 변수에 한컴에서 제공된 사용할 api function들 호출
const NaraCtrlManager = {

    // viewermode = 0 // ActiveX
    // viewermode = 1 // HTML5 (default)
    viewerMode : 1,

    //exception 처리
    errorMsg : {
        NOT_INSTALLED_ACTIVEX: "Activex가 설치되어 있지 않습니다."
        , OCCURRED_ERROR_REQUEST_MANAGER: "함수를 호출하지 못하였습니다."
    },

    //로딩바 표현
    loading: function(){

        //aNodelist에 left-panel의 아이디값을 가진 a태그를 모드담고
        const aNodeList = document.querySelectorAll("#left-panel a");
        //inputNodeList에 left-panel의 아이디값을 가지 input태그 모두담고
        const inputNodeList = document.querySelectorAll("#left-panel input");

        //anodelist길이만큼, 반복문 돌려서 disabled 속성준다
        for(let i=0; i < aNodeList.length; i++){

            aNodeList[i].setAttribute("disabled", true);
        }
        //inputNodeList, 반복문 돌려서 disabled 속성준다
        for(let i=0; i < inputNodeList.length; i++){
            inputNodeList[i].setAttribute("disabled", true);
        }

        //body 태그 style을 0.4 투명도로 설정한다.
        document.querySelector("body").setAttribute("style", "opacity:0.4;");

    },



    //로딩 완료시 위에 위와 반대의 작업들을 진행한다.
    loadingComplete: function(){

        const aNodeList = document.querySelectorAll("#left-panel a");
        const inputNodeList = document.querySelectorAll("#left-panel input");

        for(let i=0; i < aNodeList.length; i++){
            aNodeList[i].removeAttribute("disabled");
        }

        for(let i=0; i < inputNodeList.length; i++){
            inputNodeList[i].removeAttribute("disabled");
            inputNodeList[i].removeAttribute("disabled");
        }

        document.querySelector("body").removeAttribute("style");

        //tool_loading_progress란 클래스를 가진 요소를 none 시킨다.
        document.getElementsByClassName("tool_loading_progress").item(0).setAttribute("style", "display:none;");

    },

    //downloading 이란 함수 생성 실행시 바디태그 스타일 투명도 0.4
    downloading : function(){
        document.querySelector("body").setAttribute("style", "opacity:0.4;");
    },
    //downloaded 란 함수 생성 실행시 바디태그 정상화
    downloaded : function(){
        document.querySelector("body").setAttribute("style", "opacity:1.0;");
    },

    //domevent란 함수 실행시 hwpctrl을 매개변수로 이용
   domEvent : function(hwpCtrl){


        //hwp 다운로드기능
        document.getElementById("hwp_button").addEventListener("click", function(e){
            NaraCtrlManager.saveFile(hwpCtrl, "HWP");
        });

        //pdw 다운로드기능
        document.getElementById("pdf_button").addEventListener("click", function(e){
            NaraCtrlManager.saveFile(hwpCtrl, "PDF");
        });

       // 행추가 및 데이터 통신

       document.getElementById("addColumn").addEventListener("click",function(){

           //APPR_COVER_1/Debtor가 존재할 시

           // var procInfo = ["Debtor","Subject"];
           // 추후 페이지 설정 시
           if(hwpCtrl.FieldExist('APPR_COVER_1/Reference')) {

               //위치로 이동
               hwpCtrl.MoveToField('APPR_COVER_1/Reference', true, true, true);

               var vAct = hwpCtrl.CreateAction("CharShape");
               var vSet = hwpCtrl.CreateSet("CharShape");
               vAct.GetDefault(vSet);
               vSet.SetItem("TextColor", 0x00cf);
               vAct.Execute(vSet);
           }
           var procInfo = ["Debtor"];

           for(i=0; i < procInfo.length; i++){

           if(hwpCtrl.FieldExist('APPR_COVER_1/Debtor')) {

                   //위치로 이동
                   hwpCtrl.MoveToField('APPR_COVER_1/Debtor', true, true, true);


                   //셀 색상 입력
                   var act = hwpCtrl.CreateAction("CellBorder");
                   var set = act.CreateSet();
                   act.GetDefault(set);

                   var FillAttrSet = set.CreateItemSet("FillAttr","DrawFillAttr");
                   FillAttrSet.SetItem("Type", 1); //0 채우기없음, 1 면색 또는 무뉘색 , 2 그림, 3 그라데이션

                    FillAttrSet.SetItem("WinBrushFaceStyle", 6); // 면색 스타일
                    FillAttrSet.SetItem("WinBrushHatchColor", 0x00003300);

                    // FillAttrSet.SetItem("WinBrushFaceColor", 0x00BBGGRR); //  면색 0x00BBGGRR

                   FillAttrSet.SetItem("WinBrushFaceColor", 0x00003300); //  면색 0x00BBGGRR

                   FillAttrSet.SetItem("WindowsBrush", 1); // 현재 선택된 브러쉬타입
                   act.Execute(set);

                   // var vAct = hwpCtrl.CreateAction("CharShape");
                   // var vSet = hwpCtrl.CreateSet("CharShape");
                   // vAct.GetDefault(vSet);
                   // vSet.SetItem("TextColor", 0x00cf);
                   // vAct.Execute(vSet);
                   // 가운데 정렬
                   hwpCtrl.Run('ParagraphShapeAlignCenter');

                   // 행 추가
                   hwpCtrl.Run("TableInsertLowerRow");

                   //한줄 아래로 이동 20 한줄 아래 이동, 21 한줄 위로이동, 100 현재 셀의 왼쪽, 101 셀 오른쪽, 102 셀 위쪽, 103 셀 아래쪽
                   hwpCtrl.MovePos(103);

                   // GetTableCellAddr(1) 행 위치값 얻어오기
                   // var tr = hwpCtrl.GetTableCellAddr(1);

                   // 한줄 아래 APPR_COVER_1/Debtor 에 대한 value 추가
                   hwpCtrl.SetCurFieldName('APPR_COVER_1/' + procInfo[i]);
                   hwpCtrl.PutFieldText('APPR_COVER_1/' + procInfo[i], '');

                   // GetTableCellAddr(0) 열 위치값 얻어오기
                   // var tc = hwpCtrl.GetTableCellAddr(0);

                   // 한줄 아래로 이동
                   hwpCtrl.MovePos(103);


                   // 왼쪽으로 하나씩 이동
                   hwpCtrl.MovePos(100);




                   hwpCtrl.MovePos(100);

                   // 해당 위치에 키 맵핑
                   hwpCtrl.SetCurFieldName('APPR_COVER_1/' + procInfo[i]);
                   hwpCtrl.PutFieldText('APPR_COVER_1/' + procInfo[i], '');
                   
                   hwpCtrl.MovePos(100);

                    // 셀 병합
                   hwpCtrl.Run("TableCellBlock");
                   hwpCtrl.Run("TableCellBlockExtend");
                   hwpCtrl.Run("TableUpperCell");
                   hwpCtrl.Run("TableMergeCell");

                   //셀 왼쪽이동
                   hwpCtrl.MovePos(100);
                   hwpCtrl.MovePos(100);

                   // 셀 아래쪽 이동
                   hwpCtrl.MovePos(103);
                   hwpCtrl.Run("TableCellBlock");
                   hwpCtrl.Run("TableCellBlockExtend");
                   hwpCtrl.Run("TableUpperCell");
                   hwpCtrl.Run("TableMergeCell");

                   // json 연결


                       var apprId = NaraCtrlManager.util.getParameter("apprId");
                       const fieldList = NaraCtrlManager.getFieldArr(hwpCtrl, "");

                       console.log("return fieldList");
                       console.dir(fieldList);

                       if(fieldList.length > 0){

                           const api_url = apprApi.baseUrl + apprApi.bindData;
                           const api_params = {
                               apprId : apprId,
                               fieldList : fieldList,
                               separator : "/"
                           };

                           NaraCtrlManager.postApi(api_url, api_params, function(result){

                               console.log(result);

                               console.log(result.code);
                               console.log(result.data); // 데이터가 없으면 {}로....

                               // Object.hasOwnProperty(key) => true or false
                               console.log("data :::: " + result.hasOwnProperty("data"));
                               if(result.hasOwnProperty("data")){
                                   //if(result.code == 200){

                                   NaraCtrlManager.setFieldArr(hwpCtrl, fieldList, result.data);

                               }

                           });

                       }


               }
           }


       });

       document.getElementById("addTable").addEventListener("click",function(){
           var tbact = hwpCtrl.CreateAction("TableCreate");
           tbset = tbact.CreateSet();
           tbset.SetItem("Rows", 5);
           tbset.SetItem("Cols", 5);
           var table = hwpCtrl.InsertCtrl(
               "tbl", tbset);
       });

    },



    //한글 viewermode 설정
    setViewerMode : function(mode) {
        this.viewerMode = mode;
    },
    getViewerMode : function(){
        return this.viewerMode;
    },
    //한글 editmode 설정
    setEditMode : function(hwpCtrl, mode){
        hwpCtrl.EditMode = mode;
    },
    getEditMode : function(hwpCtrl){
        return hwpCtrl.EditMode;
    },
    //한글 툴바 스테이터스바 리본바 설정
    showToolBar: function(hwpCtrl, isTrueFalse) {

        // show HwpCtrl Toolbar
        // argument[0] : HwpCtrl Object
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        try {

            if (hwpCtrl != null) {
                hwpCtrl.ShowToolBar(isTrueFalse);
            } else {
                this.errorMessage();
            }

        } catch (error) {
            console.dir(error);

            this.errorMessage("showToolbar");
        }

    },
    showStatusBar : function(hwpCtrl, isTrueFalse){

        // show HwpCtrl Toolbar
        // argument[0] : HwpCtrl Object
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        try {

            if (hwpCtrl != null) {
                hwpCtrl.ShowStatusBar(isTrueFalse);
            } else {
                this.errorMessage();
            }

        } catch (error) {
            this.errorMessage("showRibbon");
        }

    },
    showRibbon : function(hwpCtrl, isTrueFalse){

        // show HwpCtrl Toolbar
        // argument[0] : HwpCtrl Object
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        try {

            if (hwpCtrl != null) {
                hwpCtrl.ShowRibbon(isTrueFalse);
            } else {
                this.errorMessage();
            }

        } catch (error) {
            this.errorMessage("showRibbon");
        }

    },

    //getfieldarr으로 읽고 setfieldarr으로 fieldArr호출

    getFieldArr : function(hwpCtrl, fieldKey) {

        console.log("getFieldArr");

        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        let bfEditMode = this.getEditMode(hwpCtrl);
        this.setEditMode(hwpCtrl, 1);

        let result = [];

        //fieldkey가 null이 아닐시 배열변수인 result에 fieldkey값을 텍스트로 p넣는다

        if(!this.util.isStrEmpty(fieldKey)){
            result.push(hwpCtrl.GetFieldText(fieldKey));
        } else {

            result = hwpCtrl.GetFieldList(0, 0);

            //console.log(result);
            console.log("list empty : " + this.util.isArrEmpty(result));

            if(!this.util.isArrEmpty(result)) {
                result = result.replace(/\u0002/g, "|");
                result = result.split("|");

                //filter 주어진함수 테스트 통과하는 모든요소를 모아 새로운배열로 반환(중복제거)
                result = result.filter(function(element, index) {
                    return result.indexOf(element) === index;
                });
            }

        }

        console.dir(result);

        // 이전 에디터모드로 변경
        this.setEditMode(hwpCtrl, bfEditMode);

        return result;

    },

    // setfieldarr으로 fieldArr호출(index.js에 fieldlist를 가져온다(fieldArr))
    // result.apprdata 를 filedData

    setFieldArr : function(hwpCtrl, fieldArr, fieldData) {

        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        let bfEditMode = this.getEditMode(hwpCtrl);
        this.setEditMode(hwpCtrl, 0);

        let procId = "";

        let fieldParent = "";
        let fieldKey = "";
        let fieldValue = "";

        let fieldSplit = [];

        let beforeField = "";
        let filterFieldArr = [];
        let filterFieldObj = {};

        if(!this.util.isArrEmpty(fieldArr)){

            for(let i=0; i < fieldArr.length; i++){

                if(fieldArr[i].indexOf("SP_SELECT_APP") < 0 || fieldArr[i].indexOf("/") < 0 || beforeField.indexOf(fieldArr[i]) > -1) continue;
                    filterFieldArr.push(fieldArr[i].trim());
                    // console.log(filterFieldObj);
                    beforeField = fieldArr[i];

            }

            // console.log(filterFieldArr);
            // console.log(filterFieldObj);

            fieldSplit = filterFieldArr[0].split("/");

            fieldParent = fieldSplit[0];

            // entity 원형으로 넘기면 쓸필요가 없다(Client 요구사항) 하지만 일단은 이렇게 테스트를 진행해보자..
            fieldData = JSON.parse(fieldData);
            // console.log(fieldData);

            fieldData = fieldData[fieldParent];

            if(!this.util.isArrEmpty(fieldData)){

                for(let i=0; i < fieldData.length; i++){

                    console.log(fieldData[i]);
    
                    for(let j=0; j < filterFieldArr.length; j++) {


                        fieldSplit = filterFieldArr[j].split("/");    
    
                        // console.log(filterFieldArr[j]);
    
                        // APPR_COVER_1 오브젝트에서 Submitter 데이터를 찾는다.
                        fieldKey = filterFieldArr[j];
                        fieldValue = fieldData[i][fieldSplit[1]];
                        
                        // console.log(fieldData[i]);
                        // console.log(fieldSplit[1]);
                        // console.log(filterFieldArr[j]);
                        // console.log(fieldValue);
    
                        if(!this.util.isStrEmpty(fieldValue)){
    
                            // 필드값이 숫자인 경우 콤마 추가
                            if(!isNaN(fieldValue)) {
                                fieldValue = Number(fieldValue).toLocaleString();
                            }

                            hwpCtrl.PutFieldText(filterFieldArr[j].trim(), fieldValue);
    
                        }
    
                    }
    
                }

            }


            //
            //
            // for(let i=0; i < fieldArr.length; i++){
            //
            //     //fieldlist에 배열을 fieldkey에담고
            //     // fieldKey = fieldArr[i];
            //
            //
            //     // fieldValue = fieldData[fieldArr[i]]
            //     // APPR_COVER_1 오브젝트에서 Submitter 데이터를 찾는다.
            //     fieldValue = fieldData[fieldParent][fieldKey];
            //
            //
            //     console.log(fieldKey);
            //     console.log(fieldValue);
            //     console.dir("fieldValue ====>" + fieldValue);
            //
            //     if(!this.util.isStrEmpty(fieldKey) && !this.util.isStrEmpty(fieldValue)){
            //
            //         // 필드값이 숫자인 경우 콤마 추가
            //         if(!isNaN(fieldValue)) {
            //             fieldValue = Number(fieldValue).toLocaleString();
            //         }
            //
            //         hwpCtrl.PutFieldText(fieldParent + "/" + fieldKey, fieldValue);
            //     } else {
            //         hwpCtrl.PutFieldText(fieldKey, "  ");
            //     }
            //
            // }

        }

        this.setEditMode(hwpCtrl, bfEditMode);

    },



    saveAsFile: function(hwpCtrl, fileName) {
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        try {

            // 2021-02-08, ActiveX = 0, HTML5 = 1
            if (NaraFormManager.getViewerMode() == 1) {

                return hwpCtrl.SaveAs(fileName, "HWP", "download:true");

            } else {

                return hwpCtrl.SaveAs(fileName, "HWP", "download:true");
            }
        } catch (error) {
            NaraFormManager.errormessage("saveAsFile");
        };
    },

    // display Error Message
    errorMessage: function(methodName) {

        let errorMsg = "";

        if (typeof(methodName) == "undefined")
            errorMsg = this.errorMsg.NOT_INSTALLED_ACTIVEX;
        else
            errorMsg = this.errorMsg.OCCURRED_ERROR_REQUEST_MANAGER + "(ERROR:NaraCtrlManager." + methodName + ")";

        alert(errorMsg);
        return false;

    },


    errorMessageString: function(message) {
        alert(message);
    },

    openURL: function(hwpCtrl, url, callback) {
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        // 20021-01-25 EditMode
        var bfEditMode = hwpCtrl.EditMode;
        hwpCtrl.EditMode = 0;

        try {
            // type = HWP, JSON

            // 2021-02-08, ActiveX = 0, HTML5 = 1
            if (NaraCtrlManager.getViewerMode() == 1) {

                var rtn = hwpCtrl.Open(url, "HWP", "lock:false");

                // 2021-01-25 EditMode
                hwpCtrl.EditMode = bfEditMode;

                if (callback !== undefined) {
                    callback(rtn);
                } else {
                    return 0;
                }

            } else {
//hwpCtrl.Open(url, "",
                hwpCtrl.Open(url, "HWP", "lock:false", function (res) {
                    // 20021-01-25 EditMode
                    hwpCtrl.EditMode = bfEditMode;

                    if (callback !== undefined) {
                        callback(res);
                    }
                });
            }

        } catch (error) {
            NaraFormManager.errormessage("openURL");
        };
    },

    openFile: function(hwpCtrl, fileUrl, callback) {

        // fileUrl이 전달되지 않은 경우..
        if(this.util.isStrEmpty(fileUrl)){ return alert("감정서가 존재하지 않습니다."); }

        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        const bfEditMode = this.getEditMode(hwpCtrl);
        this.setEditMode(hwpCtrl, 1);

        const fileExt = this.util.getFileExt(fileUrl);
        let fileFormat = "HWP";

        if(fileExt){ fileFormat = fileExt.toUpperCase(); }

        try{

            const result = hwpCtrl.Open(fileUrl, fileFormat, "lock:false");
            hwpCtrl.EditMode = bfEditMode;

            if(callback != null && callback != undefined){
                callback(result);
            } else {
                return 1;
            }

        } catch (error) {
            this.errorMessage("openFile");
        }

    },

    openDoc: function(hwpCtrl, data, type, option, callback, userdata) {
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        // 20021-01-25 EditMode
        var bfEditMode = hwpCtrl.EditMode;
        hwpCtrl.EditMode = 1;

        try {

            // 2021-02-08, ActiveX = 0, HTML5 = 1
            if (NaraCtrlManager.getViewerMode() == 1) {

                var rtn = hwpCtrl.SetTextFile(data, type, "");

                // 20021-01-25 EditMode
                hwpCtrl.EditMode = bfEditMode;

                if (callback !== undefined) {
                    callback(rtn);
                } else {
                    return 0;
                }

            } else {
                // type = HWP, JSON
                hwpCtrl.SetTextFile(data, type, option, function (res) {
                    // 20021-01-25 EditMode
                    hwpCtrl.EditMode = bfEditMode;

                    if (callback !== undefined) {
                        callback(res);
                    }
                }, userdata);
            }




        } catch (error) {
            NaraCtrlManager.errorMessage("openDoc");
        };
    },

    saveFile : function(hwpCtrl, _fileFormat){

        // 로딩바 시작
        this.downloading();

        if(hwpCtrl.contentWindow != undefined){ hwpCtrl = hwpCtrl.contentWindow.hwpCtrl; }

        const fileFormat = _fileFormat.toUpperCase();

        try{
            hwpCtrl.SaveAs("", fileFormat, "download:true");
        } catch (error) {
            this.errorMessage("saveAsFile");
        }

        // 로딩바 제거
        this.downloaded();

    },

    appendFile : function(hwpCtrl, fileUrl, callback){


        const fileFormat = this.util.getFileExt(fileUrl);

        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        // 20021-01-25 EditMode
        var bfEditMode = hwpCtrl.EditMode;
        //hwpCtrl.Editmode = 0;
        hwpCtrl.EditMode = 1;



        //쪽 여백
        // var paraShape = hwpCtrl.ParaShape;
        // paraShape.SetItem('TopMargin', 2000);
        // hwpCtrl.ParaShape = paraShape;

        hwpCtrl.MovePos(3);

        // hwpCtrl.Insert(fileUrl, fileFormat, "insertfile; sync;", callback);
        hwpCtrl.Insert(fileUrl, fileFormat, "insertfile; sync;", callback);
        
        hwpCtrl.MovePos(3);



        console.log("fileUrl ===> " + fileUrl);
        console.log("movepos ===> " + hwpCtrl.MovePos(3));
        console.log("callback ===> " + callback);

    },

    // 쪽여백
    // var act = hwpCtrl.CreateAction("PageSetup");
    // var set = act.CreateSet(); act.GetDefault(set);
    // set.SetItem("ApplyTo", 3);
    // //적용범위 : 문서전체
    // var pset = set.CreateItemSet("PageDef","PageDef");
    // pset.SetItem("TopMargin", 3401);
    // pset.SetItem("LeftMargin", 4251); pset.SetItem("RightMargin", 4251); pset.SetItem("HeaderLen", 0); pset.SetItem("FooterLen", 0); pset.SetItem("GutterLen", 0); act.Execute(set);

    // InsertHwpUrl: function(hwpCtrl, url, callback) {
    //     if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}
    //
    //     // 20021-01-25 EditMode
    //     var bfEditMode = hwpCtrl.EditMode;
    //     //hwpCtrl.Editmode = 0;
    //     hwpCtrl.EditMode = 0;
    //     try {
    //
    //         //hwpCtrl.Run("MoveDocEnd");
    //         hwpCtrl.MovePos(3);
    //
    //             hwpCtrl.Run("BreakSection");
    //
    //
    //         // 2021-02-08, ActiveX = 0, HTML5 = 1
    //         if (NaraCtrlManager.getViewerMode() == 0) {
    //
    //             var rtn = hwpCtrl.Insert(url, "HWP", "");
    //
    //             // 2021-01-25 EditMode
    //             hwpCtrl.EditMode = bfEditMode;
    //
    //             if (callback !== undefined) {
    //                 callback(rtn);
    //             } else {
    //                 return 0;
    //             }
    //
    //         } else {
    //
    //             hwpCtrl.Insert(url, "HWP", "", function (res) {
    //                 // 20021-01-25 EditMode
    //                 hwpCtrl.EditMode = bfEditMode;
    //
    //                 if (callback !== undefined) {
    //                     callback(res);
    //                 }
    //             });
    //         }
    //
    //     } catch (error) {
    //         NaraCtrlManager.errormessage("InsertHwpUrl");
    //     };
    // },


    //나라 api 빌드방식
    hwp: {
        BuildWebHwpCtrl: function(id, baseurl, path, pagetype, callback, storage) {
            try {
                window.HwpCtrlApp = window.HwpCtrlApp || HwpCtrlApp;
                window.ImageLoader = window.ImageLoader || ImageLoader;
                //window.HwpCtrlApp.Initialize(id, baseurl, callback, storage);
                NaraCtrlManager.hwp.hwpCtrlApp.Initialize(window.HwpCtrlApp, id, baseurl, path, pagetype, callback, storage);

                return new HwpCtrl(window.HwpCtrlApp, window.ImageLoader);
            } catch (e) {
                console.warn(e);
            }
        },

        hwpCtrlApp: {

            Initialize : function (p_hwpctrlapp, id, baseurl, path, pagetype, callback, storage) {

                NaraCtrlManager.hwp.hwpCtrlApp._initOffice(p_hwpctrlapp, id, baseurl, path, pagetype, callback);

                var contentWindow = document.getElementById(WebHwpCtrlDefine.editorUIName.frameID).contentWindow;

                if (contentWindow) {
                    contentWindow.addEventListener("resize", function (event) {
                        var frame = document.getElementById(WebHwpCtrlDefine.editorUIName.frameID);
                        if (frame) {
                            frame.addEventListener("DOMContentLoaded", function (event) {
                                //HwpCtrlApp.UpdateLayout();
                                NaraCtrlManager.hwp.hwpCtrlApp.UpdateLayout(p_hwpctrlapp);
                            });
                        }
                    });
                }

                //this.storageType = storage;
                p_hwpctrlapp.storageType = storage;
            },

            UpdateLayout: function (p_hwpctrlapp) {
                // HwpCtrlApp.layoutView.resize();
                if (p_hwpctrlapp.hwpApp != null) {
                    p_hwpctrlapp.hwpApp.UpdateView();
                    p_hwpctrlapp.hwpApp.ResizeView();
                }
            },

            _initOffice: function(p_hwpctrlapp, id, baseurl, path, pagetype, callback) {
                NaraCtrlManager.hwp.hwpCtrlApp.LayoutView_initialize(p_hwpctrlapp, id, baseurl, path, pagetype, callback);
            },

            //Layout View 생성
            LayoutView_initialize : function(p_hwpctrlapp, id, baseurl, path, pagetype, callback) {

                if (baseurl == null || baseurl =="") {
                    baseurl = location.href;
                }

                var uri = parseURL(location.href);
                var skin = "default";
                if (uri.queryKey.skin) {
                    skin = uri.queryKey.skin;
                }
                var hwpctrlNode = document.getElementById(id);
                var iframe = document.createElement("iframe");
                var parentUrl = getBaseUrl(location.href);

                //var frameUrl = parentUrl + "/hwpctrlmain.html";
                var tmpPageType = "html";
                if (pagetype === "jsp") tmpPageType = "jsp";

                // 2021-01-19
                var frameUrl = parentUrl + ((path !== "") ? path : "");
                frameUrl = frameUrl + ((frameUrl.charAt(frameUrl.length-1) === "/") ? "" : "/") + "hwpctrlmain." + tmpPageType;

                if (uri.queryKey.noframe) {
                    frameUrl = parentUrl + "/hwpctrlmain_noframe.html";
                }

                if (uri.queryKey.frameurl) {
                    frameUrl = decodeURIComponent(uri.queryKey.frameurl);
                }

                iframe.setAttribute("id", WebHwpCtrlDefine.editorUIName.frameID);
                iframe.setAttribute("src", frameUrl + "?baseurl=" + encodeURIComponent(baseurl) + "&skin=" + skin);
                iframe.setAttribute("marginwidth", "0");
                iframe.setAttribute("marginheight", "0");
                iframe.setAttribute("hspace", "0");
                iframe.setAttribute("vspace", "0");
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("scrolling", "no");
                iframe.setAttribute("style", "width:100%;height:100%;");

                iframe.onload = function() {
                    var iFrame = document.getElementById(WebHwpCtrlDefine.editorUIName.frameID);
                    var contentWindow = iFrame.contentWindow;

                    contentWindow.callbackFn = function() {
                        p_hwpctrlapp.hwpApp = contentWindow.HwpApp;
                        p_hwpctrlapp.hwpCtrlImpl = contentWindow.HwpCtrlImpl;
                        p_hwpctrlapp.hwpCtrlIntf.Impl = p_hwpctrlapp.hwpCtrlImpl;

                        p_hwpctrlapp.hwpCtrlImpl.setStorage(p_hwpctrlapp.storageType);

                        callback();
                        //console.log("callback");


                    };

                    console.log("readyState ==>> ");
                    console.dir(contentWindow);


                };

                hwpctrlNode.appendChild(iframe);


            }
        }
    },

    moveToTable: function(hwpCtrl, tableNm) {
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        // 20021-01-25 EditMode
        var bfEditMode = hwpCtrl.EditMode;
        hwpCtrl.EditMode = 1;

        try {

            var ret = hwpCtrl.MoveToField(tableNm, true, true, true);

            if (ret == false) {
                ret = hwpCtrl.MoveToField("!" + tableNm, true, true, true);
            }

            hwpCtrl.Run("Cancel");

            // 20021-01-25 EditMode
            hwpCtrl.EditMode = bfEditMode;

            return ret;

        } catch (error) {
            NaraFormManager.errormessage("moveToTable");
        };
    },

    //파일 저장시


    saveDoc: function(hwpCtrl, type, callback) {
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        try {

            // 2021-02-08, ActiveX = 0, HTML5 = 1
            if (NaraCtrlManager.getViewerMode() == 1) {
                data = hwpCtrl.GetTextFile(type, "", function(data){
                    //console.log(data);
                });

                if (callback !== undefined) {

                    callback(data);
                } else {
                    return data;
                }

            } else {
                // type = HWP, JSON
                hwpCtrl.GetTextFile(type, "", function(data) {
                    callback(data);
                });
            }

        } catch (error) {
            NaraCtrlManager.errorMessage("saveDoc");
        };
    },

    // clear doc
    // argument[0] : HwpCtrl Object


    clearDoc: function(hwpCtrl) {
        if(hwpCtrl.contentWindow != undefined){hwpCtrl = hwpCtrl.contentWindow.HwpCtrl;}

        // 20021-01-25 EditMode
        var bfEditMode = hwpCtrl.EditMode;
        hwpCtrl.EditMode = 1;

        // hwpCtrl.Clear(1);
        hwpCtrl.Clear(0);

        // 20021-01-25 EditMode
        hwpCtrl.EditMode = bfEditMode;
    },

    table : {
        test: function (hwpCtrl, fieldList) {

            var procInfo = ["Debtor", "Subject"];
            for (i = 0; i < procInfo.length; i++) {


                if (hwpCtrl.FieldExist('APPR_COVER_1/Debtor')) {

                    //위치로 이동
                    hwpCtrl.MoveToField('APPR_COVER_1/Debtor', true, true, true);

                    // 가운데 정렬
                    hwpCtrl.Run('ParagraphShapeAlignCenter');

                    // 행 추가
                    hwpCtrl.Run("TableInsertLowerRow");

                    //한줄 아래로 이동 20 한줄 아래 이동, 21 한줄 위로이동, 100 현재 셀의 왼쪽, 101 셀 오른쪽, 102 셀 위쪽, 103 셀 아래쪽
                    hwpCtrl.MovePos(103);

                    // GetTableCellAddr(1) 행 위치값 얻어오기
                    // var tr = hwpCtrl.GetTableCellAddr(1);

                    // 한줄 아래 APPR_COVER_1/Debtor 에 대한 value 추가
                    hwpCtrl.SetCurFieldName('APPR_COVER_1/' + procInfo[i]);
                    hwpCtrl.PutFieldText('APPR_COVER_1/' + procInfo[i], '');

                    // GetTableCellAddr(0) 열 위치값 얻어오기
                    // var tc = hwpCtrl.GetTableCellAddr(0);

                    // 한줄 아래로 이동
                    hwpCtrl.MovePos(103);


                    // 왼쪽으로 하나씩 이동
                    hwpCtrl.MovePos(100);


                    hwpCtrl.MovePos(100);

                    // 해당 위치에 키 맵핑
                    hwpCtrl.SetCurFieldName('APPR_COVER_1/' + procInfo[i]);
                    hwpCtrl.PutFieldText('APPR_COVER_1/' + procInfo[i], '');

                    hwpCtrl.MovePos(100);

                    // 셀 병합
                    hwpCtrl.Run("TableCellBlock");
                    hwpCtrl.Run("TableCellBlockExtend");
                    hwpCtrl.Run("TableUpperCell");
                    hwpCtrl.Run("TableMergeCell");

                    //셀 왼쪽이동
                    hwpCtrl.MovePos(100);
                    hwpCtrl.MovePos(100);

                    // 셀 아래쪽 이동
                    hwpCtrl.MovePos(103);
                    hwpCtrl.Run("TableCellBlock");
                    hwpCtrl.Run("TableCellBlockExtend");
                    hwpCtrl.Run("TableUpperCell");
                    hwpCtrl.Run("TableMergeCell");


                    // json 연결

                    var apprId = NaraCtrlManager.util.getParameter("apprId");
                    const fieldList = NaraCtrlManager.getFieldArr(hwpCtrl, "");

                    console.log("return fieldList");
                    console.dir(fieldList);
                }
            }
        }
    },
    //null체크, 파라미터추출, 확장자 읽기, hashtable 생성(데모버전에있는그대로사용)
    util : {
        //str null 체크
        isStrEmpty : function(str){
            return (str == null || str == "" || str == undefined || str == "null" || str.length == 0);
        },
        //array null 체크
        isArrEmpty : function(arr){
            return (typeof arr == "array" && arr.length == 0) || arr == null || arr == undefined;
        },

        //url에서 파라미터 추출
        getParameter : function(paramKey){

            //paramkey가 아니거나 스크링이 아닐시 null 반환
            if(!paramKey || typeof paramKey != "string") return null;

            //쿼리스트링을 얻었다(?다음에 나오는 문자 &기준삼아 배열로 분리)
            const params = location.search.substr(location.search.indexOf("?") + 1).split("&");
            let temp = "";

            if(params){

                let getValue = "";

                //분리된 부분마다
                for(let i=0; i < params.length; i++){

                    //=으로 분리하고 /apprid
                    temp = params[i].split("=");

                    //그 값이 paramkey일때 getValue에 temp 다음배열값 적용
                    if(temp[0] == paramKey){
                        getValue = temp[1];
                        break;
                    }
                }

                return getValue;

            }

        },

        //파일확장자 읽기
        getFileExt : function(url) {
            //this == getFileExt
            //기본으로 hwp 를 반환한다.
            if(this.isStrEmpty(url)) return "HWP";

            //뒤에서 .으로 시작하는 문자 다음값저장
            const fileExtIndex = url.lastIndexOf(".") + 1;

            // fieldExtIndex에서 url.length까지 문자열을 반환(확장자떼오기)
            let fileExt = url.substring(fileExtIndex, url.length);

            //fileExt가 null이아니거나 hml이면 fileExt이 hwpml 이다.(한글자체 html 형식 api기재)
            if(!this.isStrEmpty(fileExt) && fileExt == "hml"){ fileExt = "HWPML"; }

            return fileExt;

        },

        //사용언어 지정
        getStrLen: function(str) {
            var p, len=0;
            for(p=0; p < str.length; p++)
            {
                //인덱스값이 p인 문자의 유니코드 반환 삼항연산자(영문,숫자,한글 255)
                (str.charCodeAt(p)  > 255) ? len+=2 : len++;
            }
            return len;
        },

        //해싱테이블중 256bit로 나오는 함수
        getSHA256: function(s){
            /**
             *
             *  Secure Hash Algorithm (SHA256)
             *  http://www.webtoolkit.info/
             *
             *  Original code by Angel Marin, Paul Johnston.
             *
             **/

            var chrsz   = 8;
            var hexcase = 0;

            function safe_add (x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }

            function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
            function R (X, n) { return ( X >>> n ); }
            function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
            function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
            function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
            function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
            function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
            function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

            function core_sha256 (m, l) {

                var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
                    0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
                    0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
                    0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
                    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
                    0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
                    0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
                    0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
                    0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
                    0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
                    0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

                var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

                var W = new Array(64);
                var a, b, c, d, e, f, g, h, i, j;
                var T1, T2;

                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;

                for ( var i = 0; i<m.length; i+=16 ) {
                    a = HASH[0];
                    b = HASH[1];
                    c = HASH[2];
                    d = HASH[3];
                    e = HASH[4];
                    f = HASH[5];
                    g = HASH[6];
                    h = HASH[7];

                    for ( var j = 0; j<64; j++) {
                        if (j < 16) W[j] = m[j + i];
                        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                        T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                        h = g;
                        g = f;
                        f = e;
                        e = safe_add(d, T1);
                        d = c;
                        c = b;
                        b = a;
                        a = safe_add(T1, T2);
                    }

                    HASH[0] = safe_add(a, HASH[0]);
                    HASH[1] = safe_add(b, HASH[1]);
                    HASH[2] = safe_add(c, HASH[2]);
                    HASH[3] = safe_add(d, HASH[3]);
                    HASH[4] = safe_add(e, HASH[4]);
                    HASH[5] = safe_add(f, HASH[5]);
                    HASH[6] = safe_add(g, HASH[6]);
                    HASH[7] = safe_add(h, HASH[7]);
                }
                return HASH;
            }

            function str2binb (str) {
                var bin = Array();
                var mask = (1 << chrsz) - 1;
                for(var i = 0; i < str.length * chrsz; i += chrsz) {
                    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
                }
                return bin;
            }

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            }

            function binb2hex (binarray) {
                var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                var str = "";
                for(var i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                        hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
                }
                return str;
            }

            s = Utf8Encode(s);
            return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
        }

    },

    postApi : function(api_url, api_data, callback){

        var resultData = {};

        console.log(api_url);

        //원격 API에서 관리하고 있는 데이터를 생성
        fetch(api_url, {
            method: "POST",
            //mode: 'no-cors', // no-cors, cors, *same-origin
            //credentials: "include",
            headers: {
                "Content-type": "application/json"
                // 'Access-Control-Allow-Private-Network': true,
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //redirect: 'follow', // manual, *follow, error
            //referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(api_data)
        })
            .then(res => res.json())
            .then(result => {
                callback(result);
            })
            .catch(err => {
                console.log(err);
            });

    }

}

console.log(location.origin);

console.log(apprApi.baseUrl);
console.log(apprApi.bindData);
console.log(apprApi.viewData);

