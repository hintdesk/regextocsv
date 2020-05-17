import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FileSaverService } from 'ngx-filesaver';
import { MatDialog } from '@angular/material/dialog';
import { DelimiterComponent } from '../delimiter/delimiter.component';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    regexPattern: string = "";
    input: string = "";
    dataSource: any;
    visibleColumns: string[] = [];
    fileContent: string = "";
    filePath: string = "";
    isTextAreaVisible: boolean = true;
    isSelectFileVisible: boolean = true;
    error: string = "";
    lastPattern: string = "LastPattern";
    isLoaderVisible: boolean = false;
    isExportToCsvDisabled: boolean = true;
    isParseDisabled: boolean = true;

    constructor(
        private fileSaverService: FileSaverService,
        private dialog: MatDialog

    ) {
    }

    ngOnInit(): void {
        this.regexPattern = localStorage.getItem(this.lastPattern);
    }


    parse() {
        this.error = null;
        if (!this.regexPattern) {
            this.error = "Please enter the regex pattern";
            return;
        }
        this.isLoaderVisible = true;

        setTimeout(()=>{
            if (this.isSelectFileVisible) {
                this.parseText(this.fileContent);
            }
            else {
                this.parseText(this.input);
            }
            this.isLoaderVisible = false;
        },100)
        
    }

    parseText(text: string) {
        let pattern = new RegExp(this.regexPattern, "g");
        let matches: any = null;
        this.visibleColumns = [];
        let rows = [];
        while (matches = pattern.exec(text)) {
            let row: any = {};

            for (let index = 0; index < matches.length; index++) {
                row["Group" + index] = matches[index];
            }
            rows.push(row);
        }

        if (rows.length > 0) {
            for (let index = 0; index < Object.keys(rows[0]).length; index++) {
                this.visibleColumns.push("Group" + index);
            }
        }

        this.dataSource = new MatTableDataSource(rows);
        this.dataSource.sort = this.sort;
        this.isExportToCsvDisabled = false;

    }

    onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.fileContent = e.target.result;
                this.isTextAreaVisible = false;
                this.isParseDisabled = false;
            };

            this.filePath = inputNode.files[0].name + " has been loaded.";
            reader.readAsText(inputNode.files[0]);
        }
    }

    onInputChanged() {
        this.isSelectFileVisible = false;
        this.isParseDisabled = false;
    }

    onRegexPatternChanged() {
        localStorage.setItem(this.lastPattern, this.regexPattern);
    }

    exportToCsv() {

        const dialogRef = this.dialog.open(DelimiterComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!this.dataSource) {
                return;
            }
            let rows = this.dataSource.connect().value;
            let content = "";
            for (let index = 0; index < this.visibleColumns.length; index++) {
                content += this.visibleColumns[index] + ";"
            }

            content += "\r\n";

            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                for (let colIndex = 0; colIndex < this.visibleColumns.length; colIndex++) {
                    let value = rows[rowIndex][this.visibleColumns[colIndex]];
                    if (value) {
                        content += value + result;
                    } else {
                        content += result;
                    }
                }
                content += "\r\n";
            }

            this.fileSaverService.saveText(content, "regextocsv.csv");
        });
    }
}