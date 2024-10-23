import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchItems } from 'src/app/core/store/action/project.action';
import { ItemState } from 'src/app/core/store/reducer/project.reducer';
import { selectItems } from 'src/app/core/store/selectors/project.selector';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css'],
})
export class ProjectListingComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'content','created_at']; // Use 'description' instead of 'weight' or 'symbol'
  items$!: Observable<any[]>;
projectList!:any[];

  constructor(private router: Router,private store: Store<ItemState>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchItems());

    // Select the items from the state
    this.items$ = this.store.select(selectItems);
    this.items$.subscribe((res)=>{
      console.log(res);
      this.projectList=res
      
    })

  }

  openProjectEdit(row: any) {
    // Navigate to the edit component and pass the project ID or SrNO
    this.router.navigate(['ibook/edit-project', row.id]);
  }

  backTolist(){
    this.router.navigate([''])
  }


}
