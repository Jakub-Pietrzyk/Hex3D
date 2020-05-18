class Hex {
    constructor(id, x ,z, dir) {
      this.id = id;
      this.x = x;
      this.z = z;
      this.dir = dir;
      this.display();
      levelEditor.level.push(this);
    }

    display(){
      this.container = $("<div class='arrow'>^<br />" + this.id + "</div>");
      var hex_div = $("#id_" + this.x + "_" + this.z);
      hex_div.append(this.container);
    }

    rotate(){
      this.dir += 60;
      if(this.dir == 360) this.dir = 0;
      this.container.css("transform", "rotate(" +this.dir +"deg)");
    }
}
