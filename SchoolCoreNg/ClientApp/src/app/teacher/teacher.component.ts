import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent {
    public teachers: Teacher[];
    public teacher: Teacher = { teacherId: 0, teacherName: '' };
    public baseURL: string = 'http://localhost:63397/api';
    public HTTP: HttpClient = null;
    public isList: boolean = true;
    constructor(http: HttpClient) {
        this.HTTP = http;
        this.get();
        this.reset();
    }

    get() {
        this.HTTP.get<Teacher[]>(this.baseURL + '/Teachers').subscribe(result => {
            this.teachers = result;
        }, error => console.error(error));
    }

    reset() {
        this.teacher.teacherId = 0;
        this.teacher.teacherName = '';
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
        this.teacher = item;
        this.isList = false;
    }

    update() {
        this.HTTP.put(this.baseURL + '/Teachers?id=' + this.teacher.teacherId, this.teacher).subscribe(result => {
            this.reset();
            this.isList = true;
            this.get();
            console.log(result);
        }, error => console.error(error));
    }

    insert() {
        this.HTTP.post(this.baseURL + '/Teachers', this.teacher).subscribe(result => {
            this.reset();
            this.isList = true;
            this.get();
            console.log(result);
        }, error => console.error(error));
    }

    save() {
        if (this.teacher.teacherId === 0) {
            this.insert();
        } else {
            this.update();
        }
    }

    delete(item: any) {
        var isConfirm = confirm('Are you sure to delete?');
        if (isConfirm) {
            this.HTTP.delete(this.baseURL + '/Teachers?id=' + item.teacherId).subscribe(result => {
                this.reset();
                this.isList = true;
                this.get();
                console.log(result);
            }, error => console.error(error));
        }
    }
}

interface Teacher {
    teacherId: number;
    teacherName: string;
}
