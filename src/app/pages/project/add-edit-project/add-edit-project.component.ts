import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { fetchItemById } from 'src/app/core/store/action/project.action';
import { ItemState } from 'src/app/core/store/reducer/project.reducer';
import { selectSelectedItem } from 'src/app/core/store/selectors/project.selector';
import { RightSideDialogComponent } from 'src/app/shared/dialog/rightDialog.component';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent implements OnInit {
  projectId: number | null = null;
  projectForm!: FormGroup;
  isSubmitted = false;
  wordDefination: any;
  selectedItem$ !: Observable<any | null>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService:ApiService,
    private dialog:MatDialog,
    private router:Router,
    private toastService:ToastService,
    private store: Store<ItemState>,
  ) {}

  ngOnInit() {
    // Retrieve the project ID from the route and convert it to a number
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(fetchItemById({ id }));
    }

    // Select the selected project from the state
    this.selectedItem$ = this.store.select(selectSelectedItem);

    this.projectId = id ? +id : null;

    // Initialize the form
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required], // Quill editor will bind to this control
    });

  this.projectForm.reset()
    this.selectedItem$.subscribe((res)=>{
      if(res && id){
        this.projectForm.patchValue(res)
      }
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.projectForm.valid) {
      if(this.projectId){
        this.apiService.put(`projects/${this.projectId}/`,this.projectForm.value).subscribe((res)=>{
          this.router.navigate(['ibook'])
          this.projectForm.reset()
          this.toastService.showSuccess('Upate SuccessFully',"success")
        })
      }else{
        this.apiService.post('projects/',this.projectForm.value).subscribe((res)=>{
          this.projectForm.reset()
          this.router.navigate(['ibook'])

          this.toastService.showSuccess('Creted project SuccessFully',"success")
        })
      }

    }
  }


  openWordDictionary(text:string){
    this.apiService.getWordsDictonary(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`).subscribe((res)=>{
      this.wordDefination=res[0].meanings[0].definitions[0].definition

      console.log( this.wordDefination,"chup kr")
      this.openRightSideDialog( this.wordDefination)

    },
  error=>{
    this.toastService.showError("Please write the coorect word",'Error')
  })


  }

  openRightSideDialog(selectedText: string) {
    this.dialog.open(RightSideDialogComponent, {
      width: '400px',
      position: { right: '0px' },  // Position the dialog on the right side
      data: { text: selectedText }  // Pass the selected text to the dialog
    });
  }


  backTolist(){
    this.router.navigate(['ibook'])
  }
}
