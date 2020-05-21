class Ui {
    constructor(){
      this.lightInitialized = false;
    }

    addLightControls(){
      this.lightInitialized = true;

      var div = $("<div class='ranges'>");
      var intensivity_range = $("<input type='range' class='range' id='lightIntensivityRange' min='1' max='100' value='10'>");
      var height_range = $("<input type='range' class='range' id='lightHeightRange' min='2' max='100' value='20'>");
      div.append(intensivity_range);
      div.append(height_range);
      $("body").append(div);
    }
}
