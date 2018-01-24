import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Item } from '../../models/item/item.module';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController, private shopping: ShoppingListService) {
    this.shoppingList$ = this.shopping 
    .getShoppingList() //DB List
    .snapshotChanges() //Key and Value
    .map(
      changes => {
        return changes.map(c=>({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )

  }

}
