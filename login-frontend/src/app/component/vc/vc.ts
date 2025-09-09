import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Share } from '../../service/share';

@Component({
  selector: 'app-vc',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './vc.html',
  styleUrl: './vc.css'
})
export class Vc implements OnInit{
  vcForm!: FormGroup;

  constructor(private share: Share){}

  ngOnInit(): void {
      this.vcForm = new FormGroup({
        type: new FormControl('', Validators.required),
        fieldName: new FormControl('', Validators.required),
        fieldValue: new FormControl('', Validators.required),
        holderId: new FormControl(this.share.getData(), Validators.required)
      })
  }

  async submit(){
    const vc = await (await fetch('http://localhost:8080/vc/issue',{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(this.vcForm.value)
    })).json();

    console.log(vc);
  }
}
