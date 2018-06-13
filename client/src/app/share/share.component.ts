import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShareService } from "../common/share.service";
import { Share } from '../common/share.model';

declare var M: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
  providers: [ShareService]
})
export class ShareComponent implements OnInit {

  constructor(public shareService: ShareService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshShareList();
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.shareService.selectedShare = {
      _id: "",
      name: "",
      value: null
    }
  }

  onSubmit(form : NgForm) {
    this.shareService.createShare(form.value).subscribe((res) => {
      this.resetForm(form);
      M.toast({html: 'Saved successfully', classes: 'rounded' });
    })
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.shareService.deleteShare(_id).subscribe((res) => {
        this.refreshShareList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  refreshShareList() {
    this.shareService.getShareList().subscribe((res) => {
      this.shareService.shares = res as Share[];

    })
  }
}
