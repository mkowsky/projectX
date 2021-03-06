import {Component, OnInit} from '@angular/core';
import {DropService} from '../../services/drop.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-monster',
  templateUrl: './monsterDetails.component.html',
  styleUrls: ['./monsterDetails.component.css']
})
export class MonsterDetailsComponent implements OnInit {
  coLeci;
  index;
  nazwaPotwora;
  idPotwora;
  poziomPotwora;
  hpPotwora;
  expPotwora;
  obrazeniaPotwora;

  constructor(private dropService: DropService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.index = this.route.snapshot.paramMap.get("id");
    this.dropService.getItemsWhichDropFromThisMonster(this.index).subscribe(response => {
      this.coLeci = response;
      this.nazwaPotwora = response[0].monster.monsterName;
      this.idPotwora = response[0].monster.id;
      this.poziomPotwora = response[0].monster.monsterLevel;
      this.hpPotwora = response[0].monster.monsterHealth;
      this.expPotwora = response[0].monster.monsterExp;
      this.obrazeniaPotwora = response[0].monster.monsterDamage;
    });
  }

}
