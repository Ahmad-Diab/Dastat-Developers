import { Component, OnInit, trigger, state, style, transition, animate  } from '@angular/core';
import { HallService } from '../../@services/hall.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  layout;
  width: number;
  height: number;
  name: string;

  constructor(public hallService: HallService) { }

  ngOnInit() {
  }

  arraySize() {
    this.layout = new Array(this.height);

    for(var i = 0; i < this.height; i++){
      this.layout[i] = new Array();
      for(var j = 0; j < this.width; j++){
        this.layout[i].push(false);
      }
    }
  }

  toggle(i: number, j: number) {
    this.layout[i][j] = !this.layout[i][j];
  }

  toggleColumn(j: number) {
    for(var i = 0; i < this.layout.length; i++){
      this.layout[i][j] = !this.layout[i][j];
    }
  }

  toggleRow(i: number) {
    for(var j = 0; j < this.layout[i].length; j++){
      this.layout[i][j] = !this.layout[i][j];
    }
  }

  letter(index: number) {
    var ascii = 65;
    return String.fromCharCode(index + ascii);
  }

  submit() {
    var ascii = 65;
    var letter = 'A';
    var jsonObj = [];
    var marginFlag: boolean = false;
    for (var i = 0; i < this.layout.length; i++) {
      var object: rowObj = new rowObj();
      object.margin = marginFlag;
      marginFlag = false;
      var row = [];
      var margin = this.layout[i].length;
      for (var j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j]) {
          row.push({ seat: { number: letter + '' + (j + 1) } });
        } else {
          row.push("offset");
          margin--;
        }
      }
      if (margin === 0) {
        marginFlag = true;
      } else {
        object.row = row;
        jsonObj.push(object);
        letter = String.fromCharCode(++ascii);
      }
    }
    var json = JSON.stringify(jsonObj);
    console.log(json);

    this.save(json);
  }

  save(json) {
    var data = {
      name: this.name,
      encoding: json
    }

    this.hallService.saveLayout(data).subscribe((response) => {
      console.log("hall added");
    })
  }
}


export class rowObj {
  margin: boolean;
  row: any[]
}
