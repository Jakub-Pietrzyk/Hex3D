class EditorConfiguration {
    constructor() {
      this.setSelectOptions();
    }

    setSelectOptions(){
      var select = $("#hex_count")
      for(var i=3;i<15;i++){
        var option = $("<option>" + i + "</option>");
        select.append(option);
      }
    }
}
