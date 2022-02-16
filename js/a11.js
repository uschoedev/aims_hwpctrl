// 요약 화면을 담당하는 클래스
var A11 = class A11 {};

// 템플릿 어팬드
A11.prototype.getCoverDataFromServer = function (
  ctrlManager,
  hwpCtrl,
  apprId
) {
  setTimeout(function () {
    ctrlManager.appendFile(
      hwpCtrl,
      location.origin + "/AIMS_test/hwp/ccover.hwp",
      function () {
        hwpCtrl.MovePos(3);
        hwpCtrl.Run("BreakSection");
      }
    );
  }, 1000);
};

// 템플릿 가변 항목 설정
A11.prototype.setCoverDataToScreen = function (
  ctrlManager,
  hwpCtrl,
  apprId,
  coverDataFromServer
) {
  // fieldkey 있을 시
  //   if (hwpCtrl.FieldExist("APPR_COVER_1/Reference")) {
  //     //위치로 이동
  //     hwpCtrl.MoveToField("APPR_COVER_1/Reference", true, true, true);
  //     //글자에 대한 action 실행
  //     var vAct = hwpCtrl.CreateAction("CharShape");
  //     var vSet = hwpCtrl.CreateSet("CharShape");
  //     vAct.GetDefault(vSet);
  //     // 글자 색깔
  //     vSet.SetItem("TextColor", 0x00cf);
  //     //글자 크기 2500 == 25pt
  //     vSet.SetItem("Height", 1500);
  //     vAct.Execute(vSet);
  //   }
};

export default A11;
