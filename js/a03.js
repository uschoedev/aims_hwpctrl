// 요약 화면을 담당하는 클래스
var A03 = class A03 {}

// 템플릿 어팬드
A03.prototype.getA03DataFromServer = function(ctrlManager,
                                                  hwpCtrl
) {
    setTimeout(function(){ctrlManager.appendFile(hwpCtrl, location.origin + "/AIMS_test/hwp/a03.hwp" , function(){


        var dact = hwpCtrl.CreateAction("PageSetup");
        var dset = dact.CreateSet();
        dact.GetDefault(dset);

        // 여백 넓게
        dset.SetItem ("Landscape", 1);

        // 현재 페이지 설정(2), 문서전체(3), 현재 페이지 이후(4)
        dset.SetItem ("ApplyTo", 2);
        var _dset = dset.CreateItemSet ("PageDef", "PageDef");

// 1mm = 283.465 HWPUNITs

        _dset.SetItem ("TopMargin", 5000);
        _dset.SetItem ("BottomMargin", 1568);
        _dset.SetItem ("LeftMargin", 2834);
        _dset.SetItem ("RightMargin", 2834);

        // 머릿말 마진
        _dset.SetItem ("HeaderLen", 7917);

        // 바닥글 마진
        _dset.SetItem ("FooterLen", 1587);
        _dset.SetItem ("GutterLen", 0);

        dact.Execute(dset);

        hwpCtrl.MovePos(3);
        hwpCtrl.Run("BreakSection");


    });



    },3000);


    hwpCtrl.CreateField('', "", '본문');
    hwpCtrl.MoveToField('본문', true, true, true);
    hwpCtrl.MovePos(104);
    console.log("본문으로 이동 ==>", hwpCtrl.MoveToField('본문', true, true, true));    

    hwpCtrl.SetCurFieldName('SP_SELECT_APP_A03/TITLE');

    // 템플릿 스타일 설정


};

A03.prototype.setA03DataToScreen = function(ctrlManager,hwpCtrl,apprId,summaryDataFromServer) {

    hwpCtrl.MovePos(2);

    // var tbact = hwpCtrl.CreateAction("TableCreate");
    // var tbset = tbact.CreateSet();
    // tbset.SetItem("Rows", 5);
    // tbset.SetItem("Cols", 5);
    // var table = hwpCtrl.InsertCtrl(
    //     "tbl", tbset);
    // // // fieldkey 있을 시
    // // if(hwpCtrl.FieldExist('APPR_COVER_1/Debtor')) {

    // //     //위치로 이동
    //     hwpCtrl.MoveToField('APPR_COVER_1/Debtor', true, true, true);


    //     //셀 색상 입력
    //     var act = hwpCtrl.CreateAction("CellBorder");
    //     var set = act.CreateSet();
    //     act.GetDefault(set);

    //     var FillAttrSet = set.CreateItemSet("FillAttr","DrawFillAttr");
    //     FillAttrSet.SetItem("Type", 1); //0 채우기없음, 1 면색 또는 무뉘색 , 2 그림, 3 그라데이션

    //     FillAttrSet.SetItem("WinBrushFaceStyle", 6); // 면색 스타일
    //     FillAttrSet.SetItem("WinBrushHatchColor", 0x00003300);

    //     // FillAttrSet.SetItem("WinBrushFaceColor", 0x00BBGGRR); //  면색 0x00BBGGRR

    //     FillAttrSet.SetItem("WinBrushFaceColor", 0x00003300); //  면색 0x00BBGGRR

    //     FillAttrSet.SetItem("WindowsBrush", 1); // 현재 선택된 브러쉬타입
    //     act.Execute(set);

    //     // var vAct = hwpCtrl.CreateAction("CharShape");
    //     // var vSet = hwpCtrl.CreateSet("CharShape");
    //     // vAct.GetDefault(vSet);
    //     // vSet.SetItem("TextColor", 0x00cf);
    //     // vAct.Execute(vSet);
    //     // 가운데 정렬
    //     hwpCtrl.Run('ParagraphShapeAlignCenter');

    //     // 행 추가
    //     hwpCtrl.Run("TableInsertLowerRow");

    //     //한줄 아래로 이동 20 한줄 아래 이동, 21 한줄 위로이동, 100 현재 셀의 왼쪽, 101 셀 오른쪽, 102 셀 위쪽, 103 셀 아래쪽
    //     hwpCtrl.MovePos(103);

    //     // GetTableCellAddr(1) 행 위치값 얻어오기
    //     // var tr = hwpCtrl.GetTableCellAddr(1);

    //     // 한줄 아래 APPR_COVER_1/Debtor 에 대한 value 추가
    //     hwpCtrl.SetCurFieldName('APPR_COVER_1/Debtor');
    //     hwpCtrl.PutFieldText('APPR_COVER_1/Debtor', '');

    //     // GetTableCellAddr(0) 열 위치값 얻어오기
    //     // var tc = hwpCtrl.GetTableCellAddr(0);

    //     // 한줄 아래로 이동
    //     hwpCtrl.MovePos(103);


    //     // 왼쪽으로 하나씩 이동
    //     hwpCtrl.MovePos(100);




    //     hwpCtrl.MovePos(100);

    //     // 해당 위치에 키 맵핑
    //     hwpCtrl.SetCurFieldName('APPR_COVER_1/Debtor');
    //     hwpCtrl.PutFieldText('APPR_COVER_1/Debtor', '');

    //     hwpCtrl.MovePos(100);

    //     // 셀 병합
    //     hwpCtrl.Run("TableCellBlock");
    //     hwpCtrl.Run("TableCellBlockExtend");
    //     hwpCtrl.Run("TableUpperCell");
    //     hwpCtrl.Run("TableMergeCell");

    //     //셀 왼쪽이동
    //     hwpCtrl.MovePos(100);
    //     hwpCtrl.MovePos(100);

    //     // 셀 아래쪽 이동
    //     hwpCtrl.MovePos(103);
    //     hwpCtrl.Run("TableCellBlock");
    //     hwpCtrl.Run("TableCellBlockExtend");
    //     hwpCtrl.Run("TableUpperCell");
    //     hwpCtrl.Run("TableMergeCell");


    //     // 문단의 끝으로 이동
    //     hwpCtrl.MovePos(3);


    // }


};




export default A03;


