import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent {
    public subjects: Subject[];
    public subject: Subject = { subjectId: 0, subjectName: '' };
    public baseURL: string = 'http://localhost:63397/api';
    public HTTP: HttpClient = null;
    public isList: boolean = true;
    constructor(http: HttpClient) {
        this.HTTP = http;
        this.get();
        this.reset();
    }

    get() {
        this.HTTP.get<Subject[]>(this.baseURL + '/Subjects').subscribe(result => {
            this.subjects = result;
        }, error => console.error(error));
    }

    reset() {
        this.subject.subjectId = 0;
        this.subject.subjectName = '';
    }

    addNew() {
        this.reset();
        this.isList = false;
    }

    goToList() {
        this.get();
        this.isList = true;
    }

    edit(item: any) {
        this.subject = item;
        this.isList = false;
    }

    update() {
        this.HTTP.put(this.baseURL + '/Subjects?id=' + this.subject.subjectId, this.subject).subscribe(result => {
            this.reset();
            this.isList = true;
            this.get();
            console.log(result);
        }, error => console.error(error));
    }

    insert() {
        this.HTTP.post(this.baseURL + '/Subjects', this.subject).subscribe(result => {
            this.reset();
            this.isList = true;
            this.get();
            console.log(result);
        }, error => console.error(error));
    }

    save() {
        if (this.subject.subjectId === 0) {
            this.insert();
        } else {
            this.update();
        }
    }

    delete(item: any) {
        var isConfirm = confirm('Are you sure to delete?');
        if (isConfirm) {
            this.HTTP.delete(this.baseURL + '/Subjects?id=' + item.subjectId).subscribe(result => {
                this.reset();
                this.isList = true;
                this.get();
                console.log(result);
            }, error => console.error(error));
        }
    }
}

interface Subject {
    subjectId: number;
    subjectName: string;
}
